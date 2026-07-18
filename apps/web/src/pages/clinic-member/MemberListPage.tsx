import { useState, type ChangeEvent } from 'react';
import Page from '../../section/Page';

type Member = {
  id: number;
  memberId: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  maritalStatus: string;
  mobileNumber: string;
  alternateMobile: string;
  emailAddress: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  role: string;
  designation: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  shift: string;
  username: string;
  emailLoginId: string;
  status: 'active' | 'inactive';
  profileImage: string;
};

const MemberListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Static member data
  const members: Member[] = [
    {
      id: 1,
      memberId: 'MEM-2026-001',
      fullName: 'Dr. Rajesh Patel',
      gender: 'Male',
      dateOfBirth: '1985-03-15',
      bloodGroup: 'A+',
      maritalStatus: 'Married',
      mobileNumber: '9876543210',
      alternateMobile: '9876543211',
      emailAddress: 'rajesh.patel@hospital.com',
      address: '123, Doctor Colony, Ahmedabad',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      pinCode: '380001',
      role: 'Doctor',
      designation: 'Senior Cardiologist',
      qualification: 'MD, DM Cardiology',
      experience: 12,
      joiningDate: '2018-06-01',
      shift: 'Morning (6 AM - 2 PM)',
      username: 'rajesh.patel',
      emailLoginId: 'rajesh.patel@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Rajesh+Patel&background=4F46E5&color=fff&size=100'
    },
    {
      id: 2,
      memberId: 'MEM-2026-002',
      fullName: 'Dr. Priya Sharma',
      gender: 'Female',
      dateOfBirth: '1988-07-22',
      bloodGroup: 'B+',
      maritalStatus: 'Single',
      mobileNumber: '9876543220',
      alternateMobile: '9876543221',
      emailAddress: 'priya.sharma@hospital.com',
      address: '45, Green Park, Surat',
      city: 'Surat',
      state: 'Gujarat',
      country: 'India',
      pinCode: '395001',
      role: 'Doctor',
      designation: 'Neurologist',
      qualification: 'MD, DM Neurology',
      experience: 8,
      joiningDate: '2019-08-15',
      shift: 'Evening (2 PM - 10 PM)',
      username: 'priya.sharma',
      emailLoginId: 'priya.sharma@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=EC4899&color=fff&size=100'
    },
    {
      id: 3,
      memberId: 'MEM-2026-003',
      fullName: 'Nurse Meena Patel',
      gender: 'Female',
      dateOfBirth: '1990-11-05',
      bloodGroup: 'O+',
      maritalStatus: 'Married',
      mobileNumber: '9876543230',
      alternateMobile: '9876543231',
      emailAddress: 'meena.patel@hospital.com',
      address: '78, Nurses Colony, Vadodara',
      city: 'Vadodara',
      state: 'Gujarat',
      country: 'India',
      pinCode: '390001',
      role: 'Nurse',
      designation: 'Senior Staff Nurse',
      qualification: 'B.Sc Nursing',
      experience: 6,
      joiningDate: '2020-01-10',
      shift: 'Night (10 PM - 6 AM)',
      username: 'meena.patel',
      emailLoginId: 'meena.patel@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Meena+Patel&background=22C55E&color=fff&size=100'
    },
    {
      id: 4,
      memberId: 'MEM-2026-004',
      fullName: 'Rahul Kumar',
      gender: 'Male',
      dateOfBirth: '1992-09-18',
      bloodGroup: 'AB+',
      maritalStatus: 'Single',
      mobileNumber: '9876543240',
      alternateMobile: '9876543241',
      emailAddress: 'rahul.kumar@hospital.com',
      address: '56, Lab Complex, Rajkot',
      city: 'Rajkot',
      state: 'Gujarat',
      country: 'India',
      pinCode: '360001',
      role: 'Lab Technician',
      designation: 'Senior Lab Technician',
      qualification: 'B.Sc Medical Lab Technology',
      experience: 5,
      joiningDate: '2020-06-20',
      shift: 'Morning (6 AM - 2 PM)',
      username: 'rahul.kumar',
      emailLoginId: 'rahul.kumar@hospital.com',
      status: 'inactive',
      profileImage: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=F59E0B&color=fff&size=100'
    },
    {
      id: 5,
      memberId: 'MEM-2026-005',
      fullName: 'Dr. Amit Shah',
      gender: 'Male',
      dateOfBirth: '1983-05-12',
      bloodGroup: 'A-',
      maritalStatus: 'Married',
      mobileNumber: '9876543250',
      alternateMobile: '9876543251',
      emailAddress: 'amit.shah@hospital.com',
      address: '34, Doctor Enclave, Bhavnagar',
      city: 'Bhavnagar',
      state: 'Gujarat',
      country: 'India',
      pinCode: '364001',
      role: 'Doctor',
      designation: 'Orthopedic Surgeon',
      qualification: 'MBBS, MS Orthopedics',
      experience: 15,
      joiningDate: '2016-03-01',
      shift: 'Morning (6 AM - 2 PM)',
      username: 'amit.shah',
      emailLoginId: 'amit.shah@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Amit+Shah&background=8B5CF6&color=fff&size=100'
    },
    {
      id: 6,
      memberId: 'MEM-2026-006',
      fullName: 'Pharmacist Sunita Jain',
      gender: 'Female',
      dateOfBirth: '1989-12-30',
      bloodGroup: 'B-',
      maritalStatus: 'Married',
      mobileNumber: '9876543260',
      alternateMobile: '9876543261',
      emailAddress: 'sunita.jain@hospital.com',
      address: '12, Pharmacy Lane, Gandhinagar',
      city: 'Gandhinagar',
      state: 'Gujarat',
      country: 'India',
      pinCode: '382010',
      role: 'Pharmacist',
      designation: 'Chief Pharmacist',
      qualification: 'B.Pharm, M.Pharm',
      experience: 7,
      joiningDate: '2019-11-15',
      shift: 'Evening (2 PM - 10 PM)',
      username: 'sunita.jain',
      emailLoginId: 'sunita.jain@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Sunita+Jain&background=EF4444&color=fff&size=100'
    },
    {
      id: 7,
      memberId: 'MEM-2026-007',
      fullName: 'Accountant Ravi Desai',
      gender: 'Male',
      dateOfBirth: '1987-04-25',
      bloodGroup: 'O-',
      maritalStatus: 'Married',
      mobileNumber: '9876543270',
      alternateMobile: '9876543271',
      emailAddress: 'ravi.desai@hospital.com',
      address: '89, Finance Tower, Anand',
      city: 'Anand',
      state: 'Gujarat',
      country: 'India',
      pinCode: '388001',
      role: 'Accountant',
      designation: 'Senior Accountant',
      qualification: 'B.Com, M.Com, CA',
      experience: 10,
      joiningDate: '2017-09-01',
      shift: 'Morning (6 AM - 2 PM)',
      username: 'ravi.desai',
      emailLoginId: 'ravi.desai@hospital.com',
      status: 'inactive',
      profileImage: 'https://ui-avatars.com/api/?name=Ravi+Desai&background=14B8A6&color=fff&size=100'
    },
    {
      id: 8,
      memberId: 'MEM-2026-008',
      fullName: 'Receptionist Payal Shah',
      gender: 'Female',
      dateOfBirth: '1995-08-14',
      bloodGroup: 'A+',
      maritalStatus: 'Single',
      mobileNumber: '9876543280',
      alternateMobile: '9876543281',
      emailAddress: 'payal.shah@hospital.com',
      address: '45, Reception Block, Mehsana',
      city: 'Mehsana',
      state: 'Gujarat',
      country: 'India',
      pinCode: '384001',
      role: 'Receptionist',
      designation: 'Senior Receptionist',
      qualification: 'MBA Hospital Administration',
      experience: 3,
      joiningDate: '2021-04-01',
      shift: 'Rotational',
      username: 'payal.shah',
      emailLoginId: 'payal.shah@hospital.com',
      status: 'active',
      profileImage: 'https://ui-avatars.com/api/?name=Payal+Shah&background=6366F1&color=fff&size=100'
    }
  ];

  // Filter members based on search and filters
  const filteredMembers = members.filter((member: Member) => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.mobileNumber.includes(searchTerm);

    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get unique roles for filter
  const roles = ['all', ...new Set(members.map((m: Member) => m.role))];

  const getStatusColor = (status: string): string => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300';
  };

  const getRoleBadgeColor = (role: string): string => {
    const colors: Record<string, string> = {
      'Doctor': 'bg-blue-100 text-blue-800 border-blue-300',
      'Nurse': 'bg-green-100 text-green-800 border-green-300',
      'Receptionist': 'bg-purple-100 text-purple-800 border-purple-300',
      'Lab Technician': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Pharmacist': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Accountant': 'bg-pink-100 text-pink-800 border-pink-300',
      'Admin': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <Page title="Manage Doctors & Staff">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-800">{members.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-800">
                  {members.filter((m: Member) => m.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive</p>
                <p className="text-2xl font-bold text-gray-800">
                  {members.filter((m: Member) => m.status === 'inactive').length}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Doctors</p>
                <p className="text-2xl font-bold text-gray-800">
                  {members.filter((m: Member) => m.role === 'Doctor').length}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Staff</p>
                <p className="text-2xl font-bold text-gray-800">
                  {members.filter((m: Member) => m.role !== 'Doctor').length}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, ID, email or phone..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterRole}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterRole(e.target.value)}
                className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base min-w-[140px]"
              >
                <option value="all">All Roles</option>
                {roles.filter(r => r !== 'all').map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Member List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member: Member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              src={member.profileImage}
                              alt={member.fullName}
                              className="h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-gray-900">{member.fullName}</div>
                            <div className="text-sm text-gray-500">{member.memberId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.mobileNumber}</div>
                        <div className="text-sm text-gray-500">{member.emailAddress}</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${getRoleBadgeColor(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.designation}</div>
                        <div className="text-sm text-gray-500">{member.experience} years exp.</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-sm">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-900 transition p-1 hover:bg-blue-50 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-green-600 hover:text-green-900 transition p-1 hover:bg-green-50 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition p-1 hover:bg-red-50 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-20 h-20 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-700">No members found</p>
                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredMembers.length}</span> of{' '}
              <span className="font-medium">{members.length}</span> members
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition">
                Previous
              </button>
              <button className="px-4 py-2 border border-blue-600 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MemberListPage;  
