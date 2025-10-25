import { Music2 } from 'lucide-react';
import Image from 'next/image';

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: '2-digit',
  year: 'numeric'
});

const socialLinks = [
  {
    url: 'https://linkedin.com/in/6foot4',
    label: 'LinkedIn',
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    url: 'https://github.com/abhisheknairofficial',
    label: 'GitHub',
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  }
];

const Header = () => {
  return (
    <header className="border-b-4 border-black">
      <div className="bg-black text-white py-0">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between py-0">
            {/* Left: Seattle */}
            <div className="flex items-center">
              <span className="text-xs whitespace-nowrap">📍 Bellevue, WA</span>
            </div>
            
            {/* Center: Currently listening */}
            <div className="flex items-center gap-2 overflow-hidden flex-1 mx-4">
              <Music2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
              <div className="overflow-hidden min-w-0 flex-1">
                <div className="animate-scroll whitespace-nowrap inline-block">
                  <span className="text-xs">Currently listening to: <span className="text-emerald-400">Blinding Lights - The Weeknd</span></span>
                  <span className="text-xs ml-8">Currently listening to: <span className="text-emerald-400">Blinding Lights - The Weeknd</span></span>
                </div>
              </div>
            </div>
            
            {/* Right: Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors" 
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs whitespace-nowrap">📍 Seattle, WA</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors" 
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-1 pb-1">
              <div className="flex items-center gap-2 overflow-hidden">
                <Music2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <div className="overflow-hidden min-w-0">
                  <div className="animate-scroll whitespace-nowrap inline-block">
                    <span className="text-xs">Currently listening to: <span className="text-emerald-400">Blinding Lights - The Weeknd</span></span>
                    <span className="text-xs ml-8">Currently listening to: <span className="text-emerald-400">Blinding Lights - The Weeknd</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 15s linear infinite;
            }
          `}</style>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-2 break-words">Abhishek Panthalingal</h1>
            <p className="text-sm uppercase tracking-widest border-t border-black pt-2 inline-block">{currentDate}</p>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-black flex-shrink-0">
            <Image src={"/images/profile-picture.jpg"} alt="Profile" className="w-full h-full object-cover" width={120} height={120} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;