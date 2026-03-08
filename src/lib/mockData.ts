import { ScanResult } from "./types";

export const mockNasiKerabu: ScanResult = {
  scanType: "dish",
  overallSummary: "A vibrant, traditional Malay rice dish known for its blue color and fresh herbs.",
  globalWarnings: [],
  items: [
    {
      dishName: "Nasi Kerabu",
      altNames: ["Khao Jam"],
      description: "The iconic blue hue comes from Telang flowers. Historically served as a farmer's lunch, rich in local wild herbs (ulam).",
      mainIngredients: ["Blue Pea Flower", "Herbs"],
      cookingMethod: "Rice is steamed with butterfly pea extract; herbs are finely chopped and served raw.",
      spiceLevel: "Spicy",
      culturalOrigin: "KELANTAN, MALAYSIA",
      eatingTip: "Mix all components thoroughly with the budu sauce for the perfect bite.",
      allergens: [
        {
          name: "Shellfish",
          presence: "Detected",
          reason: "Contains fish sauce/budu."
        }
      ],
      dietaryNotes: ["Rich in fresh herbs"],
      confidence: "High",
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", // Placeholder for blue rice
      estimatedPrice: "RM 6.00 - RM 10.00",
      halalStatus: "Halal"
    }
  ]
};

export const mockRojak: ScanResult = {
  scanType: "dish",
  overallSummary: "A complex, sweet and savory Malaysian fruit and vegetable salad with a thick, dark sauce.",
  globalWarnings: ["Contains peanuts and shrimp paste."],
  items: [
    {
      dishName: "Rojak",
      altNames: ["Fruit Rojak", "Penang Rojak"],
      description: "Meaning \"mixture\" in Malay. It represents the multicultural fabric of the region through a blend of fruit, dough fritters, and dark shrimp paste.",
      mainIngredients: ["Shrimp Paste", "Crushed Peanuts"],
      cookingMethod: "Raw fruits and vegetables are chopped and tossed in a thick, unheated sauce.",
      spiceLevel: "Spicy",
      culturalOrigin: "PENANG, MALAYSIA",
      eatingTip: "Best enjoyed fresh so the youtiao (dough fritters) stay crispy against the fruit juices.",
      allergens: [
        {
          name: "Peanuts",
          presence: "Detected",
          reason: "Generously topped with crushed roasted peanuts."
        },
        {
          name: "Shellfish",
          presence: "Detected",
          reason: "The dark, thick sauce is primarily made from fermented shrimp paste (hae ko)."
        }
      ],
      dietaryNotes: ["Vegan Option Available"],
      confidence: "High",
      imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800",
      estimatedPrice: "RM 5.00 - RM 8.00",
      halalStatus: "Muslim-Friendly"
    }
  ]
};

export const mockCharKwayTeow: ScanResult = {
  scanType: "dish",
  overallSummary: "A popular, smoky stir-fried noodle dish cooked over high heat.",
  globalWarnings: ["High risk for shellfish and soy allergies."],
  items: [
    {
      dishName: "Char Kway Teow",
      altNames: ["Fried Flat Noodles", "CKT"],
      description: "Renowned for 'Wok Hei' (breath of the wok). Originally a cheap, high-calorie meal for laborers like fishermen and farmers.",
      mainIngredients: ["Flat rice noodles", "Prawns", "Blood cockles"],
      cookingMethod: "Stir-fried rapidly in a wok over extremely high heat.",
      spiceLevel: "Spicy",
      culturalOrigin: "MARITIME SOUTHEAST ASIA",
      eatingTip: "Look for a vendor using charcoal fire for the most authentic smoky flavor.",
      allergens: [
        {
          name: "Shellfish",
          presence: "Detected",
          reason: "Contains whole prawns and blood cockles."
        },
        {
          name: "Soy",
          presence: "Detected",
          reason: "Cooked with both light and dark soy sauce."
        }
      ],
      dietaryNotes: ["Traditionally cooked in pork lard"],
      confidence: "High",
      imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
      estimatedPrice: "RM 7.00 - RM 12.00",
      halalStatus: "Non-Halal"
    }
  ]
};

export const mockCombinedResult: ScanResult = {
  scanType: "mixed",
  overallSummary: "We've identified 3 authentic dishes with detailed ingredient mapping.",
  globalWarnings: ["Allergy Alert: Peanuts and Shellfish detected"],
  items: [
    mockNasiKerabu.items[0],
    mockRojak.items[0],
    mockCharKwayTeow.items[0]
  ]
};
