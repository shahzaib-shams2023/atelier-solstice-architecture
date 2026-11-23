import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type CeramicMaterial = 'travertine' | 'kyoto-clay' | 'obsidian' | 'carrara';

interface MonolithCanvasProps {
  timeOfDay?: number; // 6.0 to 20.5
  material?: CeramicMaterial;
  interactive?: boolean;
  className?: string;
}

export const MonolithCanvas: React.FC<MonolithCanvasProps> = ({
  timeOfDay = 15.0,
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

    // Test WebGL capability
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

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f2eb, 0.035);

    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 7.8);

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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. LIGHTING & HELIODON SETUP
    const ambientLight = new THREE.AmbientLight(0xfff6ee, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 3.0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xd9ebff, 0.5);
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    // 3. ARCHITECTURAL PLINTH & GROUND
    const plinthGroup = new THREE.Group();
    scene.add(plinthGroup);

    // Main Stepped Terrace Plinths
    const travertineGroundMat = new THREE.MeshStandardMaterial({
      color: 0xede6d8,
      roughness: 0.85,
      metalness: 0.04,
    });

    const groundBase = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.4, 12),
      travertineGroundMat
    );
    groundBase.position.set(0, -2.4, 0);
    groundBase.receiveShadow = true;
    plinthGroup.add(groundBase);

    const stepPlinth1 = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 0.35, 5.2),
      new THREE.MeshStandardMaterial({ color: 0xe5dfcf, roughness: 0.8, metalness: 0.05 })
    );
    stepPlinth1.position.set(0.4, -2.05, 0.2);
    stepPlinth1.receiveShadow = true;
    stepPlinth1.castShadow = true;
    plinthGroup.add(stepPlinth1);

    const stepPlinth2 = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.3, 3.6),
      new THREE.MeshStandardMaterial({ color: 0xdfd8c6, roughness: 0.78, metalness: 0.05 })
    );
    stepPlinth2.position.set(0.1, -1.75, 0.3);
    stepPlinth2.receiveShadow = true;
    stepPlinth2.castShadow = true;
    plinthGroup.add(stepPlinth2);

    // 4. SCULPTURAL MONOLITH & ORGANIC VESSEL
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Material definitions
    const materialsMap: Record<CeramicMaterial, THREE.MeshStandardMaterial> = {
      'kyoto-clay': new THREE.MeshStandardMaterial({
        color: 0x8a4b32,
        roughness: 0.88,
        metalness: 0.06,
        bumpScale: 0.05,
      }),
      'travertine': new THREE.MeshStandardMaterial({
        color: 0xe0d6c3,
        roughness: 0.72,
        metalness: 0.03,
      }),
      'obsidian': new THREE.MeshStandardMaterial({
        color: 0x18181a,
        roughness: 0.22,
        metalness: 0.65,
      }),
      'carrara': new THREE.MeshStandardMaterial({
        color: 0xf3f2ef,
        roughness: 0.42,
        metalness: 0.08,
      }),
    };

    // Brutalist Architectural Monolith Tower
    const towerGeo = new THREE.CylinderGeometry(0.85, 1.3, 3.4, 32, 1, false);
    // Add subtle twisting & architectural facet
    const pos = towerGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const fluting = Math.sin(angle * 8) * 0.08;
      const taper = 1.0 + (y / 3.4) * 0.15;
      pos.setX(i, pos.getX(i) * taper + Math.cos(angle) * fluting);
      pos.setZ(i, pos.getZ(i) * taper + Math.sin(angle) * fluting);
    }
    towerGeo.computeVertexNormals();

    const towerMesh = new THREE.Mesh(towerGeo, materialsMap[materialRef.current]);
    towerMesh.position.set(-0.6, 0.0, -0.2);
    towerMesh.castShadow = true;
    towerMesh.receiveShadow = true;
    sculptureGroup.add(towerMesh);

    // Companion Tactile Organic Ceramic Vessel (Lathe contour)
    const points: THREE.Vector2[] = [];
    const height = 2.2;
    const segments = 36;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * height;
      const r =
        0.35 +
        Math.sin(t * Math.PI) * 0.65 +
        Math.pow(1 - t, 2) * 0.15 -
        Math.pow(Math.abs(t - 0.65), 3) * 0.3;
      points.push(new THREE.Vector2(Math.max(0.12, r), y));
    }
    const vesselGeo = new THREE.LatheGeometry(points, 48);
    vesselGeo.computeVertexNormals();

    const vesselMesh = new THREE.Mesh(vesselGeo, materialsMap[materialRef.current]);
    vesselMesh.position.set(1.2, -0.65, 0.6);
    vesselMesh.rotation.y = Math.PI * 0.25;
    vesselMesh.castShadow = true;
    vesselMesh.receiveShadow = true;
    sculptureGroup.add(vesselMesh);

    // Cantilevered Architectural Balance Ring
    const torusGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xb85d3b,
      roughness: 0.5,
      metalness: 0.3,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-0.6, 0.4, -0.2);
    torusMesh.rotation.x = Math.PI * 0.42;
    torusMesh.rotation.y = Math.PI * 0.1;
    torusMesh.castShadow = true;
    sculptureGroup.add(torusMesh);

    // 5. VOLUMETRIC ATMOSPHERIC DUST MOTES
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: Math.random() * 0.004 + 0.001,
        z: (Math.random() - 0.5) * 0.002,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd99b52,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. INTERACTIVE DRAG & MOUSE PARALLAX
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0.2;
    let currentRotationY = 0.2;
    let targetRotationX = 0.05;
    let currentRotationX = 0.05;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallaxX = nx * 0.25;
      mouseParallaxY = ny * 0.15;

      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += deltaX * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch events for mobile/tablet
    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      prevMouseX = e.touches[0].clientX;
      targetRotationY += deltaX * 0.01;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // 7. HELIODON DYNAMICS UPDATE FUNCTION
    const updateHeliodon = (hour: number) => {
      // Hour ranges from 6.0 (dawn) to 20.0 (dusk)
      const dayFactor = Math.min(1, Math.max(0, (hour - 6.0) / 14.0));
      // Solar elevation angle in radians (0 at horizon, PI/2 at zenith noon)
      const elevation = Math.sin(dayFactor * Math.PI) * 1.15; // Max ~66 deg
      const azimuth = (dayFactor - 0.5) * Math.PI * 1.4; // Sweeps East to West

      const sunDistance = 11;
      const sunX = Math.sin(azimuth) * sunDistance;
      const sunY = Math.max(0.6, Math.sin(elevation) * sunDistance);
      const sunZ = Math.cos(azimuth) * sunDistance * 0.85;

      sunLight.position.set(sunX, sunY, sunZ);
      sunLight.target.position.set(0, -0.4, 0);
      sunLight.target.updateMatrixWorld();

      // Dynamic Color Temperature & Atmospheric Lighting
      if (hour < 8.5) {
        // Dawn: Warm amber golden light
        const t = (hour - 6.0) / 2.5;
        sunLight.color.setRGB(1.0, 0.62 + t * 0.25, 0.38 + t * 0.4);
        sunLight.intensity = 1.8 + t * 0.8;
        ambientLight.color.setRGB(0.98, 0.88, 0.82);
        ambientLight.intensity = 0.65;
        particleMat.color.setHex(0xffaa5e);
      } else if (hour <= 16.5) {
        // High Noon / Afternoon: Crisp architectural daylight
        sunLight.color.setRGB(1.0, 0.96, 0.9);
        sunLight.intensity = 3.0;
        ambientLight.color.setRGB(0.98, 0.96, 0.92);
        ambientLight.intensity = 0.85;
        particleMat.color.setHex(0xd99b52);
      } else if (hour <= 19.5) {
        // Golden Hour: Rich burnt terracotta & amber
        const t = (hour - 16.5) / 3.0;
        sunLight.color.setRGB(1.0, 0.68 - t * 0.25, 0.42 - t * 0.15);
        sunLight.intensity = 2.6 - t * 0.8;
        ambientLight.color.setRGB(0.95, 0.82, 0.75);
        ambientLight.intensity = 0.6;
        particleMat.color.setHex(0xc86d51);
      } else {
        // Dusk / Twilight: Cool slate twilight
        sunLight.color.setRGB(0.65, 0.6, 0.8);
        sunLight.intensity = 1.1;
        ambientLight.color.setRGB(0.8, 0.82, 0.9);
        ambientLight.intensity = 0.45;
        particleMat.color.setHex(0x71798e);
      }
    };

    // 8. ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update Heliodon with ref time
      updateHeliodon(timeRef.current);

      // Smooth inertia rotation & parallax
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      sculptureGroup.rotation.y = currentRotationY;
      sculptureGroup.rotation.x = currentRotationX;

      camera.position.x = Math.sin(mouseParallaxX) * 0.8;
      camera.position.y = 1.2 + mouseParallaxY * 0.5;
      camera.lookAt(0, -0.1, 0);

      // Subtle float on balance ring
      torusMesh.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 0.8) * 0.05;

      // Update materials dynamically if changed
      const activeMat = materialsMap[materialRef.current];
      if (towerMesh.material !== activeMat) {
        towerMesh.material = activeMat;
        vesselMesh.material = activeMat;
      }

      // Animate atmospheric dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.001;

        // Wrap around height
        if (positions[i * 3 + 1] > 3.5) {
          positions[i * 3 + 1] = -2.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [interactive]);

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center bg-solstice-panel/40 p-8 text-center ${className}`}>
        <div className="font-editorial text-2xl text-solstice-sumi mb-2">Architectural Monolith</div>
        <p className="font-sans text-xs text-solstice-sumi/70 max-w-sm">
          WebGL hardware acceleration disabled. Viewing static architectural representation in Kyoto Travertine.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor="DRAG 360°"
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};
