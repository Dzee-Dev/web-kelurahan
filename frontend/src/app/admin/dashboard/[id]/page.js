'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, ExternalLink, Clock, CheckCircle2, XCircle, User, MapPin, Phone, Calendar, Briefcase } from 'lucide-react';

const STATUS_LABELS = {
  pending: { label: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processed: { label: 'Sedang Diproses', color: 'bg-blue-100 text-blue-800', icon: Clock },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const LABEL_JENIS_SURAT = {
  sktm: 'Surat Keterangan Tidak Mampu (SKTM)',
  domisili: 'Surat Keterangan Domisili',
  kematian: 'Surat Keterangan Kematian',
};

const API_BASE = '/api/proxy';

export default function AdminDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      const sessionResponse = await fetch(`${API_BASE}/auth/session`, { cache: 'no-store' });
      if (!sessionResponse.ok) {
        router.replace('/admin');
        return;
      }
      fetchDetail();
    };
    loadDetail();
  }, [params.id, router]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/pengajuan/${params.id}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Fetch detail error:', err);
    }
    setLoading(false);
  };

  const updateStatus = async (newStatus) => {
    if (!confirm(`Ubah status menjadi "${STATUS_LABELS[newStatus].label}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/admin/pengajuan/${params.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) fetchDetail();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-400">
        Memuat detail pengajuan...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Pengajuan tidak ditemukan.</p>
        <Link href="/admin/dashboard" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
          ← Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[data.status] || STATUS_LABELS.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/dashboard" className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Detail Pengajuan</h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{data.id}</p>
        </div>
        <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${statusInfo.color}`}>
          <StatusIcon className="w-4 h-4" />
          {statusInfo.label}
        </span>
      </div>

      {/* Info Card */}
      <div className="card p-6 space-y-6">

        {/* Jenis Surat */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-700" />
            {LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Diajukan pada {new Date(data.created_at).toLocaleDateString('id-ID', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta'
            })} WIB
          </p>
        </div>

        <hr className="border-gray-100" />

        {/* Data Pemohon */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" /> Data Pemohon
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Nama Lengkap</span>
              <p className="font-medium text-gray-900">{data.nama_pemohon}</p>
            </div>
            <div>
              <span className="text-gray-500">NIK</span>
              <p className="font-mono text-gray-900">{data.nik_pemohon}</p>
            </div>
            <div>
              <span className="text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> No. HP</span>
              <p className="text-gray-900">{data.no_hp}</p>
            </div>
            <div>
              <span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Alamat</span>
              <p className="text-gray-900">{data.alamat_lengkap}</p>
            </div>
          </div>
        </div>

        {/* Data Pribadi */}
        {data.data_pribadi && (
          <>
            <hr className="border-gray-100" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Data Pribadi
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {data.data_pribadi.tempat_lahir && (
                  <div>
                    <span className="text-gray-500">Tempat, Tanggal Lahir</span>
                    <p className="text-gray-900">{data.data_pribadi.tempat_lahir}, {data.data_pribadi.tanggal_lahir}</p>
                  </div>
                )}
                {data.data_pribadi.jenis_kelamin && (
                  <div>
                    <span className="text-gray-500">Jenis Kelamin</span>
                    <p className="text-gray-900 capitalize">{data.data_pribadi.jenis_kelamin}</p>
                  </div>
                )}
                {data.data_pribadi.agama && (
                  <div>
                    <span className="text-gray-500">Agama</span>
                    <p className="text-gray-900">{data.data_pribadi.agama}</p>
                  </div>
                )}
                {data.data_pribadi.pekerjaan && (
                  <div>
                    <span className="text-gray-500 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Pekerjaan</span>
                    <p className="text-gray-900">{data.data_pribadi.pekerjaan}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Dokumen */}
        {data.dokumen_urls && Object.keys(data.dokumen_urls).length > 0 && (
          <>
            <hr className="border-gray-100" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">📎 Dokumen Terlampir</h3>
              <div className="space-y-2">
                {Object.entries(data.dokumen_urls).map(([key, val]) => {
                  const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                  const downloadUrl = `${API_BASE}/admin/pengajuan/${params.id}/dokumen/${encodeURIComponent(key)}`;
                  return (
                    <a
                      key={key}
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {key.includes('pdf') ? (
                        <Download className="w-4 h-4 text-red-500" />
                      ) : (
                        <ExternalLink className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <span className="ml-auto text-xs text-gray-400">Buka</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {(data.status === 'pending' || data.status === 'processed') && (
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ubah Status Pengajuan</h3>
          <div className="flex flex-wrap gap-2">
            {data.status === 'pending' && (
              <button onClick={() => updateStatus('processed')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Clock className="w-4 h-4" /> Proses
              </button>
            )}
            <button onClick={() => updateStatus('completed')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Selesaikan
            </button>
            <button onClick={() => updateStatus('rejected')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <XCircle className="w-4 h-4" /> Tolak
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
