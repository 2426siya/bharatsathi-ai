import React, { useState } from 'react';
import Companion from './components/Companion';
import Schemes from './components/Schemes';
import Grievance from './components/Grievance';
import Checklist from './components/Checklist';
import FormHelper from './components/FormHelper';
import Summarizer from './components/Summarizer';
import { 
  Bot, 
  Search, 
  FileText, 
  FileCheck2, 
  LayoutDashboard, 
  HelpCircle,
  AlertTriangle,
  Github,
  CheckCircle,
  Users,
  Building,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Check if API Key is configured
  const apiKeySet = import.meta.env.VITE_GEMINI_API_KEY && 
                    import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here';

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'companion':
        return <Companion />;
      case 'schemes':
        return <Schemes />;
      case 'grievance':
        return <Grievance />;
      case 'checklist':
        return <Checklist />;
      case 'formhelper':
        return <FormHelper />;
      case 'summarizer':
        return <Summarizer />;
      default:
        return renderDashboard();
    }
  };


  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/40 to-slate-900/80 border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-[10px] font-extrabold px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full tracking-widest uppercase">
            National Civic Initiative
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Empowering Citizens with <span className="gradient-text">Generative AI</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            BharatSathi AI bridges the gap between complex civic systems and everyday citizens. Our multilingual, voice-enabled assistant simplifies scheme eligibility, drafts official grievances, and details service document requirements in seconds.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('companion')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/10"
            >
              Start Chatting
            </button>
            <button 
              onClick={() => setActiveTab('schemes')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all"
            >
              Find Schemes
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-6 flex items-center gap-4 hover:border-slate-600/50 transition-all">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Citizen Queries Assisted</span>
            <h4 className="text-2xl font-bold text-slate-100 mt-0.5">14,289+</h4>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-6 flex items-center gap-4 hover:border-slate-600/50 transition-all">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Scheme Recommendations</span>
            <h4 className="text-2xl font-bold text-slate-100 mt-0.5">8,452+</h4>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-6 flex items-center gap-4 hover:border-slate-600/50 transition-all">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Building size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Grievance Resolutions (Mock)</span>
            <h4 className="text-2xl font-bold text-slate-100 mt-0.5">98.4% Rate</h4>
          </div>
        </div>
      </div>

      {/* Feature Grid Quick access */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-200">Civic Services Portal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => setActiveTab('companion')}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer hover:border-indigo-500/40 hover:bg-slate-800/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-600/10 text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Bot size={20} />
              </div>
              <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">Voice & Multilingual</span>
            </div>
            <h4 className="font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">BharatSathi Chatbot</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Chat with our intelligent bot in 5+ Indian languages to simplify legal forms, passport details, or regional scheme rules.</p>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setActiveTab('schemes')}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer hover:border-orange-500/40 hover:bg-slate-800/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-orange-600/10 text-orange-400 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Search size={20} />
              </div>
              <span className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 uppercase">Personalized Engine</span>
            </div>
            <h4 className="font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">Scheme Recommendation</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Enter your demographic profile (Age, State, Income) to match with active welfare initiatives and construct custom application roadmaps.</p>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setActiveTab('grievance')}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer hover:border-purple-500/40 hover:bg-slate-800/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-600/10 text-purple-400 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                <FileText size={20} />
              </div>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">Letter Draft Generator</span>
            </div>
            <h4 className="font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">Grievance Desk</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Submit street, electricity, or water complaints in plain English and automatically draft official letters in English, Hindi, and Marathi.</p>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => setActiveTab('checklist')}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer hover:border-emerald-500/40 hover:bg-slate-800/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-emerald-600/10 text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <FileCheck2 size={20} />
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Document Advisor</span>
            </div>
            <h4 className="font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">Document Eligibility</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Verify document requirements for key services like Passport, PAN card, and Driving License, with detailed explanations for each.</p>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-4 md:px-8 py-6 gap-8">
      {/* Top Banner Warning if Offline */}
      {!apiKeySet && (
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span><strong>Offline Demo Mode Active:</strong> To unlock real-time Gemini LLM generations, add your <code>VITE_GEMINI_API_KEY</code> to the <code>.env</code> file or environment variables.</span>
          </div>
          <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline font-semibold text-[10px] uppercase shrink-0">Get Free Key</a>
        </div>
      )}

      {/* Main Header / Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 backdrop-blur-md border border-slate-850 p-5 rounded-2xl gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇮🇳</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight font-sans text-slate-100 flex items-center gap-1.5">
              BharatSathi <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest font-extrabold">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider">Smart Bharat Civic Companion</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
            { id: 'companion', label: 'AI Chatbot', icon: <Bot size={14} /> },
            { id: 'schemes', label: 'Scheme Finder', icon: <Search size={14} /> },
            { id: 'grievance', label: 'Grievance Desk', icon: <FileText size={14} /> },
            { id: 'checklist', label: 'Doc Guide', icon: <FileCheck2 size={14} /> },
            { id: 'formhelper', label: 'Form Helper', icon: <FileText size={14} /> },
            { id: 'summarizer', label: 'AI Tools', icon: <Sparkles size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/30 border-t border-slate-850 py-6 px-4 rounded-xl text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <span>© 2026 BharatSathi AI. Developed for <strong>PromptWars Hackathon</strong> by team Devengers.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            <Github size={14} />
            <span>GitHub Code</span>
          </a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300 transition-colors">Submit Portal</a>
        </div>
      </footer>
    </div>
  );
}
