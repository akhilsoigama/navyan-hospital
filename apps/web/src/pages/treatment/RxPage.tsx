// pages/dashboard/rx/RxPage.tsx
import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaPrint,
  FaSave,
  FaWhatsapp,
  FaUserCircle,
} from "react-icons/fa";

// ---------- Types ----------
type Medicine = {
  id: number;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
};

type PatientOption = {
  id: string;
  name: string;
  mobile: string;
  age: number;
  gender: string;
};

// ---------- Mock Data (replace with real API later) ----------
const mockPatients: PatientOption[] = [
  { id: "P1250", name: "Kalpesh Desai", mobile: "98765 43210", age: 34, gender: "Male" },
  { id: "P1249", name: "Nirali Trivedi", mobile: "98765 43211", age: 28, gender: "Female" },
  { id: "P1248", name: "Haresh Prajapati", mobile: "98765 43212", age: 45, gender: "Male" },
];

const instructionOptions = ["Before Food", "After Food", "With Water", "Empty Stomach"];

let medicineIdCounter = 1;

const RxPage = () => {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientOption | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [diagnosis, setDiagnosis] = useState("");
  const [vitals, setVitals] = useState({ bp: "", pulse: "", weight: "", temp: "" });
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: medicineIdCounter++, name: "", dosage: "", duration: "", instructions: "" },
  ]);
  const [advice, setAdvice] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.replace(" ", "").includes(search.replace(" ", ""))
  );

  const handleSelectPatient = (p: PatientOption) => {
    setSelectedPatient(p);
    setSearch(`${p.name} (${p.mobile})`);
    setShowResults(false);
  };

  const addMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      { id: medicineIdCounter++, name: "", dosage: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedicineRow = (id: number) => {
    setMedicines((prev) => (prev.length > 1 ? prev.filter((m) => m.id !== id) : prev));
  };

  const updateMedicine = (id: number, field: keyof Medicine, value: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSave = () => {
    // TODO: wire up to tRPC mutation
    console.log({ selectedPatient, diagnosis, vitals, medicines, advice, followUpDate });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">RX — Create Prescription</h2>
          <p className="text-sm text-gray-400">Write and issue a new prescription for a patient</p>
        </div>
      </div>

      {/* Patient Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Search Patient (Mobile Number / Name)
        </label>
        <div className="relative">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true);
                if (selectedPatient) setSelectedPatient(null);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search by mobile number or name..."
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>

          {showResults && search && !selectedPatient && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPatient(p)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left border-b last:border-0"
                  >
                    <FaUserCircle className="text-gray-300 size-8 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        {p.mobile} • {p.age}y • {p.gender} • {p.id}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400">No patient found</p>
              )}
            </div>
          )}
        </div>

        {/* Selected patient card */}
        {selectedPatient && (
          <div className="mt-3 flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-blue-300 size-9" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{selectedPatient.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedPatient.mobile} • {selectedPatient.age}y • {selectedPatient.gender} • ID: {selectedPatient.id}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedPatient(null);
                setSearch("");
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Vitals */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Vitals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">BP (mmHg)</label>
            <input
              type="text"
              placeholder="120/80"
              value={vitals.bp}
              onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Pulse (bpm)</label>
            <input
              type="text"
              placeholder="72"
              value={vitals.pulse}
              onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Weight (kg)</label>
            <input
              type="text"
              placeholder="68"
              value={vitals.weight}
              onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Temp (°F)</label>
            <input
              type="text"
              placeholder="98.6"
              value={vitals.temp}
              onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <label className="text-sm font-semibold text-gray-800 mb-2 block">
          Diagnosis / Chief Complaint
        </label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          rows={2}
          placeholder="e.g. Lower back pain, muscle stiffness..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        />
      </div>

      {/* Medicines */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Medicines</h3>
          <button
            onClick={addMedicineRow}
            className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline"
          >
            <FaPlus className="size-3" /> Add Medicine
          </button>
        </div>

        <div className="space-y-3">
          {/* Header row (desktop only) */}
          <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-medium text-gray-400 px-1">
            <span className="col-span-4">Medicine Name</span>
            <span className="col-span-2">Dosage</span>
            <span className="col-span-2">Duration</span>
            <span className="col-span-3">Instructions</span>
            <span className="col-span-1"></span>
          </div>

          {medicines.map((m) => (
            <div key={m.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <input
                type="text"
                placeholder="e.g. Paracetamol 500mg"
                value={m.name}
                onChange={(e) => updateMedicine(m.id, "name", e.target.value)}
                className="md:col-span-4 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="1-0-1"
                value={m.dosage}
                onChange={(e) => updateMedicine(m.id, "dosage", e.target.value)}
                className="md:col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="5 days"
                value={m.duration}
                onChange={(e) => updateMedicine(m.id, "duration", e.target.value)}
                className="md:col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
              <select
                value={m.instructions}
                onChange={(e) => updateMedicine(m.id, "instructions", e.target.value)}
                className="md:col-span-3 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-gray-600"
              >
                <option value="">Select</option>
                {instructionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button
                onClick={() => removeMedicineRow(m.id)}
                className="md:col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 py-2"
              >
                <FaTrash className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Advice + Follow-up */}
      <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Advice / Notes</label>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            rows={3}
            placeholder="e.g. Avoid heavy lifting, apply hot compress twice daily..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Follow-up Date</label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-3">
        <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
          <FaWhatsapp className="size-4 text-emerald-500" /> Send via WhatsApp
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
          <FaPrint className="size-4" /> Print
        </button>
        <button
          onClick={handleSave}
          disabled={!selectedPatient}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaSave className="size-4" /> Save Prescription
        </button>
      </div>
    </div>
  );
};

export default RxPage;