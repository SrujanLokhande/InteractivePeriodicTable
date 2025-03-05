import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Element } from '../types/element';

interface AtomicModelProps {
  element: Element;
}

// Electron component that orbits around the nucleus
const Electron = ({ radius, speed, phase, shellIndex }: { radius: number; speed: number; phase: number; shellIndex: number }) => {
  const electronRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (electronRef.current) {
      const t = clock.getElapsedTime() * speed + phase;
      electronRef.current.position.x = radius * Math.cos(t);
      electronRef.current.position.z = radius * Math.sin(t);
    }
  });

  return (
    <Sphere ref={electronRef} args={[0.1, 16, 16]} position={[radius, 0, 0]}>
      <meshStandardMaterial color="#4299e1" emissive="#4299e1" emissiveIntensity={0.5} />
    </Sphere>
  );
};

// Electron shell component
const ElectronShell = ({ radius, electrons, shellIndex }: { radius: number; electrons: number; shellIndex: number }) => {
  return (
    <group>
      {/* Orbit path (semi-transparent ring) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 16, 100]} />
        <meshBasicMaterial color="#718096" transparent opacity={0.3} />
      </mesh>
      
      {/* Electrons in this shell */}
      {Array.from({ length: electrons }).map((_, i) => (
        <Electron 
          key={i} 
          radius={radius} 
          speed={0.5 / (shellIndex + 1)} 
          phase={(2 * Math.PI * i) / electrons}
          shellIndex={shellIndex}
        />
      ))}
    </group>
  );
};

// Camera adjustment to ensure proper sizing
const CameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Update camera and renderer when component mounts
    camera.position.set(0, 0, 10);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  
  return null;
};

// Main component for the 3D atomic model
const AtomicModelScene: React.FC<AtomicModelProps> = ({ element }) => {
  // Calculate nucleus size based on atomic number (for visualization purposes)
  const nucleusSize = 0.3 + (element.atomicNumber * 0.01);
  
  return (
    <>
      <CameraController />
      
      {/* Nucleus */}
      <Sphere args={[nucleusSize, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#ed8936" 
          emissive="#ed8936" 
          emissiveIntensity={0.5} 
          roughness={0.4} 
        />
      </Sphere>
      
      {/* Electron shells */}
      {element.electrons.map((electronCount, index) => (
        <ElectronShell 
          key={index} 
          radius={1 + index * 0.8} 
          electrons={electronCount}
          shellIndex={index}
        />
      ))}
      
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Point light */}
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  );
};

const AtomicModel: React.FC<AtomicModelProps> = ({ element }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
    >
      <AtomicModelScene element={element} />
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  );
};

export default AtomicModel;