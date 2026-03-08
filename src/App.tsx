import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ResultsPage } from "./components/ResultsPage";
import { ChatWindow } from "./components/ChatWindow";
import { ScanResult } from "./lib/types";
import { analyzeFoodImage } from "./lib/gemini";
import { AlertCircle } from "lucide-react";

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleScan = async (file: File) => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);

    try {
      const base64Image = await fileToBase64(file);
      const result = await analyzeFoodImage(base64Image, file.type);
      
      // Attach the uploaded image to the results so it displays in the UI
      const objectUrl = URL.createObjectURL(file);
      if (result.items && result.items.length > 0) {
        result.items = result.items.map(item => ({
          ...item,
          imageUrl: objectUrl
        }));
      }
      
      setScanResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the image. Please try again or use a different photo.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleDemoSelect = (result: ScanResult) => {
    setScanResult(result);
    setError(null);
  };

  const handleReset = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl shadow-lg flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <p>{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-800">×</button>
        </div>
      )}
      
      {scanResult ? (
        <ResultsPage result={scanResult} onReset={handleReset} />
      ) : (
        <LandingPage onScan={handleScan} onDemo={handleDemoSelect} isScanning={isScanning} />
      )}

      <ChatWindow onResult={handleDemoSelect} />
    </>
  );
}
