'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OperationalBadge() {
  const [isOperational, setIsOperational] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 3600000 * 7);

      const day = wibDate.getDay();
      const hours = wibDate.getHours();

      const isWorkDay = day >= 1 && day <= 5;
      const isWorkHour = hours >= 8 && hours < 15;

      setIsOperational(isWorkDay && isWorkHour);

      setCurrentTime(
        wibDate.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB'
      );
    };

    checkTime();
    const interval = setInterval(checkTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700">
      <Clock className="w-3.5 h-3.5 text-slate-500" />
      <span className="font-mono text-slate-600 hidden sm:inline">{currentTime}</span>
      <span className="text-slate-300 hidden sm:inline">•</span>

      {isOperational ? (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Buka Layanan (08.00 - 15.00)
        </span>
      ) : (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          Luar Jam Operasional
        </span>
      )}
    </div>
  );
}
