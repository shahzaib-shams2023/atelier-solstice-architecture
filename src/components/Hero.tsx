import React from 'react';
import { MonolithCanvas, CeramicMaterial } from './MonolithCanvas';
import { ArrowDown, Sun, Sparkles } from 'lucide-react';

interface HeroProps {
  timeOfDay: number;
  material: CeramicMaterial;
  onExploreSunlight: () => void;
  onOpenCommission: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  timeOfDay,
  material,
  onExploreSunlight,
  onOpenCommission,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 bg-tactile overflow-hidden">
      {/* Decorative Warm Wabi-Sabi Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Column: Asymmetric Editorial Header */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-architectural text-solstice-terracotta uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-solstice-terracotta" />
            <span>ARCHITECTURAL MONOLITHS & SPATIAL CERAMICS</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-solstice-sumi leading-[1.05]">
            Form Born In <br />
            <span className="italic font-serif text-solstice-terracotta">Shadow,</span> <br />
            Shaped In Light.
          </h1>

          <p className="font-sans text-xs sm:text-sm text-solstice-sumi/80 max-w-md font-light leading-relaxed">
            A synthesis of Japanese wabi-sabi minimalism and Scandinavian architectural brutality. We sculpt monoliths that embrace the silent passage of natural daylight across raw stone, fired clay, and timber.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreSunlight}
              className="px-6 py-3 rounded-full bg-solstice-sumi text-solstice-surface hover:bg-solstice-terracotta font-sans text-xs tracking-architectural uppercase transition-all shadow-sm"
            >
              SIMULATE SOLAR ANGLE
            </button>

            <button
              onClick={onOpenCommission}
              className="px-6 py-3 rounded-full border border-solstice-stone plinth-panel hover:border-solstice-sumi text-solstice-sumi font-sans text-xs tracking-wider uppercase transition-all"
            >
              ATELIER COMMISSIONS
            </button>
          </div>

          {/* Architectural Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-solstice-stone font-sans text-xs">
            <div>
              <span className="text-[10px] text-solstice-sumi/60 tracking-wider uppercase block">PRIMARY MEDIUM</span>
              <span className="text-solstice-sumi font-semibold text-sm">Travertine & Clay</span>
              <span className="text-[10px] text-solstice-terracotta block">RAW MINERAL PATINA</span>
            </div>
            <div>
              <span className="text-[10px] text-solstice-sumi/60 tracking-wider uppercase block">PRACTICE BASES</span>
              <span className="text-solstice-sumi font-semibold text-sm">2 Studios</span>
              <span className="text-[10px] text-solstice-sumi/70 block">KYOTO & COPENHAGEN</span>
            </div>
            <div>
              <span className="text-[10px] text-solstice-sumi/60 tracking-wider uppercase block">SOLAR PATH</span>
              <span className="text-solstice-sumi font-semibold text-sm">360° Real-Time</span>
              <span className="text-[10px] text-solstice-moss block">WEBGL SHADOW ENGINE</span>
            </div>
          </div>
        </div>

        {/* Right 3D Monolith Canvas */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] lg:h-[650px] relative rounded-3xl overflow-hidden plinth-panel border border-solstice-stone flex items-center justify-center">
          <MonolithCanvas
            timeOfDay={timeOfDay}
            material={material}
            interactive={true}
            className="w-full h-full"
          />

          <div className="absolute top-4 left-4 plinth-panel px-3.5 py-1.5 rounded-full text-xs text-solstice-sumi flex items-center space-x-2 pointer-events-none">
            <Sun className="w-3.5 h-3.5 text-solstice-terracotta" />
            <span className="tracking-wider uppercase text-[11px]">
              SOLAR ELEVATION: {Math.floor(timeOfDay)}:{(timeOfDay % 1 * 60).toFixed(0).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 plinth-panel px-3.5 py-1.5 rounded-full text-[11px] text-solstice-sumi/70 pointer-events-none font-sans">
            DRAG TO ROTATE MONOLITH 360°
          </div>
        </div>
      </div>

      {/* Hero Bottom Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs text-solstice-sumi/70 border-t border-solstice-stone">
        <span className="tracking-architectural uppercase text-[10px]">
          WABI-SABI MATERIAL PERMANENCE • BESPOKE RESIDENCES
        </span>

        <button
          onClick={onExploreSunlight}
          className="flex items-center space-x-2 text-solstice-sumi hover:text-solstice-terracotta transition-colors tracking-wider uppercase text-xs"
        >
          <span>EXPLORE SOLAR SIMULATOR</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
