import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

type TreatmentStatus =
  | "Completed"
  | "Scheduled"
  | "Missed"
  | "Cancelled";

interface Treatment {
  id: string;
  patientName: string;
  patientId: string;
  treatment: string;
  therapist: string;
  date: string;
  time: string;
  status: TreatmentStatus;
}

const treatments: Treatment[] = [
  {
    id: "TR-1001",
    patientName: "Rajesh Kumar",
    patientId: "PT-1001",
    treatment: "Physiotherapy",
    therapist: "Dr. Amit Patel",
    date: "18 Jul 2026",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: "TR-1002",
    patientName: "Punit Shah",
    patientId: "PT-1002",
    treatment: "Rehabilitation",
    therapist: "Dr. Ravi Mehta",
    date: "19 Jul 2026",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: "TR-1003",
    patientName: "Neha Patel",
    patientId: "PT-1003",
    treatment: "Speech Therapy",
    therapist: "Dr. Priya Shah",
    date: "19 Jul 2026",
    time: "02:00 PM",
    status: "Scheduled",
  },
  {
    id: "TR-1004",
    patientName: "Amit Joshi",
    patientId: "PT-1004",
    treatment: "Occupational Therapy",
    therapist: "Dr. Karan Shah",
    date: "17 Jul 2026",
    time: "04:00 PM",
    status: "Missed",
  },
  {
    id: "TR-1005",
    patientName: "Kavita Mehta",
    patientId: "PT-1005",
    treatment: "Physiotherapy",
    therapist: "Dr. Amit Patel",
    date: "16 Jul 2026",
    time: "09:30 AM",
    status: "Completed",
  },
];

const statusStyles: Record<TreatmentStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Scheduled: "bg-blue-50 text-blue-700",
  Missed: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

const TreatmentListPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const filteredTreatments = treatments.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.treatment.toLowerCase().includes(search.toLowerCase()) ||
      item.therapist.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All Status" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-10">

      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Treatment Sessions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track all patient treatment sessions.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <span className="text-lg">+</span>
          Add Treatment
        </button>
      </div>


      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={18} className="text-slate-500" />

          <h2 className="font-semibold text-slate-900">
            Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          {/* Search */}
          <div className="relative xl:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, treatment or therapist..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>


          {/* Status */}
          <div className="relative">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
            >
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Missed</option>
              <option>Cancelled</option>
            </select>
          </div>


          {/* Date */}
          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

        </div>
      </div>


      {/* Results */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <div>
            <h2 className="font-semibold text-slate-900">
              All Treatment Sessions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Showing {filteredTreatments.length} treatment sessions
            </p>
          </div>

        </div>


        {/* Desktop List */}
        <div className="hidden overflow-x-auto lg:block">

          <div className="min-w-[950px]">

            {/* Column Header */}
            <div className="grid grid-cols-[1.4fr_1.3fr_1.3fr_1.2fr_1fr_100px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">

              <span>Patient</span>
              <span>Treatment</span>
              <span>Therapist</span>
              <span>Date & Time</span>
              <span>Status</span>
              <span>Action</span>

            </div>


            {/* Rows */}
            <div className="divide-y divide-slate-100">

              {filteredTreatments.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-[1.4fr_1.3fr_1.3fr_1.2fr_1fr_100px] items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                >

                  {/* Patient */}
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {item.patientName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.patientName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.patientId}
                      </p>
                    </div>

                  </div>


                  {/* Treatment */}
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {item.treatment}
                    </p>

                    <p className="text-xs text-slate-400">
                      {item.id}
                    </p>
                  </div>


                  {/* Therapist */}
                  <p className="text-sm text-slate-600">
                    {item.therapist}
                  </p>


                  {/* Date */}
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {item.date}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.time}
                    </p>
                  </div>


                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>


                  {/* Actions */}
                  <div className="flex items-center gap-2">

                    <button
                      title="View"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      title="Edit"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Pencil size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredTreatments.map((item) => (

            <div
              key={item.id}
              className="space-y-4 p-5 transition hover:bg-slate-50"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {item.patientName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.patientName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.patientId}
                    </p>
                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>

              </div>


              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-xs text-slate-400">
                    Treatment
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {item.treatment}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Therapist
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {item.therapist}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {item.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Time
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {item.time}
                  </p>
                </div>

              </div>


              <div className="flex gap-2 border-t border-slate-100 pt-4">

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <Eye size={16} />
                  View
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
                  <Pencil size={16} />
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {filteredTreatments.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search size={24} className="text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No treatment sessions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter criteria.
            </p>

          </div>
        )}

      </div>


      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            1–{filteredTreatments.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {filteredTreatments.length}
          </span>{" "}
          sessions
        </p>

        <div className="flex items-center gap-2">

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
            <ChevronLeft size={18} />
          </button>

          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
            1
          </button>

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            2
          </button>

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default TreatmentListPage;