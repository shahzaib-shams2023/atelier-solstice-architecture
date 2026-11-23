import React from 'react';
import { MonolithCanvas, CeramicMaterial } from './MonolithCanvas';
import { ArrowDownRight, Compass, SunMedium, Sparkles } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

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
    <section className="relative min-h-screen w-full pt-28 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden bg-grain">
      {/* Decorative Architectural Grid Hairlines */}
      <div className="absolute inset-0 pointer-events-none max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="w-full h-full border-l border-r border-drafting/40 flex justify-between">
          <div className="hidden lg:block w-px h-full bg-drafting/30 ml-[45%]" />
        </div>
      </div>

      {/* Main Hero Viewport Split */}
      <div className="relative z-10 max-w-[1720px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
        {/* Left Column: Monumental Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left py-6">
          {/* Eyebrow Annotation */}
          <div className="inline-flex items-center space-x-2.5 text-[9px] sm:text-[11px] font-sans tracking-architectural sm:tracking-gallery text-solstice-terracotta uppercase">
            <span className="w-2 h-2 rounded-full bg-solstice-terracotta animate-solar-glow flex-shrink-0" />
            <span className="truncate">ARCHITECTURAL MONOLITHS & TACTILE CERAMICS</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-editorial text-5xl sm:text-7xl xl:text-8xl font-normal text-solstice-sumi leading-[0.92] tracking-tighter">
            Form Born In <br />
            <span className="italic font-serif font-light text-solstice-terracotta">
              Shadow,
            </span> <br />
            Shaped In Light.
          </h1>

          {/* Philosophical Narrative */}
          <p className="font-sans text-sm sm:text-base text-solstice-sumiMuted max-w-lg font-light leading-relaxed">
            A transatlantic practice fusing Japanese wabi-sabi tectonics and Scandinavian brutalism. We sculpt permanent sanctuaries and tactile ceramic vessels designed to embrace the silent passage of natural daylight across raw stone, fired clay, and timber.
          </p>

          {/* Interactive CTA Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                solsticeAudio.playTactileTouch();
                onExploreSunlight();
              }}
              data-cursor="OBSERVE"
              className="px-8 py-3.5 rounded-full bg-solstice-sumi hover:bg-solstice-terracotta text-solstice-surface font-sans text-xs tracking-architectural uppercase transition-all duration-300 shadow-sm hover:shadow-plinth flex items-center space-x-2 group"
            >
              <span>SIMULATE SOLAR HELIODON</span>
              <ArrowDownRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                solsticeAudio.playTactileTouch();
                onOpenCommission();
              }}
              data-cursor="COMMISSION"
              className="px-7 py-3.5 rounded-full plinth-panel hover:bg-solstice-surface border border-drafting text-solstice-sumi font-sans text-xs tracking-architectural uppercase transition-all duration-300 hover:border-solstice-sumi"
            >
              ATELIER COMMISSION
            </button>
          </div>

          {/* Architectural Telemetry Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-drafting font-sans text-xs">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                01 // MEDIUM
              </span>
              <span className="text-solstice-sumi font-medium text-xs sm:text-sm block">
                Travertine & Clay
              </span>
              <span className="text-[9px] sm:text-[10px] text-solstice-terracotta tracking-wider uppercase block">
                1260°C WOOD KILN
              </span>
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                02 // PRACTICE
              </span>
              <span className="text-solstice-sumi font-medium text-xs sm:text-sm block">
                Kyoto & Copenhagen
              </span>
              <span className="text-[9px] sm:text-[10px] text-solstice-sumiLight tracking-wider uppercase block">
                35°N & 55°N HUBS
              </span>
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                03 // SOLAR SHADOW
              </span>
              <span className="text-solstice-sumi font-medium text-xs sm:text-sm block">
                360° Heliodon
              </span>
              <span className="text-[9px] sm:text-[10px] text-solstice-moss tracking-wider uppercase block">
                REAL-TIME WEBGL
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Towering Monolithic 3D Scene */}
        <div className="lg:col-span-7 h-[540px] sm:h-[640px] xl:h-[720px] relative rounded-3xl overflow-hidden plinth-panel border border-drafting/90 shadow-plinth-lg flex items-center justify-center">
          <MonolithCanvas
            timeOfDay={timeOfDay}
            material={material}
            interactive={true}
            className="w-full h-full"
          />

          {/* Live Viewport Floating HUD Badges */}
          <div className="absolute top-6 left-6 plinth-panel px-4 py-2 rounded-full text-xs text-solstice-sumi flex items-center space-x-2.5 pointer-events-none shadow-sm">
            <SunMedium className="w-4 h-4 text-solstice-terracotta" />
            <span className="font-sans tracking-wider uppercase text-[11px] font-medium">
              SOLAR ELEVATION: {Math.floor(timeOfDay)}:{(Math.round((timeOfDay % 1) * 60)).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 plinth-panel px-4 py-2 rounded-full text-[11px] text-solstice-sumiMuted pointer-events-none font-sans tracking-wider uppercase shadow-sm">
            DRAG TO ROTATE SCULPTURE 360°
          </div>

          <div className="absolute bottom-6 left-6 plinth-panel px-4 py-2 rounded-full text-[11px] text-solstice-sumi/70 pointer-events-none font-sans tracking-wider uppercase hidden sm:block">
            MATERIAL: {material.replace('-', ' ').toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hero Bottom Strip / Coordinates */}
      <div className="relative z-10 max-w-[1720px] mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-solstice-sumiLight border-t border-drafting gap-4">
        <div className="flex items-center space-x-4">
          <span className="font-sans tracking-gallery uppercase text-[10px]">
            WABI-SABI MINERAL PERMANENCE // BESPOKE RESIDENCES
          </span>
        </div>
        <div className="flex items-center space-x-6 font-mono text-[11px]">
          <span>35.0116° N, 135.7681° E</span>
          <span className="text-drafting">•</span>
          <span>55.6761° N, 12.5683° E</span>
        </div>
      </div>
    </section>
  );
};
