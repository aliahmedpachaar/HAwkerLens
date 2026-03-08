import { DishItem } from "../lib/types";
import { AlertTriangle, Info, Flame, ChefHat, Globe2, Lightbulb } from "lucide-react";

interface DishCardProps {
  key?: string | number;
  dish: DishItem;
  userAllergies: string[];
}

export function DishCard({ dish, userAllergies }: DishCardProps) {
  // Check if any of the dish's allergens match the user's selected allergies
  const matchedAllergens = dish.allergens.filter(
    (a) => userAllergies.includes(a.name) && (a.presence === "Detected" || a.presence === "Likely")
  );
  
  const hasWarning = matchedAllergens.length > 0;

  const renderSpiceLevel = (level: string) => {
    if (level === "Unknown") return null;
    let flames = 0;
    if (level === "Mild") flames = 1;
    if (level === "Medium") flames = 2;
    if (level === "Spicy") flames = 3;
    if (level === "Very Spicy") flames = 4;

    return (
      <div className="flex items-center gap-1 text-orange-500 text-xs font-medium bg-orange-50 px-2 py-1 rounded-md">
        <div className="flex">
          {Array.from({ length: flames }).map((_, i) => (
            <Flame key={i} size={12} className="fill-orange-500" />
          ))}
        </div>
        <span>{level}</span>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md ${
      hasWarning ? "border-red-300" : "border-stone-200"
    }`}>
      {/* Header Area */}
      <div className={`p-6 border-b ${hasWarning ? "bg-red-50/50" : "bg-stone-50/50"}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-stone-900 font-serif leading-tight">
            {dish.dishName}
          </h3>
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            dish.confidence === "High" ? "bg-emerald-100 text-emerald-700" :
            dish.confidence === "Medium" ? "bg-amber-100 text-amber-700" :
            "bg-stone-200 text-stone-700"
          }`}>
            {dish.confidence} Match
          </div>
        </div>
        
        {dish.altNames && dish.altNames.length > 0 && (
          <p className="text-sm text-stone-500 italic mb-3">
            Also known as: {dish.altNames.join(", ")}
          </p>
        )}
        
        <p className="text-stone-700 text-sm leading-relaxed">
          {dish.description}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Warning Banner if matched allergies */}
        {hasWarning && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-red-800 font-semibold text-sm mb-1">Allergy Warning</h4>
              <p className="text-red-600 text-xs leading-relaxed">
                This dish contains or likely contains: <span className="font-bold">{matchedAllergens.map(a => a.name).join(", ")}</span>.
              </p>
            </div>
          </div>
        )}

        {/* Ingredients & Meta */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ChefHat size={14} /> Main Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.mainIngredients.map((ing, idx) => (
                <span key={idx} className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-md">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {dish.culturalOrigin && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Globe2 size={14} /> Origin
                </h4>
                <p className="text-sm text-stone-800">{dish.culturalOrigin}</p>
              </div>
            )}
            {dish.spiceLevel !== "Unknown" && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Spice Level
                </h4>
                {renderSpiceLevel(dish.spiceLevel)}
              </div>
            )}
          </div>
        </div>

        {/* Allergens Section */}
        {dish.allergens && dish.allergens.length > 0 && (
          <div className="border-t border-stone-100 pt-5">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Detected Allergens
            </h4>
            <div className="space-y-2">
              {dish.allergens.map((allergen, idx) => {
                const isUserAllergic = userAllergies.includes(allergen.name);
                const isHighRisk = allergen.presence === "Detected" || allergen.presence === "Likely";
                
                return (
                  <div key={idx} className={`flex items-start gap-2 p-2.5 rounded-lg text-sm ${
                    isUserAllergic && isHighRisk ? "bg-red-50 text-red-800" : "bg-stone-50 text-stone-700"
                  }`}>
                    {isUserAllergic && isHighRisk ? (
                      <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    ) : (
                      <Info size={16} className="text-stone-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold">{allergen.name}</span>
                      <span className="text-xs ml-2 px-1.5 py-0.5 rounded bg-white/50 border border-black/5">
                        {allergen.presence}
                      </span>
                      <p className={`text-xs mt-1 ${isUserAllergic && isHighRisk ? "text-red-600" : "text-stone-500"}`}>
                        {allergen.reason}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Eating Tip */}
        {dish.eatingTip && (
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex gap-3 items-start">
            <Lightbulb className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-emerald-800 font-medium text-sm mb-1">Local Tip</h4>
              <p className="text-emerald-700/80 text-xs leading-relaxed">
                {dish.eatingTip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
