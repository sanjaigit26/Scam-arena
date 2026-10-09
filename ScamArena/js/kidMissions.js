// Kid Guardian Scenarios (Mascot Guardy, Positive Framing, Stars, Tell a Trusted Adult)
// Fully localized in English, தமிழ், हिन्दी

window.KID_SCENARIOS = [
  {
    id: "kid_01",
    title: {
      en: "The Free Game Gems & Skins Trap",
      ta: "இலவச கேம் நாணயங்கள் மற்றும் ஆடைகள் பொறி",
      hi: "फ्री गेम डायमंड्स और स्किन्स का लालच"
    },
    category: {
      en: "Gaming Account Phishing",
      ta: "கேமிங் கணக்கு திருட்டு",
      hi: "गेमिंग अकाउंट फ्रॉड"
    },
    stars: 3,
    badgeReward: {
      id: "safe_kid",
      title: "Safe Kid",
      icon: "🌟"
    },
    guardyTip: {
      en: "Guardy says: 'If someone offers free Robux or game diamonds for typing your password, they want to steal your account! Real games never ask for passwords on outside websites!'",
      ta: "கார்டி கூறுகிறார்: 'இலவசமாக கேம் நாணயங்கள் தருகிறேன் என்று உங்கள் பாஸ்வேர்டை கேட்டால், அவர்கள் உங்கள் கேம் கணக்கை திருடப் பார்க்கிறார்கள்! அசல் கேம்கள் வெளியாட்களிடம் பாஸ்வேர்ட் கேட்காது!'",
      hi: "गार्डी का सुझाव: 'यदि कोई पासवर्ड मांगकर फ्री रोबक्स या डायमंड्स देने का दावा करे, तो वह आपका गेम अकाउंट चुराना चाहता है! असली गेम्स कभी बाहर पासवर्ड नहीं मांगते!'"
    },
    simulatedUI: {
      platform: "RoboGems-Free-2026.fun",
      characterIcon: "🎮",
      headline: {
        en: "CLAIM 10,000 FREE ROBUX / DIAMONDS NOW!",
        ta: "இப்போது 10,000 இலவச ரோபக்ஸ் / டைமண்டுகளைப் பெறுங்கள்!",
        hi: "अभी 10,000 फ्री रोबक्स / डायमंड्स क्लेम करें!"
      },
      body: {
        en: "Congratulations gamer! Enter your game username and secret password below to inject 10,000 legendary gems into your account instantly. Hurry, only 5 gifts left today!",
        ta: "வாழ்த்துகள் கேமர்! உங்கள் கேம் பெயர் மற்றும் ரகசிய பாஸ்வேர்டை கீழே உள்ளிட்டு 10,000 வைரங்களை உடனே பெறுங்கள். இன்று 5 பரிசுகள் மட்டுமே மீதமுள்ளன!",
        hi: "बधाई हो खिलाड़ी! अपने गेम का नाम और सीक्रेट पासवर्ड नीचे डालें और तुरंत 10,000 रत्न पाएं। जल्दी करें, आज केवल 5 गिफ्ट बचे हैं!"
      }
    },
    clues: {
      sender: {
        en: "The website is 'RoboGems-Free-2026.fun', NOT the official game app.",
        ta: "இந்த இணையதளம் அதிகாரப்பூர்வ கேம் ஆப் அல்ல, ஒரு போலி தளம்.",
        hi: "यह वेबसाइट असली गेम की नहीं है, बल्कि एक फर्जी वेबसाइट है।"
      },
      link: {
        en: "It is asking for your secret password. You should NEVER give your password to anyone!",
        ta: "இது உங்கள் ரகசிய பாஸ்வேர்டை கேட்கிறது. பாஸ்வேர்டை யாரிடமும் தரக்கூடாது!",
        hi: "यह आपका गुप्त पासवर्ड मांग रहा है। पासवर्ड कभी किसी को नहीं देना चाहिए!"
      },
      urgency: {
        en: "It says 'Hurry, only 5 left!' to make you click without asking your parents.",
        ta: "'அவசரம், 5 மட்டுமே உள்ளது' என்று கூறி பெற்றோரிடம் கேட்காமல் கிளிக் செய்ய வைக்கிறது.",
        hi: "यह 'जल्दी करो' कहकर आपको माता-पिता से बिना पूछे क्लिक करवाना चाहता है।"
      }
    },
    correctDecision: "SCAM",
    safeAction: "TELL_ADULT",
    consequence: {
      en: "Awesome job! You didn't give away your password. Guardy saved your game account and all your hard-earned characters!",
      ta: "அற்புதம்! நீங்கள் பாஸ்வேர்டை கொடுக்கவில்லை. கார்டி உங்கள் கேம் கணக்கையும் கதாபாத்திரங்களையும் காப்பாற்றிவிட்டார்!",
      hi: "शाबाश! आपने अपना पासवर्ड नहीं दिया। गार्डी ने आपका गेम अकाउंट और सारे कैरेक्टर सुरक्षित बचा लिए!"
    }
  },

  {
    id: "kid_02",
    title: {
      en: "The Secret Chat Stranger",
      ta: "ரகசியமாகப் பேச அழைக்கும் அறிமுகமில்லாத நபர்",
      hi: "निजी चैट में बात करने वाला अजनबी"
    },
    category: {
      en: "Online Stranger Safety",
      ta: "அறிமுகமில்லாத நபர்களிடம் பாதுகாப்பு",
      hi: "ऑनलाइन अजनबियों से सुरक्षा"
    },
    stars: 3,
    badgeReward: {
      id: "stranger_danger_pro",
      title: "Stranger Danger Pro",
      icon: "🛡️"
    },
    guardyTip: {
      en: "Guardy says: 'Never share your real name, school, or house address with anyone online. If a stranger asks you to keep secrets, immediately tell your parents!'",
      ta: "கார்டி கூறுகிறார்: 'இணையத்தில் யாருடனும் உங்கள் உண்மையான பெயர், பள்ளி அல்லது வீட்டு முகவரியை பகிராதீர்கள். யாராவது ரகசியமாக வைக்கச் சொன்னால் உடனே பெற்றோரிடம் கூறுங்கள்!'",
      hi: "गार्डी का सुझाव: 'इंटरनेट पर कभी किसी के साथ अपना असली नाम, स्कूल या घर का पता साझा न करें। कोई बात छुपाने को कहे तो तुरंत बड़ों को बताएं!'"
    },
    simulatedUI: {
      platform: "GamerChat DM",
      characterIcon: "👤",
      headline: {
        en: "Direct Message from 'ShadowNinja_99'",
        ta: "'ஷேடோநிஞ்ஜா_99' இடமிருந்து நேரடி செய்தி",
        hi: "'शैडोनिंजा_99' से पर्सनल मैसेज"
      },
      body: {
        en: "Hey! You played really well in that match. I am also 11 years old. What is your real name and which school do you go to? Don't tell your parents, let's just be secret gaming buddies. Send me a selfie in your school uniform!",
        ta: "ஹே! அந்த போட்டியில் நீங்கள் நன்றாக விளையாடினீர்கள். நானும் 11 வயது பையன்தான். உங்கள் உண்மையான பெயர் என்ன? எந்த பள்ளியில் படிக்கிறீர்கள்? பெற்றோரிடம் சொல்ல வேண்டாம், நாம் ரகசிய நண்பர்களாக இருக்கலாம். உங்கள் பள்ளி சீருடை புகைப்படத்தை அனுப்புங்கள்!",
        hi: "अरे वाह! तुमने मैच में बहुत अच्छा खेला। मैं भी 11 साल का हूँ। तुम्हारा असली नाम क्या है और तुम किस स्कूल में पढ़ते हो? अपने मम्मी-पापा को मत बताना, हम सीक्रेट बेस्ट फ्रेंड बनेंगे। मुझे अपनी स्कूल ड्रेस वाली फोटो भेजो!"
      }
    },
    clues: {
      sender: {
        en: "You do not know who is actually behind this gamer profile in real life.",
        ta: "நிஜ வாழ்க்கையில் இந்த கேம் கணக்கிற்குப் பின்னால் யார் இருக்கிறார்கள் என்று உங்களுக்குத் தெரியாது.",
        hi: "आपको नहीं पता कि इस प्रोफाइल के पीछे असल जिंदगी में कौन बैठा है।"
      },
      link: {
        en: "They are asking for private personal details: real name, school name, and photos.",
        ta: "அவர்கள் உங்கள் தனிப்பட்ட விவரங்களைக் கேட்கிறார்கள்: உண்மை பெயர், பள்ளி மற்றும் புகைப்படங்கள்.",
        hi: "वे आपकी निजी जानकारी मांग रहे हैं: असली नाम, स्कूल और यूनिफॉर्म वाली फोटो।"
      },
      urgency: {
        en: "They asked you to keep it a secret from your parents. Red flag!",
        ta: "பெற்றோரிடம் சொல்ல வேண்டாம் என்று ரகசியம் காக்கச் சொல்கிறார்கள். இது பெரிய எச்சரிக்கை!",
        hi: "वे माता-पिता से छुपाने को कह रहे हैं। यह बहुत बड़ा खतरे का संकेत है!"
      }
    },
    correctDecision: "SCAM",
    safeAction: "TELL_ADULT",
    consequence: {
      en: "Brilliant! You told a trusted adult and blocked the stranger. Your private information and home stay safe!",
      ta: "அருமை! நீங்கள் பெற்றோரிடம் கூறி அந்த நபரை தடுத்துவிட்டீர்கள். உங்கள் குடும்பமும் பாதுகாப்பு விவரங்களும் பாதுகாப்பாக உள்ளன!",
      hi: "बहुत बढ़िया! आपने माता-पिता को बताया और उस अजनबी को ब्लॉक कर दिया। आप पूरी तरह सुरक्षित हैं!"
    }
  },

  {
    id: "kid_03",
    title: {
      en: "The 'You Won an iPad' Pop-Up",
      ta: "'உங்களுக்கு ஐபேட் பரிசு' போலி பாப்-அப்",
      hi: "'आपने नया आईपैड जीता' फर्जी पॉप-अप"
    },
    category: {
      en: "Fake Prize Pop-Up",
      ta: "போலி பரிசு அறிவிப்பு",
      hi: "नकली इनाम पॉप-अप"
    },
    stars: 3,
    badgeReward: {
      id: "smart_surfer",
      title: "Smart Surfer",
      icon: "🏄"
    },
    guardyTip: {
      en: "Guardy says: 'Random flashing pop-ups saying you won an iPhone or laptop are ALWAYS fake traps. Close the tab or ask an adult to close it!'",
      ta: "கார்டி கூறுகிறார்: 'திடீரென தோன்றி போன் அல்லது லேப்டாப் வென்றுவிட்டீர்கள் என்று சொல்லும் பாப்-அப்கள் எப்போதும் போலியானவை. உடனே அந்த பக்கத்தை மூடிவிடுங்கள்!'",
      hi: "गार्डी का सुझाव: 'अचानक स्क्रीन पर चमकने वाले इनाम वाले पॉप-अप हमेशा झूठे होते हैं। उस पेज को तुरंत बंद कर दें!'"
    },
    simulatedUI: {
      platform: "Flashing Web Pop-Up",
      characterIcon: "🎁",
      headline: {
        en: "🎉 CONGRATULATIONS! YOU ARE VISITOR #1,000,000!",
        ta: "🎉 வாழ்த்துகள்! நீங்கள் 1,000,000வது பார்வையாளர்!",
        hi: "🎉 बधाई हो! आप हमारे 10,00,000वें विजिटर हैं!"
      },
      body: {
        en: "Spin the Golden Wheel to claim your Brand New Apple iPad Pro & Gaming Headset! Click 'CLAIM NOW' and download our special helper app to ship your prize in 24 hours!",
        ta: "தங்க சக்கரத்தை சுழற்றி புதிய ஆப்பிள் ஐபேட் மற்றும் கேமிங் ஹெட்செட்டை வெல்லுங்கள்! 'இப்போதே பெறு' என்பதை கிளிக் செய்து செயலியை பதிவிறக்கம் செய்யுங்கள்!",
        hi: "गोल्डन व्हील घुमाएं और नया आईपैड प्रो जीतें! अपना इनाम घर मंगाने के लिए 'क्लेम करें' पर क्लिक करके ऐप डाउनलोड करें!"
      }
    },
    clues: {
      sender: {
        en: "Pop-up came unexpectedly while browsing a random website.",
        ta: "ஏதோ ஒரு இணையதளத்தை பார்க்கும்போது எதிர்பாராமல் தோன்றிய விளம்பரம்.",
        hi: "इंटरनेट चलाते समय यह पॉप-अप अचानक बिना किसी कारण के आ गया।"
      },
      link: {
        en: "Clicking will download dangerous malware or viruses onto your computer or phone.",
        ta: "கிளிக் செய்தால் உங்கள் கணினி அல்லது போனில் ஆபத்தான வைரஸ் பதிவிறக்கம் செய்யப்படும்.",
        hi: "क्लिक करने पर आपके फोन या कंप्यूटर में खतरनाक वायरस डाउनलोड हो सकता है।"
      },
      urgency: {
        en: "Spinning wheels and countdown timers trick kids into rushing without thinking.",
        ta: "சுழலும் சக்கரங்கள் மற்றும் கவுண்டவுன் டைமர்கள் குழந்தைகளை ஏமாற்ற வைக்கும் வித்தை.",
        hi: "घूमते पहिए और चमकते रंग बच्चों को बहकाने के लिए बनाए जाते हैं।"
      }
    },
    correctDecision: "SCAM",
    safeAction: "TELL_ADULT",
    consequence: {
      en: "Super move! You didn't click the fake wheel and kept your tablet virus-free!",
      ta: "அருமையான முடிவு! நீங்கள் அந்த போலி இணைப்பை கிளிக் செய்யாமல் உங்கள் டேப்லெட்டை வைரஸ் வராமல் காப்பாற்றினீர்கள்!",
      hi: "शानदार! आपने उस नकली पहिए पर क्लिक नहीं किया और डिवाइस को वायरस से बचा लिया!"
    }
  },

  {
    id: "kid_04",
    title: {
      en: "The Mystery Account Level-Up Helper",
      ta: "கேம் லெவல் ஏற்றித்தரும் மர்ம நண்பன்",
      hi: "गेम लेवल बढ़ाने का झूठा मददगार"
    },
    category: {
      en: "Game Character Theft",
      ta: "கேம் கதாபாத்திர திருட்டு",
      hi: "गेम कैरेक्टर चोरी"
    },
    stars: 3,
    badgeReward: {
      id: "password_keeper",
      title: "Password Keeper",
      icon: "🔑"
    },
    guardyTip: {
      en: "Guardy says: 'Never share your game login with anyone who promises to level you up. They will change your password and lock you out forever!'",
      ta: "கார்டி கூறுகிறார்: 'லெவல் ஏற்றித் தருகிறேன் என்று கூறும் யாரிடமும் கேம் லாகின் விவரங்களை தராதீர்கள். அவர்கள் பாஸ்வேர்டை மாற்றி உங்கள் கணக்கை அபகரித்துக் கொள்வார்கள்!'",
      hi: "गार्डी का सुझाव: 'लेवल बढ़ाने का झांसा देने वाले किसी भी व्यक्ति को गेम लॉगिन न दें। वे पासवर्ड बदलकर आपका अकाउंट छीन लेंगे!'"
    },
    simulatedUI: {
      platform: "In-Game Team Chat",
      characterIcon: "🛡️",
      headline: {
        en: "Message from 'ProGamerX_VIP'",
        ta: "'ப்ரோகேமர்எக்ஸ்_விஐபி' இடமிருந்து செய்தி",
        hi: "'प्रो-गेमर-एक्स' से इन-गेम मैसेज"
      },
      body: {
        en: "Bro, your character has basic armor. I have admin access to the developer tools. Give me your login email and password for just 15 minutes, and I will unlock all mythic weapons and 50,000 coins for you for free!",
        ta: "நண்பா, உன்னிடம் சாதாரண கவசம் மட்டுமே உள்ளது. என்னிடம் சிறப்பு கருவிகள் உள்ளன. உன் லாகின் ஈமெயில் மற்றும் பாஸ்வேர்டை 15 நிமிடங்களுக்கு கொடு, உனக்கு அனைத்து பிரம்மாண்ட ஆயுதங்களையும் இலவசமாக திறந்து தருகிறேன்!",
        hi: "भाई, तुम्हारा कैरेक्टर बहुत कमजोर है। मेरे पास स्पेशल टूल्स हैं। मुझे बस 15 मिनट के लिए अपनी लॉगिन आईडी और पासवर्ड दो, मैं तुम्हारे अकाउंट में सारे हथियार और 50,000 कॉइन्स फ्री में अनलॉक कर दूंगा!"
      }
    },
    clues: {
      sender: {
        en: "Nobody can magically give you free mythic weapons just by having your password.",
        ta: "உங்கள் பாஸ்வேர்டை பெற்று யாரும் மாயாஜாலமாக இலவச ஆயுதங்களைத் தர முடியாது.",
        hi: "पासवर्ड लेकर कोई भी मुफ्त में सुपर हथियार नहीं दे सकता।"
      },
      link: {
        en: "Once they have your login, they can change the recovery email and steal your account forever.",
        ta: "பாஸ்வேர்டை கொடுத்தால் அவர்கள் அதை மாற்றி உங்கள் கணக்கை நிரந்தரமாக திருடிவிடுவார்கள்.",
        hi: "एक बार पासवर्ड देने पर वे पासवर्ड बदलकर आपका अकाउंट हमेशा के लिए चुरा लेंगे।"
      },
      urgency: {
        en: "Promises that sound too good to be true are always scams.",
        ta: "நம்ப முடியாத அளவிற்கு நல்லதாகத் தோன்றும் வாக்குறுதிகள் எப்போதும் மோசடிகளே.",
        hi: "जो ऑफर सुनने में जरूरत से ज्यादा अच्छा लगे, वह हमेशा धोखा होता है।"
      }
    },
    correctDecision: "SCAM",
    safeAction: "TELL_ADULT",
    consequence: {
      en: "Way to go! You protected your character and unlocked the Password Keeper badge! 🔑",
      ta: "அற்புதம்! உங்கள் கேம் கணக்கை காப்பாற்றி 'பாஸ்வேர்ட் காவலன்' பேட்ஜை வென்றுவிட்டீர்கள்! 🔑",
      hi: "कमाल कर दिया! आपने अपना अकाउंट बचा लिया और 'पासवर्ड कीपर' बैज जीत लिया! 🔑"
    }
  },

  {
    id: "kid_05",
    title: {
      en: "The Secret Quest Needing Mom's Card",
      ta: "அம்மாவின் கார்டு கேட்கும் ரகசிய கேம் லெவல்",
      hi: "मम्मी के कार्ड नंबर मांगने वाला गुप्त लेवल"
    },
    category: {
      en: "Unauthorized Payment Coercion",
      ta: "அனுமதியற்ற பணப் பரிவர்த்தனை வற்புறுத்தல்",
      hi: "बिना अनुमति कार्ड से भुगतान का झांसा"
    },
    stars: 3,
    badgeReward: {
      id: "shield_star",
      title: "Shield Star",
      icon: "⭐"
    },
    guardyTip: {
      en: "Guardy says: 'NEVER take your mom or dad's credit card or phone without asking! Games that tell you to secretly copy numbers are trying to steal your family's money!'",
      ta: "கார்டி கூறுகிறார்: 'பெற்றோரிடம் கேட்காமல் அவர்களின் ஏடிஎம் கார்டு அல்லது போனை ஒருபோதும் எடுக்காதீர்கள்! ரகசியமாக எண்களை கேட்கும் கேம்கள் குடும்பப் பணத்தை திருடப் பார்க்கின்றன!'",
      hi: "गार्डी का सुझाव: 'माता-पिता से पूछे बिना कभी उनका कार्ड या फोन न लें! जो गेम चुपके से कार्ड नंबर डालने को कहे, वह परिवार के पैसे चुरा रहा है!'"
    },
    simulatedUI: {
      platform: "QuestUnlocker Web Game",
      characterIcon: "⚔️",
      headline: {
        en: "🏰 UNLOCK THE SECRET DIAMOND DRAGON CASTLE",
        ta: "🏰 ரகசிய வைர டிராகன் கோட்டையைத் திறக்கவும்",
        hi: "🏰 सीक्रेट डायमंड ड्रैगन कैसल अनलॉक करें"
      },
      body: {
        en: "You have reached Level 99! To pass the bridge, you just need a 16-digit card verification. Secretly check your mom or dad's purse, type the 16 numbers and the 3 numbers on the back. It won't charge anything, it's just to prove you are a hero!",
        ta: "நீங்கள் நிலை 99-ஐ அடைந்துவிட்டீர்கள்! பாலத்தைக் கடக்க உங்கள் அம்மாவின் கைப்பையிலிருந்து 16 இலக்க கார்டு எண்களையும் பின்னால் உள்ள 3 எண்களையும் தட்டச்சு செய்யுங்கள். பணம் எடுக்கப்படாது, நீங்கள் ஹீரோ என்பதை நிரூபிக்க மட்டுமே!",
        hi: "आप लेवल 99 पर पहुँच गए हैं! आगे जाने के लिए मम्मी या पापा के पर्स से 16 अंकों का कार्ड नंबर और पीछे लिखे 3 अंक यहाँ टाइप करें। कोई पैसा नहीं कटेगा, यह सिर्फ यह साबित करने के लिए है कि आप असली हीरो हैं!"
      }
    },
    clues: {
      sender: {
        en: "The game specifically tells you to 'secretly check your mom or dad's purse'. That is sneaky and wrong!",
        ta: "பெற்றோருக்கு தெரியாமல் திருட்டுத்தனமாக கார்டை எடுக்கச் சொல்கிறது. இது முற்றிலும் தவறான செயல்!",
        hi: "गेम चुपके से पर्स से कार्ड निकालने को कह रहा है। यह बहुत गलत और धोखेबाजी है!"
      },
      link: {
        en: "Those 16 numbers + the 3 numbers on the back (CVV) allow strangers to spend your family's real money.",
        ta: "அந்த எண்கள் மற்றும் பின்னால் உள்ள 3 எண்கள் (CVV) அந்நியர்கள் உங்கள் குடும்பப் பணத்தை திருட வழிவகுக்கும்.",
        hi: "वे 16 अंक और पीछे के 3 अंक (CVV) डालते ही परिवार के बैंक खाते से असली पैसे कट जाएंगे।"
      },
      urgency: {
        en: "No legitimate game asks children to secretly use adult financial cards.",
        ta: "எந்த ஒரு நல்ல கேமும் குழந்தைகளிடம் பெரியவர்களின் கார்டு எண்களை திருட்டுத்தனமாக கேட்காது.",
        hi: "कोई भी अच्छा गेम बच्चों से बड़ों के कार्ड नंबर चोरी-छिपे डालने को नहीं कहता।"
      }
    },
    correctDecision: "SCAM",
    safeAction: "TELL_ADULT",
    consequence: {
      en: "You are a TRUE CYBER HERO! You refused to take the card secretly and told your parents. Guardy awards you the Ultimate Shield Star! ⭐⭐⭐",
      ta: "நீங்கள் உண்மையான இணைய ஹீரோ! கார்டை எடுக்காமல் பெற்றோரிடம் கூறிவிட்டீர்கள். கார்டி உங்களுக்கு 'அல்டிமேட் ஷீல்ட் ஸ்டார்' விருதை வழங்குகிறார்! ⭐⭐⭐",
      hi: "आप असली साइबर हीरो हैं! आपने बिना पूछे कार्ड नहीं लिया और मम्मी-पापा को बताया। गार्डी आपको 'अल्टीमेट शील्ड स्टार' प्रदान करता है! ⭐⭐⭐"
    }
  }
];
