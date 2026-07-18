// pages/dashboard/billing/DischargePatient.tsx
import React, { useState } from 'react';
import {
  FaUserCircle,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaSave,
  FaTimes,
  FaFileInvoice,
  FaPrint,
  FaDownload,
  FaCheckCircle,
  FaInfoCircle,
  FaPhoneAlt,
  FaRupeeSign,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type DischargeStatus = 'pending' | 'approved' | 'completed' | 'cancelled';
type DischargeType = 'routine' | 'emergency' | 'against-medical-advice' | 'transfer';

type Patient = {
  id: string;
  patientId: string;
  name: string;
  mobile: string;
  email?: string;
  age: number;
  gender: string;
  address?: string;
  admissionDate: string;
  roomNumber: string;
  treatingDoctor: string;
  diagnosis: string;
};

type DischargeData = {
  dischargeId: string;
  patient: Patient | null;
  dischargeDate: string;
  dischargeTime: string;
  dischargeType: DischargeType | '';
  dischargeStatus: DischargeStatus;
  dischargeSummary: string;
  dischargeInstructions: string;
  medications: string;
  followUpDate: string;
  followUpDoctor: string;
  dischargeBy: string;
  totalDays: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  notes: string;
  createdAt: string;
};

// ---------- Mock Data ----------
const mockPatients: Patient[] = [
  {
    id: '1',
    patientId: 'P1250',
    name: 'Kalpesh Desai',
    mobile: '98765 43210',
    email: 'kalpesh@email.com',
    age: 34,
    gender: 'Male',
    address: '12, Shivam Society, Mehsana',
    admissionDate: '2026-07-10',
    roomNumber: '101',
    treatingDoctor: 'Dr. Ashish Rathod',
    diagnosis: 'Lower Back Pain',
  },
  {
    id: '2',
    patientId: 'P1249',
    name: 'Nirali Trivedi',
    mobile: '98765 43211',
    email: 'nirali@email.com',
    age: 28,
    gender: 'Female',
    address: '45, Green Park, Ahmedabad',
    admissionDate: '2026-07-12',
    roomNumber: '205',
    treatingDoctor: 'Dr. Ashish Rathod',
    diagnosis: 'Knee Injury',
  },
  {
    id: '3',
    patientId: 'P1248',
    name: 'Haresh Prajapati',
    mobile: '98765 43212',
    email: 'haresh@email.com',
    age: 45,
    gender: 'Male',
    address: '7, Station Road, Surat',
    admissionDate: '2026-07-05',
    roomNumber: '102',
    treatingDoctor: 'Physio - Dhaval',
    diagnosis: 'Shoulder Dislocation',
  },
];

const dischargeTypes: DischargeType[] = ['routine', 'emergency', 'against-medical-advice', 'transfer'];
const paymentStatuses = ['paid', 'partial', 'pending'];

const DischargePatient = () => {
  // Search State
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientResults, setShowPatientResults] = useState(false);

  // Form State
  const [formData, setFormData] = useState<DischargeData>({
    dischargeId: `DIS-${Date.now().toString().slice(-6)}`,
    patient: null,
    dischargeDate: new Date().toISOString().split('T')[0],
    dischargeTime: new Date().toTimeString().slice(0, 5),
    dischargeType: '',
    dischargeStatus: 'pending',
    dischargeSummary: '',
    dischargeInstructions: '',
    medications: '',
    followUpDate: '',
    followUpDoctor: '',
    dischargeBy: '',
    totalDays: 0,
    totalAmount: 0,
    paidAmount: 0,
    balanceAmount: 0,
    paymentStatus: 'pending',
    notes: '',
    createdAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDischarged, setIsDischarged] = useState(false);

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.includes(search)
  );

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({
      ...prev,
      patient: patient,
      followUpDoctor: patient.treatingDoctor,
    }));
    setSearch(`${patient.name} (${patient.patientId})`);
    setShowPatientResults(false);
    
    // Calculate total days
    const admission = new Date(patient.admissionDate);
    const today = new Date();
    const diffTime = today.getTime() - admission.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setFormData(prev => ({ ...prev, totalDays: diffDays > 0 ? diffDays : 1 }));
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Auto-calculate balance
    if (field === 'totalAmount' || field === 'paidAmount') {
      const total = field === 'totalAmount' ? Number(value) : formData.totalAmount;
      const paid = field === 'paidAmount' ? Number(value) : formData.paidAmount;
      const balance = total - paid;
      setFormData(prev => ({
        ...prev,
        totalAmount: field === 'totalAmount' ? Number(value) : prev.totalAmount,
        paidAmount: field === 'paidAmount' ? Number(value) : prev.paidAmount,
        balanceAmount: balance > 0 ? balance : 0,
        paymentStatus: balance === 0 ? 'paid' : paid > 0 ? 'partial' : 'pending',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedPatient) newErrors.patient = 'Please select a patient';
    if (!formData.dischargeDate) newErrors.dischargeDate = 'Discharge date is required';
    if (!formData.dischargeTime) newErrors.dischargeTime = 'Discharge time is required';
    if (!formData.dischargeType) newErrors.dischargeType = 'Please select discharge type';
    if (!formData.dischargeSummary) newErrors.dischargeSummary = 'Discharge summary is required';
    if (!formData.dischargeBy) newErrors.dischargeBy = 'Please enter discharge by';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      patient: selectedPatient,
      dischargeStatus: 'completed',
      dischargedAt: new Date().toISOString(),
    };
    
    console.log('Discharging Patient:', payload);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDischarged(true);
      alert('Patient discharged successfully! Check console for details.');
    }, 1500);
  };

  const handleReset = () => {
    setSelectedPatient(null);
    setSearch('');
    setFormData({
      dischargeId: `DIS-${Date.now().toString().slice(-6)}`,
      patient: null,
      dischargeDate: new Date().toISOString().split('T')[0],
      dischargeTime: new Date().toTimeString().slice(0, 5),
      dischargeType: '',
      dischargeStatus: 'pending',
      dischargeSummary: '',
      dischargeInstructions: '',
      medications: '',
      followUpDate: '',
      followUpDoctor: '',
      dischargeBy: '',
      totalDays: 0,
      totalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
      paymentStatus: 'pending',
      notes: '',
      createdAt: new Date().toISOString(),
    });
    setErrors({});
    setIsDischarged(false);
  };

  const handlePrint = () => {
    alert('Printing discharge summary...');
  };

  return (
    <Page title="Discharge Patient">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Discharge Patient</h2>
            <p className="text-sm text-gray-400 mt-1">Complete the discharge process for admitted patients</p>
          </div>
          {isDischarged && (
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all"
              >
                <FaPrint className="size-4" /> Print Summary
              </button>
              <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <FaDownload className="size-4" /> Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Discharge Status Alert */}
        {isDischarged && (
          <div className="bg-emerald-50/80 rounded-2xl border border-emerald-100/80 p-5 flex items-start gap-4">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <FaCheckCircle className="size-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-800">Patient Discharged Successfully</h3>
              <p className="text-xs text-emerald-700 mt-1">
                Patient has been discharged with ID: <span className="font-mono font-medium">{formData.dischargeId}</span>
              </p>
              <p className="text-xs text-emerald-700">
                Discharge summary has been generated and saved.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          {/* Discharge ID Header */}
          <div className="p-5 border-b border-gray-100/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                <FaFileInvoice className="size-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Discharge ID</p>
                <p className="text-sm font-bold text-gray-800 font-mono">{formData.dischargeId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                isDischarged 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-amber-50 text-amber-600'
              }`}>
                {isDischarged ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="p-5">
            {/* Patient Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Patient <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowPatientResults(true);
                      if (selectedPatient) setSelectedPatient(null);
                    }}
                    onFocus={() => setShowPatientResults(true)}
                    placeholder="Search by name, patient ID, or mobile..."
                    className={`w-full border ${
                      errors.patient ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    disabled={isDischarged}
                  />
                </div>

                {showPatientResults && search && !selectedPatient && !isDischarged && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPatient(p)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0 transition-colors"
                        >
                          <FaUserCircle className="text-gray-300 size-8 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{p.name}</p>
                            <p className="text-xs text-gray-400">
                              {p.patientId} • {p.mobile} • {p.age}y • {p.gender}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <div className="text-2xl mb-2">🔍</div>
                        <p className="text-sm text-gray-400">No patients found</p>
                      </div>
                    )}
                  </div>
                )}

                {errors.patient && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.patient}</p>
                )}
              </div>

              {/* Selected Patient Details */}
              {selectedPatient && (
                <div className="mt-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100/60">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-blue-300 size-10" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{selectedPatient.name}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span>ID: {selectedPatient.patientId}</span>
                          <span className="flex items-center gap-1">
                            <FaPhoneAlt className="size-3" /> {selectedPatient.mobile}
                          </span>
                          <span>{selectedPatient.age}y • {selectedPatient.gender}</span>
                        </div>
                      </div>
                    </div>
                    {!isDischarged && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPatient(null);
                          setSearch('');
                        }}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 pt-3 border-t border-blue-100/60">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Admission Date</p>
                      <p className="text-xs text-gray-700">{selectedPatient.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Room Number</p>
                      <p className="text-xs text-gray-700">{selectedPatient.roomNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Treating Doctor</p>
                      <p className="text-xs text-gray-700">{selectedPatient.treatingDoctor}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] text-gray-400 font-medium">Diagnosis</p>
                      <p className="text-xs text-gray-700">{selectedPatient.diagnosis}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Discharge Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                  <FaCalendarAlt className="size-4" />
                </div>
                Discharge Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharge Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="date"
                      value={formData.dischargeDate}
                      onChange={(e) => handleChange('dischargeDate', e.target.value)}
                      className={`w-full border ${
                        errors.dischargeDate ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                      disabled={isDischarged}
                    />
                  </div>
                  {errors.dischargeDate && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dischargeDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharge Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="time"
                      value={formData.dischargeTime}
                      onChange={(e) => handleChange('dischargeTime', e.target.value)}
                      className={`w-full border ${
                        errors.dischargeTime ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                      disabled={isDischarged}
                    />
                  </div>
                  {errors.dischargeTime && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dischargeTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharge Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.dischargeType}
                    onChange={(e) => handleChange('dischargeType', e.target.value)}
                    className={`w-full border ${
                      errors.dischargeType ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                    disabled={isDischarged}
                  >
                    <option value="">Select type</option>
                    {dischargeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                  {errors.dischargeType && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dischargeType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Total Days Admitted
                  </label>
                  <input
                    type="number"
                    value={formData.totalDays}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharged By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dischargeBy}
                    onChange={(e) => handleChange('dischargeBy', e.target.value)}
                    placeholder="Doctor/Staff name"
                    className={`w-full border ${
                      errors.dischargeBy ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    disabled={isDischarged}
                  />
                  {errors.dischargeBy && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dischargeBy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Follow-up Doctor
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaUserMd className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="text"
                      value={formData.followUpDoctor}
                      onChange={(e) => handleChange('followUpDoctor', e.target.value)}
                      placeholder="Follow-up doctor name"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      disabled={isDischarged}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <FaRupeeSign className="size-4" />
                </div>
                Billing Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Total Amount (₹)
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.totalAmount}
                      onChange={(e) => handleChange('totalAmount', Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      disabled={isDischarged}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Paid Amount (₹)
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.paidAmount}
                      onChange={(e) => handleChange('paidAmount', Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      disabled={isDischarged}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Balance Amount (₹)
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.balanceAmount}
                      readOnly
                      className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm ${
                        formData.balanceAmount > 0 
                          ? 'border-red-300 bg-red-50 text-red-600' 
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      } cursor-not-allowed`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => handleChange('paymentStatus', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                    disabled={isDischarged}
                  >
                    {paymentStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Medical Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                  <FaFileInvoice className="size-4" />
                </div>
                Medical Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharge Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.dischargeSummary}
                    onChange={(e) => handleChange('dischargeSummary', e.target.value)}
                    rows={3}
                    placeholder="Provide a summary of the patient's condition, treatment, and outcome..."
                    className={`w-full border ${
                      errors.dischargeSummary ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    disabled={isDischarged}
                  />
                  {errors.dischargeSummary && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dischargeSummary}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Discharge Instructions
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.dischargeInstructions}
                    onChange={(e) => handleChange('dischargeInstructions', e.target.value)}
                    rows={2}
                    placeholder="Instructions for the patient after discharge..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    disabled={isDischarged}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Medications Prescribed
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => handleChange('medications', e.target.value)}
                    rows={2}
                    placeholder="List of medications prescribed after discharge..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    disabled={isDischarged}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Follow-up Date
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => handleChange('followUpDate', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      disabled={isDischarged}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Additional Notes
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={2}
                    placeholder="Any additional notes or remarks..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    disabled={isDischarged}
                  />
                </div>
              </div>
            </div>

            {/* Summary Card */}
            {selectedPatient && (
              <div className="mt-6 p-4 bg-linear-to-r from-blue-50/60 to-purple-50/30 rounded-xl border border-blue-100/60">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100/60 rounded-xl">
                      <FaUserMd className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Patient Summary</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {selectedPatient.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedPatient.patientId} • {selectedPatient.diagnosis}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-medium">Total Days</p>
                      <p className="text-sm font-bold text-gray-800">{formData.totalDays}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-medium">Total Amount</p>
                      <p className="text-sm font-bold text-gray-800">₹ {formData.totalAmount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-medium">Balance</p>
                      <p className={`text-sm font-bold ${formData.balanceAmount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        ₹ {formData.balanceAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          {!isDischarged && (
            <div className="p-5 pt-0 border-t border-gray-100/80">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
                >
                  <FaTimes className="size-4" /> Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaSave className="size-4" /> Discharge Patient
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Info Note */}
        <div className="bg-blue-50/60 rounded-xl border border-blue-100/60 p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">Discharge Process</p>
            <p className="text-xs text-blue-700 mt-0.5">
              Discharge ID: <span className="font-mono font-medium">{formData.dischargeId}</span>. 
              Please ensure all billing is complete before discharging the patient.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DischargePatient;