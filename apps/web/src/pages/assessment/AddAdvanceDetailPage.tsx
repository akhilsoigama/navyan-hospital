// pages/dashboard/advance/AddAdvanceDetailPage.tsx
import { useState } from 'react';
import {
  FaTimes,
  FaUserCircle,
  FaCalendarAlt,
  FaRupeeSign,
  FaFileInvoice,
  FaTag,
  FaMoneyBillWave,
  FaSearch,
  FaInfoCircle,
  FaCreditCard,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type Patient = {
  id: string;
  name: string;
  mobile: string;
  email?: string;
};

type AdvanceType = 'Consultation' | 'Therapy Session' | 'Package' | 'Medicine' | 'Other';

// ---------- Mock Data ----------
const mockPatients: Patient[] = [
  { id: 'P1250', name: 'Kalpesh Desai', mobile: '98765 43210', email: 'kalpesh@email.com' },
  { id: 'P1249', name: 'Nirali Trivedi', mobile: '98765 43211', email: 'nirali@email.com' },
  { id: 'P1248', name: 'Haresh Prajapati', mobile: '98765 43212', email: 'haresh@email.com' },
];

const advanceTypes: AdvanceType[] = ['Consultation', 'Therapy Session', 'Package', 'Medicine', 'Other'];
const paymentMethods = ['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque'];
const centers = ['Mehsana Center', 'Ahmedabad Center', 'Surat Center', 'Vadodara Center'];

const AddAdvanceDetailPage = () => {
  // Form State
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientResults, setShowPatientResults] = useState(false);
  
  const [advanceType, setAdvanceType] = useState<AdvanceType | ''>('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [advanceDate, setAdvanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [center, setCenter] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptNumber, setReceiptNumber] = useState(`ADV-${Date.now().toString().slice(-6)}`);
  
  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.mobile.includes(patientSearch)
  );

  const handleSelectPatient = (p: Patient) => {
    setSelectedPatient(p);
    setPatientSearch(`${p.name} (${p.mobile})`);
    setShowPatientResults(false);
    setErrors(prev => ({ ...prev, patient: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedPatient) newErrors.patient = 'Please select a patient';
    if (!advanceType) newErrors.advanceType = 'Please select advance type';
    if (!advanceAmount || parseFloat(advanceAmount) <= 0) {
      newErrors.advanceAmount = 'Please enter a valid amount';
    }
    if (!center) newErrors.center = 'Please select a center';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select payment method';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const payload = {
      patient: selectedPatient,
      advanceType,
      advanceAmount: parseFloat(advanceAmount),
      advanceDate,
      center,
      paymentMethod,
      referenceNumber,
      notes,
      receiptNumber,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    console.log('Saving Advance Detail:', payload);
    alert('Advance detail saved successfully! Check console for details.');
  };

  const handleReset = () => {
    setPatientSearch('');
    setSelectedPatient(null);
    setAdvanceType('');
    setAdvanceAmount('');
    setAdvanceDate(new Date().toISOString().split('T')[0]);
    setCenter('');
    setPaymentMethod('');
    setReferenceNumber('');
    setNotes('');
    setReceiptNumber(`ADV-${Date.now().toString().slice(-6)}`);
    setErrors({});
  };

  return (
    <Page title="Add Advance Detail">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add Advance Detail</h2>
          <p className="text-sm text-gray-400 mt-1">Record advance payment received from patient</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          {/* Receipt Number Header */}
          <div className="p-5 border-b border-gray-100/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <FaFileInvoice className="size-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Receipt Number</p>
                <p className="text-sm font-bold text-gray-800">{receiptNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium bg-amber-50 text-amber-600`}>
                Pending
              </span>
            </div>
          </div>

          {/* Form Body */}
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
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setShowPatientResults(true);
                      if (selectedPatient) setSelectedPatient(null);
                    }}
                    onFocus={() => setShowPatientResults(true)}
                    placeholder="Search patient by name or mobile..."
                    className={`w-full border ${
                      errors.patient ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                </div>

                {showPatientResults && patientSearch && !selectedPatient && (
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
                              <FaPhoneAlt className="inline size-3 mr-1" /> {p.mobile} • {p.id}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <div className="text-2xl mb-2">🔍</div>
                        <p className="text-sm text-gray-400">No patient found</p>
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
                <div className="mt-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100/60">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-blue-300 size-10" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{selectedPatient.name}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaPhoneAlt className="size-3" /> {selectedPatient.mobile}
                        </span>
                        {selectedPatient.email && (
                          <span className="flex items-center gap-1">
                            <FaEnvelope className="size-3" /> {selectedPatient.email}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">ID: {selectedPatient.id}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPatient(null);
                        setPatientSearch('');
                      }}
                      className="text-xs text-blue-600 hover:underline shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Advance Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Advance Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={advanceType}
                  onChange={(e) => {
                    setAdvanceType(e.target.value as AdvanceType);
                    setErrors(prev => ({ ...prev, advanceType: '' }));
                  }}
                  className={`w-full border ${
                    errors.advanceType ? 'border-red-300' : 'border-gray-200'
                  } rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                >
                  <option value="">Select advance type</option>
                  {advanceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.advanceType && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.advanceType}</p>
                )}
              </div>

              {/* Advance Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Advance Amount (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={(e) => {
                      setAdvanceAmount(e.target.value);
                      setErrors(prev => ({ ...prev, advanceAmount: '' }));
                    }}
                    placeholder="0.00"
                    className={`w-full border ${
                      errors.advanceAmount ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                </div>
                {errors.advanceAmount && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.advanceAmount}</p>
                )}
              </div>

              {/* Advance Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Advance Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="date"
                    value={advanceDate}
                    onChange={(e) => setAdvanceDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Center */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Center <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <select
                    value={center}
                    onChange={(e) => {
                      setCenter(e.target.value);
                      setErrors(prev => ({ ...prev, center: '' }));
                    }}
                    className={`w-full border ${
                      errors.center ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select center</option>
                    {centers.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {errors.center && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.center}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <select
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors(prev => ({ ...prev, paymentMethod: '' }));
                    }}
                    className={`w-full border ${
                      errors.paymentMethod ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                {errors.paymentMethod && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.paymentMethod}</p>
                )}
              </div>

              {/* Reference Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reference Number
                  <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="Transaction/Cheque number"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes
                  <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FaInfoCircle className="absolute left-3.5 top-3.5 text-gray-400 size-4" />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Additional notes or remarks..."
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 p-4 bg-linear-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-blue-100/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100/60 rounded-xl">
                    <FaMoneyBillWave className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Advance Amount</p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹ {advanceAmount ? parseFloat(advanceAmount).toLocaleString('en-IN') : '0.00'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Type</p>
                    <p className="text-sm font-semibold text-gray-700">{advanceType || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Payment</p>
                    <p className="text-sm font-semibold text-gray-700">{paymentMethod || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-5 pt-0 border-t border-gray-100/80">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
              >
                <FaTimes className="size-4" /> Reset
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <FaCheckCircle className="size-4" /> Save Advance Detail
              </button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-amber-50/60 rounded-xl border border-amber-100/60 p-4 flex items-start gap-3">
          <FaInfoCircle className="text-amber-600 size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Important Note</p>
            <p className="text-xs text-amber-700 mt-0.5">
              This advance payment will be adjusted against future services. 
              A receipt with the number <span className="font-mono font-medium">{receiptNumber}</span> will be generated.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AddAdvanceDetailPage;