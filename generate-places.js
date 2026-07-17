const fs = require('fs');
const path = require('path');

const attractions = [
  {
    name: "Charlotte Lake",
    quickAnswer: "The primary source of drinking water for Matheran, Charlotte Lake is a tranquil spot surrounded by dense forest. It is a must-visit during the monsoon when the nearby waterfalls are in full flow, offering a serene escape as part of your Matheran tour package.",
    overview: {
      famous: "Known as the most picturesque water body in the region, providing 100% of the town's drinking water.",
      unique: "It hosts a small dam at one end and the ancient Pisharnath Mahadev Mandir on its right bank. The echo of the nearby waterfalls during the monsoon is breathtaking.",
      who: "Nature lovers, photographers, families, and couples looking for a peaceful retreat."
    },
    highlights: [
      "Pisharnath Mahadev Temple located right on the bank.",
      "Lush green surroundings with excellent bird-watching opportunities.",
      "Close proximity to Echo Point and Louisa Point."
    ],
    history: "Constructed in 1956 to supply drinking water to Matheran town, keeping the ecological balance intact.",
    bestTime: "Monsoon (July to September) when the lake is overflowing and waterfalls are active.",
    sun: "Excellent for early morning misty sunrise views.",
    photography: "Shoot from the dam end to get the temple reflection in the water. Best lighting is early morning before 8 AM to avoid harsh sun and crowds.",
    entryFee: "Free",
    timings: "Sunrise to Sunset (6:00 AM - 6:00 PM)",
    timeRequired: "1 - 1.5 Hours",
    walkingDifficulty: "Easy (Level path with some muddy patches in monsoon)",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No (The path gets uneven near the banks)",
    nearby: "Louisa Point, Echo Point, Pisharnath Mahadev Mandir",
    insiderTip: "Do not visit the lake strictly in the afternoon during summer; water levels recede significantly. Morning mist in winter is magical.",
    mistakes: "Swimming or dipping your feet is strictly prohibited as it is a drinking water source. Do not feed the aggressive monkeys nearby.",
    practical: "Carry an umbrella and wear grip shoes in monsoon. There are small stalls selling roasted corn (bhutta) and tea nearby."
  },
  {
    name: "Panorama Point",
    quickAnswer: "The absolute best place for a 360-degree panoramic view of the Sahyadri ranges. Panorama Point is a popular inclusion in any Maharashtra tour package for its breathtaking sunrise over the Western Ghats.",
    overview: {
      famous: "Famous for being the only point in Matheran that offers a complete 360-degree view of the surrounding valleys and Neral town.",
      unique: "It requires the longest trek from the central market, meaning it is less crowded and incredibly peaceful.",
      who: "Early risers, trekkers, and landscape photographers."
    },
    highlights: [
      "Sweeping 360-degree views of the Western Ghats.",
      "Clear visibility of Neral town and the Ulhas River.",
      "The most iconic sunrise spot in Matheran."
    ],
    history: "Developed during the British era as a prime observation deck for the surrounding region.",
    bestTime: "October to February for clear skies, or early morning year-round.",
    sun: "Best Sunrise Point in Matheran.",
    photography: "Bring a wide-angle lens. Arrive 30 minutes before sunrise for the blue hour. A tripod is highly recommended.",
    entryFee: "Free",
    timings: "5:30 AM - 6:00 PM",
    timeRequired: "45 Mins at the point (Plus 1 hour walk each way)",
    walkingDifficulty: "Moderate to Difficult (Longest walk in Matheran, approx 5-6 km from market)",
    familyFriendly: "Yes (But not recommended for toddlers due to the long walk)",
    seniorCitizenFriendly: "No (Unless hiring a horse)",
    wheelchair: "No",
    nearby: "Monkey Point, Heart Point",
    insiderTip: "Hire a horse the evening before if you want to make it for sunrise, as walking 6km in the dark forest can be daunting.",
    mistakes: "Starting the trek too late in the morning and missing the sunrise completely.",
    practical: "Carry a flashlight/headlamp for the early morning trek. Bring your own water; stalls may not be open at dawn."
  },
  {
    name: "Echo Point",
    quickAnswer: "A highly interactive viewpoint where you can hear your voice bounce back from the Sahyadri mountains. A classic stop in any family tour package, offering great fun and steep valley views.",
    overview: {
      famous: "Renowned for its acoustic phenomenon where sound reverberates vividly against the opposite hills.",
      unique: "Aside from the echo, it provides a stunning vertical drop view of the valley below, draped in greenery.",
      who: "Families with children, couples, and casual walkers."
    },
    highlights: [
      "Clear, distinct echoes across the valley.",
      "Stunning views of the dense forest canopy below.",
      "Food stalls serving Maggie, corn, and hot tea right at the edge."
    ],
    history: "",
    bestTime: "Post-monsoon (September to November) for lush greenery, but clear skies are needed for the best echo.",
    sun: "Good for Afternoon light; not a specific sunrise/sunset point.",
    photography: "Great for capturing human emotion and fun. The backdrop is a vast, green valley.",
    entryFee: "Free",
    timings: "7:00 AM - 6:00 PM",
    timeRequired: "30 - 45 Mins",
    walkingDifficulty: "Easy",
    familyFriendly: "Yes (Kids love shouting their names)",
    seniorCitizenFriendly: "Yes (Easily accessible by a short walk or horse ride)",
    wheelchair: "No (Uneven red mud tracks)",
    nearby: "Charlotte Lake, Louisa Point",
    insiderTip: "Face the gap between the two opposite peaks and shout clearly for the best reverberation.",
    mistakes: "Visiting on a windy day; heavy winds disrupt the sound waves, completely ruining the echo effect.",
    practical: "Expect heavy crowds here during weekends. Guard your belongings as monkey activity is high."
  },
  {
    name: "Louisa Point",
    quickAnswer: "Offering the most dramatic views of the ruined Prabal Fort and Vishalgarh, Louisa Point is arguably the most visually striking cliff edge in Matheran, perfect for landscape photography and sunset viewing.",
    overview: {
      famous: "Famous for its unrestricted view of the massive Prabal Fort plateau and the plunging valleys below.",
      unique: "The sheer vertical drop from the cliff face makes it thrilling. During the monsoon, multiple waterfalls can be seen cascading down the opposite mountains.",
      who: "Photographers, thrill-seekers, and nature enthusiasts."
    },
    highlights: [
      "Clear views of Prabalgad and Vishalgarh forts.",
      "Lion's Head rock formation visible from the edge.",
      "Spectacular waterfalls in the monsoon season."
    ],
    history: "Named after the wife of a British officer who fell in love with this specific viewpoint.",
    bestTime: "Monsoon for waterfalls, or Winter for clear sunset views.",
    sun: "Excellent for Sunset.",
    photography: "Use a telephoto lens to capture the details of Prabal Fort. The golden hour lighting striking the fort walls is incredible.",
    entryFee: "Free",
    timings: "6:00 AM - 6:30 PM",
    timeRequired: "45 Mins - 1 Hour",
    walkingDifficulty: "Easy to Moderate (About 2 km from the market)",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes (Accessible via horse or hand-pulled rickshaw)",
    wheelchair: "No",
    nearby: "Charlotte Lake, Echo Point",
    insiderTip: "During heavy monsoons, you can experience 'reverse waterfalls' here due to strong updrafts pushing the water back up the cliff.",
    mistakes: "Standing too close to the edge for selfies; there are no guardrails in many sections.",
    practical: "Combine Louisa Point, Echo Point, and Charlotte Lake into one morning circuit."
  },
  {
    name: "One Tree Hill Point",
    quickAnswer: "A unique geological formation featuring a single Jambhul tree standing on a solitary hill. It offers a famous trekking route down to Chowk village and is a highlight for adventure seekers.",
    overview: {
      famous: "Famous for its distinct topography—a lone tree on a hilltop—and for being the endpoint of the popular 'One Tree Hill Trek'.",
      unique: "It provides a clear view of the deep valleys and the Mumbai-Pune highway in the distance. The isolation of the single tree makes it a poetic landscape.",
      who: "Trekkers, solo travelers, and couples."
    },
    highlights: [
      "The solitary Jambhul tree on the peak.",
      "Trailhead for the thrilling descent to Chowk village.",
      "Panoramic views of the Tent Hill and Chowk valley."
    ],
    history: "The trail was originally mapped by Hugh Poyntz Malet, the discoverer of Matheran, in 1850.",
    bestTime: "Winter and pre-summer (October to March). Monsoon makes the trekking route extremely slippery.",
    sun: "Great for Afternoon and Sunset views.",
    photography: "A classic composition is framing the lone tree against the vast valley backdrop.",
    entryFee: "Free",
    timings: "7:00 AM - 6:00 PM",
    timeRequired: "45 Mins (If just viewing)",
    walkingDifficulty: "Moderate (The path is rocky and forested)",
    familyFriendly: "Yes (For viewing from the top)",
    seniorCitizenFriendly: "No (The path can be uneven and rocky)",
    wheelchair: "No",
    nearby: "Olympia Racecourse, Matheran Market",
    insiderTip: "If you are an experienced trekker, the hike up from Chowk village to One Tree Hill is one of the best weekend treks in Maharashtra.",
    mistakes: "Attempting the trek down to Chowk without a local guide or proper trekking shoes.",
    practical: "This point is relatively isolated. Carry snacks and water as there are fewer stalls here compared to Echo Point."
  },
  {
    name: "Alexander Point",
    quickAnswer: "A pristine viewpoint offering sweeping vistas of Palasdari Lake, Rambaug Point, and Garbut Point. It is relatively close to the main market, making it an easy addition to any Matheran tour package.",
    overview: {
      famous: "Known for its deep valley views and the distant sight of the Bor Ghat towers.",
      unique: "Because of its location on the edge of the forest, the transition from dense woods to an open, plunging valley is dramatic.",
      who: "Families, elderly travelers, and casual walkers."
    },
    highlights: [
      "Views of Garbut Point and Rambaug Point.",
      "Glimpses of Palasdari Lake in the distance.",
      "Lush green valley drops."
    ],
    history: "",
    bestTime: "Post-monsoon (September to November) for the clearest views.",
    sun: "Good for Sunrise.",
    photography: "Great for panoramic shots of the valleys. The early morning light hits the valley floor beautifully.",
    entryFee: "Free",
    timings: "6:00 AM - 6:00 PM",
    timeRequired: "30 Mins",
    walkingDifficulty: "Easy (Just a 15-20 minute walk from the market)",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "Rambaug Point, Matheran Market",
    insiderTip: "Since it is very close to the market, visit this point first thing in the morning before breakfast for a quiet, misty experience.",
    mistakes: "Skipping it because it seems 'too close' to the market; the views are genuinely spectacular.",
    practical: "The path is wide and well-trodden, making it one of the safest points for families with toddlers."
  },
  {
    name: "Monkey Point",
    quickAnswer: "True to its name, this point is home to large troops of indigenous monkeys. It offers a beautiful view of the Western Ghats and is a hit in family tour packages.",
    overview: {
      famous: "Famous for the dense population of monkeys (macaques and langurs) that inhabit the trees around the cliff.",
      unique: "It also has a mild echo effect and provides a clear view of the Bhaomalgad peak.",
      who: "Families with kids and wildlife enthusiasts."
    },
    highlights: [
      "Observing monkeys in their natural habitat.",
      "Views of the deep gorges and Bhaomalgad.",
      "Cool breeze due to the funneling effect of the valley."
    ],
    history: "",
    bestTime: "Year-round.",
    sun: "Good for Afternoon light.",
    photography: "Keep your camera strapped tightly. Use a fast shutter speed to capture the monkeys playing.",
    entryFee: "Free",
    timings: "7:00 AM - 6:00 PM",
    timeRequired: "30 Mins",
    walkingDifficulty: "Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "Porcupine Point, Heart Point",
    insiderTip: "Do not carry plastic bags or food packets openly. The monkeys associate crinkling plastic with food and will snatch it.",
    mistakes: "Trying to feed or touch the monkeys. They are wild animals and can become aggressive.",
    practical: "Keep children close and avoid making aggressive eye contact with the larger male monkeys."
  },
  {
    name: "Porcupine Point",
    quickAnswer: "Also widely known as Sunset Point, this is the most famous spot to watch the sun dip below the horizon in Matheran. A staple in all Matheran tour packages for couples and honeymooners.",
    overview: {
      famous: "Renowned as the definitive sunset viewpoint in Matheran, drawing large crowds every evening.",
      unique: "The shape of the cliff resembles a porcupine quills, giving it its name. It offers a direct view of the Prabalgad fort silhouette against the setting sun.",
      who: "Couples, photographers, and everyone who loves a good sunset."
    },
    highlights: [
      "Unmatched sunset views over the Sahyadris.",
      "Silhouettes of distant forts and hills.",
      "A vibrant atmosphere with local vendors selling snacks."
    ],
    history: "",
    bestTime: "October to May. (Sunsets are usually blocked by clouds during the monsoon).",
    sun: "Best Sunset Point.",
    photography: "Arrive at least 45 minutes before sunset to secure a good spot. Use exposure bracketing to capture the dynamic range of the sky and the dark valley.",
    entryFee: "Free",
    timings: "5:00 PM - 7:00 PM (Best visiting window)",
    timeRequired: "1 Hour",
    walkingDifficulty: "Moderate (About 2 km from the market through dense forest)",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes (Via horse)",
    wheelchair: "No",
    nearby: "Monkey Point, Malang Point",
    insiderTip: "Leave the point immediately after the sun sets. The 2km walk back through the dense forest gets pitch dark very quickly.",
    mistakes: "Arriving exactly at sunset; it gets very crowded, and you will struggle to find a clean viewing angle.",
    practical: "Carry a flashlight for the walk back. Treat yourself to some hot corn and tea from the vendors while waiting for the sun to go down."
  },
  {
    name: "Sunset Point",
    quickAnswer: "While Porcupine Point is the official Sunset Point, the entire western ridge offers spectacular sunset views. This general area provides the classic Matheran evening experience.",
    overview: {
      famous: "The western ridge provides multiple vantage points for the evening golden hour.",
      unique: "It's the best place to end your day before heading back to the market for dinner.",
      who: "All visitors."
    },
    highlights: [
      "Golden hour lighting across the valleys.",
      "Cooler evening temperatures."
    ],
    history: "",
    bestTime: "Winter and Summer.",
    sun: "Sunset.",
    photography: "Look for framing elements like tree branches to give your sunset photos depth.",
    entryFee: "Free",
    timings: "Evening",
    timeRequired: "45 Mins",
    walkingDifficulty: "Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "Porcupine Point",
    insiderTip: "If Porcupine Point is too crowded, walk 100 meters north or south along the ridge for a private, uninterrupted view.",
    mistakes: "Forgetting a jacket; the temperature drops rapidly after sunset in winter.",
    practical: "Group your visit with Monkey Point in the late afternoon."
  },
  {
    name: "Honeymoon Point",
    quickAnswer: "A secluded and romantic viewpoint offering a sweeping view of the grand canyon of Matheran. Highly recommended for couples booking a honeymoon package in Maharashtra.",
    overview: {
      famous: "Known for its privacy and the breathtaking 'Grand Canyon' style view of the deep ravines.",
      unique: "It is slightly off the main tourist circuit, meaning it remains relatively quiet even during peak season.",
      who: "Couples, honeymooners, and peace-seekers."
    },
    highlights: [
      "Stunning views of the ravines and the Prabal Fort.",
      "Quiet, romantic atmosphere.",
      "Beautiful rock formations."
    ],
    history: "Popularized by British officers and early Parsi settlers as a quiet retreat away from the town center.",
    bestTime: "Winter for pleasant weather, Monsoon for mist.",
    sun: "Good for Afternoon.",
    photography: "The unique rock ledges make for great portrait photography with the valley in the background.",
    entryFee: "Free",
    timings: "7:00 AM - 6:00 PM",
    timeRequired: "45 Mins",
    walkingDifficulty: "Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "No (The path is a bit rugged)",
    wheelchair: "No",
    nearby: "Malang Point, Echo Point",
    insiderTip: "Pack a small picnic to enjoy here, as there are rarely any vendors disturbing the peace.",
    mistakes: "Attempting to climb down the rock face for a 'better picture'. The laterite rock is brittle and dangerous.",
    practical: "The trail isn't as prominently marked as Echo point, so keep an eye on the signboards."
  },
  {
    name: "King George Point",
    quickAnswer: "The ultimate monsoon destination in Matheran. King George Point acts as a funnel for the overflow of Charlotte Lake, creating spectacular waterfalls.",
    overview: {
      famous: "Famous for being the best waterfall viewing spot during the heavy monsoon months.",
      unique: "In the monsoon, you can witness a massive curtain of water cascading down into the valley, fed directly by the overflowing lake.",
      who: "Monsoon trekkers and nature lovers."
    },
    highlights: [
      "Massive seasonal waterfalls.",
      "Surrounded by intense, lush green vegetation.",
      "The sound of the roaring water is deafening and thrilling."
    ],
    history: "Named in honor of King George V during the British Raj.",
    bestTime: "Strictly Monsoon (July to September).",
    sun: "N/A (Usually overcast in monsoon)",
    photography: "Use a fast shutter speed to freeze the water droplets, or a slow shutter (with a tripod) for a silky waterfall effect.",
    entryFee: "Free",
    timings: "7:00 AM - 5:00 PM",
    timeRequired: "30 Mins",
    walkingDifficulty: "Moderate to Difficult (Very slippery in monsoon)",
    familyFriendly: "Yes (But hold children's hands firmly)",
    seniorCitizenFriendly: "No",
    wheelchair: "No",
    nearby: "Charlotte Lake, Echo Point",
    insiderTip: "If you visit in summer or winter, you will only see a dry cliff. Only include this in your itinerary if visiting during or immediately after the rains.",
    mistakes: "Wearing flat shoes. The red mud here turns into slippery clay when wet.",
    practical: "Wear a high-quality raincoat. Umbrellas are often useless due to the strong valley winds."
  },
  {
    name: "Paymaster Park",
    quickAnswer: "A beautifully maintained historic park in the heart of Matheran, perfect for families to relax in. A gentle inclusion in any family tour package.",
    overview: {
      famous: "Known for its beautifully manicured gardens, gazebos, and statues of historic figures.",
      unique: "It provides a break from the dense forest treks and offers a civilized, manicured picnic spot.",
      who: "Families with young children, elderly travelers."
    },
    highlights: [
      "Statues of Malet, Paymaster, and Lord Somjee.",
      "Beautiful flower beds and seating arrangements.",
      "Safe, enclosed space for children to play."
    ],
    history: "Named after Mr. Paymaster, an influential figure in Matheran's development. It stands as a tribute to the founders of the hill station.",
    bestTime: "Early Morning or Late Afternoon.",
    sun: "N/A",
    photography: "Great for family group photos amidst the flowers and historic statues.",
    entryFee: "Free",
    timings: "6:00 AM - 7:00 PM",
    timeRequired: "30 - 45 Mins",
    walkingDifficulty: "Very Easy",
    familyFriendly: "Yes (Highly Recommended)",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No (Pathways are mud, though flat)",
    nearby: "Matheran Market, Rama Madhav Point",
    insiderTip: "A great place to sit and consume the snacks you bought from the market without worrying about monkey attacks (though still remain cautious).",
    mistakes: "Littering. The local authorities are very strict about maintaining the cleanliness of this park.",
    practical: "Located just a short walk from the central market area."
  },
  {
    name: "Olympia Racecourse",
    quickAnswer: "A piece of colonial history, this vast open ground once hosted horse racing. Today, it's a quiet expanse perfect for morning walks and horse riding practice.",
    overview: {
      famous: "Historically famous for British-era horse racing.",
      unique: "It is one of the very few large, flat, open clearings in the entire Matheran hill station.",
      who: "History buffs and equestrian enthusiasts."
    },
    highlights: [
      "Large open expanse surrounded by forest.",
      "Local horsemen training their horses.",
      "Extremely peaceful in the early mornings."
    ],
    history: "Established by Sir Jamsetjee Jeejeebhoy in the 19th century. It hosted the famous Matheran horse races until they were eventually discontinued.",
    bestTime: "Winter mornings.",
    sun: "Good for Sunrise over the tree line.",
    photography: "A great place for wide panning shots of the clearing.",
    entryFee: "Free",
    timings: "Open 24 Hours",
    timeRequired: "30 Mins",
    walkingDifficulty: "Easy",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "One Tree Hill Point",
    insiderTip: "If you want to try galloping on a horse, this is the safest and best place to negotiate a ride with the local 'Ghodawalas'.",
    mistakes: "Walking right through the center when horses are being trained. Stick to the edges.",
    practical: "It gets quite hot here in the mid-day sun as there is no canopy cover."
  },
  {
    name: "Matheran Market",
    quickAnswer: "The bustling heart of the hill station, famous for its leather goods, Kolhapuri chappals, and the legendary Matheran Chikki. The perfect place to end your day.",
    overview: {
      famous: "Famous for local handicrafts, leather footwear, and a massive variety of fresh, locally made fudge and Chikki.",
      unique: "The market is entirely unpaved. Walking on the red soil amidst colonial-style shops gives it an incredible vintage charm.",
      who: "Shoppers, foodies, and all tourists."
    },
    highlights: [
      "Nariman Chikki Mart for authentic walnut fudge and chikki.",
      "Dozens of shops selling handmade leather bags, belts, and footwear.",
      "Street food including Vada Pav, Maggi, and fresh strawberries (in season)."
    ],
    history: "The market developed organically around the railway station to serve the British and Parsi elites summering in the hills.",
    bestTime: "Evening (6:00 PM to 9:00 PM) when it is brightly lit and lively.",
    sun: "N/A",
    photography: "Capture the bustling street life, the vibrant colors of the leather shops, and the steam rising from food stalls.",
    entryFee: "Free",
    timings: "8:00 AM - 10:00 PM",
    timeRequired: "1 - 2 Hours",
    walkingDifficulty: "Easy",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "Matheran Railway Station, Khandala Point",
    insiderTip: "Bargaining is expected for leather goods. For Chikki, ask for a fresh tasting sample before buying boxes to take home.",
    mistakes: "Buying leather goods without checking the stitching quality, or waiting until the morning of your departure to buy fudge (shops open late).",
    practical: "ATMs are scarce and often out of cash. Carry sufficient physical cash for your shopping."
  },
  {
    name: "Matheran Toy Train",
    quickAnswer: "A UNESCO World Heritage-listed narrow-gauge railway that chugs its way up the mountain from Neral. It is the defining attraction of any Matheran tour package.",
    overview: {
      famous: "Famous for being one of the few heritage mountain railways in India, offering a slow, scenic zig-zag climb up the Western Ghats.",
      unique: "The train covers a distance of 21 km in about 2.5 hours, passing through lush forests and the famous 'One Kiss Tunnel'.",
      who: "Families, train enthusiasts, and first-time visitors."
    },
    highlights: [
      "The scenic 2.5-hour journey from Neral.",
      "The unique 'One Kiss Tunnel'.",
      "Heritage steam-engine style diesel locomotives."
    ],
    history: "Built by Abdul Hussein Adamjee Peerbhoy in 1907 at a cost of ₹16 lakhs to connect Matheran to the mainline.",
    bestTime: "Winter and Summer. (Services are usually suspended during the Monsoon).",
    sun: "N/A",
    photography: "Sit on the right side of the train when going up for the best valley views. The curves of the track allow you to photograph the engine from the back compartments.",
    entryFee: "Ticket prices vary (Approx ₹75 for 2nd class, ₹300 for 1st class from Neral).",
    timings: "Scheduled departures (usually 2-3 times a day).",
    timeRequired: "2.5 Hours (Neral to Matheran)",
    walkingDifficulty: "N/A",
    familyFriendly: "Yes (Kids love it)",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No (Boarding the narrow gauge train is difficult for wheelchair users)",
    nearby: "Matheran Station, Neral Station",
    insiderTip: "If you don't want to do the full 2.5-hour journey from Neral, take the 20-minute shuttle ride from Aman Lodge (Dasturi Naka) to Matheran station just for the experience.",
    mistakes: "Assuming you can buy a ticket on the spot during peak season or weekends. Tickets sell out hours in advance.",
    practical: "Check the official Central Railway website for the latest timetable and monsoon suspension notices."
  },
  {
    name: "Malang Point",
    quickAnswer: "A lesser-known viewpoint offering a majestic look at the Haji Malang shrine mountain. Perfect for those looking to escape the crowds of Echo and Louisa point.",
    overview: {
      famous: "Known for the uninterrupted view of the distinctively shaped Haji Malang mountain in the distance.",
      unique: "Because it's not on the main tourist thoroughfare, you can often have the entire point to yourself.",
      who: "Trekkers and couples seeking solitude."
    },
    highlights: [
      "View of Haji Malang Dargah peak.",
      "Deep, dense forest trails leading to the point.",
      "Total peace and quiet."
    ],
    history: "",
    bestTime: "Post-monsoon and Winter.",
    sun: "Good for Afternoon.",
    photography: "A telephoto lens is required to get a good shot of the Haji Malang peak.",
    entryFee: "Free",
    timings: "6:00 AM - 5:30 PM",
    timeRequired: "30 Mins",
    walkingDifficulty: "Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "No",
    wheelchair: "No",
    nearby: "Porcupine Point, Honeymoon Point",
    insiderTip: "Combine this with Honeymoon Point for a peaceful 2-hour walking circuit away from the crowds.",
    mistakes: "Going too late in the evening. The trail is heavily wooded and gets dark very fast.",
    practical: "No food stalls are available here, so carry your own water."
  },
  {
    name: "Rambaug Point",
    quickAnswer: "One of the most popular viewpoints offering a spectacular view of Karjat town, Khandala, and the surrounding ranges. An excellent spot for a quiet sunrise.",
    overview: {
      famous: "Famous for its clear eastern views toward the twin hill stations of Khandala and Lonavala.",
      unique: "It provides a very wide, expansive view of the valleys leading into the Deccan plateau.",
      who: "Landscape photographers and morning walkers."
    },
    highlights: [
      "Views of Karjat and Khandala on clear days.",
      "Lush valley floor views.",
      "Great bird-watching spot in the early mornings."
    ],
    history: "",
    bestTime: "October to February.",
    sun: "Excellent for Sunrise.",
    photography: "Use a wide-angle lens. The sunrise creates a beautiful silhouette of the distant mountains.",
    entryFee: "Free",
    timings: "5:30 AM - 6:00 PM",
    timeRequired: "45 Mins",
    walkingDifficulty: "Easy to Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "Yes",
    wheelchair: "No",
    nearby: "Alexander Point, Chowk Point",
    insiderTip: "If Panorama Point is too far for a sunrise trek (6km), Rambaug Point is an excellent, much closer alternative (2km).",
    mistakes: "Visiting in the middle of the day when the sun bleaches out the distant views.",
    practical: "The path is relatively flat, making it an easy early morning stroll."
  },
  {
    name: "Hart Point",
    quickAnswer: "A stunning viewpoint offering a view of the night lights of Mumbai on a clear day. Located near Panorama Point, it provides a majestic view of the Western Ghats.",
    overview: {
      famous: "Famous for being one of the few points where you can see the distant skyline and lights of Mumbai city.",
      unique: "The rock formations here are naturally shaped like a heart (hence 'Hart' point, originally).",
      who: "Couples and photographers."
    },
    highlights: [
      "Distant view of Mumbai city on clear winter nights.",
      "Heart-shaped rock formations.",
      "Dense, quiet forest surroundings."
    ],
    history: "",
    bestTime: "Winter (for clear skies).",
    sun: "Good for Sunset.",
    photography: "A tripod and a strong zoom lens are mandatory if you want to capture the distant city lights after sunset.",
    entryFee: "Free",
    timings: "6:00 AM - 6:30 PM",
    timeRequired: "30 Mins",
    walkingDifficulty: "Moderate",
    familyFriendly: "Yes",
    seniorCitizenFriendly: "No",
    wheelchair: "No",
    nearby: "Panorama Point, Monkey Point",
    insiderTip: "Visit just after sunset on a crisp, clear January evening to witness the glittering lights of Mumbai.",
    mistakes: "Expect to see Mumbai on a humid or hazy day. The city is only visible under perfect atmospheric conditions.",
    practical: "Located on the same circuit as Panorama Point; plan to visit both in one trip."
  }
];

function generateHTML() {
  let html = `
    <!-- START: TOP PLACES GENERATED SECTION -->
    <section class="detail-section" id="top-places">
      <h2>Top Places to Visit in Matheran</h2>
      <p>Matheran boasts over 30 designated viewpoints, a historic railway, and pristine lakes. Navigating them all can be overwhelming. We have broken down the absolute best attractions to include in your <a href="packages.html?theme=all">matheran tour package</a>.</p>
  `;

  attractions.forEach((attr, index) => {
    html += `
      <div class="attraction-block" style="margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid #eee;">
        <h3 id="${attr.name.toLowerCase().replace(/ /g, '-')}">${attr.name}</h3>
        
        <div class="quick-answer-box">
          <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Quick Answer</h4>
          <p style="margin: 0;">${attr.quickAnswer}</p>
        </div>
        
        <h4>Overview</h4>
        <p><strong>Why it’s famous:</strong> ${attr.overview.famous}<br/>
        <strong>What makes it unique:</strong> ${attr.overview.unique}<br/>
        <strong>Who should visit:</strong> ${attr.overview.who}</p>
        
        <h4>Highlights</h4>
        <ul>
          ${attr.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        
        ${attr.history ? `<h4>History</h4>\n        <p>${attr.history}</p>` : ''}
        
        <div class="content-rich">
          <table class="styled-info-table">
            <tbody>
              <tr><th>Best Time to Visit</th><td>${attr.bestTime}</td></tr>
              <tr><th>Sunrise / Sunset Suitability</th><td>${attr.sun}</td></tr>
              <tr><th>Entry Fee</th><td>${attr.entryFee}</td></tr>
              <tr><th>Timings</th><td>${attr.timings}</td></tr>
              <tr><th>Average Time Required</th><td>${attr.timeRequired}</td></tr>
              <tr><th>Walking Difficulty</th><td>${attr.walkingDifficulty}</td></tr>
              <tr><th>Family Friendly</th><td>${attr.familyFriendly}</td></tr>
              <tr><th>Senior Citizen Friendly</th><td>${attr.seniorCitizenFriendly}</td></tr>
              ${attr.wheelchair ? `<tr><th>Wheelchair Accessibility</th><td>${attr.wheelchair}</td></tr>` : ''}
            </tbody>
          </table>
        </div>

        <h4>Photography Tips</h4>
        <p>${attr.photography}</p>
        
        <h4>Practical Travel Tips</h4>
        <ul>
          <li><strong>Nearby Attractions:</strong> ${attr.nearby}</li>
          <li><strong>Insider Tip:</strong> ${attr.insiderTip}</li>
          <li><strong>Common Mistakes to Avoid:</strong> ${attr.mistakes}</li>
          <li><strong>Practical Note:</strong> ${attr.practical}</li>
        </ul>
      </div>
    `;
  });

  // Comparison Tables Section
  html += `
      <h2 id="comparison-tables">Matheran Quick Comparison Guides</h2>
      <p>Use these quick reference tables to build your perfect Matheran itinerary based on your travel style.</p>

      <div class="content-rich">
        <h3>Best Viewpoints by Time of Day</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Best Sunrise Viewpoints</th>
              <th scope="col">Best Sunset Viewpoints</th>
              <th scope="col">Best During Monsoon</th>
              <th scope="col">Best During Winter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Panorama Point (Best 360° view)</td>
              <td>Porcupine / Sunset Point</td>
              <td>Charlotte Lake (Full water)</td>
              <td>Panorama Point (Clear skies)</td>
            </tr>
            <tr>
              <td>Rambaug Point (Easier walk)</td>
              <td>Louisa Point (Prabal fort view)</td>
              <td>King George Point (Waterfalls)</td>
              <td>Hart Point (Mumbai lights)</td>
            </tr>
            <tr>
              <td>Alexander Point</td>
              <td>One Tree Hill Point</td>
              <td>Echo Point (Greenery)</td>
              <td>Rambaug Point</td>
            </tr>
          </tbody>
        </table>

        <h3>Traveler Compatibility Guide</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Best For Couples</th>
              <th scope="col">Best For Families</th>
              <th scope="col">Best Photography Locations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Honeymoon Point (Quiet, secluded)</td>
              <td>Paymaster Park (Safe, manicured)</td>
              <td>Louisa Point (Fort backdrop)</td>
            </tr>
            <tr>
              <td>Louisa Point (Romantic sunset)</td>
              <td>Matheran Toy Train (Fun experience)</td>
              <td>Charlotte Lake (Reflections)</td>
            </tr>
            <tr>
              <td>Charlotte Lake (Peaceful walks)</td>
              <td>Monkey Point (Wildlife viewing)</td>
              <td>One Tree Hill (Single tree frame)</td>
            </tr>
          </tbody>
        </table>

        <h3>Easy Walk vs Long Walk</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Easy Walk (&lt; 20 Mins)</th>
              <th scope="col">Moderate Walk (20 - 45 Mins)</th>
              <th scope="col">Long Walk (&gt; 45 Mins / Horse Recommended)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alexander Point</td>
              <td>Charlotte Lake</td>
              <td>Panorama Point (Approx 6km)</td>
            </tr>
            <tr>
              <td>Paymaster Park</td>
              <td>Louisa Point</td>
              <td>One Tree Hill Point (Steep sections)</td>
            </tr>
            <tr>
              <td>Echo Point</td>
              <td>Porcupine Point</td>
              <td>Garbut Point (Far east)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- END: TOP PLACES GENERATED SECTION -->
  `;

  return html;
}

const targetPath = path.join(__dirname, 'matheran.html');
let content = fs.readFileSync(targetPath, 'utf-8');

const htmlToInsert = generateHTML();
const insertionMarker = "<h3>Which Package is Right for You?</h3>";

if (content.includes(insertionMarker)) {
  content = content.replace(insertionMarker, htmlToInsert + '\\n          ' + insertionMarker);
  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log("Successfully injected Top Places into matheran.html");
} else {
  console.error("Insertion marker not found in matheran.html");
}
