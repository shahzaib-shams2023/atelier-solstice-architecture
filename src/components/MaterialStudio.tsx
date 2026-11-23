import React from 'react';
import { CeramicMaterial } from './MonolithCanvas';
import { Sparkles, Layers, Shield, Droplets, Flame, Mountain } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface MaterialStudioProps {
  currentMaterial: CeramicMaterial;
  onMaterialChange: (mat: CeramicMaterial) => void;
}

interface MaterialSpec {
  id: CeramicMaterial;
  name: string;
  subname: string;
  origin: string;
  colorSwatch: string;
  porosity: string;
  compressive: string;
  thermal: string;
  finish: string;
  description: string;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'kyoto-clay',
    name: 'Kyoto Fired Clay',
    subname: 'KAMIGAMO BASIN SILT',
    origin: 'Kyoto Prefecture, Japan',
    colorSwatch: 'bg-[#8A4B32]',
    porosity: '3.4%',
    compressive: '48 MPa',
    thermal: '0.82 W/mK',
    finish: 'Wood-Ash Anagama Sintered (1260°C)',
    description:
      'Harvested from ancient alluvial deposits in northern Kyoto. Wood-fired continuously for 72 hours in a hill anagama kiln, producing organic fly-ash vitreous glaze patterns that never repeat.',
  },
  {
    id: 'travertine',
    name: 'Tivoli Travertine',
    subname: 'SEDIMENTARY CALCITE',
    origin: 'Tivoli, Lazio, Italy',
    colorSwatch: 'bg-[#E0D6C3]',
    porosity: '7.8%',
    compressive: '62 MPa',
    thermal: '1.24 W/mK',
    finish: 'Vein-Cut Open-Pore Raking Finish',
    description:
      'Precipitated over millennia from geothermal limestone springs. Features deep horizontal voids and warm calcium carbonate veins that catch grazing sunlight with dramatic micro-shadows.',
  },
  {
    id: 'obsidian',
    name: 'Volcanic Obsidian',
    subname: 'EXTRUSIVE BASALTIC GLASS',
    origin: 'Kyushu Volcanic Arc, Japan',
    colorSwatch: 'bg-[#18181A]',
    porosity: '0.04%',
    compressive: '180 MPa',
    thermal: '1.45 W/mK',
    finish: 'Water-Honed Satin Sheen',
    description:
      'Formed by the flash-chilling of high-silica volcanic lava. Possesses deep light absorption with crisp specular edge reflections, evoking monolithic timelessness and silent protection.',
  },
  {
    id: 'carrara',
    name: 'Statuario Carrara',
    subname: 'METAMORPHIC CALCITE MARBLE',
    origin: 'Apuan Alps, Tuscany',
    colorSwatch: 'bg-[#F3F2EF]',
    porosity: '0.22%',
    compressive: '110 MPa',
    thermal: '2.80 W/mK',
    finish: 'Silk-Honed Matte Non-Reflective',
    description:
      'A dense, luminous metamorphic stone famous since antiquity. Delicate smoke-grey dendritic veins drift through pristine crystalline calcite, softly diffusing raking daylight.',
  },
];

export const MaterialStudio: React.FC<MaterialStudioProps> = ({
  currentMaterial,
  onMaterialChange,
}) => {
  const activeSpec = MATERIALS.find((m) => m.id === currentMaterial) || MATERIALS[0];

  const handleSelectMaterial = (id: CeramicMaterial) => {
    solsticeAudio.playSingingBowl(288);
    onMaterialChange(id);
  };

  return (
    <section
      id="tectonics-section"
      className="py-32 px-4 sm:px-8 lg:px-12 bg-grain relative border-b border-drafting"
    >
      <div className="max-w-[1720px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-drafting">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-gallery text-solstice-terracotta uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>TECTONIC PROVENANCE // MATERIAL ARCHIVES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-solstice-sumi leading-[1.0]">
              Geological Memory & <br />
              <span className="italic font-serif text-solstice-terracotta">Mineral Permanence</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-solstice-sumiMuted font-light leading-relaxed">
            Every material carries a geological history measured in millennia. In our Kyoto and Copenhagen studios, we refuse synthetic veneers, working exclusively with raw earth, volcanic stone, and kiln-fired mineral clays.
          </p>
        </div>

        {/* Asymmetrical Studio Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Material Selector Plinths */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumiLight pb-2">
              SELECT ACTIVE TECTONIC MEDIUM (UPDATES 3D SCULPTURE)
            </div>

            <div className="space-y-3">
              {MATERIALS.map((mat, index) => {
                const isSelected = mat.id === currentMaterial;
                return (
                  <button
                    key={mat.id}
                    onClick={() => handleSelectMaterial(mat.id)}
                    data-cursor="SELECT MEDIUM"
                    className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-solstice-surface border-solstice-terracotta shadow-plinth translate-x-1.5'
                        : 'bg-solstice-panel/40 border-drafting hover:border-solstice-sumi/40 hover:bg-solstice-surface/50'
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                      <div
                        className={`w-10 h-10 rounded-xl border border-drafting shadow-inner flex items-center justify-center ${mat.colorSwatch}`}
                      />
                      <div className="space-y-0.5">
                        <span className="font-editorial text-xl text-solstice-sumi group-hover:text-solstice-terracotta transition-colors block">
                          {mat.name}
                        </span>
                        <span className="font-sans text-[10px] tracking-architectural uppercase text-solstice-sumiLight block">
                          {mat.subname} • {mat.origin}
                        </span>
                      </div>
                    </div>

                    <div className="font-editorial text-lg text-solstice-sumiLight font-normal">
                      0{index + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: In-Depth Architectural Specification Altar */}
          <div className="lg:col-span-7 plinth-panel p-8 sm:p-12 rounded-3xl border border-drafting shadow-plinth space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-drafting pb-6">
              <div>
                <span className="font-sans text-[10px] tracking-gallery uppercase text-solstice-terracotta block">
                  ACTIVE MATERIAL MANIFEST
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">
                  {activeSpec.name}
                </h3>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-solstice-panel border border-drafting text-[11px] font-sans tracking-wider uppercase text-solstice-sumiMuted self-start sm:self-auto">
                {activeSpec.origin}
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-solstice-sumiMuted font-light leading-relaxed">
              {activeSpec.description}
            </p>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-drafting">
              <div className="space-y-1">
                <span className="font-sans text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                  POROSITY RATIO
                </span>
                <span className="font-editorial text-2xl text-solstice-sumi">{activeSpec.porosity}</span>
                <span className="font-sans text-[9px] text-solstice-terracotta uppercase block">
                  NATURAL VOID DENSITY
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                  COMPRESSIVE LOAD
                </span>
                <span className="font-editorial text-2xl text-solstice-sumi">{activeSpec.compressive}</span>
                <span className="font-sans text-[9px] text-solstice-moss uppercase block">
                  STRUCTURAL CAPACITY
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                  THERMAL INERTIA
                </span>
                <span className="font-editorial text-2xl text-solstice-sumi">{activeSpec.thermal}</span>
                <span className="font-sans text-[9px] text-solstice-ochre uppercase block">
                  DIFFUSIVE CONSTANT
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-[10px] text-solstice-sumiLight tracking-gallery uppercase block">
                  SURFACE FINISH
                </span>
                <span className="font-editorial text-lg text-solstice-sumi block truncate">
                  {activeSpec.finish.split(' ')[0]}
                </span>
                <span className="font-sans text-[9px] text-solstice-sumiLight uppercase block truncate">
                  {activeSpec.finish}
                </span>
              </div>
            </div>

            {/* Studio Note */}
            <div className="p-4 rounded-xl bg-solstice-panel/40 border border-drafting flex items-center space-x-3 text-xs text-solstice-sumiMuted">
              <Sparkles className="w-4 h-4 text-solstice-terracotta flex-shrink-0" />
              <span>
                All ceramic plinths are numbered, signed with the Solstice cipher, and engineered to endure outdoor freeze-thaw cycles for centuries.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
