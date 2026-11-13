function storeRead(key) {
        try {
            if (typeof $persistentStore !== "undefined") return $persistentStore.read(key) || "";
            if (typeof $prefs !== "undefined") return $prefs.valueForKey(key) || "";
        } catch (e) {}
        return "";
    }

    function storeWrite(key, val) {
        try {
            if (typeof $persistentStore !== "undefined") $persistentStore.write(String(val), key);
            else if (typeof $prefs !== "undefined") $prefs.setValueForKey(String(val), key);
        } catch (e) {}
    }

    function isPhotoboothFilter(fid) {
        if (!fid) return false;
        const lower = String(fid).toLowerCase();
        // Không nhận khung đơn (pb_single_ hoặc khung_)
        if (lower.startsWith("pb_single_") || lower.startsWith("khung_")) return false;
        // 10 bộ lọc Photobooth 4 ô chính thức
        return /photobooth_4cut|photobooth_cute|pb_holo_4cut|pb_scrapbook_ripped_4cut|pb_ripped_paper_4cut|pb_denim_ripped_2x2|frame_classic_pb|frame_berry_days|frame_happy_snap|frame_sky_diary|pb_strawberry|pb_vintage|pb_galaxy|photoboot|4cut/i.test(lower);
    }

    function isOverlayFrameFilter(fid) {
        if (!fid) return false;
        if (isPhotoboothFilter(fid)) return false; // Không trùng với Photobooth 4 ô
        const lower = String(fid).toLowerCase();
        return /^khung_|^frame_|pb_single_|cmt_locket|custom_frame|sticker_b_nh_lu_n/i.test(lower);
    }

    function buildMock200Response(outputUrl) {
        return {
            response: { // <--- ĐÃ BỔ SUNG KHÓA RESPONSE ĐỂ SHADOWROCKET HIỂU VÀ MOCK KẾT QUẢ NGAY LẬP TỨC
                status: 200,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    result: {
                        outputUrl: outputUrl,
                        output_url: outputUrl,
                        url: outputUrl,
                        imageUrl: outputUrl,
                        image_url: outputUrl,
                        status: 200,
                        data: {
                            outputUrl: outputUrl,
                            output_url: outputUrl,
                            url: outputUrl,
                            imageUrl: outputUrl,
                            image_url: outputUrl
                        }
                    }
                })
            }
        };
    }

    function setAllUrls(resObj, newUrl) {
        if (!resObj || typeof resObj !== "object") return;
        const fields = ["outputUrl", "output_url", "url", "imageUrl", "image_url"];
        const targets = [
            resObj,
            resObj.result,
            resObj.result && resObj.result.data,
            resObj.data
        ];
        for (let t = 0; t < targets.length; t++) {
            const obj = targets[t];
            if (obj && typeof obj === "object") {
                for (let f = 0; f < fields.length; f++) {
                    if (obj[fields[f]] !== undefined) obj[fields[f]] = newUrl;
                }
            }
        }
        if (!resObj.result) resObj.result = {};
        resObj.result.outputUrl = newUrl;
        resObj.result.output_url = newUrl;
        resObj.result.url = newUrl;
        resObj.result.imageUrl = newUrl;
        resObj.result.image_url = newUrl;
        resObj.result.status = 200;
        if (resObj.result.data) {
            resObj.result.data.outputUrl = newUrl;
            resObj.result.data.output_url = newUrl;
            resObj.result.data.url = newUrl;
            resObj.result.data.imageUrl = newUrl;
            resObj.result.data.image_url = newUrl;
        }
    }

    // =========================================================================
    // 1. CHIỀU REQUEST: XỬ LÝ GENERATE FILTERED IMAGE (MOCK 200 OK NGAY TẠI REQUEST)
    // =========================================================================
    if (typeof $response === "undefined") {
        try {
            if (!$request) return $done({});

            let reqBody = {};
            if ($request.body) {
                try {
                    reqBody = JSON.parse($request.body);
                } catch (e) {
                    reqBody = {};
                }
            }

            // Trích xuất photoUrl từ body
            let photoUrl = reqBody.imageUrl || reqBody.image_url || reqBody.inputUrl || reqBody.input_url || reqBody.url || reqBody.downloadUrl || reqBody.download_url || "";
            if (!photoUrl && reqBody.data && typeof reqBody.data === "object") {
                photoUrl = reqBody.data.imageUrl || reqBody.data.image_url || reqBody.data.url || reqBody.data.inputUrl || "";
            }
            if (!photoUrl && $request.body && typeof $request.body === "string") {
                let m = $request.body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i) ||
                        $request.body.match(/https?:\/\/firebasestorage\.googleapis\.com\/[^"'\s\\]+/i) ||
                        $request.body.match(/https?:\/\/[^"'\s\\]*locket[^"'\s\\]*/i);
                if (m) photoUrl = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
            }

            // Xử lý Photobooth & Khung & Filter AI:
            // Mock phản hồi HTTP 200 OK ngay tại request, trả về trực tiếp photoUrl của người dùng
            // Điều này giải quyết triệt để lỗi "Không thể áp dụng bộ lọc", Locket sẽ nhận diện ảnh hợp lệ 100%
            // và áp dụng lớp viền Photobooth/Sticker trực tiếp trên máy người dùng mà không cần phụ thuộc server
            if (photoUrl) {
                return $done(buildMock200Response(photoUrl));
            }

            // Nếu không tìm thấy photoUrl trong body, xóa sạch cache header để request không bị 304
            let headers = Object.assign({}, ($request && $request.headers) || {});
            for (let k of Object.keys(headers)) {
                if (['if-none-match', 'if-modified-since', 'x-revenuecat-etag'].includes(k.toLowerCase())) {
                    delete headers[k];
                }
            }
            return $done({ headers: headers });
        } catch (e) {
            return $done({});
        }
    }

    // =========================================================================
    // 2. CHIỀU RESPONSE: DỰ PHÒNG XÓA LỖI & ĐẢM BẢO RESPONSE LUÔN THÀNH CÔNG
    // =========================================================================
    try {
        if (typeof $response !== "undefined" && $response.body) {
            let resObj = {};
            try {
                resObj = JSON.parse($response.body);
            } catch (e) {
                resObj = {};
            }

            delete resObj.error;
            delete resObj.errors;
            if (resObj.result) {
                delete resObj.result.error;
                delete resObj.result.errors;
                resObj.result.is_locked = false;
                resObj.result.requires_gold = false;
                resObj.result.unlocked = true;
                resObj.result.status = 200;
            } else {
                resObj.result = {
                    status: 200,
                    is_gold: true,
                    unlocked: true,
                    is_locked: false,
                    requires_gold: false
                };
            }

            // Đảm bảo outputUrl không bao giờ rỗng
            if (!resObj.result.outputUrl && typeof $request !== "undefined" && $request && $request.body) {
                let m = $request.body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i) ||
                        $request.body.match(/https?:\/\/firebasestorage\.googleapis\.com\/[^"'\s\\]+/i) ||
                        $request.body.match(/https?:\/\/[^"'\s\\]*locket[^"'\s\\]*/i);
                if (m) {
                    let fallback = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
                    setAllUrls(resObj, fallback);
                }
            }

            let respHeaders = Object.assign({}, ($response && $response.headers) || {});
            delete respHeaders["Content-Encoding"];
            delete respHeaders["content-encoding"];
            delete respHeaders["Content-Length"];
            delete respHeaders["content-length"];
            delete respHeaders["Transfer-Encoding"];
            delete respHeaders["transfer-encoding"];
            respHeaders["Content-Type"] = "application/json; charset=utf-8";
            respHeaders["Access-Control-Allow-Origin"] = "*";

            return $done({
                status: 200,
                headers: respHeaders,
                body: JSON.stringify(resObj)
            });
        }
    } catch (e) {}

    return $done({});
})();
