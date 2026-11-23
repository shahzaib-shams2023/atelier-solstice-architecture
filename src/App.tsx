import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolarObservatory } from './components/SolarObservatory';
import { MaterialStudio } from './components/MaterialStudio';
import { ArchitecturalMonographs } from './components/ArchitecturalMonographs';
import { SpatialManifesto } from './components/SpatialManifesto';
import { CommissionDrawer } from './components/CommissionDrawer';
import { Footer } from './components/Footer';
import { CeramicMaterial } from './components/MonolithCanvas';

export function App() {
  const [timeOfDay, setTimeOfDay] = useState<number>(15.0); // 3:00 PM Afternoon
  const [material, setMaterial] = useState<CeramicMaterial>('kyoto-clay');
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling with Butter-Smooth Inertia
    const lenis = new Lenis({
      duration: 1.4,
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
    const el = document.getElementById('heliodon-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-solstice-bg text-solstice-sumi font-sans selection:bg-solstice-terracotta selection:text-solstice-surface relative">
      {/* Precision Trailing Magnetic Cursor */}
      <CustomCursor />

      {/* Architectural Navigation Bar */}
      <Navbar
        timeOfDay={timeOfDay}
        onOpenCommission={() => setIsCommissionOpen(true)}
      />

      {/* Main Spatial Narrative */}
      <main id="main-content">
        {/* Section 01: Hero Monolith & Monumental Editorial */}
        <Hero
          timeOfDay={timeOfDay}
          material={material}
          onExploreSunlight={scrollToSunlight}
          onOpenCommission={() => setIsCommissionOpen(true)}
        />

        {/* Section 02: Astronomical Heliodon & Solar Path Observatory */}
        <SolarObservatory
          timeOfDay={timeOfDay}
          onTimeChange={setTimeOfDay}
          material={material}
        />

        {/* Section 03: Tectonic Provenance & Material Archive */}
        <MaterialStudio
          currentMaterial={material}
          onMaterialChange={setMaterial}
        />

        {/* Section 04: Architectural Monographs & Built Sanctuaries */}
        <ArchitecturalMonographs />

        {/* Section 05: Philosophical Spatial Manifesto */}
        <SpatialManifesto />
      </main>

      {/* Section 06: Studio Colophon & Footprint */}
      <Footer />

      {/* Section 07: High-Fashion Architectural Commission Drawer */}
      <CommissionDrawer
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
}

export default App;
