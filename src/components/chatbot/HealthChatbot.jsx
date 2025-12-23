import { useState, useRef, useEffect } from 'react';
import { useHealthData } from '../../hooks/useHealthData';
import { LABELS, DISCLAIMERS } from '../../utils/constants';
import { Send, Bot, User } from 'lucide-react';
import AIInsightEngine from '../../utils/AIInsightEngine';

const HealthChatbot = () => {
    const { healthRecords } = useHealthData();
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: 'Halo! Saya adalah asisten kesehatan AI Anda. Saya dapat membantu Anda memahami data kesehatan Anda dan memberikan rekomendasi gaya hidup sehat. Silakan tanyakan apa saja tentang tidur, aktivitas, stres, atau kesehatan umum Anda!',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            type: 'user',
            text: inputMessage,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const botResponse = AIInsightEngine.generateChatbotResponse(
                inputMessage,
                healthRecords
            );

            const botMessage = {
                type: 'bot',
                text: botResponse,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedQuestions = [
        'Bagaimana kualitas tidur saya?',
        'Apakah tingkat stres saya normal?',
        'Berikan tips untuk meningkatkan aktivitas fisik',
        'Bagaimana pola kesehatan saya secara keseluruhan?',
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="card p-0 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-full">
                            <Bot className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {LABELS.chatWithAI}
                            </h2>
                            <p className="text-white/80 text-sm">
                                Tanya tentang kesehatan Anda berdasarkan data yang tersimpan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                        {DISCLAIMERS.chatbot}
                    </p>
                </div>

                {/* Messages */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                }`}
                        >
                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'bot'
                                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500'
                                        : 'bg-gray-300 dark:bg-gray-700'
                                    }`}
                            >
                                {message.type === 'bot' ? (
                                    <Bot className="w-5 h-5 text-white" />
                                ) : (
                                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                )}
                            </div>
                            <div
                                className={`flex-1 max-w-[70%] ${message.type === 'user' ? 'text-right' : ''
                                    }`}
                            >
                                <div
                                    className={`inline-block p-4 rounded-2xl ${message.type === 'bot'
                                            ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {message.timestamp.toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions (only show if few messages) */}
                {messages.length <= 2 && (
                    <div className="px-6 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Pertanyaan yang sering diajukan:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputMessage(question)}
                                    className="text-xs px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-end space-x-2">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={LABELS.chatPlaceholder}
                            className="flex-1 input-field resize-none"
                            rows="2"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputMessage.trim() || isTyping}
                            className="btn btn-primary p-3 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthChatbot;
