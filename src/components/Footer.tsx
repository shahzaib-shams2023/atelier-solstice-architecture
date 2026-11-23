import React from 'react';
import { Compass, ArrowUp, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-solstice-bg border-t border-solstice-stone pt-16 pb-12 px-4 sm:px-8 text-xs text-solstice-sumi/70 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-editorial text-2xl text-solstice-sumi block">
              Atelier Solstice
            </span>
            <p className="leading-relaxed">
              Architectural monoliths, wabi-sabi spaces, and hand-turned ceramic vessels honoring natural light and geological silence.
            </p>
            <div className="text-[11px] text-solstice-terracotta tracking-architectural uppercase">
              KYOTO & COPENHAGEN
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-solstice-sumi uppercase tracking-wider text-xs font-semibold">STUDIO KYOTO</h4>
            <div className="space-y-1 text-[11px]">
              <div>Kita-ku, Kamigamo</div>
              <div>Kyoto 603-8047, Japan</div>
              <div className="text-solstice-sumi/50">35°03′40″N • 135°45′18″E</div>
              <div className="text-solstice-terracotta pt-1">kyoto@atelier-solstice.com</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-solstice-sumi uppercase tracking-wider text-xs font-semibold">STUDIO COPENHAGEN</h4>
            <div className="space-y-1 text-[11px]">
              <div>Krudtløbsvej 14, Holmen</div>
              <div>1439 København K, Danmark</div>
              <div className="text-solstice-sumi/50">55°40′58″N • 12°36′22″E</div>
              <div className="text-solstice-terracotta pt-1">nordic@atelier-solstice.com</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-solstice-sumi uppercase tracking-wider text-xs font-semibold">PROVENANCE</h4>
            <p className="text-[11px] leading-relaxed">
              3D ceramic monolith geometry and solar simulation engine created under CC0 / MIT Open License.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-solstice-stone hover:border-solstice-terracotta text-solstice-sumi hover:text-solstice-terracotta transition-colors text-[11px]"
              >
                <span>RETURN TO APEX</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-solstice-stone flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <div>
            © {new Date().getFullYear()} ATELIER SOLSTICE ARCHITECTURAL S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-solstice-sumi/60">
            <span>WEBGL SOLAR SHADOW ENGINE</span>
            <span>WCAG 2.1 AA COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
