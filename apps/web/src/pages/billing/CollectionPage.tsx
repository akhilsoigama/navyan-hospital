import {
  ArrowDownToLine,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  IndianRupee,
  Search,
  Wallet,
} from "lucide-react";
import { useState } from "react";

interface CollectionRecord {
  id: string;
  patientName: string;
  patientId: string;
  invoiceId: string;
  service: string;
  amount: string;
  method: string;
  date: string;
}

const collectionRecords: CollectionRecord[] = [
  {
    id: "COL-1024",
    patientName: "Rahul Sharma",
    patientId: "PT-1001",
    invoiceId: "INV-1024",
    service: "Treatment Session",
    amount: "₹2,500",
    method: "UPI",
    date: "18 Jul 2026",
  },
  {
    id: "COL-1023",
    patientName: "Priya Patel",
    patientId: "PT-1002",
    invoiceId: "INV-1023",
    service: "Patient Assessment",
    amount: "₹1,500",
    method: "Card",
    date: "18 Jul 2026",
  },
  {
    id: "COL-1021",
    patientName: "Neha Joshi",
    patientId: "PT-1004",
    invoiceId: "INV-1021",
    service: "Consultation",
    amount: "₹1,000",
    method: "UPI",
    date: "17 Jul 2026",
  },
  {
    id: "COL-1018",
    patientName: "Kavita Mehta",
    patientId: "PT-1005",
    invoiceId: "INV-1018",
    service: "Physiotherapy",
    amount: "₹4,500",
    method: "Cash",
    date: "16 Jul 2026",
  },
  {
    id: "COL-1016",
    patientName: "Rajesh Kumar",
    patientId: "PT-1006",
    invoiceId: "INV-1016",
    service: "Rehabilitation",
    amount: "₹5,000",
    method: "Card",
    date: "15 Jul 2026",
  },
];

const CollectionPage = () => {
  const [search, setSearch] = useState("");

  const filteredCollections = collectionRecords.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.patientName.toLowerCase().includes(value) ||
      item.patientId.toLowerCase().includes(value) ||
      item.invoiceId.toLowerCase().includes(value) ||
      item.service.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6 p-10">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <IndianRupee size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Collection
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track and manage all successfully collected payments.
              </p>
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
          <Download size={18} />
          Export Collection
        </button>
      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Today's Collection */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <IndianRupee
                size={21}
                className="text-emerald-600"
              />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              +8.2%
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Today's Collection
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            ₹24,650
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Collected today
          </p>
        </div>


        {/* Monthly Collection */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Wallet
              size={21}
              className="text-blue-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Monthly Collection
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            ₹1,85,311
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Total collected this month
          </p>
        </div>


        {/* Transactions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
            <CreditCard
              size={21}
              className="text-purple-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Transactions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            284
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Successful payments
          </p>
        </div>


        {/* Success Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
            <CheckCircle2
              size={21}
              className="text-orange-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Collection Rate
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            94.6%
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Payment collection success
          </p>
        </div>

      </div>


      {/* Search and Date */}
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


      {/* Collection List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Collections
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredCollections.length} successful payment records
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
            <ArrowDownToLine size={17} />
            Download Report
          </button>

        </div>


        {/* Desktop List */}
        <div className="hidden overflow-x-auto lg:block">

          <div className="min-w-[950px]">

            {/* Column Header */}
            <div className="grid grid-cols-[1.2fr_1.7fr_1.5fr_1fr_1fr_1fr] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">

              <span>Collection ID</span>
              <span>Patient</span>
              <span>Service</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Date</span>

            </div>


            {/* Records */}
            <div className="divide-y divide-slate-100">

              {filteredCollections.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-[1.2fr_1.7fr_1.5fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                >

                  {/* Collection ID */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.invoiceId}
                    </p>
                  </div>


                  {/* Patient */}
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
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
                  <p className="text-sm font-bold text-emerald-600">
                    {item.amount}
                  </p>


                  {/* Method */}
                  <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {item.method}
                  </span>


                  {/* Date */}
                  <p className="text-sm text-slate-600">
                    {item.date}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredCollections.map((item) => (

            <div
              key={item.id}
              className="space-y-4 p-5 transition hover:bg-slate-50"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
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

                <p className="font-bold text-emerald-600">
                  {item.amount}
                </p>

              </div>


              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Collection ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {item.id}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-slate-400">
                    Invoice
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
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
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.method}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-slate-400">
                    Collection Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.date}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <IndianRupee
                size={24}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No collection records found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search criteria.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default CollectionPage;