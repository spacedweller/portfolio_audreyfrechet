import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function MainSphere({ material, position }) {
  const main = useRef();
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime();
    main.current.rotation.y = THREE.MathUtils.lerp(
      main.current.rotation.y,
      mouse.x * Math.PI,
      0.1
    );
    main.current.rotation.x = THREE.MathUtils.lerp(
      main.current.rotation.x,
      mouse.y * Math.PI,
      0.1
    );
  });
  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={position}
    />
  );
}

function Instances({ material }) {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [0, 30, 0],
    [1, 30, 0],
    [2, 30, 0],
    [-1, 30, 0],
  ];

  // smaller spheres movement

  return (
    <>
      {/* <MainSphere material={material} /> */}
      {initialPositions.map((pos, i) => (
        <Icosahedron
          key={i}
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  );
}

export default function BubblesB({ color, shadow, reflection, currentScene }) {
  const bumpMap = useTexture("/bump.jpg");
  const textur = useTexture("/about/photo_cv2.png");
  const envMap = useCubeTexture(
    [
      "photo_cv2.png",
      "photo_cv22.png",
      "photo_cv23.png",
      "photo_cv24.png",
      "photo_cv25.png",
      "photo_cv26.png",
    ],
    { path: "/about/" }
  );

  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      {currentScene === 3 ? (
        <>
          <MeshDistortMaterial
            ref={set}
            envMap={envMap}
            bumpMap={bumpMap}
            color={color ? color : "#010101"}
            roughness={0.1}
            metalness={0}
            bumpScale={0.003}
            clearcoat={0}
            clearcoatRoughness={1}
            radius={0.05}
            distort={0.1}
            opacity={0.67}
            emissive={shadow}
            specular={reflection}
          />
          {material && <Instances material={material} />}
          <pointLight position={[0, -1.75, 5]} intensity={3} />
          <MainSphere material={material} position={[0, -1.75, 3.5]} />
        </>
      ) : null}
    </>
  );
}
