// pages/dashboard/basic/AddBasicDetailPage.tsx
import { useState } from 'react';
import {
  FaTimes,
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaTint,
  FaInfoCircle,
  FaCheckCircle,
  FaUserMd,
  FaUsers,
  FaFileAlt,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type Gender = 'Male' | 'Female' | 'Other';
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';

// ---------- Mock Data ----------
const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const cities = ['Mehsana', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'];
const states = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu'];

const AddBasicDetailPage = () => {
  // Form State
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    gender: '' as Gender | '',
    dateOfBirth: '',
    age: '',
    maritalStatus: '' as MaritalStatus | '',
    
    // Contact Information
    mobile: '',
    alternateMobile: '',
    email: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Medical Information
    bloodGroup: '' as BloodGroup | '',
    allergies: '',
    medicalHistory: '',
    currentMedications: '',
    
    // Professional Information
    occupation: '',
    referredBy: '',
    emergencyContact: '',
    emergencyRelation: '',
    
    // Other Information
    sourceOfContact: '',
    notes: '',
  });

  // UI State
  const [patientId] = useState(`PAT-${Date.now().toString().slice(-6)}`);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.mobile || formData.mobile.length < 10) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'Please select city';
    if (!formData.state) newErrors.state = 'Please select state';
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const payload = {
      ...formData,
      patientId,
      fullName: `${formData.firstName} ${formData.lastName}`,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    
    console.log('Saving Basic Detail:', payload);
    alert('Patient basic details saved successfully! Check console for details.');
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      age: '',
      maritalStatus: '',
      mobile: '',
      alternateMobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      bloodGroup: '',
      allergies: '',
      medicalHistory: '',
      currentMedications: '',
      occupation: '',
      referredBy: '',
      emergencyContact: '',
      emergencyRelation: '',
      sourceOfContact: '',
      notes: '',
    });
    setErrors({});
  };

  // Calculate age when DOB changes
  const handleDOBChange = (dob: string) => {
    handleChange('dateOfBirth', dob);
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      handleChange('age', age.toString());
    } else {
      handleChange('age', '');
    }
  };

  return (
    <Page title="Add Basic Detail">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          {/* Patient ID Header */}
          <div className="p-5 border-b border-gray-100/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <FaUserCircle className="size-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Patient ID</p>
                <p className="text-sm font-bold text-gray-800">{patientId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-emerald-50 text-emerald-600">
                New Patient
              </span>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-5">
            {/* Section: Personal Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <FaUserMd className="size-4" />
                </div>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="John"
                    className={`w-full border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className={`w-full border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaVenusMars className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <select
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className={`w-full border ${
                        errors.gender ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {errors.gender && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBirthdayCake className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleDOBChange(e.target.value)}
                      className={`w-full border ${
                        errors.dateOfBirth ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Age
                  </label>
                  <input
                    type="text"
                    value={formData.age}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Contact Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <FaPhoneAlt className="size-4" />
                </div>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      placeholder="98765 43210"
                      className={`w-full border ${
                        errors.mobile ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Alternate Mobile
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="tel"
                      value={formData.alternateMobile}
                      onChange={(e) => handleChange('alternateMobile', e.target.value)}
                      placeholder="98765 43211"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full border ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Address */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                  <FaHome className="size-4" />
                </div>
                Address Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-400 size-4" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows={1}
                      placeholder="123, Main Street, Area Name"
                      className={`w-full border ${
                        errors.address ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={`w-full border ${
                      errors.city ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className={`w-full border ${
                      errors.state ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pincode
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    placeholder="380001"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section: Medical Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                  <FaTint className="size-4" />
                </div>
                Medical Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Blood Group
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaTint className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => handleChange('bloodGroup', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                    >
                      <option value="">Select blood group</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Allergies
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    placeholder="e.g. Penicillin, Dust, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Medical History
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.medicalHistory}
                    onChange={(e) => handleChange('medicalHistory', e.target.value)}
                    placeholder="e.g. Diabetes, Hypertension, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Current Medications
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.currentMedications}
                    onChange={(e) => handleChange('currentMedications', e.target.value)}
                    placeholder="e.g. Metformin 500mg, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section: Professional & Emergency */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                  <FaUsers className="size-4" />
                </div>
                Professional & Emergency Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Occupation
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    placeholder="Software Engineer, Teacher, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Referred By
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.referredBy}
                    onChange={(e) => handleChange('referredBy', e.target.value)}
                    placeholder="Doctor name or source"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Source of Contact
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sourceOfContact}
                    onChange={(e) => handleChange('sourceOfContact', e.target.value)}
                    placeholder="Google, Facebook, Walk-in, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Emergency Contact
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    placeholder="98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Emergency Relation
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyRelation}
                    onChange={(e) => handleChange('emergencyRelation', e.target.value)}
                    placeholder="Spouse, Parent, Sibling, etc."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section: Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600">
                  <FaFileAlt className="size-4" />
                </div>
                Additional Notes
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes
                  <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FaInfoCircle className="absolute left-3.5 top-3.5 text-gray-400 size-4" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={3}
                    placeholder="Any additional information about the patient..."
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
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
                <FaCheckCircle className="size-4" /> Save Patient
              </button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50/60 rounded-xl border border-blue-100/60 p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">Patient Registration</p>
            <p className="text-xs text-blue-700 mt-0.5">
              All fields marked with <span className="text-red-500">*</span> are required. 
              Patient will be registered with ID: <span className="font-mono font-medium">{patientId}</span>
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AddBasicDetailPage;