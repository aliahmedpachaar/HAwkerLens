<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# HAwkerLens

**Discover what's in your local hawker food using AI.**
</div>

HAwkerLens is an AI-powered application built with React, Vite, and the Gemini API. It allows users to scan or upload pictures of Singapore hawker food (street food) to analyze the ingredients, potential allergens, and nutritional information.

## 🌟 Features

- **Food Image Analysis**: Upload images of your food and let the Gemini AI identify the dish and its components.
- **Allergen Detection**: Automatically highlights potential allergens (peanuts, shellfish, dairy, etc.).
- **Nutritional Insights**: Get estimated nutritional information and details about the ingredients.
- **Interactive Chat**: Ask follow-up questions about the scanned food item through the integrated chat window.

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your machine.
- A valid Gemini API Key from Google AI Studio.

### Installation & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Set your `GEMINI_API_KEY` in the `.env.local` file:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```
   *(See `.env.example` for details).*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` (or the port specified by Vite in the terminal).

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React
- **AI Integration**: `@google/genai` (Gemini API)
- **Language**: TypeScript

## 🔗 Links

- [AI Studio Live App Template](https://ai.studio/apps/6ad02d2e-5e2f-4a28-9706-a5a7d3c84d26)
