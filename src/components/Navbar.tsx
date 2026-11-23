import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Sun, Compass } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface NavbarProps {
  timeOfDay: number;
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ timeOfDay, onOpenCommission }) => {
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [kyotoTime, setKyotoTime] = useState<string>('');
  const [copenhagenTime, setCopenhagenTime] = useState<string>('');

  useEffect(() => {
    const updateStudioTimes = () => {
      const now = new Date();
      // Kyoto is UTC+9
      const kyoto = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setKyotoTime(kyoto);

      // Copenhagen is UTC+1 (or UTC+2 in summer)
      const cph = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Copenhagen',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setCopenhagenTime(cph);
    };

    updateStudioTimes();
    const interval = setInterval(updateStudioTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const status = solsticeAudio.toggleAudio();
    setAudioActive(status);
  };

  const scrollToSection = (id: string) => {
    solsticeAudio.playTactileTouch();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate solar elevation angle in degrees (approx 0° at dawn/dusk to ~66° at noon)
  const dayProgress = Math.min(1, Math.max(0, (timeOfDay - 6.0) / 14.0));
  const solarElevationDeg = Math.round(Math.sin(dayProgress * Math.PI) * 66);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 plinth-panel border-b border-drafting transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Studio Monogram */}
        <div className="flex items-center space-x-6">
          <a
            href="#main-content"
            data-cursor="ATELIER"
            className="flex items-center space-x-3 group"
          >
            <div className="w-8 h-8 rounded-full border border-solstice-sumi/40 flex items-center justify-center group-hover:border-solstice-terracotta transition-colors">
              <span className="font-editorial text-sm font-semibold text-solstice-sumi group-hover:text-solstice-terracotta transition-colors">
                S
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg tracking-wider text-solstice-sumi leading-none">
                ATELIER SOLSTICE
              </span>
              <span className="font-sans text-[9px] tracking-architectural text-solstice-sumiLight uppercase pt-0.5">
                KYOTO & COPENHAGEN
              </span>
            </div>
          </a>

          {/* Live Studio Clocks (Desktop only) */}
          <div className="hidden xl:flex items-center space-x-5 pl-6 border-l border-drafting font-sans text-[10px] tracking-wider text-solstice-sumiLight">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-solstice-moss animate-pulse" />
              <span className="uppercase text-solstice-sumi font-medium">KYOTO 35°N:</span>
              <span className="font-mono text-solstice-sumi/90">{kyotoTime || '14:20:00'} JST</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-solstice-terracotta" />
              <span className="uppercase text-solstice-sumi font-medium">CPH 55°N:</span>
              <span className="font-mono text-solstice-sumi/90">{copenhagenTime || '07:20:00'} CET</span>
            </div>
          </div>
        </div>

        {/* Center Architectural Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-sans text-[11px] tracking-architectural uppercase text-solstice-sumi">
          <button
            onClick={() => scrollToSection('heliodon-section')}
            data-cursor="OBSERVE"
            className="hover:text-solstice-terracotta transition-colors"
          >
            [01 // HELIODON]
          </button>
          <button
            onClick={() => scrollToSection('tectonics-section')}
            data-cursor="EXAMINE"
            className="hover:text-solstice-terracotta transition-colors"
          >
            [02 // TECTONICS]
          </button>
          <button
            onClick={() => scrollToSection('monographs-section')}
            data-cursor="DISCOVER"
            className="hover:text-solstice-terracotta transition-colors"
          >
            [03 // MONOGRAPHS]
          </button>
          <button
            onClick={() => scrollToSection('manifesto-section')}
            data-cursor="READ"
            className="hover:text-solstice-terracotta transition-colors"
          >
            [04 // MANIFESTO]
          </button>
        </nav>

        {/* Right Controls: Solar Telemetry, Audio Synthesizer, Commission CTA */}
        <div className="flex items-center space-x-4">
          {/* Live Solar Elevation Pill */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-solstice-panel/60 border border-drafting text-[10px] font-sans tracking-wider text-solstice-sumi">
            <Sun className="w-3 h-3 text-solstice-terracotta" />
            <span className="font-mono font-medium">
              {Math.floor(timeOfDay)}:{(Math.round((timeOfDay % 1) * 60)).toString().padStart(2, '0')}
            </span>
            <span className="text-solstice-sumiLight font-normal">({solarElevationDeg}° ALT)</span>
          </div>

          {/* Web Audio Ambience Toggle */}
          <button
            onClick={handleToggleAudio}
            data-cursor={audioActive ? 'MUTE SOUND' : 'ENABLE SOUND'}
            title={audioActive ? 'Disable Soundscape' : 'Enable Meditative Soundscape'}
            className={`p-2 rounded-full border transition-all ${
              audioActive
                ? 'bg-solstice-terracotta text-solstice-surface border-solstice-terracotta shadow-sm'
                : 'bg-solstice-panel/40 border-drafting text-solstice-sumi hover:border-solstice-terracotta'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-solstice-sumiLight" />}
          </button>

          {/* Bespoke Atelier Commission Button */}
          <button
            onClick={() => {
              solsticeAudio.playTactileTouch();
              onOpenCommission();
            }}
            data-cursor="COMMISSION"
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-solstice-sumi hover:bg-solstice-terracotta text-solstice-surface font-sans text-[10px] sm:text-[11px] tracking-architectural uppercase transition-all shadow-sm hover:shadow-plinth active:scale-95 whitespace-nowrap"
          >
            <span className="hidden sm:inline">COMMISSION</span>
            <span className="sm:hidden">INQUIRE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
