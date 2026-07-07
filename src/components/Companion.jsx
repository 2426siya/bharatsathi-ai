import React, { useState, useRef, useEffect } from 'react';
import { chatWithCompanion } from '../services/aiService';
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, MessageSquare, Bot, User, Shield } from 'lucide-react';

const scanForSensitiveInfo = (text) => {
  const t = text.toLowerCase();
  
  // Regex patterns
  const aadhaarRegex = /\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/;
  const panRegex = /\b[a-z]{5}\d{4}[a-z]\b/i;
  const cardRegex = /\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/;
  const ifscRegex = /\b[a-z]{4}0[a-z0-9]{6}\b/i;
  
  // Keyword triggers
  const keywords = ["cvv", "cvc", "otp", "password", "upi pin", "netbanking", "passcode", "bank account"];
  
  const hasAadhaar = aadhaarRegex.test(text);
  const hasPan = panRegex.test(text);
  const hasCard = cardRegex.test(text);
  const hasIfsc = ifscRegex.test(text);
  const hasKeyword = keywords.some(kw => t.includes(kw));
  
  return hasAadhaar || hasPan || hasCard || hasIfsc || hasKeyword;
};



const QUICK_CHIPS = [
  "How to get a Passport?",
  "Update Aadhaar Address",
  "Scholarships to study abroad",
  "Agriculture Loan process",
  "Register a new business"
];

const LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi', label: 'हिंदी' },
  { code: 'Marathi', label: 'मराठी' },
  { code: 'Tamil', label: 'தமிழ்' },
  { code: 'Bengali', label: 'বাংলা' }
];

export default function Companion() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am BharatSathi AI. I can guide you through government schemes, document application processes, or civic issue reports. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [loading, setLoading] = useState(false);
  
  // Safety states
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  
  // Voice Synthesis & Recognition states
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = selectedLang === 'Hindi' ? 'hi-IN' : selectedLang === 'Marathi' ? 'mr-IN' : 'en-IN';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
      
      recognitionRef.current = rec;
    }
  }, [selectedLang]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const executeSendMessage = async (textToSend) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    // Call AI service layer (offline-resilient demo / live switcher)
    const history = messages.slice(-10); // Keep last 10 messages for context
    const responseText = await chatWithCompanion(
      textToSend, 
      history, 
      selectedLang,
      (err) => {
        alert("Live AI is currently unavailable. Switching to Demo Mode for uninterrupted experience.");
      }
    );

    // Add bot message
    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    if (scanForSensitiveInfo(textToSend)) {
      setPendingMessage(textToSend);
      setShowWarningDialog(true);
    } else {
      executeSendMessage(textToSend);
    }
  };

  // Trigger Speech Recognition
  const toggleSpeechInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Speak Text aloud using SpeechSynthesis
  const speakText = (text, id) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === id) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
      } else {
        window.speechSynthesis.cancel(); // Stop any current speaking
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Pick suitable voice based on language
        if (selectedLang === 'Hindi') utterance.lang = 'hi-IN';
        else if (selectedLang === 'Marathi') utterance.lang = 'mr-IN';
        else utterance.lang = 'en-IN';

        utterance.onend = () => setSpeakingMsgId(null);
        setSpeakingMsgId(id);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // Format bot response for markdown-like text
  const formatResponseText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Bold tags
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Bullet points
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={idx} className="ml-4 list-disc text-slate-200" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
      }
      if (/^\d+\./.test(line)) {
        return <p key={idx} className="my-1 pl-2 text-slate-200 font-semibold" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      return <p key={idx} className="my-1.5 min-h-[1rem] text-slate-300" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white shadow-indigo-500/20 shadow-md avatar-saffron-pulse">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-100">
              BharatSathi Assistant
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-xs text-indigo-300">Your AI Civic Navigator</p>
          </div>
        </div>

        {/* Language Toggles */}
        <div className="flex gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                selectedLang === lang.code
                  ? 'bg-gradient-to-r from-orange-500 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`p-2 rounded-lg text-white ${
                msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-800/80 border border-slate-700/40 avatar-saffron-pulse'
              }`}
            >
              {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div className="space-y-1">
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/40 text-slate-100 rounded-tl-none border border-slate-700/40'
                }`}
              >
                {msg.sender === 'user' ? (
                  <p className="whitespace-pre-line">{msg.text}</p>
                ) : (
                  <div className="space-y-1">{formatResponseText(msg.text)}</div>
                )}
              </div>

              {/* Action buttons under response */}
              <div className={`flex items-center gap-2 text-xs text-slate-400 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => speakText(msg.text, msg.id)}
                    className="p-1 hover:text-indigo-400 transition-colors"
                    title={speakingMsgId === msg.id ? "Stop Reading" : "Read Aloud"}
                  >
                    {speakingMsgId === msg.id ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/40 text-indigo-400 animate-pulse">
              <Sparkles size={18} />
            </div>
            <div className="px-4 py-3 bg-slate-850 rounded-2xl rounded-tl-none border border-slate-700/30 text-sm text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span>BharatSathi is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-2 flex flex-wrap gap-2 justify-center bg-slate-950/20 border-t border-slate-800/50">
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700/60 hover:border-indigo-500/50 text-slate-300 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* AI Safety Shield Card */}
      <div className="mx-4 my-2 p-3 bg-slate-900/10 border border-slate-700/10 rounded-xl flex items-start gap-2.5 text-xs text-slate-500">
        <Shield className="text-indigo-600 shrink-0 mt-0.5" size={16} />
        <div>
          <h5 className="font-bold text-slate-700 flex items-center gap-1.5 mb-0.5">
            AI Safety Shield
          </h5>
          <p className="text-[11px] leading-relaxed">
            For your privacy and security, please avoid sharing sensitive personal information such as Aadhaar numbers, PAN numbers, bank account details, passwords, OTPs, CVV numbers, or UPI PINs.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-4 bg-slate-800/60 border-t border-slate-700/50 flex gap-2 items-center"
        role="search"
      >
        <button
          type="button"
          id="chat-mic-btn"
          aria-label="Toggle speech voice input"
          onClick={toggleSpeechInput}
          className={`p-3 rounded-xl transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
          title={isListening ? "Listening... click to stop" : "Speak to search"}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          id="chat-text-input"
          aria-label="Type message here for chat assistant"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Type your query here (e.g. Passport requirements)..."}
          disabled={loading}
          className="flex-1 bg-slate-950/80 border border-slate-700/50 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <button
          type="submit"
          id="chat-send-btn"
          aria-label="Submit message"
          disabled={!inputText.trim() || loading}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-600 rounded-xl transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Privacy Reminder */}
      <div className="pb-3 text-center text-[10px] text-slate-400">
        Your privacy matters. Please avoid sharing confidential personal information.
      </div>

      {/* Warning Dialog Modal */}
      {showWarningDialog && (
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-orange-500">
              <span className="text-xl">⚠️</span>
              <h4 className="font-bold text-slate-100 text-sm">Sensitive Information Detected</h4>
            </div>
            
            <p className="text-xs text-slate-200 leading-relaxed">
              It looks like your message may contain sensitive personal or financial information.
              <br /><br />
              For your security, BharatSathi AI recommends removing or masking these details before continuing.
              Never share passwords, OTPs, PINs, or banking credentials with any AI assistant.
            </p>
            
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowWarningDialog(false);
                  setPendingMessage('');
                }}
                className="flex-1 py-2 border border-slate-700/60 hover:bg-slate-850 text-slate-100 text-xs font-semibold rounded-lg transition-all"
              >
                Edit Message
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowWarningDialog(false);
                  if (pendingMessage) {
                    executeSendMessage(pendingMessage);
                  }
                }}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all shadow"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
