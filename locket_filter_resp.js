/***********************************************
> Locket All-in-One: Gold VIP + Unblur + FULL AI Filter (Replicate)
> Tác giả: GB & Custom AI
> Đã gộp toàn bộ 60+ bộ lọc AI và tính năng VIP
***********************************************/

const WORKER_HOST = "https://locket-vip.mhiep20077.workers.dev";
const AI_WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";

const VIP_STORE_KEY = "LOCKET_VIP_COMMUNITY";
const SELF_UID_KEY = "LOCKET_SELF_UID";
const SELF_USERNAME_KEY = "LOCKET_SELF_USERNAME";

const BASE_VIP_USERS = ["mhhiep","2c7dlquxuqulknrwgpcqsqlw0sk2","th_quang08","th_quang","nln9pozfecsccxhuqpiwvkhfwsi2","mhhuyz","7tulqjjxb0srwqbbp3euildiqfe3","nguyentuankietne","blgpf4fdvbbnlmfllziy4hnbjjn1","d4vy8lqpxevoi7yw0etjagd8ihm1","duuxx","nin1qotyjmnywtrmudubinmywwt1","kienvin","ovqinfsvsud70wk1zzamju8cxrf1","nightmarketserver","qudekzvkzif2oaox79fnh1fodxf3","nightmarket","j5n7ioiufeymskpmcohjjjswrxa2","7ghwealmlhxvkdvhp11vwwwciie2","hjmbhnrxstco62kjojgojtc8ddn2","dualato","g8mrjoobvcfgo6pomplyvmqfet92","12tsoagygjyx6xdmvqj7d5phsv93","6fbwotlsq5ojnd7azlrcuousv5k2","v6nunol4iiacnmfnrxsfoko5dxn2","khoia","zhuudjqjnatlsn350x4w0wnnnwn1","ak24","b09lwjxdn3ublwbgtjaqwwnvxcs1","ak2703","t5fvkfp994fywhgwfkwsikscleg1","duyvinh09","729ckhper7p0lnynwp0fsrtktng2","4a5e1hpej5zgxeaii5z2kdbmolf2","mpqza6lcmoxwtnwqn7jz2yi7vi22","ghfpj4icughbjhtrqt8hvfqiwmg2","zg1dvwmntaq2jmdvuwqel8fxhei2","tzxpq8rmhrsq70zyr0wwytnk5t33","enil4j1rdjfwzvkz4y5bxvcnv4k2","jfv4gmq9gie6g2capflgnozrwhg2","leanhminh2104","utjvlg8fbfx12lz0qp2c3n5qgay1","talaquaivat","eufsqtikwsre05wdktcibpcxvhi3","sarhlywj6doce6yybr0z3vx23ef1","tduc","znoppo16aanvdi2g9dswximmhrl2","8acssqcce7gwhfzxtkgdczgmjte2","daokinnn","4njw4uo7tusl1huh39dy03sl6xf1","tr.duck","2u96nqywrdeopjwhn4tvtivpeyh2","nguyenhoangtulinh","wphe1l0fp9g1wuifi0xrdv3zeqv1","6mvzl2stbafos0v8wwuujalumel1","gzbnnaurnib6no8ow5yz9cvtwct2","ann203","hkcgcbmndwve1uvnlcceu9gbscw1","q5yk3p7jd5qqqwth6aqaohcjvvl1","wvkrbhbs58zn9xp1oalb732uh922","nlidzrbg3sylny3hursjov5co8t2","effh2jtjanha5uhmx9mkhbw2kgw2","1zkaxildwlc54iqvpfvc0xshch93","nviitxuxhmypiq9crffclxbzj7v2","hunglaoshi","om2esk68dfxqfzryveblf1znoxx1","miubaby","mzuspertjfsfbfxhllmvrhzifx62","khaido1117","obu5ilvrknwrrtu1vyefp8odol43","1fcncwgripguvtx8hpjw10bsrzh3","pvaheohbr4v01cfg9hai1iwxdkt2","duonganhky","8kiu9dwtuicniutzojhr6kf0qyp1","o9ac9wcvwqgfxaw2hmdkbyluqkb2","ptan.01","vlrlnbb1esmdut8ch4bepfckkdk2","tloc0088","hso9tm4a6cpkcpgxjohxiqu6dhi1","yi9tybjdfzg0kbonhqjb516sbzw2","baoconcu","rhm8b6rlv1d3snxdfj1jxg1qcrc2","ho_ann","e11r1kxh4ezehcbglv0zun6dndn2","bichna14","w733f9quh4gceczqhipvtvmkqpk2","taikhoantest1","supfr8xxdkdph6rkcftz0lgsu6q1","ccc","onwh7iehjvgylmnsyu9ljuwp4a82","ntnmedia","gvneomp84yuw8znzpyyqhwwasiy2","6bsfuqrk1zw8yvqanhnvwndvqql1","nguyentankietne","oeg7utzfdff5kppub7vcfiqmlli2","phw_naw","grtrogz4xcdhznd8kzdrkdl66md2","bn_sii","f7ugzfhyc7xrikjvee8wbrcmt0k1","oahn2309","fuokhow1rxuvugyb0bz7xl3wcku2","mhhieuz","igxfmpws63dt7zpaqp0irtruyj72","canh.quang","t9inecetx2dje9n36vvyb9xomxy2","kienviet","lebao1604"];

function applyGoldBadge(target) {
    if (!target || typeof target !== "object") return;
    target.badge = "locket_gold"; target.badge_tier = "gold"; target.show_badge = true;
    target.is_gold = true; target.has_gold = true; target.gold = true;
    target.gold_subscription = true; target.has_gold_subscription = true;
    target.tier = "gold"; target.subscription_status = "active";
    if (target.user && typeof target.user === "object" && target.user !== target) applyGoldBadge(target.user);
    if (target.friend && typeof target.friend === "object" && target.friend !== target) applyGoldBadge(target.friend);
    if (target.profile && typeof target.profile === "object" && target.profile !== target) applyGoldBadge(target.profile);
}

function isNodeVip(target, vSet) {
    if (!target || typeof target !== "object") return false;
    const uid = String(target.uid || target.user_id || target.id || target.friend_uid || target.friend_id || target.friendId || target.userId || "").toLowerCase().trim();
    if (uid && vSet.has(uid)) return true;
    const uname = String(target.username || target.friend_username || "").toLowerCase().trim();
    if (uname && vSet.has(uname)) return true;
    if (target.user && typeof target.user === "object") {
        const uUid = String(target.user.uid || target.user.id || target.user.user_id || "").toLowerCase().trim();
        if (uUid && vSet.has(uUid)) return true;
        const uUname = String(target.user.username || target.user.friend_username || "").toLowerCase().trim();
        if (uUname && vSet.has(uUname)) return true;
    }
    return false;
}

// TOÀN BỘ DANH SÁCH ID VÀ PROMPT AI CỦA BẠN
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
    "stk_dio_pm2": "locket",
    "stk_dio_cash": "cash_money", "cash": "cash_money",
    "stk_dio_wedding": "wedding", "wedding": "wedding",
    "stk_dio_cowboy": "cowboy_cowgirl", "cowboy": "cowboy_cowgirl",
    "stk_dio_looksmaxing": "looks_maxxing", "looksmaxing": "looks_maxxing",
    "stk_dio_orange_wig": "okay_wig", "orange_wig": "okay_wig",
    "stk_dio_bleached_hair": "blonde_bleached", "bleached_hair": "blonde_bleached",
    "stk_dio_bob": "bob_cut", "bob": "bob_cut",
    "stk_dio_bearded": "beard", "bearded": "beard", "stk_dio_bearded_holiday": "bearded",
    "stk_dio_sweat_hearts": "sweet_hearts", "sweat_hearts": "sweet_hearts",
    "stk_dio_elf": "elf_cutout", "elf": "elf_cutout",
    "stk_dio_santa": "santa_cutout", "santa": "santa_cutout",
    "stk_dio_easter_bunny": "easter_bunney_cutout", "easter_bunny": "easter_bunney_cutout",
    "stk_dio_easter_chick": "easter_chick_cutout", "easter_chick": "easter_chick_cutout",
    "stk_dio_toothless": "toothless", "toothless": "toothless",
    "stk_dio_bye_brows": "bye_brows", "bye_brows": "bye_brows",
    "stk_dio_bowling_ball": "bowling_ball", "bowling_ball": "bowling_ball",
    "stk_dio_buns": "buns", "buns": "buns",
    "stk_dio_tatted": "tatted", "tatted": "tatted",
    "stk_dio_mohawk": "mohawk", "mohawk": "mohawk",
    "stk_dio_braces": "braces", "braces": "braces",
    "stk_dio_slimed": "slimed", "slimed": "slimed",
    "stk_dio_princess": "princess", "princess": "princess",
    "stk_dio_happy_birthday": "happy_birthday", "happy_birthday": "happy_birthday",
    "stk_dio_cutesy": "cutesy", "cutesy": "cutesy",
    "stk_dio_sticker_face": "sticker_face", "sticker_face": "sticker_face",
    "stk_dio_flower_crown": "flower_crown", "flower_crown": "flower_crown",
    "stk_dio_love_bug": "love_bug", "love_bug": "love_bug",
    "stk_dio_giraffe": "giraffe", "giraffe": "giraffe",
    "stk_dio_clown": "clown", "clown": "clown",
    "stk_dio_leprechaun": "leprechaun", "leprechaun": "leprechaun",
    "stk_dio_lucky_face": "lucky_face", "lucky_face": "lucky_face",
    "stk_dio_frosty": "frosty", "frosty": "frosty",
    "stk_dio_influencer": "influencer", "influencer": "influencer"
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
    "disco_lights": "Show the persons in the photo with the exact same pose and background, but with disco-style lighting effects cast across the scene.",
    "influencer": "Show the persons in the photo with the exact same pose and background, but with a hyperbolic influencer makeup look applied to the face.",
    "princess": "Show the person in the photo with the exact same pose and background, but portray them as a prince charming or a beautiful princess from a fairytale.",
    "looks_maxxing": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
    "beard": "Show the persons in the photo with the exact same pose and background, but with a full, full-length beard added to the face.",
    "slimed": "Show the persons in the photo with the exact same pose and background, but with thick green Nickelodeon-style slime being poured and splashing throughout the scene.",
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
    "photobooth": "Show the persons in the photo with the exact same pose and background, captured with a Korean photobooth 4-cut aesthetic.",
    "photobooth_4cut": "Show the persons in the photo with the exact same pose and background, captured with a Korean photobooth 4-cut aesthetic.",
    "photobooth_cute": "Show the persons in the photo with the exact same pose and background, captured with a cute pastel aesthetic.",
    "pb_strawberry": "Show the persons in the photo with the exact same pose and background, captured with a cute pastel strawberry photobooth aesthetic.",
    "pb_vintage": "Show the persons in the photo with the exact same pose and background, captured with vintage 90s film aesthetic.",
    "pb_galaxy": "Show the persons in the photo with the exact same pose and background, captured with dreamy galaxy stars lighting.",
    "pb_holo_4cut": "Show the persons in the photo with the exact same pose and background, captured with holographic Y2K aesthetic.",
    "pb_scrapbook_ripped_4cut": "Show the persons in the photo with the exact same pose and background, captured with scrapbook vintage paper aesthetic.",
    "pb_ripped_paper_4cut": "Show the persons in the photo with the exact same pose and background, captured with artistic ripped paper collage aesthetic.",
    "pb_denim_ripped_2x2": "Show the persons in the photo with the exact same pose and background, captured with stylish 90s denim aesthetic.",
    "frame_classic_pb": "Show the persons in the photo with the exact same pose and background, captured with classic black and white film photobooth aesthetic."
};

function buildMock200Response(outputUrl) {
    return {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ result: { outputUrl: outputUrl, output_url: outputUrl, url: outputUrl, imageUrl: outputUrl, image_url: outputUrl, status: 200 } })
    };
}

function extractPhotoUrl(body) {
    if (!body) return "";
    let reqBody = {};
    try { reqBody = JSON.parse(body); } catch (e) {}
    let url = reqBody.imageUrl || reqBody.image_url || reqBody.inputUrl || reqBody.input_url || reqBody.url || reqBody.downloadUrl || reqBody.download_url || "";
    if (!url && reqBody.data) url = reqBody.data.imageUrl || reqBody.data.image_url || reqBody.data.url || "";
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
        return b.filterId || b.filter_id || b.stickerId || b.sticker_id || b.filter || b.sticker || "";
    } catch (e) {}
    return "";
}

// =========================================================================
// 1. CHIỀU REQUEST
// =========================================================================
if (typeof $response === "undefined") {
    const reqUrl = (typeof $request !== "undefined" && $request.url) ? $request.url : "";

    if (reqUrl.includes("generateFilteredImage")) {
        const photoUrl = extractPhotoUrl($request.body);
        if (photoUrl) {
            const rawFilterId = extractFilterId($request);
            const filterId = STICKER_ID_MAP[rawFilterId] || rawFilterId;
            const prompt = AI_PROMPTS[filterId] || AI_PROMPTS[rawFilterId] || "Add a nice filter effect, keep the person's face identical.";

            const payload = JSON.stringify({ imageUrl: photoUrl, filterId: filterId, prompt: prompt });

            const timer = setTimeout(function () { return $done(buildMock200Response(photoUrl)); }, 25000);

            $httpClient.post({
                url: AI_WORKER_HOST,
                headers: { "Content-Type": "application/json" },
                body: payload,
                timeout: 25
            }, function (err, resp, data) {
                clearTimeout(timer);
                if (err || !resp || resp.status !== 200) return $done(buildMock200Response(photoUrl));
                try {
                    const json = JSON.parse(data);
                    const outUrl = json.result?.outputUrl || json.outputUrl || json.url;
                    if (outUrl) return $done(buildMock200Response(outUrl + "?t=" + Date.now()));
                } catch (e) {}
                return $done(buildMock200Response(photoUrl));
            });
            return; 
        }
    }

    if (reqUrl.includes("changeProfileInfo")) {
        $done({
            response: {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    data: { badge: "locket_gold", badge_tier: "gold", is_gold: true, success: true },
                    result: { badge: "locket_gold", badge_tier: "gold", is_gold: true, success: true }
                })
            }
        });
        return;
    }

    let headers = Object.assign({}, ($request && $request.headers) || {});
    for (let k of Object.keys(headers)) {
        if (['if-none-match', 'if-modified-since', 'x-revenuecat-etag'].includes(k.toLowerCase())) delete headers[k];
    }
    $done({ headers: headers });
}

// =========================================================================
// 2. CHIỀU RESPONSE
// =========================================================================
else {
    const reqUrl = (typeof $request !== "undefined" && $request.url) ? $request.url : "";

    let body = $response.body;
    let status = $response.status || $response.statusCode || 200;

    // Bỏ qua xử lý AI ở chiều response (để AI tự do trả ảnh)
    if (reqUrl.includes("generateFilteredImage")) {
        let aiHeaders = Object.assign({}, ($response && $response.headers) || {});
        delete aiHeaders["Content-Encoding"];
        delete aiHeaders["content-encoding"];
        delete aiHeaders["Content-Length"];
        delete aiHeaders["content-length"];
        aiHeaders["content-type"] = "application/json; charset=utf-8";
        $done({ status: 200, headers: aiHeaders, body: body });
        return;
    }

    const customArg = (typeof $argument === "string" && $argument.trim()) ? $argument.trim().toLowerCase() : "";
    const unlockAllFriends = customArg.includes("all_friends=true") || customArg.includes("gold_all=true");

    let vipSet = new Set(BASE_VIP_USERS.map(u => String(u).toLowerCase().trim()));

    function extractSelfUidFromHeaders(headers) {
        if (!headers || typeof headers !== "object") return null;
        const auth = headers["authorization"] || headers["Authorization"] || headers["AUTHORIZATION"] || "";
        if (!auth || typeof auth !== "string") return null;
        const token = auth.replace(/^Bearer\s+/i, "").trim();
        const parts = token.split(".");
        if (parts.length >= 2) {
            try {
                let base64Url = parts[1].replace(/-/g, "+").replace(/_/g, "/");
                while (base64Url.length % 4) base64Url += "=";
                let output = "";
                let str = String(base64Url).replace(/=+$/, "");
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) { buffer = chars.indexOf(buffer); }
                if (output) {
                    const payload = JSON.parse(output);
                    return payload.user_id || payload.sub || payload.uid || null;
                }
            } catch (e) {}
        }
        return null;
    }

    const reqHeaders = (typeof $request !== "undefined" && $request && $request.headers) ? $request.headers : {};
    const jwtSelfUid = extractSelfUidFromHeaders(reqHeaders);
    let myUid = (typeof $persistentStore !== "undefined") ? $persistentStore.read(SELF_UID_KEY) : null;
    if (jwtSelfUid) {
        myUid = jwtSelfUid;
        if (typeof $persistentStore !== "undefined") $persistentStore.write(myUid, SELF_UID_KEY);
    }
    if (myUid) vipSet.add(String(myUid).toLowerCase().trim());
    const myUname = (typeof $persistentStore !== "undefined") ? $persistentStore.read(SELF_USERNAME_KEY) : null;
    if (myUname) vipSet.add(String(myUname).toLowerCase().trim());

    if (typeof $persistentStore !== "undefined") {
        try {
            const rawVip = $persistentStore.read(VIP_STORE_KEY);
            if (rawVip) {
                const list = JSON.parse(rawVip);
                if (Array.isArray(list)) {
                    for (let id of list) { if (id) vipSet.add(String(id).toLowerCase().trim()); }
                }
            }
        } catch (e) {}
    }

    if (body && typeof body === "string") {
        try {
            let obj = JSON.parse(body);
            const isFriendsOrFeed = /getFriends|getUsers|fetchFriends|getRecipients|recipients|moments|fetchMoments|getMoments|contacts/i.test(reqUrl);

            if (!isFriendsOrFeed && (status === 402 || status === 403 || status === 400)) status = 200;

            function unlockSelfUser(userNode) {
                if (!userNode || typeof userNode !== "object") return;
                applyGoldBadge(userNode);
                userNode.can_use_filters = true;
                userNode.can_use_gold_features = true;
                userNode.has_ai_access = true;
                userNode.filter_access = true;

                const actual = (userNode.user && typeof userNode.user === "object") ? userNode.user : userNode;
                const uid = String(actual.uid || actual.user_id || actual.id || userNode.uid || userNode.user_id || userNode.id || myUid || "").toLowerCase().trim();
                const username = String(actual.username || userNode.username || "").toLowerCase().trim();

                if (typeof $persistentStore !== "undefined") {
                    if (uid) $persistentStore.write(uid, SELF_UID_KEY);
                    if (username) $persistentStore.write(username, SELF_USERNAME_KEY);
                }
                if (uid) vipSet.add(uid);
                if (username) vipSet.add(username);

                if ((uid || username) && typeof $httpClient !== "undefined") {
                    try { $httpClient.get(`${WORKER_HOST}/api/register-vip?uid=${encodeURIComponent(uid)}&username=${encodeURIComponent(username)}`, function() {}); } catch (e) {}
                }

                const authHeader = reqHeaders["authorization"] || reqHeaders["Authorization"];
                if (authHeader && typeof $httpClient !== "undefined") {
                    const lastSyncTime = (typeof $persistentStore !== "undefined") ? $persistentStore.read("LOCKET_PROFILE_BADGE_SYNCED") : null;
                    const now = Date.now();
                    if (!lastSyncTime || (now - Number(lastSyncTime)) > 3600000) {
                        if (typeof $persistentStore !== "undefined") $persistentStore.write(String(now), "LOCKET_PROFILE_BADGE_SYNCED");
                        try {
                            $httpClient.post({
                                url: "https://api.locketcamera.com/changeProfileInfo",
                                headers: { "Authorization": authHeader, "Content-Type": "application/json" },
                                body: JSON.stringify({ data: { badge: "locket_gold" } })
                            }, function() {});
                        } catch (e) {}
                    }
                }
            }

            const isSingleUserProfile = Boolean(
                !isFriendsOrFeed &&
                ((obj && obj.data && typeof obj.data === "object" && !Array.isArray(obj.data) && (obj.data.email || (myUid && obj.data.uid === myUid))) ||
                 (obj && obj.result && typeof obj.result === "object" && !Array.isArray(obj.result) && (obj.result.email || (myUid && obj.result.uid === myUid))) ||
                 (obj && obj.user && typeof obj.user === "object" && !Array.isArray(obj.user) && (obj.user.email || (myUid && obj.user.uid === myUid))))
            );

            if (isSingleUserProfile) {
                applyGoldBadge(obj);
                unlockSelfUser(obj.data || obj.result || obj.user || obj);
            }

            function transformNode(node) {
                if (!node || typeof node !== "object") return;
                if (Array.isArray(node)) {
                    for (let i = 0; i < node.length; i++) transformNode(node[i]);
                    return;
                }

                const actualUser = (node.user && typeof node.user === "object") ? node.user : node;
                const nodeUid = String(actualUser.uid || actualUser.user_id || actualUser.id || node.uid || node.user_id || node.id || "").toLowerCase().trim();

                const isSelf = Boolean(
                    (myUid && nodeUid && nodeUid === myUid.toLowerCase()) ||
                    ("email" in node && node.email && typeof node.email === "string" && node.email.includes("@")) ||
                    ("push_token" in node && node.push_token) || ("fcm_token" in node && node.fcm_token)
                );

                if (isSelf) {
                    unlockSelfUser(node);
                } else {
                    const isVipFriend = unlockAllFriends || isNodeVip(node, vipSet);
                    if (isVipFriend) {
                        applyGoldBadge(node);
                        if (node.user && typeof node.user === "object") applyGoldBadge(node.user);
                        if (node.friend && typeof node.friend === "object") applyGoldBadge(node.friend);
                    }
                }

                const falseFlags = ["is_locked", "locked", "requires_gold", "require_gold", "gold_only", "is_gold_only", "paywall", "show_paywall", "show_upsell", "upsell", "blurred", "is_blurred", "needs_gold"];
                for (let f of falseFlags) { if (f in node) node[f] = false; }

                const trueFlags = ["can_view", "unlocked", "is_unlocked", "is_free", "free", "can_use_filter", "allowed", "can_use_filters"];
                for (let t of trueFlags) { if (t in node) node[t] = true; }

                const clearUrl = node.unblurred_url || node.unlocked_url || node.result_url || node.image_url || node.transformed_image_url || node.url;
                if (clearUrl && typeof clearUrl === "string" && clearUrl.startsWith("http")) {
                    if ("blurred_url" in node) node.blurred_url = clearUrl;
                    if ("blurred_image_url" in node) node.blurred_image_url = clearUrl;
                    if ("preview_url" in node && node.is_blurred) node.preview_url = clearUrl;
                }

                for (let k of Object.keys(node)) {
                    if (k !== "badge" && k !== "is_gold" && k !== "has_gold" && k !== "tier" && k !== "gold") {
                        if (vipSet.has(k.toLowerCase().trim()) && node[k] && typeof node[k] === "object") applyGoldBadge(node[k]);
                        transformNode(node[k]);
                    }
                }
            }

            transformNode(obj);
            body = JSON.stringify(obj);
        } catch (e) {}
    }

    if (typeof $httpClient !== "undefined") {
        try {
            $httpClient.get(`${WORKER_HOST}/api/vip-users`, function(err, resp, data) {
                if (!err && data) {
                    try {
                        const resData = JSON.parse(data);
                        if (resData && Array.isArray(resData.identifiers) && typeof $persistentStore !== "undefined") {
                            $persistentStore.write(JSON.stringify(resData.identifiers), VIP_STORE_KEY);
                        }
                    } catch (e) {}
                }
            });
        } catch (e) {}
    }

    let respHeaders = Object.assign({}, ($response && $response.headers) || {});
    delete respHeaders["Content-Encoding"];
    delete respHeaders["content-encoding"];
    delete respHeaders["Content-Length"];
    delete respHeaders["content-length"];
    delete respHeaders["Transfer-Encoding"];
    delete respHeaders["transfer-encoding"];
    respHeaders["content-type"] = "application/json; charset=utf-8";

    $done({ status: status, headers: respHeaders, body: body });
}
