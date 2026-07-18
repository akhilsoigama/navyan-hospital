// routers/ModulePath.ts
import {
  FaHome,
  FaPlus,
  FaList,
  FaCalendarAlt,
  FaClipboardCheck,
  FaClipboardList,
  FaProcedures,
  FaFileInvoiceDollar,
  FaChartBar,
  FaUsers,
  FaWallet,
  FaBoxOpen,
  FaPrescriptionBottleAlt,
  FaUserShield,

  FaUsersCog,
  FaUserCheck,
} from 'react-icons/fa'
import { PermissionKeys } from '../utils/permission'
import type { Module } from '../types/sidebar'

export const modules: Module[] = [
  {
    moduleName: 'Dashboard',
    permissions: [PermissionKeys.DASHBOARD_ACCESS],
    links: [
      {
        to: '/dashboard',
        label: 'Dashboard',
        icon: <FaHome className="size-6" />,
        permissions: [PermissionKeys.DASHBOARD_ACCESS],
      },
    ],
  },
  {
    moduleName: 'Appointments',
    permissions: [PermissionKeys.APPOINTMENT_ACCESS],
    links: [
      {
        to: '/dashboard/appointments',
        label: 'Appointments',
        icon: <FaCalendarAlt className="size-6" />,
        permissions: [PermissionKeys.APPOINTMENT_VIEW, PermissionKeys.APPOINTMENT_LIST],
        subLinks: [
          {
            to: '/dashboard/appointments/new',
            label: 'Add Appointment',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.APPOINTMENT_CREATE],
          },
          {
            to: '/dashboard/appointments/list',
            label: 'View / Edit (Call)',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.APPOINTMENT_LIST, PermissionKeys.APPOINTMENT_VIEW],
          },
        ],
      },
    ],
  },
  {
    moduleName: 'Assessment',
    permissions: [PermissionKeys.ASSESSMENT_ACCESS],
    links: [
      {
        to: '/dashboard/assessment',
        label: 'Assessment',
        icon: <FaClipboardCheck className="size-6" />,
        permissions: [PermissionKeys.ASSESSMENT_VIEW, PermissionKeys.ASSESSMENT_LIST],
        subLinks: [
          {
            to: '/dashboard/assessment/basic/new',
            label: 'Add Basic Detail',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.ASSESSMENT_BASIC_CREATE],
          },
          {
            to: '/dashboard/assessment/basic/list',
            label: 'View / Edit Basic Detail',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.ASSESSMENT_BASIC_VIEW],
          },
          {
            to: '/dashboard/assessment/advance/new',
            label: 'Add Advance Detail',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.ASSESSMENT_ADVANCE_CREATE],
          },
          {
            to: '/dashboard/assessment/advance/list',
            label: 'View / Edit Advance Detail',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.ASSESSMENT_ADVANCE_VIEW],
          },
        ],
      },
    ],
  },
  {
    moduleName: 'Treatment',
    permissions: [PermissionKeys.TREATMENT_ACCESS],
    links: [
      {
        to: '/dashboard/treatment',
        label: 'Treatment',
        icon: <FaProcedures className="size-6" />,
        permissions: [PermissionKeys.TREATMENT_VIEW, PermissionKeys.TREATMENT_LIST],
        subLinks: [
          {
            to: '/dashboard/treatment/new',
            label: 'Add Treatment Sessions',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.TREATMENT_CREATE],
          },
          {
            to: '/dashboard/treatment/list',
            label: 'View / Edit Treatment Sessions',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.TREATMENT_LIST, PermissionKeys.TREATMENT_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/rx',
        label: 'RX',
        icon: <FaPrescriptionBottleAlt className="size-6" />,
        permissions: [PermissionKeys.RX_ACCESS],
      },
    ],
  },
  {
    moduleName: 'Billing',
    permissions: [PermissionKeys.BILLING_ACCESS],
    links: [
      {
        to: '/dashboard/billing',
        label: 'Billing',
        icon: <FaFileInvoiceDollar className="size-6" />,
        permissions: [PermissionKeys.BILLING_VIEW, PermissionKeys.BILLING_LIST],
        subLinks: [
          {
            to: '/dashboard/billing/all',
            label: 'All Billing',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.BILLING_VIEW],
          },
          {
            to: '/dashboard/billing/discharge-report',
            label: 'Discharge Report',
            icon: <FaClipboardList className="size-6" />,
            permissions: [PermissionKeys.BILLING_DISCHARGE_REPORT_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/billing/pending-payment',
        label: 'Pending Payment',
        icon: <FaWallet className="size-6" />,
        permissions: [PermissionKeys.BILLING_PENDING_PAYMENT_VIEW],
      },
      {
        to: '/dashboard/billing/collection',
        label: 'This Month Collection',
        icon: <FaChartBar className="size-6" />,
        permissions: [PermissionKeys.BILLING_COLLECTION_VIEW],
      },
    ],
  },
  {
    moduleName: 'Reports',
    permissions: [PermissionKeys.REPORTS_ACCESS],
    links: [
      {
        to: '/dashboard/reports',
        label: 'Reports',
        icon: <FaChartBar className="size-6" />,
        permissions: [PermissionKeys.REPORTS_VIEW],
      },
    ],
  },
  {
    moduleName: 'Clinic Member',
    permissions: [PermissionKeys.CLINIC_MEMBER_ACCESS],
    links: [
      {
        to: '/dashboard/clinic-member',
        label: 'Clinic Member',
        icon: <FaUsers className="size-6" />,
        permissions: [PermissionKeys.CLINIC_MEMBER_VIEW, PermissionKeys.CLINIC_MEMBER_LIST],
        subLinks: [
          {
            to: '/dashboard/clinic-member/new',
            label: 'Add Member',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.CLINIC_MEMBER_CREATE],
          },
          {
            to: '/dashboard/clinic-member/list',
            label: 'Manage Doctors & Staff',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.CLINIC_MEMBER_LIST, PermissionKeys.CLINIC_MEMBER_VIEW],
          },
        ],
      },
    ],
  },
  {
    moduleName: 'Permission',
    permissions: [PermissionKeys.PERMISSION_ACCESS],
    links: [
      {
        to: '/dashboard/permission',
        label: 'Permission',
        icon: <FaUserShield className="size-6" />,
        permissions: [PermissionKeys.PERMISSION_CREATE],
      },
      {
        to: '/dashboard/permissionlist',
        label: 'Permission List',
        icon: <FaUsersCog className="size-6" />,
        permissions: [PermissionKeys.PERMISSION_VIEW],
      },
      {
        to: '/dashboard/roll',
        label: 'Roll',
        icon: <FaUserCheck className="size-6" />,
        permissions: [PermissionKeys.ROLL_CREATE],
      },
      {
        to: '/dashboard/rolllist',
        label: 'Roll List',
        icon: <FaList  className="size-6" />,
        permissions: [PermissionKeys.ROLL_VIEW],
      },
    ],
  },
  {
    moduleName: 'Stock / Items',
    permissions: [PermissionKeys.MASTER_ACCESS],
    links: [
      {
        to: '/dashboard/master/stock',
        label: 'Stock / Items View',
        icon: <FaBoxOpen className="size-6" />,
        permissions: [PermissionKeys.MASTER_STOCK_VIEW],
      },
    ],
  },
]
