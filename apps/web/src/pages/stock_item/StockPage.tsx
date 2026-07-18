// pages/dashboard/master/StockPage.tsx
import { useState, type JSX } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaDownload,
  FaPrint,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaBuilding,
  FaSyringe,
  FaPills,
  FaBoxes,
  FaThermometerHalf,
  FaCalendarAlt,
  FaFileInvoice,
  FaTimes,
} from 'react-icons/fa';
import Page from '../../section/Page';

// ---------- Types ----------
type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';

type StockItem = {
  id: string;
  itemCode: string;
  name: string;
  category: 'Vaccine' | 'Medicine' | 'Equipment' | 'Supplies';
  subCategory?: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  batchNumber: string;
  expiryDate: string;
  manufacturer: string;
  supplier: string;
  location: string;
  status: StockStatus;
  imageUrl?: string;
  description?: string;
  lastUpdated: string;
  createdAt: string;
};

// ---------- Mock Data with Different Images ----------
const mockStock: StockItem[] = [
  {
    id: '1',
    itemCode: 'VAC-001',
    name: 'Covaxin Vaccine',
    category: 'Vaccine',
    subCategory: 'COVID-19',
    quantity: 45,
    minQuantity: 20,
    unit: 'Vials',
    purchasePrice: 150,
    sellingPrice: 250,
    batchNumber: 'CVX-2026-01',
    expiryDate: '2027-12-31',
    manufacturer: 'Bharat Biotech',
    supplier: 'Government Supply',
    location: 'Mehsana Center',
    status: 'in-stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&crop=center',
    description: 'COVID-19 vaccine for adults',
    lastUpdated: '2026-07-18T10:30:00Z',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: '2',
    itemCode: 'VAC-002',
    name: 'Measles Vaccine',
    category: 'Vaccine',
    subCategory: 'Childhood',
    quantity: 8,
    minQuantity: 15,
    unit: 'Vials',
    purchasePrice: 80,
    sellingPrice: 150,
    batchNumber: 'MSL-2026-02',
    expiryDate: '2027-06-30',
    manufacturer: 'Serum Institute',
    supplier: 'Medical Distributors',
    location: 'Ahmedabad Center',
    status: 'low-stock',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=200&fit=crop&crop=center',
    description: 'Measles vaccine for children',
    lastUpdated: '2026-07-17T14:20:00Z',
    createdAt: '2026-02-20T11:30:00Z',
  },
  {
    id: '3',
    itemCode: 'MED-001',
    name: 'Paracetamol 500mg',
    category: 'Medicine',
    subCategory: 'Pain Relief',
    quantity: 0,
    minQuantity: 50,
    unit: 'Tablets',
    purchasePrice: 5,
    sellingPrice: 10,
    batchNumber: 'PCM-2026-03',
    expiryDate: '2027-09-15',
    manufacturer: 'Cipla',
    supplier: 'Pharma Distributors',
    location: 'Mehsana Center',
    status: 'out-of-stock',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=200&fit=crop&crop=center',
    description: 'Paracetamol tablets 500mg',
    lastUpdated: '2026-07-16T09:45:00Z',
    createdAt: '2026-03-10T08:15:00Z',
  },
  {
    id: '4',
    itemCode: 'VAC-003',
    name: 'Hepatitis B Vaccine',
    category: 'Vaccine',
    subCategory: 'Liver',
    quantity: 12,
    minQuantity: 10,
    unit: 'Vials',
    purchasePrice: 200,
    sellingPrice: 350,
    batchNumber: 'HEP-2026-04',
    expiryDate: '2027-08-20',
    manufacturer: 'GlaxoSmithKline',
    supplier: 'International Medical Supply',
    location: 'Surat Center',
    status: 'in-stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Hepatitis B vaccine for adults',
    lastUpdated: '2026-07-15T16:00:00Z',
    createdAt: '2026-04-05T13:45:00Z',
  },
  {
    id: '5',
    itemCode: 'VAC-004',
    name: 'BCG Vaccine',
    category: 'Vaccine',
    subCategory: 'Childhood',
    quantity: 3,
    minQuantity: 20,
    unit: 'Vials',
    purchasePrice: 120,
    sellingPrice: 200,
    batchNumber: 'BCG-2026-05',
    expiryDate: '2027-11-10',
    manufacturer: 'Serum Institute',
    supplier: 'Government Supply',
    location: 'Vadodara Center',
    status: 'low-stock',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'BCG vaccine for tuberculosis',
    lastUpdated: '2026-07-14T11:30:00Z',
    createdAt: '2026-05-20T10:00:00Z',
  },
  {
    id: '6',
    itemCode: 'VAC-005',
    name: 'Flu Vaccine',
    category: 'Vaccine',
    subCategory: 'Influenza',
    quantity: 2,
    minQuantity: 25,
    unit: 'Vials',
    purchasePrice: 180,
    sellingPrice: 300,
    batchNumber: 'FLU-2026-06',
    expiryDate: '2026-12-31',
    manufacturer: 'Sanofi Pasteur',
    supplier: 'Medical Distributors',
    location: 'Ahmedabad Center',
    status: 'low-stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Annual influenza vaccine',
    lastUpdated: '2026-07-13T08:20:00Z',
    createdAt: '2026-06-15T14:30:00Z',
  },
  {
    id: '7',
    itemCode: 'VAC-006',
    name: 'MMR Vaccine',
    category: 'Vaccine',
    subCategory: 'Childhood',
    quantity: 0,
    minQuantity: 15,
    unit: 'Vials',
    purchasePrice: 250,
    sellingPrice: 400,
    batchNumber: 'MMR-2026-07',
    expiryDate: '2027-07-15',
    manufacturer: 'Merck',
    supplier: 'International Medical Supply',
    location: 'Mehsana Center',
    status: 'out-of-stock',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Measles, Mumps, Rubella vaccine',
    lastUpdated: '2026-07-12T15:40:00Z',
    createdAt: '2026-07-01T09:00:00Z',
  },
  {
    id: '8',
    itemCode: 'VAC-007',
    name: 'Polio Vaccine (Oral)',
    category: 'Vaccine',
    subCategory: 'Childhood',
    quantity: 25,
    minQuantity: 30,
    unit: 'Vials',
    purchasePrice: 100,
    sellingPrice: 180,
    batchNumber: 'POL-2026-08',
    expiryDate: '2028-01-20',
    manufacturer: 'Serum Institute',
    supplier: 'Government Supply',
    location: 'Surat Center',
    status: 'in-stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Oral polio vaccine for children',
    lastUpdated: '2026-07-11T10:15:00Z',
    createdAt: '2026-07-10T08:30:00Z',
  },
  {
    id: '9',
    itemCode: 'MED-002',
    name: 'Vitamin D3 Supplements',
    category: 'Medicine',
    subCategory: 'Supplements',
    quantity: 15,
    minQuantity: 20,
    unit: 'Bottles',
    purchasePrice: 120,
    sellingPrice: 200,
    batchNumber: 'VITD-2026-09',
    expiryDate: '2027-10-15',
    manufacturer: 'Abbott',
    supplier: 'Pharma Distributors',
    location: 'Mehsana Center',
    status: 'low-stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Vitamin D3 supplements for bone health',
    lastUpdated: '2026-07-10T14:30:00Z',
    createdAt: '2026-07-05T09:00:00Z',
  },
  {
    id: '10',
    itemCode: 'VAC-008',
    name: 'Rotavirus Vaccine',
    category: 'Vaccine',
    subCategory: 'Childhood',
    quantity: 6,
    minQuantity: 15,
    unit: 'Vials',
    purchasePrice: 300,
    sellingPrice: 500,
    batchNumber: 'ROT-2026-10',
    expiryDate: '2027-09-30',
    manufacturer: 'GlaxoSmithKline',
    supplier: 'International Medical Supply',
    location: 'Ahmedabad Center',
    status: 'low-stock',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=200&fit=crop&crop=center&auto=format',
    description: 'Rotavirus vaccine for infants',
    lastUpdated: '2026-07-09T12:15:00Z',
    createdAt: '2026-07-01T08:30:00Z',
  },
];

const statusStyle: Record<StockStatus, { bg: string; text: string; icon: JSX.Element; label: string }> = {
  'in-stock': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: <FaCheckCircle className="size-3" />,
    label: 'In Stock',
  },
  'low-stock': {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    icon: <FaClock className="size-3" />,
    label: 'Low Stock',
  },
  'out-of-stock': {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: <FaExclamationTriangle className="size-3" />,
    label: 'Out of Stock',
  },
  'expired': {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    icon: <FaTimes className="size-3" />,
    label: 'Expired',
  },
};

const categoryOptions = ['All', 'Vaccine', 'Medicine', 'Equipment', 'Supplies'];
const statusOptions = ['All', 'in-stock', 'low-stock', 'out-of-stock', 'expired'];
const locationOptions = ['All', 'Mehsana Center', 'Ahmedabad Center', 'Surat Center', 'Vadodara Center'];

const StockPage = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockStock.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(search.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchLocation = locationFilter === 'All' || item.location === locationFilter;
    return matchSearch && matchCategory && matchStatus && matchLocation;
  });



  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vaccine': return <FaSyringe className="size-5" />;
      case 'Medicine': return <FaPills className="size-5" />;
      case 'Equipment': return <FaThermometerHalf className="size-5" />;
      default: return <FaBoxes className="size-5" />;
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysDiff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 0) return { label: 'Expired', color: 'text-red-600', bg: 'bg-red-50' };
    if (daysDiff < 30) return { label: 'Expiring Soon', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Valid', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const totalItems = filtered.length;
  const totalQuantity = filtered.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = filtered.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = filtered.filter(item => item.status === 'out-of-stock').length;

  return (
    <Page title="Stock / Items">
      <div className="p-4 md:p-6 space-y-6  min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0">
            <FaPlus className="size-3.5" /> Add Item
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Items</p>
            <p className="text-2xl font-bold text-gray-800 mt-1.5">{totalItems}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Total Quantity</p>
            <p className="text-2xl font-bold text-blue-600 mt-1.5">{totalQuantity}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600 mt-1.5">{lowStockItems}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600 mt-1.5">{outOfStockItems}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, code, or batch number..."
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
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white"
                >
                  {locationOptions.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Cards Grid with Banner Images */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filtered.map((item) => {
              const expiryStatus = getExpiryStatus(item.expiryDate);
              const status = statusStyle[item.status];
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  {/* Banner Image */}
                  <div className="relative h-32 overflow-hidden bg-linear-to-r from-blue-500 to-purple-500">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500';
                            fallback.innerHTML = `<div class="text-white text-center">
                              <svg class="size-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4-3h2v13h-2z"/>
                              </svg>
                              <span class="text-sm font-medium">${item.name}</span>
                            </div>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500">
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">{getCategoryIcon(item.category)}</div>
                          <p className="text-sm font-medium">{item.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Badge on Image */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm ${status.bg} ${status.text}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>
                    
                    {/* Category Badge on Image */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm bg-white/90 text-gray-700 backdrop-blur-sm`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    {/* Item Name & Code */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-gray-400 font-mono">{item.itemCode}</p>
                        {item.subCategory && (
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] text-gray-400 font-medium">Quantity</p>
                        <p className="text-sm font-bold text-gray-800">
                          {item.quantity} <span className="text-[10px] font-normal text-gray-400">{item.unit}</span>
                        </p>
                        {item.quantity <= item.minQuantity && (
                          <p className="text-[10px] text-amber-600">Min: {item.minQuantity}</p>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] text-gray-400 font-medium">Price</p>
                        <p className="text-sm font-bold text-gray-800">₹ {item.sellingPrice}</p>
                        <p className="text-[10px] text-gray-400">₹ {item.purchasePrice}</p>
                      </div>
                    </div>

                    {/* Batch & Expiry */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">Batch</p>
                        <p className="text-xs font-mono text-gray-700">{item.batchNumber}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">Expiry</p>
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="size-3 text-gray-400" />
                          <p className="text-xs text-gray-700">{item.expiryDate}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${expiryStatus.bg} ${expiryStatus.color} mt-0.5 inline-block`}>
                          {expiryStatus.label}
                        </span>
                      </div>
                    </div>

                    {/* Location & Manufacturer */}
                    <div className="pt-2 border-t border-gray-100/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FaBuilding className="size-3 text-gray-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FaFileInvoice className="size-3 text-gray-400" />
                        <span className="truncate">{item.manufacturer}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100/80">
                      <button className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="View">
                        <FaEye className="size-3.5" />
                      </button>
                      <button className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all" title="Edit">
                        <FaEdit className="size-3.5" />
                      </button>
                      <button className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
                        <FaTrash className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl text-gray-200">📦</div>
              <p className="text-gray-400 text-sm font-medium">No items found</p>
              <p className="text-gray-300 text-xs">Try adjusting your search or filters</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium">
            Showing <span className="text-gray-600">{filtered.length}</span> of{" "}
            <span className="text-gray-600">{mockStock.length}</span> items
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-r from-red-50/60 to-red-50/30 rounded-xl border border-red-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100/60 rounded-xl">
                <FaExclamationTriangle className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Critical Stock</p>
                <p className="text-lg font-bold text-red-700">{outOfStockItems} Items Out of Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50/60 to-amber-50/30 rounded-xl border border-amber-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100/60 rounded-xl">
                <FaClock className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Low Stock Alert</p>
                <p className="text-lg font-bold text-amber-700">{lowStockItems} Items Need Reorder</p>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-50/60 to-emerald-50/30 rounded-xl border border-emerald-100/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100/60 rounded-xl">
                <FaCheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">In Stock</p>
                <p className="text-lg font-bold text-emerald-700">{totalItems - lowStockItems - outOfStockItems} Items Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default StockPage;