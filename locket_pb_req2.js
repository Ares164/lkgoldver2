// ========= Locket AI Filter (Cơ chế Tráo Ảnh Tối Ưu) ========= //
(function () {
    const WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
    const TIMEOUT_MS = 25000; 

    const STICKER_ID_MAP = {
        "stk_dio_disco": "disco_lights", "disco": "disco_lights",
        "stk_dio_bearded": "beard", "bearded": "beard",
        "stk_rose_flower": "rose_flower", "rose_flower": "rose_flower"
    };

    const AI_PROMPTS = {
        "disco_lights": "Show the persons with disco lights. Keep the face identical.",
        "beard": "Show the person with a beard. Keep the face identical.",
        "rose_flower": "Show the person with a rose in mouth. Keep the face identical."
    };

    function buildMock200Response(outputUrl) {
        return {
            status: 200,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                result: {
                    outputUrl: outputUrl, output_url: outputUrl, url: outputUrl,
                    imageUrl: outputUrl, image_url: outputUrl, status: 200
                }
            })
        };
    }

    // ========== XỬ LÝ REQUEST ==========
    if (typeof $response === "undefined") {
        try {
            if (!$request) return $done({});
            if (!/locket|firebasestorage\.googleapis\.com/i.test($request.url || "")) return $done({});

            let reqBody = {};
            try { reqBody = JSON.parse($request.body); } catch (e) {}
            
            let photoUrl = reqBody.imageUrl || reqBody.image_url || reqBody.inputUrl || reqBody.input_url || reqBody.url || reqBody.downloadUrl || reqBody.download_url || "";
            if (!photoUrl && $request.body) {
                let m = $request.body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i);
                if (m) photoUrl = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
            }

            if (!photoUrl) return $done({});

            const rawFilterId = (reqBody.filterId || reqBody.filter_id || reqBody.stickerId || reqBody.sticker_id || reqBody.filter || reqBody.sticker || "");
            
            const isPhotobooth = /^pb_|^photobooth_|^frame_|^khung_/i.test(rawFilterId);

            // 1. PHOTOBOOTH / KHUNG / ẢNH THƯỜNG: Trả ngay ảnh gốc, ko làm gì thêm
            if (isPhotobooth || !STICKER_ID_MAP[rawFilterId]) {
                return $done(buildMock200Response(photoUrl));
            }

            // 2. FILTER AI: Trả ảnh gốc ngay lập tức để Locket không báo lỗi
            $done(buildMock200Response(photoUrl));

            // 3. NGẦM GỌI AI (không liên quan gì đến Locket nữa)
            const filterId = STICKER_ID_MAP[rawFilterId] || rawFilterId;
            const prompt = AI_PROMPTS[filterId] || "Add a nice effect.";
            
            // Dùng setTimeout để đẩy tiến trình gọi AI ra khỏi luồng chính
            setTimeout(function() {
                $httpClient.post({
                    url: WORKER_HOST,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageUrl: photoUrl, prompt: prompt }),
                    timeout: TIMEOUT_MS / 1000
                }, function (err, resp, data) {
                    if (!err && resp && resp.status === 200) {
                        try {
                            const json = JSON.parse(data);
                            const outUrl = json.result?.outputUrl || json.outputUrl || json.url;
                            if (outUrl && typeof $persistentStore !== "undefined") {
                                $persistentStore.write(outUrl + "?t=" + Date.now(), "LOCKET_LAST_AI_RESULT");
                            }
                        } catch (e) {}
                    }
                });
            }, 100); // Đợi 100ms cho Locket nhận ảnh xong rồi mới chạy AI
            
            return; 
        } catch (e) {
            return $done({});
        }
    }

    // ========== XỬ LÝ RESPONSE (Nếu Locket trả về lỗi 402/403) ==========
    try {
        if ($response && $response.body) {
            let resObj = {};
            try { resObj = JSON.parse($response.body); } catch (e) {}
            delete resObj.error;
            delete resObj.errors;
            if (resObj.result) {
                delete resObj.result.error;
                delete resObj.result.errors;
                resObj.result.status = 200;
            }
            let respHeaders = Object.assign({}, $response.headers || {});
            delete respHeaders["Content-Encoding"];
            delete respHeaders["content-encoding"];
            delete respHeaders["Content-Length"];
            delete respHeaders["content-length"];
            respHeaders["Content-Type"] = "application/json; charset=utf-8";
            return $done({
                status: 200,
                headers: respHeaders,
                body: JSON.stringify(resObj)
            });
        }
    } catch (e) {}

    return $done({});
})();
