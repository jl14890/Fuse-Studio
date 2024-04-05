import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

import * as THREE from 'three';

import { useStore } from './store';

import './App.css';

const PreloadModels = () => {
  const { models } = useStore();

  // Log the model paths to ensure they are defined
  console.log("Model Paths:", models);

  // Preload each model. Ensure that the paths are defined and correct.
  // Note: These variables are not directly used, but calling useLoader will cache them.
  try {
    const hoodieBlackModel = useLoader(GLTFLoader, models.hoodieBlack);
    const hoodieWhiteModel = useLoader(GLTFLoader, models.hoodieWhite);
    const sweaterBlackModel = useLoader(GLTFLoader, models.sweaterBlack);
    const sweaterWhiteModel = useLoader(GLTFLoader, models.sweaterWhite);
  } catch (error) {
    // console.error("Error preloading models:", error);
  }

  return null; // This component does not render anything
};

const Model = ({ path }) => {
  const gltf = useLoader(GLTFLoader, path);
  const [flipped, setFlipped] = useState(false);

  // The spring will store the animated value
  const { rotation } = useSpring({
    rotation: flipped ? Math.PI : 0,
    config: { tension: 150, friction: 12 },
  });

  const onPointerOver = () => (document.body.style.cursor = 'pointer');
  const onPointerOut = () => (document.body.style.cursor = 'auto');

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [gltf.scene]);

  return (
    <a.mesh
      onClick={() => setFlipped(!flipped)}
      rotation-y={rotation}
      onPointerOver={onPointerOver} // Change cursor to pointer when mouse over
      onPointerOut={onPointerOut} // Change cursor back to default when mouse out
    >
      <primitive object={gltf.scene} dispose={null} />
    </a.mesh>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const mouse = useThree((state) => state.mouse);
  const targetPosition = useRef(new THREE.Vector3());
  const target = new THREE.Vector3(0, 0.05, 0);
  const radius = 3.5;

  useFrame(() => {
    // Calculate target theta and phi based on mouse movement
    const targetTheta = mouse.x * Math.PI * 0.15;
    const targetPhi = mouse.y * Math.PI * 0.15;

    // Calculate desired position based on spherical coordinates
    targetPosition.current.x = -Math.sin(targetTheta) * Math.cos(targetPhi) * radius;
    targetPosition.current.y = -Math.sin(targetPhi) * radius;
    targetPosition.current.z = Math.cos(targetTheta) * Math.cos(targetPhi) * radius;

    // Interpolate camera position towards target position for a damping effect
    camera.position.lerp(targetPosition.current, 0.05); // Adjust the 0.1 factor to control the damping effect

    camera.lookAt(target);
  });

  return null;
};

const App = () => {
  const store = useStore(); // Use the store

  // Adjust the style based on store.open
  const appStyle = {
    opacity: store.open ? 0.2 : 1, // Dim the app when overlay is open
    filter: store.open ? 'blur(8px)' : 'none', // Apply blur when overlay is open
    transition: 'opacity 0.5s ease, filter 0.5s ease', // Smooth transition for opacity and filter changes
  };


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          style={appStyle}
          camera={{ fov: 20 }}
          shadows // Enable shadow map for the Canvas
        >
          <PreloadModels /> {/* Invoke the preloader */}

          {/* <ambientLight intensity={1} /> */}
          <directionalLight
            position={[1, 1, 5]} // Adjust the light position as needed
            intensity={3}
            castShadow // Enable shadows for this light
            shadow-mapSize-width={4096} // Default is 512
            shadow-mapSize-height={4096} // Default is 512
            shadow-radius={50} // Adjust for softer shadows
          />
          <Model path={store.modelPath} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <Environment preset="forest" background={false} />
          <CameraController />
          <Plane
            receiveShadow // The plane can receive shadows
            // rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
            position={[0, 0, -0.2]} // Adjust the position as needed
            args={[100, 100]} // Size of the plane, can be adjusted
          >
            <meshStandardMaterial attach="material" color="white" />
          </Plane>
        </Canvas>
      </Suspense>
    </>
  );

};

export default App;
