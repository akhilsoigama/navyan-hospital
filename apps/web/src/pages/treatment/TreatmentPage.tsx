import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Stethoscope,
  Users,
} from "lucide-react";

const TreatmentPage = () => {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Treatment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient treatment sessions and track their progress.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={18} />
          Add Treatment Session
        </button>
      </div>


      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Sessions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Sessions
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                128
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                All treatment sessions
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Activity size={24} />
            </div>
          </div>
        </div>


        {/* Today's Sessions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Today's Sessions
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                12
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Scheduled for today
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarDays size={24} />
            </div>
          </div>
        </div>


        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                96
              </h2>

              <p className="mt-2 text-xs text-emerald-600">
                +8% this month
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>


        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Upcoming
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                20
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Upcoming sessions
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={24} />
            </div>
          </div>
        </div>

      </div>


      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly manage your treatment workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <button className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100">
              <Plus size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Add Treatment
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Create a new treatment session
              </p>
            </div>

          </button>


          <button className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
              <Users size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                View Sessions
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                View all patient treatments
              </p>
            </div>

          </button>


          <button className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100">
              <Stethoscope size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Treatment Progress
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Track patient treatment progress
              </p>
            </div>

          </button>

        </div>
      </div>


      {/* Recent Treatment Sessions */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Treatment Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest treatment activity in your clinic.
            </p>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View All
          </button>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Patient
                </th>

                <th className="px-6 py-4 font-semibold">
                  Treatment
                </th>

                <th className="px-6 py-4 font-semibold">
                  Therapist
                </th>

                <th className="px-6 py-4 font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold">
                  Action
                </th>
              </tr>
            </thead>


            <tbody className="divide-y divide-slate-100">

              <tr className="transition hover:bg-slate-50">

                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Rajesh Kumar
                    </p>

                    <p className="text-xs text-slate-500">
                      PT-1001
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  Physiotherapy
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  Dr. Amit Patel
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  18 Jul 2026
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Completed
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View
                  </button>
                </td>

              </tr>


              <tr className="transition hover:bg-slate-50">

                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Punit Shah
                    </p>

                    <p className="text-xs text-slate-500">
                      PT-1002
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  Rehabilitation
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  Dr. Ravi Mehta
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  18 Jul 2026
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Scheduled
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View
                  </button>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default TreatmentPage;