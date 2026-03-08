import { mockNasiKerabu, mockRojak, mockCharKwayTeow } from "../lib/mockData";
import { ScanResult } from "../lib/types";
import { Sparkles } from "lucide-react";

interface DemoExamplesProps {
  onSelectDemo: (result: ScanResult) => void;
}

export function DemoExamples({ onSelectDemo }: DemoExamplesProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-16 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles size={18} className="text-emerald-500" />
        <h3 className="text-lg font-semibold text-stone-800">Try Demo Examples</h3>
        <Sparkles size={18} className="text-emerald-500" />
      </div>
      <p className="text-stone-500 text-sm mb-6">
        Don't have a photo? Click one of these classic dishes to see how HawkerLens works.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => onSelectDemo(mockNasiKerabu)}
          className="bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md text-stone-700 px-6 py-3 rounded-xl font-medium transition-all"
        >
          Nasi Kerabu
        </button>
        <button
          onClick={() => onSelectDemo(mockRojak)}
          className="bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md text-stone-700 px-6 py-3 rounded-xl font-medium transition-all"
        >
          Rojak Buah
        </button>
        <button
          onClick={() => onSelectDemo(mockCharKwayTeow)}
          className="bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md text-stone-700 px-6 py-3 rounded-xl font-medium transition-all"
        >
          Char Kway Teow
        </button>
      </div>
    </div>
  );
}
