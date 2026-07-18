import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Receipt,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

type PaymentStatus = "Paid" | "Pending" | "Partial" | "Overdue";

interface BillingRecord {
  id: string;
  patientName: string;
  patientId: string;
  service: string;
  amount: string;
  method: string;
  date: string;
  status: PaymentStatus;
}

const billingRecords: BillingRecord[] = [
  {
    id: "INV-1024",
    patientName: "Rahul Sharma",
    patientId: "PT-1001",
    service: "Treatment Session",
    amount: "₹2,500",
    method: "UPI",
    date: "18 Jul 2026",
    status: "Paid",
  },
  {
    id: "INV-1023",
    patientName: "Priya Patel",
    patientId: "PT-1002",
    service: "Patient Assessment",
    amount: "₹1,500",
    method: "Card",
    date: "18 Jul 2026",
    status: "Paid",
  },
  {
    id: "INV-1022",
    patientName: "Amit Shah",
    patientId: "PT-1003",
    service: "Therapy Session",
    amount: "₹3,000",
    method: "Cash",
    date: "17 Jul 2026",
    status: "Pending",
  },
  {
    id: "INV-1021",
    patientName: "Neha Joshi",
    patientId: "PT-1004",
    service: "Consultation",
    amount: "₹1,000",
    method: "UPI",
    date: "17 Jul 2026",
    status: "Paid",
  },
  {
    id: "INV-1020",
    patientName: "Kavita Mehta",
    patientId: "PT-1005",
    service: "Physiotherapy",
    amount: "₹4,500",
    method: "Card",
    date: "16 Jul 2026",
    status: "Partial",
  },
  {
    id: "INV-1019",
    patientName: "Rajesh Kumar",
    patientId: "PT-1006",
    service: "Rehabilitation",
    amount: "₹5,000",
    method: "Cash",
    date: "15 Jul 2026",
    status: "Overdue",
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-orange-50 text-orange-700",
  Partial: "bg-blue-50 text-blue-700",
  Overdue: "bg-red-50 text-red-700",
};

const AllBillingPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const filteredBilling = billingRecords.filter((item) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.patientName.toLowerCase().includes(searchValue) ||
      item.patientId.toLowerCase().includes(searchValue) ||
      item.id.toLowerCase().includes(searchValue) ||
      item.service.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "All Status" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-10">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Receipt size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                All Billing
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all patient billing records.
              </p>
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Receipt size={18} />
          Generate Bill
        </button>

      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Invoices
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            342
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            This month
          </p>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Amount
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            ₹2,26,711
          </h2>

          <p className="mt-1 text-xs text-emerald-600">
            +12.5% from last month
          </p>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Paid Amount
          </p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            ₹1,85,311
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Successfully collected
          </p>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Pending Amount
          </p>

          <h2 className="mt-2 text-2xl font-bold text-orange-600">
            ₹41,400
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Requires collection
          </p>
        </div>

      </div>


      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="text-slate-500"
          />

          <h2 className="font-semibold text-slate-900">
            Search & Filters
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
              placeholder="Search invoice, patient or service..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Partial</option>
              <option>Overdue</option>
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
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

        </div>

      </div>


      {/* Billing Records */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-slate-900">
              Billing Records
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Showing {filteredBilling.length} billing records
            </p>
          </div>

        </div>


        {/* Desktop View */}
        <div className="hidden overflow-x-auto lg:block">

          <div className="min-w-[1050px]">

            {/* Column Header */}
            <div className="grid grid-cols-[1.2fr_1.5fr_1.5fr_1fr_1fr_1fr_100px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">

              <span>Invoice</span>
              <span>Patient</span>
              <span>Service</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Status</span>
              <span>Action</span>

            </div>


            {/* Records */}
            <div className="divide-y divide-slate-100">

              {filteredBilling.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-[1.2fr_1.5fr_1.5fr_1fr_1fr_1fr_100px] items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                >

                  {/* Invoice */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.date}
                    </p>
                  </div>


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


                  {/* Service */}
                  <p className="text-sm font-medium text-slate-700">
                    {item.service}
                  </p>


                  {/* Amount */}
                  <p className="text-sm font-bold text-slate-900">
                    {item.amount}
                  </p>


                  {/* Method */}
                  <p className="text-sm text-slate-600">
                    {item.method}
                  </p>


                  {/* Status */}
                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>


                  {/* Actions */}
                  <div className="flex items-center gap-1">

                    <button
                      title="View Invoice"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      title="Edit Invoice"
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


        {/* Mobile View */}
        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredBilling.map((item) => (

            <div
              key={item.id}
              className="space-y-4 p-5 transition hover:bg-slate-50"
            >

              {/* Patient Header */}
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


              {/* Billing Details */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Invoice
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {item.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Service
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.service}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Amount
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {item.amount}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.method}
                  </p>
                </div>

              </div>


              {/* Mobile Actions */}
              <div className="flex gap-2 border-t border-slate-100 pt-4">

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                  <Eye size={16} />
                  View Invoice
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                  <Pencil size={16} />
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {filteredBilling.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Receipt
                size={24}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No billing records found
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
            1–{filteredBilling.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {filteredBilling.length}
          </span>{" "}
          invoices
        </p>


        <div className="flex items-center gap-2">

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50">
            <ChevronLeft size={18} />
          </button>

          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
            1
          </button>

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            2
          </button>

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50">
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default AllBillingPage;