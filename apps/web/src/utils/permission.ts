export enum PermissionKeys {
    // ========== MODULE ACCESS ==========
    DASHBOARD_ACCESS = 'dashboard_access',
    APPOINTMENT_ACCESS = 'appointment_access',
    ASSESSMENT_ACCESS = 'assessment_access',
    TREATMENT_ACCESS = 'treatment_access',
    BILLING_ACCESS = 'billing_access',
    EXPENSE_ACCESS = 'expense_access',
    REPORTS_ACCESS = 'reports_access',
    CLINIC_MEMBER_ACCESS = 'clinic_member_access',
    ACCOUNT_ACCESS = 'account_access',
    MASTER_ACCESS = 'master_access',
    SEARCH_PATIENT_ACCESS = 'search_patient_access',
    RX_ACCESS = 'rx_access',
    SETTINGS_ACCESS = 'settings_access',
    DISCHARGE_PATIENT_ACCESS = 'discharge_patient_access',
    // Core Management
    CORE_MANAGEMENT_ACCESS = "core_management_access",

    // Role & Permission
    ROLES_VIEW = "roles_view",
    ROLES_CREATE = "roles_create",
    ROLES_UPDATE = "roles_update",
    ROLES_DELETE = "roles_delete",
    ROLES_LIST = "roles_list",

    // User Management
    USERS_VIEW = "users_view",
    USERS_CREATE = "users_create",
    USERS_UPDATE = "users_update",
    USERS_DELETE = "users_delete",
    USERS_LIST = "users_list",

    // Role Assignment
    USER_ROLES_VIEW = "user_roles_view",
    USER_ROLES_ASSIGN = "user_roles_assign",
    USER_ROLES_REMOVE = "user_roles_remove",

    // Permissions
    PERMISSIONS_VIEW = "permissions_view",

    // ========== APPOINTMENTS MODULE ==========
    APPOINTMENT_VIEW = 'appointment_view',
    APPOINTMENT_CREATE = 'appointment_create',
    APPOINTMENT_UPDATE = 'appointment_update',
    APPOINTMENT_DELETE = 'appointment_delete',
    APPOINTMENT_LIST = 'appointment_list',
    APPOINTMENT_PA_CREATE = 'appointment_pa_create',

    // ========== ASSESSMENT MODULE ==========
    ASSESSMENT_VIEW = 'assessment_view',
    ASSESSMENT_LIST = 'assessment_list',

    ASSESSMENT_BASIC_VIEW = 'assessment_basic_view',
    ASSESSMENT_BASIC_CREATE = 'assessment_basic_create',
    ASSESSMENT_BASIC_UPDATE = 'assessment_basic_update',
    ASSESSMENT_BASIC_DELETE = 'assessment_basic_delete',

    ASSESSMENT_ADVANCE_VIEW = 'assessment_advance_view',
    ASSESSMENT_ADVANCE_CREATE = 'assessment_advance_create',
    ASSESSMENT_ADVANCE_UPDATE = 'assessment_advance_update',
    ASSESSMENT_ADVANCE_DELETE = 'assessment_advance_delete',

    // ========== TREATMENT MODULE ==========
    TREATMENT_VIEW = 'treatment_view',
    TREATMENT_CREATE = 'treatment_create',
    TREATMENT_UPDATE = 'treatment_update',
    TREATMENT_DELETE = 'treatment_delete',
    TREATMENT_LIST = 'treatment_list',

    // ========== BILLING MODULE ==========
    BILLING_VIEW = 'billing_view',
    BILLING_CREATE = 'billing_create',
    BILLING_UPDATE = 'billing_update',
    BILLING_DELETE = 'billing_delete',
    BILLING_LIST = 'billing_list',

    BILLING_DISCHARGE_REPORT_VIEW = 'billing_discharge_report_view',
    BILLING_MEDICAL_LEAVE_VIEW = 'billing_medical_leave_view',
    BILLING_TREATMENT_REQUIRED_VIEW = 'billing_treatment_required_view',
    BILLING_WHEELCHAIR_AIRPORT_VIEW = 'billing_wheelchair_airport_view',
    BILLING_PATIENT_FILE_VIEW = 'billing_patient_file_view',
    BILLING_PATIENT_LINK_VIEW = 'billing_patient_link_view',
    BILLING_PENDING_PAYMENT_VIEW = 'billing_pending_payment_view',
    BILLING_COLLECTION_VIEW = 'billing_collection_view',

    // ========== EXPENSE MODULE ==========
    EXPENSE_VIEW = 'expense_view',
    EXPENSE_CREATE = 'expense_create',
    EXPENSE_UPDATE = 'expense_update',
    EXPENSE_DELETE = 'expense_delete',
    EXPENSE_LIST = 'expense_list',

    // ========== REPORTS MODULE ==========
    REPORTS_VIEW = 'reports_view',

    // ========== CLINIC MEMBER MODULE ==========
    CLINIC_MEMBER_VIEW = 'clinic_member_view',
    CLINIC_MEMBER_CREATE = 'clinic_member_create',
    CLINIC_MEMBER_UPDATE = 'clinic_member_update',
    CLINIC_MEMBER_DELETE = 'clinic_member_delete',
    CLINIC_MEMBER_LIST = 'clinic_member_list',

    // ========== PERMISSION MODULE ==========
    PERMISSION_ACCESS = 'permission_access',
    PERMISSION_VIEW = 'permission_view',
    PERMISSION_CREATE = 'permission_create',
    PERMISSION_UPDATE = 'permission_update',
    PERMISSION_DELETE = 'permission_delete',

    DISCHARGE_PATIENT_VIEW = 'discharge_patient_view',
    DISCHARGE_PATIENT_CREATE = 'discharge_patient_create',
    DISCHARGE_PATIENT_UPDATE = 'discharge_patient_update',
    DISCHARGE_PATIENT_DELETE = 'discharge_patient_delete',

    // ========== ROLL MODULE ==========
    ROLL_VIEW = 'roll_view',
    ROLL_CREATE = 'roll_create',
    ROLL_UPDATE = 'roll_update',
    ROLL_DELETE = 'roll_delete',

    // ========== MASTER MODULE ==========
    MASTER_VIEW = 'master_view',
    MASTER_STOCK_VIEW = 'master_stock_view',
    MASTER_STOCK_CREATE = 'master_stock_create',
    MASTER_STOCK_UPDATE = 'master_stock_update',
    MASTER_STOCK_DELETE = 'master_stock_delete',
    // ========== DASHBOARD MODULE ==========
    DASHBOARD_OVERVIEW_VIEW = 'dashboard_overview_view',

    RX_VIEW = 'rx_view',
    RX_CREATE = 'rx_create',
    RX_UPDATE = 'rx_update',
    RX_DELETE = 'rx_delete',
    RX_LIST = 'rx_list',
}

export const PermissionModules = {
    CORE: {
        name: 'Core System',
        permissions: [
            PermissionKeys.ROLES_VIEW,
            PermissionKeys.ROLES_CREATE,
            PermissionKeys.ROLES_UPDATE,
            PermissionKeys.ROLES_DELETE,
            PermissionKeys.PERMISSIONS_VIEW,
            PermissionKeys.USERS_CREATE,
            PermissionKeys.USERS_UPDATE,
            PermissionKeys.USERS_VIEW,
            PermissionKeys.USERS_DELETE,
            PermissionKeys.USER_ROLES_ASSIGN,
            PermissionKeys.USER_ROLES_REMOVE,
            PermissionKeys.USER_ROLES_VIEW,
        ]
    },
    APPOINTMENTS: {
        name: 'Appointments',
        permissions: [
            PermissionKeys.APPOINTMENT_VIEW,
            PermissionKeys.APPOINTMENT_CREATE,
            PermissionKeys.APPOINTMENT_UPDATE,
            PermissionKeys.APPOINTMENT_DELETE,
            PermissionKeys.APPOINTMENT_LIST,
            PermissionKeys.APPOINTMENT_PA_CREATE,
        ]
    },
    ASSESSMENT: {
        name: 'Assessment',
        permissions: [
            PermissionKeys.ASSESSMENT_VIEW,
            PermissionKeys.ASSESSMENT_LIST,
            PermissionKeys.ASSESSMENT_BASIC_VIEW,
            PermissionKeys.ASSESSMENT_BASIC_CREATE,
            PermissionKeys.ASSESSMENT_BASIC_UPDATE,
            PermissionKeys.ASSESSMENT_BASIC_DELETE,
            PermissionKeys.ASSESSMENT_ADVANCE_VIEW,
            PermissionKeys.ASSESSMENT_ADVANCE_CREATE,
            PermissionKeys.ASSESSMENT_ADVANCE_UPDATE,
            PermissionKeys.ASSESSMENT_ADVANCE_DELETE,
        ]
    },
    TREATMENT: {
        name: 'Treatment',
        permissions: [
            PermissionKeys.TREATMENT_VIEW,
            PermissionKeys.TREATMENT_CREATE,
            PermissionKeys.TREATMENT_UPDATE,
            PermissionKeys.TREATMENT_DELETE,
            PermissionKeys.TREATMENT_LIST,
            PermissionKeys.RX_ACCESS,
            PermissionKeys.RX_VIEW,
            PermissionKeys.RX_CREATE,
            PermissionKeys.RX_UPDATE,
            PermissionKeys.RX_DELETE,
            PermissionKeys.RX_LIST,
        ]
    },
    DISCHARGE_PATIENT: {
        name: 'Discharge Patient',
        permissions: [
            PermissionKeys.DISCHARGE_PATIENT_VIEW,
            PermissionKeys.DISCHARGE_PATIENT_CREATE,
            PermissionKeys.DISCHARGE_PATIENT_UPDATE,
            PermissionKeys.DISCHARGE_PATIENT_DELETE,
            PermissionKeys.DISCHARGE_PATIENT_ACCESS,
        ]
    },
    BILLING: {
        name: 'Billing',
        permissions: [
            PermissionKeys.BILLING_VIEW,
            PermissionKeys.BILLING_CREATE,
            PermissionKeys.BILLING_UPDATE,
            PermissionKeys.BILLING_DELETE,
            PermissionKeys.BILLING_LIST,
            PermissionKeys.BILLING_DISCHARGE_REPORT_VIEW,
            PermissionKeys.BILLING_PENDING_PAYMENT_VIEW,
            PermissionKeys.BILLING_COLLECTION_VIEW,
        ]
    },
    REPORTS: {
        name: 'Reports',
        permissions: [
            PermissionKeys.REPORTS_VIEW,
        ]
    },
    CLINIC_MEMBER: {
        name: 'Clinic Member',
        permissions: [
            PermissionKeys.CLINIC_MEMBER_VIEW,
            PermissionKeys.CLINIC_MEMBER_CREATE,
            PermissionKeys.CLINIC_MEMBER_UPDATE,
            PermissionKeys.CLINIC_MEMBER_DELETE,
            PermissionKeys.CLINIC_MEMBER_LIST,
        ]
    },
    PERMISSION: {
        name: "Core System",
        permissions: [
            PermissionKeys.ROLES_VIEW,
            PermissionKeys.ROLES_CREATE,
            PermissionKeys.ROLES_UPDATE,
            PermissionKeys.ROLES_DELETE,
            PermissionKeys.ROLES_LIST,

            PermissionKeys.PERMISSIONS_VIEW,

            PermissionKeys.USERS_VIEW,
            PermissionKeys.USERS_CREATE,
            PermissionKeys.USERS_UPDATE,
            PermissionKeys.USERS_DELETE,
            PermissionKeys.USERS_LIST,

            PermissionKeys.USER_ROLES_VIEW,
            PermissionKeys.USER_ROLES_ASSIGN,
            PermissionKeys.USER_ROLES_REMOVE,
        ],
    },
    MASTER: {
        name: 'Master',
        permissions: [
            PermissionKeys.MASTER_VIEW,
            PermissionKeys.MASTER_STOCK_VIEW,
            PermissionKeys.MASTER_STOCK_CREATE,
            PermissionKeys.MASTER_STOCK_UPDATE,
            PermissionKeys.MASTER_STOCK_DELETE,
        ]
    },
    DASHBOARD: {
        name: 'Dashboard',
        permissions: [
            PermissionKeys.DASHBOARD_OVERVIEW_VIEW,
        ]
    },
} as const;

export const permissions = Object.values(PermissionKeys).map((key) => ({
    permissionName: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    permissionKey: key,
}));

// Single selection utility
export const getModulePermissions = (moduleKey: keyof typeof PermissionModules) => {
    return PermissionModules[moduleKey].permissions;
};

export const getAllModuleNames = () => {
    return Object.entries(PermissionModules).map(([key, module]) => ({
        key: key as keyof typeof PermissionModules,
        name: module.name,
        permissionCount: module.permissions.length
    }));
};