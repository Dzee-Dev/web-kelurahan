const { toZonedTime } = require('date-fns-tz');
const { getDay, getHours } = require('date-fns');
const { JAM_OPERASIONAL, PESAN_BOT } = require('../config/constants');

/**
 * Cek apakah waktu saat ini berada dalam jam operasional kantor
 */
function isOperationalHours() {
  const now = toZonedTime(new Date(), JAM_OPERASIONAL.TIMEZONE);
  const hour = getHours(now);
  const day = getDay(now);

  const isWorkDay = JAM_OPERASIONAL.HARI_KERJA.includes(day);
  const isWorkHour = hour >= JAM_OPERASIONAL.BUKA && hour < JAM_OPERASIONAL.TUTUP;

  return isWorkDay && isWorkHour;
}

module.exports = { isOperationalHours };
