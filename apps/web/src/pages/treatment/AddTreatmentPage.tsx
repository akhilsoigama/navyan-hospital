import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TreatmentFormData {
  patient: string;
  treatmentType: string;
  therapist: string;
  sessionDate: string;
  sessionTime: string;
  duration: string;
  status: string;
  treatmentNotes: string;
  progressNotes: string;
}

const TreatmentAddPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreatmentFormData>();

  const onSubmit = (data: TreatmentFormData) => {
    console.log("Treatment Session:", data);

    // Later: API call will be added here
    navigate("/treatment");
  };

  return (
    <div className="mx-8 max-w-full space-y-6 my-5">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/treatment")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Add Treatment Session
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a new treatment session for a patient.
            </p>
          </div>
        </div>

      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Patient Information */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-slate-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Patient Information
              </h2>

              <p className="text-sm text-slate-500">
                Select the patient for this treatment session.
              </p>
            </div>
          </div>


          <div className="p-6">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Select Patient <span className="text-red-500">*</span>
            </label>

            <select
              {...register("patient", {
                required: "Please select a patient",
              })}
              className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:bg-white focus:ring-2 ${
                errors.patient
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            >
              <option value="">Select a patient</option>
              <option value="PT-1001">Rajesh Kumar - PT-1001</option>
              <option value="PT-1002">Punit Shah - PT-1002</option>
              <option value="PT-1003">Neha Patel - PT-1003</option>
              <option value="PT-1004">Amit Joshi - PT-1004</option>
              <option value="PT-1005">Kavita Mehta - PT-1005</option>
            </select>

            {errors.patient && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.patient.message}
              </p>
            )}

          </div>

        </div>


        {/* Treatment Details */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-slate-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Stethoscope size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Treatment Details
              </h2>

              <p className="text-sm text-slate-500">
                Add the details of the treatment session.
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Treatment Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Treatment Type <span className="text-red-500">*</span>
              </label>

              <select
                {...register("treatmentType", {
                  required: "Please select treatment type",
                })}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select treatment type</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Rehabilitation">Rehabilitation</option>
                <option value="Speech Therapy">Speech Therapy</option>
                <option value="Occupational Therapy">
                  Occupational Therapy
                </option>
              </select>

              {errors.treatmentType && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.treatmentType.message}
                </p>
              )}
            </div>


            {/* Therapist */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Therapist / Doctor <span className="text-red-500">*</span>
              </label>

              <select
                {...register("therapist", {
                  required: "Please select therapist",
                })}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select therapist</option>
                <option value="Dr. Amit Patel">Dr. Amit Patel</option>
                <option value="Dr. Ravi Mehta">Dr. Ravi Mehta</option>
                <option value="Dr. Priya Shah">Dr. Priya Shah</option>
                <option value="Dr. Karan Shah">Dr. Karan Shah</option>
              </select>

              {errors.therapist && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.therapist.message}
                </p>
              )}
            </div>


            {/* Session Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Session Date <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  {...register("sessionDate", {
                    required: "Please select session date",
                  })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.sessionDate && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.sessionDate.message}
                </p>
              )}
            </div>


            {/* Session Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Session Time <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  {...register("sessionTime", {
                    required: "Please select session time",
                  })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.sessionTime && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.sessionTime.message}
                </p>
              )}
            </div>


            {/* Duration */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Session Duration
              </label>

              <select
                {...register("duration")}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select duration</option>
                <option value="30 Minutes">30 Minutes</option>
                <option value="45 Minutes">45 Minutes</option>
                <option value="60 Minutes">60 Minutes</option>
                <option value="90 Minutes">90 Minutes</option>
              </select>
            </div>


            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Session Status
              </label>

              <select
                {...register("status")}
                defaultValue="Scheduled"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Missed">Missed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>

        </div>


        {/* Treatment Notes */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-slate-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Treatment Notes
              </h2>

              <p className="text-sm text-slate-500">
                Record treatment and patient progress details.
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Treatment Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Treatment Notes
              </label>

              <textarea
                {...register("treatmentNotes")}
                rows={5}
                placeholder="Enter details about the treatment provided..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>


            {/* Progress Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Progress Notes
              </label>

              <textarea
                {...register("progressNotes")}
                rows={5}
                placeholder="Enter patient progress and observations..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

        </div>


        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/treatment")}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Save Treatment Session
          </button>

        </div>

      </form>
    </div>
  );
};

export default TreatmentAddPage;