import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export function QuoteCard({ text, author, animate = false }) {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (!cardRef.current || !text) return;

    anime.set(cardRef.current, {
      opacity: 0,
      translateY: 30,
      scale: 0.9,
    });

    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.9, 1],
      duration: 800,
      easing: 'easeOutExpo',
    });

    // Text shimmer effect
    if (textRef.current) {
      anime({
        targets: textRef.current,
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true,
      });
    }
  }, [text]);

  return (
    <div
      ref={cardRef}
      className="max-w-3xl mx-auto mb-8 group"
    >
      {/* Glassmorphism card with glow effect */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-purple-500/10 border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl hover:shadow-2xl hover:border-white/40 transition-all duration-500">
        
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-300/0 to-pink-300/0 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Opening quote mark */}
          <div className="text-6xl md:text-8xl text-purple-300/40 font-serif leading-none mb-2">
            "
          </div>

          {/* Quote text with gradient */}
          <p 
            ref={textRef}
            className="text-2xl md:text-4xl font-bold leading-relaxed mb-8 text-white"
            style={{
              backgroundImage: 'linear-gradient(90deg, #e9d5ff, #fce7f3, #ddd6fe, #e9d5ff)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {text}
          </p>

          {/* Closing quote mark */}
          <div className="text-6xl md:text-8xl text-purple-300/40 font-serif leading-none text-right mb-8">
            "
          </div>

          {/* Author with enhanced styling */}
          <div className="flex items-center justify-end gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-400"></div>
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-white/20 rounded-full backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-500/50 hover:to-pink-500/50 transition-all duration-300">
              <span className="text-lg">💜</span>
              <p className="text-lg md:text-xl font-semibold text-white tracking-wide">
                {author ? author : 'Unknown'}
              </p>
            </div>
          </div>
        </div>

        {/* Floating particles animation */}
        <div className="absolute -top-2 -right-2 text-3xl opacity-60 animate-float">✨</div>
        <div className="absolute -bottom-2 -left-2 text-3xl opacity-60 animate-float-slow">💕</div>
      </div>
    </div>
  );
}
