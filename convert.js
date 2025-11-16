import { encode } from '@toon-format/toon'

const data = {
  "project_name": "daily-toon-quote-app",
  "description": "A small web application built with React, Vite, and Tailwind CSS that displays a new inspirational quote every day using an external quotes API. The UI should have a fun toon/cartoon-style theme with bright colors, hand-drawn elements, and playful animations.",
  "requirements": {
    "tech_stack": ["React", "Vite", "Tailwind CSS", "Fetch API"],
    "features": [
      "Fetch a new quote every day using a free public API",
      "Toon-style UI theme with rounded shapes, borders, and cartoon colors",
      "Animated quote card (bounce, slide, or fade animation)",
      "Refresh Quote button with playful hover effects",
      "Lightweight, mobile-friendly layout",
      "Store today's quote in localStorage so it doesn't change until the next day"
    ],
    "api": {
      "name": "Quotes API",
      "endpoint": "https://api.quotable.io/random",
      "response_example": {
        "content": "Example quote",
        "author": "Author Name"
      }
    },
    "design_style": {
      "theme": "cartoon / toon",
      "colors": "bright pastel palette",
      "shapes": "rounded, hand-drawn borders, soft shadows",
      "fonts": "playful comic or rounded font"
    },
    "components": [
      {
        "name": "QuoteCard",
        "props": ["text", "author"],
        "behavior": "shows text in toon bubble box with subtle animation"
      },
      {
        "name": "RefreshButton",
        "behavior": "fetches a new quote and triggers animation"
      }
    ]
  },
  "instructions_for_generator": "Generate production-ready code using React + Vite setup. Use Tailwind for all styling. Add small, simple animations (using Tailwind classes or basic CSS). Keep code clean and modular."
}

console.log(encode(data))