import React, { useState } from 'react';
import schemesData from '../data/schemes.json';
import { sendCivicMessage } from '../services/gemini';
import { Search, HelpCircle, FileText, CheckCircle2, ChevronRight, Award, Compass } from 'lucide-react';

const STATES = [
  "Maharashtra", "Uttar Pradesh", "Delhi", "Karnataka", "Tamil Nadu", 
  "Gujarat", "West Bengal", "Bihar", "Madhya Pradesh", "Rajasthan"
];

export default function Schemes() {
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [gender, setGender] = useState('All');
  
  const [matches, setMatches] = useState([]);
  const [aiRoadmap, setAiRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchSchemes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    const userAge = parseInt(age) || 30;
    const userIncome = parseInt(income) || 300000;

    // Filter local schemes database (Local RAG Matching)
    const localMatches = schemesData.filter(scheme => {
      const el = scheme.eligibility;
      
      // Check occupation
      const occMatch = el.occupations.includes("All") || el.occupations.includes(occupation);
      
      // Check gender
      const genMatch = el.gender === "All" || el.gender === gender;
      
      // Check age limits
      const ageMinMatch = el.ageMin === null || userAge >= el.ageMin;
      const ageMaxMatch = el.ageMax === null || userAge <= el.ageMax;
      
      // Check income limit
      const incMatch = el.maxIncome === null || userIncome <= el.maxIncome;

      return occMatch && genMatch && ageMinMatch && ageMaxMatch && incMatch;
    });

    setMatches(localMatches);

    // Call Gemini API to build a personalized application roadmap
    if (localMatches.length > 0) {
      const matchNames = localMatches.map(m => m.name).join(', ');
      const prompt = `I am a ${age} year old ${gender} citizen from ${state}. My occupation is ${occupation} and my annual income is ₹${income}. 
The database matched me with the following schemes: [${matchNames}].

Please write a highly customized, step-by-step roadmap on how I can apply for these schemes. Keep it action-oriented, simple, and list the exact immediate steps to take.`;

      const response = await sendCivicMessage(prompt, [], 'English');
      setAiRoadmap(response);
    } else {
      setAiRoadmap('');
    }
    
    setLoading(false);
  };

  const formatRoadmap = (text) => {
    return text.split('\n').map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={idx} className="ml-4 list-disc text-slate-300" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
      }
      return <p key={idx} className="my-1.5 text-slate-300 text-sm" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Questionnaire Form */}
      <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl h-fit">
        <div className="flex items-center gap-2 mb-6">
          <Compass className="text-orange-500" size={24} />
          <h3 className="font-semibold text-lg text-slate-100">Scheme Finder</h3>
        </div>

        <form onSubmit={handleSearchSchemes} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Age (Years)</label>
            <input
              type="number"
              required
              min="1"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 24"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">State</label>
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select State</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Primary Occupation</label>
            <select
              required
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Farmer">Farmer (Agriculturalist)</option>
              <option value="Business">Small Business / Shop Owner</option>
              <option value="Unemployed">Unemployed</option>
              <option value="All">Other / Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Annual Income (INR)</label>
            <input
              type="number"
              required
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 250000"
              className="w-full bg-slate-950/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Gender</label>
            <div className="flex gap-2">
              {["All", "Male", "Female"].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                    gender === g
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/40 border-slate-700/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Search size={16} />
            {loading ? "Matching..." : "Discover Schemes"}
          </button>
        </form>
      </div>

      {/* Results View */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Loading Spinner */}
        {loading && (
          <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-slate-400 text-sm">BharatSathi is cross-referencing your profile with central databases...</p>
          </div>
        )}

        {/* Initial Empty State */}
        {!hasSearched && !loading && (
          <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-700/50">
              <HelpCircle size={32} />
            </div>
            <h4 className="font-semibold text-lg mb-2 text-slate-200">No Search Performed Yet</h4>
            <p className="text-sm text-slate-400 max-w-sm">Fill in your demographics on the left to see matching government schemes and customized step-by-step roadmaps.</p>
          </div>
        )}

        {/* Search Performed & Complete */}
        {hasSearched && !loading && (
          <>
            {/* Matches list */}
            <div>
              <h4 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                Matched Schemes ({matches.length})
              </h4>
              {matches.length === 0 ? (
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center text-slate-400">
                  No exact matches found for this demographic. Try broadening your criteria or search the companion chat.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.map(scheme => (
                    <div key={scheme.id} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-5 hover:border-slate-500/30 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                            {scheme.category}
                          </span>
                          <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Eligible
                          </span>
                        </div>
                        <h5 className="font-semibold text-slate-100 text-sm mb-1">{scheme.name}</h5>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">{scheme.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400">Benefits: <strong className="text-slate-200">{scheme.benefits.substring(0, 20)}...</strong></span>
                        <a 
                          href={scheme.officialLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition-colors"
                        >
                          Official Link <ChevronRight size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Application Roadmap (RAG Output) */}
            {aiRoadmap && (
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-indigo-500/10 text-indigo-400 rounded-bl-xl border-l border-b border-indigo-500/20">
                  <Award size={18} />
                </div>
                <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                  <FileText className="text-orange-500" size={20} />
                  AI Application Roadmap & Advice
                </h4>
                <div className="space-y-2 border-l border-indigo-500/30 pl-4 py-1">
                  {formatRoadmap(aiRoadmap)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
