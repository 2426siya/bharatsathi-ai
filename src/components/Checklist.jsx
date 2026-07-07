import React, { useState } from 'react';
import { sendCivicMessage } from '../services/gemini';
import { FileCheck2, Bot, HelpCircle, Loader2, Info } from 'lucide-react';

const SERVICES = [
  {
    id: "passport",
    name: "New Indian Passport",
    description: "Standard fresh passport application for an adult citizen.",
    docs: [
      { name: "Aadhaar Card", reason: "Serves as dual proof of identity (PoI) and address (PoA) if demographics match." },
      { name: "Proof of Date of Birth", reason: "Birth Certificate, 10th Standard passing certificate, or PAN card." },
      { name: "Proof of Address (Alternative)", reason: "Utility bills, active bank statement, or rent agreement if not matching Aadhaar." },
      { name: "Non-ECR Proof (Optional)", reason: "10th Marksheet or degree certificate to bypass emigration clearance requirements." }
    ]
  },
  {
    id: "driving-license",
    name: "Permanent Driving License",
    description: "Application after obtaining a Learner's License.",
    docs: [
      { name: "Learner's License", reason: "Active Learner's license issued at least 30 days prior." },
      { name: "Aadhaar Card", reason: "Standard national identification and age validation." },
      { name: "Address Proof", reason: "Voter ID, Passport, or Electricity bill matching current address." },
      { name: "Form 1 & Form 1A (Medical)", reason: "Self-declaration of physical fitness or medical certificate if age is above 40." }
    ]
  },
  {
    id: "pan-card",
    name: "New PAN Card (Form 49A)",
    description: "Permanent Account Number card for financial and tax filing.",
    docs: [
      { name: "Proof of Identity (PoI)", reason: "Aadhaar Card, Voter ID, or Passport showing applicant's photo." },
      { name: "Proof of Address (PoA)", reason: "Aadhaar Card, Bank statement, Post Office passbook, or Gas bill." },
      { name: "Proof of Date of Birth (PoB)", reason: "Matriculation certificate, Aadhaar, Birth certificate, or driving license." },
      { name: "Passport Size Photos", reason: "Two recent colour photographs (3.5 cm x 2.5 cm) for card printing." }
    ]
  },
  {
    id: "ration-card",
    name: "NFSA Ration Card",
    description: "Subsidized food grain card issued by State Food & Civil Supplies.",
    docs: [
      { name: "Aadhaar Cards of All Family Members", reason: "Mandatory de-duplication requirement under One Nation One Ration Card." },
      { name: "Income Certificate", reason: "To verify household eligibility falls under priority (PHH) or Antyodaya (AAY) limits." },
      { name: "Electricity Bill or Rent Receipt", reason: "To prove current domicile within the state boundaries." },
      { name: "Bank Passbook of Female Head of Family", reason: "Required as the card is registered under the senior female member's name." }
    ]
  }
];

export default function Checklist() {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [checkedDocs, setCheckedDocs] = useState({});
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Handle toggling of checklists
  const toggleDoc = (docName) => {
    setCheckedDocs(prev => ({
      ...prev,
      [`${selectedServiceId}-${docName}`]: !prev[`${selectedServiceId}-${docName}`]
    }));
  };

  // Calculate progress
  const serviceDocs = activeService.docs;
  const checkedCount = serviceDocs.filter(d => checkedDocs[`${selectedServiceId}-${d.name}`]).length;
  const progressPercent = Math.round((checkedCount / serviceDocs.length) * 100);

  // Ask AI about document alternatives
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setLoading(true);

    const prompt = `I am applying for a "${activeService.name}". I have a question regarding documents:\n"${aiQuestion}"\n\nPlease answer clearly and explain what alternative documents or procedures exist if the citizen does not have the standard files. Keep it concise.`;
    const response = await sendCivicMessage(prompt, [], 'English');
    setAiResponse(response);
    setLoading(false);
  };

  const formatAiResponse = (text) => {
    return text.split('\n').map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={idx} className="my-1.5 text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Service Selector & Checklist */}
      <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileCheck2 className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">Document Eligibility Guide</h3>
          </div>

          <p className="text-xs text-slate-400 mb-6">Select a public service below to verify your document checklist before visiting a citizen service center (Seva Kendra).</p>

          {/* Service Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {SERVICES.map(service => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedServiceId(service.id);
                  setAiResponse('');
                  setAiQuestion('');
                }}
                className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedServiceId === service.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-md'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{service.name}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-6 p-4 bg-slate-950/30 border border-slate-800 rounded-xl">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400 font-medium">Document Completion Progress</span>
              <span className="font-semibold text-indigo-400">{progressPercent}% ({checkedCount}/{serviceDocs.length})</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Docs Checklist Grid */}
          <div className="space-y-3">
            {serviceDocs.map((doc, idx) => {
              const isChecked = !!checkedDocs[`${selectedServiceId}-${doc.name}`];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleDoc(doc.name)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-indigo-900/10 border-indigo-500/40 shadow-sm shadow-indigo-900/5'
                      : 'bg-slate-950/20 border-slate-850 hover:border-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Controlled by div click
                    className="mt-1 accent-indigo-600 pointer-events-none"
                  />
                  <div className="space-y-1">
                    <h5 className={`text-sm font-semibold transition-colors ${isChecked ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {doc.name}
                    </h5>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Info size={12} className="shrink-0 text-slate-500" />
                      <span>{doc.reason}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 italic">
          Disclaimer: Requirements may vary slightly across states. Confirm dates and fees on the official state portals.
        </div>
      </div>

      {/* AI Document Helper Sidebar */}
      <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">DocAssistant AI</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4">Ask questions about document discrepancies, missing birth certificates, alternative address proofs, or attestation doubts.</p>

          <form onSubmit={handleAskAI} className="space-y-3">
            <textarea
              required
              rows="3"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="e.g. My rent agreement is not registered. Can I use it as address proof for passport?"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              disabled={loading || !aiQuestion.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Analyzing query...
                </>
              ) : (
                <>
                  <HelpCircle size={14} />
                  Ask DocAssistant
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Answer Block */}
        <div className="flex-1 mt-6 border-t border-slate-800/80 pt-6 flex flex-col justify-center min-h-[180px]">
          {aiResponse ? (
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 h-full overflow-y-auto">
              <span className="text-[10px] font-bold text-indigo-400 block mb-2 uppercase tracking-wide">DOCASSISTANT RESPONSE</span>
              {formatAiResponse(aiResponse)}
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              Ask a question above to get automated guidelines and support.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
