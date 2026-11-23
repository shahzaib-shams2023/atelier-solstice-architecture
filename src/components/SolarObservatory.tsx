import React from 'react';
import { Sun, Moon, Compass, Clock, Thermometer, ShieldCheck } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface SolarObservatoryProps {
  timeOfDay: number;
  onTimeChange: (time: number) => void;
  material: string;
}

export const SolarObservatory: React.FC<SolarObservatoryProps> = ({
  timeOfDay,
  onTimeChange,
  material,
}) => {
  // Astronomical calculations based on time of day (6.0h to 20.0h)
  const dayProgress = Math.min(1, Math.max(0, (timeOfDay - 6.0) / 14.0));
  const solarElevationDeg = Math.round(Math.sin(dayProgress * Math.PI) * 66);
  const solarAzimuthDeg = Math.round(90 + dayProgress * 180); // 90° East to 270° West

  // Shadow length ratio: cot(elevation)
  const radElevation = Math.max(0.1, (solarElevationDeg * Math.PI) / 180);
  const shadowRatio = (1 / Math.tan(radElevation)).toFixed(1);

  // Approximate Kelvin temperature
  let kelvin = 5600;
  if (timeOfDay < 8.5) {
    kelvin = Math.round(2200 + ((timeOfDay - 6.0) / 2.5) * 2800);
  } else if (timeOfDay <= 16.5) {
    kelvin = 5800;
  } else if (timeOfDay <= 19.5) {
    kelvin = Math.round(5800 - ((timeOfDay - 16.5) / 3.0) * 3400);
  } else {
    kelvin = 2100;
  }

  const PRESETS = [
    { label: 'DAWN // AKATSUKI', time: 7.0, desc: 'Low amber light with extreme raking shadows' },
    { label: 'ZENITH // MAHIRU', time: 12.5, desc: 'Overhead clarity with razor contact shadows' },
    { label: 'GOLDEN HOUR // TASOGARE', time: 17.5, desc: 'Warm terracotta copper radiance' },
    { label: 'TWILIGHT // YOI', time: 19.75, desc: 'Cool indigo twilight and quiet meditation' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onTimeChange(val);
  };

  const handlePresetClick = (time: number) => {
    solsticeAudio.playSingingBowl(216);
    onTimeChange(time);
  };

  return (
    <section
      id="heliodon-section"
      className="py-32 px-4 sm:px-8 lg:px-12 bg-solstice-surface/90 border-t border-b border-drafting relative overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-drafting">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-gallery text-solstice-terracotta uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>ASTRONOMICAL HELIODON // SOLAR PATH OBSERVATORY</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-solstice-sumi leading-[1.0]">
              The Architecture of <br />
              <span className="italic font-serif text-solstice-terracotta">Living Light</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-solstice-sumiMuted font-light leading-relaxed">
            Light is not static illumination; it is the living sculptor of architectural volume. Through our real-time heliodon engine, observe how morning raking rays and evening amber light activate the tactile mineral pores of our monolithic designs.
          </p>
        </div>

        {/* Precision Solar Telemetry HUD Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="plinth-panel p-6 rounded-2xl border border-drafting flex flex-col justify-between space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-solstice-sumiLight text-xs">
              <span className="tracking-gallery uppercase text-[10px]">SOLAR ELEVATION</span>
              <Sun className="w-4 h-4 text-solstice-terracotta" />
            </div>
            <div>
              <div className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">{solarElevationDeg}°</div>
              <div className="font-sans text-[11px] text-solstice-sumiLight tracking-wider uppercase pt-1">
                ALTITUDE ANGLE
              </div>
            </div>
          </div>

          <div className="plinth-panel p-6 rounded-2xl border border-drafting flex flex-col justify-between space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-solstice-sumiLight text-xs">
              <span className="tracking-gallery uppercase text-[10px]">SOLAR AZIMUTH</span>
              <Compass className="w-4 h-4 text-solstice-moss" />
            </div>
            <div>
              <div className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">{solarAzimuthDeg}°</div>
              <div className="font-sans text-[11px] text-solstice-sumiLight tracking-wider uppercase pt-1">
                COMPASS BEARING
              </div>
            </div>
          </div>

          <div className="plinth-panel p-6 rounded-2xl border border-drafting flex flex-col justify-between space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-solstice-sumiLight text-xs">
              <span className="tracking-gallery uppercase text-[10px]">SHADOW FACTOR</span>
              <Clock className="w-4 h-4 text-solstice-ochre" />
            </div>
            <div>
              <div className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">{shadowRatio}×</div>
              <div className="font-sans text-[11px] text-solstice-sumiLight tracking-wider uppercase pt-1">
                PROJECTED LENGTH
              </div>
            </div>
          </div>

          <div className="plinth-panel p-6 rounded-2xl border border-drafting flex flex-col justify-between space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-solstice-sumiLight text-xs">
              <span className="tracking-gallery uppercase text-[10px]">KELVIN TEMP</span>
              <Thermometer className="w-4 h-4 text-solstice-terracottaGlow" />
            </div>
            <div>
              <div className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">{kelvin} K</div>
              <div className="font-sans text-[11px] text-solstice-sumiLight tracking-wider uppercase pt-1">
                CORRELATED TEMPERATURE
              </div>
            </div>
          </div>
        </div>

        {/* Master Interactive Solar Scrubbing Station */}
        <div className="plinth-panel p-8 sm:p-12 rounded-3xl border border-drafting shadow-plinth space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-drafting pb-6">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-solstice-terracotta" />
              <span className="font-editorial text-xl text-solstice-sumi">
                HELIODON SCRUBBER //{' '}
                <span className="font-mono text-solstice-terracotta">
                  {Math.floor(timeOfDay)}:{(Math.round((timeOfDay % 1) * 60)).toString().padStart(2, '0')}
                </span>
              </span>
            </div>
            <span className="font-sans text-[11px] text-solstice-sumiLight tracking-gallery uppercase">
              DRAG TO SWEEP SOLAR ANGLE 06:00 → 20:00
            </span>
          </div>

          {/* Precision Architectural Slider */}
          <div className="space-y-4">
            <div className="relative flex items-center">
              <input
                type="range"
                min="6.0"
                max="20.0"
                step="0.05"
                value={timeOfDay}
                onChange={handleSliderChange}
                data-cursor="SCRUB TIME"
                className="w-full h-2.5 bg-solstice-panel rounded-lg appearance-none cursor-ew-resize accent-solstice-terracotta focus:outline-none focus:ring-2 focus:ring-solstice-terracotta/30"
              />
            </div>

            {/* Time Marks Ribbon */}
            <div className="flex justify-between font-mono text-[10px] sm:text-xs text-solstice-sumiLight pt-2 border-t border-drafting/60">
              <span className="flex flex-col items-start">
                <span>06:00</span>
                <span className="text-[9px] font-sans text-solstice-terracotta uppercase">DAWN</span>
              </span>
              <span className="flex flex-col items-center">
                <span>09:00</span>
                <span className="text-[9px] font-sans uppercase">MORNING</span>
              </span>
              <span className="flex flex-col items-center">
                <span>12:30</span>
                <span className="text-[9px] font-sans text-solstice-moss uppercase">ZENITH</span>
              </span>
              <span className="flex flex-col items-center">
                <span>15:30</span>
                <span className="text-[9px] font-sans uppercase">AFTERNOON</span>
              </span>
              <span className="flex flex-col items-center">
                <span>17:30</span>
                <span className="text-[9px] font-sans text-solstice-terracotta uppercase">GOLDEN</span>
              </span>
              <span className="flex flex-col items-end">
                <span>20:00</span>
                <span className="text-[9px] font-sans uppercase">TWILIGHT</span>
              </span>
            </div>
          </div>

          {/* Four Iconic Architectural Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {PRESETS.map((p) => {
              const isActive = Math.abs(timeOfDay - p.time) < 0.3;
              return (
                <button
                  key={p.label}
                  onClick={() => handlePresetClick(p.time)}
                  data-cursor="APPLY PRESET"
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                    isActive
                      ? 'bg-solstice-surface border-solstice-terracotta shadow-md translate-y-[-2px]'
                      : 'bg-solstice-panel/40 border-drafting hover:border-solstice-sumi/40 hover:bg-solstice-surface/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-sm text-solstice-sumi font-semibold">
                      {p.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-solstice-terracotta text-solstice-surface'
                          : 'bg-solstice-panel text-solstice-sumiMuted'
                      }`}
                    >
                      {Math.floor(p.time)}:{(Math.round((p.time % 1) * 60)).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-solstice-sumiLight leading-relaxed">
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
