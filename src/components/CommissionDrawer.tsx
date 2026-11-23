import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { solsticeAudio } from '../utils/audio';

interface CommissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionDrawer: React.FC<CommissionDrawerProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typology: 'Private Residence',
    siteLocation: 'Kyoto, Japan',
    estimatedBudget: '$1.5M - $3.0M',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    solsticeAudio.playSingingBowl(324);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-solstice-sumi/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-solstice-surface border border-solstice-stone shadow-2xl text-solstice-sumi">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-solstice-sumi/60 hover:text-solstice-sumi transition-colors"
          aria-label="Close Inquiries Drawer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-sans text-solstice-terracotta tracking-architectural uppercase">
                ATELIER SOLSTICE // SPATIAL COMMISSION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-solstice-sumi">
                Initiate Dialogue
              </h3>
              <p className="text-xs text-solstice-sumi/70 font-sans leading-relaxed">
                We accept three bespoke residential commissions and six spatial ceramic suites each solar year.
              </p>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-solstice-sumi/60 uppercase mb-1">YOUR NAME</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Kenzo Sorensen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-solstice-stone text-solstice-sumi focus:border-solstice-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-solstice-sumi/60 uppercase mb-1">EMAIL ADDRESS</label>
                <input
                  required
                  type="email"
                  placeholder="contact@architecture.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-solstice-stone text-solstice-sumi focus:border-solstice-terracotta focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-solstice-sumi/60 uppercase mb-1">TYPOLOGY</label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/70 border border-solstice-stone text-solstice-sumi focus:border-solstice-terracotta focus:outline-none"
                  >
                    <option value="Private Residence">Private Residence</option>
                    <option value="Sculptural Ceramic Suite">Sculptural Ceramics</option>
                    <option value="Cultural Pavilion">Cultural Pavilion</option>
                    <option value="Landscape Sanctuary">Landscape Sanctuary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-solstice-sumi/60 uppercase mb-1">LOCATION</label>
                  <input
                    type="text"
                    placeholder="e.g. Kyoto, Japan"
                    value={formData.siteLocation}
                    onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/70 border border-solstice-stone text-solstice-sumi focus:border-solstice-terracotta focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-solstice-sumi hover:bg-solstice-terracotta text-solstice-surface font-sans text-xs tracking-architectural uppercase transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>TRANSMIT ARCHITECTURAL INQUIRY</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-solstice-terracotta/20 border border-solstice-terracotta text-solstice-terracotta flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-solstice-sumi">
              Dialogue Initiated
            </h3>
            <p className="text-xs text-solstice-sumi/80 font-sans leading-relaxed max-w-sm mx-auto">
              Principal Architects in Kyoto & Copenhagen will review your site geography and schedule an architectural consultation.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-full border border-solstice-stone text-solstice-sumi hover:border-solstice-terracotta transition-all text-xs font-sans uppercase"
            >
              RETURN TO ATELIER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
