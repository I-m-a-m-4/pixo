# Pixo

Pixo is a high-performance, open-source creative design studio built with Next.js, Fabric.js, and Genkit. It provides a polished, Canva-like experience with a focus on modern aesthetics, cinematic lighting, and AI-driven design strategy.

## ✨ Features

- **Professional Canvas**: Built on Fabric.js for smooth, multi-layered design editing.
- **Design Genres**: Choose from curated aesthetic styles like *Cinematic Vortex*, *Glass Pulse*, *Tech Minimal*, and *Neon Vibe*.
- **AI Integration**: Leverages Google GenAI and Genkit for magic media and design assistance.
- **Real-time Infrastructure**: Powered by Firebase for authentication, database, and storage.
- **Modern UI**: Polished interface built with Radix UI, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- A Firebase Project
- A Google AI (Gemini) API Key

### 2. Installation
```bash
git clone https://github.com/I-m-a-m-4/pixo.git
cd pixo
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```
Fill in your Firebase credentials and AI API keys in `.env.local`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:9001](http://localhost:9001) to see the studio.

## 🛠️ Tech Stack
- **Framework**: Next.js 15
- **Canvas Engine**: Fabric.js
- **Styling**: Tailwind CSS
- **Components**: Radix UI / Lucide React
- **Animations**: Framer Motion
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Google Genkit

## 📄 License
This project is open-source. See the LICENSE file for details.
