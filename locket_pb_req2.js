// ========= Locket AI Filter (Full Prompts & Tráo Ảnh) ========= //
(function () {
    const WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
    const TIMEOUT_MS = 25000; 

    const STICKER_ID_MAP = {
        "stk_dio_disco": "disco_lights", "disco": "disco_lights",
        "stk_dio_bearded": "beard", "bearded": "beard", "stk_dio_bearded_holiday": "bearded",
        "stk_dio_looksmaxing": "looks_maxxing", "looksmaxing": "looks_maxxing",
        "stk_dio_slimed": "slimed", "slimed": "slimed",
        "stk_dio_clown": "clown", "clown": "clown",
        "stk_dio_tatted": "tatted", "tatted": "tatted",
        "stk_rose_flower": "rose_flower", "rose_flower": "rose_flower",
        "stk_shrek_ogre": "shrek_ogre", "shrek_ogre": "shrek_ogre",
        "stk_cute_zombie": "cute_zombie", "cute_zombie": "cute_zombie",
        "stk_minecraft": "minecraft", "minecraft": "minecraft",
        "stk_harry_potter": "harry_potter", "harry_potter": "harry_potter",
        "stk_watercolor_art": "watercolor_art", "watercolor_art": "watercolor_art",
        "stk_fortnite_llama": "fortnite_llama", "fortnite_llama": "fortnite_llama",
        "stk_superhero_cape": "superhero_cape", "superhero_cape": "superhero_cape",
        "stk_spooky_ghost": "spooky_ghost", "spooky_ghost": "spooky_ghost",
        "stk_pirate_hat": "pirate_hat", "pirate_hat": "pirate_hat",
        "stk_giant_spider": "giant_spider", "giant_spider": "giant_spider",
        "stk_ocean_underwater": "ocean_underwater", "ocean_underwater": "ocean_underwater",
        "stk_ufo_alien": "ufo_alien", "ufo_alien": "ufo_alien"
    };

    const AI_PROMPTS = {
        "disco_lights": "Show the persons in the photo with the exact same pose and background, but with disco-style lighting effects cast across the scene, captured with a modern iPhone camera look. Do not alter the person's face or pose.",
        "beard": "Show the persons in the photo with the exact same pose and background, but with a full, full-length dense natural beard added to the face that matches their hair color. Keep the face, expression, and pose exactly the same.",
        "looks_maxxing": "Show the persons in the photo with the exact same pose and background, but with a full, full-length dense natural beard added to the face that matches their hair color. Keep the face, expression, and pose exactly the same.",
        "slimed": "Show the persons in the photo with the exact same pose and background, but with thick green Nickelodeon-style slime being poured and splashing throughout the scene. Keep the face and pose identical.",
        "clown": "Show the persons in the photo with the exact same pose and background, but styled as clowns with a multicolored wig, red nose, and clown costume. Keep the person's face identity and pose identical.",
        "tatted": "Show the persons in the photo with the exact same pose and background, but with face tattoos applied, including a forehead tattoo that reads 'Locket' in Old English font. Keep the face shape and pose identical.",
        "rose_flower": "Show the person in the photo with the exact same pose and background, but have them with a single red rose in their mouth. If no person is present, do not add anything to the output.",
        "shrek_ogre": "Show the person in the photo with the exact same pose and background, but transform them into Shrek with rounded ears, and rustic clothing while preserving the pose. Keep their hairstyle, but make it look natural in the Shrek style.",
        "cute_zombie": "Show the person in the photo with the exact same pose and background, but turn them into a cute zombie while keeping their pose and expression identical.",
        "minecraft": "Show the person in the photo with the exact same pose, expression, and background, but make everything in the scene look like it was created from Minecraft-style blocks. Show no extra overlays or text on top of the photo.",
        "harry_potter": "Show the person in the photo with the exact same pose and background, but show them as a character from Harry Potter wearing a robe of one of the four houses. Keep the pose and framing identical and do not change the background.",
        "watercolor_art": "Show the person in the photo with the exact same pose, expression, and background, but render the entire scene as a watercolor painting with flowing brush strokes.",
        "fortnite_llama": "Show the person in the photo with the exact same pose, expression, and background, but make the entire scene look like it was rendered inside a video game, similar to the style of Fortnite.",
        "superhero_cape": "Show the person in the photo with the exact same pose and background, but suit them up like a superhero in a blue and red outfit with a flowing cape while keeping their pose and framing identical.",
        "spooky_ghost": "Show the person in the photo with the exact same pose, expression, and background, but subtly insert a realistic-looking ghost somewhere in the background. If no person is present, do not add any people to the output.",
        "pirate_hat": "Show the person in the photo with the exact same pose and background, but dress them like a pirate from Pirates of the Caribbean while keeping their pose and facial expression identical.",
        "giant_spider": "Show the person in the photo with the exact same pose, expression, and background, but place a realistic giant spider perched on them somewhere, such as their shoulder or head.",
        "ocean_underwater": "Show the person in the photo with the exact same pose, background, and facial expression, but as if them and their surrounding environment was underwater.",
        "ufo_alien": "Show the person in the photo with the exact same pose and background, but show a subtle UFO hovering in the sky or an alien somewhere hidden in the user's background."
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
            
            // 1. TỰ ĐỘNG NHẬN DIỆN PHOTOBOOTH / KHUNG ĐỂ TRẢ ẢNH GỐC
            const isPhotobooth = /^pb_|^photobooth_|^frame_|^khung_/i.test(rawFilterId);

            if (isPhotobooth || !STICKER_ID_MAP[rawFilterId]) {
                return $done(buildMock200Response(photoUrl));
            }

            // 2. LẤY ẢNH AI CỦA LẦN CHỤP TRƯỚC (CƠ CHẾ TRÁO ẢNH)
            let lastAiUrl = "";
            if (typeof $persistentStore !== "undefined") {
                lastAiUrl = $persistentStore.read("LOCKET_LAST_AI_RESULT") || "";
                $persistentStore.write("", "LOCKET_LAST_AI_RESULT"); 
            }

            const returnUrl = lastAiUrl ? lastAiUrl : photoUrl;
            $done(buildMock200Response(returnUrl));

            // 3. CHẠY NGẦM GỌI AI ĐỂ CHUẨN BỊ CHO LẦN CHỤP SAU
            const filterId = STICKER_ID_MAP[rawFilterId] || rawFilterId;
            const prompt = AI_PROMPTS[filterId] || "Add a nice filter effect, keep the person's face identical.";
            
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
                            // Lưu ảnh AI vào bộ nhớ
                            $persistentStore.write(outUrl + "?t=" + Date.now(), "LOCKET_LAST_AI_RESULT");
                        }
                    } catch (e) {}
                }
            });
            return; 
        } catch (e) {
            return $done({});
        }
    }

    // ========== XỬ LÝ RESPONSE DỰ PHÒNG ==========
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
