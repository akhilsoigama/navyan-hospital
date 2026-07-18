// pages/dashboard/DashboardPage.tsx
import {
  FaUserFriends,
  FaCalendarAlt,
  FaRupeeSign,
  FaWallet,
  FaBoxOpen,
  FaPlus,
  FaFileInvoice,
  FaUserPlus,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---------- Mock Data (replace with real API data later) ----------
const stats = [
  { 
    label: "Total Patients", 
    value: "1,248", 
    sub: "+18 This Month", 
    icon: FaUserFriends, 
    bg: "bg-blue-50", 
    color: "text-blue-600" 
  },
  { 
    label: "Today's Appointments", 
    value: "24", 
    sub: "+6 Upcoming", 
    icon: FaCalendarAlt, 
    bg: "bg-emerald-50", 
    color: "text-emerald-600" 
  },
  { 
    label: "Today's Collection", 
    value: "₹ 38,450", 
    sub: "+12% vs Yesterday", 
    icon: FaRupeeSign, 
    bg: "bg-orange-50", 
    color: "text-orange-600" 
  },
  { 
    label: "Today's Sessions", 
    value: "31", 
    sub: "+8 Completed", 
    icon: GiMeditation, 
    bg: "bg-purple-50", 
    color: "text-purple-600" 
  },
  { 
    label: "Pending Payments", 
    value: "₹ 16,850", 
    sub: "12 Pending Bills", 
    icon: FaWallet, 
    bg: "bg-red-50", 
    color: "text-red-600" 
  },
  { 
    label: "Low Stock Items", 
    value: "7", 
    sub: "View Stock", 
    icon: FaBoxOpen, 
    bg: "bg-amber-50", 
    color: "text-amber-600" 
  },
];

const quickActions = [
  { label: "New Patient", sub: "Add Patient", icon: FaUserPlus, color: "bg-blue-600" },
  { label: "New Appointment", sub: "Book Appointment", icon: FaCalendarAlt, color: "bg-emerald-600" },
  { label: "New Billing", sub: "Create Invoice", icon: FaFileInvoice, color: "bg-orange-500" },
  { label: "Start Session", sub: "Add Therapy Session", icon: GiMeditation, color: "bg-purple-600" },
  { label: "Add Stock", sub: "New Product Entry", icon: FaPlus, color: "bg-sky-600" },
];

const todaysAppointments = [
  { time: "09:00 AM", patient: "Jignesh Patel", doctor: "Dr. Ashish Rathod", status: "Confirmed" },
  { time: "10:00 AM", patient: "Kajal Shah", doctor: "Dr. Ashish Rathod", status: "Waiting" },
  { time: "11:00 AM", patient: "Ramesh Parmar", doctor: "Physio - Dhaval", status: "Completed" },
  { time: "12:00 PM", patient: "Hetal Mehta", doctor: "Physio - Dhaval", status: "Confirmed" },
  { time: "04:00 PM", patient: "Mahesh Solanki", doctor: "Dr. Ashish Rathod", status: "Waiting" },
];

const recentPatients = [
  { id: "P1250", name: "Kalpesh Desai", mobile: "98765 43210", lastVisit: "14-07-2026", status: "Active" },
  { id: "P1249", name: "Nirali Trivedi", mobile: "98765 43211", lastVisit: "13-07-2026", status: "Active" },
  { id: "P1248", name: "Haresh Prajapati", mobile: "98765 43212", lastVisit: "13-07-2026", status: "Active" },
];

const collectionData = [
  { week: "Week 1", value: 2.5 },
  { week: "Week 2", value: 3.2 },
  { week: "Week 3", value: 4.0 },
  { week: "Week 4", value: 4.4 },
  { week: "Week 5", value: 4.85, highlight: true },
];

const sessionData = [
  { name: "Completed", value: 18, color: "#2563eb" },
  { name: "Running", value: 9, color: "#f59e0b" },
  { name: "Pending", value: 4, color: "#8b5cf6" },
];

const lowStock = [
  { name: "Rosinext Gold Tablet", stock: 5 },
  { name: "Pain Care Roll On", stock: 3 },
  { name: "Muscle Mate Gun", stock: 2 },
  { name: "Arch Support Insole", stock: 4 },
  { name: "Celsam Supplement", stock: 6 },
];

const followUps = [
  { label: "Today's Follow-ups", count: 8, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Tomorrow's Follow-ups", count: 12, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Missed Follow-ups", count: 5, color: "text-red-600", bg: "bg-red-50" },
];

const statusStyle: Record<string, string> = {
  Confirmed: "bg-blue-50 text-blue-600",
  Waiting: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Active: "bg-emerald-50 text-emerald-600",
};

// ---------- Component ----------
const DashboardPage = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50/80 min-h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
        {stats.map((s) => (
          <div 
            key={s.label} 
            className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className={`${s.bg} ${s.color} size-11 rounded-xl flex items-center justify-center shrink-0`}>
                <s.icon className="size-5" />
              </div>
              <span className="text-xs text-gray-400 font-medium">{s.label}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 tracking-tight">{s.value}</p>
              <p className={`text-xs mt-1.5 ${s.color} font-medium`}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all duration-200 text-left group"
          >
            <div className={`${a.color} size-12 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200`}>
              <a.icon className="size-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{a.label}</p>
              <p className="text-xs text-gray-400">{a.sub}</p>
            </div>
            <FaChevronRight className="size-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Today's Appointments</h3>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <FaArrowRight className="size-3" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysAppointments.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 text-gray-600 font-medium">{a.time}</td>
                      <td className="py-3 text-gray-800 font-medium">{a.patient}</td>
                      <td className="py-3 text-gray-500 text-xs">{a.doctor}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Patients</h3>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <FaArrowRight className="size-3" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Mobile</th>
                    <th className="pb-3 font-medium">Last Visit</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 text-gray-400 text-xs">{p.id}</td>
                      <td className="py-3 text-gray-800 font-medium">{p.name}</td>
                      <td className="py-3 text-gray-500 text-xs">{p.mobile}</td>
                      <td className="py-3 text-gray-500 text-xs">{p.lastVisit}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Monthly Collection */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Monthly Collection</h3>
              <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="flex items-end gap-3 mb-2">
              <p className="text-3xl font-bold text-gray-800 tracking-tight">₹ 4,85,620</p>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium">
                ↑ 18.6%
              </span>
            </div>
            <p className="text-xs text-gray-400 -mt-1 mb-4">Total Collection</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={collectionData} barSize={32}>
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 11, fill: '#9ca3af' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#9ca3af' }} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(v) => `${v}L`} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #f3f4f6',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    padding: '8px 12px'
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {collectionData.map((d, i) => (
                    <Cell key={i} fill={d.highlight ? "#f59e0b" : "#2563eb"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Today's Therapy Sessions */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Therapy Sessions</h3>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <FaArrowRight className="size-3" />
              </a>
            </div>
            <div className="flex items-center gap-8">
              <div className="relative w-36 h-36 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionData}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      stroke="white"
                      strokeWidth={2}
                    >
                      {sessionData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">31</span>
                  <span className="text-[10px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex-1 space-y-2.5">
                {sessionData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {d.value} ({Math.round((d.value / 31) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Low Stock Alert</h3>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <FaArrowRight className="size-3" />
              </a>
            </div>
            <div className="space-y-3.5">
              {lowStock.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <FaBoxOpen className="text-gray-400 size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">Stock: {item.stock}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium">
                    Low Stock
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups */}
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Follow-ups</h3>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <FaArrowRight className="size-3" />
              </a>
            </div>
            <div className="space-y-3.5">
              {followUps.map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl ${f.bg} flex items-center justify-center`}>
                      <FaCalendarAlt className={`size-4 ${f.color}`} />
                    </div>
                    <p className="text-sm text-gray-800 font-medium">{f.label}</p>
                  </div>
                  <span className={`text-sm font-bold ${f.color}`}>{f.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;