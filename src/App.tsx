import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SunlightSimulator } from './components/SunlightSimulator';
import { MaterialStudio } from './components/MaterialStudio';
import { ArchitectureGallery } from './components/ArchitectureGallery';
import { CommissionDrawer } from './components/CommissionDrawer';
import { Footer } from './components/Footer';
import { CeramicMaterial } from './components/MonolithCanvas';

export function App() {
  const [timeOfDay, setTimeOfDay] = useState<number>(15.0); // 3:00 PM
  const [material, setMaterial] = useState<CeramicMaterial>('kyoto-clay');
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const scrollToSunlight = () => {
    const el = document.getElementById('sunlight-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-solstice-bg text-solstice-sumi font-sans selection:bg-solstice-terracotta selection:text-solstice-surface">
      <Navbar onOpenCommission={() => setIsCommissionOpen(true)} />

      <main id="main-content">
        <Hero
          timeOfDay={timeOfDay}
          material={material}
          onExploreSunlight={scrollToSunlight}
          onOpenCommission={() => setIsCommissionOpen(true)}
        />

        <SunlightSimulator
          timeOfDay={timeOfDay}
          onTimeChange={setTimeOfDay}
          material={material}
        />

        <MaterialStudio
          currentMaterial={material}
          onMaterialChange={setMaterial}
        />

        <ArchitectureGallery />
      </main>

      <Footer />

      <CommissionDrawer
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
}

export default App;
