// pages/dashboard/appointments/AddAppointmentPage.tsx
import { useState, useEffect, useRef } from 'react'
import {
  FaSearch,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaBuilding,
  FaTags,
  FaShieldAlt,
  FaEnvelope,
  FaHome,
  FaTint,
  FaHistory,
} from 'react-icons/fa'

// ---------- Types ----------
type PatientOption = {
  id: string
  name: string
  mobile: string
  age: number
  gender: string
  email?: string
  address?: string
  bloodGroup?: string
  lastVisit?: string
  // Extended fields for auto-fill
  preferredCenter?: string
  preferredDoctor?: string
  preferredSlot?: string
  lastAppointmentType?: string
  lastReason?: string
  referenceCenter?: string
  referenceSource?: string
}

// ---------- Mock Data (replace with real API later) ----------
const mockPatients: PatientOption[] = [
  {
    id: 'P1250',
    name: 'Kalpesh Desai',
    mobile: '98765 43210',
    age: 34,
    gender: 'Male',
    email: 'kalpesh.desai@example.com',
    address: '12, Shivam Society, Mehsana',
    bloodGroup: 'B+',
    lastVisit: '02 Jul 2026',
    // Auto-fill data
    preferredCenter: 'Mehsana',
    preferredDoctor: 'Dr. Ashish Rathod',
    preferredSlot: 'Morning',
    lastAppointmentType: 'Follow-up',
    lastReason: 'Lower back pain follow-up',
    referenceCenter: 'Mehsana Center',
    referenceSource: 'Patient Center',
  },
  {
    id: 'P1249',
    name: 'Nirali Trivedi',
    mobile: '98765 43211',
    age: 28,
    gender: 'Female',
    email: 'nirali.trivedi@example.com',
    address: '45, Green Park, Ahmedabad',
    bloodGroup: 'O+',
    lastVisit: '28 Jun 2026',
    // Auto-fill data
    preferredCenter: 'Ahmedabad',
    preferredDoctor: 'Physio - Dhaval',
    preferredSlot: 'Afternoon',
    lastAppointmentType: 'Consultation',
    lastReason: 'Knee pain consultation',
    referenceCenter: 'Ahmedabad Center',
    referenceSource: 'Google',
  },
  {
    id: 'P1248',
    name: 'Haresh Prajapati',
    mobile: '98765 43212',
    age: 45,
    gender: 'Male',
    email: 'haresh.prajapati@example.com',
    address: '7, Station Road, Surat',
    bloodGroup: 'A+',
    lastVisit: '15 Jun 2026',
    // Auto-fill data
    preferredCenter: 'Surat',
    preferredDoctor: 'Physio - Kavya',
    preferredSlot: 'Evening',
    lastAppointmentType: 'Therapy Session',
    lastReason: 'Shoulder therapy session',
    referenceCenter: 'Surat Center',
    referenceSource: 'YouTube',
  },
]

const doctors = ['Dr. Ashish Rathod', 'Physio - Dhaval', 'Physio - Kavya']
const appointmentTypes = ['Consultation', 'Follow-up', 'Therapy Session', 'Re-Assessment']

const ncLocations = ['Mehsana', 'Ahmedabad', 'Surat', 'Vadodara']
const referenceCenters = ['Mehsana Center', 'Ahmedabad Center', 'Surat Center']
const referenceSources = [
  'Patient Center',
  'Doctor Center',
  'YouTube',
  'Google',
  'Facebook',
  'Instagram',
  'Website',
  'Seminar/Camp',
  'Newspaper',
  'Any Other',
]
const slotTypes = ['Morning', 'Afternoon', 'Evening']

const timeSlotsByType: Record<string, string[]> = {
  Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'],
  Evening: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'],
}

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

function DetailField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-700">
        {value || '—'}
      </div>
    </div>
  )
}

const AddAppointmentPage = () => {
  // Patient section
  const [search, setSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<PatientOption | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isNewPatient, setIsNewPatient] = useState(false)

  const [newPatient, setNewPatient] = useState({ name: '', mobile: '', age: '', gender: 'Male' })

  // OTP verification (for new patient mobile confirmation)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [mobileVerified, setMobileVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS)
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Center / reference section
  const [ncLocation, setNcLocation] = useState('')
  const [sameCenterAppointment, setSameCenterAppointment] = useState<'yes' | 'no' | ''>('')
  const [referenceCenter, setReferenceCenter] = useState('')
  const [referenceSource, setReferenceSource] = useState('')

  // Appointment details
  const [date, setDate] = useState('')
  const [slotType, setSlotType] = useState('')
  const [time, setTime] = useState('')
  const [doctor, setDoctor] = useState('')
  const [type, setType] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.replace(' ', '').includes(search.replace(' ', ''))
  )

  const handleSelectPatient = (p: PatientOption) => {
    setSelectedPatient(p)
    setSearch(`${p.name} (${p.mobile})`)
    setShowResults(false)
    setMobileVerified(true) // existing patients are already verified
    
    // ----- AUTO-FILL ALL FORM FIELDS -----
    
    // 1. Center & Reference Section
    if (p.preferredCenter) {
      setNcLocation(p.preferredCenter)
    } else if (p.address) {
      // Fallback: Extract city from address
      const addressLower = p.address.toLowerCase()
      const cities = ['Mehsana', 'Ahmedabad', 'Surat', 'Vadodara']
      for (const city of cities) {
        if (addressLower.includes(city.toLowerCase())) {
          setNcLocation(city)
          break
        }
      }
    }
    
    setReferenceCenter(p.referenceCenter || '')
    setReferenceSource(p.referenceSource || '')
    
    // Auto-set "Same Center Appointment" based on location match
    if (p.preferredCenter && p.referenceCenter) {
      const preferredCity = p.preferredCenter.split(' ')[0] // "Mehsana" from "Mehsana Center"
      const refCity = p.referenceCenter.split(' ')[0]
      setSameCenterAppointment(preferredCity === refCity ? 'yes' : 'no')
    } else {
      setSameCenterAppointment('')
    }
    
    // 2. Appointment Details
    setDoctor(p.preferredDoctor || '')
    setSlotType(p.preferredSlot || '')
    setType(p.lastAppointmentType || '')
    setReason(p.lastReason || '')
    
    // Auto-set time based on slot type
    if (p.preferredSlot) {
      const slots = timeSlotsByType[p.preferredSlot] || []
      if (slots.length > 0) {
        setTime(slots[0]) // Default to first time slot
      }
    } else {
      setTime('')
    }
    
    // Auto-set date to today's date
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
    
    // Clear notes when selecting new patient
    setNotes('')
  }

  // Reset all fields when switching to new patient
  const resetAllFields = () => {
    setSelectedPatient(null)
    setSearch('')
    setNcLocation('')
    setSameCenterAppointment('')
    setReferenceCenter('')
    setReferenceSource('')
    setDate('')
    setSlotType('')
    setTime('')
    setDoctor('')
    setType('')
    setReason('')
    setNotes('')
  }

  // ---------- OTP handling ----------
  useEffect(() => {
    if (!showOtpModal) return
    setResendTimer(RESEND_SECONDS)
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [showOtpModal])

  // Auto-focus the first OTP box the moment the modal opens
  useEffect(() => {
    if (showOtpModal) {
      otpInputsRef.current[0]?.focus()
    }
  }, [showOtpModal])

  const openOtpModal = () => {
    if (!newPatient.mobile || newPatient.mobile.replace(/\s/g, '').length < 10) return
    setOtpDigits(Array(OTP_LENGTH).fill(''))
    setShowOtpModal(true)
    // TODO: trigger real OTP send via 2Factor API here
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otpDigits]
    next[index] = value
    setOtpDigits(next)
    if (value && index < OTP_LENGTH - 1) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  // Lets someone paste the full 6-digit code in one go (e.g. from an SMS)
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((digit, i) => (next[i] = digit))
    setOtpDigits(next)
    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    otpInputsRef.current[lastFilledIndex]?.focus()
  }

  const handleVerifyOtp = () => {
    // TODO: verify OTP via 2Factor API
    setMobileVerified(true)
    setShowOtpModal(false)
  }

  // ---------- Save ----------
  const handleSave = () => {
    // TODO: wire up to tRPC mutation
    const payload = {
      patient: isNewPatient ? newPatient : selectedPatient,
      mobileVerified,
      ncLocation,
      sameCenterAppointment,
      referenceCenter,
      referenceSource,
      date,
      slotType,
      time,
      doctor,
      type,
      reason,
      notes,
    }
    console.log('Saving appointment:', payload)
    alert('Appointment saved! Check console for details.')
  }

  const canSave =
    (selectedPatient || (isNewPatient && newPatient.name && newPatient.mobile && mobileVerified)) &&
    ncLocation &&
    slotType &&
    date &&
    time &&
    doctor &&
    type

  const availableTimeSlots = slotType ? (timeSlotsByType[slotType] ?? []) : []

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Add Appointment</h2>
        <p className="text-sm text-gray-400">Book a new appointment for a patient</p>
      </div>

      {/* Patient Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Patient Details</h3>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => {
                setIsNewPatient(false)
                setMobileVerified(false)
                resetAllFields()
              }}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                !isNewPatient ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
              }`}
            >
              Existing Patient
            </button>
            <button
              onClick={() => {
                setIsNewPatient(true)
                setMobileVerified(false)
                resetAllFields()
              }}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                isNewPatient ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
              }`}
            >
              New Patient
            </button>
          </div>
        </div>

        {!isNewPatient ? (
          <div className="relative">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowResults(true)
                  if (selectedPatient) {
                    setSelectedPatient(null)
                    resetAllFields()
                  }
                }}
                onFocus={() => setShowResults(true)}
                placeholder="Search by mobile number or name..."
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>

            {showResults && search && !selectedPatient && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPatient(p)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left border-b last:border-0"
                    >
                      <FaUserCircle className="text-gray-300 size-8 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-400">
                          {p.mobile} • {p.age}y • {p.gender} • {p.id}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-400">No patient found</p>
                )}
              </div>
            )}

            {/* Full patient detail card - populates as soon as an existing patient is selected */}
            {selectedPatient && (
              <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-blue-300 size-10" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{selectedPatient.name}</p>
                      <p className="text-xs text-gray-500">Patient ID: {selectedPatient.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPatient(null)
                      setSearch('')
                      resetAllFields()
                    }}
                    className="text-xs text-blue-600 hover:underline shrink-0"
                  >
                    Change patient
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <DetailField icon={<FaUserCircle className="size-3" />} label="Mobile Number" value={selectedPatient.mobile} />
                  <DetailField icon={<FaUserCircle className="size-3" />} label="Age" value={String(selectedPatient.age)} />
                  <DetailField icon={<FaUserCircle className="size-3" />} label="Gender" value={selectedPatient.gender} />
                  <DetailField icon={<FaEnvelope className="size-3" />} label="Email" value={selectedPatient.email ?? ''} />
                  <DetailField icon={<FaTint className="size-3" />} label="Blood Group" value={selectedPatient.bloodGroup ?? ''} />
                  <DetailField icon={<FaHistory className="size-3" />} label="Last Visit" value={selectedPatient.lastVisit ?? ''} />
                  <div className="md:col-span-3">
                    <DetailField icon={<FaHome className="size-3" />} label="Address" value={selectedPatient.address ?? ''} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Patient full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Mobile Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPatient.mobile}
                    onChange={(e) => {
                      setNewPatient({ ...newPatient, mobile: e.target.value })
                      setMobileVerified(false)
                    }}
                    placeholder="98765 43210"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                  {!mobileVerified ? (
                    <button
                      type="button"
                      onClick={openOtpModal}
                      className="shrink-0 flex items-center gap-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg px-3 hover:bg-blue-50"
                    >
                      <FaShieldAlt className="size-3" /> Verify
                    </button>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-emerald-600 border border-emerald-200 bg-emerald-50 rounded-lg px-3">
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Age</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  placeholder="34"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {!mobileVerified && (
              <p className="text-xs text-amber-600">
                Mobile number must be OTP-verified before the appointment can be saved.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Center & Reference Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Center & Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaMapMarkerAlt className="size-3" /> Select NC Location
            </label>
            <select
              value={ncLocation}
              onChange={(e) => setNcLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select location</option>
              {ncLocations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Same Center Appointment</label>
            <select
              value={sameCenterAppointment}
              onChange={(e) => setSameCenterAppointment(e.target.value as 'yes' | 'no' | '')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaBuilding className="size-3" /> Reference Center
            </label>
            <select
              value={referenceCenter}
              onChange={(e) => setReferenceCenter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select reference center</option>
              {referenceCenters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaTags className="size-3" /> Reference Source
            </label>
            <select
              value={referenceSource}
              onChange={(e) => setReferenceSource(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">How did the patient find us?</option>
              {referenceSources.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Appointment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaCalendarAlt className="size-3" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Slot Type</label>
            <select
              value={slotType}
              onChange={(e) => {
                setSlotType(e.target.value)
                setTime('')
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select slot type</option>
              {slotTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaClock className="size-3" /> Select Timeslot
            </label>
            {!slotType ? (
              <p className="text-xs text-gray-400">Pick a slot type to see available times</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableTimeSlots.map((t) => {
                  const active = time === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
                        active
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <FaUserMd className="size-3" /> Doctor / Therapist
            </label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Appointment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
            >
              <option value="">Select type</option>
              {appointmentTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Reason for Visit</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Lower back pain follow-up"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any additional notes for this appointment..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-3">
        <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
          <FaTimes className="size-4" /> Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaSave className="size-4" /> Save Appointment
        </button>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5 relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="size-4" />
            </button>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Verify Mobile Number</h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter the 6-digit code sent to {newPatient.mobile || 'your mobile number'}
            </p>

            <div className="flex justify-between gap-2 mb-4">
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpInputsRef.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className="w-10 h-11 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              ))}
            </div>

            <button
              type="button"
              disabled={resendTimer > 0}
              onClick={openOtpModal}
              className="text-xs text-blue-600 disabled:text-gray-400 mb-4"
            >
              {resendTimer > 0
                ? `Resend OTP in 00:${resendTimer.toString().padStart(2, '0')}`
                : 'Resend OTP'}
            </button>

            <button
              onClick={handleVerifyOtp}
              disabled={otpDigits.some((d) => !d)}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddAppointmentPage