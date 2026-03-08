import { ALLERGY_OPTIONS } from "../lib/types";
import { ShieldAlert } from "lucide-react";

interface AllergySelectorProps {
  selectedAllergies: string[];
  onChange: (allergies: string[]) => void;
}

export function AllergySelector({ selectedAllergies, onChange }: AllergySelectorProps) {
  const toggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      onChange(selectedAllergies.filter((a) => a !== allergy));
    } else {
      onChange([...selectedAllergies, allergy]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8 mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-amber-100 p-2 rounded-full text-amber-600">
          <ShieldAlert size={20} />
        </div>
        <h2 className="text-xl font-semibold text-stone-800">Your Allergy Profile</h2>
      </div>
      <p className="text-stone-500 text-sm mb-6">
        Select any allergies or dietary restrictions. We'll highlight potential risks in the scan results.
      </p>
      <div className="flex flex-wrap gap-2">
        {ALLERGY_OPTIONS.map((allergy) => {
          const isSelected = selectedAllergies.includes(allergy);
          return (
            <button
              key={allergy}
              onClick={() => toggleAllergy(allergy)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                isSelected
                  ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              {allergy}
            </button>
          );
        })}
      </div>
    </div>
  );
}
