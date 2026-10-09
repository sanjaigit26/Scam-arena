// 10 Polished Realistic Cybersecurity Scenarios for Scam Arena

window.SCENARIOS = [
  {
    id: "mission_01",
    number: "MISSION 01",
    title: "THE FAKE BANK ALERT",
    subtitle: "Urgent Unauthorized Withdrawal Notice",
    threatLevel: "EASY",
    category: "SMS Phishing (Smishing)",
    interfaceType: "sms",
    timerSeconds: 25,
    objective: "Determine whether this communication is safe before taking action.",
    senderDisplay: "CHASE-ALERT",
    senderFull: "+1 (833) 942-0182",
    interfaceData: {
      phoneCarrier: "Verizon 5G",
      contactName: "CHASE-ALERT (+1 833-942-0182)",
      time: "10:42 AM",
      avatarBg: "#0B2341",
      avatarText: "CB",
      messageBody: "[CHASE FRAUD ALERT] Did you authorize a wire of $1,850.00 to CryptoPay LLC? If NOT, your account is at risk. Verify your identity immediately to cancel this transaction: https://chase-security-verify.net/auth?id=92841. Failure to respond within 15 mins will finalize the transfer.",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "SENDER INSPECTION",
        detail: "Originating Number: +1 (833) 942-0182 (VoIP / Bandwidth.com). Not an official Chase shortcode (Chase typically uses 5-digit shortcodes like 24273).",
        signal: "HIGH SPOOF RISK: Legitimate institutions send fraud alerts via verified shortcodes, not random virtual VoIP toll-free numbers."
      },
      link: {
        title: "LINK INSPECTION",
        detail: "Target: https://chase-security-verify.net/auth?id=92841\nRegistered: 3 days ago via NameCheap, hosted in St. Petersburg.\nActual Chase Domain: chase.com",
        signal: "TYPOSQUATTING / LOOKALIKE DOMAIN DETECTED: 'chase-security-verify.net' is NOT owned by JPMorgan Chase."
      },
      language: {
        title: "LANGUAGE ANALYSIS",
        detail: "Key patterns: 'Failure to respond within 15 mins', 'at risk', 'wire of $1,850.00'.",
        signal: "ARTIFICIAL PANIC & TIME COMPRESSION: Coercive urgency designed to bypass critical thinking."
      },
      details: {
        title: "METADATA & AUTHENTICATION",
        detail: "Message lacks personalization (no 'Hello Alex', no masked account number 'Ending in 4082').",
        signal: "BLIND BLAST TEMPLATE: Sent indiscriminately to harvested phone batches."
      },
      redFlags: [
        "Unregistered VoIP sender instead of banking shortcode",
        "Lookalike domain: chase-security-verify.net vs chase.com",
        "Extreme urgency trigger: 15-minute countdown",
        "No account number personalization or customer name"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 94,
    classification: "HIGH-RISK SCAM",
    attackType: "Banking Smishing (Credential Harvester)",
    confidence: 98,
    riskFactors: [
      "Artificial Urgency Pressure",
      "Lookalike Domain / Typosquatting",
      "VoIP Number Impersonating Bank",
      "Credential Harvesting Link"
    ],
    why: "Legitimate financial institutions NEVER send links demanding password or OTP verification via third-party lookalike domains. Real Chase fraud alerts request a simple 'YES' or 'NO' reply via their official 5-digit shortcode and never threaten automated forfeiture within 15 minutes.",
    recommendedAction: "DO NOT CLICK. Do not reply. Block sender and forward message to 7726 (SPAM). Check your official bank app directly.",
    consequence: {
      title: "YOU CLICKED THE VERIFICATION LINK",
      simulation: [
        "A pixel-perfect clone of the Chase mobile login loaded.",
        "You entered your username, password, and SMS 2FA code.",
        "An automated reverse proxy script relayed credentials to the scammer's panel.",
        "$1,850 wire released to untraceable offshore crypto wallet."
      ],
      impacts: ["Full Account Takeover", "Instant Financial Drain", "Identity Theft Risk"]
    }
  },

  {
    id: "mission_02",
    number: "MISSION 02",
    title: "THE MISSING PACKAGE FEE",
    subtitle: "USPS / DHL Redelivery Notification",
    threatLevel: "EASY",
    category: "Delivery Phishing (Smishing)",
    interfaceType: "sms",
    timerSeconds: null,
    objective: "Verify package notice authenticity before updating delivery details.",
    senderDisplay: "USPS-TrackNotice",
    senderFull: "notice-delivery@info-parcel-update.com",
    interfaceData: {
      phoneCarrier: "AT&T LTE",
      contactName: "USPS-TrackNotice",
      time: "2:15 PM",
      avatarBg: "#004B87",
      avatarText: "US",
      messageBody: "USPS: Your package #US94029148 cannot be delivered due to an incomplete street address. Please update your address and pay the $1.85 redelivery customs fee within 24 hours: https://usps-redelivery-portal.top/track. Otherwise item will be returned to sender.",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "SENDER INSPECTION",
        detail: "Sender: notice-delivery@info-parcel-update.com. Notice sent via email-to-SMS gateway from a generic registrar.",
        signal: "UNVERIFIED GATEWAY: Official USPS SMS updates originate from 28777 (2USPS) with verified sender IDs."
      },
      link: {
        title: "LINK INSPECTION",
        detail: "URL: https://usps-redelivery-portal.top/track\nTop-Level Domain: .top\nOfficial USPS Domain: usps.com",
        signal: "SUSPICIOUS TLD: Cheap .top domain registered 48 hours ago in Iceland with hidden WHOIS privacy."
      },
      language: {
        title: "LANGUAGE ANALYSIS",
        detail: "Small trivial fee ($1.85) to lower psychological resistance, coupled with 'return to sender' ultimatum.",
        signal: "MICRO-TRANSACTION BAIT: Asking for $1.85 tricks users into inputting full credit card details + CVV."
      },
      details: {
        title: "METADATA & DETAILS",
        detail: "Tracking code #US94029148 does not follow USPS standard 22-digit domestic tracking format.",
        signal: "INVALID TRACKING SYNTAX: Fabricated tracking identifier."
      },
      redFlags: [
        "Non-standard .top domain extension",
        "Credit card input requested for trivial $1.85 fee",
        "Generic sender email-to-SMS spoofing",
        "Fake tracking number format"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 91,
    classification: "HIGH-RISK SCAM",
    attackType: "Smishing Postal Card-Harvester",
    confidence: 96,
    riskFactors: [
      "Credit Card Harvesting Mechanism",
      "Suspicious High-Risk TLD (.top)",
      "Fake Package Delivery Bait",
      "Email-to-SMS Gateway Spoof"
    ],
    why: "The 'micro-fee' delivery scam is one of the highest-volume frauds globally. Scammers ask for $1-3 so victims don't hesitate, but the input form harvests cardholder name, billing address, 16-digit card number, CVV, and OTP for fraudulent purchases.",
    recommendedAction: "DO NOT CLICK. Delete SMS. Check legitimate tracking numbers directly at usps.com or the carrier's official mobile application.",
    consequence: {
      title: "YOU ENTERED YOUR PAYMENT CARD DETAILS",
      simulation: [
        "The web page demanded your credit card number, expiration, and CVV to pay '$1.85'.",
        "Immediately, your card was charged $1,249.99 at an electronics storefront in London.",
        "Your billing address and full name were published onto a dark web dump."
      ],
      impacts: ["Credit Card Fraud", "Recurring Unauthorized Subscriptions", "Card Cancellation Hassle"]
    }
  },

  {
    id: "mission_03",
    number: "MISSION 03",
    title: "THE REMOTE DREAM JOB",
    subtitle: "High-Pay Data Entry & Equipment Cheque",
    threatLevel: "MEDIUM",
    category: "Employment & Advance-Fee Fraud",
    interfaceType: "job",
    timerSeconds: null,
    objective: "Evaluate this lucrative employment offer before sharing details.",
    senderDisplay: "Sarah Jenkins (Apex Global Talent)",
    senderFull: "sarah.hr@apexglobaltalent-careers.com",
    interfaceData: {
      platform: "LinkedIn / TalentMatch Direct Message",
      senderRole: "Senior Executive Talent Recruiter",
      badge: "Verified Recruiter",
      time: "Yesterday, 4:30 PM",
      subject: "Immediate Offer: Remote Operations Specialist ($85.00/hr)",
      messageBody: "Dear Candidate,\n\nWe reviewed your resume and are thrilled to offer you the position of Remote Operations Analyst at Apex Global Solutions. This position is 100% remote with a flexible schedule, offering $85.00/hr plus full benefits.\n\nNo formal interview is required as your background matches our criteria. We will courier a cashier's check of $4,500 for you to purchase specialized Apple home office workstations from our approved IT vendor.\n\nPlease complete the attached Employee Onboarding Form with your SSN, banking direct-deposit info, and driver's license scan to receive your check.",
      hasAttachment: true,
      attachmentName: "Apex_Employee_Onboarding_W4.pdf.exe"
    },
    clues: {
      sender: {
        title: "SENDER INSPECTION",
        detail: "Domain: apexglobaltalent-careers.com registered 6 days ago via NameCheap. Real Apex Global company domain is apexglobal.com.",
        signal: "FRESH DOMAIN SPOOF: Newly minted domain imitating a legitimate staffing agency."
      },
      link: {
        title: "ATTACHMENT / FILE INSPECTION",
        detail: "File name: Apex_Employee_Onboarding_W4.pdf.exe. Double extension hiding Windows executable payload.",
        signal: "MALWARE EXECUTION RISK: A .pdf.exe file is a Trojan / Info-stealer masquerading as an onboarding document."
      },
      language: {
        title: "LANGUAGE ANALYSIS",
        detail: "'No interview required', '$85.00/hr data entry', 'Cashier's check of $4,500 to buy from approved vendor'.",
        signal: "CLASSIC OVERPAYMENT / FAKE CHECK PATTERN: Unrealistic compensation and advance check purchase scheme."
      },
      details: {
        title: "PROCESS ANOMALY",
        detail: "Real corporate hiring requires multi-stage interviews, video screening, background verification, and verified payroll portals.",
        signal: "SOCIAL ENGINEERING: Skips standard verification to push immediate victim compliance."
      },
      redFlags: [
        "Hidden .pdf.exe executable attachment",
        "Offer without interview at $85/hr",
        "Fake cashier's check equipment purchase scheme",
        "SSN & Direct Deposit requested via unencrypted email"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 98,
    classification: "HIGH-RISK SCAM",
    attackType: "Fake Check & Malware Trojan Combo",
    confidence: 99,
    riskFactors: [
      "Disguised Executable (.exe) Attachment",
      "Overpayment / Cashier Check Scheme",
      "Identity Theft (SSN & Bank Harvest)",
      "Unrealistic Remote Salary Rate"
    ],
    why: "This combines two devastating vectors: 1) The attached file is an `.exe` Trojan that steals browser passwords; 2) The $4,500 check is counterfeit. If deposited, the bank temporarily fronts the money, the victim wires real cash to the 'vendor', and weeks later the bank reverses the $4,500 deposit, leaving the victim in debt.",
    recommendedAction: "DO NOT OPEN ATTACHMENT. Block sender. Report profile to LinkedIn/recruiting platform and FTC Fraud division.",
    consequence: {
      title: "YOU DOWNLOADED AND OPENED THE ONBOARDING FORM",
      simulation: [
        "Windows Defender triggered a high-severity alert for Trojan:Win32/RedLineStealer.",
        "Chrome session cookies, crypto wallet seeds, and saved passwords were exfiltrated.",
        "If you deposited their $4,500 check, the bank bounced it 7 days later, holding you liable for the balance."
      ],
      impacts: ["Full PC Ransomware/Stealer Infection", "Stolen SSN & Bank Credentials", "Financial Liability for Bad Check"]
    }
  },

  {
    id: "mission_04",
    number: "MISSION 04",
    title: "THE STREAMING SUSPENSION",
    subtitle: "Netflix Account On-Hold Email",
    threatLevel: "MEDIUM",
    category: "Email Phishing (Brand Impersonation)",
    interfaceType: "email",
    timerSeconds: null,
    objective: "Inspect email headers and links to verify authenticity.",
    senderDisplay: "Netflix Billing Support",
    senderFull: "support@billing-update-netflix-service.com",
    interfaceData: {
      emailClient: "SecureMail Client v4",
      from: "Netflix Support <support@billing-update-netflix-service.com>",
      replyTo: "helpdesk992@gmail.com",
      to: "alex.cyberdefender@gmail.com",
      subject: "Account Suspended: Update your payment information within 24 hours",
      time: "Today, 8:12 AM",
      spf: "SOFTFAIL (Domain does not designate IP)",
      dkim: "FAIL (Signature invalid)",
      dmarc: "FAIL",
      messageBody: "We were unable to process your monthly subscription renewal for $15.99. Your membership is temporarily on hold.\n\nTo restore your uninterrupted streaming access, please update your billing details immediately.\n\n[ UPDATE BILLING DETAILS NOW ]\n\nIf you do not update your details within 24 hours, your profile and viewing history will be permanently deleted.",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "SENDER HEADER INSPECTION",
        detail: "Display: 'Netflix Support'\nActual Domain: billing-update-netflix-service.com\nReply-To: helpdesk992@gmail.com (Personal Gmail account!)",
        signal: "SENDER MISMATCH: Legitimate Netflix communications originate exclusively from @netflix.com."
      },
      link: {
        title: "LINK DESTINATION INSPECTION",
        detail: "CTA Button points to: http://bit.ly/3x8K9mQ -> redirects to https://netflix-login-renew.cc/billing",
        signal: "URL SHORTENER OBSCURATION: Scammers use Bitly to hide destination on a suspicious .cc domain with no HTTPS TLS certificate."
      },
      language: {
        title: "PSYCHOLOGICAL TRIGGER",
        detail: "Threatening permanent deletion of viewing history and profiles within 24 hours.",
        signal: "COERCIVE LOSS AVERSION: Artificial crisis created to trigger impulse reactions."
      },
      details: {
        title: "EMAIL SECURITY HEADERS",
        detail: "SPF: SOFTFAIL | DKIM: FAIL | DMARC: FAIL. Domain failed all standard email cryptographic authentication checks.",
        signal: "FAILED AUTHENTICATION: Guaranteed email spoofing attempt."
      },
      redFlags: [
        "Reply-To set to free personal gmail.com address",
        "Failed SPF, DKIM, and DMARC cryptographic headers",
        "Shortened link pointing to unverified .cc domain",
        "Threat of profile deletion within 24 hours"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 95,
    classification: "HIGH-RISK SCAM",
    attackType: "Subscription Phishing & Credential Harvest",
    confidence: 99,
    riskFactors: [
      "Failed DMARC / DKIM / SPF Verification",
      "Shortened Link Masking Malicious Domain",
      "Reply-To Mismatch to Free Webmail",
      "Brand Impersonation (Netflix)"
    ],
    why: "Legitimate subscription services never use URL shorteners, never have mismatched Reply-To Gmail addresses, and always pass strict DMARC authentication. Real streaming platforms notify you directly in their mobile app without threatening deletion within 24 hours.",
    recommendedAction: "DO NOT CLICK. Mark email as Phishing in your email provider. Never update card info from an email link.",
    consequence: {
      title: "YOU SUBMITTED YOUR PAYMENT INFO ON THE CLONED PAGE",
      simulation: [
        "You were redirected to a replica of the Netflix payment form.",
        "Your credit card details and Netflix credentials were saved to a Russian command server.",
        "Attackers immediately changed your Netflix email, locking you out and selling the account."
      ],
      impacts: ["Account Hijacking", "Recurring Fraudulent Card Charges", "Credential stuffing across other apps"]
    }
  },

  {
    id: "mission_05",
    number: "MISSION 05",
    title: "THE REVERSE PAYMENT REFUND",
    subtitle: "UPI / Zelle QR Code Refund Scam",
    threatLevel: "MEDIUM",
    category: "Payment App Social Engineering",
    interfaceType: "payment",
    timerSeconds: 30,
    objective: "Analyze this payment request to determine if it will deposit or drain funds.",
    senderDisplay: "Marketplace Buyer (David Miller)",
    senderFull: "david.buyer91@chat.marketplace.com",
    interfaceData: {
      appName: "PayFast Instant UPI / P2P",
      contactName: "David M. (Buyer for your Used Laptop)",
      time: "Just now",
      dialogTitle: "INCOMING TRANSACTION APPROVAL",
      amount: "$450.00",
      direction: "PAY REQUEST",
      instruction: "David has sent you a QR approval link: 'Hey, to receive the $450 payment for the MacBook, scan this QR code or click Approve, then enter your 6-digit UPI PIN to credit your bank account.'",
      buttonText: "APPROVE & ENTER PIN ($450.00)",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "PAYMENT DIRECTION CHECK",
        detail: "The interface displays 'PAY REQUEST', meaning an outgoing debit request has been triggered against your account.",
        signal: "INVERTED TRANSACTION: You are being prompted to PAY $450, NOT receive $450."
      },
      link: {
        title: "PIN PROTOCOL VERIFICATION",
        detail: "The buyer claims: 'Enter your 6-digit PIN to receive money into your bank.'",
        signal: "CRITICAL RED FLAG: You NEVER need to enter an authorized PIN, OTP, or passcode to RECEIVE money on any payment system!"
      },
      language: {
        title: "CONFUSION TACTIC",
        detail: "Conflating 'Approve Transaction' with 'Accept Deposit'.",
        signal: "SEMANTIC INVERSION: Exploiting user misunderstanding of P2P collect requests."
      },
      details: {
        title: "SYSTEM AUDIT",
        detail: "App status indicator: 'Outgoing Debit Pending Authorization: $450.00'.",
        signal: "ACTIVE DEBIT ATTEMPT: Approving will instantly transfer $450 to David M."
      },
      redFlags: [
        "Buyer asking seller to enter PIN to 'receive' money",
        "Outgoing payment request disguised as a deposit credit",
        "Urgent push to authorize without reviewing transaction direction",
        "Classic marketplace marketplace reverse-payment trap"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 96,
    classification: "HIGH-RISK SCAM",
    attackType: "Reverse Payment / Collect Request Fraud",
    confidence: 99,
    riskFactors: [
      "Fraudulent Collect / Debit Request",
      "PIN / Passcode Coercion for Receiving Funds",
      "Marketplace Social Engineering",
      "Immediate Non-Reversible Funds Transfer"
    ],
    why: "The golden rule of digital payment apps (UPI, Zelle, Venmo, CashApp): Entering your PIN or biometric authorization ALWAYS debits money from your account. You NEVER need to enter a PIN to receive money.",
    recommendedAction: "DECLINE REQUEST IMMEDIATELY. Block buyer on marketplace. Report user for fraudulent collect request.",
    consequence: {
      title: "YOU ENTERED YOUR PIN AND CLICKED APPROVE",
      simulation: [
        "Your payment app executed an instant outgoing wire transfer.",
        "$450.00 was immediately debited from your checking account.",
        "The buyer instantly blocked your number and deactivated their marketplace profile.",
        "Because you authorized the transaction with your PIN, the bank considers it an authorized transfer and refuses reimbursement."
      ],
      impacts: ["Immediate $450 Loss", "Unrecoverable P2P Transfer", "Buyer Ghosting"]
    }
  },

  {
    id: "mission_06",
    number: "MISSION 06",
    title: "THE FAKE SYSTEM LOCK",
    subtitle: "Critical Microsoft Security Alert & Audio Alarm",
    threatLevel: "MEDIUM",
    category: "Tech Support Scareware",
    interfaceType: "browser",
    timerSeconds: 20,
    objective: "Decide whether this browser alert is genuine Windows security.",
    senderDisplay: "Windows Defender Security Center",
    senderFull: "alert-support-live-system-error-0x80244018.online",
    interfaceData: {
      browserUrl: "https://alert-support-live-system-error-0x80244018.online/lockscreen",
      warningHeader: "CRITICAL ALERT: Windows Defender Offline Scan Error #0x80244018",
      subHeader: "Your PC has been infected with Trojan.Spyware.Banker. Your files and credit cards are being transmitted.",
      tollFree: "+1 (888) 492-9102 (Toll-Free Official Microsoft Certified Helpline)",
      alertBox: "DO NOT RESTART YOUR COMPUTER OR CLOSE THIS WINDOW. CALL MICROSOFT SUPPORT WITHIN 5 MINUTES TO PREVENT COMPLETE DRIVE ENCRYPTION.",
      fakeIp: "Your Detected IP: 192.168.1.1 (ISP: HighRisk)",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "ORIGIN & ENVIRONMENT",
        detail: "Displayed inside a web browser tab (Chrome/Edge) with JavaScript fullscreen lock and audio loop.",
        signal: "WEB PAGE BROWSER SCAREWARE: Real Windows Defender runs as a native OS service, never inside an external webpage."
      },
      link: {
        title: "URL INSPECTION",
        detail: "Domain: alert-support-live-system-error-0x80244018.online.\nNot a microsoft.com domain.",
        signal: "FAKE HOSTNAME: High-entropy disposable domain registered on free DNS."
      },
      language: {
        title: "SCARE TACTICS",
        detail: "Excessive capitalization, fake error code 0x80244018, siren sounds, threat of immediate drive wipe.",
        signal: "PSYCHOLOGICAL HIJACKING: Panics the victim into dialling the call-center scammer immediately."
      },
      details: {
        title: "HELPLINE VERIFICATION",
        detail: "Number: +1 (888) 492-9102. Microsoft NEVER displays phone numbers on security dialogs or asks you to call them.",
        signal: "CALL-CENTER SCAM VECTOR: Calling connects to an offshore boiler room demanding remote access software (AnyDesk/TeamViewer)."
      },
      redFlags: [
        "Operating system warning displayed inside a browser tab",
        "Phone number provided to call 'Microsoft Support'",
        "Browser locked via aggressive JavaScript loops",
        "Threatening immediate drive wipe unless called in 5 mins"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 97,
    classification: "HIGH-RISK SCAM",
    attackType: "Tech Support Scareware / Remote Access Trap",
    confidence: 99,
    riskFactors: [
      "In-Browser System Warning Spoof",
      "Bogus Toll-Free Tech Support Number",
      "JavaScript Fullscreen Trap",
      "High-Pressure Panic & Intimidation"
    ],
    why: "Microsoft and Apple NEVER include telephone numbers in virus warnings. Legitimate OS security alerts do not freeze your browser or play siren audio. Scammers use this to get you to call so they can install remote access tools and drain your savings.",
    recommendedAction: "FORCE CLOSE BROWSER (Alt+F4 or Task Manager). Do NOT call the number. Clear browser cache.",
    consequence: {
      title: "YOU CALLED THE NUMBER AND ALLOWED REMOTE ACCESS",
      simulation: [
        "A fake 'technician' answered and had you install AnyDesk / TeamViewer.",
        "They blanked your screen claiming to 'purge trojans'.",
        "While your screen was black, they accessed your online banking, transferred $3,200, and demanded $500 in Target gift cards for 'antivirus warranty'."
      ],
      impacts: ["Remote PC Compromise", "Bank Account Drained", "Gift Card Extortion"]
    }
  },

  {
    id: "mission_07",
    number: "MISSION 07",
    title: "THE FAMILY EMERGENCY",
    subtitle: "WhatsApp 'Hi Mum/Dad, New Phone' Impersonation",
    threatLevel: "HARD",
    category: "Social Engineering & Kinship Fraud",
    interfaceType: "chat",
    timerSeconds: null,
    objective: "Verify the sender's identity through secondary channels before transferring money.",
    senderDisplay: "+1 (415) 792-8819",
    senderFull: "Unknown Number (WhatsApp)",
    interfaceData: {
      chatApp: "WhatsApp Messenger",
      contactName: "+1 (415) 792-8819",
      contactStatus: "online",
      time: "9:18 PM",
      avatarBg: "#25D366",
      avatarText: "?",
      messages: [
        { sender: "them", time: "9:18 PM", text: "Hey Mum, it's me! I dropped my old phone in the sink and the screen died completely. This is my temporary number." },
        { sender: "them", time: "9:19 PM", text: "Can you save this contact quickly?" },
        { sender: "them", time: "9:21 PM", text: "Mum, I'm super stressed. I need to pay an urgent apartment deposit bill by 10 PM tonight and my mobile banking is locked on this new device. Could you please wire $850 to my landlord's account right now? I will pay you back first thing tomorrow morning!" },
        { sender: "them", time: "9:22 PM", text: "Account: 883920194, Routing: 021000021, Name: GreenStone Rentals LLC" }
      ],
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "SENDER VERIFICATION",
        detail: "Originates from an unverified mobile number with no shared profile history or security codes.",
        signal: "UNVERIFIED IDENTITY: No cryptographic proof of family relationship."
      },
      link: {
        title: "OUT-OF-BAND PROTOCOL",
        detail: "You have not called your child's original phone number or verified via a voice call / family secret password.",
        signal: "LACK OF OUT-OF-BAND VERIFICATION: Relies entirely on text-based emotion."
      },
      language: {
        title: "EMOTIONAL LEVERAGE",
        detail: "'Super stressed', 'urgent apartment deposit by 10 PM', 'dropped phone in sink'.",
        signal: "FAMILY PANIC HOOK: Leverages parental instinct to protect their child without stopping to question."
      },
      details: {
        title: "DESTINATION ACCOUNT",
        detail: "Payee: GreenStone Rentals LLC at an online fintech bank. Untraceable mule account.",
        signal: "THIRD-PARTY WIRE REQUEST: Requests direct bank wire to an unknown entity."
      },
      redFlags: [
        "Unsolicited WhatsApp message claiming lost/broken phone",
        "Refusal or inability to take a live voice/video call",
        "Immediate emergency financial transfer request",
        "Wire destination is a third-party corporate mule account"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 93,
    classification: "HIGH-RISK SCAM",
    attackType: "Kinship Impersonation / 'Hi Mum' Scam",
    confidence: 97,
    riskFactors: [
      "Family Impersonation Social Engineering",
      "Urgent Emergency Financial Wire Demand",
      "Unverified New Phone Number",
      "Third-Party Bank Account Destination"
    ],
    why: "The 'Hi Mum / Hi Dad' scam exploits parental empathy. Fraudsters buy bulk leaks and message millions. Always verify independently by calling the family member's KNOWN original phone number or asking a private question only they would know.",
    recommendedAction: "DO NOT SEND MONEY. Call your child's real phone number directly or video call them. If they don't answer, contact another relative first.",
    consequence: {
      title: "YOU SENT THE $850 WIRE TRANSFER",
      simulation: [
        "The $850 wire left your bank and was immediately withdrawn at an ATM by a money mule.",
        "An hour later, your real child called you from their normal phone, completely oblivious.",
        "The scammers followed up asking for another $1,200 for 'medical fees'."
      ],
      impacts: ["Irreversible Wire Loss", "Emotional Manipulation Distress", "Follow-up Extortion Targets"]
    }
  },

  {
    id: "mission_08",
    number: "MISSION 08",
    title: "THE LEGITIMATE SECURITY ALERT",
    subtitle: "Official GitHub Two-Factor Login Verification",
    threatLevel: "HARD",
    category: "Legitimate Security Notice (Safe Test)",
    interfaceType: "email",
    timerSeconds: null,
    objective: "Determine whether this security notice is genuine or a false alarm.",
    senderDisplay: "GitHub Security",
    senderFull: "noreply@github.com",
    interfaceData: {
      emailClient: "DevInbox Enterprise",
      from: "GitHub <noreply@github.com>",
      replyTo: "noreply@github.com",
      to: "developer.alex@cyberguard.dev",
      subject: "[GitHub] A new personal access token was generated",
      time: "Today, 11:04 AM",
      spf: "PASS (github.com designates 192.30.252.206 as permitted sender)",
      dkim: "PASS (Signature verified with key pf2014._domainkey.github.com)",
      dmarc: "PASS (p=reject)",
      messageBody: "Hey @alex-dev,\n\nWe noticed a new personal access token (classic) was recently generated for your account:\n\nToken Name: 'deploy-key-prod'\nScopes: repo, workflow\nIP Address: 198.51.100.42 (Austin, TX, US)\nDate: October 8, 2026, 11:04 AM UTC\n\nIf you generated this token, you can safely ignore this email.\n\nIf you did NOT generate this token, please revoke it immediately and review your audit log by visiting your account settings at https://github.com/settings/tokens.\n\nGitHub Security Team",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "SENDER & HEADERS",
        detail: "From: noreply@github.com\nSPF: PASS | DKIM: PASS | DMARC: PASS (Strict reject policy).",
        signal: "AUTHENTIC SENDER: Cryptographically signed by GitHub's official mail servers."
      },
      link: {
        title: "LINK INTEGRITY",
        detail: "Link: https://github.com/settings/tokens. Direct link to official GitHub root domain with HTTPS TLS 1.3.",
        signal: "OFFICIAL DOMAIN: No redirect, no typosquatting, no URL shortener."
      },
      language: {
        title: "COMMUNICATION TONE",
        detail: "Calm, objective advisory tone. 'If you generated this token, you can safely ignore this email.' No panic, no 15-minute countdown.",
        signal: "STANDARD SECURITY AUDIT TONE: Legitimate services do not use hysterical threats."
      },
      details: {
        title: "PERSONALIZATION & DATA",
        detail: "Accurately references the user's specific username (@alex-dev), exact token name, and IP address.",
        signal: "ACCURATE CONTEXTUAL DATA: Real notification containing legitimate account state."
      },
      redFlags: [
        "None detected. Cryptographic email signatures valid.",
        "Direct link to official github.com domain.",
        "Personalized to exact handle with calm security guidance."
      ]
    },
    correctDecision: "SAFE",
    safeDecision: "SAFE",
    riskScore: 8,
    classification: "LOW RISK",
    attackType: "Legitimate Security Advisory (Safe Interaction)",
    confidence: 99,
    riskFactors: [
      "Cryptographically Verified (SPF/DKIM/DMARC PASS)",
      "Official Domain Destination (github.com)",
      "Contextual Personalization",
      "No Coercive Urgency or Threat Language"
    ],
    why: "This is a REAL, legitimate security alert from GitHub. It passes strict SPF, DKIM, and DMARC verification, links exclusively to official github.com, contains no deceptive urgency, and correctly identifies your user handle. In cybersecurity, avoiding FALSE POSITIVES is just as important as detecting threats!",
    recommendedAction: "SAFE TO TRUST. Review your GitHub token settings if you did not generate this key yourself.",
    consequence: {
      title: "YOU BLOCKED THIS LEGITIMATE SECURITY ALERT",
      simulation: [
        "You marked official GitHub security as spam.",
        "Because you ignored the alert, an unauthorized access token created by a compromised build script remained active.",
        "Your private repository code was cloned by an external auditor."
      ],
      impacts: ["False Positive Disruption", "Missed Real Security Incident", "Breakdown in Security Hygiene"]
    }
  },

  {
    id: "mission_09",
    number: "MISSION 09",
    title: "THE QUANTUM CRYPTO BOT",
    subtitle: "Telegram / Discord AI Arbitrage Investment Scam",
    threatLevel: "HARD",
    category: "Investment Fraud & Pig Butchering",
    interfaceType: "social",
    timerSeconds: null,
    objective: "Investigate this high-yield automated crypto arbitrage proposition.",
    senderDisplay: "Elena Rostova (VIP Wealth Advisor)",
    senderFull: "@elena_quantum_yields (Telegram)",
    interfaceData: {
      platformName: "Telegram Crypto Alpha Channel",
      groupTitle: "Quantum AI Yield Matrix (42,800 Members)",
      time: "1:45 PM",
      avatarBg: "#8B5CF6",
      avatarText: "ER",
      messageBody: "Exclusive Community Opportunity: Our proprietary Quantum AI Arbitrage Bot exploits sub-millisecond price discrepancies across Binance, Bybit, and OKX with a 99.4% win rate.\n\nTier 1 Deposit: 0.25 ETH ($650) → Guaranteed Daily Return: 18.5% ($120/day)\nTier 2 Deposit: 1.00 ETH ($2,600) → Guaranteed Daily Return: 35.0% ($910/day)\n\nSmart Contract Address (Audited by CertiK): 0x71C...84F2\nJoin automated trading dashboard: https://quantum-arbitrage-ai.finance/app\n\nLimited to the first 50 participants today to preserve liquidity pool balance.",
      hasAttachment: false
    },
    clues: {
      sender: {
        title: "CHANNEL & MEMBER AUDIT",
        detail: "42,800 members, but message reactions and chat comments are completely disabled. High proportion of bot accounts.",
        signal: "SYNTHETIC SOCIAL PROOF: Fake member count bought on black market to establish false credibility."
      },
      link: {
        title: "SMART CONTRACT & WEB LINK",
        detail: "CertiK audit claim is fraudulent (no entry in CertiK database). Web domain registered 12 days ago in Seychelles.",
        signal: "FRAUDULENT AUDIT CLAIMS: False certification badges to deceive tech-savvy investors."
      },
      language: {
        title: "FINANCIAL IMPOSSIBILITY",
        detail: "'Guaranteed 18.5% daily return' = 45,000% annualized compound APY. In finance, zero-risk guaranteed daily returns are mathematically impossible.",
        signal: "PONZI / PIG-BUTCHERING SIGNATURE: Ludicrous guaranteed return figures designed to exploit greed."
      },
      details: {
        title: "SMART CONTRACT DECOMPILED",
        detail: "Contract bytecode contains a single `transferFrom` drain function with no arbitrage logic.",
        signal: "WALLET DRAINER: Connecting wallet executes an unlimited spending approval allowing contract owner to sweep all tokens."
      },
      redFlags: [
        "Guaranteed 18.5% daily return with zero risk",
        "Fabricated CertiK security audit seal",
        "Wallet drainer smart contract mechanism",
        "Artificial scarcity ('limited to first 50 participants')"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 97,
    classification: "HIGH-RISK SCAM",
    attackType: "Web3 Wallet Drainer & Ponzi Fraud",
    confidence: 99,
    riskFactors: [
      "Wallet Drainer Smart Contract Payload",
      "Impossible Guaranteed Daily Returns",
      "Fabricated Third-Party Audit Seals",
      "Synthetic Social Proof & Fake Channel Stats"
    ],
    why: "No trading bot in human history can guarantee 18.5% daily returns. The smart contract provided is an 'Approval Drainer'—once you connect MetaMask and sign the transaction, it grants the attacker permission to drain all ETH, USDT, and NFTs from your wallet.",
    recommendedAction: "DO NOT CONNECT WALLET. Block user and report channel to Telegram Trust & Safety. Never sign unknown smart contract approvals.",
    consequence: {
      title: "YOU CONNECTED YOUR WEB3 WALLET AND SIGNED THE PERMISSION",
      simulation: [
        "You clicked 'Connect Wallet' and signed an 'EIP-2612 Permit' transaction.",
        "The drainer smart contract called transferFrom() on your wallet.",
        "All ETH ($1,840) and USDT tokens were swept to Tornado Cash within 12 seconds."
      ],
      impacts: ["Total Web3 Wallet Drain", "Irreversible Blockchain Loss", "Compromised Wallet Address"]
    }
  },

  {
    id: "mission_10",
    number: "MISSION 10 — BOSS LEVEL",
    title: "OPERATION DEEP TRUST",
    subtitle: "Multi-Vector CEO Spear-Phishing & Voice Note Synthesis",
    threatLevel: "BOSS",
    category: "Executive Spear-Phishing & AI Deepfake",
    interfaceType: "boss",
    timerSeconds: 45,
    objective: "THE ULTIMATE SCAM: Investigate all 4 attack vectors (Sender, Audio, Link, Invoice) before the board deadline.",
    senderDisplay: "Marcus Vance (Chief Executive Officer)",
    senderFull: "marcus.vance@apex-corp-executive.com",
    interfaceData: {
      clientType: "Enterprise C-Suite Security Suite",
      executiveName: "Marcus Vance (CEO, Apex Industries)",
      time: "Friday, 5:48 PM (End of Fiscal Quarter)",
      subject: "STRICTLY CONFIDENTIAL: Project Titan Acquisition Wire Approval ($142,500)",
      messageBody: "Alex,\n\nI am currently boarding a flight to London for the Project Titan closing. As discussed with the Board of Directors, we need to finalize the initial escrow payment before European markets close at 6:30 PM today.\n\nLegal counsel has finalized the invoice below. Please execute the expedited wire transfer of $142,500.00 immediately through the corporate portal.\n\nListen to my urgent voice memo attached below confirming authorization.\n\nDo not discuss this with the rest of the finance team yet as this is under an active NDA until our public disclosure on Monday.",
      hasAttachment: true,
      hasAudio: true,
      audioDuration: "0:14",
      audioTranscript: "\"Alex, Marcus here. Board approved the Titan escrow. Please push the wire through the portal right away. I'm taking off now, will land in 7 hours. Count on you.\"",
      attachmentName: "Titan_Escrow_Invoice_Wire_Details_Oct2026.pdf",
      portalLink: "https://portal.apex-corp-executive.com/wire/titan-escrow"
    },
    clues: {
      sender: {
        title: "VECTOR 1: SENDER & LOOKALIKE DOMAIN",
        detail: "From: marcus.vance@apex-corp-executive.com.\nActual Corporate Domain: apexindustries.com.\nNotice the domain addition '-corp-executive' registered yesterday via Cloudflare.",
        signal: "EXECUTIVE SPOOFING: Specially crafted lookalike domain designed for targeted C-suite impersonation (Whaling)."
      },
      link: {
        title: "VECTOR 2: PORTAL LINK VERIFICATION",
        detail: "Link: https://portal.apex-corp-executive.com/wire/titan-escrow\nSSL Certificate: Issued 4 hours ago by Let's Encrypt with free automated domain validation.",
        signal: "REVERSE PROXY REPLICA: Fake corporate wire portal designed to capture finance department MFA tokens."
      },
      language: {
        title: "VECTOR 3: PSYCHOLOGICAL PRESSURE & ISOLATION",
        detail: "'Strictly Confidential', 'Do not discuss with finance team', 'Board of Directors approval', 'Boarding flight (unreachable)', '5:48 PM Friday deadline'.",
        signal: "CLASSIC WHALING ISOLATION TACTIC: Intentionally isolates the target from colleagues so they cannot verify."
      },
      details: {
        title: "VECTOR 4: SYNTHESIZED AI AUDIO ANALYSIS",
        detail: "Voice memo pitch spectrum reveals flat robotic cadence, lack of ambient airport background noise, and robotic acoustic phase artifacts.",
        signal: "GENERATIVE AI VOICE CLONING: Scammer scraped 30 seconds of CEO speech from an investor conference call to clone voice model."
      },
      redFlags: [
        "Executive lookalike domain: apex-corp-executive.com vs apexindustries.com",
        "Isolation tactic: demanding strict confidentiality from the finance team",
        "Synthetic AI voice note with robotic acoustic artifacts",
        "End-of-day Friday urgency before markets close ($142,500 wire)"
      ]
    },
    correctDecision: "SCAM",
    safeDecision: "SCAM",
    riskScore: 99,
    classification: "HIGH-RISK SCAM",
    attackType: "Multi-Vector Whaling & AI Deepfake Fraud",
    confidence: 99,
    riskFactors: [
      "AI Synthesized Audio Deepfake",
      "Executive Whaling Impersonation",
      "Engineered Social Isolation & Secrecy",
      "Fake Corporate Wire Portal"
    ],
    why: "This represents the bleeding edge of modern cybercrime: combining executive domain spoofing, psychological isolation (forbidding consultation with team members), temporal pressure (Friday 5:48 PM), and generative AI voice cloning. Real corporate treasury policies mandate dual-control authorization and in-person or verified out-of-band video confirmation for all wires exceeding $10,000.",
    recommendedAction: "HALT ALL TRANSFERS IMMEDIATELY. Notify Chief Information Security Officer (CISO). Contact the CEO via verified personal emergency contact or waiting until verified in-person.",
    consequence: {
      title: "YOU EXECUTED THE $142,500 EXPEDITED WIRE",
      simulation: [
        "$142,500.00 left company treasury funds into an offshore shell entity in Hong Kong.",
        "The funds were immediately split across 18 cryptocurrency mixers within 6 minutes.",
        "On Monday, CEO Marcus Vance walked into the office with zero knowledge of 'Project Titan'.",
        "The company suffered massive reputational damage and fired responsible personnel."
      ],
      impacts: ["$142,500 Corporate Loss", "Executive Career Termination", "SEC & Regulatory Investigation"]
    }
  }
];
