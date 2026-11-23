import React from 'react';
import { MonolithCanvas, CeramicMaterial } from './MonolithCanvas';
import { Sun, Moon, Sunrise, Sunset, Sliders } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface SunlightSimulatorProps {
  timeOfDay: number;
  onTimeChange: (time: number) => void;
  material: CeramicMaterial;
}

const PRESET_HOURS = [
  { hour: 6.5, label: 'Dawn Glow', icon: Sunrise, desc: 'Soft morning light, warm amber reflections' },
  { hour: 12.0, label: 'Solar Zenith', icon: Sun, desc: 'High overhead sun, sharp short shadows' },
  { hour: 17.5, label: 'Golden Hour', icon: Sunset, desc: 'Dramatic horizontal bronze illumination' },
  { hour: 19.8, label: 'Twilight Dusk', icon: Moon, desc: 'Cool indigo twilight, contemplative silence' },
];

export const SunlightSimulator: React.FC<SunlightSimulatorProps> = ({
  timeOfDay,
  onTimeChange,
  material,
}) => {
  const handleSliderChange = (val: number) => {
    onTimeChange(val);
  };

  const handlePreset = (hour: number) => {
    solsticeAudio.playTactileTouch();
    onTimeChange(hour);
  };

  const formattedHour = Math.floor(timeOfDay);
  const formattedMinute = Math.floor((timeOfDay % 1) * 60).toString().padStart(2, '0');

  return (
    <section id="sunlight-section" className="py-24 px-4 sm:px-8 bg-solstice-surface border-t border-b border-solstice-stone">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-architectural text-solstice-terracotta uppercase mb-2">
              <Sun className="w-3.5 h-3.5" />
              <span>HELIODON LAB // SOLAR ILLUMINATION</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-solstice-sumi">
              Natural Daylight <span className="italic font-serif text-solstice-terracotta">Simulation</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-solstice-sumi/80 font-sans leading-relaxed">
            Drag the solar slider from dawn to twilight to observe how natural light, shadow angles, and material textures transform our sculptural ceramic monolith in real time.
          </p>
        </div>

        {/* Centerpiece 3D Stage with In-Canvas Solar Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 h-[500px] sm:h-[600px] relative rounded-3xl overflow-hidden plinth-panel border border-solstice-stone">
            <MonolithCanvas
              timeOfDay={timeOfDay}
              material={material}
              interactive={true}
              className="w-full h-full"
            />

            {/* Slider Bar inside Canvas */}
            <div className="absolute bottom-6 left-6 right-6 plinth-panel px-6 py-4 rounded-2xl border border-solstice-stone flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Sun className="w-4 h-4 text-solstice-terracotta" />
                <span className="font-sans text-xs font-semibold text-solstice-sumi uppercase tracking-wider">
                  TIME: {formattedHour}:{formattedMinute}
                </span>
              </div>

              <input
                type="range"
                min="6.0"
                max="20.0"
                step="0.1"
                value={timeOfDay}
                onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                className="w-full sm:w-72 accent-solstice-terracotta cursor-pointer"
                aria-label="Solar Elevation Time"
              />

              <span className="text-[11px] text-solstice-sumi/70 font-sans uppercase whitespace-nowrap">
                {timeOfDay < 9 ? 'DAWN' : timeOfDay < 16 ? 'ZENITH' : timeOfDay < 19 ? 'GOLDEN HOUR' : 'TWILIGHT'}
              </span>
            </div>
          </div>

          {/* Right Presets & Architectural Solar Commentary */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-sans tracking-architectural text-solstice-sumi/60 uppercase block pb-2 border-b border-solstice-stone">
              QUICK SOLAR EPHEMERIS
            </span>

            <div className="space-y-2.5">
              {PRESET_HOURS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = Math.abs(timeOfDay - preset.hour) < 1.2;
                return (
                  <button
                    key={preset.hour}
                    onClick={() => handlePreset(preset.hour)}
                    className={`w-full p-4 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-solstice-bg border-solstice-terracotta shadow-sm'
                        : 'bg-white/60 border-solstice-stone hover:border-solstice-sumi/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-solstice-terracotta' : 'text-solstice-sumi/60'}`} />
                        <span className="font-editorial text-base text-solstice-sumi">{preset.label}</span>
                      </div>
                      <span className="font-sans text-xs text-solstice-sumi/60">
                        {Math.floor(preset.hour)}:00
                      </span>
                    </div>
                    <p className="text-xs text-solstice-sumi/70 font-sans pl-6">
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
