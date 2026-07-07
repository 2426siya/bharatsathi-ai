import React, { useState } from 'react';
import { generateGrievanceLetters } from '../services/gemini';
import { FileEdit, Clipboard, Check, Calendar, ArrowRight, Loader2, Sparkles, MapPin } from 'lucide-react';

const DEPARTMENTS = [
  "Public Works Department (Roads & Bridges)",
  "Waste Management & Sanitation",
  "Municipal Water Supply & Sewerage",
  "Electricity & Street Lighting",
  "Public Health & Vector Control",
  "Traffic & Road Safety Department"
];

export default function Grievance() {
  const [issue, setIssue] = useState('');
  const [department, setDepartment] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [locality, setLocality] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [letters, setLetters] = useState(null);
  const [currentLangTab, setCurrentLangTab] = useState('english');
  const [copied, setCopied] = useState(false);
  
  // Track reported complaints list
  const [complaints, setComplaints] = useState([
    {
      id: "BS-2026-R4Y7",
      issue: "Potholes and broken asphalt on MG Road main intersection",
      department: "Public Works Department (Roads & Bridges)",
      locality: "MG Road, Pune",
      date: "06 July 2026",
      status: "Assigned", // Submitted -> Under Review -> Assigned -> Resolved
      stage: 3
    },
    {
      id: "BS-2026-W9K2",
      issue: "Water contamination and brown water supply in local taps",
      department: "Municipal Water Supply & Sewerage",
      locality: "Kothrud, Pune",
      date: "05 July 2026",
      status: "Resolved",
      stage: 4
    }
  ]);
  const [activeComplaintDetails, setActiveComplaintDetails] = useState(null);

  const handleGenerateLetters = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generated = await generateGrievanceLetters(issue, department);
    setLetters(generated);

    // Create a new mock complaint item
    const mockId = `BS-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newComplaint = {
      id: mockId,
      issue,
      department,
      locality: locality || "General Locality",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "Submitted",
      stage: 1
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setActiveComplaintDetails(newComplaint);
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-900/40 text-blue-400 border-blue-500/30";
      case "Under Review":
        return "bg-orange-900/40 text-orange-400 border-orange-500/30";
      case "Assigned":
        return "bg-purple-900/40 text-purple-400 border-purple-500/30";
      case "Resolved":
        return "bg-emerald-900/40 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-slate-900 text-slate-400 border-slate-700/50";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Input Desk */}
      <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl h-fit">
        <div className="flex items-center gap-2 mb-6">
          <FileEdit className="text-orange-500" size={24} />
          <h3 className="font-semibold text-lg text-slate-100 font-sans">Grievance Desk</h3>
        </div>

        <form onSubmit={handleGenerateLetters} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Civic Issue Description</label>
            <textarea
              required
              rows="3"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="e.g. Garbage accumulation near the park causing foul smell and health hazard..."
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Concerned Department</label>
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Citizen Name (Optional)</label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Locality/City</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Kothrud, Pune"
                className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Drafting Grievances...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Official Letters
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Letters & Live Tracker */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Letters Area */}
        {letters && (
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex justify-between items-center bg-slate-800/80 border-b border-slate-700/50 px-6 py-3">
              <div className="flex gap-2">
                {['english', 'hindi', 'marathi'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLangTab(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all ${
                      currentLangTab === lang
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(letters[currentLangTab])}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
                {copied ? "Copied!" : "Copy Letter"}
              </button>
            </div>

            <div className="p-6">
              <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                {letters[currentLangTab]}
              </pre>
              <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <span>✔ AI generated a mock Grievance Ticket ID: <strong>{activeComplaintDetails?.id}</strong> for your record tracker.</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Complaint Tracker dashboard */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-orange-500" />
            Civic Grievance Tracker
          </h4>

          {/* Active Complaint Progress Tracker */}
          {activeComplaintDetails && (
            <div className="mb-6 p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">ACTIVE GRIEVANCE TICKET</span>
                  <h5 className="text-sm font-semibold text-indigo-300">{activeComplaintDetails.id}</h5>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{activeComplaintDetails.issue}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(activeComplaintDetails.status)}`}>
                  {activeComplaintDetails.status}
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center justify-between relative mt-6 px-4">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${((activeComplaintDetails.stage - 1) / 3) * 100}%` }}
                ></div>

                {/* Steps */}
                {[
                  { name: "Submitted", val: 1 },
                  { name: "Under Review", val: 2 },
                  { name: "Assigned", val: 3 },
                  { name: "Resolved", val: 4 }
                ].map((st) => (
                  <div key={st.val} className="flex flex-col items-center z-10">
                    <div 
                      onClick={() => {
                        // Allow simulating progress for judges
                        const statuses = ["Submitted", "Under Review", "Assigned", "Resolved"];
                        setActiveComplaintDetails(prev => ({
                          ...prev,
                          stage: st.val,
                          status: statuses[st.val - 1]
                        }));
                        // Also update in complaints list
                        setComplaints(prev => prev.map(c => c.id === activeComplaintDetails.id ? {...c, stage: st.val, status: statuses[st.val - 1]} : c));
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all border ${
                        activeComplaintDetails.stage >= st.val
                          ? 'bg-indigo-600 border-indigo-500 text-white scale-110 shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      {activeComplaintDetails.stage > st.val ? '✔' : st.val}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium bg-slate-900 px-1">{st.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-4 italic">Tip: Click numbers to simulate status updates for demonstration.</p>
            </div>
          )}

          {/* List of complaints */}
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
            {complaints.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setActiveComplaintDetails(c)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center gap-4 ${
                  activeComplaintDetails?.id === c.id
                    ? 'bg-slate-800/40 border-indigo-500/50 shadow-md'
                    : 'bg-slate-950/20 border-slate-800 hover:border-slate-700/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-200">{c.id}</span>
                    <span className="text-[10px] text-slate-500">• {c.date}</span>
                  </div>
                  <h5 className="text-xs text-slate-300 font-medium line-clamp-1">{c.issue}</h5>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={10} />
                    <span>{c.locality}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(c.status)}`}>
                    {c.status}
                  </span>
                  <ArrowRight size={14} className="text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
