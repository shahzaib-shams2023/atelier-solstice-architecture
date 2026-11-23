import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type CeramicMaterial = 'travertine' | 'kyoto-clay' | 'obsidian' | 'carrara';

interface MonolithCanvasProps {
  timeOfDay?: number; // 6.0 to 20.0 hours
  material?: CeramicMaterial;
  interactive?: boolean;
  className?: string;
}

export const MonolithCanvas: React.FC<MonolithCanvasProps> = ({
  timeOfDay = 14.5, // 2:30 PM by default
  material = 'kyoto-clay',
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const timeRef = useRef<number>(timeOfDay);
  const materialRef = useRef<CeramicMaterial>(material);

  timeRef.current = timeOfDay;
  materialRef.current = material;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf6f3eb, 0.04);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // AMBIENT SKY LIGHT
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.7);
    scene.add(ambientLight);

    // DYNAMIC SUNLIGHT (DIRECTIONAL LIGHT WITH SHADOWS)
    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // GROUND ARCHITECTURAL PLINTH / PEDESTAL
    const plinthGeo = new THREE.BoxGeometry(4.2, 0.4, 3.2);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0xede6d6,
      roughness: 0.9,
      metalness: 0.05,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(0, -1.8, 0);
    plinth.receiveShadow = true;
    scene.add(plinth);

    // CERAMIC MONOLITHIC SCULPTURAL VESSEL
    // High-resolution lathe geometry creating organic sculptural silhouette
    const points: THREE.Vector2[] = [];
    const height = 2.8;
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * height;
      // Elegant organic wabi-sabi amphora contour
      const r = 0.28 + Math.sin(t * Math.PI) * 0.92 - Math.pow(t - 0.4, 2) * 0.45;
      points.push(new THREE.Vector2(Math.max(0.15, r), y));
    }
    const vesselGeo = new THREE.LatheGeometry(points, 64);
    vesselGeo.computeVertexNormals();

    const getMaterialConfig = (mat: CeramicMaterial) => {
      switch (mat) {
        case 'travertine':
          return { color: 0xe8dfcf, roughness: 0.92, metalness: 0.02, name: 'Raw Travertine' };
        case 'obsidian':
          return { color: 0x22252a, roughness: 0.45, metalness: 0.25, name: 'Obsidian Basalt' };
        case 'carrara':
          return { color: 0xf6f6f8, roughness: 0.35, metalness: 0.1, name: 'Bianco Carrara' };
        case 'kyoto-clay':
        default:
          return { color: 0xc86d51, roughness: 0.82, metalness: 0.05, name: 'Kyoto Terracotta' };
      }
    };

    const currentConfig = getMaterialConfig(materialRef.current);
    const vesselMat = new THREE.MeshStandardMaterial({
      color: currentConfig.color,
      roughness: currentConfig.roughness,
      metalness: currentConfig.metalness,
    });

    const vesselMesh = new THREE.Mesh(vesselGeo, vesselMat);
    vesselMesh.position.set(0, -0.2, 0);
    vesselMesh.castShadow = true;
    vesselMesh.receiveShadow = true;
    scene.add(vesselMesh);

    // Secondary minimal architectural monolith companion
    const cubeGeo = new THREE.BoxGeometry(0.7, 1.2, 0.7);
    const companionMesh = new THREE.Mesh(cubeGeo, vesselMat);
    companionMesh.position.set(-1.4, -1.0, 0.3);
    companionMesh.rotation.y = 0.45;
    companionMesh.castShadow = true;
    companionMesh.receiveShadow = true;
    scene.add(companionMesh);

    // MOUSE & DRAG ROTATION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const targetRotation = { y: 0.2, x: 0.05 };
    const currentRotation = { y: 0.2, x: 0.05 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging && interactive) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.005;
        targetRotation.x = Math.max(-0.3, Math.min(0.4, targetRotation.x));
        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ANIMATION & SUNLIGHT CALCULATION LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth damping
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;

      vesselMesh.rotation.y = currentRotation.y;
      vesselMesh.rotation.x = currentRotation.x;
      companionMesh.rotation.y = currentRotation.y + 0.45;

      // SUN POSITION & COLOR BY TIME OF DAY (6.0 to 20.0)
      const hour = timeRef.current;
      // Solar angle: 6:00 is sunrise (east), 12:00 is zenith (south), 18:00 is sunset (west)
      const sunProgress = (hour - 6.0) / 14.0; // 0 to 1
      const sunAngle = (sunProgress - 0.5) * Math.PI; // -PI/2 to PI/2

      const sunX = Math.sin(sunAngle) * 7;
      const sunY = Math.cos(sunAngle) * 5 + 0.8;
      const sunZ = Math.cos(sunAngle * 0.8) * 4;

      sunLight.position.set(sunX, sunY, sunZ);

      // Sun color shifts from warm amber to neutral daylight to golden sunset to dusk
      if (hour < 8.5) {
        // Dawn warmth
        sunLight.color.setHex(0xffaa66);
        sunLight.intensity = 1.8;
        ambientLight.color.setHex(0xfce7d2);
      } else if (hour < 16.5) {
        // Midday clean light
        sunLight.color.setHex(0xfff6eb);
        sunLight.intensity = 2.6;
        ambientLight.color.setHex(0xffffff);
      } else if (hour < 18.8) {
        // Golden hour
        sunLight.color.setHex(0xff8833);
        sunLight.intensity = 2.2;
        ambientLight.color.setHex(0xfad2b0);
      } else {
        // Twilight dusk
        sunLight.color.setHex(0x7788aa);
        sunLight.intensity = 1.2;
        ambientLight.color.setHex(0xccd5e5);
      }

      // DYNAMIC MATERIAL CONFIGURATION
      const matConfig = getMaterialConfig(materialRef.current);
      if (vesselMat.color.getHex() !== matConfig.color) {
        vesselMat.color.setHex(matConfig.color);
        vesselMat.roughness = matConfig.roughness;
        vesselMat.metalness = matConfig.metalness;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 plinth-panel rounded-3xl text-center ${className}`}>
        <div className="w-36 h-36 rounded-full border border-solstice-terracotta/40 flex items-center justify-center mb-3">
          <span className="font-editorial text-lg text-solstice-terracotta">Solstice Vessel</span>
        </div>
        <p className="text-xs text-solstice-sumi/70 font-sans">WebGL unavailable. Fallback tactile plates active.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Ceramic Monolith under Real-Time Solar Angle Simulation"
    />
  );
};
