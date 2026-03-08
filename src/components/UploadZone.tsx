import React, { useRef, useState } from "react";
import { UploadCloud, Camera, X, Loader2 } from "lucide-react";

interface UploadZoneProps {
  onScan: (file: File) => void;
  isScanning: boolean;
}

export function UploadZone({ onScan, isScanning }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleScanClick = () => {
    if (file) {
      onScan(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8 mb-8">
      {!preview ? (
        <div
          className="border-2 border-dashed border-stone-300 rounded-2xl p-10 text-center hover:bg-stone-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[240px]"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="bg-emerald-100 text-emerald-700 p-4 rounded-full mb-4">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">
            Upload or Drag & Drop
          </h3>
          <p className="text-stone-500 text-sm mb-6 max-w-xs">
            Place your food photo or menu here to begin the AI decoding process. Supports JPG, PNG, WEBP.
          </p>
          <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-stone-800 transition-colors flex items-center gap-2">
            <Camera size={16} />
            Select Image
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-square md:aspect-video rounded-2xl overflow-hidden mb-6 bg-stone-100 border border-stone-200 shadow-inner">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              disabled={isScanning}
            >
              <X size={18} />
            </button>
          </div>
          
          <button
            onClick={handleScanClick}
            disabled={isScanning || !file}
            className="w-full max-w-md bg-emerald-600 text-white py-3.5 px-6 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isScanning ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Gemini is decoding...
              </>
            ) : (
              "Scan with Gemini"
            )}
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />
    </div>
  );
}
