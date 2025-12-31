
import React, { useState } from 'react';

const PRESET_GREETINGS = [
  "愿二零二六，如星河璀璨，岁岁平安。",
  "岁律更新，星辰同庆，愿所得皆所期。",
  "金晖映雪，瑞气盈门，共赴锦绣年华。",
  "往昔已展千重锦，明朝更进百尺竿。",
  "烟火灿烂，星河入梦，所求皆如愿。",
  "时序轮转，愿生命如金粉般闪耀，岁岁长安。",
  "辞暮尔尔，烟火年年，愿二零二六万事顺遂。",
  "清辉满地，未来可期，愿新的一年胜旧年。"
];

const GeminiGreeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomGreeting = () => {
    setLoading(true);
    // 模拟一个微小的延迟，增加互动感
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PRESET_GREETINGS.length);
      setGreeting(PRESET_GREETINGS[randomIndex]);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center">
      {!greeting ? (
        <button 
          onClick={getRandomGreeting}
          disabled={loading}
          className="group relative px-6 py-2 bg-transparent overflow-hidden border border-[#D4AF37] rounded-full text-[#D4AF37] text-sm uppercase tracking-widest hover:text-black transition-colors duration-500"
        >
          <span className="relative z-10">
            {loading ? "正在开启祝福..." : "获取新年祝福"}
          </span>
          <div className="absolute top-0 left-0 w-0 h-full bg-[#D4AF37] group-hover:w-full transition-all duration-300 -z-0"></div>
        </button>
      ) : (
        <div className="max-w-md animate-fade-in text-center px-4">
          <p className="font-serif-elegant italic text-xl md:text-2xl text-[#E5C100] tracking-wide drop-shadow-sm leading-relaxed">
            “{greeting}”
          </p>
          <button 
            onClick={() => setGreeting(null)}
            className="mt-4 text-[10px] uppercase tracking-widest text-[#8A6D3B] hover:text-[#D4AF37] transition-colors"
          >
            再次获取
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiGreeting;
