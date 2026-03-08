import { ScanResult } from "../lib/types";
import { DishCard } from "./DishCard";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ResultsSectionProps {
  result: ScanResult;
  userAllergies: string[];
}

export function ResultsSection({ result, userAllergies }: ResultsSectionProps) {
  // Calculate total warnings based on user allergies
  let totalWarnings = 0;
  result.items.forEach(item => {
    const hasMatch = item.allergens.some(
      a => userAllergies.includes(a.name) && (a.presence === "Detected" || a.presence === "Likely")
    );
    if (hasMatch) totalWarnings++;
  });

  return (
    <div className="w-full max-w-5xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-stone-900 mb-4 font-serif">Scan Results</h2>
        <p className="text-stone-600 max-w-2xl mx-auto text-lg">
          {result.overallSummary}
        </p>
      </div>

      {/* Global Warnings */}
      {result.globalWarnings && result.globalWarnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-amber-800 font-semibold mb-1">General Notice</h4>
              <ul className="list-disc list-inside text-amber-700 text-sm space-y-1">
                {result.globalWarnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* User Allergy Summary Banner */}
      {userAllergies.length > 0 && (
        <div className={`rounded-2xl p-4 mb-8 max-w-3xl mx-auto border flex items-center gap-4 ${
          totalWarnings > 0 
            ? "bg-red-50 border-red-200 text-red-800" 
            : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          {totalWarnings > 0 ? (
            <AlertTriangle className="text-red-500 shrink-0" size={24} />
          ) : (
            <CheckCircle className="text-emerald-500 shrink-0" size={24} />
          )}
          <div>
            <h4 className="font-semibold">Allergy Check</h4>
            <p className="text-sm opacity-90">
              {totalWarnings > 0 
                ? `Warning: ${totalWarnings} scanned item(s) may contain your selected allergens.`
                : "Good news! None of your selected allergens were detected in these items."}
            </p>
          </div>
        </div>
      )}

      {/* Dish Cards Grid */}
      {result.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.items.map((dish, idx) => (
            <DishCard key={idx} dish={dish} userAllergies={userAllergies} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-stone-50 rounded-3xl border border-stone-200">
          <p className="text-stone-500">No specific dishes could be identified from this image.</p>
        </div>
      )}
    </div>
  );
}
