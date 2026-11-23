import React from 'react';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';

const RESIDENCES = [
  {
    title: 'House on the Kamakura Coast',
    location: 'Kamakura, Japan',
    year: '2025',
    typology: 'Oceanfront Monolithic Residence',
    area: '420 m²',
    material: 'Rammed Earth & Charred Cedar (Yakisugi)',
    description: 'Sculpted into a sea-cliff terrace overlooking Sagami Bay. Continuous travertine walls guide prevailing offshore breezes into sunken meditation courtyards.',
  },
  {
    title: 'Bornholm Granite Pavilion',
    location: 'Bornholm, Denmark',
    year: '2026',
    typology: 'Coastal Guest Sanctuary & Studio',
    area: '280 m²',
    material: 'Rough-Hewn Local Granite & Douglas Fir',
    description: 'An unpolished granite monolith set amidst coastal pine barrens. Deep cantilevered eaves frame the changing Nordic horizon across four distinct seasons.',
  },
  {
    title: 'Kyoto Wabi-Sabi Tea Sanctuary',
    location: 'Arashiyama, Kyoto',
    year: '2025',
    typology: 'Private Ceremonial Pavilion',
    area: '160 m²',
    material: 'Kyoto Clay Plaster & Ancient Hinoki',
    description: 'Designed as an acoustic resonance chamber for natural rain and bamboo whispers. Zero metallic fasteners; assembled entirely via Japanese joinery.',
  },
];

export const ArchitectureGallery: React.FC = () => {
  return (
    <section id="gallery-section" className="py-24 px-4 sm:px-8 bg-solstice-surface/80 border-t border-b border-solstice-stone">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-architectural text-solstice-terracotta uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>BUILT WORKS // RESIDENCES & PAVILIONS</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-solstice-sumi">
              Architectural <span className="italic font-serif text-solstice-terracotta">Monographs</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-solstice-sumi/80 font-sans leading-relaxed">
            A curated portfolio of permanent residences and contemplation spaces constructed from geological stone and sculptural ceramics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESIDENCES.map((res, idx) => (
            <div
              key={res.title}
              className="plinth-card p-8 rounded-3xl flex flex-col justify-between space-y-8 group hover:border-solstice-terracotta transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-solstice-stone pb-4">
                  <span className="font-editorial text-2xl text-solstice-terracotta">0{idx + 1}</span>
                  <div className="flex items-center space-x-1 text-xs text-solstice-sumi/60">
                    <MapPin className="w-3 h-3" />
                    <span>{res.location}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl text-solstice-sumi group-hover:text-solstice-terracotta transition-colors">
                  {res.title}
                </h3>

                <p className="font-sans text-xs text-solstice-sumi/80 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="space-y-2 pt-6 border-t border-solstice-stone text-xs font-sans">
                <div className="flex justify-between text-solstice-sumi/60">
                  <span>TYPOLOGY:</span>
                  <span className="text-solstice-sumi font-medium">{res.typology}</span>
                </div>
                <div className="flex justify-between text-solstice-sumi/60">
                  <span>SCALE:</span>
                  <span className="text-solstice-sumi font-medium">{res.area}</span>
                </div>
                <div className="flex justify-between text-solstice-sumi/60">
                  <span>MATERIAL:</span>
                  <span className="text-solstice-terracotta font-medium">{res.material}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
