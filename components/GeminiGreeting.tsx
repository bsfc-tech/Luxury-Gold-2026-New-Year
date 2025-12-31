
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const GeminiGreeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGreeting = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Give me a very short, poetic, and elegant 1-sentence New Year's blessing for 2026 in Chinese. It should be classy and fit a black/gold aesthetic.",
      });
      setGreeting(response.text || "愿二零二六，如星河璀璨，岁岁长安。");
    } catch (error) {
      console.error("AI Error:", error);
      setGreeting("岁律更新，星辰同庆。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!greeting ? (
        <button 
          onClick={fetchGreeting}
          disabled={loading}
          className="group relative px-6 py-2 bg-transparent overflow-hidden border border-[#D4AF37] rounded-full text-[#D4AF37] text-sm uppercase tracking-widest hover:text-black transition-colors duration-500"
        >
          <span className="relative z-10">
            {loading ? "Generating Blessing..." : "Get AI Blessing"}
          </span>
          <div className="absolute top-0 left-0 w-0 h-full bg-[#D4AF37] group-hover:w-full transition-all duration-300 -z-0"></div>
        </button>
      ) : (
        <div className="max-w-md animate-fade-in text-center">
          <p className="font-serif-elegant italic text-xl md:text-2xl text-[#E5C100] tracking-wide drop-shadow-sm">
            "{greeting}"
          </p>
          <button 
            onClick={() => setGreeting(null)}
            className="mt-4 text-[10px] uppercase tracking-widest text-[#8A6D3B] hover:text-[#D4AF37] transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiGreeting;
