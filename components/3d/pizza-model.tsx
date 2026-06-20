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

function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 6,
    y: Math.random() * 3 - 1,
    z: (Math.random() - 0.5) * 6,
    size: 0.03 + Math.random() * 0.05,
    color: ["#ff6b2c", "#ff2d2d", "#f1c40f", "#27ae60"][i % 4],
  }));

  return (
    <>
      {particles.map((p) => (
        <Float key={p.id} speed={1 + Math.random()} floatIntensity={1.5}>
          <Sphere args={[p.size, 8, 8]} position={[p.x, p.y, p.z]}>
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
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
