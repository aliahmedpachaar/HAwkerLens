import React, { useRef, useState } from "react";
import { Camera, UploadCloud, ArrowRight, AlertTriangle, CheckCircle2, Share2, Globe, Scan } from "lucide-react";
import { mockCombinedResult } from "../lib/mockData";
import { ScanResult } from "../lib/types";

interface LandingPageProps {
  onScan: (file: File) => void;
  onDemo: (result: ScanResult) => void;
  isScanning: boolean;
}

export function LandingPage({ onScan, onDemo, isScanning }: LandingPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onScan(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      onScan(droppedFile);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#1A1A1A]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5b7a5b] rounded-full flex items-center justify-center">
            <Scan size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold">HawkerLens</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
          <a href="#" className="hover:text-black transition-colors">How it Works</a>
          <a href="#" className="hover:text-black transition-colors">Food Database</a>
          <a href="#" className="hover:text-black transition-colors">Safety</a>
          <a href="#" className="hover:text-black transition-colors">Pricing</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-12 px-8 max-w-7xl mx-auto">
        <div className="md:w-1/2 pr-8 mb-12 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 text-stone-600 text-[10px] font-bold tracking-widest mb-6 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5b7a5b]"></div>
            AI-Powered Culinary Vision
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-[#1a1a1a] leading-[1.1] mb-6 tracking-tight">
            Decode <br/>
            <span className="text-[#5b7a5b]">Malaysian</span> Street <br/>
            Food
          </h1>
          <p className="text-lg text-stone-500 mb-8 max-w-md leading-relaxed">
            The ultimate AI companion for your food journey. Identify complex ingredients, discover authentic origins, and navigate allergens with precision.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#5b7a5b] text-white px-6 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-[#4a6a4a] transition-colors"
            >
              <Camera size={20} />
              Start Scanning
            </button>
            <button className="border border-stone-300 text-stone-700 px-6 py-3.5 rounded-full font-semibold hover:bg-stone-50 transition-colors">
              Watch Tutorial
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative w-full">
          <img 
            src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1000" 
            alt="Assam Laksa" 
            className="rounded-[2.5rem] shadow-2xl object-cover h-[500px] md:h-[600px] w-full" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-[#5b7a5b] rounded-xl relative">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-bold tracking-wider text-stone-800 shadow-lg whitespace-nowrap">
                DETECTING: ASSAM LAKSA (98.4%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analyze Section */}
      <div className="py-24 bg-stone-50/50">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-3">Analyze Your Plate</h2>
          <p className="text-stone-500">Our neural networks are trained on thousands of authentic Malaysian dishes.</p>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className="border-2 border-dashed border-stone-300 rounded-[2.5rem] p-12 text-center bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="bg-[#5b7a5b] text-white p-4 rounded-full mb-6">
              <UploadCloud size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Upload or Drag & Drop</h3>
            <p className="text-stone-500 text-sm mb-8 max-w-xs">
              Place your food photo here to begin the AI decoding process. Supports JPG, PNG up to 10MB.
            </p>
            <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
              {isScanning ? "Scanning..." : "Select Image"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Allergy Profile Section */}
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-4">
            Your Personal <span className="text-[#d93838]">Allergy Profile</span>
          </h2>
          <p className="text-stone-500 mb-8 max-w-md leading-relaxed">
            Safety is our priority. Set your dietary restrictions once, and HawkerLens will alert you instantly if any scanned dish contains potential risks.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#d93838] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">🥜</span> Peanuts
            </span>
            <span className="bg-[#e8f0e8] text-[#5b7a5b] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">🦐</span> Shellfish
            </span>
            <span className="bg-[#e8f0e8] text-[#5b7a5b] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">🥚</span> Eggs
            </span>
            <span className="bg-[#e8f0e8] text-[#5b7a5b] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">🥛</span> Dairy
            </span>
            <span className="bg-[#e8f0e8] text-[#5b7a5b] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">🌾</span> Gluten
            </span>
            <span className="bg-[#e8f0e8] text-[#5b7a5b] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">+</span> Other
            </span>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 space-y-4 shadow-xl">
            <div className="bg-[#2a2a2a] rounded-2xl p-5 flex items-start gap-4 border border-stone-800">
              <AlertTriangle className="text-[#d93838] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-bold mb-1">Alert: Satay detected</h4>
                <p className="text-stone-400 text-sm">Contains <span className="text-[#d93838]">Peanuts</span> in the sauce. Severe risk for your profile.</p>
              </div>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl p-5 flex items-start gap-4 border border-stone-800">
              <CheckCircle2 className="text-[#5b7a5b] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-white font-bold mb-1">Safe: Nasi Lemak</h4>
                <p className="text-stone-400 text-sm">No shellfish or dairy ingredients detected in this variant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-24 px-8 max-w-7xl mx-auto bg-stone-50/50 rounded-[3rem] mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-2">Try the Demo</h2>
            <p className="text-stone-500">Click a dish to see the AI analysis in action.</p>
          </div>
          <button 
            onClick={() => onDemo(mockCombinedResult)}
            className="text-[#5b7a5b] font-semibold flex items-center gap-2 hover:underline"
          >
            Explore Full Database <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo Card 1 */}
          <div 
            onClick={() => onDemo(mockCombinedResult)}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-200 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800" alt="Nasi Kerabu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-[#5b7a5b]/90 backdrop-blur text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded uppercase mb-2 inline-block">
                  Premium Analysis
                </div>
                <h3 className="text-2xl font-bold text-white">Nasi Kerabu</h3>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center bg-white">
              <div className="flex gap-2">
                <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-full">Blue Pea Flower</span>
                <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-full">Herbs</span>
              </div>
              <span className="text-stone-400 text-xs font-semibold">View Details</span>
            </div>
          </div>

          {/* Demo Card 2 */}
          <div 
            onClick={() => onDemo(mockCombinedResult)}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-200 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800" alt="Rojak" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-[#d93838]/90 backdrop-blur text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded uppercase mb-2 inline-block">
                  Complex Mix
                </div>
                <h3 className="text-2xl font-bold text-white">Rojak</h3>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center bg-white">
              <div className="flex gap-2">
                <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-full">Shrimp Paste</span>
                <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-full">Crushed Peanuts</span>
              </div>
              <span className="text-stone-400 text-xs font-semibold">View Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#5b7a5b] rounded-full flex items-center justify-center">
                <Scan size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold">HawkerLens</span>
            </div>
            <p className="text-stone-400 max-w-sm mb-8 text-sm leading-relaxed">
              Preserving Malaysian food heritage through advanced AI vision. Built for foodies, travelers, and the allergy-conscious.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <Globe size={18} />
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Food Database</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API for Businesses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-center text-stone-500 text-xs">
          © 2024 HawkerLens AI. All rights reserved. Made for Malaysian culinary lovers.
        </div>
      </footer>
    </div>
  );
}
