import React, { useState } from 'react';
import { X, Check, Compass, Send, Sparkles, Building2, MapPin } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface CommissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionDrawer: React.FC<CommissionDrawerProps> = ({ isOpen, onClose }) => {
  const [typology, setTypology] = useState<string>('monolithic-residence');
  const [region, setRegion] = useState<string>('japan');
  const [material, setMaterial] = useState<string>('travertine');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    solsticeAudio.playSingingBowl(216);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-solstice-sumi/60 backdrop-blur-md transition-opacity duration-300">
      <div className="w-full max-w-2xl bg-solstice-surface h-full shadow-2xl border-l border-drafting flex flex-col justify-between overflow-y-auto p-6 sm:p-12 animate-slide-left">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-drafting pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[10px] font-sans tracking-gallery text-solstice-terracotta uppercase">
              <Compass className="w-3 h-3" />
              <span>CONFIDENTIAL ARCHITECTURAL DIALOGUE</span>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-solstice-sumi">
              Atelier Commission
            </h3>
          </div>
          <button
            onClick={() => {
              solsticeAudio.playTactileTouch();
              onClose();
            }}
            data-cursor="CLOSE"
            className="p-3 rounded-full bg-solstice-panel hover:bg-solstice-terracotta hover:text-solstice-surface text-solstice-sumi transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="py-16 text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-solstice-terracotta/10 border border-solstice-terracotta flex items-center justify-center mx-auto text-solstice-terracotta">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="font-sans text-[11px] tracking-gallery uppercase text-solstice-terracotta block">
                DOSSIER RECORDED // DOSSIER NO. SOL-2026-089
              </span>
              <h4 className="font-editorial text-3xl text-solstice-sumi">
                Inquiry Received in Kyoto & Copenhagen
              </h4>
              <p className="font-sans text-xs sm:text-sm text-solstice-sumiMuted max-w-md mx-auto leading-relaxed">
                Thank you, {name || 'esteemed patron'}. Partner architects from our Kamigamo and Holmen ateliers will review your topographical parameters and contact you within 48 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-solstice-sumi text-solstice-surface font-sans text-xs tracking-architectural uppercase hover:bg-solstice-terracotta transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-8 space-y-8 flex-1">
            {/* Step 1: Project Typology */}
            <div className="space-y-3">
              <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                01 // PROJECT TYPOLOGY
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'monolithic-residence', label: 'Monolithic Residence' },
                  { id: 'private-sanctuary', label: 'Private Sanctuary' },
                  { id: 'cultural-pavilion', label: 'Cultural Pavilion' },
                  { id: 'spatial-installation', label: 'Spatial Installation' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => {
                      solsticeAudio.playTactileTouch();
                      setTypology(t.id);
                    }}
                    className={`p-4 rounded-xl text-left border text-xs font-sans transition-all ${
                      typology === t.id
                        ? 'bg-solstice-surface border-solstice-terracotta text-solstice-sumi shadow-sm'
                        : 'bg-solstice-panel/40 border-drafting text-solstice-sumiMuted hover:border-solstice-sumi/40'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Site Topography & Region */}
            <div className="space-y-3">
              <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                02 // SITE TOPOGRAPHY & LATITUDE
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'japan', label: 'Japan / East Asia (Kyoto Studio)' },
                  { id: 'nordic', label: 'Scandinavia / Nordic (CPH Studio)' },
                  { id: 'europe', label: 'Southern Europe / Mediterranean' },
                  { id: 'americas', label: 'North America / Transatlantic' },
                ].map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => {
                      solsticeAudio.playTactileTouch();
                      setRegion(r.id);
                    }}
                    className={`p-4 rounded-xl text-left border text-xs font-sans transition-all ${
                      region === r.id
                        ? 'bg-solstice-surface border-solstice-terracotta text-solstice-sumi shadow-sm'
                        : 'bg-solstice-panel/40 border-drafting text-solstice-sumiMuted hover:border-solstice-sumi/40'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Primary Tectonic Medium */}
            <div className="space-y-3">
              <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                03 // PRIMARY TECTONIC MATERIAL
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'travertine', label: 'Roman Travertine Stone' },
                  { id: 'kyoto-clay', label: 'Kyoto Kiln-Fired Clay' },
                  { id: 'obsidian', label: 'Volcanic Basalt / Obsidian' },
                  { id: 'carrara', label: 'Statuario Carrara Marble' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => {
                      solsticeAudio.playTactileTouch();
                      setMaterial(m.id);
                    }}
                    className={`p-4 rounded-xl text-left border text-xs font-sans transition-all ${
                      material === m.id
                        ? 'bg-solstice-surface border-solstice-terracotta text-solstice-sumi shadow-sm'
                        : 'bg-solstice-panel/40 border-drafting text-solstice-sumiMuted hover:border-solstice-sumi/40'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-4 pt-4 border-t border-drafting">
              <div className="space-y-2">
                <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                  PATRON OR REPRESENTATIVE NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenzo Tange / Henrik Solvason"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-solstice-panel/50 border border-drafting text-solstice-sumi text-xs font-sans focus:outline-none focus:border-solstice-terracotta"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                  CONTACT EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="patron@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-solstice-panel/50 border border-drafting text-solstice-sumi text-xs font-sans focus:outline-none focus:border-solstice-terracotta"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[11px] tracking-gallery uppercase text-solstice-sumi block">
                  TOPOGRAPHICAL CONTEXT & PROJECT VISION
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your site, solar conditions, desired footprint, or architectural aspirations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-solstice-panel/50 border border-drafting text-solstice-sumi text-xs font-sans focus:outline-none focus:border-solstice-terracotta resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-cursor="TRANSMIT"
              className="w-full py-4 rounded-full bg-solstice-sumi hover:bg-solstice-terracotta text-solstice-surface font-sans text-xs tracking-architectural uppercase transition-all shadow-md hover:shadow-plinth flex items-center justify-center space-x-2"
            >
              <span>TRANSMIT ARCHITECTURAL DOSSIER</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Drawer Footer */}
        <div className="border-t border-drafting pt-6 text-[10px] font-sans text-solstice-sumiLight flex justify-between items-center">
          <span>ATELIER SOLSTICE • STRICT CONFIDENTIALITY</span>
          <span>KYOTO // COPENHAGEN</span>
        </div>
      </div>
    </div>
  );
};
