import { useState, useEffect } from 'react';
import axios from 'axios';
import { QuoteCard } from './components/QuoteCard';
import { RefreshButton } from './components/RefreshButton';
import { LoveBackground } from './components/LoveBackground';
import { getStoredQuote, storeQuote, clearStoredQuote } from './utils/quoteStorage';

const QUOTES_API_URL = '/api/quotes';

function App() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async (forceRefresh = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Always fetch a fresh random quote on page load and manual refresh
      // (skip stored quote check for fresh experience each visit)

      const response = await axios.get(QUOTES_API_URL, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = response.data;
      const randomIndex = Array.isArray(data) && data.length > 0
        ? Math.floor(Math.random() * data.length)
        : 0;

      const picked = Array.isArray(data) && data.length > 0 ? data[randomIndex] : null;

      const newQuote = picked
        ? {
            text: picked.quote ?? '',
            author: picked.author ?? 'Unknown',
          }
        : { text: 'No quote available.', author: 'Unknown' };
      
      setQuote(newQuote);
      
      // Always store the fetched quote (even though we don't retrieve it on load)
      storeQuote(newQuote);
      
      setAnimate(true);
    } catch (err) {
      let errorMessage = 'Oops! Failed to fetch a quote. ';

      if (axios.isCancel(err)) {
        errorMessage += 'Request was cancelled.';
      } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        errorMessage += 'Request timed out. Please check your internet connection.';
      } else if (err.code === 'ENOTFOUND' || err.message.includes('Network Error')) {
        errorMessage += 'Unable to reach the quotes API. Please check your internet connection or try disabling browser extensions.';
      } else if (err.response) {
        errorMessage += `Server error: ${err.response.status}`;
      } else {
        errorMessage += 'Please try again.';
      }

      setError(errorMessage);
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-love-deep-purple via-purple-900 to-black">
      {/* Background with animated background */}
      <LoveBackground />

      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Floating heart decorations */}
      <div className="pointer-events-none fixed inset-0">
        {/* Top left hearts */}
        <div className="absolute top-20 left-5 text-4xl opacity-40 animate-float">💕</div>
        <div className="absolute top-40 left-12 text-3xl opacity-30 animate-float-slow">💖</div>
        <div className="absolute top-60 left-8 text-2xl opacity-25 animate-float">💗</div>
        
        {/* Top right hearts */}
        <div className="absolute top-32 right-10 text-3xl opacity-35 animate-float-slow">💓</div>
        <div className="absolute top-52 right-5 text-4xl opacity-40 animate-float">💕</div>
        <div className="absolute top-72 right-16 text-2xl opacity-30 animate-float-slow">💖</div>
        
        {/* Bottom left hearts */}
        <div className="absolute bottom-32 left-6 text-3xl opacity-35 animate-float">💗</div>
        <div className="absolute bottom-20 left-16 text-4xl opacity-40 animate-float-slow">💓</div>
        <div className="absolute bottom-48 left-20 text-2xl opacity-25 animate-float">💕</div>
        
        {/* Bottom right hearts */}
        <div className="absolute bottom-24 right-12 text-4xl opacity-40 animate-float-slow">💖</div>
        <div className="absolute bottom-40 right-8 text-3xl opacity-35 animate-float">💗</div>
        <div className="absolute bottom-12 right-20 text-2xl opacity-30 animate-float-slow">💓</div>
        
        {/* Center side hearts */}
        <div className="absolute top-1/2 left-3 text-3xl opacity-30 animate-float-slow">💕</div>
        <div className="absolute top-1/3 right-4 text-2xl opacity-25 animate-float">💖</div>
        <div className="absolute bottom-1/3 left-10 text-2xl opacity-35 animate-float">💗</div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-5xl px-4 md:px-8 py-12">
        
        {/* Animated header with glassmorphism */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="text-5xl md:text-7xl animate-bounce-slow">💜</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
              For You Salma
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-200 font-light tracking-wide opacity-90">
            Discover words that Touch your soul
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
            <span className="text-2xl">✨</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>

        {/* Main content area */}
        {error ? (
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-lg text-purple-100 font-semibold mb-6">{error}</p>
              <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
            </div>
          </div>
        ) : isLoading ? (
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full animate-spin opacity-75"></div>
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <span className="text-2xl animate-pulse">💕</span>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-bold text-purple-100">
                  Finding the perfect words for you...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <QuoteCard 
              text={quote?.text || ''} 
              author={quote?.author || ''} 
              animate={animate}
            />
            <div className="flex flex-col items-center gap-8 mt-12">
              <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
              
              {/* Motivational text below button */}
              <p className="text-sm md:text-base text-purple-300 font-light tracking-wide">
                Every quote is a moment of inspiration
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
