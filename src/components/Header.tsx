import { UtensilsCrossed } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-12 px-6 text-center bg-emerald-900 text-emerald-50 rounded-b-[3rem] shadow-lg mb-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="bg-emerald-800 p-4 rounded-full mb-6 shadow-inner">
          <UtensilsCrossed size={40} className="text-emerald-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif">
          HawkerLens
        </h1>
        <p className="text-xl md:text-2xl font-medium text-emerald-200 mb-6">
          Decode Malaysian Street Food
        </p>
        <p className="text-emerald-100/80 max-w-xl text-sm md:text-base leading-relaxed">
          Scan hawker menus or dishes to understand what they are, what they contain, and whether they may trigger allergies.
        </p>
      </div>
    </header>
  );
}
