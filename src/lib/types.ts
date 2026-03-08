export type AllergenPresence = "Detected" | "Likely" | "Possible";
export type SpiceLevel = "Mild" | "Medium" | "Spicy" | "Very Spicy" | "Unknown";
export type ConfidenceLevel = "High" | "Medium" | "Low";
export type HalalStatus = "Halal" | "Non-Halal" | "Muslim-Friendly" | "Unknown";

export interface AllergenInfo {
  name: string;
  presence: AllergenPresence;
  reason: string;
}

export interface DishItem {
  dishName: string;
  altNames: string[];
  description: string;
  mainIngredients: string[];
  cookingMethod: string;
  spiceLevel: SpiceLevel;
  culturalOrigin: string;
  eatingTip: string;
  allergens: AllergenInfo[];
  dietaryNotes: string[];
  confidence: ConfidenceLevel;
  imageUrl?: string;
  estimatedPrice: string;
  halalStatus: HalalStatus;
}

export interface ScanResult {
  scanType: "menu" | "dish" | "mixed" | "unknown";
  overallSummary: string;
  globalWarnings: string[];
  items: DishItem[];
}

export const ALLERGY_OPTIONS = [
  "Eggs",
  "Peanuts",
  "Tree nuts",
  "Milk / dairy",
  "Soy",
  "Fish",
  "Shellfish",
  "Gluten",
  "Sesame"
];
