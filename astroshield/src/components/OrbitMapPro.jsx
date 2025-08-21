// src/components/OrbitMapPro.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as satellite from "satellite.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EARTH_RADIUS_KM = 6371;
const EARTH_RADIUS_UNITS = 1.0;
const KM_TO_UNITS = EARTH_RADIUS_UNITS / EARTH_RADIUS_KM;

const TEXTURES = {
  earthDiffuse:
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg",
  earthNight:
    "https://raw.githubusercontent.com/pmndrs/drei-assets/master/textures/earth-night.jpg",
};

export default function OrbitMapPro({
  height = 600,
  debrisCount = 800,
  showNightLights = true,
  lockScrollOnHover = true,
}) {
  const mountRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const [tleData, setTleData] = useState([]);

  /** Parse TLE */
  const parseTLE = (text) => {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    const sats = [];
    for (let i = 0; i < lines.length; i += 3) {
      if (lines[i + 1] && lines[i + 2]) {
        sats.push({
          name: lines[i],
          l1: lines[i + 1],
          l2: lines[i + 2],
          color: new THREE.Color().setHSL(Math.random(), 1, 0.6),
        });
      }
    }
    return sats.slice(-1000);
  };

  /** Load TLE */
  useEffect(() => {
    async function loadTLE() {
      try {
        const res = await fetch("/tle.txt");
        const text = await res.text();
        setTleData(parseTLE(text));
      } catch (err) {
        console.error("Failed to load TLE:", err);
      }
    }
    loadTLE();
  }, []);

  /** Three.js scene */
  useEffect(() => {
    if (!tleData.length) return;
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    // ✅ Pure black background
    scene.background = new THREE.Color(0x000000);

    /** Camera */
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      20000
    );
    camera.position.set(0, 2.2, 3.8);

    /** Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /** Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    if (lockScrollOnHover) {
      renderer.domElement.addEventListener("wheel", (e) => e.preventDefault(), {
        passive: false,
      });
    }

    /** Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    /** Earth */
    const loader = new THREE.TextureLoader();
    const texDiffuse = loader.load(TEXTURES.earthDiffuse);
    const texNight = showNightLights ? loader.load(TEXTURES.earthNight) : null;

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.MeshPhongMaterial({
        map: texDiffuse,
        emissiveMap: texNight || null,
        emissiveIntensity: texNight ? 0.7 : 0,
        emissive: texNight
          ? new THREE.Color(0xffffff)
          : new THREE.Color(0x000000),
        shininess: 10,
      })
    );
    scene.add(earth);

    // 🌌 Atmosphere glow
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x4abcf7,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      })
    );
    scene.add(atmosphere);

    /** 🌟 Stars background */
    const starPositions = [];
    for (let i = 0; i < 5000; i++) {
      const r = 200; // big sphere radius
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /** Random debris (particles) */
    const debrisPositions = [];
    for (let i = 0; i < debrisCount; i++) {
      const altKm = 400 + Math.random() * 1100;
      const rUnits = (EARTH_RADIUS_KM + altKm) * KM_TO_UNITS;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      debrisPositions.push(
        rUnits * Math.sin(phi) * Math.cos(theta),
        rUnits * Math.sin(phi) * Math.sin(theta),
        rUnits * Math.cos(phi)
      );
    }

    const debrisGeo = new THREE.BufferGeometry();
    debrisGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(debrisPositions, 3)
    );

    const debrisMat = new THREE.PointsMaterial({
      size: 0.018,
      opacity: 0.9,
      transparent: true,
      color: 0xffe9a3,
    });

    const debris = new THREE.Points(debrisGeo, debrisMat);
    scene.add(debris);

    /** Satellites */
    const sats = [];
    tleData.forEach((sat) => {
      const rec = satellite.twoline2satrec(sat.l1, sat.l2);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 12, 12),
        new THREE.MeshStandardMaterial({
          color: sat.color,
          emissive: sat.color,
          emissiveIntensity: 1.0,
        })
      );
      mesh.userData = { name: sat.name, rec, color: sat.color };
      scene.add(mesh);
      sats.push(mesh);
    });

    /** Tooltip */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tip = document.createElement("div");
    tip.style.position = "absolute";
    tip.style.padding = "6px 10px";
    tip.style.background = "rgba(30, 30, 30, 0.6)";
    tip.style.backdropFilter = "blur(6px)";
    tip.style.border = "1px solid rgba(255,255,255,0.2)";
    tip.style.borderRadius = "8px";
    tip.style.color = "#fff";
    tip.style.fontSize = "13px";
    tip.style.boxShadow = "0 0 8px rgba(0,200,255,0.6)";
    tip.style.pointerEvents = "none";
    tip.style.display = "none";
    container.style.position = "relative";
    container.appendChild(tip);

    /** Orbit trail */
    let activeTrail = null;
    const makeTrail = (rec, color) => {
      const positions = [];
      const samples = 180;
      const period = (2 * Math.PI) / rec.no;
      const step = (period * 60) / samples;
      const epoch = new Date();

      for (let i = 0; i < samples; i++) {
        const t = new Date(epoch.getTime() + i * step * 1000);
        const pv = satellite.propagate(rec, t);
        if (pv.position) {
          positions.push(
            pv.position.x * KM_TO_UNITS,
            pv.position.y * KM_TO_UNITS,
            pv.position.z * KM_TO_UNITS
          );
        }
      }

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      return new THREE.Line(
        trailGeo,
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.6,
        })
      );
    };

    /** Mouse move */
    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(sats);
      if (hit.length > 0) {
        tip.textContent = hit[0].object.userData.name;
        tip.style.left = e.clientX - rect.left + 12 + "px";
        tip.style.top = e.clientY - rect.top + 12 + "px";
        tip.style.display = "block";
      } else {
        tip.style.display = "none";
      }
    };

    /** Click = orbit trail */
    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(sats);
      if (hit.length > 0) {
        const sat = hit[0].object.userData;
        if (activeTrail) scene.remove(activeTrail);
        activeTrail = makeTrail(sat.rec, sat.color);
        scene.add(activeTrail);
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    /** Resize */
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    /** Animate */
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      earth.rotation.y += 0.0005;
      atmosphere.rotation.y += 0.0005;

      // 🌌 twinkle stars slowly
      stars.rotation.y += 0.00005;

      // 🛰 debris drift slowly
      debris.rotation.y += 0.0002;
      debris.rotation.x += 0.00005;

      const now = new Date();
      sats.forEach((mesh) => {
        const pv = satellite.propagate(mesh.userData.rec, now);
        if (pv.position) {
          mesh.position.set(
            pv.position.x * KM_TO_UNITS,
            pv.position.y * KM_TO_UNITS,
            pv.position.z * KM_TO_UNITS
          );
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /** Cleanup */
    cleanupRef.current = () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      container.removeChild(renderer.domElement);
      container.removeChild(tip);
      renderer.dispose();
    };

    return () => cleanupRef.current();
  }, [tleData, debrisCount, showNightLights, lockScrollOnHover]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 0 30px rgba(0,0,0,0.6)",
      }}
    />
  );
}
