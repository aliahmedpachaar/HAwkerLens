import { ScanResult, DishItem } from "../lib/types";
import { Scan, Bell, CheckCircle2, AlertTriangle, Bookmark, Share2, Camera, Flame, BookOpen, Lightbulb, Tag, ShieldCheck, ShieldAlert } from "lucide-react";

interface ResultsPageProps {
  result: ScanResult;
  onReset: () => void;
}

export function ResultsPage({ result, onReset }: ResultsPageProps) {
  const hasWarnings = result.globalWarnings && result.globalWarnings.length > 0;

  const renderSpiceLevel = (level: string) => {
    if (level === "Unknown") return null;
    let flames = 0;
    if (level === "Mild") flames = 1;
    if (level === "Medium") flames = 2;
    if (level === "Spicy") flames = 3;
    if (level === "Very Spicy") flames = 4;

    return (
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: flames }).map((_, i) => (
          <Flame key={i} size={16} className="text-[#e85d04] fill-current" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#1A1A1A]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-200">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
          <div className="w-8 h-8 bg-[#5b7a5b] rounded-full flex items-center justify-center">
            <Scan size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#1a1a1a]">HawkerLens</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors">
            <Bell size={18} />
          </button>
          <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-8">
        {/* Title Area */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f0e8] text-[#5b7a5b] text-xs font-bold tracking-wider mb-4">
            <CheckCircle2 size={14} />
            SCAN CONFIDENCE: 98%
          </div>
          <h1 className="text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">Analysis Complete</h1>
          <p className="text-xl text-stone-500">{result.overallSummary}</p>
        </div>

        {/* Alert Banner */}
        {hasWarnings && (
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d93838] flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-[#d93838] text-xl font-bold mb-1">{result.globalWarnings[0]}</h3>
                <p className="text-stone-700">Potential high-risk allergens identified in your scanned dishes. Please review the detailed profiles below before consumption.</p>
              </div>
            </div>
            <button className="bg-[#d93838] text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap hover:bg-red-700 transition-colors">
              Emergency View
            </button>
          </div>
        )}

        {/* Dish Cards Grid */}
        <div className={`grid gap-8 mb-16 ${result.items.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {result.items.map((dish, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-200 flex flex-col">
              <div className={`relative bg-stone-100 ${result.items.length === 1 ? 'h-72 md:h-[400px]' : 'h-48'}`}>
                {dish.imageUrl ? (
                  <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">No Image</div>
                )}
                <div className="absolute top-4 left-4 bg-[#5b7a5b]/90 backdrop-blur text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                  {dish.culturalOrigin}
                </div>
              </div>

              {/* Price and Halal Status Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-100">
                <div className="flex items-center gap-2 text-stone-700">
                  <Tag size={18} className="text-[#5b7a5b]" />
                  <span className="font-semibold">{dish.estimatedPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  {dish.halalStatus === 'Non-Halal' ? (
                    <ShieldAlert size={18} className="text-[#d93838]" />
                  ) : dish.halalStatus === 'Unknown' ? (
                    <ShieldAlert size={18} className="text-amber-500" />
                  ) : (
                    <ShieldCheck size={18} className="text-[#5b7a5b]" />
                  )}
                  <span className={`font-bold text-sm ${
                    dish.halalStatus === 'Non-Halal' ? 'text-[#d93838]' : 
                    dish.halalStatus === 'Unknown' ? 'text-amber-600' : 
                    'text-[#5b7a5b]'
                  }`}>
                    {dish.halalStatus}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{dish.dishName}</h3>
                {renderSpiceLevel(dish.spiceLevel)}
                
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-stone-400 tracking-wider uppercase mb-3">Allergen Profile</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Mocking the tags based on the prototype */}
                    {dish.dietaryNotes.map((note, i) => (
                      <span key={i} className="bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-full">{note}</span>
                    ))}
                    {dish.allergens.map((allergen, i) => (
                      <span key={i} className="bg-[#d93838] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {allergen.name} {allergen.reason.includes('budu') ? '(Budu)' : allergen.reason.includes('sauce') ? '(Sauce)' : allergen.reason.includes('paste') ? '(Shrimp Paste)' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8f9fa] border border-stone-100 rounded-2xl p-5 mb-6 flex-grow">
                  <h4 className="text-[#5b7a5b] font-bold text-sm mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Cultural Decoder
                  </h4>
                  <p className="text-stone-600 text-sm italic leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-stone-100">
                  <Lightbulb size={20} className="text-[#5b7a5b] shrink-0" />
                  <p className="text-stone-600 text-sm">
                    <span className="font-semibold text-stone-800">Eating Tip:</span> {dish.eatingTip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button className="bg-[#5b7a5b] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#4a6a4a] transition-colors">
            <Bookmark size={20} /> Save to History
          </button>
          <button className="bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <Share2 size={20} /> Share Analysis
          </button>
          <button className="border-2 border-stone-300 text-stone-700 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors" onClick={onReset}>
            <Camera size={20} /> Scan Another
          </button>
        </div>
      </main>
      
      <footer className="border-t border-stone-200 py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500 max-w-6xl mx-auto">
        <div>HawkerLens AI v2.4.1</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-800">Privacy Policy</a>
          <a href="#" className="hover:text-stone-800">Terms of Service</a>
          <a href="#" className="hover:text-stone-800">Medical Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}
