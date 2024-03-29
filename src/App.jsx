import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import './App.css';

const Model = ({ path }) => {
  const gltf = useLoader(GLTFLoader, path);
  return <primitive object={gltf.scene} dispose={null} />;
};

const CameraControl = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const updateCameraPosition = (event) => {
      const { clientX, clientY } = event;

      // Adjust camera position based on the mouse position
      // Example calculation (you might want to refine this based on your needs)
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;

      // Adjust these values as needed
      camera.position.x = mouseX * 1;
      camera.position.y = mouseY * 1;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    window.addEventListener('mousemove', updateCameraPosition);

    return () => window.removeEventListener('mousemove', updateCameraPosition);
  }, [camera]);

  return null; // Since we're directly manipulating the camera, no JSX is needed
};

const ModelController = ({ path }) => {
  const modelRef = useRef();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const xRotation = (clientY / window.innerHeight) * 2 * Math.PI;
      const yRotation = (clientX / window.innerWidth) * 2 * Math.PI;
      setRotation({ x: xRotation, y: yRotation });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = rotation.x*0.1;
      modelRef.current.rotation.y = rotation.y*0.1;
    }
  });

  const gltf = useLoader(GLTFLoader, path);
  return <primitive ref={modelRef} object={gltf.scene} dispose={null} />;
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <Model path="/assets/sweater_black.glb" />
      {/* <CameraControl /> */}
      <OrbitControls enableZoom={false} />
      <Environment preset="forest" background={false} />
    </Canvas>
  );
};

export default App;
