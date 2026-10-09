// SCAMMER CHAT DUEL - Branching Dialogue Scripts (4 Scenarios: Easy, Medium, Hard, Delivery)
// Fully translated in English, தமிழ், and हिन्दी

window.DUEL_SCRIPTS = [
  {
    id: "duel_bank",
    title: {
      en: "The Fake Bank Fraud Specialist",
      ta: "போலி வங்கி மோசடி பிரிவு அதிகாரி",
      hi: "फर्जी बैंक फ्रॉड अधिकारी"
    },
    scammerName: {
      en: "Officer Vikram (SBI / Chase Fraud Desk)",
      ta: "அதிகாரி விக்ரம் (வங்கி மோசடி பிரிவு)",
      hi: "ऑफिसर विक्रम (बैंक फ्रॉड डेस्क)"
    },
    difficulty: "EASY",
    avatar: "👔",
    intro: {
      en: "Incoming Secure Banking Call / Live Chat: A purported senior security analyst connects regarding an urgent unauthorized transaction.",
      ta: "வங்கி நேரடி அரட்டை: உங்கள் கணக்கில் சந்தேகத்திற்குரிய பரிவர்த்தனை நடந்துள்ளதாகக் கூறி ஒருவர் தொடர்பு கொள்கிறார்.",
      hi: "बैंक लाइव चैट: एक कथित वरिष्ठ अधिकारी आपके खाते से अनधिकृत लेन-देन का दावा करते हुए जुड़ा है।"
    },
    initialPressure: 30,
    steps: [
      {
        id: "step_1",
        scammerText: {
          en: "Alert! This is Officer Vikram from the Fraud Prevention Cell. We just intercepted a fraudulent wire transfer of ₹45,000 to CryptoPay LLC from your account. Did you authorize this transfer?",
          ta: "எச்சரிக்கை! நான் மோசடி தடுப்புப் பிரிவு அதிகாரி விக்ரம். உங்கள் கணக்கிலிருந்து ₹45,000 மர்ம பரிவர்த்தனை செய்யப்படுவதை தடுத்துள்ளோம். இதை நீங்கள் அனுப்பினீர்களா?",
          hi: "अलर्ट! मैं फ्रॉड प्रिवेंशन सेल से ऑफिसर विक्रम बोल रहा हूँ। आपके खाते से ₹45,000 का अनधिकृत ट्रांसफर रोका गया है। क्या यह आपने किया है?"
        },
        tactic: "Manufactured Panic & Authority",
        tacticI18n: {
          en: "Manufactured Panic & Authority",
          ta: "பயமுறுத்துதல் & போலி அதிகாரம்",
          hi: "घबराहट पैदा करना और फर्जी अधिकार"
        },
        replies: [
          {
            text: {
              en: "No, I did not authorize it! Please cancel it immediately!",
              ta: "இல்லை, நான் அனுப்பவில்லை! உடனே ரத்து செய்யுங்கள்!",
              hi: "नहीं, मैंने नहीं किया! कृपया इसे तुरंत रद्द करें!"
            },
            type: "neutral",
            pressureDelta: 10,
            shieldDelta: 0,
            feedback: {
              en: "You sounded panicked, which gives the scammer an opening to exploit your urgency.",
              ta: "நீங்கள் பயந்து பதிலளித்தீர்கள்; இது மோசடி நபருக்கு சாதகமாகிறது.",
              hi: "आप घबरा गए, जिससे स्कैमर को आप पर दबाव बनाने का मौका मिला।"
            },
            nextStep: "step_2"
          },
          {
            text: {
              en: "I don't recognize you. I will call the official phone number printed on the back of my debit card.",
              ta: "நான் உங்களை நம்பவில்லை. என் ஏடிஎம் கார்டின் பின்னால் உள்ள அதிகாரப்பூர்வ எண்ணிற்கு அழைக்கிறேன்.",
              hi: "मैं आपको नहीं पहचानता। मैं अपने डेबिट कार्ड के पीछे लिखे आधिकारिक नंबर पर कॉल करूँगा।"
            },
            type: "good",
            pressureDelta: -25,
            shieldDelta: 0,
            tacticExposed: "False Authority",
            feedback: {
              en: "EXCELLENT DEFENSE! Official out-of-band verification is the #1 defense against call spoofing.",
              ta: "சிறந்த தற்காப்பு! கார்டின் பின்னுள்ள எண்ணிற்கு அழைப்பது போலி அழைப்புகளை முறியடிக்கும் சிறந்த வழி.",
              hi: "उत्कृष्ट बचाव! कार्ड के पीछे लिखे नंबर पर कॉल करना बैंक स्पूफिंग से बचने का सबसे सही तरीका है।"
            },
            nextStep: "step_expose"
          },
          {
            text: {
              en: "Wait, my bank account is with another branch. Which account number are you talking about?",
              ta: "என் வங்கி கணக்கு வேறு கிளையில் உள்ளது. நீங்கள் எந்த கணக்கு எண்ணைக் குறிப்பிடுகிறீர்கள்?",
              hi: "रुकिए, मेरा खाता तो दूसरी शाखा में है। आप किस अकाउंट नंबर की बात कर रहे हैं?"
            },
            type: "good",
            pressureDelta: -20,
            shieldDelta: 0,
            tacticExposed: "Blind Phishing Shot",
            feedback: {
              en: "GREAT CHECK! You challenged their knowledge without revealing private details.",
              ta: "நல்ல கேள்வி! உங்கள் ரகசிய விவரங்களை சொல்லாமல் அவர்களை திகைக்க வைத்தீர்கள்.",
              hi: "शानदार जांच! आपने अपनी निजी जानकारी दिए बिना उनसे प्रमाण मांगा।"
            },
            nextStep: "step_2"
          }
        ]
      },
      {
        id: "step_2",
        scammerText: {
          en: "Sir, time is running out. To block the hacker's device, I just sent a 6-digit Security Reversal Code to your SMS. Read those 6 digits to me immediately or the ₹45,000 will be permanently lost!",
          ta: "ஐயா, நேரம் இல்லை! ஹேக்கரைத் தடுக்க உங்கள் செல்போனுக்கு 6 இலக்க பாதுகாப்பு குறியீடு (OTP) அனுப்பியுள்ளேன். அதை உடனே சொல்லுங்கள், இல்லையென்றால் ₹45,000 போய்விடும்!",
          hi: "सर, समय खत्म हो रहा है! हैकर को रोकने के लिए मैंने आपके फोन पर 6 अंकों का सिक्योरिटी कोड (ओटीपी) भेजा है। वह कोड मुझे तुरंत बताएं वरना पैसे हमेशा के लिए कट जाएंगे!"
        },
        tactic: "OTP Harvesting Coercion",
        tacticI18n: {
          en: "OTP Harvesting Coercion",
          ta: "ரகசிய OTP-ஐ பறிக்கும் வற்புறுத்தல்",
          hi: "ओटीपी चुराने का दबाव"
        },
        replies: [
          {
            text: {
              en: "The OTP is 892014. Please block the transaction fast!",
              ta: "இதோ OTP 892014. சீக்கிரம் பணத்தை தடுத்து நிறுத்துங்கள்!",
              hi: "ओटीपी 892014 है। कृपया जल्दी से ट्रांजैक्शन रोकें!"
            },
            type: "bad",
            pressureDelta: 30,
            shieldDelta: -50,
            feedback: {
              en: "CRITICAL BREACH! You shared your OTP! That code was authorizing the fraudulent transfer, not reversing it!",
              ta: "ஆபத்து! நீங்கள் OTP-ஐ கொடுத்துவிட்டீர்கள்! அந்த குறியீடு பணத்தை எடுக்கவே அனுப்பப்பட்டது!",
              hi: "भारी गलती! आपने अपना ओटीपी दे दिया! वह कोड पैसे रोकने के लिए नहीं, पैसे निकालने के लिए था!"
            },
            nextStep: "step_bad_end"
          },
          {
            text: {
              en: "Banks NEVER ask for OTPs over call or chat. The SMS specifically says 'Do not share with anyone'.",
              ta: "வங்கிகள் ஒருபோதும் OTP கேட்காது. எஸ்எம்எஸ்-ல் 'யாருடனும் பகிர வேண்டாம்' என்று தெளிவாக உள்ளது.",
              hi: "बैंक कभी फोन या चैट पर ओटीपी नहीं मांगते। एसएमएस में साफ लिखा है 'किसी के साथ शेयर न करें'।"
            },
            type: "good",
            pressureDelta: -35,
            shieldDelta: 10,
            tacticExposed: "Credential Harvesting",
            feedback: {
              en: "COUNTER-ATTACK SUCCESS! You quoted the golden rule of digital banking.",
              ta: "வெற்றி! டிஜிட்டல் வங்கியின் தங்க விதியை மேற்கோள் காட்டி முறியடித்தீர்கள்.",
              hi: "सटीक जवाब! आपने डिजिटल बैंकिंग के सबसे बड़े नियम का पालन किया।"
            },
            nextStep: "step_win"
          },
          {
            text: {
              en: "I am disconnecting this call and walking directly into my local branch right now.",
              ta: "நான் இணைப்பைத் துண்டித்துவிட்டு நேரடியாக என் வங்கி கிளைக்குச் செல்கிறேன்.",
              hi: "मैं यह कॉल काट रहा हूँ और सीधे अपनी बैंक शाखा जा रहा हूँ।"
            },
            type: "good",
            pressureDelta: -30,
            shieldDelta: 5,
            tacticExposed: "Urgency Pressure",
            feedback: {
              en: "PERFECT! In-person branch verification renders the remote scam completely powerless.",
              ta: "மிகச்சரியான முடிவு! நேரில் வங்கிக்குச் செல்வது இத்தகைய மோசடிகளை முற்றிலுமாக அழிக்கும்.",
              hi: "बिल्कुल सही! शाखा में जाकर जांच करने की बात से स्कैमर के पास कोई चारा नहीं बचता।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_expose",
        scammerText: {
          en: "No, no! Don't hang up! If you hang up, your account will be frozen by the Reserve Bank for 6 months! Just listen to me!",
          ta: "வேண்டாம், போனை வைக்காதீர்கள்! போனை வைத்தால் உங்கள் கணக்கு 6 மாதங்களுக்கு முடக்கப்படும்! என் பேச்சைக் கேளுங்கள்!",
          hi: "नहीं नहीं! फोन मत काटिए! अगर आपने फोन काटा तो आपका खाता 6 महीने के लिए फ्रीज हो जाएगा! मेरी बात सुनिए!"
        },
        tactic: "Desperate Intimidation",
        tacticI18n: {
          en: "Desperate Intimidation",
          ta: "பயமுறுத்தும் கடைசி முயற்சி",
          hi: "हताश होकर धमकाना"
        },
        replies: [
          {
            text: {
              en: "Nice try, scammer. I'm reporting this number to 1930 and cybercrime.gov.in. Disconnecting.",
              ta: "நல்ல முயற்சி மோசடிக்காரரே! இந்த எண்ணை 1930 மற்றும் cybercrime.gov.in இல் புகார் செய்கிறேன். இணைப்பைத் துண்டிக்கிறேன்.",
              hi: "अच्छा प्रयास था, ठग! मैं इस नंबर की रिपोर्ट 1930 और cybercrime.gov.in पर कर रहा हूँ। अलविदा।"
            },
            type: "good",
            pressureDelta: -50,
            shieldDelta: 10,
            tacticExposed: "Intimidation Trap",
            feedback: {
              en: "TOTAL VICTORY! Scammer exposed and reported to national cyber authorities.",
              ta: "முழு வெற்றி! மோசடி நபர் அம்பலப்படுத்தப்பட்டு சைபர் கிரைமில் புகார் செய்யப்பட்டது.",
              hi: "शानदार विजय! स्कैमर को बेनकाब किया और सरकारी हेल्पलाइन पर रिपोर्ट किया।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_win",
        scammerText: {
          en: "[CALL DISCONNECTED BY SCAMMER] The caller realized their script failed and abruptly severed the connection.",
          ta: "[மோசடி நபர் இணைப்பைத் துண்டித்துவிட்டார்] தன் நாடகம் எடுபடவில்லை என்பதை உணர்ந்து அழைப்பைத் துண்டித்தார்.",
          hi: "[स्कैमर ने कॉल काट दिया] चाल नाकाम होते देख जालसाज ने तुरंत कॉल डिस्कनेक्ट कर दिया।"
        },
        isTerminal: true,
        outcome: "WIN"
      },
      {
        id: "step_bad_end",
        scammerText: {
          en: "[CALL TERMINATED] An SMS arrives: '₹45,000 debited from your account via IMPS to unknown wallet.'",
          ta: "[இணைப்பு முடிந்தது] ஒரு எஸ்எம்எஸ் வந்தது: 'உங்கள் கணக்கிலிருந்து ₹45,000 எடுக்கப்பட்டுவிட்டது.'",
          hi: "[कॉल समाप्त] बैंक से मैसेज आया: 'आपके खाते से ₹45,000 अज्ञात वॉलेट में ट्रांसफर कर दिए गए हैं।'"
        },
        isTerminal: true,
        outcome: "LOSE"
      }
    ]
  },

  {
    id: "duel_job",
    title: {
      en: "The Dream Remote Recruiter",
      ta: "கைநிறைய சம்பளம் தரும் போலி வேலை ஆள்சேர்ப்பாளர்",
      hi: "घर बैठे अमीर बनाने वाला फर्जी रिक्रूटर"
    },
    scammerName: {
      en: "Sarah (Global Talent HR)",
      ta: "சாரா (குளோபல் டேலண்ட் HR)",
      hi: "सारा (ग्लोबल टैलेंट एचआर)"
    },
    difficulty: "MEDIUM",
    avatar: "👩‍💼",
    intro: {
      en: "Direct Message on Professional Network: A recruiter offers $85/hr for basic data entry without any formal interview.",
      ta: "வேலை வாய்ப்பு நேரடி செய்தி: நேர்காணல் இல்லாமலேயே மணிக்கு $85 (ரூ. 7,000) தருவதாக ஒருவர் குறுஞ்செய்தி அனுப்புகிறார்.",
      hi: "जॉब मैसेज: बिना किसी इंटरव्यू के घर बैठे ₹6,000 प्रति घंटा डाटा एंट्री की नौकरी का लुभावना ऑफर।"
    },
    initialPressure: 25,
    steps: [
      {
        id: "step_1",
        scammerText: {
          en: "Hi! We saw your profile and you are selected as our Remote Data Operations Specialist ($85/hr). No interview needed. We are sending you an advance equipment cheque of $4,500. Are you ready to start tomorrow?",
          ta: "வணக்கம்! உங்கள் சுயவிவரம் தேர்வு செய்யப்பட்டுள்ளது. மணிக்கு $85 சம்பளம். நேர்காணல் தேவையில்லை. அலுவலக உபகரணங்கள் வாங்க $4,500 காசோலை அனுப்புகிறோம். நாளை தொடங்க தயாரா?",
          hi: "नमस्ते! आपका प्रोफाइल सेलेक्ट हो गया है। घर बैठे ₹6,000/घंटे का काम। कोई इंटरव्यू नहीं। लैपटॉप खरीदने के लिए हम ₹3,50,000 का चेक भेज रहे हैं। क्या आप कल से शुरू करने के लिए तैयार हैं?"
        },
        tactic: "Unrealistic Financial Bait",
        tacticI18n: {
          en: "Unrealistic Financial Bait",
          ta: "நம்பமுடியாத அதிக சம்பள ஆசை",
          hi: "अवास्तविक वेतन का लालच"
        },
        replies: [
          {
            text: {
              en: "Wow, $85/hr with no interview? That sounds amazing! Send the cheque!",
              ta: "அற்புதம்! நேர்காணல் இல்லாமலேயே இவ்வளவு சம்பளமா? காசோலையை அனுப்புங்கள்!",
              hi: "वाह, बिना इंटरव्यू के इतना वेतन? बहुत बढ़िया, चेक भेजिए!"
            },
            type: "neutral",
            pressureDelta: 15,
            shieldDelta: -10,
            feedback: {
              en: "Careful! Legitimate companies never offer high-paying jobs without rigorous video or technical interviews.",
              ta: "எச்சரிக்கை! எந்த ஒரு நல்ல நிறுவனமும் நேர்காணல் இல்லாமல் லட்சங்களில் சம்பளம் தராது.",
              hi: "सावधान! कोई भी असली कंपनी बिना तकनीकी इंटरव्यू के इतना बड़ा वेतन नहीं देती।"
            },
            nextStep: "step_2"
          },
          {
            text: {
              en: "What is your official company domain and corporate registration number? Real companies don't hire without video interviews.",
              ta: "உங்கள் நிறுவனத்தின் அதிகாரப்பூர்வ இணையதளம் மற்றும் பதிவு எண் என்ன? நேர்காணல் இல்லாமல் யாரும் வேலை தருவதில்லை.",
              hi: "आपकी कंपनी की आधिकारिक वेबसाइट और कॉर्पोरेट आईडी क्या है? बिना इंटरव्यू के असली कंपनियां हायर नहीं करतीं।"
            },
            type: "good",
            pressureDelta: -25,
            shieldDelta: 5,
            tacticExposed: "Advance-Fee Check Scheme",
            feedback: {
              en: "SHARP EYE! Demanding verification immediately rattles fake recruiting syndicates.",
              ta: "கூர்மையான பார்வை! நிறுவன விவரங்களைக் கேட்பது போலி ஆள்சேர்ப்பு கும்பலை நிலைகுலையச் செய்யும்.",
              hi: "शानदार सवाल! आधिकारिक दस्तावेज मांगते ही फर्जी रिक्रूटर घबरा जाते हैं।"
            },
            nextStep: "step_2"
          }
        ]
      },
      {
        id: "step_2",
        scammerText: {
          en: "All onboarding is expedited! Deposit our $4,500 cheque into your personal bank account. Once deposited, wire $3,800 to our approved Apple vendor via Western Union to dispatch your MacBook today. You keep $700 as signing bonus!",
          ta: "அனைத்து நடைமுறைகளும் விரைவானவை! எங்கள் $4,500 காசோலையை உங்கள் வங்கியில் போடுங்கள். உடனே அதிலிருந்து $3,800-ஐ எங்கள் ஆப்பிள் விற்பனையாளருக்கு பணம் அனுப்புங்கள். மீதி $700 உங்கள் போனஸ்!",
          hi: "सब कुछ तुरंत होगा! हमारा ₹3,50,000 का चेक अपने बैंक में जमा करें और उसमें से ₹3,00,000 हमारे वेंडर को मैकबुक भेजने के लिए ट्रांसफर करें। बाकी ₹50,000 आपका जॉइनिंग बोनस!"
        },
        tactic: "Counterfeit Check Overpayment Fraud",
        tacticI18n: {
          en: "Counterfeit Check Overpayment Fraud",
          ta: "போலி காசோலை உபரி பணம் மோசடி",
          hi: "फर्जी चेक ओवरपेमेंट फ्रॉड"
        },
        replies: [
          {
            text: {
              en: "I deposited the check and transferred the $3,800 to the vendor as requested.",
              ta: "நான் காசோலையை டெபாசிட் செய்துவிட்டு $3,800-ஐ விற்பனையாளருக்கு அனுப்பிவிட்டேன்.",
              hi: "मैंने चेक जमा कर दिया और ₹3,00,000 वेंडर को ट्रांसफर कर दिए।"
            },
            type: "bad",
            pressureDelta: 40,
            shieldDelta: -60,
            feedback: {
              en: "DISASTER! The check was counterfeit. The bank bounced it a week later, leaving you with a $3,800 real debt to the bank!",
              ta: "பெரும் இழப்பு! காசோலை போலியானது. சில நாட்களில் வங்கி அதை ரத்து செய்துவிடும், நீங்கள் அனுப்பிய பணம் உங்கள் சொந்த இழப்பாகும்!",
              hi: "भारी नुकसान! चेक पूरी तरह फर्जी था। कुछ दिन बाद चेक बाउंस हो जाएगा और आपके खाते से कटे पैसे आपकी जेब से जाएंगे!"
            },
            nextStep: "step_bad_end"
          },
          {
            text: {
              en: "Classic fake cheque scam! The bank fronts provisional credit, the cheque bounces, and the victim is on the hook. Reported to FTC & Cyber Cell.",
              ta: "பழைய போலி காசோலை மோசடி! காசோலை பவுன்ஸ் ஆகும், ஆனால் நான் அனுப்பிய பணம் என் பாக்கெட்டிலிருந்து போகும். சைபர் கிரைமில் புகார் செய்கிறேன்.",
              hi: "यह पुराना फर्जी चेक फ्रॉड है! चेक बाउंस हो जाएगा और नुकसान मुझे भुगतना पड़ेगा। मैं आपकी साइबर सेल में शिकायत कर रहा हूँ।"
            },
            type: "good",
            pressureDelta: -40,
            shieldDelta: 15,
            tacticExposed: "Overpayment Scam",
            feedback: {
              en: "MASTERCLASS DEFENSE! You recognized the exact mechanics of fake cheque advance-fee fraud.",
              ta: "அபாரமான பாதுகாப்பு! போலி காசோலை மோசடியின் நுணுக்கத்தை சரியாகக் கண்டறிந்து முறியடித்தீர்கள்.",
              hi: "अद्भुत सुरक्षा समझ! आपने फर्जी चेक फ्रॉड की चाल को पकड़कर स्कैमर को निरुत्तर कर दिया।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_win",
        scammerText: {
          en: "[USER BLOCKED & ACCOUNT DELETED] The scam recruiter erased their profile to avoid law enforcement tracing.",
          ta: "[கணக்கு முடக்கப்பட்டு அழிக்கப்பட்டது] போலீஸ் பிடியில் சிக்காமல் இருக்க மோசடி நபர் தன் கணக்கை அழித்துவிட்டு ஓடிவிட்டார்.",
          hi: "[प्रोफाइल डिलीट हो गया] पुलिस की पकड़ से बचने के लिए फर्जी रिक्रूटर ने तुरंत अपना अकाउंट बंद कर दिया।"
        },
        isTerminal: true,
        outcome: "WIN"
      },
      {
        id: "step_bad_end",
        scammerText: {
          en: "[ACCOUNT DRAINED] The scammer ghosted you after receiving your real funds. The counterfeit check bounced.",
          ta: "[பணம் பறிபோனது] உங்கள் பணத்தைப் பெற்றவுடன் மோசடி நபர் மாயமானார். போலி காசோலை நிராகரிக்கப்பட்டது.",
          hi: "[पैसा चला गया] असली पैसे मिलते ही ठग गायब हो गया और बैंक ने फर्जी चेक बाउंस कर दिया।"
        },
        isTerminal: true,
        outcome: "LOSE"
      }
    ]
  },

  {
    id: "duel_emergency",
    title: {
      en: "The 'Mom / Dad I'm in Trouble' WhatsApp Call",
      ta: "'அப்பா நான் ஆபத்தில் இருக்கிறேன்' வாட்ஸ்அப் மோசடி",
      hi: "'मम्मी/पापा मैं मुसीबत में हूँ' व्हाट्सएप कॉल"
    },
    scammerName: {
      en: "Unknown Number (+91 91204-88219)",
      ta: "தெரியாத எண் (+91 91204-88219)",
      hi: "अज्ञात नंबर (+91 91204-88219)"
    },
    difficulty: "HARD",
    avatar: "📱",
    intro: {
      en: "WhatsApp Message from an unlisted number claiming to be your child who had an accident and urgently needs hospital bail cash.",
      ta: "தெரியாத வாட்ஸ்அப் எண்ணிலிருந்து உங்கள் மகன்/மகள் போல் பேசி விபத்து என்றும் உடனடியாக பணம் வேண்டும் என்றும் வரும் செய்தி.",
      hi: "अज्ञात नंबर से संदेश कि आपका बेटा पुलिस हिरासत या अस्पताल में है और तुरंत पैसे की जरूरत है।"
    },
    initialPressure: 40,
    steps: [
      {
        id: "step_1",
        scammerText: {
          en: "Maa/Papa, please help me! My phone was stolen and I'm at the police station with a friend. The inspector is demanding ₹30,000 fine right now or they will file an FIR. Send money to this officer's UPI: police.settle99@paytm immediately! Please don't call anyone!",
          ta: "அம்மா/அப்பா, தயவுசெய்து உதவுங்கள்! என் போன் திருடு போய்விட்டது, நான் நண்பருடன் காவல் நிலையத்தில் இருக்கிறேன். இப்போதே ₹30,000 அபராதம் கட்டாவிட்டால் வழக்கு போடுவேன் என்கிறார். போலீஸ் அதிகாரி UPI-க்கு police.settle99@paytm உடனே பணம் அனுப்புங்கள்! யாரிடமும் சொல்லாதீர்கள்!",
          hi: "मम्मी/पापा, प्लीज मदद करो! मेरा फोन चोरी हो गया है और मैं पुलिस स्टेशन में हूँ। इंस्पेक्टर ₹30,000 मांग रहे हैं वरना एफआईआर दर्ज कर देंगे। तुरंत इस अधिकारी के यूपीआई police.settle99@paytm पर पैसे भेजो! किसी को फोन मत करना!"
        },
        tactic: "Family Crisis & Fear Hijacking",
        tacticI18n: {
          en: "Family Crisis & Fear Hijacking",
          ta: "குடும்ப பாசத்தை ஆயுதமாக்குதல் & அச்சம்",
          hi: "पारिवारिक संकट और डर का फायदा उठाना"
        },
        replies: [
          {
            text: {
              en: "Oh my God! ₹30,000 is sent! Please don't hurt my child!",
              ta: "கடவுளே! ₹30,000 அனுப்பிவிட்டேன்! என் குழந்தையை ஒன்றும் செய்யாதீர்கள்!",
              hi: "हे भगवान! ₹30,000 भेज दिए हैं! मेरे बच्चे को कुछ मत करना!"
            },
            type: "bad",
            pressureDelta: 40,
            shieldDelta: -60,
            feedback: {
              en: "BREACH! You reacted on blind panic. Your real child was safe at their desk at university.",
              ta: "பேரிழப்பு! பயத்தில் யோசிக்காமல் பணத்தை அனுப்பிவிட்டீர்கள். உங்கள் பிள்ளை கல்லூரியில் பாதுகாப்பாக உள்ளார்.",
              hi: "धोखा! घबराहट में आपने पैसे भेज दिए। आपका असली बच्चा कॉलेज में पूरी तरह सुरक्षित था।"
            },
            nextStep: "step_bad_end"
          },
          {
            text: {
              en: "If you are my child, what is our pet dog's name and what did we have for dinner last night?",
              ta: "நீ என் பிள்ளை என்றால், நம் வீட்டு நாயின் பெயர் என்ன? நேற்று இரவு நாம் என்ன சாப்பிட்டோம்?",
              hi: "अगर तुम सच में मेरे बच्चे हो, तो हमारे पालतू कुत्ते का क्या नाम है और कल रात हमने क्या खाया था?"
            },
            type: "good",
            pressureDelta: -30,
            shieldDelta: 10,
            tacticExposed: "Family Secret Challenge",
            feedback: {
              en: "GENIUS DEFENSE! Family secret passphrases instantly expose impersonation bots and voice clones.",
              ta: "அறிவார்ந்த பாதுகாப்பு! குடும்ப ரகசிய கேள்விகள் ஆள்மாறாட்ட மோசடிகளை ஒரு நொடியில் அம்பலப்படுத்தும்.",
              hi: "शानदार सुरक्षा तरीका! निजी पारिवारिक सवाल पूछते ही फर्जी कॉल करने वाला पकड़ा जाता है।"
            },
            nextStep: "step_2"
          },
          {
            text: {
              en: "I am placing you on hold while I call your regular college hostel warden directly.",
              ta: "நான் உங்கள் கல்லூரி விடுதி காப்பாளரை நேரடியாக அழைத்து பேசப் போகிறேன்.",
              hi: "मैं अभी लाइन होल्ड करके तुम्हारे कॉलेज हॉस्टल वार्डन को सीधे कॉल कर रहा हूँ।"
            },
            type: "good",
            pressureDelta: -35,
            shieldDelta: 10,
            tacticExposed: "Out-of-Band Channel",
            feedback: {
              en: "PERFECT! Independent out-of-band verification is infallible against kinship fraud.",
              ta: "மிகச்சிறந்த தற்காப்பு! மாற்று வழியில் உண்மையை உறுதிப்படுத்துவது இத்தகைய மோசடிகளைத் தகர்க்கும்.",
              hi: "बिल्कुल सही! स्वतंत्र रूप से दूसरे माध्यम से जांच करना इस फ्रॉड का सबसे अचूक तोड़ है।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_2",
        scammerText: {
          en: "Maa why are you asking stupid questions right now?! I am crying here! Just send the money or my life is ruined! Please hurry up!",
          ta: "அம்மா ஏன் தேவையில்லாத கேள்வி கேட்கிறீர்கள்?! நான் அழுதுகொண்டிருக்கிறேன்! உடனே பணத்தை அனுப்புங்கள், என் வாழ்க்கையே போய்விடும்! சீக்கிரம்!",
          hi: "मम्मी आप इस समय ऐसे सवाल क्यों पूछ रही हो?! मैं यहाँ रो रहा हूँ! बस पैसे भेज दो वरना मेरी जिंदगी बर्बाद हो जाएगी! जल्दी करो!"
        },
        tactic: "Emotional Coercion & Guilt Tripping",
        tacticI18n: {
          en: "Emotional Coercion & Guilt Tripping",
          ta: "குற்ற உணர்வை தூண்டுதல் & கண்ணீர் நாடகம்",
          hi: "भावनात्मक दबाव और रोने का नाटक"
        },
        replies: [
          {
            text: {
              en: "You couldn't answer the simplest question. I just spoke to my child on their laptop. Nice try, scammer.",
              ta: "ஒரு எளிய கேள்விக்கு உங்களால் பதிலளிக்க முடியவில்லை. நான் இப்போதுதான் என் பிள்ளையிடம் லேப்டாப்பில் பேசினேன். உங்கள் நாடகம் முடிந்தது.",
              hi: "तुम एक आसान से सवाल का जवाब नहीं दे सके। मैंने अभी अपने बच्चे से बात की है। तुम्हारा खेल खत्म!"
            },
            type: "good",
            pressureDelta: -50,
            shieldDelta: 15,
            tacticExposed: "Emotional Blackmail",
            feedback: {
              en: "VICTORY! You stayed calm under intense emotional pressure and protected your family's savings.",
              ta: "வெற்றி! தீவிரமான உணர்ச்சி அழுத்தத்திலும் நிதானமாக இருந்து குடும்பப் பணத்தை காப்பாற்றினீர்கள்.",
              hi: "अद्भुत जीत! भारी भावनात्मक दबाव में भी आपने संयम रखा और परिवार की बचत बचा ली।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_win",
        scammerText: {
          en: "[CALL BLOCKED & TERMINATED] The scammer disconnected after realizing emotional manipulation failed completely.",
          ta: "[அழைப்பு துண்டிக்கப்பட்டது] உணர்ச்சி நாடகம் எடுபடவில்லை என்பதை உணர்ந்து மோசடி நபர் இணைப்பைத் துண்டித்தார்.",
          hi: "[कॉल समाप्त] भावनात्मक चाल नाकाम होते देख ठग ने तुरंत कॉल काट दिया।"
        },
        isTerminal: true,
        outcome: "WIN"
      },
      {
        id: "step_bad_end",
        scammerText: {
          en: "[TRANSFERRED & EXTORTED] You sent ₹30,000. 10 minutes later, they messaged demanding ₹50,000 more for doctor bribes.",
          ta: "[பணம் பறிபோனது] நீங்கள் ₹30,000 அனுப்பினீர்கள். அடுத்த 10 நிமிடத்தில் டாக்டர் கட்டணம் என்று மேலும் ₹50,000 கேட்டனர்.",
          hi: "[पैसे डूब गए] आपने ₹30,000 भेज दिए। 10 मिनट बाद उन्होंने डॉक्टर के नाम पर ₹50,000 और मांग लिए।"
        },
        isTerminal: true,
        outcome: "LOSE"
      }
    ]
  },

  {
    id: "duel_delivery",
    title: {
      en: "The Fake Courier Delivery Agent",
      ta: "போலி கூரியர் விநியோக ஊழியர்",
      hi: "फर्जी कूरियर डिलीवरी एजेंट"
    },
    scammerName: {
      en: "Ramesh (Express Delivery Support)",
      ta: "ரமேஷ் (எக்ஸ்பிரஸ் கூரியர் சேவை)",
      hi: "रमेश (एक्सप्रेस डिलीवरी सपोर्ट)"
    },
    difficulty: "EASY",
    avatar: "📦",
    intro: {
      en: "Incoming SMS / Delivery Chat claiming an important parcel is withheld at the local hub for a tiny address update fee of ₹25.",
      ta: "கூரியர் செய்தி: உங்கள் முக்கியமான பார்சல் வந்துள்ளது, முகவரியை சரிசெய்ய ₹25 கட்டணம் செலுத்த வேண்டும் என்று கேட்கிறார்.",
      hi: "कूरियर मैसेज: आपका जरूरी पार्सल रुका हुआ है और पता अपडेट करने के लिए मात्र ₹25 की फीस मांगी जा रही है।"
    },
    initialPressure: 20,
    steps: [
      {
        id: "step_1",
        scammerText: {
          en: "Hello Sir, I am delivery executive Ramesh. Your valuable registered package cannot be delivered today due to missing house number. Please click this link and pay ₹25 address change charge: https://india-speedpost-update.top/pay or your parcel will be returned to sender.",
          ta: "வணக்கம் ஐயா, நான் டெலிவரி ஆள் ரமேஷ். வீட்டு எண் இல்லாததால் உங்கள் பார்சலை டெலிவரி செய்ய முடியவில்லை. இந்த லிங்க்கை கிளிக் செய்து ₹25 முகவரி கட்டணம் செலுத்துங்கள்: https://india-speedpost-update.top/pay இல்லையென்றால் பார்சல் திருப்பி அனுப்பப்படும்.",
          hi: "नमस्ते सर, मैं डिलीवरी एजेंट रमेश हूँ। घर का नंबर अधूरा होने के कारण आपका पार्सल डिलीवर नहीं हो पा रहा है। इस लिंक पर क्लिक करके ₹25 का पता अपडेट शुल्क भरें: https://india-speedpost-update.top/pay वरना पार्सल वापस भेज दिया जाएगा।"
        },
        tactic: "Micro-Fee Card Harvesting Bait",
        tacticI18n: {
          en: "Micro-Fee Card Harvesting Bait",
          ta: "சிறிய கட்டண ஆசை காட்டி கார்டு திருடுதல்",
          hi: "मामूली फीस का झांसा देकर कार्ड हैक करना"
        },
        replies: [
          {
            text: {
              en: "Sure, ₹25 is very small. I will pay it on the link right now.",
              ta: "சரி, ₹25 மிகவும் சிறிய தொகைதானே. நான் லிங்க்கில் உடனே செலுத்துகிறேன்.",
              hi: "ठीक है, ₹25 तो बहुत कम है। मैं अभी लिंक खोलकर भर देता हूँ।"
            },
            type: "bad",
            pressureDelta: 40,
            shieldDelta: -60,
            feedback: {
              en: "TRAP TRIGGERED! The ₹25 page was a phishing clone that harvested your 16-digit card number, CVV, and OTP, stealing ₹28,000 from your account!",
              ta: "பொறியில் சிக்கினீர்கள்! அந்த ₹25 பக்கம் உங்கள் ஏடிஎம் கார்டு எண், CVV மற்றும் OTP-ஐ திருடி ₹28,000 எடுத்துவிட்டது!",
              hi: "जाल में फंस गए! वह ₹25 का पेज फर्जी था जिसने आपका कार्ड नंबर और ओटीपी चुराकर खाते से ₹28,000 निकाल लिए!"
            },
            nextStep: "step_bad_end"
          },
          {
            text: {
              en: "What is my tracking number and what item is inside? Real couriers don't charge ₹25 on suspicious '.top' domains.",
              ta: "என் பார்சல் டிராக்கிங் எண் என்ன? உள்ளே என்ன பொருள் உள்ளது? தபால் துறை '.top' தளத்தில் பணம் கேட்காது.",
              hi: "मेरा ट्रैकिंग नंबर क्या है और पार्सल में क्या सामान है? असली कूरियर कभी '.top' वेबसाइट पर ₹25 नहीं मांगते।"
            },
            type: "good",
            pressureDelta: -30,
            shieldDelta: 10,
            tacticExposed: "Micro-Fee Phishing Link",
            feedback: {
              en: "BRILLIANT CATCH! Scammers use tiny ₹25 fees to lower skepticism, but harvest complete credit card credentials.",
              ta: "அற்புதமான கவனிப்பு! சிறிய ₹25 கட்டணம் மூலம் சந்தேகம் வராமல் கார்டு விவரங்களை முழுமையாக திருடுகிறார்கள்.",
              hi: "गजब की समझ! ₹25 का मामूली झांसा देकर ठग पूरा क्रेडिट कार्ड डेटा उड़ा लेते हैं।"
            },
            nextStep: "step_win"
          }
        ]
      },
      {
        id: "step_win",
        scammerText: {
          en: "[CHAT ENDED] Scammer realized you identified the lookalike domain and fled the chat.",
          ta: "[உரையாடல் முடிந்தது] போலி தளத்தை நீங்கள் கண்டறிந்துவிட்டதை உணர்ந்து மோசடி நபர் ஓடிவிட்டார்.",
          hi: "[चैट बंद] फर्जी वेबसाइट पकड़ में आते ही ठग ने चैट बंद कर दी।"
        },
        isTerminal: true,
        outcome: "WIN"
      },
      {
        id: "step_bad_end",
        scammerText: {
          en: "[CARD COMPROMISED] You entered card details on the fake site. An unauthorized international transaction of ₹28,000 was executed.",
          ta: "[கார்டு திருடப்பட்டது] போலி தளத்தில் விவரங்களை உள்ளிட்டதால் ₹28,000 திருடப்பட்டுவிட்டது.",
          hi: "[कार्ड हैक हुआ] फर्जी पेज पर कार्ड विवरण डालते ही ₹28,000 की अनधिकृत खरीद हो गई।"
        },
        isTerminal: true,
        outcome: "LOSE"
      }
    ]
  }
];
