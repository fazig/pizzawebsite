"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PizzaModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const toppings = [
    { pos: [0.8, 0.15, 0.3] as [number, number, number], color: "#c0392b", size: 0.12 },
    { pos: [-0.5, 0.15, 0.6] as [number, number, number], color: "#c0392b", size: 0.1 },
    { pos: [0.2, 0.15, -0.7] as [number, number, number], color: "#c0392b", size: 0.11 },
    { pos: [-0.7, 0.15, -0.3] as [number, number, number], color: "#27ae60", size: 0.08 },
    { pos: [0.5, 0.15, -0.4] as [number, number, number], color: "#27ae60", size: 0.09 },
    { pos: [0, 0.15, 0.8] as [number, number, number], color: "#f39c12", size: 0.1 },
    { pos: [-0.3, 0.15, 0.1] as [number, number, number], color: "#f1c40f", size: 0.07 },
    { pos: [0.6, 0.15, -0.1] as [number, number, number], color: "#e74c3c", size: 0.09 },
  ];

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.15, 64]} />
        <meshStandardMaterial color="#d4a056" roughness={0.8} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.08, 64]} />
        <meshStandardMaterial color="#e74c3c" roughness={0.6} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.05, 2.05, 0.06, 64]} />
        <meshStandardMaterial color="#f5deb3" roughness={0.4} metalness={0.1} />
      </mesh>

      {toppings.map((t, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={t.pos}>
            <sphereGeometry args={[t.size, 16, 16]} />
            <meshStandardMaterial color={t.color} roughness={0.5} />
          </mesh>
        </Float>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[2.05, 0.18, 16, 64]} />
        <meshStandardMaterial color="#c8860a" roughness={0.7} />
      </mesh>
    </group>
  );
}

const FLOATING_PARTICLES = [
  { id: 0, x: -2.1, y: 0.4, z: 1.8, size: 0.05, speed: 1.2 },
  { id: 1, x: 1.5, y: 1.2, z: -2.3, size: 0.04, speed: 1.5 },
  { id: 2, x: -0.8, y: 0.1, z: 2.5, size: 0.06, speed: 1.8 },
  { id: 3, x: 2.4, y: 0.8, z: -1.1, size: 0.035, speed: 1.1 },
  { id: 4, x: -2.8, y: 1.5, z: 0.6, size: 0.045, speed: 1.6 },
  { id: 5, x: 0.9, y: -0.5, z: -2.7, size: 0.055, speed: 1.3 },
  { id: 6, x: 2.0, y: 0.3, z: 1.2, size: 0.04, speed: 1.7 },
  { id: 7, x: -1.6, y: 1.8, z: -0.9, size: 0.05, speed: 1.4 },
  { id: 8, x: 1.1, y: 0.6, z: 2.1, size: 0.035, speed: 1.9 },
  { id: 9, x: -2.4, y: -0.2, z: -1.8, size: 0.06, speed: 1.2 },
  { id: 10, x: 2.7, y: 1.1, z: 0.4, size: 0.045, speed: 1.5 },
  { id: 11, x: -0.5, y: 1.4, z: -2.5, size: 0.05, speed: 1.8 },
];

function FloatingParticles() {
  return (
    <>
      {FLOATING_PARTICLES.map((p) => (
        <Float key={p.id} speed={p.speed} floatIntensity={1.5}>
          <Sphere args={[p.size, 8, 8]} position={[p.x, p.y, p.z]}>
            <meshStandardMaterial
              color={["#ff6b2c", "#ff2d2d", "#f1c40f", "#27ae60"][p.id % 4]}
              emissive={["#ff6b2c", "#ff2d2d", "#f1c40f", "#27ae60"][p.id % 4]}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ff6b2c" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#ff2d2d" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#fff5e6"
      />
      <PizzaModel />
      <FloatingParticles />
    </>
  );
}

interface Pizza3DProps {
  className?: string;
}

export function Pizza3D({ className }: Pizza3DProps) {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 3, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export function Pizza3DSmall({ className }: Pizza3DProps) {
  return (
    <div className={className}>
      <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-white/5" />}>
        <Canvas camera={{ position: [0, 2, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b2c" />
          <PizzaModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
