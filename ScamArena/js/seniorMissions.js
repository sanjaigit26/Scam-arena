// Senior Shield Scenarios (High Accessibility, Big Controls, Gentle Educational Feedback)
// Fully localized in English, தமிழ், हिन्दी

window.SENIOR_SCENARIOS = [
  {
    id: "senior_01",
    title: {
      en: "The Electricity Bill Disconnection Alert",
      ta: "மின் இணைப்பு துண்டிப்பு எச்சரிக்கை",
      hi: "बिजली बिल कटने की चेतावनी"
    },
    category: {
      en: "Utility Disconnection Fraud",
      ta: "மின் கட்டண மோசடி குறுஞ்செய்தி",
      hi: "बिजली बिल धोखाधड़ी"
    },
    simulatedUI: {
      type: "sms",
      sender: "+91 97182-44102",
      senderName: {
        en: "EB-POWER (Personal Mobile)",
        ta: "மின்சார வாரியம் (தனிநபர் எண்)",
        hi: "बिजली विभाग (मोबाइल नंबर)"
      },
      message: {
        en: "Dear Consumer, your electricity power connection will be DISCONNECTED tonight at 9:30 PM from the power sub-station because previous month bill ₹840 was not updated. Immediately call Electricity Officer Mr. Sharma at 97182-44102 to update your payment.",
        ta: "அன்புள்ள நுகர்வோரே, முந்தைய மாத பில் ₹840 அப்டேட் ஆகாததால் இன்று இரவு 9:30 மணிக்கு உங்கள் மின் இணைப்பு துண்டிக்கப்படும். மின்சார அதிகாரி சர்மா என்பவரை 97182-44102 என்ற எண்ணில் உடனே அழைத்து பணம் செலுத்துங்கள்.",
        hi: "प्रिय उपभोक्ता, पिछले महीने का बिल ₹840 अपडेट न होने के कारण आज रात 9:30 बजे बिजली कनेक्शन काट दिया जाएगा। तुरंत बिजली अधिकारी शर्मा जी को 97182-44102 पर कॉल करके बिल अपडेट कराएं।"
      }
    },
    clues: {
      sender: {
        en: "Sent from a personal 10-digit mobile phone, NOT from official Electricity Board SMS sender IDs (like TNEB, BESCOM, or BSES).",
        ta: "அரசு மின்வாரிய அதிகாரப்பூர்வ தலைப்பிலிருந்து வராமல், சாதாரண 10 இலக்க செல்போன் எண்ணிலிருந்து வந்துள்ளது.",
        hi: "यह किसी आधिकारिक बिजली बोर्ड (जैसे TNEB, BESCOM या BSES) से नहीं, बल्कि एक सामान्य 10 अंकों के निजी मोबाइल से भेजा गया है।"
      },
      link: {
        en: "Calling the mobile number will connect to a fake operator who asks you to install an app like 'AnyDesk' or 'TeamViewer' to steal your bank money.",
        ta: "அந்த எண்ணிற்கு அழைத்தால் போலி நபர் பேசி உங்கள் போனில் செயலியை பதிவிறக்கம் செய்ய வைத்து பணத்தை திருடுவார்.",
        hi: "उस नंबर पर कॉल करने पर वे आपसे मोबाइल में 'AnyDesk' जैसी ऐप डाउनलोड करवाकर बैंक खाते से पैसे उड़ा लेते हैं।"
      },
      urgency: {
        en: "Electricity boards give 15 days written notice and never disconnect power at night without warning.",
        ta: "மின்வாரியம் இரவு நேரத்தில் திடீரென இணைப்பைத் துண்டிக்காது; முன்கூட்டியே 15 நாள் எழுத்துப்பூர்வ நோட்டீஸ் வழங்கும்.",
        hi: "बिजली विभाग कभी भी रात को अचानक बिजली नहीं काटता और हमेशा 15 दिन का लिखित नोटिस देता है।"
      }
    },
    correctAnswer: "SCAM",
    correctDecision: "SCAM",
    explanation: {
      en: "Official electricity boards never send personal 10-digit mobile phone numbers for urgent bill payments or disconnect power at night without official written notice. This is a classic utility disconnection scam designed to trigger panic.",
      ta: "அரசு மின்வாரியம் ஒருபோதும் தனிநபர் மொபைல் எண்களையோ, இரவு நேர மின்துண்டிப்பு மிரட்டலையோ அனுப்பாது. இது பயத்தை உண்டாக்கி பணம் பறிக்கும் மோசடி.",
      hi: "आधिकारिक बिजली विभाग कभी भी निजी 10 अंकों के मोबाइल नंबर पर बिल भुगतान के लिए कॉल करने को नहीं कहता और न ही रात में बिना लिखित नोटिस के बिजली काटता है।"
    },
    redFlags: [
      "Threat of immediate power disconnection tonight without prior formal notice",
      "Manufactured urgency (9:30 PM deadline to trigger panic)",
      "Sent from a personal mobile phone number instead of an official utility SMS header",
      "Direct payment demand / request to call an unverified individual"
    ],
    rememberTip: {
      en: "Electricity boards never send personal phone numbers to call. Always pay bills through your official electricity office counter or authorized app.",
      ta: "மின்சார வாரியம் ஒருபோதும் தனிநபர் மொபைல் எண்களுக்கு அழைக்கச் சொல்லாது. எப்போதும் அரசு மையத்திலோ அதிகாரப்பூர்வ ஆப்பிலோ செலுத்துங்கள்.",
      hi: "बिजली विभाग कभी निजी फोन नंबर पर कॉल करने को नहीं कहता। हमेशा आधिकारिक काउंटर या अधिकृत ऐप से ही बिल भरें।"
    },
    consequence: {
      en: "If you call that number, the scammer will pretend to help and drain your bank account by asking you to share an OTP or download a screen-sharing app.",
      ta: "அந்த எண்ணை அழைத்தால், உதவி செய்வது போல் நடித்து ஓடிபி கேட்டு உங்கள் வங்கிக் கணக்கில் உள்ள பணத்தை முழுமையாக எடுத்துவிடுவார்கள்.",
      hi: "यदि आप कॉल करेंगे, तो जालसाज स्क्रीन-शेयरिंग ऐप डलवाकर या ओटीपी पूछकर आपका पूरा बैंक खाता खाली कर देगा।"
    }
  },

  {
    id: "senior_02",
    title: {
      en: "The Hospital Emergency Call",
      ta: "அவசர மருத்துவமனை அழைப்பு",
      hi: "अस्पताल आपातकालीन कॉल"
    },
    category: {
      en: "Family Impersonation Scam",
      ta: "குடும்ப உறுப்பினர் போல் நடிக்கும் மோசடி",
      hi: "रिश्तेदार बनकर धोखाधड़ी"
    },
    simulatedUI: {
      type: "whatsapp",
      sender: "+91 98214-01928 (Unknown)",
      senderName: {
        en: "Unknown Contact (Claims to be your Son)",
        ta: "தெரியாத எண் (உங்கள் மகன் என கூறுகிறார்)",
        hi: "अज्ञात नंबर (पुत्र होने का दावा)"
      },
      message: {
        en: "Papa! My phone fell and broke. I had a small scooter accident with a friend and I am at City Care Clinic. The doctor is asking for ₹25,000 immediate deposit for X-ray medicine. Please send ₹25,000 to the hospital clinic UPI: citycare.clinic@okaxis right now! Please don't call my old phone, screen is completely broken.",
        ta: "அப்பா! என் போன் கீழே விழுந்து உடைந்துவிட்டது. ஒரு சிறிய பைக் விபத்து ஏற்பட்டு சிட்டி கேர் கிளினிக்கில் இருக்கிறேன். எக்ஸ்-ரே எடுக்க ₹25,000 முன்பணம் கேட்கிறார்கள். கிளினிக் UPI முகவரிக்கு உடனே ₹25,000 அனுப்புங்கள்: citycare.clinic@okaxis. என் பழைய போனுக்கு அழைக்காதீர்கள், போன் வேலை செய்யவில்லை.",
        hi: "पापा! मेरा फोन गिरकर टूट गया है। एक मामूली बाइक एक्सीडेंट के बाद मैं सिटी केयर क्लिनिक में हूँ। डॉक्टर एक्स-रे के लिए ₹25,000 तुरंत जमा करने को कह रहे हैं। कृपया क्लिनिक के यूपीआई citycare.clinic@okaxis पर ₹25,000 तुरंत भेजें! मेरे पुराने फोन पर कॉल मत करना, वह खराब है।"
      }
    },
    clues: {
      sender: {
        en: "The message is from an unknown new phone number. You have not heard your son's voice or verified with anyone else.",
        ta: "செய்தி முற்றிலும் புதிய தெரியாத எண்ணிலிருந்து வந்துள்ளது. உங்கள் மகனின் குரலைக் கேட்கவில்லை அல்லது வேறு யாரிடமும் உறுதிப்படுத்தவில்லை.",
        hi: "संदेश बिल्कुल नए अज्ञात नंबर से आया है। आपने अपने बेटे की आवाज़ नहीं सुनी है और न ही किसी अन्य से पुष्टि की है।"
      },
      link: {
        en: "The UPI ID belongs to a private unverified individual account, not an authorized registered hospital.",
        ta: "UPI முகவரி அதிகாரப்பூர்வ மருத்துவமனைக்குரியது அல்ல, தனிநபர் பெயரில் உள்ள வங்கிக் கணக்கு.",
        hi: "यूपीआई आईडी किसी अधिकृत अस्पताल की नहीं, बल्कि किसी अज्ञात निजी व्यक्ति के खाते की है।"
      },
      urgency: {
        en: "They are pressuring you to transfer money in panic and specifically telling you NOT to call your son's real phone.",
        ta: "அவசரத்திலும் பயத்திலும் பணம் அனுப்ப சொல்கிறார்கள்; குறிப்பாக உங்கள் மகனின் உண்மையான எண்ணிற்கு அழைக்க வேண்டாம் என்கிறார்கள்.",
        hi: "वे घबराहट में तुरंत पैसे भेजने का दबाव बना रहे हैं और विशेष रूप से बेटे के असली नंबर पर फोन न करने को कह रहे हैं।"
      }
    },
    correctAnswer: "SCAM",
    correctDecision: "SCAM",
    explanation: {
      en: "Scammers impersonate family members claiming an urgent medical accident to induce panic. Never send money to an unverified UPI handle before speaking directly to your relative on their known original number.",
      ta: "குடும்ப உறுப்பினர் போல் நடித்து அவசர மருத்துவ உதவி என்ற பெயரில் பணம் பறிக்க முயற்சிப்பது அப்பட்டமான மோசடி.",
      hi: "जालसाज परिवार का सदस्य बनकर एक्सीडेंट का बहाना बनाते हैं ताकि घबराहट में आप पैसे भेज दें। हमेशा अपने रिश्तेदार के पुराने नंबर पर पहले बात करें।"
    },
    redFlags: [
      "Contact from an unknown new phone number claiming to be family",
      "Explicit instructions NOT to call their real, known phone",
      "High emotional panic trigger (accident & clinic emergency deposit)",
      "Urgent request for irreversible UPI money transfer"
    ],
    rememberTip: {
      en: "Always call your family member on their KNOWN original phone number before sending any money. Scammers use panic to stop you from thinking.",
      ta: "பணம் அனுப்பும் முன் உங்கள் குடும்பத்தினரின் உண்மையான எண்ணிற்கு எப்போதும் அழையுங்கள். மோசடி நபர்கள் பயத்தை ஆயுதமாகப் பயன்படுத்துகிறார்கள்.",
      hi: "पैसे भेजने से पहले हमेशा अपने परिवार के सदस्य के पुराने जाने-पहचाने नंबर पर सीधे कॉल करें। जालसाज घबराहट का फायदा उठाते हैं।"
    },
    consequence: {
      en: "If you send the money, the scammers will immediately take your ₹25,000. Your real son is safe at work and did not know anything about this.",
      ta: "நீங்கள் பணத்தை அனுப்பினால் ₹25,000 இழப்பு ஏற்படும். உங்கள் மகன் வேலையில் பாதுகாப்பாக இருப்பார், அவருக்கு இதுபற்றி எதுவுமே தெரிந்திருக்காது.",
      hi: "यदि आप पैसे भेज देते हैं, तो ₹25,000 तुरंत चले जाएंगे। आपका बेटा काम पर पूरी तरह सुरक्षित था और उसे इसकी कोई जानकारी नहीं थी।"
    }
  },

  {
    id: "senior_03",
    title: {
      en: "Bank Account KYC & Aadhaar Block Notice",
      ta: "வங்கி கணக்கு முடக்கம் & ஆதார் KYC",
      hi: "बैंक खाता और आधार KYC बंद होने की सूचना"
    },
    category: {
      en: "Banking Phishing & OTP Theft",
      ta: "வங்கி KYC போலி எச்சரிக்கை",
      hi: "बैंक फ्रॉड और ओटीपी चोरी"
    },
    simulatedUI: {
      type: "sms",
      sender: "SBI-ALERT-9921",
      senderName: {
        en: "State Bank Customer Support",
        ta: "வங்கி வாடிக்கையாளர் மையம்",
        hi: "बैंक ग्राहक सेवा"
      },
      message: {
        en: "URGENT: Your Bank Account & ATM Debit Card has been BLOCKED due to expired Aadhaar KYC. To unblock immediately, click link: https://sbi-kyc-verify-portal.top/update or reply with OTP received on your mobile.",
        ta: "முக்கிய எச்சரிக்கை: ஆதார் KYC காலாவதியானதால் உங்கள் வங்கி கணக்கு மற்றும் ஏடிஎம் கார்டு முடக்கப்பட்டுள்ளது. உடனடியாக செயல்படுத்த இந்த இணைப்பை கிளிக் செய்யவும்: https://sbi-kyc-verify-portal.top/update அல்லது உங்கள் போனுக்கு வந்த OTP-ஐ பகிரவும்.",
        hi: "अति आवश्यक: आधार KYC समाप्त होने के कारण आपका बैंक खाता और एटीएम कार्ड ब्लॉक कर दिया गया है। तुरंत चालू करने के लिए लिंक पर क्लिक करें: https://sbi-kyc-verify-portal.top/update या मोबाइल पर आया ओटीपी बताएं।"
      }
    },
    clues: {
      sender: {
        en: "Banks never send unverified links with '.top' extensions to update KYC.",
        ta: "வங்கிகள் '.top' போன்ற போலியான இணையதள இணைப்புகளை ஒருபோதும் அனுப்பாது.",
        hi: "बैंक कभी भी '.top' वाले फर्जी लिंक भेजकर KYC अपडेट करने को नहीं कहते।"
      },
      link: {
        en: "The link opens a fake webpage that asks for your 16-digit ATM card number, PIN, and NetBanking password.",
        ta: "அந்த இணைப்பு உங்கள் ஏடிஎம் கார்டு எண், ரகசிய பின் மற்றும் வங்கி கடவுச்சொல்லை திருட உருவாக்கப்பட்ட போலி பக்கம்.",
        hi: "यह लिंक एक नकली पेज खोलता है जो आपका एटीएम कार्ड नंबर, पिन और नेटबैंकिंग पासवर्ड चुरा लेता है।"
      },
      urgency: {
        en: "Asking for your SMS OTP is the #1 sign of bank fraud. Real banks strictly forbid asking for OTP.",
        ta: "எஸ்எம்எஸ் OTP கேட்பது 100% மோசடியின் அடையாளம். எந்த வங்கியும் வாடிக்கையாளரிடம் OTP கேட்காது.",
        hi: "एसएमएस ओटीपी मांगना फ्रॉड का सबसे बड़ा प्रमाण है। कोई भी असली बैंक कभी ग्राहक से ओटीपी नहीं मांगता।"
      }
    },
    correctAnswer: "SCAM",
    correctDecision: "SCAM",
    explanation: {
      en: "Banks never send unverified links or threaten immediate account suspension via SMS. Real banks strictly forbid asking customers for OTPs, ATM PINs, or password credentials.",
      ta: "வங்கிகள் ஒருபோதும் எஸ்எம்எஸ் மூலம் இணைப்புகளை அனுப்பி கணக்கு முடக்கப்படும் என்று மிரட்டாது.",
      hi: "बैंक कभी भी एसएमएस में फर्जी लिंक भेजकर खाता ब्लॉक करने की धमकी नहीं देते और न ही ओटीपी मांगते हैं।"
    },
    redFlags: [
      "Threat of account and debit card block within hours",
      "Suspicious link domain with unverified extension (.top)",
      "Direct request to share SMS OTP or enter netbanking password",
      "Generic customer greeting instead of personalized banking communication"
    ],
    rememberTip: {
      en: "NEVER share your OTP, PIN, or password with anyone, even if they claim to be a Bank Manager.",
      ta: "வங்கி மேனேஜரே பேசினாலும் உங்கள் OTP அல்லது ATM PIN-ஐ யாரிடமும் ஒருபோதும் பகிராதீர்கள்.",
      hi: "कभी भी अपना ओटीपी, पिन या पासवर्ड किसी के साथ साझा न करें, चाहे सामने वाला खुद को बैंक मैनेजर ही क्यों न बताए।"
    },
    consequence: {
      en: "Sharing the OTP or clicking the link allows fraudsters to withdraw your life savings within 30 seconds.",
      ta: "OTP பகிர்ந்தால் அடுத்த 30 வினாடிகளில் உங்கள் வங்கிக் கணக்கில் உள்ள சேமிப்பு பணம் முழுவதும் திருடப்படும்.",
      hi: "ओटीपी शेयर करने या लिंक खोलने से ठग 30 सेकंड के भीतर आपकी जीवन भर की जमा पूंजी निकाल लेते हैं।"
    }
  },

  {
    id: "senior_04",
    title: {
      en: "Pension Arrears & Life Certificate Bonus",
      ta: "ஓய்வூதிய நிலுவைத் தொகை போனஸ்",
      hi: "पेंशन बकाया और जीवन प्रमाण पत्र बोनस"
    },
    category: {
      en: "Government Pension Fraud",
      ta: "அரசு ஓய்வூதிய மோசடி",
      hi: "पेंशन फंड धोखाधड़ी"
    },
    simulatedUI: {
      type: "sms",
      sender: "+91 94112-99201",
      senderName: {
        en: "Govt Pension Treasury Desk",
        ta: "அரசு கருவூல ஓய்வூதிய பிரிவு",
        hi: "सरकारी पेंशन कोषालय"
      },
      message: {
        en: "Govt Pension Office Notice: Your pending 7th Pay revision arrears of ₹46,800 have been approved. To release funds to your bank account, deposit mandatory ₹1,200 verification processing charge to Treasury Officer UPI: pension.release@ybl within 24 hours.",
        ta: "அரசு ஓய்வூதிய அலுவலக அறிவிப்பு: உங்கள் நிலுவைத் தொகை ₹46,800 அனுமதிக்கப்பட்டுள்ளது. பணத்தை உங்கள் கணக்கிற்கு அனுப்ப ₹1,200 சரிபார்ப்புக் கட்டணத்தை கருவூல அதிகாரி UPI முகவரிக்கு pension.release@ybl 24 மணி நேரத்திற்குள் செலுத்துங்கள்.",
        hi: "सरकारी पेंशन कार्यालय सूचना: आपका ₹46,800 का बकाया पेंशन एरियर स्वीकृत हो गया है। राशि अपने बैंक खाते में प्राप्त करने के लिए कोषालय अधिकारी के यूपीआई pension.release@ybl पर ₹1,200 का सत्यापन शुल्क 24 घंटे में जमा करें।"
      }
    },
    clues: {
      sender: {
        en: "Government treasury never collects processing charges via private UPI handles like @ybl or @okaxis.",
        ta: "அரசு கருவூலம் தனிநபர் UPI முகவரிகள் மூலம் பணம் பெறாது; அனைத்து நிலுவைத் தொகைகளும் நேரடியாக வங்கியில் வரவு வைக்கப்படும்.",
        hi: "सरकारी ट्रेजरी कभी भी निजी यूपीआई हैंडल (@ybl या @okaxis) के जरिए कोई प्रोसेसिंग फीस नहीं मांगती।"
      },
      link: {
        en: "Government departments deposit arrears directly to your registered pension account with no advance fee required.",
        ta: "ஓய்வூதிய நிலுவைத் தொகையைப் பெற நுகர்வோர் எந்த முன்பணமும் செலுத்த வேண்டிய அவசியமில்லை.",
        hi: "पेंशन या एरियर सीधे आपके रजिस्टर्ड खाते में आता है, इसके लिए पहले से कोई शुल्क नहीं देना पड़ता।"
      },
      urgency: {
        en: "Promises of free money combined with a small upfront fee is the classic 'Advance Fee' scam.",
        ta: "பெரிய தொகையைத் தருகிறோம் என்று கூறி சிறிய கட்டணம் கேட்பது 'முன்பண மோசடி' யுக்தி.",
        hi: "बड़ी रकम देने का झांसा देकर छोटी फीस मांगना पुराना अग्रिम शुल्क (Advance Fee) फ्रॉड है।"
      }
    },
    correctAnswer: "SCAM",
    correctDecision: "SCAM",
    explanation: {
      en: "Government treasury departments never demand advance processing fees to release approved pension or salary arrears. All legitimate arrears are credited directly to your registered pension bank account.",
      ta: "அரசு கருவூலம் நிலுவைத் தொகையை வழங்க ஒருபோதும் முன்பணம் கோராது.",
      hi: "सरकारी ट्रेजरी कभी भी पेंशन एरियर जारी करने के लिए अग्रिम प्रोसेसिंग शुल्क नहीं मांगती।"
    },
    redFlags: [
      "Promise of large financial bonus in exchange for small advance deposit",
      "Payment demanded through private UPI handle (@ybl)",
      "Strict 24-hour urgency countdown",
      "Official government departments do not conduct treasury transactions over private SMS"
    ],
    rememberTip: {
      en: "You NEVER have to pay money to receive government pension or arrears. If anyone asks for a fee to give you money, it is a scam.",
      ta: "அரசு ஓய்வூதியம் அல்லது சலுகைகளைப் பெற நீங்கள் ஒருபோதும் பணம் செலுத்த தேவையில்லை.",
      hi: "सरकारी पेंशन या एरियर पाने के लिए कभी कोई शुल्क नहीं देना पड़ता। पैसे देने के बदले पैसे मांगना हमेशा फ्रॉड होता है।"
    },
    consequence: {
      en: "If you pay the ₹1,200 fee, the scammers will take it and follow up asking for ₹3,500 more for 'tax clearance', and you will receive nothing.",
      ta: "நீங்கள் ₹1,200 செலுத்தினால் மோசடி நபர்கள் அதை எடுத்துக் கொண்டு, மேலும் வரி என்ற பெயரில் ₹3,500 கேட்பார்கள்; நிலுவைத் தொகை வராது.",
      hi: "यदि आप ₹1,200 देंगे, तो वे और अधिक पैसे मांगेंगे और आपको कोई पेंशन बकाया नहीं मिलेगा।"
    }
  },

  {
    id: "senior_05",
    title: {
      en: "The Kaun Banega Crorepati Lottery Prize",
      ta: "லாட்டரி & லக்கி டிரா பரிசு குறுஞ்செய்தி",
      hi: "केबीसी 25 लाख लॉटरी विजेता संदेश"
    },
    category: {
      en: "Lottery & Lucky Draw Scam",
      ta: "பரிசு மோசடி",
      hi: "लॉटरी फ्रॉड"
    },
    simulatedUI: {
      type: "whatsapp",
      sender: "+92 301-9284102 (Foreign Country Code)",
      senderName: {
        en: "KBC Lucky Draw Head Office",
        ta: "கேபிசி அதிர்ஷ்ட குலுக்கல் மையம்",
        hi: "केबीसी लकी ड्रा मुख्यालय"
      },
      message: {
        en: "CONGRATULATIONS! Your SIM card number has won 1st Prize of ₹25,00,000 (Twenty-Five Lakhs) in KBC All-India Lucky Draw! To receive your prize cheque, contact WhatsApp Manager Rana Pratap at +92-301-9284102 immediately with your photo and bank details.",
        ta: "வாழ்த்துகள்! உங்கள் சிம் கார்டு எண் கேபிசி அகில இந்திய குலுக்கலில் முதல் பரிசான ₹25,00,000 வென்றுள்ளது! பரிசு காசோலையைப் பெற மேனேஜரை வாட்ஸ்அப்பில் உடனே தொடர்பு கொள்ளுங்கள்: +92-301-9284102.",
        hi: "बधाई हो! आपके सिम नंबर ने केबीसी ऑल-इंडिया लकी ड्रा में ₹25,00,000 (पच्चीस लाख) का पहला इनाम जीता है! अपना चेक प्राप्त करने के लिए तुरंत व्हाट्सएप मैनेजर से संपर्क करें: +92-301-9284102।"
      }
    },
    clues: {
      sender: {
        en: "Notice the country code +92 (Pakistan) or foreign country code, completely unrelated to any Indian organization.",
        ta: "எண்ணின் தொடக்கத்தில் +92 (பாகிஸ்தான்) போன்ற வெளிநாட்டு குறியீடு இருப்பதை கவனியுங்கள்.",
        hi: "ध्यान दें कि यह फोन नंबर +92 (विदेशी कंट्री कोड) से है, जिसका किसी भी भारतीय संस्था से कोई संबंध नहीं है।"
      },
      link: {
        en: "You never bought any lottery ticket or entered any competition. You cannot win a prize in a contest you never entered!",
        ta: "நீங்கள் எந்த குலுக்கலிலும் பங்கேற்கவில்லை. பங்கேற்காத போட்டியில் பரிசு வெல்லவே முடியாது!",
        hi: "आपने कभी कोई लॉटरी टिकट नहीं खरीदा और न किसी प्रतियोगिता में भाग लिया। जिसमें भाग ही नहीं लिया, उसमें जीत कैसे सकते हैं?"
      },
      urgency: {
        en: "They will ask for a ₹15,000 'processing & GST fee' to dispatch the fake ₹25 Lakh cheque.",
        ta: "போலி ₹25 லட்சத்தை அனுப்ப 'ஜிஎஸ்டி மற்றும் வரி' என்ற பெயரில் உங்களிடம் முன்பணமாக ₹15,000 கேட்பார்கள்.",
        hi: "वे 25 लाख का नकली चेक भेजने के बहाने आपसे फाइल चार्ज या जीएसटी के नाम पर ₹15,000 ठग लेंगे।"
      }
    },
    correctAnswer: "SCAM",
    correctDecision: "SCAM",
    explanation: {
      en: "You cannot win a prize in a contest or lottery you never entered. Legitimate organizations never distribute lottery cheques over WhatsApp or require upfront GST processing fees.",
      ta: "நீங்கள் பங்கேற்காத போட்டியில் ஒருபோதும் பரிசு வெல்ல முடியாது. இது வெளிநாட்டு எண்களிலிருந்து வரும் பண மோசடி.",
      hi: "जिस लॉटरी में आपने भाग ही नहीं लिया, उसे जीतना असंभव है। विदेशी नंबरों से आने वाले ऐसे सभी लॉटरी संदेश 100% फर्जी होते हैं।"
    },
    redFlags: [
      "Unsolicited prize notification for a contest never entered",
      "Message originating from a foreign country code (+92)",
      "Advance processing / GST deposit demanded to claim prize",
      "Request for personal identity photo and bank details over messaging app"
    ],
    rememberTip: {
      en: "Nobody gives away lakhs of rupees for free. If you didn't buy a lottery ticket, you didn't win.",
      ta: "யாரும் சும்மா லட்சக்கணக்கில் பணம் தரமாட்டார்கள். குலுக்கல் சீட்டு வாங்கவில்லை என்றால் பரிசு கிடைக்காது.",
      hi: "बिना लॉटरी टिकट खरीदे कोई इनाम नहीं मिलता। मुफ्त में लाखों रुपये देने का दावा 100% फ्रॉड है।"
    },
    consequence: {
      en: "Victims have lost their entire retirement savings paying repeated 'clearance charges' for a non-existent lottery.",
      ta: "இல்லாத பரிசுக்காக வரி கட்டுகிறேன் என்று பல முதியவர்கள் தங்களது சேமிப்பு பணத்தை முழுமையாக இழந்துள்ளனர்.",
      hi: "इस झूठी लॉटरी के चक्कर में कई बुजुर्गों ने अपनी पेंशन और जमा पूंजी गंवा दी है।"
    }
  }
];
