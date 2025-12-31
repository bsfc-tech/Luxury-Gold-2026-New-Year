
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6">
      <div className="text-3xl md:text-5xl font-light tracking-tighter tabular-nums text-[#D4AF37]">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1 text-[#8A6D3B] font-semibold">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center backdrop-blur-sm bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-xl md:text-3xl opacity-20">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-xl md:text-3xl opacity-20">:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="text-xl md:text-3xl opacity-20">:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
