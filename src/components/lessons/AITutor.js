'use client';

import React, { useState } from 'react';
import { askTutorAction } from '@/server-actions/ai.actions';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AITutor({ contextTopic }) {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([
        { role: 'ai', content: `Hello! I'm your AI Learning Assistant. Have a question about "${contextTopic}"? Ask me anything!` }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        if (!message.trim()) return;

        const question = message.trim();
        setMessage('');
        
        // Add user question to history
        setHistory(prev => [...prev, { role: 'user', content: question }]);
        setIsLoading(true);

        const res = await askTutorAction(question, contextTopic);
        
        // Add AI response to history
        setHistory(prev => [...prev, { 
            role: 'ai', 
            content: res.success ? res.answer : "I encountered an error trying to process that." 
        }]);
        
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-800/40 border border-white/5 rounded-2xl flex flex-col h-[500px] overflow-hidden">
            <div className="bg-blue-600/20 px-6 py-4 border-b border-blue-500/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        AI Learning Assistant <Sparkles className="w-4 h-4 text-yellow-400" />
                    </h3>
                    <p className="text-xs text-blue-200">Always available to help</p>
                </div>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
                {history.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`
                            max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed
                            ${msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                                : 'bg-gray-900/80 text-gray-200 border border-white/5 rounded-tl-sm shadow-inner'
                            }
                        `}>
                            {msg.content}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold px-1">
                            {msg.role === 'user' ? 'You' : 'AI Tutor'}
                        </span>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex flex-col items-start">
                        <div className="bg-gray-900/80 border border-white/5 text-gray-400 rounded-2xl rounded-tl-sm px-5 py-3 shadow-inner flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/5 bg-gray-900/50">
                <form 
                    onSubmit={handleAsk}
                    className="flex items-center gap-2 bg-gray-800 border border-white/10 rounded-xl p-1 pr-2 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask a question about the lesson..."
                        className="flex-grow bg-transparent border-none text-white text-sm outline-none px-4 py-2 placeholder:text-gray-500"
                    />
                    <button 
                        type="submit"
                        disabled={!message.trim() || isLoading}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
