// pages/dashboard/advance/AdvanceDetailListPage.tsx
import { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaWallet,
  FaFilter,
  FaDownload,
  FaPrint,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBuilding,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type AdvanceStatus = 'pending' | 'approved' | 'rejected' | 'adjusted';

type AdvanceRecord = {
  id: string;
  receiptNumber: string;
  patientName: string;
  patientId: string;
  mobile: string;
  advanceType: string;
  amount: number;
  date: string;
  center: string;
  paymentMethod: string;
  status: AdvanceStatus;
  adjustedAmount?: number;
  remainingAmount?: number;
  notes?: string;
  createdAt: string;
};

// ---------- Mock Data ----------
const mockAdvances: AdvanceRecord[] = [
  {
    id: 'ADV001',
    receiptNumber: 'ADV-2026-001',
    patientName: 'Kalpesh Desai',
    patientId: 'P1250',
    mobile: '98765 43210',
    advanceType: 'Consultation',
    amount: 1500,
    date: '18-07-2026',
    center: 'Mehsana Center',
    paymentMethod: 'UPI',
    status: 'pending',
    notes: 'Payment for consultation package',
    createdAt: '2026-07-18T09:30:00Z',
  },
  {
    id: 'ADV002',
    receiptNumber: 'ADV-2026-002',
    patientName: 'Nirali Trivedi',
    patientId: 'P1249',
    mobile: '98765 43211',
    advanceType: 'Therapy Session',
    amount: 2500,
    date: '18-07-2026',
    center: 'Ahmedabad Center',
    paymentMethod: 'Cash',
    status: 'approved',
    adjustedAmount: 1500,
    remainingAmount: 1000,
    notes: 'For 5 therapy sessions',
    createdAt: '2026-07-18T10:15:00Z',
  },
  {
    id: 'ADV003',
    receiptNumber: 'ADV-2026-003',
    patientName: 'Haresh Prajapati',
    patientId: 'P1248',
    mobile: '98765 43212',
    advanceType: 'Package',
    amount: 5000,
    date: '17-07-2026',
    center: 'Surat Center',
    paymentMethod: 'Bank Transfer',
    status: 'adjusted',
    adjustedAmount: 5000,
    remainingAmount: 0,
    notes: 'Complete package payment',
    createdAt: '2026-07-17T14:20:00Z',
  },
  {
    id: 'ADV004',
    receiptNumber: 'ADV-2026-004',
    patientName: 'Jignesh Patel',
    patientId: 'P1251',
    mobile: '98765 43213',
    advanceType: 'Medicine',
    amount: 800,
    date: '17-07-2026',
    center: 'Mehsana Center',
    paymentMethod: 'Card',
    status: 'rejected',
    notes: 'Duplicate entry - rejected',
    createdAt: '2026-07-17T11:45:00Z',
  },
  {
    id: 'ADV005',
    receiptNumber: 'ADV-2026-005',
    patientName: 'Kajal Shah',
    patientId: 'P1252',
    mobile: '98765 43214',
    advanceType: 'Consultation',
    amount: 1200,
    date: '16-07-2026',
    center: 'Ahmedabad Center',
    paymentMethod: 'UPI',
    status: 'pending',
    createdAt: '2026-07-16T16:30:00Z',
  },
  {
    id: 'ADV006',
    receiptNumber: 'ADV-2026-006',
    patientName: 'Ramesh Parmar',
    patientId: 'P1253',
    mobile: '98765 43215',
    advanceType: 'Therapy Session',
    amount: 3000,
    date: '16-07-2026',
    center: 'Vadodara Center',
    paymentMethod: 'Cheque',
    status: 'approved',
    adjustedAmount: 1000,
    remainingAmount: 2000,
    notes: 'Partial adjustment done',
    createdAt: '2026-07-16T09:00:00Z',
  },
];

const statusStyle: Record<AdvanceStatus, string> = {
  pending: 'bg-amber-50 text-amber-600',
  approved: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-red-50 text-red-600',
  adjusted: 'bg-blue-50 text-blue-600',
};

const statusOptions = ['All', 'pending', 'approved', 'rejected', 'adjusted'];
const advanceTypes = ['All', 'Consultation', 'Therapy Session', 'Package', 'Medicine', 'Other'];

const AdvanceDetailListPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockAdvances.filter((a) => {
    const matchSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.mobile.replace(' ', '').includes(search.replace(' ', '')) ||
      a.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.patientId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchType = typeFilter === 'All' || a.advanceType === typeFilter;
    const matchDate = !dateFilter || a.date === dateFilter;
    return matchSearch && matchStatus && matchType && matchDate;
  });

  const getStatusIcon = (status: AdvanceStatus) => {
    switch (status) {
      case 'pending': return <FaClock className="size-3" />;
      case 'approved': return <FaCheckCircle className="size-3" />;
      case 'rejected': return <FaTimesCircle className="size-3" />;
      case 'adjusted': return <FaWallet className="size-3" />;
    }
  };

  const totalAmount = filtered.reduce((sum, a) => sum + a.amount, 0);
  const pendingAmount = filtered.filter(a => a.status === 'pending').reduce((sum, a) => sum + a.amount, 0);
  const adjustedAmount = filtered.filter(a => a.status === 'adjusted').reduce((sum, a) => sum + a.amount, 0);

  return (
    <Page title="Advance Detail List">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Advance Details</h2>
            <p className="text-sm text-gray-400 mt-1">Manage and track all patient advance payments</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0">
            <FaPlus className="size-3.5" /> New Advance
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Advance</p>
            <p className="text-2xl font-bold text-gray-800 mt-1.5">₹ {totalAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1.5">₹ {pendingAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Adjusted</p>
            <p className="text-2xl font-bold text-blue-600 mt-1.5">₹ {adjustedAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Records</p>
            <p className="text-2xl font-bold text-gray-800 mt-1.5">{filtered.length}</p>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          <div className="p-5 border-b border-gray-100/80">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by patient, receipt, or ID..."
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <FaFilter className="size-3.5" /> Filters
                </button>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-auto"
                  />
                </div>
                <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  <FaDownload className="size-3.5" /> Export
                </button>
                <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  <FaPrint className="size-3.5" /> Print
                </button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Advance Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    {advanceTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto p-5 pt-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100/80">
                  <th className="pb-3 font-medium">Receipt</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Mobile</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Center</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((a) => (
                    <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5">
                        <div>
                          <p className="text-gray-800 font-mono text-xs font-medium">{a.receiptNumber}</p>
                          <p className="text-[10px] text-gray-400">{a.id}</p>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div>
                          <p className="text-gray-800 font-medium">{a.patientName}</p>
                          <p className="text-[10px] text-gray-400">{a.patientId}</p>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="flex items-center gap-2 text-gray-600 text-xs">
                          <FaPhoneAlt className="size-3 text-gray-300" /> {a.mobile}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-bold text-sm">₹ {a.amount.toLocaleString('en-IN')}</span>
                          {a.adjustedAmount !== undefined && (
                            <span className="text-[10px] text-gray-400">
                              Adjusted: ₹ {a.adjustedAmount.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="text-gray-600 text-xs">{a.date}</span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-gray-600 text-xs">{a.advanceType}</span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-gray-600 text-xs flex items-center gap-1.5">
                          <FaBuilding className="size-3 text-gray-300" /> {a.center}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${statusStyle[a.status]}`}>
                          {getStatusIcon(a.status)}
                          {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="View">
                            <FaEye className="size-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all" title="Edit">
                            <FaEdit className="size-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
                            <FaTrash className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl text-gray-200">💰</div>
                        <p className="text-gray-400 text-sm font-medium">No advance records found</p>
                        <p className="text-gray-300 text-xs">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pt-0 border-t border-gray-100/80">
            <p className="text-xs text-gray-400 font-medium">
              Showing <span className="text-gray-600">{filtered.length}</span> of{" "}
              <span className="text-gray-600">{mockAdvances.length}</span> records
            </p>
            <div className="flex items-center gap-1.5">
              <button className="size-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <FaChevronLeft className="size-3" />
              </button>
              <button className="size-8 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-medium shadow-sm">
                1
              </button>
              <button className="size-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all">
                2
              </button>
              <button className="size-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all">
                3
              </button>
              <button className="size-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <FaChevronRight className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-r from-amber-50/60 to-amber-50/30 rounded-xl border border-amber-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100/60 rounded-xl">
                <FaClock className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Pending for Adjustment</p>
                <p className="text-lg font-bold text-amber-700">₹ {pendingAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-50/60 to-emerald-50/30 rounded-xl border border-emerald-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100/60 rounded-xl">
                <FaCheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Approved Advances</p>
                <p className="text-lg font-bold text-emerald-700">
                  {mockAdvances.filter(a => a.status === 'approved').length} Records
                </p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-blue-50/60 to-blue-50/30 rounded-xl border border-blue-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100/60 rounded-xl">
                <FaWallet className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Fully Adjusted</p>
                <p className="text-lg font-bold text-blue-700">
                  {mockAdvances.filter(a => a.status === 'adjusted').length} Records
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AdvanceDetailListPage;