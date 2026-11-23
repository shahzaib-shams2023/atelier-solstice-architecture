import React from 'react';
import { Compass, Quote, Feather, Moon, SunMedium } from 'lucide-react';

export const SpatialManifesto: React.FC = () => {
  return (
    <section
      id="manifesto-section"
      className="py-36 px-4 sm:px-8 lg:px-12 bg-grain relative border-b border-drafting overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto space-y-24">
        {/* Eyebrow & Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-gallery text-solstice-terracotta uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>THE PHILOSOPHICAL MANIFESTO // KYOTO & COPENHAGEN</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-7xl font-normal text-solstice-sumi leading-[0.95] tracking-tighter">
            We Find Beauty Not In <br />
            The Thing Itself, But In <br />
            <span className="italic font-serif text-solstice-terracotta">The Patterns Of Shadows.</span>
          </h2>
          <p className="font-serif italic text-lg sm:text-2xl text-solstice-sumiLight font-light max-w-2xl mx-auto">
            — Jun'ichiro Tanizaki, In Praise of Shadows (1933)
          </p>
        </div>

        {/* Dual Cultural Pillars: Japanese Wabi-Sabi vs Nordic Brutalism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Pillar 01: Kyoto Wabi-Sabi & The Void (Ma) */}
          <div className="plinth-panel p-8 sm:p-14 rounded-3xl border border-drafting shadow-plinth flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-drafting pb-4">
                <span className="font-editorial text-4xl text-solstice-terracotta">01 // 間</span>
                <span className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumiLight">
                  KYOTO • SHADOW AESTHETICS
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">
                The Poetics of Negative Space & Impermanence
              </h3>

              <p className="font-sans text-sm sm:text-base text-solstice-sumiMuted font-light leading-relaxed">
                In Japanese tradition, space is not empty—it is pregnant with potential. The concept of <em>Ma</em> (間) teaches us that the pause between notes creates music, and the shadow between walls creates sanctuary. By withholding unnecessary electric illumination, we allow the eye to perceive the quiet drama of daylight grazing across hand-troweled clay.
              </p>
            </div>

            <div className="pt-6 border-t border-drafting flex items-center justify-between text-xs text-solstice-sumiLight font-sans">
              <span className="tracking-wider uppercase">MATERIAL ESSENCE:</span>
              <span className="text-solstice-sumi font-medium uppercase">Alluvial Clay Plaster, Yakisugi Cedar, Rainwater Basins</span>
            </div>
          </div>

          {/* Pillar 02: Copenhagen Nordic Tectonics */}
          <div className="plinth-panel p-8 sm:p-14 rounded-3xl border border-drafting shadow-plinth flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-drafting pb-4">
                <span className="font-editorial text-4xl text-solstice-moss">02 // LYS</span>
                <span className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumiLight">
                  COPENHAGEN • SOLAR HARVESTING
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">
                The Nordic Geometry of Low Winter Light
              </h3>

              <p className="font-sans text-sm sm:text-base text-solstice-sumiMuted font-light leading-relaxed">
                At 55° North, winter sunlight arrives at a perpetual grazing angle, barely clearing the horizon. Scandinavian architectural honesty demands that structures act as optical instruments—cantilevered granite eaves that scoop precious golden rays deep into living quarters while withstanding punishing Baltic gales.
              </p>
            </div>

            <div className="pt-6 border-t border-drafting flex items-center justify-between text-xs text-solstice-sumiLight font-sans">
              <span className="tracking-wider uppercase">MATERIAL ESSENCE:</span>
              <span className="text-solstice-sumi font-medium uppercase">Rough Bornholm Granite, Douglas Fir Glulam, Calcite Travertine</span>
            </div>
          </div>
        </div>

        {/* Studio Tenets Banner */}
        <div className="border border-drafting rounded-3xl p-8 sm:p-12 bg-solstice-surface/80 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <span className="font-editorial text-2xl text-solstice-terracotta">I. Absolute Truth to Materials</span>
            <p className="font-sans text-xs text-solstice-sumiMuted leading-relaxed">
              Never conceal structural honesty beneath decorative veneers. If a column is stone, it must bear load. If a wall is clay, it must breathe moisture.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-editorial text-2xl text-solstice-terracotta">II. The Sun as Master Builder</span>
            <p className="font-sans text-xs text-solstice-sumiMuted leading-relaxed">
              Every room is planned around the seasonal solar ephemeris. Shadows indicate the hour, and light defines the rhythm of human contemplation.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-editorial text-2xl text-solstice-terracotta">III. Centennial Longevity</span>
            <p className="font-sans text-xs text-solstice-sumiMuted leading-relaxed">
              We design for centuries, not fiscal quarters. Our structures are conceived to age gracefully, accumulating the rich patina of moss, rain, and touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

