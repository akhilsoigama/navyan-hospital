import {
  Edit,
  Plus,
  Shield,
  Users,
  CalendarDays,
  ClipboardCheck,
  Stethoscope,
  Package,
  BarChart3,
  Bell,
  Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "1",
    name: "Doctor",
    key: "DOCTOR",
    description:
      "Medical staff with patient care, assessment and treatment management access.",
    permissions: [
      { name: "Dashboard", icon: <BarChart3 size={16} /> },
      { name: "Patients", icon: <Users size={16} /> },
      { name: "Appointments", icon: <CalendarDays size={16} /> },
      { name: "Assessment", icon: <ClipboardCheck size={16} /> },
      { name: "Treatment", icon: <Stethoscope size={16} /> },
      { name: "Medicine Stock", icon: <Package size={16} /> },
      { name: "Reports", icon: <BarChart3 size={16} /> },
    ],
  },
  {
    id: "2",
    name: "Receptionist",
    key: "RECEPTIONIST",
    description:
      "Front desk staff with patient registration, appointments and billing access.",
    permissions: [
      { name: "Dashboard", icon: <BarChart3 size={16} /> },
      { name: "Patients", icon: <Users size={16} /> },
      { name: "Appointments", icon: <CalendarDays size={16} /> },
      { name: "Billing", icon: <Receipt size={16} /> },
      { name: "Medicine Stock", icon: <Package size={16} /> },
      { name: "Notifications", icon: <Bell size={16} /> },
    ],
  },
  {
    id: "3",
    name: "Patient",
    key: "PATIENT",
    description:
      "Patient with limited access to personal appointments, assessment and treatment details.",
    permissions: [
      { name: "Dashboard", icon: <BarChart3 size={16} /> },
      { name: "Appointments", icon: <CalendarDays size={16} /> },
      { name: "Assessment", icon: <ClipboardCheck size={16} /> },
      { name: "Treatment", icon: <Stethoscope size={16} /> },
      { name: "Billing", icon: <Receipt size={16} /> },
    ],
  },
];

const ListRolePermission = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Roles & Permissions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage roles and assign permissions for clinic users.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/dashboard/core-management/rolePermission/new")
            }
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            <Plus size={18} />
            Create Role
          </button>
        </div>

        {/* Role List */}
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-200"
            >
              {/* Role Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Shield size={22} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {role.name}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {role.key}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {role.description}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/core-management/rolePermission/${role.id}/edit`
                    )
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                  title="Edit Role"
                >
                  <Edit size={18} />
                </button>
              </div>

              {/* Permissions Section */}
              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Permissions
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {role.permissions.length} modules assigned
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/core-management/rolePermission/${role.id}/edit`
                      )
                    }
                    className="text-sm font-medium text-amber-600 transition hover:text-amber-700"
                  >
                    Manage Permissions
                  </button>
                </div>

                {/* Permission Modules */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {role.permissions.map((permission) => (
                    <div
                      key={permission.name}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                        {permission.icon}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {permission.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield size={14} />
                  <span>
                    Module Access:{" "}
                    <span className="font-medium text-slate-700">
                      {role.permissions.length}
                    </span>
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/core-management/rolePermission/${role.id}/edit`
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRolePermission;