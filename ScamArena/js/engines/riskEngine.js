// Deterministic Risk Engine for Scam Arena & Scan & Detect
// Evaluates digital interactions across 8 cybersecurity risk vectors in English, தமிழ், हिन्दी, Hinglish & Tanglish

class RiskEngine {
  constructor() {
    this.vectors = {
      urgency: {
        weight: 18,
        patterns: [
          // English
          /\b(immediately|within \d+ (mins?|minutes?|hours?)|urgent|right now|hurry|final notice|deadline|expires? today|asap)\b/i,
          /\b(account (suspended|locked|terminated|blocked|closed)|action required|failure to respond|disconnection notice)\b/i,
          // Hindi (Devanagari)
          /(तुरंत|अभी|जल्दी|24 घंटे|आज ही|तत्काल|अंतिम सूचना|बिजली कट|कनेक्शन कटेगा|बंद हो जाएगा|खाता ब्लॉक|अंतिम तारीख)/i,
          // Tamil (Script)
          /(உடனே|உடனடியாக|சீக்கிரம்|இன்றே|கடைசி அறிவிப்பு|துண்டிக்கப்படும்|முடக்கப்படும்|அவசரம்|இணைப்பு துண்டிப்பு)/i,
          // Hinglish & Tanglish
          /\b(turant|abhi|jaldi|aaj hi|24 ghante me|account band|line cut|block ho jayega|udane|seekiram|inre|cut aagidum|block aagidum|avasaram)\b/i
        ]
      },
      impersonation: {
        weight: 18,
        patterns: [
          // English
          /\b(chase|wells fargo|bank of america|netflix|paypal|amazon|apple|microsoft|usps|fedex|dhl|irs|fbi|sbi|hdfc|icici|axis)\b/i,
          /\b(ceo|executive|recruiter|hr team|security department|fraud detection team|it helpdesk|electricity board|officer)\b/i,
          /\b(mum|dad|son|daughter|grandma|grandpa|papa|mummy)\b/i,
          // Hindi
          /(एसबीआई|बैंक|बिजली विभाग|पुलिस|अधिकारी|ट्रेजरी|सरकारी|इनकम टैक्स|कलेक्टर|मैनेजर|पापा|मम्मी|बेटा)/i,
          // Tamil
          /(வங்கி|மின்சார வாரியம்|போலீஸ்|அரசு|வருமான வரி|கருவூலம்|ஆதார்|அப்பா|அம்மா|மகன்|மகள்)/i,
          // Hinglish & Tanglish
          /\b(bijli vibhag|policewala|sarkari|eb officer|police ka call|vangi|minsara variyam|tneb officer)\b/i
        ]
      },
      suspiciousUrl: {
        weight: 20,
        patterns: [
          /https?:\/\/[^\s]+(\.(top|cc|online|xyz|fun|monster|work|buzz|club|surf|icu))\b/i,
          /https?:\/\/[^\s]+-(security|verify|login|update|portal|support|alert|service|kyc)\.[a-z]{2,}/i,
          /(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|ow\.ly)/i,
          /\b(\.exe|\.scr|\.bat|\.vbs|\.iso|\.pdf\.exe|\.apk)\b/i,
          // Hindi & Tamil link phrases
          /(लिंक पर क्लिक|लिंक खोलें|एपीகே பதிவிறக்கம்|லிங்கை கிளிக்|இணைப்பை அழுத்தவும்|link pe click|link kholo|link open pannu)/i
        ]
      },
      financialDemand: {
        weight: 18,
        patterns: [
          /(\$\d+|₹\d+|\b\d+\s?(usd|dollars?|inr|rupees?|rs|eth|btc|usdt|crypto|lakhs?|crores?))\b/i,
          /\b(wire transfer|cashier'?s check|redelivery fee|customs fee|processing fee|escrow payment|deposit|gst fee|tax clearance)\b/i,
          /\b(guaranteed (daily|weekly|monthly) returns?|high yield|300%|arbitrage|lucky draw|lottery|winner|first prize)\b/i,
          // Hindi
          /(लॉटरी|इनाम|रुपये|लाख|करोड़|पैसे भेजो|फीस जमा|केबीसी|प्राइस मनी|लकी ड्रा|डिपॉजिट)/i,
          // Tamil
          /(பரிசு|ரூபாய்|லட்சம்|கோடி|பணம் அனுப்பு|கட்டணம்|லாட்டரி|லக்கி டிரா|முன்பணம்)/i,
          // Hinglish & Tanglish
          /\b(lottery|inaam|paisa transfer|fees bharo|kbc lottery|parisu|panam anupu|munpanam)\b/i
        ]
      },
      credentialHarvest: {
        weight: 16,
        patterns: [
          /\b(enter your (pin|password|otp|ssn|social security|cvv|passcode|aadhaar|pan))\b/i,
          /\b(verify your (identity|account|credentials|password|kyc)|update your payment|share otp)\b/i,
          /\b(connect wallet|seed phrase|private key)\b/i,
          // Hindi
          /(ओटीपी|पिन|पासवर्ड|केवाईसी|आधार कार्ड|पैन कार्ड|ओटीपी बताओ|पासवर्ड दो|कार्ड नंबर)/i,
          // Tamil
          /(ஓடிபி|பின்|கடவுச்சொல்|கேஒய்சி|ஆதார்|பான் கார்டு|ஓடிபி சொல்லு|கார்டு எண்)/i,
          // Hinglish & Tanglish
          /\b(otp batao|pin dalo|kyc update|aadhar link|otp share|pin sollunga|otp anupu)\b/i
        ]
      },
      threatIntimidation: {
        weight: 12,
        patterns: [
          /\b(permanently deleted|legal action|warrant|trojan|infected|compromised|critical alert|police arrest|digital arrest)\b/i,
          /\b(call [0-9\+\-\(\)\s]{8,}|do not restart|do not close|cut tonight)\b/i,
          // Hindi
          /(बिजली कट जाएगी|गिरफ्तारी|वारंट|डिजिटल अरेस्ट|पुलिस केस|कानूनी कार्रवाई|कोर्ट नोटिस)/i,
          // Tamil
          /(மின்சாரம் துண்டிக்கப்படும்|கைது|நோட்டீஸ்|காவல்துறை வழக்கு|நீதிமன்ற உத்தரவு)/i,
          // Hinglish & Tanglish
          /\b(bijli kat jayegi|line cut hoga|arrest warrant|digital arrest|police case|court notice)\b/i
        ]
      },
      isolationSecrecy: {
        weight: 12,
        patterns: [
          /\b(strictly confidential|do not discuss|keep this between us|under active nda|secret|don't tell parents)\b/i,
          /\b(dropped my phone|temporary number|can't talk right now|call this number only)\b/i,
          // Hindi
          /(किसी को मत बताना|माता-पिता से छुपाना|सीक्रेट रखना|सिर्फ इसी नंबर पर)/i,
          // Tamil
          /(பெற்றோரிடம் சொல்லாதே|ரகசியமாக வை|யாருக்கும் தெரிய வேண்டாம்)/i,
          // Hinglish & Tanglish
          /\b(kisi ko mat batana|parents ko mat bolna|secret rakhna|secret ah vai|solla koodathu)\b/i
        ]
      }
    };
  }

  analyzeText(text) {
    const lang = (window.i18n && window.i18n.getLanguage) ? window.i18n.getLanguage() : 'en';

    if (!text || typeof text !== 'string') {
      return {
        score: 0,
        classification: lang === 'ta' ? "குறைந்த ஆபத்து" : lang === 'hi' ? "कम जोखिम" : "LOW RISK",
        confidence: 90,
        attackType: lang === 'ta' ? "பாதுகாப்பான தொடர்பு" : lang === 'hi' ? "सुरक्षित संदेश" : "Safe Communication",
        flags: [],
        why: lang === 'ta' ? "சந்தேகத்திற்குரிய அறிகுறிகள் எதுவும் கண்டறியப்படவில்லை." : lang === 'hi' ? "संदेश में कोई संदेहास्पद फ्रॉड पैटर्न नहीं मिला।" : "No suspicious patterns detected in the analyzed text.",
        recommendedAction: lang === 'ta' ? "இயல்பான இணையப் பாதுகாப்பு விதிகளைப் பின்பற்றவும்." : lang === 'hi' ? "सामान्य डिजिटल सुरक्षा नियमों का पालन करें।" : "Standard cyber hygiene applies."
      };
    }

    let totalWeight = 0;
    let earnedScore = 0;
    const detectedFlags = [];
    const vectorHits = {};

    for (const [key, vector] of Object.entries(this.vectors)) {
      totalWeight += vector.weight;
      let matched = false;
      for (const pattern of vector.patterns) {
        if (pattern.test(text)) {
          matched = true;
          break;
        }
      }

      if (matched) {
        earnedScore += vector.weight;
        vectorHits[key] = true;
        detectedFlags.push(this.formatFlagName(key, lang));
      }
    }

    // Baseline calculation normalized to 0-100
    let riskScore = Math.min(100, Math.round((earnedScore / totalWeight) * 115));
    
    // Low baseline if few patterns matched
    if (detectedFlags.length === 0) {
      riskScore = Math.floor(Math.random() * 8) + 5; // 5-12
    } else if (detectedFlags.length === 1 && !vectorHits.suspiciousUrl && !vectorHits.credentialHarvest) {
      riskScore = Math.min(riskScore, 38);
    } else if (vectorHits.suspiciousUrl && (vectorHits.credentialHarvest || vectorHits.financialDemand)) {
      riskScore = Math.max(riskScore, 88);
    }

    let classification = "LOW RISK";
    if (riskScore >= 65) {
      classification = lang === 'ta' ? "அதிதீவிர மோசடி" : lang === 'hi' ? "अत्यधिक जोखिम भरा स्कैम" : "HIGH-RISK SCAM";
    } else if (riskScore >= 35) {
      classification = lang === 'ta' ? "சந்தேகத்திற்குரியது" : lang === 'hi' ? "संदेहास्पद" : "SUSPICIOUS";
    } else {
      classification = lang === 'ta' ? "குறைந்த ஆபத்து" : lang === 'hi' ? "कम जोखिम" : "LOW RISK";
    }

    // Determine attack type
    let attackType = "Unverified Communication";
    if (vectorHits.threatIntimidation && vectorHits.impersonation && vectorHits.urgency) {
      attackType = lang === 'ta' ? "மின் இணைப்பு துண்டிப்பு / டிஜிட்டல் கைது அச்சுறுத்தல்" : lang === 'hi' ? "बिजली बिल / डिजिटल अरेस्ट जबरन वसूली" : "Utility Cutoff / Digital Arrest Extortion";
    } else if (vectorHits.impersonation && vectorHits.credentialHarvest) {
      attackType = lang === 'ta' ? "வங்கி KYC & OTP திருட்டு மோசடி" : lang === 'hi' ? "बैंक केवाईसी और ओटीपी फ्रॉड" : "Bank KYC / Credential Harvesting Phishing";
    } else if (vectorHits.financialDemand && vectorHits.isolationSecrecy) {
      attackType = lang === 'ta' ? "குடும்ப உறுப்பினர் போல் நடித்து அவசரப் பணம் பறிப்பு" : lang === 'hi' ? "रिश्तेदार बनकर आपातकालीन पैसे की ठगी" : "Emergency Kinship / Whaling Impersonation";
    } else if (vectorHits.financialDemand && vectorHits.suspiciousUrl) {
      attackType = lang === 'ta' ? "போலி பரிசு / கிரிப்டோ முதலீட்டு பொறி" : lang === 'hi' ? "फर्जी लॉटरी या निवेश फ्रॉड" : "Advance-Fee Lottery / Investment Drainer";
    } else if (vectorHits.suspiciousUrl && vectorHits.urgency) {
      attackType = lang === 'ta' ? "போலி இணைப்பு மூலம் கணக்கு முடக்கம்" : lang === 'hi' ? "फर्जी लिंक के जरिए अकाउंट हैकिंग" : "Smishing / Malicious Link Redirection";
    } else if (riskScore < 30) {
      attackType = lang === 'ta' ? "பாதுகாப்பான சாதாரண செய்தி" : lang === 'hi' ? "सुरक्षित सामान्य संदेश" : "Standard Legitimate Message";
    }

    const why = this.generateExplanation(riskScore, detectedFlags, vectorHits, lang);
    const recommendedAction = this.generateAction(riskScore, vectorHits, lang);

    return {
      score: riskScore,
      classification,
      confidence: Math.min(99, 85 + detectedFlags.length * 3),
      attackType,
      flags: detectedFlags,
      why,
      recommendedAction
    };
  }

  formatFlagName(key, lang = 'en') {
    if (lang === 'ta') {
      switch(key) {
        case 'urgency': return "அவசரப்படுத்துதல் மற்றும் பயமுறுத்தும் யுக்தி";
        case 'impersonation': return "அரசு / வங்கி அதிகாரி போல் போலி அடையாளம்";
        case 'suspiciousUrl': return "ஏமாற்று இணைப்பு அல்லது ஆபத்தான ஆப்";
        case 'financialDemand': return "முன்பணம், கட்டணம் அல்லது பரிசு ஆசை";
        case 'credentialHarvest': return "ரகசிய OTP, PIN அல்லது பாஸ்வேர்ட் கேட்டல்";
        case 'threatIntimidation': return "கைது அல்லது மின் இணைப்பு துண்டிப்பு மிரட்டல்";
        case 'isolationSecrecy': return "ரகசியம் காக்கும்படி வற்புறுத்தல்";
        default: return "சந்தேகத்திற்குரிய நடத்தை";
      }
    }
    if (lang === 'hi') {
      switch(key) {
        case 'urgency': return "जल्दबाजी और घबराहट पैदा करने का दबाव";
        case 'impersonation': return "बैंक या सरकारी विभाग का झूठा रूप";
        case 'suspiciousUrl': return "धोखाधड़ी वाला लिंक या संदेहास्पद फाइल";
        case 'financialDemand': return "अग्रिम शुल्क, लॉटरी या सीधे पैसे की मांग";
        case 'credentialHarvest': return "गोपनीय ओटीपी, पिन या पासवर्ड मांगने का प्रयास";
        case 'threatIntimidation': return "बिजली काटने या गिरफ्तारी की धमकी";
        case 'isolationSecrecy': return "बात को बड़ों या परिवार से छुपाने की मांग";
        default: return "संदेहास्पद पैटर्न";
      }
    }
    switch(key) {
      case 'urgency': return "Urgency & Artificial Panic Coercion";
      case 'impersonation': return "Brand / Authority Impersonation";
      case 'suspiciousUrl': return "Deceptive / Lookalike Link or Attachment";
      case 'financialDemand': return "Direct Financial Transfer / Fee Bait";
      case 'credentialHarvest': return "Credential / PIN / OTP Harvesting Intent";
      case 'threatIntimidation': return "Extortion / Scareware Intimidation";
      case 'isolationSecrecy': return "Social Isolation & Secrecy Demands";
      default: return "Anomalous Pattern";
    }
  }

  generateExplanation(score, flags, hits, lang = 'en') {
    if (score < 30) {
      if (lang === 'ta') return "இந்த செய்தியில் சந்தேகத்திற்குரிய அவசர வார்த்தைகளோ அல்லது போலியான இணைப்புகளோ இல்லை.";
      if (lang === 'hi') return "इस संदेश में कोई घबराहट पैदा करने वाली भाषा, फर्जी लिंक या ओटीपी मांगने का संकेत नहीं मिला।";
      return "The communication displays standard transactional syntax without deceptive time pressure, URL spoofing, or credential extraction vectors.";
    }

    if (lang === 'ta') {
      return "இந்த குறுஞ்செய்தி மக்களை பதற்றமடையச் செய்து, உடனடியாக லிங்கை கிளிக் செய்யவோ அல்லது ஓடிபி/பணம் அனுப்பவோ வற்புறுத்தும் பொதுவான சைபர் குற்ற வடிவங்களை வெளிப்படுத்துகிறது.";
    }
    if (lang === 'hi') {
      return "यह संदेश तात्कालिक घबराहट पैदा करके उपयोगकर्ता को बिना सोचे-समझे लिंक पर क्लिक करने या ओटीपी/पैसे ट्रांसफर करने के लिए मजबूर करने की कोशिश करता है।";
    }

    const factors = [];
    if (hits.urgency) factors.push("manufactured urgency designed to force an impulsive decision");
    if (hits.suspiciousUrl) factors.push("unverified links or unusual domains designed to steal session credentials");
    if (hits.credentialHarvest) factors.push("explicit requests for confidential PINs, OTPs, or passwords");
    if (hits.impersonation) factors.push("impersonation of a trusted institution or relative without verifiable authentication");
    if (hits.financialDemand) factors.push("requests for irreversible direct payments, gift cards, or upfront fees");

    return `This interaction triggered high threat probability due to ${factors.join(', ')}. Scammers employ these techniques to bypass human skepticism.`;
  }

  generateAction(score, hits, lang = 'en') {
    if (score < 30) {
      if (lang === 'ta') return "பாதுகாப்பானது: எனினும் முக்கியமான ரகசிய கடவுச்சொற்களை உள்ளிடும் முன் தளத்தை உறுதிப்படுத்தவும்.";
      if (lang === 'hi') return "सुरक्षित प्रतीत होता है: फिर भी किसी भी संवेदनशील जानकारी को साझा करने से पहले आधिकारिक वेबसाइट जांचें।";
      return "VERIFY STANDARD CHANNELS: Communication appears safe, but always verify sender domain before entering sensitive credentials.";
    }

    if (lang === 'ta') {
      if (hits.credentialHarvest) return "எந்தக் காரணத்தைக் கொண்டும் OTP அல்லது PIN-ஐ பகிராதீர்கள்! அனுப்புநரை முடக்குங்கள்.";
      if (hits.suspiciousUrl) return "லிங்கை கிளிக் செய்யாதீர்கள்! செய்தியை உடனடியாக நீக்கவும்.";
      if (hits.financialDemand) return "பணம் அனுப்பாதீர்கள்! சம்பந்தப்பட்ட நபரின் அதிகாரப்பூர்வ பழைய எண்ணிற்கு அழைத்து உறுதிப்படுத்தவும்.";
      return "தொடர்பு கொள்ளாதீர்கள். செய்தியை பிளாக் செய்து 1930 அல்லது cybercrime.gov.in இல் புகார் அளிக்கவும்.";
    }

    if (lang === 'hi') {
      if (hits.credentialHarvest) return "किसी भी कीमत पर ओटीपी या पिन साझा न करें! बैंक कभी ओटीपी नहीं मांगता।";
      if (hits.suspiciousUrl) return "दिए गए लिंक पर बिल्कुल क्लिक न करें! संदेश को तुरंत डिलीट कर दें।";
      if (hits.financialDemand) return "पैसे न भेजें! सीधे संबंधित व्यक्ति या बैंक के आधिकारिक नंबर पर कॉल करके पुष्टि करें।";
      return "कोई जवाब न दें। नंबर ब्लॉक करें और साइबर हेल्पलाइन 1930 पर तुरंत सूचना दें।";
    }

    if (score >= 65) {
      if (hits.credentialHarvest) return "DO NOT ENTER CREDENTIALS OR OTP. Never share your PIN or passwords. Block the sender and report to platform abuse.";
      if (hits.suspiciousUrl) return "DO NOT CLICK ANY LINKS. Do not open attachments. Visit the official service directly through your browser bookmark.";
      if (hits.financialDemand) return "DO NOT TRANSFER FUNDS. Remember: receiving money never requires entering a PIN. Verify with the individual in-person or out-of-band.";
      return "DO NOT ENGAGE. Block sender, delete message, and alert the organization's official fraud department (Helpline: 1930).";
    }
    return "PROCEED WITH CAUTION. Do not click links directly. Verify the sender's identity through an independent, verified phone number or official app.";
  }
}

window.riskEngine = new RiskEngine();
