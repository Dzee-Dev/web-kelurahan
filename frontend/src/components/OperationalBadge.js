'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function OperationalBadge() {
  const [isOperational, setIsOperational] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const checkTime = () => {
      // WIB Timezone (UTC+7)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 3600000 * 7);

      const day = wibDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
      const hours = wibDate.getHours();

      const isWorkDay = day >= 1 && day <= 5;
      const isWorkHour = hours >= 8 && hours < 15;

      setIsOperational(isWorkDay && isWorkHour);

      setCurrentTime(
        wibDate.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };

    checkTime();
    const interval = setInterval(checkTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border glass-panel transition-all">
      <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
      <span className="text-slate-400 hidden sm:inline">{currentTime}</span>
      <span className="text-slate-500 hidden sm:inline">•</span>

      {isOperational ? (
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Buka (08.00 - 15.00)
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <XCircle className="w-3.5 h-3.5 text-amber-400" />
          Tutup Jam Kerja
        </span>
      )}
    </div>
  );
}
