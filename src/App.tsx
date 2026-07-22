import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, ArrowLeft } from 'lucide-react'

// Video source URL
const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4'

// Mobile menu items
const MENU_ITEMS = ['About Us', 'Programs', 'Reviews', 'FAQ', 'Contacts']

// Desktop nav links
const DESKTOP_LINKS = ['About Us', 'Programs', 'Reviews', 'FAQ', 'Contacts']

// Logo component
const Logo: React.FC = () => (
  <div className="flex items-center gap-1">
    <div className="grid grid-cols-2 gap-0.5">
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
    </div>
    <span className="text-white font-bold text-lg sm:text-xl ml-1">TinyTrails</span>
  </div>
)

// App component
const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scaleY, setScaleY] = useState(1)
  const textRef = useRef<HTMLDivElement>(null)

  // Measure and calculate scale
  const measureText = useCallback(() => {
    if (textRef.current) {
      const textHeight = textRef.current.offsetHeight
      const calculatedScale = (window.innerHeight / textHeight) * 1.4
      setScaleY(calculatedScale)
    }
  }, [])

  // Measure on mount and resize
  useEffect(() => {
    measureText()
    const handleResize = () => measureText()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [measureText])

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Close menu
  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(to bottom, #FF8233, #FDAC55)'
      }}
    >
      {/* Background 404 text effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.8,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              ref={textRef}
              className="text-white font-black leading-none tracking-tighter whitespace-nowrap"
              style={{
                fontSize: 'clamp(200px, 48vw, 800px)',
                transform: `scale(1.15, ${scaleY * 1.4})`,
                transformOrigin: 'center center',
              }}
            >
              404
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scaleY(${scaleY})`,
                transformOrigin: 'center center',
              }}
            >
              <div
                className="bg-white rounded-full"
                style={{
                  height: '50vh',
                  width: 'clamp(120px, 20vw, 400px)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {DESKTOP_LINKS.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-[#F16524] hover:opacity-90 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Menu button */}
        <button
          onClick={toggleMenu}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white bg-[#F16524] hover:opacity-90 transition-colors flex items-center gap-1"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Menu</span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-100 transition-opacity duration-500"
          ></div>

          {/* Panel */}
          <div
            className="absolute top-0 right-0 h-full w-full sm:w-[380px] bg-gradient-to-br from-[#FF6B1A] to-[#FF9642] translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4">
              <Logo />
              <button
                onClick={closeMenu}
                className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu items */}
            <div className="px-6 py-4 flex flex-col gap-2">
              {MENU_ITEMS.map((item, i) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={closeMenu}
                  className="px-6 py-4 text-lg font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.3s ease ${150 + i * 60}ms forwards`,
                    opacity: 0,
                    transform: 'translateY(4px)',
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <a
                href="/"
                onClick={closeMenu}
                className="w-full py-4 rounded-full bg-white font-semibold text-base text-[#F16524] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                style={{
                  animation: 'fadeIn 0.3s ease 450ms forwards',
                  opacity: 0,
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Center video */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ marginTop: 'calc(-6vh - 40px)' }}
      >
        <div className="w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh]">
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain pointer-events-none mix-blend-darken"
          />
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-30 mt-auto pb-8 sm:pb-16 flex flex-col items-center text-center px-4">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4">
          Oops, something went wrong!
        </h1>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base bg-[#F16524] hover:scale-105 hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Home
        </a>
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default App
