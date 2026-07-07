import { sendCivicMessage, translateCivicText, generateGrievanceLetters } from './gemini';
import { DEMO_CHAT_RESPONSES, DEMO_SCHEME_PROFILES, DEMO_GRIEVANCE_DATA, DEMO_CHECKLISTS } from '../data/demoResponses';

// Initialize the active mode from localStorage
let currentMode = localStorage.getItem('bharatsathi_mode') || 'demo'; // Default to demo for safe first impression

/**
 * Returns the current active AI mode: 'live' or 'demo'
 */
export function getAiMode() {
  return currentMode;
}

/**
 * Sets the active AI mode and persists it to localStorage
 */
export function setAiMode(mode) {
  if (mode === 'live' || mode === 'demo') {
    currentMode = mode;
    localStorage.setItem('bharatsathi_mode', mode);
    // Dispatch a custom event to notify components of mode change
    window.dispatchEvent(new Event('bharatsathi_mode_change'));
  }
}

/**
 * Helper to check if a live call should be made or if we should fallback.
 * Automatically catches network or key errors, triggers the error callback, and switches to demo.
 */
async function executeWithFallback(liveFn, demoFn, onError) {
  if (currentMode === 'demo') {
    return demoFn();
  }

  try {
    return await liveFn();
  } catch (error) {
    console.error("Live AI execution failed, switching to offline Demo Mode:", error);
    if (onError) {
      onError(error);
    }
    // Force transition to demo mode
    setAiMode('demo');
    return demoFn();
  }
}

/**
 * 1. AI CHAT COMPANION
 */
export async function chatWithCompanion(message, history = [], language = 'English', onSystemError) {
  const liveCall = () => sendCivicMessage(message, history, language);
  
  const demoCall = () => {
    const msgLower = message.toLowerCase();
    
    // Find matching keyword in demo data
    let matchKey = Object.keys(DEMO_CHAT_RESPONSES).find(key => msgLower.includes(key));
    
    if (matchKey) {
      const data = DEMO_CHAT_RESPONSES[matchKey];
      
      // Construct a premium formatted response
      let response = `**${data.answer}**\n\n`;
      response += `* **Estimated Processing Time:** ${data.processingTime}\n\n`;
      
      response += `* **Required Documents:**\n`;
      data.docsRequired.forEach(doc => { response += `  - ${doc}\n`; });
      
      response += `\n* **Next Application Steps:**\n`;
      data.nextSteps.forEach(step => { response += `  - ${step}\n`; });
      
      response += `\n* **Helpful Tips:**\n`;
      data.helpfulTips.forEach(tip => { response += `  - ${tip}\n`; });
      
      response += `\n* **Suggested Follow-up Questions:**\n`;
      data.suggestedFollowUps.forEach(q => { response += `  - *${q}*\n`; });
      
      return response;
    }
    
    // General conversational fallback if keyword not matched
    const isHindi = language === 'Hindi' || language === 'हिंदी';
    const isMarathi = language === 'Marathi' || language === 'मराठी';
    
    if (isHindi) {
      return `मुझे आपकी समस्या समझ आ गई है। डेमो मोड में, आप इन विषयों पर पूछ सकते हैं: **पासपोर्ट, पैन कार्ड, आधार, एमएसएमई, पीएम किसान, आयुष्मान भारत, छात्रवृत्ति, ड्राइविंग लाइसेंस, राशन कार्ड, जन्म प्रमाण पत्र**। \n\nउदाहरण के लिए, टाइप करें: *"पासपोर्ट कैसे बनवाएं?"*`;
    }
    if (isMarathi) {
      return `मला तुमची शंका समजली. डेमो मोडमध्ये, तुम्ही या विषयांवर विचारू शकता: **पासपोर्ट, पॅन कार्ड, आधार, एमएसएमई, पीएम किसान, आयुष्मान भारत, शिष्यवृत्ती, ड्रायव्हिंग लायसन्स, रेशन कार्ड, जन्म प्रमाणपत्र**। \n\nउदाहरणार्थ, टाईप करा: *"पासपोर्ट कसा काढायचा?"*`;
    }
    
    return `I understand your request. In **Demo Mode**, you can ask about: **Passport, PAN card, Aadhaar update, MSME registration, PM Kisan, Ayushman Bharat, Scholarships, Driving Licence, Ration Card, or Birth Certificate** to see high-quality structured answers.\n\nTry typing: *"How do I apply for a Passport?"* or *"What is PM Kisan?"*`;
  };

  return executeWithFallback(liveCall, demoCall, onSystemError);
}

/**
 * 2. SCHEME RECOMMENDATIONS
 */
export async function recommendSchemesForUser(age, state, occupation, income, gender, localMatches, onSystemError) {
  const liveCall = async () => {
    if (localMatches.length > 0) {
      const matchNames = localMatches.map(m => m.name).join(', ');
      const prompt = `I am a ${age} year old ${gender} citizen from ${state}. My occupation is ${occupation} and my annual income is ₹${income}. The local matches are: [${matchNames}]. Generate a customized step-by-step roadmap.`;
      return await sendCivicMessage(prompt, [], 'English');
    }
    return "No matching schemes found in database to evaluate.";
  };

  const demoCall = () => {
    // Match against primary profiles
    let profileKey = "Senior Citizen"; // default fallback
    
    if (occupation === "Student") profileKey = "Student";
    else if (occupation === "Farmer") profileKey = "Farmer";
    else if (occupation === "Business") {
      if (gender === "Female") profileKey = "Woman Entrepreneur";
      else profileKey = "Small Business Owner";
    } else if (gender === "Female") {
      profileKey = "Woman Entrepreneur";
    } else if (parseInt(age) >= 60) {
      profileKey = "Senior Citizen";
    }

    const data = DEMO_SCHEME_PROFILES[profileKey];
    return data ? data.roadmap : "No demo profile matching criteria. Try choosing 'Student' or 'Farmer'.";
  };

  return executeWithFallback(liveCall, demoCall, onSystemError);
}

/**
 * 3. GRIEVANCE DRAFT GENERATOR
 */
export async function generateGrievance(issue, department, onSystemError) {
  const liveCall = () => generateGrievanceLetters(issue, department);
  
  const demoCall = () => {
    // Check if we have exact match for department
    const data = DEMO_GRIEVANCE_DATA[department];
    if (data) {
      return {
        english: data.english,
        hindi: data.hindi,
        marathi: data.marathi,
        id: data.id,
        priority: data.priority,
        stage: data.stage,
        status: data.status
      };
    }
    
    // Generalized fallback for complaints
    const mockId = `BS-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    return {
      id: mockId,
      department: department,
      priority: "MEDIUM",
      status: "Submitted",
      stage: 1,
      english: `To,\nThe Chief Officer,\n${department},\nMunicipal Corporation.\n\nSubject: Official complaint regarding ${issue}.\n\nRespected Sir/Madam,\n\nI am writing to draw your attention to the issue of "${issue}" in our area. This is causing significant problems to the local residents.\n\nPlease arrange for corrective action immediately.\n\nThanking you,\nYours faithfully,\n[Concerned Citizen]`,
      hindi: `सेवा में,\nमुख्य अधिकारी,\n${department},\nनगर निगम।\n\nविषय: ${issue} के संबंध में आधिकारिक शिकायत।\n\nआदरणीय महोदय / महोदया,\n\nमैं इस पत्र के माध्यम से हमारे क्षेत्र में "${issue}" की समस्या की ओर आपका ध्यान आकर्षित करना चाहता हूँ। कृपया जल्द से जल्द उचित कार्रवाई करें।\n\nधन्यवाद।\nभवदीय,\n[जागरूक नागरिक]`,
      marathi: `प्रति,\nमुख्य अधिकारी,\n${department},\nमहानगरपालिका।\n\nविषय: ${issue} बाबत अधिकृत तक्रार.\n\nआदरणीय महोदय / महोदया,\n\nमी या पत्राद्वारे आमच्या परिसरातील "${issue}" या समस्येकडे आपले लक्ष वेधू इच्छितो. कृपया या समस्येचे लवकरात लवकर निवारण करावे.\n\nधन्यवाद.\nआपला नम्र,\n[जागरूक नागरिक]`
    };
  };

  return executeWithFallback(liveCall, demoCall, onSystemError);
}

/**
 * 4. FORM FIELD EXPLAINER
 */
export async function explainFormField(fieldName, onSystemError) {
  const liveCall = () => {
    const prompt = `Explain the form field: "${fieldName}". 1. Meaning, 2. How to fill, 3. Common mistakes.`;
    return sendCivicMessage(prompt, [], 'English');
  };

  const demoCall = () => {
    const fieldLower = fieldName.toLowerCase();
    
    if (fieldLower.includes('resident')) {
      return `**Field Name:** Resident Status\n\n**Explanation:** Confirms whether you reside permanently in India.\n\n**Instruction:** Check 'Resident' if you have spent 182 days or more in India in the past year.\n\n**Mistake to avoid:** Non-Resident Indians (NRIs) must not check this box.`;
    }
    if (fieldLower.includes('care of') || fieldLower.includes('c/o')) {
      return `**Field Name:** Care Of (C/O)\n\n**Explanation:** Identifies the parent, guardian, or spouse responsible for mail delivery.\n\n**Instruction:** Write your father's name (for children) or spouse's name.\n\n**Mistake to avoid:** Writing nickname or incomplete names; it must match their legal IDs.`;
    }
    if (fieldLower.includes('non-ecr') || fieldLower.includes('ecr')) {
      return `**Field Name:** Non-ECR Category\n\n**Explanation:** Non-Emigration Clearance Required. Bypasses employment travel restrictions.\n\n**Instruction:** Select YES if you hold a 10th Standard (Matriculation) mark sheet or higher degree certificate.\n\n**Mistake to avoid:** Selecting 'Yes' without having physical educational certificates to present at the RPO.`;
    }
    
    return `**Field Name:** ${fieldName}\n\n**Explanation:** This refers to the specific requirement for details to process your application.\n\n**Instruction:** Write the exact details as printed on your primary identification documents (like Aadhaar card).\n\n**Mistake to avoid:** Writing names that do not match birth certificates or legal titles.`;
  };

  return executeWithFallback(liveCall, demoCall, onSystemError);
}
