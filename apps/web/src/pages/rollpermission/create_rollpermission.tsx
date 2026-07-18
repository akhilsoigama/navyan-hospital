// CreateRolePage.tsx

import {
    ArrowLeft,
    Shield,
    Users,
    ClipboardCheck,
    FileText,
    Calendar,
    Stethoscope,
    Wallet,
    Package,
    Settings,
    BarChart,
    Bell,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Save,
    RefreshCw,
    Home,
    UserRound,
    Receipt,
    Plus,
    Minus,
} from "lucide-react";

import { useEffect, useState } from "react";

type PermissionKey = "view" | "create" | "update" | "delete";

interface ModulePermission {
    id: string;
    label: string;
    icon: React.ReactNode;
    permissions: Record<PermissionKey, boolean>;
}

type RoleType = "doctor" | "reception" | "patient";

/* =========================================================
   ALL CRM MODULES
========================================================= */

const ALL_MODULES: ModulePermission[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "appointments",
        label: "Appointments",
        icon: <Calendar size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "patients",
        label: "Patients",
        icon: <Users size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "assessments",
        label: "Assessments",
        icon: <ClipboardCheck size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "treatments",
        label: "Treatment",
        icon: <Stethoscope size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "prescriptions",
        label: "Prescriptions",
        icon: <FileText size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "billing",
        label: "Billing",
        icon: <Receipt size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "payments",
        label: "Payments & Collection",
        icon: <Wallet size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "stock_management",
        label: "Stock Management",
        icon: <Package size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "patient_files",
        label: "Patient Files",
        icon: <FileText size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "reports",
        label: "Reports",
        icon: <BarChart size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: <Bell size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "users",
        label: "Users",
        icon: <UserRound size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "roles",
        label: "Roles",
        icon: <Shield size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    {
        id: "settings",
        label: "Settings",
        icon: <Settings size={16} />,
        permissions: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
];

/* =========================================================
   DEFAULT ROLE PERMISSIONS
========================================================= */

const ROLE_PERMISSIONS: Record<
    RoleType,
    Record<string, Record<PermissionKey, boolean>>
> = {
    /* =====================================================
       DOCTOR
    ===================================================== */

    doctor: {
        dashboard: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        appointments: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        patients: {
            view: true,
            create: false,
            update: true,
            delete: false,
        },

        assessments: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        treatments: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        prescriptions: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        billing: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        payments: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        stock_management: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        patient_files: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        reports: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        notifications: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        users: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        roles: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        settings: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },

    /* =====================================================
       RECEPTION
    ===================================================== */

    reception: {
        dashboard: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        appointments: {
            view: true,
            create: true,
            update: true,
            delete: true,
        },

        patients: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        assessments: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        treatments: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        prescriptions: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        billing: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        payments: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        stock_management: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        patient_files: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        reports: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        notifications: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        users: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        roles: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        settings: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },

    /* =====================================================
       PATIENT
    ===================================================== */

    patient: {
        dashboard: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        appointments: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },

        patients: {
            view: true,
            create: false,
            update: true,
            delete: false,
        },

        assessments: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        treatments: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        prescriptions: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        billing: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        payments: {
            view: true,
            create: true,
            update: false,
            delete: false,
        },

        stock_management: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        patient_files: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        reports: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        notifications: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },

        users: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        roles: {
            view: false,
            create: false,
            update: false,
            delete: false,
        },

        settings: {
            view: true,
            create: false,
            update: true,
            delete: false,
        },
    },
};

/* =========================================================
   PERMISSION LABELS
========================================================= */

const permissionLabels: {
    key: PermissionKey;
    label: string;
}[] = [
    {
        key: "view",
        label: "View",
    },
    {
        key: "create",
        label: "Create",
    },
    {
        key: "update",
        label: "Update",
    },
    {
        key: "delete",
        label: "Delete",
    },
];

/* =========================================================
   CREATE ROLE PAGE
========================================================= */

const CreateRolePage = () => {
    const [selectedRoleType, setSelectedRoleType] =
        useState<RoleType>("doctor");

    const [roleName, setRoleName] =
        useState("Doctor");

    const [roleKey, setRoleKey] =
        useState("DOCTOR");

    const [roleDescription, setRoleDescription] = useState(
        "Medical staff with patient assessment, treatment and prescription management access"
    );

    const [isDefault, setIsDefault] =
        useState(false);

    const [modules, setModules] =
        useState<ModulePermission[]>([]);

    const [expandedModules, setExpandedModules] =
        useState<string[]>([]);

    const [hasChanges, setHasChanges] =
        useState(false);

    /* =====================================================
       LOAD ROLE
    ===================================================== */

    const loadRole = (role: RoleType) => {
        const roleData = ROLE_PERMISSIONS[role];

        setSelectedRoleType(role);

        const names = {
            doctor: "Doctor",
            reception: "Reception",
            patient: "Patient",
        };

        const keys = {
            doctor: "DOCTOR",
            reception: "RECEPTION",
            patient: "PATIENT",
        };

        const descs = {
            doctor:
                "Medical staff with patient assessment, treatment and prescription management access",

            reception:
                "Front desk staff with patient registration, appointment and billing management access",

            patient:
                "Patient with self-service access to appointments, treatments, billing and personal records",
        };

        setRoleName(names[role]);

        setRoleKey(keys[role]);

        setRoleDescription(descs[role]);

        const updatedModules = ALL_MODULES.map((mod) => ({
            ...mod,

            permissions: {
                view:
                    roleData[mod.id]?.view ||
                    false,

                create:
                    roleData[mod.id]?.create ||
                    false,

                update:
                    roleData[mod.id]?.update ||
                    false,

                delete:
                    roleData[mod.id]?.delete ||
                    false,
            },
        }));

        setModules(updatedModules);

        setHasChanges(false);
    };

    /* =====================================================
       TOGGLE SINGLE PERMISSION
    ===================================================== */

    const togglePermission = (
        moduleId: string,
        permKey: PermissionKey
    ) => {
        setModules((prev) =>
            prev.map((mod) =>
                mod.id === moduleId
                    ? {
                        ...mod,

                        permissions: {
                            ...mod.permissions,

                            [permKey]:
                                !mod.permissions[permKey],
                        },
                    }
                    : mod
            )
        );

        setHasChanges(true);
    };

    /* =====================================================
       TOGGLE ALL PERMISSIONS
    ===================================================== */

    const toggleModuleAll = (
        moduleId: string,
        value: boolean
    ) => {
        setModules((prev) =>
            prev.map((mod) =>
                mod.id === moduleId
                    ? {
                        ...mod,

                        permissions: {
                            view: value,
                            create: value,
                            update: value,
                            delete: value,
                        },
                    }
                    : mod
            )
        );

        setHasChanges(true);
    };

    /* =====================================================
       EXPAND / COLLAPSE MODULE
    ===================================================== */

    const toggleExpand = (
        moduleId: string
    ) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId)
                ? prev.filter(
                    (id) =>
                        id !== moduleId
                )
                : [
                    ...prev,
                    moduleId,
                ]
        );
    };

    /* =====================================================
       COUNT PERMISSIONS
    ===================================================== */

    const countPermissions = (
        mod: ModulePermission
    ) => {
        return Object.values(
            mod.permissions
        ).filter(Boolean).length;
    };

    /* =====================================================
       TOTAL PERMISSIONS
    ===================================================== */

    const totalSelected =
        modules.reduce(
            (acc, mod) =>
                acc +
                countPermissions(mod),
            0
        );

    const totalPossible =
        modules.length * 4;

    /* =====================================================
       RESET ROLE
    ===================================================== */

    const handleReset = () => {
        loadRole(
            selectedRoleType
        );
    };

    /* =====================================================
       ROLE CHANGE
    ===================================================== */

    const handleRoleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        loadRole(
            e.target.value as RoleType
        );
    };

    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    useEffect(() => {
        loadRole("doctor");
    }, []);

    /* =====================================================
       UI
    ===================================================== */

    return (
        <div className="min-h-screen bg-slate-50 p-6">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-6 flex items-center gap-4">

                    <button
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Create Role
                        </h1>

                        <p className="text-sm text-slate-500">
                            Define a new role and assign system-wide permissions
                        </p>

                    </div>

                </div>

                {/* MAIN FORM */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* ROLE INFORMATION */}

                    <div className="lg:col-span-1">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-semibold text-slate-900">
                                Role Information
                            </h2>

                            <div className="mt-4 space-y-4">

                                {/* ROLE TEMPLATE */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700">
                                        Role Template
                                    </label>

                                    <select
                                        value={selectedRoleType}
                                        onChange={handleRoleChange}
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                                    >

                                        <option value="doctor">
                                            Doctor
                                        </option>

                                        <option value="reception">
                                            Reception
                                        </option>

                                        <option value="patient">
                                            Patient
                                        </option>

                                    </select>

                                </div>

                                {/* ROLE NAME */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700">
                                        Role Name *
                                    </label>

                                    <input
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => {
                                            setRoleName(
                                                e.target.value
                                            );

                                            setHasChanges(
                                                true
                                            );
                                        }}
                                        placeholder="e.g. Administrator"
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                                    />

                                </div>

                                {/* ROLE KEY */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700">
                                        Role Key *
                                    </label>

                                    <input
                                        type="text"
                                        value={roleKey}
                                        onChange={(e) => {

                                            setRoleKey(
                                                e.target.value.toUpperCase()
                                            );

                                            setHasChanges(
                                                true
                                            );

                                        }}
                                        placeholder="e.g. ADMIN"
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                                    />

                                </div>

                                {/* DESCRIPTION */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700">
                                        Description (optional)
                                    </label>

                                    <textarea
                                        value={
                                            roleDescription
                                        }
                                        onChange={(e) => {

                                            setRoleDescription(
                                                e.target.value
                                            );

                                            setHasChanges(
                                                true
                                            );

                                        }}
                                        rows={3}
                                        placeholder="Brief purpose of this role"
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                                    />

                                </div>

                                {/* DEFAULT ROLE */}

                                <div className="flex items-center gap-2">

                                    <input
                                        type="checkbox"
                                        id="defaultRole"
                                        checked={
                                            isDefault
                                        }
                                        onChange={(e) => {

                                            setIsDefault(
                                                e.target.checked
                                            );

                                            setHasChanges(
                                                true
                                            );

                                        }}
                                        className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                    />

                                    <label
                                        htmlFor="defaultRole"
                                        className="text-sm text-slate-700"
                                    >
                                        Set as default role
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PERMISSIONS */}

                    <div className="lg:col-span-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            {/* PERMISSION HEADER */}

                            <div className="mb-4 flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Permissions
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {totalSelected} selected ·{" "}
                                        {totalPossible} total
                                    </p>

                                </div>

                                <div className="flex items-center gap-2">

                                    {/* RESET */}

                                    <button
                                        onClick={
                                            handleReset
                                        }
                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                                    >

                                        <RefreshCw
                                            size={16}
                                        />

                                        Reset

                                    </button>

                                    {/* CREATE ROLE */}

                                    <button
                                        className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
                                    >

                                        <Save
                                            size={16}
                                        />

                                        Create Role

                                    </button>

                                </div>

                            </div>

                            {/* PERMISSIONS LIST */}

                            <div className="space-y-2">

                                {modules.map(
                                    (mod) => {

                                        const count =
                                            countPermissions(
                                                mod
                                            );

                                        const isExpanded =
                                            expandedModules.includes(
                                                mod.id
                                            );

                                        const allChecked =
                                            count === 4;

                                        const someChecked =
                                            count > 0 &&
                                            count < 4;

                                        return (

                                            <div
                                                key={
                                                    mod.id
                                                }
                                                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-amber-200"
                                            >

                                                {/* MODULE HEADER */}

                                                <div
                                                    className="flex cursor-pointer items-center justify-between px-4 py-3 transition hover:bg-slate-50"
                                                    onClick={() =>
                                                        toggleExpand(
                                                            mod.id
                                                        )
                                                    }
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">

                                                            {
                                                                mod.icon
                                                            }

                                                        </div>

                                                        <span className="font-medium text-slate-900">
                                                            {
                                                                mod.label
                                                            }
                                                        </span>

                                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">

                                                            {
                                                                count
                                                            }
                                                            /4

                                                        </span>

                                                    </div>

                                                    <div className="flex items-center gap-2">

                                                        {someChecked &&
                                                            !allChecked && (

                                                                <span className="text-xs text-amber-600">
                                                                    Partial
                                                                </span>

                                                            )}

                                                        {allChecked && (

                                                            <span className="text-xs text-emerald-600">
                                                                Full
                                                            </span>

                                                        )}

                                                        {/* SELECT ALL */}

                                                        <button
                                                            onClick={(
                                                                e
                                                            ) => {

                                                                e.stopPropagation();

                                                                toggleModuleAll(
                                                                    mod.id,
                                                                    !allChecked
                                                                );

                                                            }}
                                                            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-200"
                                                            title={
                                                                allChecked
                                                                    ? "Deselect all"
                                                                    : "Select all"
                                                            }
                                                        >

                                                            {allChecked ? (
                                                                <Minus
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            ) : (
                                                                <Plus
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            )}

                                                        </button>

                                                        {/* ARROW */}

                                                        {isExpanded ? (

                                                            <ChevronUp
                                                                size={
                                                                    18
                                                                }
                                                                className="text-slate-400"
                                                            />

                                                        ) : (

                                                            <ChevronDown
                                                                size={
                                                                    18
                                                                }
                                                                className="text-slate-400"
                                                            />

                                                        )}

                                                    </div>

                                                </div>

                                                {/* PERMISSION OPTIONS */}

                                                {isExpanded && (

                                                    <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">

                                                        <div className="grid grid-cols-4 gap-2">

                                                            {permissionLabels.map(
                                                                ({
                                                                    key,
                                                                    label,
                                                                }) => (

                                                                    <label
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow"
                                                                    >

                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                mod
                                                                                    .permissions[
                                                                                    key
                                                                                ]
                                                                            }
                                                                            onChange={() =>
                                                                                togglePermission(
                                                                                    mod.id,
                                                                                    key
                                                                                )
                                                                            }
                                                                            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                                                        />

                                                                        {
                                                                            label
                                                                        }

                                                                    </label>

                                                                )
                                                            )}

                                                        </div>

                                                    </div>

                                                )}

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                            {/* SUMMARY */}

                            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">

                                <span>
                                    {totalSelected} permissions selected out of{" "}
                                    {totalPossible}
                                </span>

                                {hasChanges && (

                                    <span className="flex items-center gap-1 text-amber-600">

                                        <AlertCircle
                                            size={16}
                                        />

                                        Unsaved changes

                                    </span>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CreateRolePage;