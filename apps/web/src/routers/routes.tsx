import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { User } from '../types';
import DashboardLayout from '../section/DashboardLayout';

// ---------------------------------------------------------------------------
// Lazy page imports
// Paths are matched 1-to-1 with routers/modulePath.tsx
// ---------------------------------------------------------------------------

// Auth
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// Dashboard — /dashboard
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));

// Appointments — /dashboard/appointments/**
const AppointmentsPage = lazy(
  () => import('../pages/appointments/AppointmentsPage'),
);
const AddAppointmentPage = lazy(
  () => import('../pages/appointments/AddAppointmentPage'),
);
const AppointmentListPage = lazy(
  () => import('../pages/appointments/AppointmentListPage'),
);
const AddAppointmentPaPage = lazy(
  () => import('../pages/appointments/AddAppointmentPaPage'),
);

// Assessment — /dashboard/assessment/**
const AssessmentPage = lazy(
  () => import('../pages/assessment/AssessmentPage'),
);
const AddBasicDetailPage = lazy(
  () => import('../pages/assessment/AddBasicDetailPage'),
);
const BasicDetailListPage = lazy(
  () => import('../pages/assessment/BasicDetailListPage'),
);
const AddAdvanceDetailPage = lazy(
  () => import('../pages/assessment/AddAdvanceDetailPage'),
);
const AdvanceDetailListPage = lazy(
  () => import('../pages/assessment/AdvanceDetailListPage'),
);

// Treatment — /dashboard/treatment/** and /dashboard/rx
const TreatmentPage = lazy(
  () => import('../pages/treatment/TreatmentPage'),
);
const AddTreatmentPage = lazy(
  () => import('../pages/treatment/AddTreatmentPage'),
);
const TreatmentListPage = lazy(
  () => import('../pages/treatment/TreatmentListPage'),
);
const TreatmentAddPage = lazy(
  () => import('../pages/treatment/TreatmentAddPage'),
);
const RxPage = lazy(() => import('../pages/treatment/RxPage'));

// Billing — /dashboard/billing/**
const BillingPage = lazy(() => import('../pages/billing/BillingPage'));
const AllBillingPage = lazy(() => import('../pages/billing/AllBillingPage'));
const DischargeReportPage = lazy(
  () => import('../pages/billing/DischargeReportPage'),
);
const MedicalLeavePage = lazy(
  () => import('../pages/billing/MedicalLeavePage'),
);
const TreatmentRequiredPage = lazy(
  () => import('../pages/billing/TreatmentRequiredPage'),
);
const WheelchairAirportPage = lazy(
  () => import('../pages/billing/WheelchairAirportPage'),
);
const PatientFilePage = lazy(
  () => import('../pages/billing/PatientFilePage'),
);
const PatientLinkPage = lazy(
  () => import('../pages/billing/PatientLinkPage'),
);
const PendingPaymentPage = lazy(
  () => import('../pages/billing/PendingPaymentPage'),
);
const CollectionPage = lazy(
  () => import('../pages/billing/CollectionPage'),
);

// Expense — /dashboard/expense/**
const ExpensePage = lazy(() => import('../pages/expense/ExpensePage'));
const AddExpensePage = lazy(() => import('../pages/expense/AddExpensePage'));
const ExpenseListPage = lazy(
  () => import('../pages/expense/ExpenseListPage'),
);

// Reports — /dashboard/reports
const ReportsPage = lazy(() => import('../pages/reports/ReportsPage'));

// Clinic Member — /dashboard/clinic-member/**
const ClinicMemberPage = lazy(
  () => import('../pages/clinic-member/ClinicMemberPage'),
);
const AddMemberPage = lazy(
  () => import('../pages/clinic-member/AddMemberPage'),
);
const MemberListPage = lazy(
  () => import('../pages/clinic-member/MemberListPage'),
);

// Account — /dashboard/account
const AccountPage = lazy(() => import('../pages/account/AccountPage'));

// Master — /dashboard/master/**
const MasterPage = lazy(() => import('../pages/master/MasterPage'));
const StockPage = lazy(() => import('../pages/master/StockPage'));

// Search Patient — /dashboard/search-patient
const SearchPatientPage = lazy(
  () => import('../pages/search-patient/SearchPatientPage'),
);

// 404
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// ---------------------------------------------------------------------------
// Suspense fallback (lightweight spinner)
// ---------------------------------------------------------------------------

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[200px]">
    <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" />
  </div>
);

// ---------------------------------------------------------------------------
// Props passed down from App.tsx
// ---------------------------------------------------------------------------

interface AppRoutesProps {
  user: User | null | undefined;
  token: string | null;
  onLoginSuccess: (user: User, token: string) => Promise<void>;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

// ---------------------------------------------------------------------------
// Route tree
// ---------------------------------------------------------------------------

const AppRoutes = ({ user }: AppRoutesProps) => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* ── Root redirect ─────────────────────────────────────────────── */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ── Auth routes (unguarded for now) ──────────────────────────── */}
      <Route path="/login" element={<LoginPage />} />

      {/* ── Dashboard shell (unguarded — remove when auth is ready) ──── */}
      <Route
        path="/dashboard"
        element={<DashboardLayout user={user} />}
      >
        {/* /dashboard → overview */}
        <Route index element={<DashboardPage />} />

        {/* ── Appointments (/dashboard/appointments/**) ─────────────── */}
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="appointments/new" element={<AddAppointmentPage />} />
        <Route path="appointments/list" element={<AppointmentListPage />} />
        <Route path="appointments/pa/new" element={<AddAppointmentPaPage />} />

        {/* ── Assessment (/dashboard/assessment/**) ────────────────── */}
        <Route path="assessment" element={<AssessmentPage />} />
        <Route path="assessment/basic/new" element={<AddBasicDetailPage />} />
        <Route path="assessment/basic/list" element={<BasicDetailListPage />} />
        <Route path="assessment/advance/new" element={<AddAdvanceDetailPage />} />
        <Route path="assessment/advance/list" element={<AdvanceDetailListPage />} />

        {/* ── Treatment (/dashboard/treatment/**) ──────────────────── */}
        <Route path="treatment" element={<TreatmentPage />} />
        <Route path="treatment/new" element={<AddTreatmentPage />} />
        <Route path="treatment/list" element={<TreatmentListPage />} />
        <Route path="treatment/add" element={<TreatmentAddPage />} />
        <Route path="rx" element={<RxPage />} />

        {/* ── Billing (/dashboard/billing/**) ──────────────────────── */}
        <Route path="billing" element={<BillingPage />} />
        <Route path="billing/all" element={<AllBillingPage />} />
        <Route path="billing/discharge-report" element={<DischargeReportPage />} />
        <Route path="billing/medical-leave" element={<MedicalLeavePage />} />
        <Route path="billing/treatment-required" element={<TreatmentRequiredPage />} />
        <Route path="billing/wheelchair-airport" element={<WheelchairAirportPage />} />
        <Route path="billing/patient-file" element={<PatientFilePage />} />
        <Route path="billing/patient-link" element={<PatientLinkPage />} />
        <Route path="billing/pending-payment" element={<PendingPaymentPage />} />
        <Route path="billing/collection" element={<CollectionPage />} />

        {/* ── Expense (/dashboard/expense/**) ──────────────────────── */}
        <Route path="expense" element={<ExpensePage />} />
        <Route path="expense/new" element={<AddExpensePage />} />
        <Route path="expense/list" element={<ExpenseListPage />} />

        {/* ── Reports (/dashboard/reports) ─────────────────────────── */}
        <Route path="reports" element={<ReportsPage />} />

        {/* ── Clinic Member (/dashboard/clinic-member/**) ──────────── */}
        <Route path="clinic-member" element={<ClinicMemberPage />} />
        <Route path="clinic-member/new" element={<AddMemberPage />} />
        <Route path="clinic-member/list" element={<MemberListPage />} />

        {/* ── Account (/dashboard/account) ─────────────────────────── */}
        <Route path="account" element={<AccountPage />} />

        {/* ── Master (/dashboard/master/**) ────────────────────────── */}
        <Route path="master" element={<MasterPage />} />
        <Route path="master/stock" element={<StockPage />} />

        {/* ── Search Patient (/dashboard/search-patient) ───────────── */}
        <Route path="search-patient" element={<SearchPatientPage />} />
      </Route>

      {/* ── 404 catch-all ─────────────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
