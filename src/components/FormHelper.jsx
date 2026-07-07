import React, { useState } from 'react';
import { sendCivicMessage } from '../services/gemini';
import { FileUp, HelpCircle, Loader2, Sparkles, HelpCircle as HelpIcon, FileText, CheckCircle2 } from 'lucide-react';

const MOCK_FORMS = [
  {
    id: "aadhaar-update",
    name: "Aadhaar Correction/Update Form",
    fields: [
      { id: "field1", name: "Resident / Non-Resident Box", desc: "Select 'Resident' if you have lived in India for 182 days or more in the last 12 months.", example: "Check 'Resident' for normal Indian citizens." },
      { id: "field2", name: "Biometric Update checkbox", desc: "Check this only if changing Photo, Fingerprints, or Iris scan. Requires visiting an center.", example: "Leave blank if only updating Name/Address." },
      { id: "field3", name: "Care Of (C/O)", desc: "Write parent's name (for children) or spouse's name. Often used for address matching.", example: "C/O Rajesh Sharma" },
      { id: "field4", name: "Verification Type (Document vs Intro)", desc: "Choose 'Document' if you have physical papers. Intro/Head of Family is only if you have no proofs.", example: "Tick 'Document Based' for standard updates." }
    ]
  },
  {
    id: "passport-fresh",
    name: "Passport Application Form",
    fields: [
      { id: "pass1", name: "Are you eligible for Non-ECR category?", desc: "Non-Emigration Clearance Required. Select YES if you have passed 10th class or higher, or are over 50.", example: "Select 'Yes' if you have a matriculation marksheet." },
      { id: "pass2", name: "Given Name vs Surname", desc: "Given name is your first and middle name. Surname is your family name. Do not mix them.", example: "Given: Aarav Kumar, Surname: Sharma" },
      { id: "pass3", name: "Aliases / Name Change", desc: "Select YES if you are known by any other name, or have changed your name legally.", example: "Usually 'No' unless legally changed by Gazette." },
      { id: "pass4", name: "Employment Type", desc: "Required to verify government/public sector service or private employment status.", example: "Choose 'Private' or 'Student'." }
    ]
  }
];

export default function FormHelper() {
  const [selectedFormId, setSelectedFormId] = useState(MOCK_FORMS[0].id);
  const [customField, setCustomField] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const activeForm = MOCK_FORMS.find(f => f.id === selectedFormId) || MOCK_FORMS[0];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 30;
        });
      }, 200);
    }
  };

  const handleAskField = async (e) => {
    e.preventDefault();
    if (!customField.trim()) return;
    setLoading(true);

    const prompt = `I am filling out a government application form. I came across a confusing field or term: "${customField}". 
Please explain:
1. What does this field mean in simple terms?
2. What exactly should I fill or write in this section?
3. What are the common mistakes to avoid?`;

    const response = await sendCivicMessage(prompt, [], 'English');
    setCustomResponse(response);
    setLoading(false);
  };

  const formatResponse = (text) => {
    return text.split('\n').map((line, idx) => {
      let formattedLine = line.replace(/\*\/(.*?)\*\//g, '<strong>$1</strong>');
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={idx} className="my-1.5 text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* File Upload & Interactive Form Guide */}
      <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">AI Form Assistant</h3>
          </div>

          <p className="text-xs text-slate-400 mb-6">Upload an official government application form or select a template to see details on how to fill out complex fields without errors.</p>

          {/* Form Drag & Drop / Upload Box */}
          <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/20 rounded-2xl p-6 text-center cursor-pointer transition-all mb-6 relative">
            <input 
              type="file" 
              accept=".pdf,image/*" 
              onChange={handleFileUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <FileUp className="text-indigo-400 animate-bounce" size={28} />
              <div className="text-xs font-semibold text-slate-300">
                {uploadedFile ? `Uploaded: ${uploadedFile.name}` : "Upload Government Form (PDF / Image)"}
              </div>
              <p className="text-[10px] text-slate-500">Supports Aadhaar, Passport, Ration, or PAN application drafts.</p>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-slate-800 h-1 rounded-full mt-4 overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            {uploadProgress === 100 && (
              <div className="mt-3 text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 size={12} /> Form analyzed successfully! Click fields below or ask about specific rows.
              </div>
            )}
          </div>

          {/* Form Selector */}
          <div className="flex gap-2 mb-4">
            {MOCK_FORMS.map(form => (
              <button
                key={form.id}
                onClick={() => {
                  setSelectedFormId(form.id);
                  setUploadedFile(null);
                  setUploadProgress(0);
                }}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectedFormId === form.id && !uploadedFile
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {form.name}
              </button>
            ))}
          </div>

          {/* Interactive Form Field List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Complex Form Fields Explained</h4>
            {activeForm.fields.map((field) => (
              <div 
                key={field.id}
                onClick={() => {
                  setCustomField(`In the ${activeForm.name}, what does the field '${field.name}' mean?`);
                  setCustomResponse(`**Field Name:** ${field.name}\n\n**Explanation:** ${field.desc}\n\n**Example/Instruction:** ${field.example}`);
                }}
                className="p-4 bg-slate-950/20 border border-slate-850 hover:border-indigo-500/40 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-4 group"
              >
                <div>
                  <h5 className="text-xs font-bold text-indigo-300 group-hover:text-indigo-200 transition-colors mb-1">{field.name}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{field.desc}</p>
                </div>
                <HelpIcon size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* AI Assistant Explanation Box */}
      <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-orange-500" size={24} />
            <h3 className="font-semibold text-lg text-slate-100">AI Form Explainer</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4">Ask the AI to explain a specific form field, tax terminology, or biometric requirement that you find confusing.</p>

          <form onSubmit={handleAskField} className="space-y-3">
            <input
              type="text"
              required
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
              placeholder="e.g. What does 'Care Of (C/O)' mean on Aadhaar?"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !customField.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Analyzing field...
                </>
              ) : (
                <>
                  <HelpCircle size={14} />
                  Explain Field
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Explanation Result */}
        <div className="flex-1 mt-6 border-t border-slate-800/80 pt-6 flex flex-col justify-center min-h-[220px]">
          {customResponse ? (
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 h-full overflow-y-auto">
              <span className="text-[10px] font-bold text-indigo-400 block mb-2 uppercase tracking-wide">EXPLAINER OUTPUT</span>
              {formatResponse(customResponse)}
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              Click a form field on the left or type your own question to view explanations.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
