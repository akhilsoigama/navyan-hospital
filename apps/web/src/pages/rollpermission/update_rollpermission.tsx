import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Users,
  CalendarDays,
  ClipboardCheck,
  Stethoscope,
  Receipt,
  Package,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Save,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type PermissionKey = "view" | "create" | "update" | "delete";

interface ModulePermission {
  id: string;
  label: string;
  icon: React.ReactNode;
  permissions: Record<PermissionKey, boolean>;
}

type RoleId = "1" | "2" | "3";

const permissionLabels: {
  key: PermissionKey;
  label: string;
}[] = [
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "update", label: "Update" },
  { key: "delete", label: "Delete" },
];

/* --------------------------------
   CRM Modules
--------------------------------- */

const ALL_MODULES: ModulePermission[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 size={16} />,
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
    id: "appointments",
    label: "Appointments",
    icon: <CalendarDays size={16} />,
    permissions: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
  },
  {
    id: "assessment",
    label: "Assessment",
    icon: <ClipboardCheck size={16} />,
    permissions: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
  },
  {
    id: "treatment",
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
    id: "medicine_stock",
    label: "Medicine Stock",
    icon: <Package size={16} />,
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
    icon: <BarChart3 size={16} />,
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
];

/* --------------------------------
   Role Permissions
--------------------------------- */

const ROLE_PERMISSIONS: Record<
  RoleId,
  {
    name: string;
    key: string;
    description: string;
    permissions: Record<
      string,
      Record<PermissionKey, boolean>
    >;
  }
> = {
  "1": {
    name: "Doctor",
    key: "DOCTOR",
    description:
      "Medical staff with patient care, assessment and treatment management access.",

    permissions: {
      dashboard: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },

      patients: {
        view: true,
        create: true,
        update: true,
        delete: false,
      },

      appointments: {
        view: true,
        create: true,
        update: true,
        delete: false,
      },

      assessment: {
        view: true,
        create: true,
        update: true,
        delete: false,
      },

      treatment: {
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

      medicine_stock: {
        view: true,
        create: false,
        update: false,
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
    },
  },

  "2": {
    name: "Receptionist",
    key: "RECEPTIONIST",
    description:
      "Front desk staff with patient registration, appointments and billing access.",

    permissions: {
      dashboard: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },

      patients: {
        view: true,
        create: true,
        update: true,
        delete: false,
      },

      appointments: {
        view: true,
        create: true,
        update: true,
        delete: false,
      },

      assessment: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },

      treatment: {
        view: false,
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

      medicine_stock: {
        view: true,
        create: true,
        update: true,
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
        create: true,
        update: false,
        delete: false,
      },
    },
  },

  "3": {
    name: "Patient",
    key: "PATIENT",
    description:
      "Patient with limited access to personal appointments, assessment and treatment details.",

    permissions: {
      dashboard: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },

      patients: {
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

      assessment: {
        view: true,
        create: false,
        update: false,
        delete: false,
      },

      treatment: {
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

      medicine_stock: {
        view: false,
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
    },
  },
};

const UpdateRolePermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const roleId: RoleId =
    id === "1" || id === "2" || id === "3" ? id : "1";

  const currentRole = ROLE_PERMISSIONS[roleId];

  /* --------------------------------
     State
  --------------------------------- */

  const [modules, setModules] = useState<ModulePermission[]>(() =>
    ALL_MODULES.map((module) => ({
      ...module,
      permissions: {
        ...currentRole.permissions[module.id],
      },
    }))
  );

  const [expandedModules, setExpandedModules] = useState<string[]>(
    []
  );

  const [hasChanges, setHasChanges] = useState(false);

  /* --------------------------------
     Toggle Permission
  --------------------------------- */

  const togglePermission = (
    moduleId: string,
    permission: PermissionKey
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              permissions: {
                ...module.permissions,
                [permission]:
                  !module.permissions[permission],
              },
            }
          : module
      )
    );

    setHasChanges(true);
  };

  /* --------------------------------
     Toggle All Permissions
  --------------------------------- */

  const toggleModuleAll = (
    moduleId: string,
    value: boolean
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              permissions: {
                view: value,
                create: value,
                update: value,
                delete: value,
              },
            }
          : module
      )
    );

    setHasChanges(true);
  };

  /* --------------------------------
     Expand / Collapse
  --------------------------------- */

  const toggleExpand = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  /* --------------------------------
     Count Permissions
  --------------------------------- */

  const countPermissions = (
    module: ModulePermission
  ) => {
    return Object.values(module.permissions).filter(
      Boolean
    ).length;
  };

  const totalSelected = modules.reduce(
    (total, module) =>
      total + countPermissions(module),
    0
  );

  const totalPossible = modules.length * 4;

  /* --------------------------------
     Reset
  --------------------------------- */

  const handleReset = () => {
    setModules(
      ALL_MODULES.map((module) => ({
        ...module,
        permissions: {
          ...currentRole.permissions[module.id],
        },
      }))
    );

    setHasChanges(false);
  };

  /* --------------------------------
     Update Role
  --------------------------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPermissions = modules.reduce(
      (acc, module) => {
        acc[module.id] = module.permissions;
        return acc;
      },
      {} as Record<
        string,
        Record<PermissionKey, boolean>
      >
    );

    console.log({
      roleId,
      role: currentRole.name,
      roleKey: currentRole.key,
      permissions: updatedPermissions,
    });

    alert("Role permissions updated successfully!");

    navigate(
      "/dashboard/core-management/rolePermission/list"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* --------------------------------
            Header
        --------------------------------- */}

        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Edit Role
            </h1>

            <p className="text-sm text-slate-500">
              Update role information and assign system-wide
              permissions
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* --------------------------------
                Role Information
            --------------------------------- */}

            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                  Role Information
                </h2>

                <div className="mt-5 space-y-5">

                  {/* Role Icon */}

                  <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                      <Shield size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Current Role
                      </p>

                      <p className="font-semibold text-slate-900">
                        {currentRole.name}
                      </p>
                    </div>
                  </div>

                  {/* Role Name */}

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Role Name
                    </label>

                    <input
                      type="text"
                      value={currentRole.name}
                      readOnly
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none"
                    />
                  </div>

                  {/* Role Key */}

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Role Key
                    </label>

                    <input
                      type="text"
                      value={currentRole.key}
                      readOnly
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 outline-none"
                    />
                  </div>

                  {/* Description */}

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Description
                    </label>

                    <textarea
                      value={currentRole.description}
                      readOnly
                      rows={4}
                      className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm leading-5 text-slate-600 outline-none"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* --------------------------------
                Permissions
            --------------------------------- */}

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                {/* Permission Header */}

                <div className="mb-5 flex items-center justify-between">

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

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      <RefreshCw size={16} />
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
                    >
                      <Save size={16} />
                      Update Role
                    </button>

                  </div>
                </div>

                {/* Permission Modules */}

                <div className="space-y-2">

                  {modules.map((module) => {
                    const count =
                      countPermissions(module);

                    const isExpanded =
                      expandedModules.includes(
                        module.id
                      );

                    const allChecked = count === 4;

                    const someChecked =
                      count > 0 && count < 4;

                    return (
                      <div
                        key={module.id}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-amber-200"
                      >

                        {/* Module Header */}

                        <div
                          className="flex cursor-pointer items-center justify-between px-4 py-3 transition hover:bg-slate-50"
                          onClick={() =>
                            toggleExpand(module.id)
                          }
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                              {module.icon}
                            </div>

                            <span className="font-medium text-slate-900">
                              {module.label}
                            </span>

                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                              {count}/4
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

                            {/* Select All */}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                toggleModuleAll(
                                  module.id,
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
                                <Minus size={14} />
                              ) : (
                                <Plus size={14} />
                              )}
                            </button>

                            {isExpanded ? (
                              <ChevronUp
                                size={18}
                                className="text-slate-400"
                              />
                            ) : (
                              <ChevronDown
                                size={18}
                                className="text-slate-400"
                              />
                            )}

                          </div>
                        </div>

                        {/* Permission Options */}

                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">

                            <div className="grid grid-cols-4 gap-2">

                              {permissionLabels.map(
                                ({
                                  key,
                                  label,
                                }) => (
                                  <label
                                    key={key}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow"
                                  >

                                    <input
                                      type="checkbox"
                                      checked={
                                        module
                                          .permissions[
                                          key
                                        ]
                                      }
                                      onChange={() =>
                                        togglePermission(
                                          module.id,
                                          key
                                        )
                                      }
                                      className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                    />

                                    {label}
                                  </label>
                                )
                              )}

                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                </div>

                {/* Footer */}

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">

                  <span>
                    {totalSelected} permissions selected
                    out of {totalPossible}
                  </span>

                  {hasChanges && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertCircle size={16} />
                      Unsaved changes
                    </span>
                  )}

                </div>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};


export default UpdateRolePermission;