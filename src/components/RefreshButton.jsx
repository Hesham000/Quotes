import { useRef } from 'react';
import anime from 'animejs';

export function RefreshButton({ onClick, isLoading }) {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current && !isLoading) {
      // Ripple effect
      anime({
        targets: buttonRef.current,
        scale: [1, 1.05, 1],
        duration: 600,
        easing: 'easeOutQuad',
      });
    }
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative px-8 md:px-12 py-4 md:py-5
        font-bold text-lg md:text-xl tracking-wide
        text-white
        rounded-full
        transition-all duration-300
        ${isLoading 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95'
        }
        group overflow-hidden
      `}
      style={{
        background: isLoading 
          ? 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      }}
    >
      {/* Animated background shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>

      {/* Button content */}
      <span className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <svg 
              className="h-6 w-6 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <span className="text-2xl group-hover:animate-spin">💕</span>
            <span>New Quote</span>
          </>
        )}
      </span>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-50 blur transition-opacity duration-300 -z-10"></div>
    </button>
  );
}
