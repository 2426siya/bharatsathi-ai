// Predefined High-Quality AI responses for Demo Mode

export const DEMO_CHAT_RESPONSES = {
  "passport": {
    "answer": "Passport application in India is processed online via the Passport Seva portal. Citizens need to register, fill out the application form, pay the processing fee, and book a physical verification slot at the nearest Passport Seva Kendra (PSK).",
    "processingTime": "7-15 working days (Normal Category) or 1-3 working days (Tatkaal Category).",
    "docsRequired": [
      "Proof of Address (Aadhaar, utility bills, or active bank statement)",
      "Proof of Date of Birth (Birth Certificate, 10th marksheet, or PAN)",
      "Non-ECR Proof (Matriculation certificate or degree certificate)"
    ],
    "nextSteps": [
      "Register on passportindia.gov.in and login.",
      "Click 'Apply for Fresh Passport' and fill the digital form.",
      "Pay ₹1,500 fee online and select your appointment slot.",
      "Visit the PSK with original documents for biometric scanning.",
      "Complete police verification in your residential locality."
    ],
    "helpfulTips": [
      "Ensure your name and date of birth match exactly across all submitted documents.",
      "Keep photocopy sets of all original documents ready before visiting the PSK.",
      "Keep your registered mobile phone active for police verification notifications."
    ],
    "suggestedFollowUps": [
      "How can I apply under the Tatkaal scheme?",
      "What should I do if my passport application is put on hold?",
      "Are minor passport requirements different?"
    ]
  },
  "pan card": {
    "answer": "A Permanent Account Number (PAN) card is a ten-digit alphanumeric identifier issued by the Income Tax Department. It is essential for financial transactions, opening bank accounts, and filing tax returns.",
    "processingTime": "5-10 working days for physical card delivery; 2 hours for e-PAN.",
    "docsRequired": [
      "Proof of Identity (Aadhaar Card, Voter ID, or Passport)",
      "Proof of Address (Aadhaar, utility bill, or bank statement)",
      "Proof of Date of Birth (Aadhaar, birth certificate, or driving license)"
    ],
    "nextSteps": [
      "Visit the Protean (NSDL) or UTITSL PAN portal.",
      "Fill out Form 49A for Indian Citizens.",
      "Pay the processing fee of ₹107 online.",
      "Complete Aadhaar-based e-KYC for instant e-PAN generation."
    ],
    "helpfulTips": [
      "Select e-PAN option if you do not immediately need a physical plastic card to save time and money.",
      "Your mobile number must be linked with your Aadhaar for completing digital e-sign/e-KYC."
    ],
    "suggestedFollowUps": [
      "What is the difference between physical PAN and e-PAN?",
      "Can I apply for a PAN card without an Aadhaar card?",
      "How do I update my surname in PAN after marriage?"
    ]
  },
  "aadhaar": {
    "answer": "Aadhaar is a 12-digit unique identity number issued by UIDAI. While new enrollment must be done physically, demographic details like Name, Gender, Date of Birth, and Address can be updated online via the MyAadhaar portal.",
    "processingTime": "5-30 working days (usually updated within a week).",
    "docsRequired": [
      "Proof of Identity (Passport, PAN, Voter ID)",
      "Proof of Address (Utility bill, bank passbook, registered rent agreement)",
      "Date of Birth Proof (Birth Certificate or 10th marksheet)"
    ],
    "nextSteps": [
      "Log into myaadhaar.uidai.gov.in using your Aadhaar number and mobile OTP.",
      "Select 'Document Update' or 'Address Update'.",
      "Upload scanned copies of original documents in PDF/JPEG format.",
      "Pay the service fee of ₹50 online and note down the URN code to track status."
    ],
    "helpfulTips": [
      "Ensure scanned documents are clear and in color to prevent rejection.",
      "Biometric updates (fingerprints, iris, photo) require visiting a physical Aadhaar Seva Kendra."
    ],
    "suggestedFollowUps": [
      "How do I link my mobile number to my Aadhaar card?",
      "What is a Virtual ID (VID) and how is it used?",
      "How can I locate the nearest Aadhaar enrollment center?"
    ]
  },
  "msme registration": {
    "answer": "MSME (Micro, Small, and Medium Enterprises) registration, also called Udyam Registration, is a free portal by the Ministry of MSME. It provides government benefits, subsidy claims, and easier access to bank loans.",
    "processingTime": "1-3 working days; certificate is generated online instantly post verification.",
    "docsRequired": [
      "Aadhaar Card of the Proprietor / Partner",
      "PAN Card of the organization",
      "GSTIN (GST Identification Number) depending on turnover rules",
      "Bank account details of the enterprise"
    ],
    "nextSteps": [
      "Go to the official Udyam Registration portal (udyamregistration.gov.in).",
      "Enter Aadhaar number and validate with OTP.",
      "Fill in enterprise name, location, banking details, and employee count.",
      "Submit and download your Udyam Registration Certificate."
    ],
    "helpfulTips": [
      "MSME registration is completely free. Do not pay any fees to third-party agency sites.",
      "Keep your investment and turnover figures accurate as they are validated with GST and IT databases."
    ],
    "suggestedFollowUps": [
      "What are the benefits of having an Udyam Certificate?",
      "Is GST registration mandatory for MSME registration?",
      "Can a retail shop owner apply for Udyam registration?"
    ]
  },
  "pm kisan": {
    "answer": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme that provides financial assistance of ₹6,000 per year in three equal installments of ₹2,000 to all landholding farmer families.",
    "processingTime": "15-30 working days for verification by state authorities.",
    "docsRequired": [
      "Landholding papers (Khatauni / Mutation copy)",
      "Aadhaar Card of the farmer",
      "Bank Passbook details matching Aadhaar name",
      "Mobile number linked with Aadhaar"
    ],
    "nextSteps": [
      "Go to pmkisan.gov.in and click 'New Farmer Registration'.",
      "Fill out rural or urban registration details.",
      "Enter land survey numbers and upload land registry files.",
      "Complete e-KYC using OTP or biometric verification."
    ],
    "helpfulTips": [
      "Ensure the name on the land record matches the name on the Aadhaar card exactly.",
      "Mandatory e-KYC must be completed to receive subsequent installments."
    ],
    "suggestedFollowUps": [
      "How do I check if my name is on the PM-Kisan beneficiary list?",
      "Why has my PM-Kisan installment been stopped?",
      "Can tenant farmers apply for this scheme?"
    ]
  },
  "ayushman bharat": {
    "answer": "Ayushman Bharat (PM-JAY) provides free cashless health cover of up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization to low-income families identified in the SECC database.",
    "processingTime": "Instant verification at hospitals; card generated in 1-3 days.",
    "docsRequired": [
      "Aadhaar Card or Voter ID",
      "Ration Card (NFSA verification)",
      "Income Certificate (if applying outside automated SECC lists)"
    ],
    "nextSteps": [
      "Visit pmjay.gov.in and click 'Am I Eligible' to check status.",
      "If eligible, go to the nearest Ayushman Mitra desk at an empanelled hospital.",
      "Present Aadhaar and Ration card to generate your Ayushman Golden Card.",
      "Avail cashless treatments directly at any government or empanelled private hospital."
    ],
    "helpfulTips": [
      "You do not need to register separately if your family is already listed under the SECC 2011 lists.",
      "Keep your golden card safely; it must be shown at the time of admission for cashless claims."
    ],
    "suggestedFollowUps": [
      "Which hospitals near me accept the Ayushman card?",
      "Does Ayushman Bharat cover pre-existing diseases?",
      "How can I add a newborn child to my Ayushman card?"
    ]
  },
  "scholarships": {
    "answer": "The National Scholarship Portal (NSP) is a digital gateway offering central, state, and UGC scholarship schemes for students of school, college, and post-graduate levels, including study abroad schemes.",
    "processingTime": "30-90 working days for verification and direct benefit transfer (DBT).",
    "docsRequired": [
      "Student Aadhaar Card & School/College ID",
      "Previous year academic marksheet/transcripts",
      "Family Income Certificate issued by Tahsildar",
      "Fee receipt of the current academic year"
    ],
    "nextSteps": [
      "Visit scholarships.gov.in and click 'New Registration'.",
      "Select state, category, and enter student demographic info.",
      "Choose the eligible scheme and upload school certificates.",
      "Submit and forward the digital form to your school nodal officer for approval."
    ],
    "helpfulTips": [
      "Submit applications early to ensure nodal verification occurs before regional deadlines.",
      "Double-check that your bank account is active and seeded with your Aadhaar number."
    ],
    "suggestedFollowUps": [
      "What is the eligibility for the National Means-cum-Merit Scholarship?",
      "Can I apply for multiple scholarships on the NSP?",
      "How do I track the verification status of my application?"
    ]
  },
  "driving licence": {
    "answer": "A Permanent Driving License (DL) is issued by the Regional Transport Office (RTO). An applicant must have held a Learner's License for at least 30 days and pass a driving slot test.",
    "processingTime": "15-20 working days after passing the practical driving test.",
    "docsRequired": [
      "Active Learner's License number",
      "Proof of Age (Aadhaar, Birth Certificate, or Passport)",
      "Proof of Address (Aadhaar or electricity bill)",
      "Medical Certificate Form 1A (mandatory if age is above 40)"
    ],
    "nextSteps": [
      "Go to Sarathi Parivahan portal (sarathi.parivahan.gov.in) and choose your state.",
      "Click 'Apply for Driving License' and enter Learner's License number.",
      "Select your vehicle class and book a driving slot online.",
      "Visit the RTO track, pass the driving test, and complete biometrics."
    ],
    "helpfulTips": [
      "Practice driving extensively before booking a slot; failing the test requires waiting 7 days to re-apply.",
      "Ensure the vehicle you bring for the test complies with RTO parameters and has active insurance."
    ],
    "suggestedFollowUps": [
      "What happens if I fail my driving license test?",
      "How can I apply for an International Driving Permit (IDP)?",
      "Is a medical certificate required for commercial licenses?"
    ]
  },
  "ration card": {
    "answer": "Ration Cards are state-specific documents enabling families to purchase subsidized food grains (wheat, rice) from Fair Price Shops under the National Food Security Act (NFSA).",
    "processingTime": "15-30 working days from date of form submission.",
    "docsRequired": [
      "Aadhaar cards of all family members",
      "Income Certificate of the main earner",
      "Proof of residence (electricity bill or gas passbook)",
      "Passport size photograph of the female head of the family"
    ],
    "nextSteps": [
      "Go to your state Food & Civil Supplies Portal.",
      "Download Form-A (New Ration Card) or apply online.",
      "Upload demographic details and seed Aadhaar numbers.",
      "Submit to your local Food Inspector office for field verification."
    ],
    "helpfulTips": [
      "Under the 'One Nation One Ration Card' scheme, you can buy subsidized grains from any ration shop in India.",
      "Aadhaar seeding is mandatory to prevent ration card cancellation."
    ],
    "suggestedFollowUps": [
      "How do I add a new family member to an existing ration card?",
      "What is the difference between BPL and APL ration cards?",
      "How can I change my Fair Price Shop online?"
    ]
  },
  "birth certificate": {
    "answer": "A Birth Certificate is the primary official document certifying a person's birth. Registration must be completed within 21 days of birth at the local municipal corporation or village panchayat office.",
    "processingTime": "3-7 working days; offline registrations may take 15 days.",
    "docsRequired": [
      "Discharge summary / birth slip from the hospital",
      "Aadhaar cards of both parents",
      "Marriage certificate of parents (optional, for name verification)",
      "Address proof of parents"
    ],
    "nextSteps": [
      "Ensure the hospital logs the birth record with the local municipal registrar.",
      "Visit the state's Civil Registration System (CRS) portal.",
      "Search for the record using date, gender, and hospital details.",
      "Pay the nominal registry fee online and download the digitally signed certificate."
    ],
    "helpfulTips": [
      "Registering a birth after 21 days requires a delayed registration affidavit and magistrate order.",
      "Verify the spelling of the child's and parents' names on the hospital slip before discharge."
    ],
    "suggestedFollowUps": [
      "How do I register a birth after the 21-day deadline?",
      "Can I add my child's name to the birth certificate online later?",
      "What is the process to correct spelling mistakes in a birth certificate?"
    ]
  }
};

export const DEMO_SCHEME_PROFILES = {
  "Student": {
    "roadmap": "**Academic Opportunity Roadmap for Students:**\n\n1. **PM Vidyalaxmi Portal:** Secure collateral-free higher education loans up to ₹7.5 Lakhs. Application is done online with a single unified form across 40+ banks.\n2. **National Scholarship Portal (NSP):** Apply for post-matric and merit scholarships. Ensure registration is completed before October.\n3. **Skill India Training (PMKVY):** Enroll in free industry-recognized certification courses with placement support.\n4. **Digital India Internships:** Short-term government training opportunities in IT and public systems.\n\n*Immediate Actions:* Gather 10th/12th marksheets, keep family income certificate updated (below ₹4.5 Lakhs limit), and verify mobile number is linked with Aadhaar.",
    "matches": [
      {
        "id": "pm-vidyalaxmi",
        "name": "PM Vidyalaxmi Education Loan Portal",
        "category": "Education",
        "description": "A gateway for students seeking Education Loans. Apply to multiple banks through a single form.",
        "benefits": "Single window access to education loans from 40+ banks, interest subsidies.",
        "officialLink": "https://www.vidyalaxmi.co.in/"
      },
      {
        "id": "pmkvy",
        "name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
        "category": "Education",
        "description": "Skill certification scheme that enables youth to take up industry-relevant training.",
        "benefits": "Free skill training, assessment coverage, recognized certification, and job assistance.",
        "officialLink": "https://www.pmkvyofficial.org/"
      }
    ]
  },
  "Farmer": {
    "roadmap": "**Agricultural Prosperity Roadmap for Farmers:**\n\n1. **PM-KISAN Nidhi:** Receive ₹6,000 per year directly to your Aadhaar-linked bank account in 3 installments.\n2. **Kisan Credit Card (KCC):** Get short-term credit loans up to ₹3 Lakhs at heavily subsidized interest rates (4%).\n3. **PM Fasal Bima Yojana (PMFBY):** Secure crop insurance against natural hazards with low premiums.\n\n*Immediate Actions:* Visit the local agricultural officer, verify your land registration mutation copy (Khatauni), and complete Aadhaar e-KYC on the PM-Kisan portal.",
    "matches": [
      {
        "id": "pm-kisan",
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "category": "Agriculture",
        "description": "Cash support of ₹6,000 yearly to landholding farmer families.",
        "benefits": "₹6,000 per year transferred directly to bank accounts.",
        "officialLink": "https://pmkisan.gov.in/"
      },
      {
        "id": "pm-mudra",
        "name": "Pradhan Mantri Mudra Yojana (PMMY)",
        "category": "Business",
        "description": "Collateral-free loans up to ₹10 Lakhs for starting allied farming/dairy businesses.",
        "benefits": "Business loan support under Shishu, Kishor, or Tarun categories.",
        "officialLink": "https://www.mudra.org.in/"
      }
    ]
  },
  "Woman Entrepreneur": {
    "roadmap": "**Empowerment Roadmap for Women Entrepreneurs:**\n\n1. **Stand-Up India Scheme:** Secure greenfield business loans between ₹10 Lakhs and ₹1 Crore. Specifically designated for women or SC/ST founders.\n2. **Sukanya Samriddhi Yojana (SSY):** Open savings accounts for girl children with high compound interest rates (8.2%+) and tax exemptions.\n3. **PM Mudra Yojana (Tarun/Kishor):** Collateral-free loans with special low interest rate structures for women-owned enterprises.\n\n*Immediate Actions:* Draft a detailed business project report, register your enterprise as an MSME on Udyam, and consult your local public sector bank branch.",
    "matches": [
      {
        "id": "standup-india",
        "name": "Stand-Up India Scheme",
        "category": "Business",
        "description": "Composite business loans between ₹10 Lakh and ₹1 Crore for women greenfield ventures.",
        "benefits": "Composite loans covering up to 75% of your project business cost.",
        "officialLink": "https://www.standupmitra.in/"
      },
      {
        "id": "sukanya-samriddhi",
        "name": "Sukanya Samriddhi Yojana (SSY)",
        "category": "Women Empowerment",
        "description": "Small savings deposit scheme for girl children offering high-interest rates.",
        "benefits": "Compounded interest rate and tax exemptions under 80C.",
        "officialLink": "https://www.indiapost.gov.in/"
      }
    ]
  },
  "Small Business Owner": {
    "roadmap": "**Growth Roadmap for Small Business Owners:**\n\n1. **PM Mudra Yojana (PMMY):** Apply for business capital. Shishu loans provide up to ₹50,000 for street vendors; Kishor/Tarun loans provide up to ₹10 Lakhs for shop expansions.\n2. **Udyam Registration:** Apply for free MSME registration to claim electricity subsidies, priority lending, and tender exclusions.\n3. **CGTMSE Scheme:** Access collateral-free credit guarantees for manufacturing/service expansions.\n\n*Immediate Actions:* Register on Udyam portal using Aadhaar, maintain clean banking books, and request a Mudra loan application form from your bank.",
    "matches": [
      {
        "id": "pm-mudra",
        "name": "Pradhan Mantri Mudra Yojana (PMMY)",
        "category": "Business",
        "description": "Collateral-free business capital loans up to ₹10 Lakhs for micro-enterprises.",
        "benefits": "Quick approval, no collateral, divided into Shishu, Kishor, and Tarun.",
        "officialLink": "https://www.mudra.org.in/"
      }
    ]
  },
  "Senior Citizen": {
    "roadmap": "**Welfare and Support Roadmap for Senior Citizens:**\n\n1. **Pradhan Mantri Vaya Vandana Yojana (PMVVY):** Pension scheme offering guaranteed interest rates on deposits for 10 years.\n2. **Ayushman Bharat health card:** Cashless healthcare cover up to ₹5 Lakhs for hospitalizations. Includes specialized geriatric care facilities.\n3. **Atal Pension Yojana (APY):** Guaranteed monthly pension of ₹1,000 - ₹5,000 depending on early pension enrollment plans.\n\n*Immediate Actions:* Ensure birth date is accurate on Aadhaar, visit local empanelled hospitals for health registration, and link active savings accounts.",
    "matches": [
      {
        "id": "ayushman-bharat",
        "name": "Ayushman Bharat Scheme (PM-JAY)",
        "category": "Healthcare",
        "description": "Cashless health cover up to ₹5 Lakhs per family per year.",
        "benefits": "Free hospitalization and diagnostic covers at empanelled centers.",
        "officialLink": "https://pmjay.gov.in/"
      },
      {
        "id": "atal-pension",
        "name": "Atal Pension Yojana (APY)",
        "category": "Social Security",
        "description": "Guaranteed minimum monthly pension of up to ₹5,000 post age 60.",
        "benefits": "Social security pension for unorganized sector citizens.",
        "officialLink": "https://www.npscra.nsdl.co.in/"
      }
    ]
  }
};

export const DEMO_CHECKLISTS = {
  "passport": [
    { "name": "Aadhaar Card", "reason": "Acts as both Identity Proof (PoI) and Address Proof (PoA) if your mobile number is linked." },
    { "name": "Proof of Date of Birth", "reason": "Birth Certificate, 10th Standard Marks Card, or driving license." },
    { "name": "Proof of Address (Alternative)", "reason": "Utility bills, running bank statement, or registered rent agreement." },
    { "name": "Non-ECR Category Certificate", "reason": "10th marksheet or graduation degree. Required to bypass emigration checks." }
  ],
  "aadhaar": [
    { "name": "Proof of Identity (PoI)", "reason": "PAN Card, Voter ID, Passport, or Driving License showing photo." },
    { "name": "Proof of Address (PoA)", "reason": "Electricity bill, water bill, active bank statement, or registered lease deed." },
    { "name": "Proof of Date of Birth (PoB)", "reason": "Birth certificate, 10th marksheet, or passport." }
  ],
  "pan": [
    { "name": "Aadhaar Card", "reason": "Mandatory to seed with PAN. Enables instant paperless e-KYC and digital e-sign." },
    { "name": "Passport size photographs", "reason": "Two recent color photographs (for physical card print output)." },
    { "name": "Proof of Identity / DOB", "reason": "Standard fallback ID documents (Voter ID, driving license) if Aadhaar lacks complete details." }
  ],
  "driving licence": [
    { "name": "Active Learner's License", "reason": "Learner's License issued at least 30 days prior and less than 6 months old." },
    { "name": "Aadhaar Card", "reason": "Primary identity and address document." },
    { "name": "RTO Form 1 & Form 1A", "reason": "Fitness declarations. Form 1A (Medical Certificate) is mandatory if age is over 40." },
    { "name": "Slot Booking Receipt", "reason": "Online fee transaction slip showing confirmed date of driving test." }
  ],
  "income certificate": [
    { "name": "Aadhaar Card", "reason": "Citizen identity record." },
    { "name": "Salary Slips / Form 16", "reason": "Required for salaried individuals; bank accounts and ITR returns for business owners." },
    { "name": "Self-Declaration Affidavit", "reason": "Stating family income sources. Verified by local Talathi / Patwari." },
    { "name": "Ration Card", "reason": "Family unit identification proof." }
  ],
  "caste certificate": [
    { "name": "Aadhaar Card", "reason": "Primary applicant identification." },
    { "name": "School Leaving Certificate", "reason": "Must mention the father's/grandfather's caste to verify lineage." },
    { "name": "Affidavit / Caste Proof of Relatives", "reason": "Caste certificate issued to father, sibling, or paternal uncle." },
    { "name": "Land registry records (7/12 Extract)", "reason": "Proves long-term domicile of the family in the state." }
  ],
  "birth certificate": [
    { "name": "Hospital Birth Slip", "reason": "Discharge summary or birth registration slip provided by the delivery hospital." },
    { "name": "Aadhaar Cards of Parents", "reason": "Required to register parents' identities on the certificate." },
    { "name": "Address Proof", "reason": "Electricity bill or rent agreement showing parent's domicile." },
    { "name": "Marriage Certificate (Optional)", "reason": "For matching spelling of surnames." }
  ]
};

export const DEMO_GRIEVANCE_DATA = {
  "Public Works Department (Roads & Bridges)": {
    "id": "BS-2026-R4A2",
    "department": "Public Works Department (Roads & Bridges)",
    "priority": "HIGH",
    "status": "Submitted",
    "stage": 1,
    "english": "To,\nThe Chief Engineer,\nPublic Works Department (Roads & Bridges),\nMunicipal Corporation.\n\nSubject: Urgent complaint regarding severe potholes and road damage.\n\nRespected Sir/Madam,\n\nI am writing to draw your urgent attention to the terrible condition of roads in our locality. The road is riddled with deep potholes, making driving extremely hazardous, especially for two-wheelers. During rains, these potholes fill with water, leading to frequent accidents and gridlocks.\n\nWe request you to urgently deploy repair teams to fill the potholes and asphalt the road surface.\n\nThanking you,\nYours faithfully,\n[Concerned Citizen]",
    "hindi": "सेवा में,\nमुख्य अभियंता,\nलोक निर्माण विभाग (सड़कें और पुल),\nनगर निगम।\n\nविषय: गंभीर गड्ढों और सड़क क्षति के संबंध में तत्काल शिकायत।\n\nआदरणीय महोदय / महोदया,\n\nमैं इस पत्र के माध्यम से हमारे क्षेत्र की सड़कों की दयनीय स्थिति की ओर आपका तत्काल ध्यान आकर्षित करना चाहता हूँ। सड़क गहरे गड्ढों से भरी पड़ी है, जिससे वाहन चलाना बेहद खतरनाक हो गया है। कृपया सड़कों की मरम्मत के लिए तुरंत टीम तैनात करें।\n\nधन्यवाद।\nभवदीय,\n[जागरूक नागरिक]",
    "marathi": "प्रति,\nमुख्य अभियंता,\nसार्वजनिक बांधकाम विभाग (रस्ते व पूल),\nमहानगरपालिका।\n\nविषय: रस्त्यावरील खड्डे व दुरावस्थेबाबत तातडीची तक्रार.\n\nआदरणीय महोदय / महोदया,\n\nमी या पत्राद्वारे आमच्या परिसरातील रस्त्यांच्या दयनीय अवस्थेकडे आपले तातडीने लक्ष वेधून घेऊ इच्छितो. रस्त्यावर खोल खड्डे पडल्याने वाहन चालवणे अतिशय धोकादायक बनले आहे. कृपया लवकरात लवकर दुरुस्ती पथके पाठवून डांबरीकरण करावे.\n\nधन्यवाद.\nआपला नम्र,\n[जागरूक नागरिक]"
  },
  "Waste Management & Sanitation": {
    "id": "BS-2026-W3F9",
    "department": "Waste Management & Sanitation",
    "priority": "MEDIUM",
    "status": "Under Review",
    "stage": 2,
    "english": "To,\nThe Sanitation Inspector,\nWaste Management & Sanitation Department,\nMunicipal Corporation.\n\nSubject: Garbage dumping and lack of clearance in residential area.\n\nRespected Sir/Madam,\n\nI am writing to report the open dumping of solid waste near our residential park. The community waste bins have not been cleared for the past five days, leading to garbage overflowing onto the street. This has created a terrible foul smell and is attracting stray animals and mosquitoes.\n\nI request you to arrange for immediate clearance and ensure daily garbage collection.\n\nThanking you,\nYours faithfully,\n[Concerned Citizen]",
    "hindi": "सेवा में,\nस्वच्छता निरीक्षक,\nकचरा प्रबंधन और स्वच्छता विभाग,\nनगर निगम।\n\nविषय: आवासीय क्षेत्र में कचरा डंपिंग और सफाई की कमी।\n\nआदरणीय महोदय / महोदया,\n\nमैं हमारे आवासीय पार्क के पास खुले में कचरा फेंकने की शिकायत करना चाहता हूँ। पिछले पांच दिनों से कचरे के डिब्बे साफ नहीं किए गए हैं, जिससे बीमारी फैलने का खतरा है। कृपया कचरा तुरंत हटवाने की व्यवस्था करें।\n\nधन्यवाद।\nभवदीय,\n[जागरूक नागरिक]",
    "marathi": "प्रति,\nस्वच्छता निरीक्षक,\nकचरा व्यवस्थापन व स्वच्छता विभाग,\nमहानगरपालिका।\n\nविषय: निवासी परिसरात कचरा साचणे व अस्वच्छतेबाबत तक्रार.\n\nआदरणीय महोदय / महोदया,\n\nमी या पत्राद्वारे आमच्या निवासी उद्यानाजवळ उघड्यावर टाकल्या जाणाऱ्या कचऱ्याबाबत तक्रार नोंदवू इच्छितो. गेल्या पाच दिवसांपासून कचऱ्याचे डबे साफ करण्यात आलेले नाहीत. कृपया त्वरित कचरा उचलण्याची व्यवस्था करावी.\n\nधन्यवाद.\nआपला नम्र,\n[जागरूक नागरिक]"
  },
  "Municipal Water Supply & Sewerage": {
    "id": "BS-2026-H8K1",
    "department": "Municipal Water Supply & Sewerage",
    "priority": "HIGH",
    "status": "Assigned",
    "stage": 3,
    "english": "To,\nThe Executive Engineer,\nWater Supply & Sewerage Department,\nMunicipal Board.\n\nSubject: Complaint regarding sewage pipeline leakage and water contamination.\n\nRespected Sir/Madam,\n\nI am writing to report a major leakage in the main sewage pipeline which is mixing with the drinking water supply line. The water supplied to households for the past three days is turbid and smells strongly of sewage, posing a severe epidemic threat.\n\nKindly resolve this issue on war footing to prevent health crisis.\n\nThanking you,\nYours faithfully,\n[Concerned Citizen]",
    "hindi": "सेवा में,\nअधिशासी अभियंता,\nजल आपूर्ति और सीवरेज विभाग,\nनगर पालिका।\n\nविषय: सीवेज पाइपलाइन रिसाव और जल प्रदूषण के संबंध में शिकायत।\n\nआदरणीय महोदय / महोदया,\n\nमैं मुख्य सीवेज पाइपलाइन में बड़े रिसाव की रिपोर्ट करना चाहता हूँ जो पीने के पानी की लाइन में मिल रहा है। नलों में गंदा और बदबूदार पानी आ रहा है। कृपया इसे युद्ध स्तर पर ठीक करवाएं।\n\nधन्यवाद।\nभवदीय,\n[जागरूक नागरिक]",
    "marathi": "प्रति,\nकार्यकारी अभियंता,\nपाणी पुरवठा व मलनिःसारण विभाग,\nनगरपालिका।\n\nविषय: ड्रेनेज लाईन गळती व पाणी दूषित होण्याबाबत तक्रार.\n\nआदरणीय महोदय / महोदया,\n\nमी या पत्राद्वारे मुख्य ड्रेनेज लाईनला लागलेल्या गळतीबाबत तक्रार करत आहे, ज्यामुळे पिण्याचे पाणी दूषित होत आहे. नळाला दुर्गंधीयुक्त पाणी येत आहे. कृपया युद्धपातळीवर ही दुरुस्ती करून द्यावी.\n\nधन्यवाद.\nआपला नम्र,\n[जागरूक नागरिक]"
  }
};
