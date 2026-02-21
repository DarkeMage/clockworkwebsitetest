import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onError }: { url: string; onError: (err: Error) => void }) {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    if (scene) {
      console.log('Model loaded:', scene);
      if (scene.children.length === 0) {
        console.warn('Model scene is empty');
      }
      // Ensure all materials are visible
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // Force side to double side if it's invisible
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.side = THREE.DoubleSide;
            }
          }
        }
      });
    }
  }, [scene]);

  if (!scene || scene.children.length === 0) {
    return (
      <Html center>
        <div className="text-silver/40 font-mono text-[10px] uppercase tracking-widest text-center">
          Empty Schematic <br/> 
          <span className="text-[8px] opacity-50">Verify .bin/textures are present</span>
        </div>
      </Html>
    );
  }

  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-silver/20 border-t-silver rounded-full animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-silver/40">Calibrating Optics...</span>
      </div>
    </Html>
  );
}

export default function ModelViewer({ url }: { url: string }) {
  const [error, setError] = useState<string | null>(null);
  const isGltf = url.toLowerCase().includes('.gltf');

  return (
    <div className="w-full h-[500px] relative border border-silver/10 bg-black/20 overflow-hidden">
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-burgundy bg-silver/80 px-4 py-2 mb-4">
            Transmission Error
          </div>
          <p className="text-silver/40 text-xs font-serif italic max-w-xs mb-4">
            {error.includes('fetch') 
              ? "The connection was blocked by the host's security policy (CORS)." 
              : "The mechanical schematic could not be rendered."}
          </p>
          {isGltf && (
            <div className="p-4 border border-silver/10 bg-black/40 mb-6 max-w-xs">
              <p className="text-[10px] text-silver/60 font-mono uppercase leading-relaxed">
                <span className="text-silver font-bold">Tech Note:</span> You are using a .gltf file. These often fail because they require separate .bin files. 
                <br/><br/>
                Please export as <span className="text-silver font-bold">.glb (Binary)</span> for a single-file solution.
              </p>
            </div>
          )}
          <button 
            onClick={() => window.location.reload()}
            className="font-mono text-[10px] uppercase tracking-widest text-silver/60 hover:text-silver underline"
          >
            Retry Sync
          </button>
        </div>
      ) : (
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <Suspense fallback={<Loader />}>
            <Stage 
              environment="city" 
              intensity={0.6} 
              adjustCamera={1.5} 
              shadows="contact"
            >
              <Model url={url} onError={(e) => setError(e.message)} />
            </Stage>
            <gridHelper args={[20, 20, 0x333333, 0x111111]} position={[0, -1, 0]} />
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.5} 
              enableZoom={true} 
              makeDefault 
            />
          </Suspense>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      )}
      
      {/* HUD Overlay */}
      {!error && (
        <>
          <div className="absolute top-4 left-4 pointer-events-none">
            <div className="font-mono text-[10px] uppercase tracking-widest text-silver/40">
              Model Status: <span className="text-silver">Active</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-silver/40 mt-1">
              Rotation: <span className="text-silver">Synchronized</span>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <div className="font-mono text-[8px] uppercase tracking-widest text-silver/20">
              Interactive Mechanical Schematic
            </div>
          </div>
        </>
      )}
    </div>
  );
}
