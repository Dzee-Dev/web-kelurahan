export const ADMIN_WHATSAPP_NUMBER = '6285287434646';
export const ADMIN_WHATSAPP_DISPLAY = '0852-8743-4646';

const COMPLAINT_MESSAGE = `*PENGADUAN MASYARAKAT - KELURAHAN MESJID PRIYAYI*

Nama:
Alamat:
Isi Pengaduan:
Lokasi Kejadian:
Waktu Kejadian:

Mohon ditindaklanjuti. Terima kasih.`;

export const COMPLAINT_WHATSAPP_URL = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(COMPLAINT_MESSAGE)}`;
