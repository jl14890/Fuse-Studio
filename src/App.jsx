import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { useStore } from './store';


import './App.css';

const Model = ({ path }) => {
  const gltf = useLoader(GLTFLoader, path);
  const store = useStore(); // Use the store

  // Event handlers to show/hide the overlay
  const handlePointerOver = () => store.open = true;
  const handlePointerOut = () => store.open = false;

  return (
    <primitive
      object={gltf.scene}
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
};

const App = () => {

  const store = useStore(); // Use the store

  // Toggle function for the button
  const toggleOverlay = () => {
    store.open = !store.open; // Toggle between true and false
    console.log('Overlay open:', store.open);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 1], fov: 75, }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <Model path="public/assets/hoodie_black.glb" />
        <OrbitControls enableZoom={false} />
        <Environment preset="forest" background={false} />
      </Canvas>
      <button onClick={toggleOverlay} style={{ position: 'absolute', top: '20px', left: '20px' }}>
        Toggle Overlay
      </button>
    </>
  );

};

export default App;
