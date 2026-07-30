'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Home, UserCheck, Clock, CheckCircle2, XCircle, Loader2, Eye, RefreshCw, LogOut } from 'lucide-react';

const STATUS_LABELS = {
  pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-800' },
  processed: { label: 'Diproses', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-800' },
};

const JENIS_ICONS = {
  sktm: FileText,
  domisili: Home,
  kematian: UserCheck,
};

const API_BASE = '/api/proxy';

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', jenis: '' });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      const sessionResponse = await fetch(`${API_BASE}/auth/session`, { cache: 'no-store' });
      if (!sessionResponse.ok) {
        router.replace('/admin');
        return;
      }
      fetchData();
    };
    loadDashboard();
  }, [filter, router]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', '15');
      if (filter.status) params.set('status', filter.status);
      if (filter.jenis) params.set('jenis_surat', filter.jenis);

      const res = await fetch(`${API_BASE}/admin/pengajuan?${params}`);
      const result = await res.json();

      if (result.success) {
        setData(result.data || []);
        setPagination(result.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    if (!confirm(`Ubah status menjadi "${STATUS_LABELS[newStatus].label}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/admin/pengajuan/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        fetchData(pagination.page);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    router.replace('/admin');
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pengajuan surat masuk dari warga</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchData(pagination.page)} className="p-2 rounded-md hover:bg-gray-100 text-gray-500" title="Refresh">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => {
          const count = data.filter(d => d.status === key).length;
          return (
            <div key={key} className="card p-4 cursor-pointer hover:border-gray-300" onClick={() => setFilter(f => ({ ...f, status: f.status === key ? '' : key }))}>
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className={`text-xs font-medium px-2 py-0.5 rounded inline-block mt-1 ${color}`}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filter.status}
          onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
          className="natural-input text-sm"
        >
          <option value="">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="processed">Diproses</option>
          <option value="completed">Selesai</option>
          <option value="rejected">Ditolak</option>
        </select>

        <select
          value={filter.jenis}
          onChange={(e) => setFilter(f => ({ ...f, jenis: e.target.value }))}
          className="natural-input text-sm"
        >
          <option value="">Semua Jenis</option>
          <option value="sktm">SKTM</option>
          <option value="domisili">Domisili</option>
          <option value="kematian">Kematian</option>
        </select>

        <span className="text-sm text-gray-400">
          Total: {pagination.total} pengajuan
        </span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left">
                <th className="px-4 py-3 font-semibold text-gray-600">Tanggal</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Jenis</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Nama Pemohon</th>
                <th className="px-4 py-3 font-semibold text-gray-600">NIK</th>
                <th className="px-4 py-3 font-semibold text-gray-600">No. HP</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    Tidak ada data pengajuan
                  </td>
                </tr>
              ) : (
                data.map((row) => {
                  const statusInfo = STATUS_LABELS[row.status] || STATUS_LABELS.pending;
                  const IconComp = JENIS_ICONS[row.jenis_surat] || FileText;
                  return (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <IconComp className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-700 uppercase text-xs">{row.jenis_surat}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.nama_pemohon}</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.nik_pemohon}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.no_hp}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/dashboard/${row.id}`}
                            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            title="Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {row.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(row.id, 'processed')}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
                              title="Proses"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          {(row.status === 'pending' || row.status === 'processed') && (
                            <>
                              <button
                                onClick={() => updateStatus(row.id, 'completed')}
                                className="p-1.5 rounded hover:bg-green-50 text-green-600"
                                title="Selesai"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(row.id, 'rejected')}
                                className="p-1.5 rounded hover:bg-red-50 text-red-600"
                                title="Tolak"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-500">
              Halaman {pagination.page} dari {pagination.totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => fetchData(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="px-3 py-1 text-sm rounded border border-gray-200 hover:bg-white disabled:opacity-30"
              >
                Prev
              </button>
              <button
                onClick={() => fetchData(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="px-3 py-1 text-sm rounded border border-gray-200 hover:bg-white disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
