import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Html } from '@react-three/drei';

function Model({ url, onError }: { url: string; onError: (err: Error) => void }) {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (error) {
    onError(error as Error);
    return null;
  }
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-silver/20 border-t-silver rounded-full animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-silver/40">Initializing Atelier...</span>
      </div>
    </Html>
  );
}

export default function ModelViewer({ url }: { url: string }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full h-[500px] relative border border-silver/10 bg-black/20 overflow-hidden">
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-burgundy bg-silver/80 px-4 py-2 mb-4">
            Transmission Error
          </div>
          <p className="text-silver/40 text-xs font-serif italic max-w-xs">
            The mechanical schematic could not be retrieved. Please verify the connection to the archive.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 font-mono text-[10px] uppercase tracking-widest text-silver/60 hover:text-silver underline"
          >
            Retry Sync
          </button>
        </div>
      ) : (
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Stage environment="city" intensity={0.5}>
              <Model url={url} onError={(e) => setError(e.message)} />
            </Stage>
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.5} 
              enableZoom={true} 
              makeDefault 
              minPolarAngle={Math.PI / 4} 
              maxPolarAngle={Math.PI / 1.5} 
            />
          </Suspense>
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
