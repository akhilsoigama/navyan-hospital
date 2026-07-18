// pages/dashboard/expense/AddExpensePage.tsx
import { useState } from 'react';
import {
  FaTimes,
  FaRupeeSign,
  FaCalendarAlt,
  FaTag,
  FaBuilding,
  FaUserCircle,
  FaFileInvoice,
  FaInfoCircle,
  FaCheckCircle,
  FaWallet,
  FaMoneyBillWave,
  FaCreditCard,
  FaClipboardList,
  FaImage,
  FaUpload,
  FaTrash,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type ExpenseCategory = 
  | 'Staff Salary'
  | 'Rent'
  | 'Utilities'
  | 'Medical Supplies'
  | 'Equipment'
  | 'Marketing'
  | 'Maintenance'
  | 'Insurance'
  | 'Training'
  | 'Travel'
  | 'Food & Beverage'
  | 'Other';

type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer' | 'Card' | 'Cheque';

// ---------- Mock Data ----------
const expenseCategories: ExpenseCategory[] = [
  'Staff Salary',
  'Rent',
  'Utilities',
  'Medical Supplies',
  'Equipment',
  'Marketing',
  'Maintenance',
  'Insurance',
  'Training',
  'Travel',
  'Food & Beverage',
  'Other'
];

const paymentMethods: PaymentMethod[] = ['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque'];
const centers = ['Mehsana Center', 'Ahmedabad Center', 'Surat Center', 'Vadodara Center'];

const AddExpensePage = () => {
  // Form State
  const [formData, setFormData] = useState({
    expenseTitle: '',
    category: '' as ExpenseCategory | '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    paymentMethod: '' as PaymentMethod | '',
    center: '',
    vendorName: '',
    invoiceNumber: '',
    description: '',
    notes: '',
  });

  // Additional State
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expenseId] = useState(`EXP-${Date.now().toString().slice(-6)}`);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.expenseTitle) newErrors.expenseTitle = 'Expense title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.expenseDate) newErrors.expenseDate = 'Expense date is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select payment method';
    if (!formData.center) newErrors.center = 'Please select a center';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const payload = {
      ...formData,
      expenseId,
      amount: parseFloat(formData.amount),
      receipt: receiptFile ? receiptFile.name : null,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    console.log('Saving Expense:', payload);
    alert('Expense saved successfully! Check console for details.');
  };

  const handleReset = () => {
    setFormData({
      expenseTitle: '',
      category: '',
      amount: '',
      expenseDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      center: '',
      vendorName: '',
      invoiceNumber: '',
      description: '',
      notes: '',
    });
    setReceiptFile(null);
    setReceiptPreview(null);
    setErrors({});
  };

  return (
    <Page title="Add Expense">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
          <p className="text-sm text-gray-400 mt-1">Record and track business expenses</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          {/* Expense ID Header */}
          <div className="p-5 border-b border-gray-100/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                <FaWallet className="size-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Expense ID</p>
                <p className="text-sm font-bold text-gray-800">{expenseId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-amber-50 text-amber-600">
                Pending Approval
              </span>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-5">
            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                  <FaClipboardList className="size-4" />
                </div>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Expense Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.expenseTitle}
                    onChange={(e) => handleChange('expenseTitle', e.target.value)}
                    placeholder="e.g. Office Rent Payment, Staff Salary, etc."
                    className={`w-full border ${
                      errors.expenseTitle ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.expenseTitle && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.expenseTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`w-full border ${
                      errors.category ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select category</option>
                    {expenseCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      placeholder="0.00"
                      className={`w-full border ${
                        errors.amount ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Expense Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="date"
                      value={formData.expenseDate}
                      onChange={(e) => handleChange('expenseDate', e.target.value)}
                      className={`w-full border ${
                        errors.expenseDate ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.expenseDate && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.expenseDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleChange('paymentMethod', e.target.value)}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Center <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <select
                      value={formData.center}
                      onChange={(e) => handleChange('center', e.target.value)}
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
              </div>
            </div>

            {/* Vendor & Invoice */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <FaFileInvoice className="size-4" />
                </div>
                Vendor & Invoice Details
                <span className="text-xs text-gray-400 font-normal ml-1">(Optional)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Vendor Name
                  </label>
                  <div className="relative">
                    <FaUserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="text"
                      value={formData.vendorName}
                      onChange={(e) => handleChange('vendorName', e.target.value)}
                      placeholder="Vendor/Supplier name"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Invoice Number
                  </label>
                  <div className="relative">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="text"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                      placeholder="Invoice/Reference number"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Upload */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                  <FaImage className="size-4" />
                </div>
                Receipt / Bill Upload
                <span className="text-xs text-gray-400 font-normal ml-1">(Optional)</span>
              </h3>
              
              {!receiptPreview ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-all">
                  <input
                    type="file"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="p-3 bg-gray-50 rounded-full">
                      <FaUpload className="size-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Upload Receipt</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click to browse or drag & drop
                      </p>
                      <p className="text-[10px] text-gray-300 mt-1">
                        Supported: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-xl border border-gray-200 p-3 bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={receiptPreview}
                        alt="Receipt preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{receiptFile?.name}</p>
                      <p className="text-xs text-gray-400">
                        {(receiptFile?.size || 0 / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={removeReceipt}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <FaTrash className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                  <FaInfoCircle className="size-4" />
                </div>
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={2}
                    placeholder="Brief description of the expense..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={2}
                    placeholder="Any additional notes or remarks..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 p-4 bg-linear-to-r from-orange-50/60 to-amber-50/30 rounded-xl border border-orange-100/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-100/60 rounded-xl">
                    <FaMoneyBillWave className="size-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Expense Amount</p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹ {formData.amount ? parseFloat(formData.amount).toLocaleString('en-IN') : '0.00'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Category</p>
                    <p className="text-sm font-semibold text-gray-700">{formData.category || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Payment</p>
                    <p className="text-sm font-semibold text-gray-700">{formData.paymentMethod || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Center</p>
                    <p className="text-sm font-semibold text-gray-700">{formData.center || '—'}</p>
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
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <FaCheckCircle className="size-4" /> Save Expense
              </button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50/60 rounded-xl border border-blue-100/60 p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">Expense Tracking</p>
            <p className="text-xs text-blue-700 mt-0.5">
              This expense will be recorded with ID: <span className="font-mono font-medium">{expenseId}</span>. 
              Please ensure all details are accurate before saving. Expenses will be reviewed for approval.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AddExpensePage;