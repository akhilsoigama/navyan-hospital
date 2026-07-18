// pages/dashboard/rx/RxListPage.tsx
import  { useState, type JSX } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaPrescriptionBottleAlt,
  FaCalendarAlt,
  FaUserMd,
  FaFilter,
  FaDownload,
  FaPrint,
  FaFilePdf,
  FaCheckCircle,
  FaTimesCircle,
  FaClock as FaClockIcon,
  FaTag,
  FaPhoneAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type RxStatus = 'active' | 'completed' | 'expired' | 'cancelled';

type RxRecord = {
  id: string;
  rxNumber: string;
  patientName: string;
  patientId: string;
  mobile: string;
  doctorName: string;
  diagnosis: string;
  medicines: string[];
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: RxStatus;
  notes?: string;
  refills: number;
  refillsUsed: number;
  createdAt: string;
};

// ---------- Mock Data ----------
const mockRx: RxRecord[] = [
  {
    id: '1',
    rxNumber: 'RX-2026-001',
    patientName: 'Kalpesh Desai',
    patientId: 'P1250',
    mobile: '98765 43210',
    doctorName: 'Dr. Ashish Rathod',
    diagnosis: 'Lower Back Pain',
    medicines: ['Paracetamol 500mg', 'Muscle Relaxant'],
    dosage: '1-0-1',
    frequency: 'Twice daily',
    duration: '7 days',
    startDate: '2026-07-15',
    endDate: '2026-07-22',
    status: 'active',
    notes: 'Take with food',
    refills: 2,
    refillsUsed: 0,
    createdAt: '2026-07-15T09:30:00Z',
  },
  {
    id: '2',
    rxNumber: 'RX-2026-002',
    patientName: 'Nirali Trivedi',
    patientId: 'P1249',
    mobile: '98765 43211',
    doctorName: 'Dr. Ashish Rathod',
    diagnosis: 'Knee Pain',
    medicines: ['Ibuprofen 400mg', 'Calcium Tablets'],
    dosage: '1-0-1',
    frequency: 'Twice daily',
    duration: '10 days',
    startDate: '2026-07-10',
    endDate: '2026-07-20',
    status: 'completed',
    refills: 1,
    refillsUsed: 1,
    createdAt: '2026-07-10T10:15:00Z',
  },
  {
    id: '3',
    rxNumber: 'RX-2026-003',
    patientName: 'Haresh Prajapati',
    patientId: 'P1248',
    mobile: '98765 43212',
    doctorName: 'Physio - Dhaval',
    diagnosis: 'Shoulder Injury',
    medicines: ['Diclofenac Gel', 'Vitamin D3'],
    dosage: 'Apply twice daily',
    frequency: 'As needed',
    duration: '14 days',
    startDate: '2026-07-01',
    endDate: '2026-07-15',
    status: 'expired',
    notes: 'Apply on affected area',
    refills: 0,
    refillsUsed: 0,
    createdAt: '2026-07-01T14:20:00Z',
  },
  {
    id: '4',
    rxNumber: 'RX-2026-004',
    patientName: 'Jignesh Patel',
    patientId: 'P1251',
    mobile: '98765 43213',
    doctorName: 'Dr. Ashish Rathod',
    diagnosis: 'Cervical Spondylosis',
    medicines: ['Gabapentin 300mg', 'Methylcobalamin'],
    dosage: '1-0-1',
    frequency: 'Twice daily',
    duration: '15 days',
    startDate: '2026-07-18',
    endDate: '2026-08-02',
    status: 'active',
    notes: 'Avoid driving',
    refills: 2,
    refillsUsed: 0,
    createdAt: '2026-07-18T11:45:00Z',
  },
  {
    id: '5',
    rxNumber: 'RX-2026-005',
    patientName: 'Kajal Shah',
    patientId: 'P1252',
    mobile: '98765 43214',
    doctorName: 'Physio - Kavya',
    diagnosis: 'Frozen Shoulder',
    medicines: ['ACE - 500', 'Anti-inflammatory'],
    dosage: '1-0-0',
    frequency: 'Once daily',
    duration: '7 days',
    startDate: '2026-07-12',
    endDate: '2026-07-19',
    status: 'cancelled',
    refills: 1,
    refillsUsed: 0,
    createdAt: '2026-07-12T16:30:00Z',
  },
  {
    id: '6',
    rxNumber: 'RX-2026-006',
    patientName: 'Ramesh Parmar',
    patientId: 'P1253',
    mobile: '98765 43215',
    doctorName: 'Dr. Ashish Rathod',
    diagnosis: 'Rheumatoid Arthritis',
    medicines: ['Methotrexate', 'Folic Acid', 'Prednisolone'],
    dosage: '1-0-1',
    frequency: 'Twice daily',
    duration: '30 days',
    startDate: '2026-07-05',
    endDate: '2026-08-04',
    status: 'active',
    notes: 'Monitor blood count',
    refills: 3,
    refillsUsed: 0,
    createdAt: '2026-07-05T09:00:00Z',
  },
];

const statusStyle: Record<RxStatus, { bg: string; text: string; icon: JSX.Element; label: string }> = {
  'active': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: <FaCheckCircle className="size-3" />,
    label: 'Active',
  },
  'completed': {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: <FaCheckCircle className="size-3" />,
    label: 'Completed',
  },
  'expired': {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: <FaTimesCircle className="size-3" />,
    label: 'Expired',
  },
  'cancelled': {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    icon: <FaTimesCircle className="size-3" />,
    label: 'Cancelled',
  },
};

const statusOptions = ['All', 'active', 'completed', 'expired', 'cancelled'];

const RxListPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRx, setSelectedRx] = useState<RxRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filtered = mockRx.filter((rx) => {
    const matchSearch =
      rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
      rx.rxNumber.toLowerCase().includes(search.toLowerCase()) ||
      rx.patientId.toLowerCase().includes(search.toLowerCase()) ||
      rx.mobile.includes(search) ||
      rx.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || rx.status === statusFilter;
    const matchDate = !dateFilter || rx.startDate === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  const getStatusDays = (rx: RxRecord) => {
    const today = new Date();
    const endDate = new Date(rx.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalRx = filtered.length;
  const activeRx = filtered.filter(rx => rx.status === 'active').length;
  const expiredRx = filtered.filter(rx => rx.status === 'expired').length;
  const completedRx = filtered.filter(rx => rx.status === 'completed').length;

  return (
    <Page title="RX / Prescriptions">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Prescriptions (RX)</h2>
            <p className="text-sm text-gray-400 mt-1">Manage and track patient prescriptions</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0">
            <FaPlus className="size-3.5" /> New Prescription
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Prescriptions</p>
            <p className="text-2xl font-bold text-gray-800 mt-1.5">{totalRx}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Active</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1.5">{activeRx}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Completed</p>
            <p className="text-2xl font-bold text-blue-600 mt-1.5">{completedRx}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Expired</p>
            <p className="text-2xl font-bold text-red-600 mt-1.5">{expiredRx}</p>
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
                  placeholder="Search by patient, RX number, or doctor..."
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
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="w-1/2 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <input
                      type="date"
                      className="w-1/2 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto p-5 pt-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100/80">
                  <th className="pb-3 font-medium">RX Number</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Doctor</th>
                  <th className="pb-3 font-medium">Medicines</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Refills</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((rx) => {
                    const status = statusStyle[rx.status];
                    const daysLeft = getStatusDays(rx);
                    const isExpiring = daysLeft <= 3 && daysLeft > 0 && rx.status === 'active';
                    
                    return (
                      <tr key={rx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5">
                          <div>
                            <p className="text-gray-800 font-mono text-xs font-medium">{rx.rxNumber}</p>
                            <p className="text-[10px] text-gray-400">{rx.startDate}</p>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div>
                            <p className="text-gray-800 font-medium">{rx.patientName}</p>
                            <p className="text-[10px] text-gray-400 flex items-center gap-1">
                              <FaPhoneAlt className="size-2.5" /> {rx.mobile}
                            </p>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className="text-gray-600 text-xs flex items-center gap-1.5">
                            <FaUserMd className="size-3 text-gray-300" /> {rx.doctorName}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <div>
                            {rx.medicines.slice(0, 2).map((med, idx) => (
                              <p key={idx} className="text-xs text-gray-600">
                                {med}
                              </p>
                            ))}
                            {rx.medicines.length > 2 && (
                              <p className="text-[10px] text-gray-400">+{rx.medicines.length - 2} more</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div>
                            <p className="text-xs text-gray-600">{rx.duration}</p>
                            <p className="text-[10px] text-gray-400">
                              {rx.startDate} to {rx.endDate}
                            </p>
                            {isExpiring && (
                              <p className="text-[10px] text-red-500 flex items-center gap-1">
                                <FaExclamationTriangle className="size-2.5" /> {daysLeft} days left
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${status.bg} ${status.text}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <div className="text-center">
                            <p className="text-xs font-medium text-gray-800">
                              {rx.refillsUsed}/{rx.refills}
                            </p>
                            {rx.refills > rx.refillsUsed && rx.status === 'active' && (
                              <p className="text-[10px] text-emerald-600">Refill available</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                              onClick={() => {
                                setSelectedRx(rx);
                                setShowDetailModal(true);
                              }}
                              title="View"
                            >
                              <FaEye className="size-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all" title="Edit">
                              <FaEdit className="size-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
                              <FaTrash className="size-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all" title="Print">
                              <FaFilePdf className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl text-gray-200">💊</div>
                        <p className="text-gray-400 text-sm font-medium">No prescriptions found</p>
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
              <span className="text-gray-600">{mockRx.length}</span> prescriptions
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-r from-emerald-50/60 to-emerald-50/30 rounded-xl border border-emerald-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100/60 rounded-xl">
                <FaCheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Active Prescriptions</p>
                <p className="text-lg font-bold text-emerald-700">{activeRx}</p>
                <p className="text-[10px] text-gray-400">{Math.round(activeRx/totalRx * 100)}% of total</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50/60 to-amber-50/30 rounded-xl border border-amber-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100/60 rounded-xl">
                <FaClockIcon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Expiring Soon</p>
                <p className="text-lg font-bold text-amber-700">
                  {mockRx.filter(rx => {
                    const days = getStatusDays(rx);
                    return days <= 3 && days > 0 && rx.status === 'active';
                  }).length}
                </p>
                <p className="text-[10px] text-gray-400">In next 3 days</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-blue-50/60 to-blue-50/30 rounded-xl border border-blue-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100/60 rounded-xl">
                <FaPrescriptionBottleAlt className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Refill Available</p>
                <p className="text-lg font-bold text-blue-700">
                  {mockRx.filter(rx => rx.refills > rx.refillsUsed && rx.status === 'active').length}
                </p>
                <p className="text-[10px] text-gray-400">Prescriptions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedRx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100/80 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <FaPrescriptionBottleAlt className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Prescription Details</p>
                    <p className="text-xs text-gray-400 font-mono">{selectedRx.rxNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <FaTimesCircle className="size-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Patient</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedRx.patientName}</p>
                    <p className="text-xs text-gray-400">{selectedRx.patientId}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Contact</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedRx.mobile}</p>
                    <p className="text-xs text-gray-400">{selectedRx.doctorName}</p>
                  </div>
                </div>

                {/* Diagnosis & Medicines */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/60">
                  <p className="text-[10px] text-gray-400 font-medium">Diagnosis</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedRx.diagnosis}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-2">Medicines Prescribed</p>
                  <div className="space-y-2">
                    {selectedRx.medicines.map((med, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                        <div className="size-8 rounded-lg bg-blue-100/60 flex items-center justify-center text-blue-600">
                          <FaTag className="size-3.5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{med}</p>
                          <p className="text-xs text-gray-400">
                            {selectedRx.dosage} • {selectedRx.frequency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Duration</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedRx.duration}</p>
                    <p className="text-xs text-gray-400">
                      {selectedRx.startDate} to {selectedRx.endDate}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-medium">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[selectedRx.status].bg} ${statusStyle[selectedRx.status].text}`}>
                      {statusStyle[selectedRx.status].icon}
                      {statusStyle[selectedRx.status].label}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Refills: {selectedRx.refillsUsed}/{selectedRx.refills}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {selectedRx.notes && (
                  <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100/60">
                    <p className="text-[10px] text-gray-400 font-medium">Notes</p>
                    <p className="text-sm text-gray-700">{selectedRx.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100/80">
                  <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                    <FaFilePdf className="size-4" /> Print
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all">
                    <FaEdit className="size-4" /> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default RxListPage;