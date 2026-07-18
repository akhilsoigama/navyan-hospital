import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { User } from '../types';
import DashboardLayout from '../section/DashboardLayout';
import CreateRolePermission from "../pages/rollpermission/create_rollpermission";
import ListRolePermission from "../pages/rollpermission/rolepermission_list";
import UpdateRolePermission from "../pages/rollpermission/update_rollpermission";


// ---------------------------------------------------------------------------
// Lazy page imports
// Paths are matched 1-to-1 with routers/modulePath.tsx
// ---------------------------------------------------------------------------

// Auth
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// Dashboard — /dashboard
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));

// Appointments — /dashboard/appointments/**


const AddAppointmentPage = lazy(
  () => import('../pages/appointments/AddAppointmentPage'),
);
const AppointmentListPage = lazy(
  () => import('../pages/appointments/AppointmentListPage'),
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

const RxPage = lazy(() => import('../pages/treatment/RxPage'));
const RxListPage = lazy(() => import('../pages/treatment/RxListPage'));
// Billing — /dashboard/billing/**

const AllBillingPage = lazy(() => import('../pages/billing/AllBillingPage'));
const DischargeReportPage = lazy(
  () => import('../pages/billing/DischargeReportPage'),
);
const DischargePatientPage = lazy(
  () => import('../pages/billing/DischargePatient'),
);
const PendingPaymentPage = lazy(
  () => import('../pages/billing/PendingPaymentPage'),
);
const CollectionPage = lazy(
  () => import('../pages/billing/CollectionPage'),
);

// Reports — /dashboard/reports

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

// Stock
const StockPage = lazy(() => import('../pages/stock_item/StockPage'));
const StockCreate = lazy(() => import('../pages/stock_item/StockCreate'));


// 404
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// ---------------------------------------------------------------------------
// Suspense fallback (lightweight spinner)
// ---------------------------------------------------------------------------

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-screen">
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
        <Route path="appointments/new" element={<AddAppointmentPage />} />
        <Route path="appointments/list" element={<AppointmentListPage />} />


        {/* ── Assessment (/dashboard/assessment/**) ────────────────── */}
        <Route path="assessment/basic/new" element={<AddBasicDetailPage />} />
        <Route path="assessment/basic/list" element={<BasicDetailListPage />} />
        <Route path="assessment/advance/new" element={<AddAdvanceDetailPage />} />
        <Route path="assessment/advance/list" element={<AdvanceDetailListPage />} />

        {/* ── Treatment (/dashboard/treatment/**) ──────────────────── */}
        <Route path="treatment" element={<TreatmentPage />} />
        <Route path="treatment/new" element={<AddTreatmentPage />} />
        <Route path="treatment/list" element={<TreatmentListPage />} />
        <Route path="rx/new" element={<RxPage />} />
        <Route path="rx/list" element={<RxListPage />} />

        {/* ── Billing (/dashboard/billing/**) ──────────────────────── */}
        <Route path="billing/all" element={<AllBillingPage />} />
        <Route path="discharge-patient/list" element={<DischargeReportPage />} />
        <Route path="discharge-patient/new" element={<DischargePatientPage />} />
        <Route path="billing/pending-payment" element={<PendingPaymentPage />} />
        <Route path="billing/collection" element={<CollectionPage />} />

        {/* ── Reports (/dashboard/reports) ─────────────────────────── */}+

        {/* ── Clinic Member (/dashboard/clinic-member/**) ──────────── */}
        <Route path="clinic-member" element={<ClinicMemberPage />} />
        <Route path="clinic-member/new" element={<AddMemberPage />} />
        <Route path="clinic-member/list" element={<MemberListPage />} />

        {/* ── Account (/dashboard/account) ─────────────────────────── */}
        <Route path="account" element={<AccountPage />} />
        <Route
          path="core-management/rolePermission/new"
          element={<CreateRolePermission />}
        />

        <Route
          path="core-management/rolePermission/list"
          element={<ListRolePermission />}
        />

        <Route
          path="core-management/rolePermission/:id/edit"
          element={<UpdateRolePermission />}
        />
        {/* ── Master (/dashboard/master/**) ────────────────────────── */}
        <Route path="master/stock" element={<StockPage />} />
        <Route path="master/stock/new" element={<StockCreate />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
