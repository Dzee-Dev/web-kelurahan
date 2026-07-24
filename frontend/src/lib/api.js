import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

/**
 * Submit form pengajuan surat dengan dokumen upload
 * @param {FormData} formData
 */
export async function submitPengajuan(formData) {
  const response = await api.post('/api/pengajuan', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Fetch detail/status pengajuan berdasarkan ID
 * @param {string} id
 */
export async function getPengajuanStatus(id) {
  const response = await api.get(`/api/pengajuan/${encodeURIComponent(id)}`);
  return response.data;
}

export default api;
