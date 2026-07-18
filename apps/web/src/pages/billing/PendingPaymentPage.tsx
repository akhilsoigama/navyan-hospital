import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Phone,
  Search,
  Send,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

type PaymentStatus = "Pending" | "Overdue" | "Partial";

interface PendingPayment {
  id: string;
  patientName: string;
  patientId: string;
  invoiceId: string;
  service: string;
  totalAmount: string;
  paidAmount: string;
  pendingAmount: string;
  dueDate: string;
  status: PaymentStatus;
}

const pendingPayments: PendingPayment[] = [
  {
    id: "PAY-1001",
    patientName: "Amit Shah",
    patientId: "PT-1003",
    invoiceId: "INV-1022",
    service: "Therapy Session",
    totalAmount: "₹3,000",
    paidAmount: "₹1,000",
    pendingAmount: "₹2,000",
    dueDate: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: "PAY-1002",
    patientName: "Kavita Mehta",
    patientId: "PT-1005",
    invoiceId: "INV-1020",
    service: "Physiotherapy",
    totalAmount: "₹4,500",
    paidAmount: "₹2,000",
    pendingAmount: "₹2,500",
    dueDate: "18 Jul 2026",
    status: "Partial",
  },
  {
    id: "PAY-1003",
    patientName: "Rajesh Kumar",
    patientId: "PT-1006",
    invoiceId: "INV-1019",
    service: "Rehabilitation",
    totalAmount: "₹5,000",
    paidAmount: "₹0",
    pendingAmount: "₹5,000",
    dueDate: "12 Jul 2026",
    status: "Overdue",
  },
  {
    id: "PAY-1004",
    patientName: "Meena Patel",
    patientId: "PT-1007",
    invoiceId: "INV-1017",
    service: "Treatment Session",
    totalAmount: "₹2,500",
    paidAmount: "₹500",
    pendingAmount: "₹2,000",
    dueDate: "22 Jul 2026",
    status: "Pending",
  },
  {
    id: "PAY-1005",
    patientName: "Suresh Joshi",
    patientId: "PT-1008",
    invoiceId: "INV-1015",
    service: "Consultation",
    totalAmount: "₹1,500",
    paidAmount: "₹500",
    pendingAmount: "₹1,000",
    dueDate: "10 Jul 2026",
    status: "Overdue",
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  Pending: "bg-orange-50 text-orange-700",
  Partial: "bg-blue-50 text-blue-700",
  Overdue: "bg-red-50 text-red-700",
};

const PendingPaymentPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const filteredPayments = pendingPayments.filter((item) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.patientName.toLowerCase().includes(searchValue) ||
      item.patientId.toLowerCase().includes(searchValue) ||
      item.invoiceId.toLowerCase().includes(searchValue) ||
      item.service.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "All Status" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-10">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <WalletCards size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Pending Payments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track outstanding invoices and payment follow-ups.
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Send size={18} />
          Send Payment Reminder
        </button>

      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
            <IndianRupee
              size={21}
              className="text-orange-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Pending
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            ₹12,500
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Outstanding amount
          </p>

        </div>


        {/* Overdue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
            <AlertCircle
              size={21}
              className="text-red-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Overdue Amount
          </p>

          <h2 className="mt-1 text-2xl font-bold text-red-600">
            ₹6,000
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Requires immediate follow-up
          </p>

        </div>


        {/* Pending Invoices */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Clock3
              size={21}
              className="text-blue-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Pending Invoices
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            8
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Awaiting payment
          </p>

        </div>


        {/* Collection Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <CheckCircle2
              size={21}
              className="text-emerald-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Collection Rate
          </p>

          <h2 className="mt-1 text-2xl font-bold text-emerald-600">
            94.6%
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Overall payment collection
          </p>

        </div>

      </div>


      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Search */}
          <div className="relative md:col-span-2">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, invoice or service..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Partial</option>
            <option>Overdue</option>
          </select>

        </div>

      </div>


      {/* Pending Payment Records */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b border-slate-100 p-5">

          <h2 className="font-semibold text-slate-900">
            Outstanding Payments
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredPayments.length} payment records
          </p>

        </div>


        {/* Desktop View */}
        <div className="hidden overflow-x-auto lg:block">

          <div className="min-w-[1100px]">

            {/* Columns */}
            <div className="grid grid-cols-[1.3fr_1.7fr_1.4fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">

              <span>Invoice</span>
              <span>Patient</span>
              <span>Service</span>
              <span>Total</span>
              <span>Pending</span>
              <span>Due Date</span>
              <span>Status</span>

            </div>


            {/* Records */}
            <div className="divide-y divide-slate-100">

              {filteredPayments.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-[1.3fr_1.7fr_1.4fr_1fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                >

                  {/* Invoice */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.invoiceId}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.id}
                    </p>
                  </div>


                  {/* Patient */}
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
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


                  {/* Total */}
                  <p className="text-sm font-semibold text-slate-700">
                    {item.totalAmount}
                  </p>


                  {/* Pending */}
                  <p className="text-sm font-bold text-orange-600">
                    {item.pendingAmount}
                  </p>


                  {/* Due Date */}
                  <p className="text-sm text-slate-600">
                    {item.dueDate}
                  </p>


                  {/* Status */}
                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredPayments.map((item) => (

            <div
              key={item.id}
              className="space-y-4 p-5 transition hover:bg-slate-50"
            >

              {/* Patient */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
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


              {/* Details */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Invoice
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {item.invoiceId}
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
                    Total Amount
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {item.totalAmount}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-slate-400">
                    Pending Amount
                  </p>

                  <p className="mt-1 text-sm font-bold text-orange-600">
                    {item.pendingAmount}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-700">
                    <CalendarDays size={14} />
                    {item.dueDate}
                  </p>
                </div>

              </div>


              {/* Actions */}
              <div className="flex gap-2 border-t border-slate-100 pt-4">

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                  <Phone size={16} />
                  Contact
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                  <Send size={16} />
                  Reminder
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={25}
                className="text-emerald-500"
              />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No pending payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              All payments are currently up to date.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default PendingPaymentPage;