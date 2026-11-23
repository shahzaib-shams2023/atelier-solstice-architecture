import React, { useState } from 'react';
import { Compass, MapPin, ArrowUpRight, Maximize2, X, Sun, Layers, Square } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface Monograph {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  year: string;
  typology: string;
  area: string;
  material: string;
  solarOrientation: string;
  narrative: string;
  blueprintFeatures: string[];
}

const MONOGRAPHS: Monograph[] = [
  {
    id: 'kamakura',
    num: 'M.01',
    title: 'House on the Kamakura Coast',
    subtitle: 'OCEANFRONT MONOLITHIC RESIDENCE',
    location: 'Kamakura, Kanagawa, Japan',
    coordinates: '35.3190° N, 139.5467° E',
    year: '2025',
    typology: 'Private Monolithic Residence',
    area: '420 m²',
    material: 'Rammed Earth, Charred Yakisugi Cedar, Roman Travertine',
    solarOrientation: 'South-Southwest (195° Azimuth)',
    narrative:
      'Sculpted into a sea-cliff terrace overlooking Sagami Bay. Continuous travertine walls guide prevailing offshore breezes into sunken meditation courtyards, while deep cantilevered eaves screen harsh summer sun and capture low winter rays.',
    blueprintFeatures: [
      'Continuous 600mm Rammed Earth Thermal Mass',
      'Charred Cedar (Yakisugi) Wind Deflector Screen',
      'Travertine Fluted Central Skylight Shaft',
      'Subterranean Acoustic Resonance Chamber',
    ],
  },
  {
    id: 'bornholm',
    num: 'M.02',
    title: 'Bornholm Granite Pavilion',
    subtitle: 'COASTAL GUEST SANCTUARY & STUDIO',
    location: 'Bornholm Island, Baltic Sea, Denmark',
    coordinates: '55.1320° N, 14.9140° E',
    year: '2026',
    typology: 'Coastal Guest Sanctuary & Studio',
    area: '280 m²',
    material: 'Rough-Hewn Local Granite, Douglas Fir, Dark Slate',
    solarOrientation: 'South-Southeast (165° Azimuth)',
    narrative:
      'An unpolished granite monolith set amidst coastal pine barrens. Deep cantilevered eaves frame the changing Nordic horizon across four distinct seasons. Passive solar gain warms the exposed granite floor slabs throughout cold Scandinavian winters.',
    blueprintFeatures: [
      'Rough-Hewn Bornholm Granite Loadbearing Piers',
      'Solid Douglas Fir Glulam Beam Cantilevers',
      'Deep 3.2m Eaves Framing Low Winter Sun',
      'Rainwater Collection Basin Carved in Stone',
    ],
  },
  {
    id: 'arashiyama',
    num: 'M.03',
    title: 'Arashiyama Wabi-Sabi Tea Sanctuary',
    subtitle: 'CEREMONIAL BAMBOO PAVILION',
    location: 'Arashiyama, Kyoto, Japan',
    coordinates: '35.0160° N, 135.6710° E',
    year: '2025',
    typology: 'Private Ceremonial Pavilion',
    area: '160 m²',
    material: 'Kyoto Basin Clay Plaster, Ancient Hinoki Cypress',
    solarOrientation: 'East-Southeast (110° Azimuth)',
    narrative:
      'Designed as an acoustic resonance chamber for falling rain and bamboo whispers. Zero metallic fasteners; assembled entirely via traditional Japanese joinery (kigumi). The morning sun sweeps diagonally across clay plaster walls, revealing fine straw flecks.',
    blueprintFeatures: [
      'Traditional Kigumi Interlocking Wood Joinery',
      'Hand-Troweled Kyoto Clay Straw Plaster',
      'Sunken Tsukubai Granite Water Basin',
      'Shoji Screens with Hand-Pounded Washi Paper',
    ],
  },
  {
    id: 'oslofjord',
    num: 'M.04',
    title: 'Nordic Fjord Monolith',
    subtitle: 'CLIFFSIDE SOLAR RESIDENCE',
    location: 'Oslofjord, Akershus, Norway',
    coordinates: '59.7340° N, 10.5890° E',
    year: '2026',
    typology: 'Cliffside Monolithic Residence',
    area: '510 m²',
    material: 'Honed Basalt, Structural Triple-Glazing, Living Sedum Roof',
    solarOrientation: 'Direct South (180° Azimuth)',
    narrative:
      'Embedded directly into ancient gneiss bedrock. A colossal basalt monolith functions as a heat sink, absorbing solar radiation through three-story glazing to regulate the interior climate with net-zero supplemental winter energy.',
    blueprintFeatures: [
      'Three-Story Structural Insulated Glass Wall',
      'Solid Basalt Heat Storage Spine',
      'Sedum and Moss Living Insulation Roof',
      'Geothermal Ground-Source Heat Integration',
    ],
  },
];

export const ArchitecturalMonographs: React.FC = () => {
  const [activeModal, setActiveModal] = useState<Monograph | null>(null);

  const handleOpenMonograph = (m: Monograph) => {
    solsticeAudio.playSingingBowl(324);
    setActiveModal(m);
  };

  const handleCloseMonograph = () => {
    solsticeAudio.playTactileTouch();
    setActiveModal(null);
  };

  return (
    <section
      id="monographs-section"
      className="py-32 px-4 sm:px-8 lg:px-12 bg-solstice-surface/90 border-b border-drafting relative"
    >
      <div className="max-w-[1720px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-drafting">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-gallery text-solstice-terracotta uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>BUILT WORKS // ARCHITECTURAL MONOGRAPHS</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-solstice-sumi leading-[1.0]">
              Sanctuaries of <br />
              <span className="italic font-serif text-solstice-terracotta">Silent Permanence</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-solstice-sumiMuted font-light leading-relaxed">
            A monograph archive of completed residential commissions and spiritual pavilions. Each design is tuned to the latitude, prevailing winds, and solar trajectory of its natural topography.
          </p>
        </div>

        {/* Editorial Monograph Staggered Sequence */}
        <div className="space-y-12">
          {MONOGRAPHS.map((mono, idx) => (
            <div
              key={mono.id}
              className="plinth-panel rounded-3xl p-8 sm:p-12 border border-drafting shadow-sm hover:shadow-plinth transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Number & Identification */}
                <div className="lg:col-span-3 space-y-3">
                  <span className="font-editorial text-5xl sm:text-6xl text-solstice-terracotta font-normal block">
                    {mono.num}
                  </span>
                  <div className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumiLight">
                    {mono.location}
                  </div>
                  <div className="font-mono text-[10px] text-solstice-sumiMuted">
                    {mono.coordinates}
                  </div>
                </div>

                {/* Center Title & Architectural Narrative */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="font-sans text-[10px] tracking-architectural text-solstice-terracotta uppercase block">
                      {mono.typology} • {mono.year}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi group-hover:text-solstice-terracotta transition-colors">
                      {mono.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-solstice-sumiMuted font-light leading-relaxed">
                    {mono.narrative}
                  </p>

                  {/* Material & Solar Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-solstice-panel/80 text-[10px] font-sans text-solstice-sumiMuted uppercase">
                      MATERIAL: {mono.material.split(',')[0]}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-solstice-panel/80 text-[10px] font-sans text-solstice-moss uppercase">
                      SOLAR: {mono.solarOrientation.split(' ')[0]}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-solstice-panel/80 text-[10px] font-sans text-solstice-terracotta uppercase">
                      AREA: {mono.area}
                    </span>
                  </div>
                </div>

                {/* Right Blueprint CTA & Action */}
                <div className="lg:col-span-3 flex lg:flex-col justify-between items-end h-full pt-4 lg:pt-0">
                  <div className="hidden lg:block text-right">
                    <span className="text-[10px] font-sans tracking-gallery text-solstice-sumiLight uppercase block">
                      COMPLETED
                    </span>
                    <span className="font-editorial text-2xl text-solstice-sumi">
                      {mono.year}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenMonograph(mono)}
                    data-cursor="EXPAND"
                    className="px-6 py-3 rounded-full bg-solstice-sumi hover:bg-solstice-terracotta text-solstice-surface font-sans text-xs tracking-architectural uppercase transition-all duration-300 shadow-sm flex items-center space-x-2 group-hover:scale-105"
                  >
                    <span>EXPAND MONOGRAPH</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Architectural Blueprint Modal Drawer */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-solstice-sumi/70 backdrop-blur-md animate-fade-in">
          <div className="plinth-panel bg-solstice-surface max-w-4xl w-full rounded-3xl p-8 sm:p-12 border border-drafting shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-drafting pb-6">
              <div>
                <span className="font-editorial text-xl text-solstice-terracotta block">
                  {activeModal.num} // ARCHITECTURAL DOSSIER
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">
                  {activeModal.title}
                </h3>
                <span className="font-sans text-xs tracking-wider uppercase text-solstice-sumiLight block pt-1">
                  {activeModal.location} • {activeModal.coordinates}
                </span>
              </div>

              <button
                onClick={handleCloseMonograph}
                data-cursor="CLOSE"
                className="p-3 rounded-full bg-solstice-panel hover:bg-solstice-terracotta hover:text-solstice-surface text-solstice-sumi transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Narrative & Specifications */}
            <div className="space-y-6">
              <div>
                <h4 className="font-sans text-[11px] tracking-gallery uppercase text-solstice-terracotta mb-2">
                  ARCHITECTURAL PHILOSOPHY & TOPOGRAPHY
                </h4>
                <p className="font-sans text-sm text-solstice-sumiMuted font-light leading-relaxed">
                  {activeModal.narrative}
                </p>
              </div>

              {/* Tectonic Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-solstice-panel/40 border border-drafting">
                <div>
                  <span className="text-[10px] font-sans tracking-gallery uppercase text-solstice-sumiLight block">
                    TOTAL FOOTPRINT
                  </span>
                  <span className="font-editorial text-2xl text-solstice-sumi">{activeModal.area}</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-gallery uppercase text-solstice-sumiLight block">
                    SOLAR AXIS
                  </span>
                  <span className="font-editorial text-xl text-solstice-sumi">{activeModal.solarOrientation}</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-gallery uppercase text-solstice-sumiLight block">
                    PRIMARY MEDIUM
                  </span>
                  <span className="font-sans text-xs text-solstice-sumiMuted font-medium block pt-1">
                    {activeModal.material}
                  </span>
                </div>
              </div>

              {/* Blueprint Engineering Systems */}
              <div>
                <h4 className="font-sans text-[11px] tracking-gallery uppercase text-solstice-terracotta mb-3">
                  TECTONIC BLUEPRINT & ENVIRONMENTAL SYSTEMS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModal.blueprintFeatures.map((feat, fidx) => (
                    <div
                      key={fidx}
                      className="p-4 rounded-xl bg-solstice-surface border border-drafting flex items-center space-x-3 text-xs text-solstice-sumi"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-solstice-terracotta" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center border-t border-drafting pt-6 text-xs text-solstice-sumiLight font-sans">
              <span>ATELIER SOLSTICE PERMANENT MONOGRAPH ARCHIVE</span>
              <button
                onClick={handleCloseMonograph}
                className="px-6 py-2.5 rounded-full bg-solstice-sumi text-solstice-surface hover:bg-solstice-terracotta transition-colors text-xs tracking-wider uppercase font-sans"
              >
                RETURN TO ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
