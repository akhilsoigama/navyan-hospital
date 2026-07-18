// pages/dashboard/master/StockCreate.tsx
import React, { useState } from 'react';
import {
  FaTimes,
  FaUpload,
  FaImage,
  FaTrash,
  FaBoxes,
  FaSyringe,
  FaPills,
  FaThermometerHalf,
  FaCalendarAlt,
  FaTag,
  FaBuilding,
  FaRupeeSign,
  FaFileInvoice,
  FaInfoCircle,
  FaCheckCircle,
  FaBarcode,
  FaWeightHanging,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type StockCategory = 'Vaccine' | 'Medicine' | 'Equipment' | 'Supplies';
type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';

// ---------- Constants ----------
const categories: StockCategory[] = ['Vaccine', 'Medicine', 'Equipment', 'Supplies'];
const units = ['Vials', 'Tablets', 'Capsules', 'Bottles', 'Boxes', 'Pieces', 'Sets', 'Packs'];
const locations = ['Mehsana Center', 'Ahmedabad Center', 'Surat Center', 'Vadodara Center'];
const statuses: StockStatus[] = ['in-stock', 'low-stock', 'out-of-stock', 'expired'];

const categoryColors = {
  Vaccine: 'bg-purple-50 border-purple-200 text-purple-700',
  Medicine: 'bg-blue-50 border-blue-200 text-blue-700',
  Equipment: 'bg-orange-50 border-orange-200 text-orange-700',
  Supplies: 'bg-gray-50 border-gray-200 text-gray-700',
};

const categoryIcons = {
  Vaccine: <FaSyringe className="size-5" />,
  Medicine: <FaPills className="size-5" />,
  Equipment: <FaThermometerHalf className="size-5" />,
  Supplies: <FaBoxes className="size-5" />,
};

const StockCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '' as StockCategory | '',
    subCategory: '',
    quantity: '',
    minQuantity: '',
    unit: '',
    purchasePrice: '',
    sellingPrice: '',
    batchNumber: '',
    expiryDate: '',
    manufacturer: '',
    supplier: '',
    location: '',
    status: 'in-stock' as StockStatus,
    description: '',
    notes: '',
  });

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate item code
  const itemCode = `STK-${Date.now().toString().slice(-6)}`;

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Item name is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }
    if (!formData.minQuantity || parseInt(formData.minQuantity) < 0) {
      newErrors.minQuantity = 'Please enter minimum quantity';
    }
    if (!formData.unit) newErrors.unit = 'Please select a unit';
    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) < 0) {
      newErrors.purchasePrice = 'Please enter purchase price';
    }
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) < 0) {
      newErrors.sellingPrice = 'Please enter selling price';
    }
    if (!formData.batchNumber) newErrors.batchNumber = 'Batch number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.location) newErrors.location = 'Please select a location';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      itemCode,
      quantity: parseInt(formData.quantity),
      minQuantity: parseInt(formData.minQuantity),
      purchasePrice: parseFloat(formData.purchasePrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      image: imageFile ? imageFile.name : null,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Creating Stock Item:', payload);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Stock item created successfully! Check console for details.');
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      subCategory: '',
      quantity: '',
      minQuantity: '',
      unit: '',
      purchasePrice: '',
      sellingPrice: '',
      batchNumber: '',
      expiryDate: '',
      manufacturer: '',
      supplier: '',
      location: '',
      status: 'in-stock',
      description: '',
      notes: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  return (
    <Page title="Add Stock Item">
      <div className="p-4 md:p-6 space-y-6 bg-gray-50/80 min-h-full">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add Stock Item</h2>
          <p className="text-sm text-gray-400 mt-1">Add new vaccine, medicine, or equipment to inventory</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          {/* Header with Item Code */}
          <div className="p-5 border-b border-gray-100/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <FaBarcode className="size-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Item Code</p>
                <p className="text-sm font-bold text-gray-800 font-mono">{itemCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-emerald-50 text-emerald-600">
                New Item
              </span>
            </div>
          </div>

          <div className="p-5">
            {/* Image Upload Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                  <FaImage className="size-4" />
                </div>
                Item Image
                <span className="text-xs text-gray-400 font-normal ml-1">(Optional)</span>
              </h3>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-400 transition-all">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="p-3 bg-purple-50 rounded-full">
                      <FaUpload className="size-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Upload Item Image</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click to browse or drag & drop
                      </p>
                      <p className="text-[10px] text-gray-300 mt-1">
                        Supported: JPG, PNG, WebP (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-xl border border-gray-200 p-3 bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className="size-20 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Item preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{imageFile?.name}</p>
                      <p className="text-xs text-gray-400">
                        {(imageFile?.size || 0 / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <FaTrash className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <FaInfoCircle className="size-4" />
                </div>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Covaxin Vaccine, Paracetamol 500mg"
                    className={`w-full border ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className={`w-full border ${
                        errors.category ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white appearance-none`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {formData.category && (
                      <div className={`absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-lg flex items-center justify-center ${categoryColors[formData.category as StockCategory]}`}>
                        {categoryIcons[formData.category as StockCategory]}
                      </div>
                    )}
                  </div>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Sub-Category
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => handleChange('subCategory', e.target.value)}
                    placeholder="e.g. COVID-19, Pain Relief"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Quantity & Pricing */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <FaWeightHanging className="size-4" />
                </div>
                Quantity & Pricing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    placeholder="0"
                    className={`w-full border ${
                      errors.quantity ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.quantity && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.quantity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Minimum Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.minQuantity}
                    onChange={(e) => handleChange('minQuantity', e.target.value)}
                    placeholder="0"
                    className={`w-full border ${
                      errors.minQuantity ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.minQuantity && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.minQuantity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    className={`w-full border ${
                      errors.unit ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {errors.unit && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.unit}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Purchase Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => handleChange('purchasePrice', e.target.value)}
                      placeholder="0.00"
                      className={`w-full border ${
                        errors.purchasePrice ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.purchasePrice && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.purchasePrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Selling Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="number"
                      value={formData.sellingPrice}
                      onChange={(e) => handleChange('sellingPrice', e.target.value)}
                      placeholder="0.00"
                      className={`w-full border ${
                        errors.sellingPrice ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.sellingPrice && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.sellingPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Batch & Expiry */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                  <FaTag className="size-4" />
                </div>
                Batch & Expiry Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Batch Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => handleChange('batchNumber', e.target.value)}
                    placeholder="e.g. CVX-2026-01"
                    className={`w-full border ${
                      errors.batchNumber ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono`}
                  />
                  {errors.batchNumber && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.batchNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleChange('expiryDate', e.target.value)}
                      className={`w-full border ${
                        errors.expiryDate ? 'border-red-300' : 'border-gray-200'
                      } rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.expiryDate && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => handleChange('manufacturer', e.target.value)}
                    placeholder="e.g. Bharat Biotech"
                    className={`w-full border ${
                      errors.manufacturer ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.manufacturer && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.manufacturer}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Supplier */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                  <FaBuilding className="size-4" />
                </div>
                Location & Supplier
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={`w-full border ${
                      errors.location ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white`}
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Supplier
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => handleChange('supplier', e.target.value)}
                    placeholder="e.g. Government Supply"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                    <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600">
                  <FaFileInvoice className="size-4" />
                </div>
                Additional Notes
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes
                  <span className="text-xs text-gray-400 ml-1 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                  placeholder="Any additional notes about this item..."
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 p-4 bg-linear-to-r from-blue-50/60 to-purple-50/30 rounded-xl border border-blue-100/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100/60 rounded-xl">
                    <FaBoxes className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Item Summary</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.name || 'New Item'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formData.category || 'Category not selected'}
                      {formData.subCategory && ` • ${formData.subCategory}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">Quantity</p>
                    <p className="text-sm font-bold text-gray-800">
                      {formData.quantity || '0'} {formData.unit}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">Price</p>
                    <p className="text-sm font-bold text-gray-800">
                      ₹ {formData.sellingPrice || '0.00'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">Status</p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {formData.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
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
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="size-4" /> Save Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Info Note */}
        <div className="bg-blue-50/60 rounded-xl border border-blue-100/60 p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">Inventory Management</p>
            <p className="text-xs text-blue-700 mt-0.5">
              This item will be added to inventory with code: <span className="font-mono font-medium">{itemCode}</span>. 
              Please ensure all details are accurate before saving.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default StockCreate;