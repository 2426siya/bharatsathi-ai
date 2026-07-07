import React, { useState } from 'react';
import { chatWithCompanion } from '../services/aiService';
import { AlertOctagon, HelpCircle, Loader2, Sparkles, BookOpen, Link, AlertTriangle } from 'lucide-react';

const EMERGENCY_MAPPING = {
  "lost-aadhaar": {
    name: "I lost my Aadhaar Card",
    immediateAction: "Lock your biometric details immediately on the mAadhaar app or UIDAI website to prevent fraud. File an online complaint/report on your state police portal (Lost Document Report).",
    office: "Aadhaar Seva Kendra or Authorized Registrar Office (UIDAI)",
    docs: "Mobile number registered with Aadhaar (for OTP), or any alternative Photo ID proof (PAN, Voter ID) for biometric retrieval.",
    fees: "₹50 for download and PVC card printing reprint.",
    timeline: "Instant download of e-Aadhaar; PVC card delivered within 7-15 working days."
  },
  "lost-passport": {
    name: "I lost my Passport",
    immediateAction: "Report the loss immediately to the nearest Local Police Station and obtain a Copy of the FIR. If abroad, contact the nearest Indian Embassy/Consulate.",
    office: "Passport Seva Kendra (PSK) or Regional Passport Office (RPO)",
    docs: "Police FIR Copy, Copy of old Passport (if available), Address Proof, Date of Birth Proof, and personal affidavit.",
    fees: "₹1,500 - ₹3,000 depending on category (normal vs Tatkaal re-issue).",
    timeline: "7-15 working days (Normal) or 1-3 working days (Tatkaal re-issue)."
  },
  "lost-ration": {
    name: "My Ration Card is lost",
    immediateAction: "Submit a written application to the local Food Inspector or District Supply Officer. Get an official acknowledgement receipt.",
    office: "District Food & Civil Supplies Department (Tehsil/Taluq Office)",
    docs: "Application Form, Copy of Police Report / Lost Document Report, Aadhaar cards of all family members, passport size photos.",
    fees: "₹20 - ₹50 nominal stamp and printing fee.",
    timeline: "15-30 working days for verified duplicate card delivery."
  }
};

export default function Summarizer() {
  const [comprehensiveText, setComprehensiveText] = useState('');
  const [summaryResponse, setSummaryResponse] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!comprehensiveText.trim() && !webUrl.trim()) return;
    setLoading(true);

    let prompt = "";
    if (webUrl.trim() && !comprehensiveText.trim()) {
      prompt = `Here is a government portal link: "${webUrl}". Provide a simple, clear, and comprehensive summary of what this website provides, key benefits, and how citizens can apply. Present it in simple bullet points.`;
    } else {
      prompt = `Here is a complicated government notification/text:\n"${comprehensiveText}"\n\nPlease translate this into simple layman terms. Detail:
1. What does this notification say?
2. How does this affect an ordinary citizen?
3. What actions must a citizen take now?`;
    }

    const response = await chatWithCompanion(
      prompt, 
      [], 
      'English',
      (err) => {
        alert("Live AI is currently unavailable. Switching to Demo Mode for uninterrupted experience.");
      }
    );
    setSummaryResponse(response);
    setLoading(false);
  };

  const handleSelectEmergency = (key) => {
    setSelectedEmergency(EMERGENCY_MAPPING[key]);
  };

  const formatText = (text) => {
    return text.split('\n').map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={idx} className="my-1.5 text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Summarizer Form */}
      <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">AI Document & Web Summarizer</h3>
          </div>

          <p className="text-xs text-slate-400 mb-6">Paste long, complicated government notifications, rules, or insert a website link to get a simplified, easy-to-understand executive summary.</p>

          <form onSubmit={handleSummarize} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Government Website URL</label>
              <div className="flex bg-slate-950/80 border border-slate-700/50 rounded-xl overflow-hidden focus-within:border-indigo-500">
                <span className="bg-slate-900 px-3 py-2.5 text-slate-500 text-xs flex items-center border-r border-slate-800">
                  <Link size={14} />
                </span>
                <input
                  type="url"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  placeholder="e.g. https://uidai.gov.in/notifications"
                  className="w-full bg-transparent px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative flex items-center my-2">
              <div className="flex-grow border-t border-slate-850"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-slate-850"></div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Paste Gazette / Notification Text</label>
              <textarea
                rows="4"
                value={comprehensiveText}
                onChange={(e) => setComprehensiveText(e.target.value)}
                placeholder="Paste complex circulars or paragraphs of public notifications here..."
                className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || (!comprehensiveText.trim() && !webUrl.trim())}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Summarizing document...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Summarize Notifications
                </>
              )}
            </button>
          </form>
        </div>

        {/* Summary Output */}
        <div className="mt-6 border-t border-slate-800/80 pt-6 min-h-[150px]">
          {summaryResponse ? (
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 max-h-[200px] overflow-y-auto">
              <span className="text-[10px] font-bold text-indigo-400 block mb-2 uppercase tracking-wide">SIMPLIFIED LAYMAN SUMMARY</span>
              {formatText(summaryResponse)}
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              Paste notification text or input a website URL above to view simple summaries.
            </div>
          )}
        </div>
      </div>

      {/* AI Emergency Helper */}
      <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-fit">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">AI Emergency Helper</h3>
          </div>

          <p className="text-xs text-slate-400 mb-6">Select a lost document below to get immediate step-by-step assistance, fees, and timelines to obtain duplicates.</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {Object.keys(EMERGENCY_MAPPING).map(key => (
              <button
                key={key}
                onClick={() => handleSelectEmergency(key)}
                className={`py-3 px-2 text-[10px] font-bold rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedEmergency?.name === EMERGENCY_MAPPING[key].name
                    ? 'bg-red-950/20 border-red-500 text-red-400 shadow-md'
                    : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{EMERGENCY_MAPPING[key].name}</span>
              </button>
            ))}
          </div>

          {selectedEmergency ? (
            <div className="space-y-4 bg-slate-950/40 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-red-500/10 text-red-400 rounded-bl-xl border-l border-b border-red-500/20">
                <AlertTriangle size={16} className="animate-pulse" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Immediate Steps</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedEmergency.immediateAction}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-900">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Required Office</h4>
                  <p className="text-xs text-slate-200">{selectedEmergency.office}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Fees & Stamp</h4>
                  <p className="text-xs text-slate-200 font-semibold">{selectedEmergency.fees}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Retrieval Timeline</h4>
                <p className="text-xs text-slate-200">{selectedEmergency.timeline}</p>
              </div>

              <div className="pt-3 border-t border-slate-900">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Verification Documents</h4>
                <p className="text-xs text-slate-300 italic">{selectedEmergency.docs}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-16 border border-slate-850/60 bg-slate-950/10 rounded-xl">
              Choose an emergency lost document card above to show critical paths.
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 italic">
          Emergency Note: For lost credentials or passport, filing a lost document report on your state police portal is a vital security precaution.
        </div>
      </div>

    </div>
  );
}
