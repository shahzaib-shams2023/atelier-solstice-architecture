import React from 'react';
import { ArrowUp, Compass, MapPin, Globe, Sparkles } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    solsticeAudio.playSingingBowl(432);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-solstice-surface border-t border-drafting pt-24 pb-12 px-4 sm:px-8 lg:px-12 text-solstice-sumi font-sans relative">
      <div className="max-w-[1720px] mx-auto space-y-20">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-drafting">
          {/* Practice Identity */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-solstice-sumi flex items-center justify-center">
                <span className="font-editorial text-sm font-semibold text-solstice-sumi">S</span>
              </div>
              <span className="font-editorial text-2xl tracking-wider text-solstice-sumi">
                ATELIER SOLSTICE
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-solstice-sumiMuted max-w-md font-light leading-relaxed">
              Spatial ceramics and monolithic architecture. Bridging Japanese wabi-sabi tectonics and Scandinavian brutalism through permanent stone sanctuaries and daylight-harvesting vessels.
            </p>
            <div className="flex items-center space-x-4 text-xs font-mono text-solstice-sumiLight">
              <span>KYOTO 35°N</span>
              <span className="text-drafting">•</span>
              <span>COPENHAGEN 55°N</span>
              <span className="text-drafting">•</span>
              <span className="text-solstice-terracotta">WEBGL 2.0 PBR</span>
            </div>
          </div>

          {/* Kyoto Studio Hub */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2 text-[11px] font-sans tracking-gallery uppercase text-solstice-terracotta">
              <MapPin className="w-3.5 h-3.5" />
              <span>KYOTO ATELIER // 35°N</span>
            </div>
            <div className="font-editorial text-xl text-solstice-sumi">
              Kamigamo Alluvial Studio
            </div>
            <address className="font-sans text-xs text-solstice-sumiMuted not-italic leading-relaxed space-y-1">
              <p>Kita-ku, Kamigamo District</p>
              <p>Kyoto 603-8047, Japan</p>
              <p className="font-mono text-[11px] text-solstice-sumiLight pt-1">35.0592° N, 135.7533° E</p>
            </address>
          </div>

          {/* Copenhagen Studio Hub */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2 text-[11px] font-sans tracking-gallery uppercase text-solstice-moss">
              <MapPin className="w-3.5 h-3.5" />
              <span>COPENHAGEN ATELIER // 55°N</span>
            </div>
            <div className="font-editorial text-xl text-solstice-sumi">
              Holmen Naval Docks Studio
            </div>
            <address className="font-sans text-xs text-solstice-sumiMuted not-italic leading-relaxed space-y-1">
              <p>Galionsvej 41, Holmen</p>
              <p>1437 København K, Denmark</p>
              <p className="font-mono text-[11px] text-solstice-sumiLight pt-1">55.6811° N, 12.6033° E</p>
            </address>
          </div>

          {/* Back to Top Floating Trigger */}
          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="p-4 rounded-full plinth-panel hover:bg-solstice-terracotta hover:text-solstice-surface hover:border-solstice-terracotta border border-drafting text-solstice-sumi transition-all duration-300 shadow-sm"
              title="Return to Zenith"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Rights & Typography Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-solstice-sumiLight tracking-wider gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 ATELIER SOLSTICE ARCHITECTURAL MONOLITHS</span>
            <span className="hidden sm:inline">•</span>
            <span>TYPESET IN ITALIANA & CORMORANT GARAMOND</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-solstice-terracotta uppercase">
              CONFIDENTIAL MONOGRAPH ARCHIVE
            </span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
