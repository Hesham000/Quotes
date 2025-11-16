import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Simple Three.js scene with floating hearts for a romantic background
export function LoveBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    // Deep purple fog to blend with purple gradient
    scene.fog = new THREE.Fog(0x1f0b3a, 12, 70);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xb39ddb, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xce93d8, 1.2);
    pointLight.position.set(8, 14, 12);
    scene.add(pointLight);

    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x, y + 0.5);
    heartShape.bezierCurveTo(x, y + 0.5, x - 0.8, y + 1.5, x - 2, y + 1.5);
    heartShape.bezierCurveTo(x - 3.5, y + 1.5, x - 3.5, y - 0.5, x - 3.5, y - 0.5);
    heartShape.bezierCurveTo(x - 3.5, y - 2.5, x - 1.5, y - 3, x, y - 4);
    heartShape.bezierCurveTo(x + 1.5, y - 3, x + 3.5, y - 2.5, x + 3.5, y - 0.5);
    heartShape.bezierCurveTo(x + 3.5, y - 0.5, x + 3.5, y + 1.5, x + 2, y + 1.5);
    heartShape.bezierCurveTo(x + 0.8, y + 1.5, x, y + 0.5, x, y + 0.5);

    const geometry = new THREE.ShapeGeometry(heartShape);
    geometry.scale(0.18, 0.18, 0.18);

    const colors = [0xb39ddb, 0xce93d8, 0x9575cd, 0xd1c4e9];
    const hearts = [];

    // Arrange hearts in horizontal "wave" rows
    const rows = 6;
    const cols = 12;
    const widthSpan = 28;
    const heightSpan = 12;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const material = new THREE.MeshPhongMaterial({
          color: colors[(row * cols + col) % colors.length],
          shininess: 90,
          specular: 0xffffff,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);

        const tX = (col / (cols - 1)) * widthSpan - widthSpan / 2;
        const tY = (row / (rows - 1)) * heightSpan - heightSpan / 2;

        const baseX = tX + (Math.random() - 0.5) * 1.0;
        const baseY = tY + (Math.random() - 0.5) * 0.8;

        mesh.position.x = baseX;
        mesh.position.y = baseY;
        mesh.position.z = (Math.random() - 0.5) * 14;
        mesh.rotation.z = Math.random() * Math.PI;

        const scale = 0.7 + Math.random() * 0.7;
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        hearts.push({
          mesh,
          baseX,
          baseY,
          row,
          col,
          waveOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      hearts.forEach((h) => {
        // Gentle rotation
        h.mesh.rotation.y += 0.004;
        h.mesh.rotation.x += 0.0015;

        // Heart waves: move in sine waves across rows
        const waveSpeed = 0.7;
        const waveAmplitudeY = 0.6;
        const waveAmplitudeX = 0.5;

        const wavePhase =
          elapsed * waveSpeed + h.col * 0.25 + h.row * 0.35 + h.waveOffset;

        h.mesh.position.y = h.baseY + Math.sin(wavePhase) * waveAmplitudeY;
        h.mesh.position.x = h.baseX + Math.cos(wavePhase * 0.8) * waveAmplitudeX;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      hearts.forEach((h) => {
        scene.remove(h.mesh);
        h.mesh.geometry.dispose();
        h.mesh.material.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}


