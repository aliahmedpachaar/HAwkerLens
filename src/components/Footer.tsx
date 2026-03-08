export function Footer() {
  return (
    <footer className="w-full py-8 text-center border-t border-stone-200 mt-auto">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-stone-500 text-sm mb-2">
          Built with Gemini for Malaysian food discovery and allergy awareness.
        </p>
        <p className="text-stone-400 text-xs max-w-xl mx-auto leading-relaxed">
          <strong>Disclaimer:</strong> AI interpretations may be incomplete or inaccurate. 
          For severe allergies, always confirm ingredients directly with the food vendor. 
          This tool is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
