import React, { useMemo, useEffect, useState } from "react";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/core";
import { a, easings } from "@react-spring/three";

export default function Swarm({
  count,
  mouse,
  color,
  shadow,
  reflection,
  currentScene,
}) {
  const [acceleration, setAcceleration] = useState(5);
  const [currColor, setCurrColor] = useState(color);
  const [position, setPosition] = useState([1, 0, 0]);

  const mesh = useRef();
  const light = useRef();

  let sceneProps = useSpring({
    position: position,
    config: {
      mass: 3,
      tension: 100,
      friction: 100,
      precision: 0.0001,
      easing: easings.easeInOutQuart,
    },
  });
  console.log("[SWARM] current color is:", currColor);

  function SetSceneOptions(scene) {
    switch (scene) {
      case 1:
        setAcceleration(5);
        setCurrColor(color);
        setPosition([1, 0, 0]);
        break;
      case 2:
        setAcceleration(500);
        setCurrColor("#F7CA18");
        setPosition([1, -9, 0]);
        break;
      case 3:
        console.log("Swarm scene 3 triggered");
        setAcceleration(500);
        setCurrColor("#F7CA18");
        setPosition([1, -20, 0]);
        break;
    }
  }

  useEffect(() => {
    SetSceneOptions(currentScene);
    console.log("-----------SWARM USEE EFFECT-----------");
  }, [currentScene]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.001 + Math.random() / 200;
      const xFactor = -7 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -15 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / acceleration;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(0.15, 0.15, 0.15);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={1} intensity={0} color="#F7CA18" />
      <a.instancedMesh ref={mesh} args={[null, null, count]} {...sceneProps}>
        <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
        <meshPhongMaterial
          attach="material"
          color={currColor}
          emissive={shadow}
          specular={reflection}
          opacity={0.67}
          transparent
        />
      </a.instancedMesh>
    </>
  );
}
