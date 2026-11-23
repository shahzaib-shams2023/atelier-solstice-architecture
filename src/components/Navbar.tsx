import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Sun, Compass } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface NavbarProps {
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommission }) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const active = solsticeAudio.toggleAudio();
    setIsAudioActive(active);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-5 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <span className="font-editorial text-xl sm:text-2xl tracking-wider text-solstice-sumi font-normal">
            Atelier Solstice
          </span>
          <span className="hidden sm:inline-block font-sans text-[10px] tracking-architectural text-solstice-sumi/60 uppercase border-l border-solstice-stone pl-3">
            Kyoto • Copenhagen
          </span>
        </div>

        {/* Center Pill: Coordinates */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-solstice-sumi/70 plinth-panel px-5 py-2 rounded-full">
          <span>KYOTO: 35°00′42″N</span>
          <span className="w-1 h-1 rounded-full bg-solstice-terracotta" />
          <span>COPENHAGEN: 55°40′34″N</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAudioToggle}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-sans transition-all border ${
              isAudioActive
                ? 'bg-solstice-terracotta/15 border-solstice-terracotta text-solstice-terracotta'
                : 'plinth-panel text-solstice-sumi/70 hover:text-solstice-sumi border-solstice-stone'
            }`}
            title="Toggle singing bowl acoustic resonance"
            aria-label="Toggle Solstice Audio"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-solstice-terracotta animate-pulse" />
                <span className="hidden sm:inline">RESONANCE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ACOUSTICS</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCommission}
            className="px-4 sm:px-5 py-2 rounded-full bg-solstice-sumi text-solstice-surface font-sans text-xs tracking-wider uppercase hover:bg-solstice-terracotta transition-all shadow-sm"
          >
            INQUIRE
          </button>
        </div>
      </nav>
    </header>
  );
};
