// pages/dashboard/basic/BasicDetailListPage.tsx
import { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaPhoneAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaPrint,
  FaUserMd,
  FaVenusMars,
  FaBirthdayCake,
  FaTint,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBuilding,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type PatientStatus = 'active' | 'inactive' | 'blocked';

type PatientRecord = {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  mobile: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  bloodGroup?: string;
  occupation?: string;
  maritalStatus?: string;
  status: PatientStatus;
  lastVisit?: string;
  totalVisits: number;
  createdAt: string;
  emergencyContact?: string;
};

// ---------- Mock Data ----------
const mockPatients: PatientRecord[] = [
  {
    id: '1',
    patientId: 'P1250',
    firstName: 'Kalpesh',
    lastName: 'Desai',
    fullName: 'Kalpesh Desai',
    gender: 'Male',
    dateOfBirth: '1992-05-15',
    age: 34,
    mobile: '98765 43210',
    email: 'kalpesh.desai@example.com',
    address: '12, Shivam Society, Mehsana',
    city: 'Mehsana',
    state: 'Gujarat',
    pincode: '384001',
    bloodGroup: 'B+',
    occupation: 'Businessman',
    maritalStatus: 'Married',
    status: 'active',
    lastVisit: '18-07-2026',
    totalVisits: 12,
    createdAt: '2025-01-15T10:30:00Z',
    emergencyContact: '98765 43211',
  },
  {
    id: '2',
    patientId: 'P1249',
    firstName: 'Nirali',
    lastName: 'Trivedi',
    fullName: 'Nirali Trivedi',
    gender: 'Female',
    dateOfBirth: '1998-08-22',
    age: 28,
    mobile: '98765 43211',
    email: 'nirali.trivedi@example.com',
    address: '45, Green Park, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    bloodGroup: 'O+',
    occupation: 'Software Engineer',
    maritalStatus: 'Single',
    status: 'active',
    lastVisit: '17-07-2026',
    totalVisits: 8,
    createdAt: '2025-03-20T14:45:00Z',
    emergencyContact: '98765 43212',
  },
  {
    id: '3',
    patientId: 'P1248',
    firstName: 'Haresh',
    lastName: 'Prajapati',
    fullName: 'Haresh Prajapati',
    gender: 'Male',
    dateOfBirth: '1981-11-10',
    age: 45,
    mobile: '98765 43212',
    email: 'haresh.prajapati@example.com',
    address: '7, Station Road, Surat',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395003',
    bloodGroup: 'A+',
    occupation: 'Teacher',
    maritalStatus: 'Married',
    status: 'active',
    lastVisit: '16-07-2026',
    totalVisits: 15,
    createdAt: '2024-11-05T09:15:00Z',
    emergencyContact: '98765 43213',
  },
  {
    id: '4',
    patientId: 'P1247',
    firstName: 'Jignesh',
    lastName: 'Patel',
    fullName: 'Jignesh Patel',
    gender: 'Male',
    dateOfBirth: '1990-03-25',
    age: 36,
    mobile: '98765 43213',
    email: 'jignesh.patel@example.com',
    address: '89, Lake View, Vadodara',
    city: 'Vadodara',
    state: 'Gujarat',
    pincode: '390001',
    bloodGroup: 'AB+',
    occupation: 'Doctor',
    maritalStatus: 'Married',
    status: 'inactive',
    lastVisit: '10-06-2026',
    totalVisits: 5,
    createdAt: '2025-06-12T11:20:00Z',
    emergencyContact: '98765 43214',
  },
  {
    id: '5',
    patientId: 'P1246',
    firstName: 'Kajal',
    lastName: 'Shah',
    fullName: 'Kajal Shah',
    gender: 'Female',
    dateOfBirth: '1995-07-18',
    age: 31,
    mobile: '98765 43214',
    email: 'kajal.shah@example.com',
    address: '34, Sunrise Apartments, Rajkot',
    city: 'Rajkot',
    state: 'Gujarat',
    pincode: '360001',
    bloodGroup: 'B-',
    occupation: 'Banker',
    maritalStatus: 'Single',
    status: 'active',
    lastVisit: '15-07-2026',
    totalVisits: 6,
    createdAt: '2025-08-01T16:00:00Z',
    emergencyContact: '98765 43215',
  },
  {
    id: '6',
    patientId: 'P1245',
    firstName: 'Ramesh',
    lastName: 'Parmar',
    fullName: 'Ramesh Parmar',
    gender: 'Male',
    dateOfBirth: '1978-12-30',
    age: 47,
    mobile: '98765 43215',
    email: 'ramesh.parmar@example.com',
    address: '56, Gandhi Nagar, Bhavnagar',
    city: 'Bhavnagar',
    state: 'Gujarat',
    pincode: '364001',
    bloodGroup: 'O-',
    occupation: 'Retired',
    maritalStatus: 'Married',
    status: 'blocked',
    totalVisits: 3,
    createdAt: '2025-09-20T08:45:00Z',
    emergencyContact: '98765 43216',
  },
];

const statusStyle: Record<PatientStatus, string> = {
  active: 'bg-emerald-50 text-emerald-600',
  inactive: 'bg-gray-50 text-gray-600',
  blocked: 'bg-red-50 text-red-600',
};

const statusOptions = ['All', 'active', 'inactive', 'blocked'];
const genderOptions = ['All', 'Male', 'Female', 'Other'];
const cityOptions = ['All', 'Mehsana', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'];

const BasicDetailListPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockPatients.filter((p) => {
    const matchSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.replace(' ', '').includes(search.replace(' ', '')) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      (p.email && p.email.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchGender = genderFilter === 'All' || p.gender === genderFilter;
    const matchCity = cityFilter === 'All' || p.city === cityFilter;
    const matchDate = !dateFilter || p.createdAt.includes(dateFilter);
    return matchSearch && matchStatus && matchGender && matchCity && matchDate;
  });

  const getStatusIcon = (status: PatientStatus) => {
    switch (status) {
      case 'active': return <FaCheckCircle className="size-3" />;
      case 'inactive': return <FaClock className="size-3" />;
      case 'blocked': return <FaTimesCircle className="size-3" />;
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'Male': return '♂';
      case 'Female': return '♀';
      default: return '⚧';
    }
  };

  const activeCount = mockPatients.filter(p => p.status === 'active').length;
  const inactiveCount = mockPatients.filter(p => p.status === 'inactive').length;
  const blockedCount = mockPatients.filter(p => p.status === 'blocked').length;

  return (
    <Page title="Basic Detail List">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Records</h2>
            <p className="text-sm text-gray-400 mt-1">Manage and view all registered patients</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0">
            <FaPlus className="size-3.5" /> New Patient
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Patients</p>
            <p className="text-2xl font-bold text-gray-800 mt-1.5">{mockPatients.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Active</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1.5">{activeCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Inactive</p>
            <p className="text-2xl font-bold text-gray-600 mt-1.5">{inactiveCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Blocked</p>
            <p className="text-2xl font-bold text-red-600 mt-1.5">{blockedCount}</p>
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
                  placeholder="Search by name, mobile, ID, or email..."
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
              <div className="mt-4 pt-4 border-t border-gray-100/80 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Gender</label>
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    {genderOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    {cityOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
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
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Demographics</th>
                  <th className="pb-3 font-medium">Address</th>
                  <th className="pb-3 font-medium">Visits</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-blue-50/50 flex items-center justify-center shrink-0">
                            <FaUserCircle className="size-6 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">{p.fullName}</p>
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide">{p.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div>
                          <span className="flex items-center gap-2 text-gray-600 text-xs">
                            <FaPhoneAlt className="size-3 text-gray-300" /> {p.mobile}
                          </span>
                          {p.email && (
                            <span className="flex items-center gap-2 text-gray-400 text-[10px] mt-1">
                              <FaEnvelope className="size-3" /> {p.email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div>
                          <span className="text-gray-600 text-xs flex items-center gap-1.5">
                            <FaVenusMars className="size-3 text-gray-300" /> {p.gender} {getGenderIcon(p.gender)}
                          </span>
                          <span className="text-gray-400 text-[10px] flex items-center gap-1.5 mt-1">
                            <FaBirthdayCake className="size-3" /> {p.age} years
                          </span>
                          {p.bloodGroup && (
                            <span className="text-gray-400 text-[10px] flex items-center gap-1.5 mt-1">
                              <FaTint className="size-3" /> {p.bloodGroup}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div>
                          <span className="text-gray-600 text-xs flex items-center gap-1.5">
                            <FaMapMarkerAlt className="size-3 text-gray-300" /> {p.city}
                          </span>
                          <span className="text-gray-400 text-[10px]">{p.state}</span>
                          {p.pincode && (
                            <span className="text-gray-400 text-[10px] block">- {p.pincode}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div>
                          <span className="text-gray-800 font-medium text-sm">{p.totalVisits}</span>
                          {p.lastVisit && (
                            <span className="text-gray-400 text-[10px] block">Last: {p.lastVisit}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${statusStyle[p.status]}`}>
                          {getStatusIcon(p.status)}
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
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
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl text-gray-200">👤</div>
                        <p className="text-gray-400 text-sm font-medium">No patients found</p>
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
              <span className="text-gray-600">{mockPatients.length}</span> patients
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-r from-blue-50/60 to-blue-50/30 rounded-xl border border-blue-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100/60 rounded-xl">
                <FaUserMd className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Most Visits</p>
                <p className="text-sm font-bold text-blue-700">{mockPatients.reduce((max, p) => p.totalVisits > max.totalVisits ? p : max).fullName}</p>
                <p className="text-[10px] text-gray-400">{mockPatients.reduce((max, p) => p.totalVisits > max.totalVisits ? p : max).totalVisits} visits</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-50/60 to-emerald-50/30 rounded-xl border border-emerald-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100/60 rounded-xl">
                <FaCheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Active Patients</p>
                <p className="text-lg font-bold text-emerald-700">{activeCount}</p>
                <p className="text-[10px] text-gray-400">{Math.round(activeCount/mockPatients.length * 100)}% of total</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-purple-50/60 to-purple-50/30 rounded-xl border border-purple-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100/60 rounded-xl">
                <FaVenusMars className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Gender Ratio</p>
                <p className="text-sm font-bold text-purple-700">
                  ♂ {mockPatients.filter(p => p.gender === 'Male').length} : ♀ {mockPatients.filter(p => p.gender === 'Female').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50/60 to-amber-50/30 rounded-xl border border-amber-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100/60 rounded-xl">
                <FaBuilding className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Top City</p>
                <p className="text-sm font-bold text-amber-700">
                  {mockPatients.reduce((max, p) => {
                    const count = mockPatients.filter(x => x.city === p.city).length;
                    return count > (max.count || 0) ? { city: p.city, count } : max;
                  }, { city: '', count: 0 }).city}
                </p>
                <p className="text-[10px] text-gray-400">
                  {mockPatients.filter(p => p.city === mockPatients.reduce((max, p) => {
                    const count = mockPatients.filter(x => x.city === p.city).length;
                    return count > (max.count || 0) ? { city: p.city, count } : max;
                  }, { city: '', count: 0 }).city).length} patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BasicDetailListPage;