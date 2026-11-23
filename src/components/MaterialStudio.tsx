import React from 'react';
import { CeramicMaterial } from './MonolithCanvas';
import { Layers, Sparkles, Check } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface MaterialStudioProps {
  currentMaterial: CeramicMaterial;
  onMaterialChange: (mat: CeramicMaterial) => void;
}

const MATERIALS = [
  {
    id: 'kyoto-clay' as CeramicMaterial,
    name: 'Kyoto Fired Terracotta',
    origin: 'Shigaraki Region, Japan',
    colorHex: '#C86D51',
    description: 'High-iron granular clay wood-fired in anagama kilns for 7 days, developing natural ash glaze and smoky umber gradients.',
  },
  {
    id: 'travertine' as CeramicMaterial,
    name: 'Raw Roman Travertine',
    origin: 'Tivoli Quarries, Italy',
    colorHex: '#EDE6D6',
    description: 'Porous limestone with natural sedimentary cavities, unfilled and honed by hand to retain the tactile coolness of earth.',
  },
  {
    id: 'obsidian' as CeramicMaterial,
    name: 'Obsidian Basalt Monolith',
    origin: 'Bornholm Archipelago, Denmark',
    colorHex: '#25282A',
    description: 'Dark igneous volcanic rock with micro-crystalline density, absorbing harsh glare while reflecting subtle specular moonlight.',
  },
  {
    id: 'carrara' as CeramicMaterial,
    name: 'Bianco Carrara Marble',
    origin: 'Apuan Alps, Tuscany',
    colorHex: '#F6F6F8',
    description: 'Fine-grained crystalline marble with soft feathered grey veining, hand-sculpted into continuous architectural volumes.',
  },
];

export const MaterialStudio: React.FC<MaterialStudioProps> = ({
  currentMaterial,
  onMaterialChange,
}) => {
  const handleSelect = (id: CeramicMaterial) => {
    solsticeAudio.playTactileTouch();
    onMaterialChange(id);
  };

  return (
    <section id="material-section" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-architectural text-solstice-terracotta uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>TACTILE PALETTE // MINERAL PERMANENCE</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-solstice-sumi">
          Material <span className="italic font-serif text-solstice-terracotta">Alchemy</span>
        </h2>
        <p className="text-xs sm:text-sm text-solstice-sumi/80 font-sans leading-relaxed">
          Select an architectural material to update the 3D monolith and examine its tactile roughness, color absorption, and mineral provenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MATERIALS.map((mat) => {
          const isSelected = currentMaterial === mat.id;
          return (
            <button
              key={mat.id}
              onClick={() => handleSelect(mat.id)}
              className={`p-6 rounded-3xl text-left transition-all border flex flex-col justify-between space-y-6 ${
                isSelected
                  ? 'bg-solstice-surface border-solstice-terracotta shadow-md'
                  : 'bg-white/40 border-solstice-stone hover:border-solstice-sumi/30'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-8 h-8 rounded-full border border-solstice-stone shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  {isSelected && <Check className="w-4 h-4 text-solstice-terracotta" />}
                </div>

                <div>
                  <span className="font-editorial text-xl text-solstice-sumi block">{mat.name}</span>
                  <span className="font-sans text-[11px] text-solstice-terracotta block tracking-wider uppercase mt-0.5">
                    {mat.origin}
                  </span>
                </div>

                <p className="font-sans text-xs text-solstice-sumi/70 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-solstice-stone/60 font-sans text-[10px] text-solstice-sumi/60 uppercase tracking-wider">
                {isSelected ? 'ACTIVE IN 3D ENGINE' : 'CLICK TO APPLY'}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
