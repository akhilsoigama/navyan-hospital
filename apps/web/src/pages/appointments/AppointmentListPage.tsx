// pages/dashboard/appointments/AppointmentListPage.tsx
import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaUserMd,
  FaTag,
} from "react-icons/fa";

// ---------- Types ----------
type Appointment = {
  id: string;
  patientName: string;
  mobile: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: "Confirmed" | "Waiting" | "Completed" | "Cancelled";
};

// ---------- Mock Data (replace with real API later) ----------
const mockAppointments: Appointment[] = [
  { id: "A2001", patientName: "Jignesh Patel", mobile: "98765 43210", date: "18-07-2026", time: "09:00 AM", doctor: "Dr. Ashish Rathod", type: "Consultation", status: "Confirmed" },
  { id: "A2002", patientName: "Kajal Shah", mobile: "98765 43221", date: "18-07-2026", time: "10:00 AM", doctor: "Dr. Ashish Rathod", type: "Follow-up", status: "Waiting" },
  { id: "A2003", patientName: "Ramesh Parmar", mobile: "98765 43232", date: "18-07-2026", time: "11:00 AM", doctor: "Physio - Dhaval", type: "Therapy Session", status: "Completed" },
  { id: "A2004", patientName: "Hetal Mehta", mobile: "98765 43243", date: "18-07-2026", time: "12:00 PM", doctor: "Physio - Dhaval", type: "Re-Assessment", status: "Confirmed" },
  { id: "A2005", patientName: "Mahesh Solanki", mobile: "98765 43254", date: "18-07-2026", time: "04:00 PM", doctor: "Dr. Ashish Rathod", type: "Consultation", status: "Waiting" },
  { id: "A2006", patientName: "Kalpesh Desai", mobile: "98765 43210", date: "17-07-2026", time: "10:30 AM", doctor: "Physio - Kavya", type: "Therapy Session", status: "Cancelled" },
];

const statusStyle: Record<Appointment["status"], string> = {
  Confirmed: "bg-blue-50 text-blue-600",
  Waiting: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-600",
};

const statusOptions = ["All", "Confirmed", "Waiting", "Completed", "Cancelled"];

const AppointmentListPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = mockAppointments.filter((a) => {
    const matchSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.mobile.replace(" ", "").includes(search.replace(" ", ""));
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    const matchDate = !dateFilter || a.date === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50/80 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <p className="text-sm text-gray-400 mt-1">Manage and track all patient appointments</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0">
          <FaPlus className="size-3.5" /> New Appointment
        </button>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium">Total Appointments</p>
          <p className="text-2xl font-bold text-gray-800 mt-1.5">{mockAppointments.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium">Confirmed</p>
          <p className="text-2xl font-bold text-blue-600 mt-1.5">
            {mockAppointments.filter((a) => a.status === "Confirmed").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium">Waiting</p>
          <p className="text-2xl font-bold text-amber-600 mt-1.5">
            {mockAppointments.filter((a) => a.status === "Waiting").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium">Completed</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1.5">
            {mockAppointments.filter((a) => a.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* Filters + Table */}
      <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
        <div className="p-5 border-b border-gray-100/80">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by patient name or mobile..."
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-auto"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-600 bg-white min-w-30"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-5 pt-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b border-gray-100/80">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Mobile</th>
                <th className="pb-3 font-medium">Date & Time</th>
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5">
                      <div>
                        <p className="text-gray-800 font-medium">{a.patientName}</p>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wide">{a.id}</p>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="flex items-center gap-2 text-gray-600 text-xs">
                        <FaPhoneAlt className="size-3 text-gray-300" /> {a.mobile}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex flex-col">
                        <span className="text-gray-800 text-xs font-medium">{a.date}</span>
                        <span className="text-gray-400 text-[10px] flex items-center gap-1">
                          <FaClock className="size-2.5" /> {a.time}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="text-gray-600 text-xs flex items-center gap-1.5">
                        <FaUserMd className="size-3 text-gray-300" /> {a.doctor}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-gray-600 text-xs flex items-center gap-1.5">
                        <FaTag className="size-3 text-gray-300" /> {a.type}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="View">
                          <FaEye className="size-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all" title="Edit">
                          <FaEdit className="size-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Cancel">
                          <FaTrash className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-4xl text-gray-200">📅</div>
                      <p className="text-gray-400 text-sm font-medium">No appointments found</p>
                      <p className="text-gray-300 text-xs">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pt-0 border-t border-gray-100/80">
          <p className="text-xs text-gray-400 font-medium">
            Showing <span className="text-gray-600">{filtered.length}</span> of{" "}
            <span className="text-gray-600">{mockAppointments.length}</span> appointments
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
      </div>
    </div>
  );
};

export default AppointmentListPage;