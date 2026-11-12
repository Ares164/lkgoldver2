// ========= Locket Photobooth 4-Shot Engine & FULL AI Filter Modifier ========= //
// Tích hợp TOÀN BỘ hiệu ứng AI (hơn 50+ filters)
// ========================================================================= //

(function () {
    const WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
    const TIMEOUT_MS = 25000; 

    // TOÀN BỘ DANH SÁCH ID
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
        "stk_dio_tatted": "tatted", "tatted": "tatted",
        "stk_dio_cash": "cash_money", "cash": "cash_money",
        "stk_dio_wedding": "wedding", "wedding": "wedding",
        "stk_dio_cowboy": "cowboy_cowgirl", "cowboy": "cowboy_cowgirl",
        "stk_dio_orange_wig": "okay_wig", "orange_wig": "okay_wig",
        "stk_dio_bleached_hair": "blonde_bleached", "bleached_hair": "blonde_bleached",
        "stk_dio_bob": "bob_cut", "bob": "bob_cut",
        "stk_dio_sweat_hearts": "sweet_hearts", "sweat_hearts": "sweet_hearts",
        "stk_dio_elf": "elf_cutout", "elf": "elf_cutout",
        "stk_dio_santa": "santa_cutout", "santa": "santa_cutout",
        "stk_dio_easter_bunny": "easter_bunney_cutout", "easter_bunny": "easter_bunney_cutout",
        "stk_dio_easter_chick": "easter_chick_cutout", "easter_chick": "easter_chick_cutout",
        "stk_dio_toothless": "toothless", "toothless": "toothless",
        "stk_dio_bye_brows": "bye_brows", "bye_brows": "bye_brows",
        "stk_dio_bowling_ball": "bowling_ball", "bowling_ball": "bowling_ball",
        "stk_dio_buns": "buns", "buns": "buns",
        "stk_dio_mohawk": "mohawk", "mohawk": "mohawk",
        "stk_dio_braces": "braces", "braces": "braces",
        "stk_dio_princess": "princess", "princess": "princess",
        "stk_dio_happy_birthday": "happy_birthday", "happy_birthday": "happy_birthday",
        "stk_dio_cutesy": "cutesy", "cutesy": "cutesy",
        "stk_dio_sticker_face": "sticker_face", "sticker_face": "sticker_face",
        "stk_dio_flower_crown": "flower_crown", "flower_crown": "flower_crown",
        "stk_dio_love_bug": "love_bug", "love_bug": "love_bug",
        "stk_dio_giraffe": "giraffe", "giraffe": "giraffe",
        "stk_dio_leprechaun": "leprechaun", "leprechaun": "leprechaun",
        "stk_dio_lucky_face": "lucky_face", "lucky_face": "lucky_face",
        "stk_dio_frosty": "frosty", "frosty": "frosty",
        "stk_dio_influencer": "influencer", "influencer": "influencer"
    };

    // TOÀN BỘ PROMPT AI
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
        "disco_lights": "Show the persons in the photo with the exact same pose and background, but with disco-style lighting effects cast across the scene.",
        "looks_maxxing": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
        "beard": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
        "slimed": "Show the persons in the photo with the exact same pose and background, but with thick green Nickelodeon-style slime being poured.",
        "cowboy_cowgirl": "Show the persons in the photo with the exact same pose and background, but with subjects dressed in Western attire appropriate to each person.",
        "clown": "Show the persons in the photo with the exact same pose and background, but styled as clowns.",
        "tatted": "Show the persons in the photo with the exact same pose and background, but with face tattoos applied.",
        "bye_brows": "Show the persons in the photo with the exact same pose and background, but with only the eyebrow hair removed.",
        "bowling_ball": "Show the persons in the photo with the exact same pose and background, but with a completely bald head.",
        "blonde_bleached": "Show the persons in the photo with the exact same pose and background, but with a buzzed and bleached hairstyle.",
        "bob_cut": "Show the persons in the photo with the exact same pose and background, but with their hair cut into a bob hairstyle.",
        "mohawk": "Show the persons in the photo with the exact same pose and background, but with a mohawk hairstyle featuring shaved sides and a raised center strip.",
        "braces": "Show the persons in the photo with the exact same pose and background, but with multicolored braces visible on their teeth.",
        "flower_crown": "Show the persons in the photo with the exact same pose and background, but wearing a mixed wildflower crown.",
        "giraffe": "Show the persons in the photo with the exact same pose and background, but with the subject wearing a giraffe costume.",
        "leprechaun": "Show the person in the photo with the exact same pose, framing, expression, and background, but dress them in leprechaun costume.",
        "lucky_face": "Show the person in the photo with the exact same pose and background, but add cute, subtle freckles concentrated across the bridge of the nose and upper cheeks.",
        "elf_cutout": "Show the person in the photo with the exact same pose and background, but dressed up as an Elf.",
        "santa_cutout": "Show the person in the photo with the exact same pose and background, but dressed up as Santa Claus.",
        "easter_chick_cutout": "Show the persons in the photo with the exact same pose and background, but put them in a bright yellow Easter chick costume.",
        "influencer": "Show the persons in the photo with the exact same pose and background, but with a hyperbolic influencer makeup look applied to the face."
    };

    function buildMock200Response(outputUrl) {
        return {
            status: 200,
            headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                result: {
                    outputUrl: outputUrl, output_url: outputUrl, url: outputUrl,
                    imageUrl: outputUrl, image_url: outputUrl, status: 200,
                    data: { outputUrl: outputUrl, url: outputUrl, imageUrl: outputUrl }
                }
            })
        };
    }

    function extractPhotoUrl(body) {
        if (!body) return "";
        let reqBody = {};
        try { reqBody = JSON.parse(body); } catch (e) {}
        let url = reqBody.imageUrl || reqBody.image_url || reqBody.inputUrl || reqBody.input_url || reqBody.url || reqBody.downloadUrl || reqBody.download_url || "";
        if (!url && typeof body === "string") {
            const m = body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i);
            if (m) url = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
        }
        return url;
    }

    function extractFilterId(req) {
        try {
            const b = JSON.parse(req.body || "{}");
            return b.filterId || b.filter_id || b.stickerId || b.sticker_id || b.filter || b.sticker || "";
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
            
            // Tự động nhận diện Photobooth (Để trả ảnh gốc, ghép khung)
            const isPhotobooth = /^pb_|^photobooth_|^frame_/i.test(rawFilterId);

            if (isPhotobooth || !STICKER_ID_MAP[rawFilterId]) {
                return $done(buildMock200Response(photoUrl));
            }

            // Gọi AI
            const filterId = STICKER_ID_MAP[rawFilterId] || rawFilterId;
            const prompt = AI_PROMPTS[filterId] || "Add a nice filter effect, keep the person's face identical.";
            const payload = JSON.stringify({ imageUrl: photoUrl, filterId: filterId, prompt: prompt });

            // Trả ảnh gốc ngay để lách Timeout
            $done(buildMock200Response(photoUrl));

            // Chạy ngầm AI Replicate
            $httpClient.post({
                url: WORKER_HOST,
                headers: { "Content-Type": "application/json" },
                body: payload,
                timeout: TIMEOUT_MS / 1000
            }, function (err, resp, data) {
                if (!err && resp && resp.status === 200) {
                    try {
                        const json = JSON.parse(data);
                        const outUrl = (json.result && json.result.outputUrl) || json.outputUrl || json.url;
                        if (outUrl) {
                            if (typeof $persistentStore !== "undefined") {
                                $persistentStore.write(outUrl, "LOCKET_LAST_AI_RESULT");
                            }
                        }
                    } catch (e) {}
                }
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
