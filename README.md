# Daily Toon Quote App

A fun, cartoon-themed web application that displays a new inspirational quote every day using the Motivational Spark Quotes API. Built with React, Vite, Axios, and Tailwind CSS.

## Features

- 🎨 **Toon-style UI** - Bright pastel colors, rounded shapes, and hand-drawn borders
- 📅 **Daily Quotes** - Automatically fetches a new quote each day
- 💾 **Local Storage** - Stores today's quote so it doesn't change until the next day
- ✨ **Animations** - Smooth slide-in animations for quote cards
- 🎯 **Refresh Button** - Playful hover effects and manual quote refresh
- 📱 **Mobile-Friendly** - Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── QuoteCard.jsx      # Quote display component with toon styling
│   │   └── RefreshButton.jsx  # Refresh button with hover effects
│   ├── utils/
│   │   └── quoteStorage.js    # localStorage management utilities
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Tailwind CSS styles
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Project dependencies
```

## API

This app uses the [Motivational Spark Quotes API](https://motivational-spark-api.vercel.app/api/quotes) to fetch high-quality inspirational quotes.

The Vite dev server proxies requests from:

- `/api/quotes` → `https://motivational-spark-api.vercel.app/api/quotes`

No API key is required.

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - For API requests
- **Three.js** - 3D floating hearts background (`LoveBackground` component)
- **Anime.js** - Love-themed quote card entrance animations

## Design Features

- Comic Neue font for a playful, romantic feel
- Love-focused color palette (pinks, reds, soft pastels)
- 3D floating hearts background rendered with Three.js
- Anime.js-powered quote card entrance / pulse animations
- Hand-drawn border effects with soft shadows
- Speech bubble-style quote cards

