// DischargeReportPage.tsx
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Filter,
    Search,
    SlidersHorizontal,
    FileText,
    Download,
    Printer,
    Users,
    Clock,
    XCircle,
    Calendar,
    Activity,
    BadgeCheck,
} from "lucide-react";
import { useState } from "react";

type DischargeStatus = "Discharged" | "Pending" | "Scheduled" | "Cancelled";
type AdmissionType = "Emergency" | "Scheduled" | "Transfer";

interface DischargeRecord {
    id: string;
    patientName: string;
    patientId: string;
    admissionDate: string;
    dischargeDate: string;
    lengthOfStay: string;
    diagnosis: string;
    dischargeStatus: DischargeStatus;
    admissionType: AdmissionType;
    attendingDoctor: string;
    wardNumber: string;
    bedNumber: string;
    finalDiagnosis: string;
    followUpDate: string;
    medications: string[];
    notes: string;
    totalCharges: string;
    insuranceClaimed: string;
    balanceDue: string;
}

const dischargeRecords: DischargeRecord[] = [
    {
        id: "DR-2024-001",
        patientName: "Rahul Sharma",
        patientId: "PT-1001",
        admissionDate: "10 Jul 2026",
        dischargeDate: "18 Jul 2026",
        lengthOfStay: "8 days",
        diagnosis: "Pneumonia",
        dischargeStatus: "Discharged",
        admissionType: "Emergency",
        attendingDoctor: "Dr. Rajesh Kumar",
        wardNumber: "Ward 3A",
        bedNumber: "Bed 12",
        finalDiagnosis: "Community-acquired pneumonia, resolved",
        followUpDate: "25 Jul 2026",
        medications: ["Azithromycin", "Paracetamol", "Salbutamol"],
        notes: "Patient responded well to treatment. Advised rest and follow-up.",
        totalCharges: "₹45,000",
        insuranceClaimed: "₹30,000",
        balanceDue: "₹15,000",
    },
    {
        id: "DR-2024-002",
        patientName: "Priya Patel",
        patientId: "PT-1002",
        admissionDate: "15 Jul 2026",
        dischargeDate: "18 Jul 2026",
        lengthOfStay: "3 days",
        diagnosis: "Acute Appendicitis",
        dischargeStatus: "Discharged",
        admissionType: "Emergency",
        attendingDoctor: "Dr. Priya Mehta",
        wardNumber: "Ward 2B",
        bedNumber: "Bed 08",
        finalDiagnosis: "Acute appendicitis, post-surgery recovery",
        followUpDate: "25 Jul 2026",
        medications: ["Amoxicillin", "Ibuprofen", "Pantoprazole"],
        notes: "Laparoscopic appendectomy performed successfully. Patient stable.",
        totalCharges: "₹65,000",
        insuranceClaimed: "₹50,000",
        balanceDue: "₹15,000",
    },
    {
        id: "DR-2024-003",
        patientName: "Amit Shah",
        patientId: "PT-1003",
        admissionDate: "12 Jul 2026",
        dischargeDate: "17 Jul 2026",
        lengthOfStay: "5 days",
        diagnosis: "Cardiac Arrhythmia",
        dischargeStatus: "Discharged",
        admissionType: "Scheduled",
        attendingDoctor: "Dr. Anil Singh",
        wardNumber: "Ward 4A",
        bedNumber: "Bed 06",
        finalDiagnosis: "Paroxysmal atrial fibrillation, managed",
        followUpDate: "24 Jul 2026",
        medications: ["Amiodarone", "Warfarin", "Metoprolol"],
        notes: "Rate-controlled rhythm achieved. Continued monitoring advised.",
        totalCharges: "₹78,000",
        insuranceClaimed: "₹60,000",
        balanceDue: "₹18,000",
    },
    {
        id: "DR-2024-004",
        patientName: "Neha Joshi",
        patientId: "PT-1004",
        admissionDate: "16 Jul 2026",
        dischargeDate: "18 Jul 2026",
        lengthOfStay: "2 days",
        diagnosis: "Bronchial Asthma",
        dischargeStatus: "Pending",
        admissionType: "Emergency",
        attendingDoctor: "Dr. Ketan Patel",
        wardNumber: "Ward 1A",
        bedNumber: "Bed 03",
        finalDiagnosis: "Acute asthma exacerbation",
        followUpDate: "25 Jul 2026",
        medications: ["Prednisolone", "Salbutamol", "Montelukast"],
        notes: "Patient improving, discharge planned for tomorrow.",
        totalCharges: "₹28,000",
        insuranceClaimed: "₹20,000",
        balanceDue: "₹8,000",
    },
    {
        id: "DR-2024-005",
        patientName: "Kavita Mehta",
        patientId: "PT-1005",
        admissionDate: "08 Jul 2026",
        dischargeDate: "16 Jul 2026",
        lengthOfStay: "8 days",
        diagnosis: "Lumbar Spondylosis",
        dischargeStatus: "Discharged",
        admissionType: "Scheduled",
        attendingDoctor: "Dr. Sunita Reddy",
        wardNumber: "Ward 5A",
        bedNumber: "Bed 15",
        finalDiagnosis: "Chronic low back pain with radiculopathy",
        followUpDate: "23 Jul 2026",
        medications: ["Gabapentin", "Diclofenac", "Tizanidine"],
        notes: "Physical therapy initiated. Patient showed significant improvement.",
        totalCharges: "₹52,000",
        insuranceClaimed: "₹40,000",
        balanceDue: "₹12,000",
    },
    {
        id: "DR-2024-006",
        patientName: "Rajesh Kumar",
        patientId: "PT-1006",
        admissionDate: "14 Jul 2026",
        dischargeDate: "18 Jul 2026",
        lengthOfStay: "4 days",
        diagnosis: "Diabetes Mellitus (Type 2)",
        dischargeStatus: "Discharged",
        admissionType: "Scheduled",
        attendingDoctor: "Dr. Vikram Shah",
        wardNumber: "Ward 6B",
        bedNumber: "Bed 09",
        finalDiagnosis: "Uncontrolled type 2 diabetes with ketosis",
        followUpDate: "25 Jul 2026",
        medications: ["Insulin", "Metformin", "Atorvastatin"],
        notes: "Blood glucose levels stabilized. Dietary counseling provided.",
        totalCharges: "₹38,000",
        insuranceClaimed: "₹28,000",
        balanceDue: "₹10,000",
    },
    {
        id: "DR-2024-007",
        patientName: "Sunita Reddy",
        patientId: "PT-1007",
        admissionDate: "17 Jul 2026",
        dischargeDate: "19 Jul 2026",
        lengthOfStay: "2 days",
        diagnosis: "Migraine",
        dischargeStatus: "Scheduled",
        admissionType: "Emergency",
        attendingDoctor: "Dr. Neha Jain",
        wardNumber: "Ward 1B",
        bedNumber: "Bed 04",
        finalDiagnosis: "Intractable migraine with neurological symptoms",
        followUpDate: "26 Jul 2026",
        medications: ["Sumatriptan", "Propranolol", "Flunarizine"],
        notes: "Patient admitted for observation, to be discharged tomorrow.",
        totalCharges: "₹22,000",
        insuranceClaimed: "₹15,000",
        balanceDue: "₹7,000",
    },
];

const statusStyles: Record<DischargeStatus, string> = {
    Discharged: "bg-emerald-50 text-emerald-700",
    Pending: "bg-orange-50 text-orange-700",
    Scheduled: "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-red-700",
};

const statusIcons: Record<DischargeStatus, React.ReactNode> = {
    Discharged: <BadgeCheck size={16} className="text-emerald-500" />,
    Pending: <Clock size={16} className="text-orange-500" />,
    Scheduled: <Calendar size={16} className="text-blue-500" />,
    Cancelled: <XCircle size={16} className="text-red-500" />,
};

const admissionTypeColors: Record<AdmissionType, string> = {
    Emergency: "bg-red-50 text-red-700",
    Scheduled: "bg-blue-50 text-blue-700",
    Transfer: "bg-purple-50 text-purple-700",
};

const DischargeReportPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All Status");
    const [admissionType, setAdmissionType] = useState("All Types");

    const filteredRecords = dischargeRecords.filter((item) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            item.patientName.toLowerCase().includes(searchValue) ||
            item.patientId.toLowerCase().includes(searchValue) ||
            item.id.toLowerCase().includes(searchValue) ||
            item.diagnosis.toLowerCase().includes(searchValue) ||
            item.attendingDoctor.toLowerCase().includes(searchValue);

        const matchesStatus =
            status === "All Status" || item.dischargeStatus === status;

        const matchesType =
            admissionType === "All Types" || item.admissionType === admissionType;

        return matchesSearch && matchesStatus && matchesType;
    });

    const totalDischarged = dischargeRecords.filter((r) => r.dischargeStatus === "Discharged").length;
    const totalPending = dischargeRecords.filter((r) => r.dischargeStatus === "Pending").length;
    const totalScheduled = dischargeRecords.filter((r) => r.dischargeStatus === "Scheduled").length;

    const totalRevenue = dischargeRecords
        .filter((r) => r.dischargeStatus === "Discharged")
        .reduce((sum, r) => sum + parseInt(r.totalCharges.replace(/[₹,]/g, "")), 0);

    return (
        <div className="space-y-6 p-10">

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <FileText size={22} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Discharge Reports</h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage and track patient discharge records and summaries.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                        <Download size={18} />
                        Export Report
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700">
                        <FileText size={18} />
                        New Discharge
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Total Discharges</p>
                        <div className="rounded-full bg-purple-50 p-2 text-purple-600">
                            <Users size={18} />
                        </div>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{totalDischarged}</h2>
                    <p className="mt-1 text-xs text-emerald-600">+15% from last month</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Pending Discharge</p>
                        <div className="rounded-full bg-orange-50 p-2 text-orange-600">
                            <Clock size={18} />
                        </div>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-orange-600">{totalPending}</h2>
                    <p className="mt-1 text-xs text-slate-400">Awaiting completion</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Scheduled</p>
                        <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                            <Calendar size={18} />
                        </div>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-blue-600">{totalScheduled}</h2>
                    <p className="mt-1 text-xs text-slate-400">Upcoming discharges</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Revenue Generated</p>
                        <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">

                        </div>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</h2>
                    <p className="mt-1 text-xs text-emerald-600">+12.5% from last month</p>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-slate-500" />
                    <h2 className="font-semibold text-slate-900">Search & Filters</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="relative xl:col-span-2">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by patient, doctor or diagnosis..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        />
                    </div>

                    <div className="relative">
                        <Filter size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:bg-white"
                        >
                            <option>All Status</option>
                            <option>Discharged</option>
                            <option>Pending</option>
                            <option>Scheduled</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div className="relative">
                        <Activity size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                            value={admissionType}
                            onChange={(e) => setAdmissionType(e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:bg-white"
                        >
                            <option>All Types</option>
                            <option>Emergency</option>
                            <option>Scheduled</option>
                            <option>Transfer</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Discharge Records */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900">Discharge Records</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Showing {filteredRecords.length} discharge records
                        </p>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden overflow-x-auto lg:block">
                    <div className="min-w-[1200px]">
                        <div className="grid grid-cols-[0.8fr_1.2fr_1.5fr_1fr_1.2fr_1fr_1.2fr_1fr_120px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <span>ID</span>
                            <span>Patient</span>
                            <span>Diagnosis</span>
                            <span>Admission</span>
                            <span>Doctor</span>
                            <span>Stay</span>
                            <span>Status</span>
                            <span>Balance</span>
                            <span>Action</span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {filteredRecords.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[0.8fr_1.2fr_1.5fr_1fr_1.2fr_1fr_1.2fr_1fr_120px] items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{item.id}</p>
                                        <p className="mt-1 text-xs text-slate-400">{item.dischargeDate}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                                            {item.patientName.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{item.patientName}</p>
                                            <p className="text-xs text-slate-500">{item.patientId}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{item.diagnosis}</p>
                                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${admissionTypeColors[item.admissionType]}`}>
                                            {item.admissionType}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">{item.admissionDate}</p>
                                        <p className="text-xs text-slate-400">to {item.dischargeDate}</p>
                                    </div>

                                    <p className="text-sm font-medium text-slate-700">{item.attendingDoctor}</p>

                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold text-slate-900">{item.lengthOfStay}</p>
                                        <p className="text-xs text-slate-400">Ward {item.wardNumber}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.dischargeStatus]}`}>
                                            {statusIcons[item.dischargeStatus]}
                                            {item.dischargeStatus}
                                        </span>
                                    </div>

                                    <p className="text-sm font-bold text-slate-900">{item.balanceDue}</p>

                                    <div className="flex items-center gap-1">
                                        <button title="View Report" className="rounded-lg p-2 text-slate-500 transition hover:bg-purple-50 hover:text-purple-600">
                                            <Eye size={17} />
                                        </button>
                                        <button title="Download Report" className="rounded-lg p-2 text-slate-500 transition hover:bg-purple-50 hover:text-purple-600">
                                            <Download size={17} />
                                        </button>
                                        <button title="Print Report" className="rounded-lg p-2 text-slate-500 transition hover:bg-purple-50 hover:text-purple-600">
                                            <Printer size={17} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="divide-y divide-slate-100 lg:hidden">
                    {filteredRecords.map((item) => (
                        <div key={item.id} className="space-y-4 p-5 transition hover:bg-slate-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                                        {item.patientName.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{item.patientName}</p>
                                        <p className="text-xs text-slate-500">{item.patientId}</p>
                                    </div>
                                </div>
                                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.dischargeStatus]}`}>
                                    {statusIcons[item.dischargeStatus]}
                                    {item.dischargeStatus}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400">Record ID</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-700">{item.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Diagnosis</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">{item.diagnosis}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Admission</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">{item.admissionDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Discharge</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">{item.dischargeDate}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-slate-400">Attending Doctor</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">{item.attendingDoctor}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Length of Stay</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">{item.lengthOfStay}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Balance Due</p>
                                    <p className="mt-1 text-sm font-bold text-slate-900">{item.balanceDue}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-slate-400">Follow-up Date</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">{item.followUpDate}</p>
                                </div>
                                {item.medications.length > 0 && (
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-400">Medications</p>
                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                            {item.medications.map((med, idx) => (
                                                <span key={idx} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                    {med}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 border-t border-slate-100 pt-4">
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                    <Eye size={16} />
                                    View
                                </button>
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-50">
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRecords.length === 0 && (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <FileText size={24} className="text-slate-400" />
                        </div>
                        <h3 className="mt-4 font-semibold text-slate-900">No discharge records found</h3>
                        <p className="mt-1 text-sm text-slate-500">Try changing your search or filter criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-medium text-slate-700">1–{filteredRecords.length}</span> of{" "}
                    <span className="font-medium text-slate-700">{filteredRecords.length}</span> records
                </p>
                <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white">1</button>
                    <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">2</button>
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DischargeReportPage;