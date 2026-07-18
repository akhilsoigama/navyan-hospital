import { useState, type ChangeEvent } from 'react';
import Page from '../../section/Page';

type AddMemberFormData = {
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
  experience: string;
  joiningDate: string;
  shift: string;
  username: string;
  emailLoginId: string;
  password: string;
  confirmPassword: string;
  twoFactorAuth: boolean;
};

type FormErrors = Partial<Record<keyof AddMemberFormData | 'submit', string>>;

const AddMemberPage = () => {
  const [formData, setFormData] = useState<AddMemberFormData>({
    // 1. Basic Information
    memberId: 'MEM-2026-001',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    maritalStatus: '',

    // 2. Contact Information
    mobileNumber: '',
    alternateMobile: '',
    emailAddress: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: '',

    // 3. Professional Information
    role: '',
    designation: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    shift: '',

    // 4. Login Details
    username: '',
    emailLoginId: '',
    password: '',
    confirmPassword: '',
    twoFactorAuth: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
  const shifts = ['Morning (6 AM - 2 PM)', 'Evening (2 PM - 10 PM)', 'Night (10 PM - 6 AM)', 'Rotational'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof AddMemberFormData;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? checked : value
    }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    // Basic Information
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    // Contact Information
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter valid 10-digit mobile number';
    }
    if (formData.emailAddress && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode) {
      newErrors.pinCode = 'PIN code is required';
    } else if (!/^[0-9]{5,6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Enter valid PIN code';
    }

    // Professional Information
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';

    // Login Details
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.emailLoginId.trim()) {
      newErrors.emailLoginId = 'Email/Login ID is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailLoginId)) {
      newErrors.emailLoginId = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with actual API call
      // await api.post('/members', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);

      // Reset form
      setFormData({
        memberId: 'MEM-2026-001',
        fullName: '',
        gender: '',
        dateOfBirth: '',
        bloodGroup: '',
        maritalStatus: '',
        mobileNumber: '',
        alternateMobile: '',
        emailAddress: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        pinCode: '',
        role: '',
        designation: '',
        qualification: '',
        experience: '',
        joiningDate: '',
        shift: '',
        username: '',
        emailLoginId: '',
        password: '',
        confirmPassword: '',
        twoFactorAuth: false
      });
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Failed to add member. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page title="Add Member">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Member added successfully!
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Add New Member</h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 1. Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
                1. Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member ID
                  </label>
                  <input
                    type="text"
                    value={formData.memberId}
                    disabled
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter full name"
                  />
                  {errors.fullName && <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800
                      ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.gender && <p className="mt-1.5 text-sm text-red-600">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800
                      ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.dateOfBirth && <p className="mt-1.5 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800"
                  >
                    <option value="">Select Marital Status</option>
                    {maritalStatuses.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
                2. Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.mobileNumber && <p className="mt-1.5 text-sm text-red-600">{errors.mobileNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Mobile
                  </label>
                  <input
                    type="tel"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Enter alternate mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter email address"
                  />
                  {errors.emailAddress && <p className="mt-1.5 text-sm text-red-600">{errors.emailAddress}</p>}
                </div>
                <div className="lg:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter address"
                  />
                  {errors.address && <p className="mt-1.5 text-sm text-red-600">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="mt-1.5 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter state"
                  />
                  {errors.state && <p className="mt-1.5 text-sm text-red-600">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800"
                  >
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter PIN code"
                  />
                  {errors.pinCode && <p className="mt-1.5 text-sm text-red-600">{errors.pinCode}</p>}
                </div>
              </div>
            </div>

            {/* 3. Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
                3. Professional Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800
                      ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Lab Technician">Lab Technician</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.role && <p className="mt-1.5 text-sm text-red-600">{errors.role}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter designation"
                  />
                  {errors.designation && <p className="mt-1.5 text-sm text-red-600">{errors.designation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Enter qualification"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Enter years of experience"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800
                      ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.joiningDate && <p className="mt-1.5 text-sm text-red-600">{errors.joiningDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shift
                  </label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800"
                  >
                    <option value="">Select Shift</option>
                    {shifts.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Login Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
                4. Login Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter username"
                  />
                  {errors.username && <p className="mt-1.5 text-sm text-red-600">{errors.username}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email/Login ID *
                  </label>
                  <input
                    type="email"
                    name="emailLoginId"
                    value={formData.emailLoginId}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.emailLoginId ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter email for login"
                  />
                  {errors.emailLoginId && <p className="mt-1.5 text-sm text-red-600">{errors.emailLoginId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter password (min 8 characters)"
                  />
                  {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-800 placeholder-gray-400
                      ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
                <div className="lg:col-span-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={formData.twoFactorAuth}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Enable Two-Factor Authentication (Optional)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    memberId: 'MEM-2026-001',
                    fullName: '',
                    gender: '',
                    dateOfBirth: '',
                    bloodGroup: '',
                    maritalStatus: '',
                    mobileNumber: '',
                    alternateMobile: '',
                    emailAddress: '',
                    address: '',
                    city: '',
                    state: '',
                    country: 'India',
                    pinCode: '',
                    role: '',
                    designation: '',
                    qualification: '',
                    experience: '',
                    joiningDate: '',
                    shift: '',
                    username: '',
                    emailLoginId: '',
                    password: '',
                    confirmPassword: '',
                    twoFactorAuth: false
                  });
                  setErrors({});
                }}
                className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Member...
                  </span>
                ) : (
                  'Add Member'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default AddMemberPage;
