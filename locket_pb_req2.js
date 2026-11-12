// ========= Locket Photobooth 4-Shot Engine & AI Filter Modifier (Replicate) ========= //
(function () {
    const WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
    const TIMEOUT_MS = 25000; 

    const STICKER_ID_MAP = {
		"stk_rose_flower": "rose_flower", "rose_flower": "rose_flower",
		"stk_shrek_ogre": "shrek_ogre", "shrek_ogre": "shrek_ogre",
		"stk_superhero_cape": "superhero_cape", "superhero_cape": "superhero_cape",
		"stk_spooky_ghost": "spooky_ghost", "spooky_ghost": "spooky_ghost",
		"stk_pirate_hat": "pirate_hat", "pirate_hat": "pirate_hat",
		"stk_volcano_lava": "volcano_lava", "volcano_lava": "volcano_lava",
		"stk_rain_storm": "rain_storm", "rain_storm": "rain_storm",
		"stk_fortnite_llama": "fortnite_llama", "fortnite_llama": "fortnite_llama",
		"stk_watercolor_art": "watercolor_art", "watercolor_art": "watercolor_art",
		"stk_golden_hour": "golden_hour", "golden_hour": "golden_hour",
		"stk_jungle_leaf": "jungle_leaf", "jungle_leaf": "jungle_leaf",
		"stk_cute_zombie": "cute_zombie", "cute_zombie": "cute_zombie",
		"stk_fireworks": "fireworks", "fireworks": "fireworks",
		"stk_new_year_2026": "new_year_2026", "new_year_2026": "new_year_2026",
		"stk_harry_potter": "harry_potter", "harry_potter": "harry_potter",
		"stk_minecraft": "minecraft", "minecraft": "minecraft",
		"stk_fire_flame": "fire_flame", "fire_flame": "fire_flame",
		"stk_giant_spider": "giant_spider", "giant_spider": "giant_spider",
		"stk_ocean_underwater": "ocean_underwater", "ocean_underwater": "ocean_underwater",
		"stk_ufo_alien": "ufo_alien", "ufo_alien": "ufo_alien",
        "stk_dio_disco": "disco_lights", "disco": "disco_lights",
        "stk_dio_bearded": "beard", "bearded": "beard", "stk_dio_bearded_holiday": "bearded",
        "stk_dio_looksmaxing": "looks_maxxing", "looksmaxing": "looks_maxxing",
        "stk_dio_slimed": "slimed", "slimed": "slimed",
        "stk_dio_clown": "clown", "clown": "clown",
        "stk_dio_tatted": "tatted", "tatted": "tatted"
    };

    const AI_PROMPTS = {
        "rose_flower": "Show the person in the photo with the exact same pose and background, but have them with a single rose in their mouth.",
        "shrek_ogre": "Show the person in the photo with the exact same pose and background, but transform them into Shrek with rounded ears, and rustic clothing while preserving the pose.",
        "superhero_cape": "Show the person in the photo with the exact same pose and background, but suit them up like a superhero in a blue and red outfit with a flowing cape.",
        "spooky_ghost": "Show the person in the photo with the exact same pose, expression, and background, but subtly insert a realistic-looking ghost somewhere in the background.",
        "pirate_hat": "Show the person in the photo with the exact same pose and background, but dress them like a pirate from Pirates of the Caribbean.",
        "volcano_lava": "Show the person in the photo with the exact same pose, background, and facial expression, but replace the ground with molten lava, glowing magma cracks, and volcanic sparks.",
        "rain_storm": "Retain the exact pose, facial features, distance, and background from the original image. Dress the subject as a character from the Wuthering Heights movie.",
        "fortnite_llama": "Show the person in the photo with the exact same pose, expression, and background, but make the entire scene look like it was rendered inside a video game, similar to the style of Fortnite.",
        "watercolor_art": "Show the person in the photo with the exact same pose, expression, and background, but render the entire scene as a watercolor painting with flowing brush strokes.",
        "golden_hour": "Show the person in the photo with the exact same pose, expression, and background, but make the scene look like it was captured during peak golden hour with warm sunlight.",
        "jungle_leaf": "Show the person in the photo with the exact same pose, background, and facial expression, but with their background surroundings overgrown with plants.",
        "cute_zombie": "Show the person in the photo with the exact same pose and background, but turn them into a zombie while keeping their pose and expression identical.",
        "fireworks": "Show the person in the photo with the exact same pose and background, but fill the scene with fireworks exploding in the night sky.",
        "new_year_2026": "Show the person in the photo with the exact same pose and background, but have them wearing decorative glasses that say Happy New Year 2026.",
        "harry_potter": "Show the person in the photo with the exact same pose and background, but show them as a character from Harry Potter wearing a robe.",
        "minecraft": "Show the person in the photo with the exact same pose, expression, and background, but make everything in the scene look like it was created from Minecraft-style blocks.",
        "fire_flame": "Show the persons in the photo with the exact same pose and background, but with a dramatic theatrical flame effect appearing just in front of the subject's face.",
        "giant_spider": "Show the person in the photo with the exact same pose, expression, and background, but place a realistic spider perched on them somewhere.",
        "ocean_underwater": "Show the person in the photo with the exact same pose, background, and facial expression, but as if them and their surrounding environment was underwater.",
        "ufo_alien": "Show the person in the photo with the exact same pose and background, but show a subtle UFO hovering in the sky or an alien.",
        "disco_lights": "Show the persons in the photo with the exact same pose and background, but with disco-style lighting effects cast across the scene, captured with a modern iPhone camera look.",
        "looks_maxxing": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
        "beard": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
        "slimed": "Show the persons in the photo with the exact same pose and background, but with thick green Nickelodeon-style slime being poured and splashing throughout the scene.",
        "clown": "Show the persons in the photo with the exact same pose and background, but styled as clowns.",
        "tatted": "Show the persons in the photo with the exact same pose and background, but with face tattoos applied."
    };

    function buildMock200Response(outputUrl) {
        return {
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
        };
    }

    function extractPhotoUrl(body) {
        if (!body) return "";
        let reqBody = {};
        try { reqBody = JSON.parse(body); } catch (e) {}
        let url = reqBody.imageUrl || reqBody.image_url || reqBody.inputUrl
               || reqBody.input_url || reqBody.url || reqBody.downloadUrl
               || reqBody.download_url || "";
        if (!url && reqBody.data) {
            url = reqBody.data.imageUrl || reqBody.data.image_url || reqBody.data.url || "";
        }
        if (!url && typeof body === "string") {
            const m = body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i);
            if (m) url = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
        }
        return url;
    }

    function extractFilterId(req) {
        const urlMatch = (req.url || "").match(/filter[\/=]([a-zA-Z0-9_\-]+)/i);
        if (urlMatch) return urlMatch[1];
        try {
            const b = JSON.parse(req.body || "{}");
            return b.filterId || b.filter_id || b.stickerId || b.sticker_id
                || b.filter || b.sticker || "";
        } catch (e) {}
        return "";
    }

    // ========== REQUEST ==========
    if (typeof $response === "undefined") {
        try {
            if (!$request) return $done({});
            if (!/locket|firebasestorage\.googleapis\.com/i.test($request.url || "")) return $done({});

            const photoUrl = extractPhotoUrl($request.body);
            if (!photoUrl) return $done({});

            const rawFilterId = extractFilterId($request);
            const filterId = STICKER_ID_MAP[rawFilterId] || rawFilterId;
            const prompt = AI_PROMPTS[filterId] || AI_PROMPTS[rawFilterId] || "Add a nice filter effect, keep the person's face identical.";

            const payload = JSON.stringify({
                imageUrl: photoUrl,
                filterId: filterId,
                prompt: prompt
            });

            const timer = setTimeout(function () {
                return $done(buildMock200Response(photoUrl));
            }, TIMEOUT_MS);

            $httpClient.post({
                url: WORKER_HOST,
                headers: { "Content-Type": "application/json" },
                body: payload,
                timeout: TIMEOUT_MS / 1000
            }, function (err, resp, data) {
                clearTimeout(timer);
                if (err || !resp || resp.status !== 200) {
                    return $done(buildMock200Response(photoUrl));
                }
                try {
                    const json = JSON.parse(data);
                    const outUrl =
                        (json.result && (json.result.outputUrl || json.result.output_url || json.result.url)) ||
                        json.outputUrl || json.output_url || json.url || json.imageUrl || json.image_url;
                    if (outUrl) {
                        return $done(buildMock200Response(outUrl + "?t=" + Date.now()));
                    }
                } catch (e) {}
                return $done(buildMock200Response(photoUrl));
            });
            return; 
        } catch (e) {
            return $done({});
        }
    }

    // ========== RESPONSE DỰ PHÒNG ==========
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
            delete respHeaders["Transfer-Encoding"];
            delete respHeaders["transfer-encoding"];
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
