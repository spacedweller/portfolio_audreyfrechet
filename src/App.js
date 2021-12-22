import * as THREE from 'three';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree, } from "@react-three/fiber"
import { useResource } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { OrbitControls, Icosahedron, Environment,  MeshDistortMaterial, useTexture, useCubeTexture, ContactShadows, CameraShake} from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import Overlay from './components/Overlay.js'
import Effects from './Effects'
import Particles from './Particles'




function MainSphere({ material }) {
  const main = useRef()
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime()
    main.current.rotation.y = THREE.MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1)
    main.current.rotation.x = THREE.MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1)
  })
  return <Icosahedron args={[1, 4]} ref={main} material={material} position={[0, 0, 0]} />
}

function Instances({ material }) {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => [])
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ]
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el) => {
      el.position.y += 0.02
      if (el.position.y > 19) el.position.y = -18
      el.rotation.x += 0.06
      el.rotation.y += 0.06
      el.rotation.z += 0.02
    })
  })
  return (
    <>
 
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  )
}

function Bubbles() {
  const bumpMap = useTexture('/bump.jpg')
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cube/' })
  // We use `useResource` to be able to delay rendering the spheres until the material is ready

  return (
    <>
      <Instances />
      
    </>
  )
}



function Mermaid({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mermaid2.glb')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.position.y = (0 + Math.sin(t / 4)) / 30

    group.current.rotation.x = (Math.sin(t / 3)) / 40
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Merged_sirene_68_copy.geometry}
        material={materials['Default OBJ']}
        position={[0, 0, 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

const Scene = ({newMaterialOpt}) => {
  const {
    scene, camera, 
    gl: {domElement}
  } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(0xf1f1f1);
    scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
    camera.fov = 50;
  }, [])
  return ( <> </>)
}


export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mouse = useRef([0, 0])

  return (
    <Suspense fallback={<span>loading...</span>}>
       <Overlay/>
      <Canvas dpr={[1,2]} camera={{position: [0, -2, 4], fov: 40}} gl={{ powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false}} >
        <color attach="background" args={['#01524D']} />
        <fog color="#01524D" attach="fog" near={8} far={30} />
        <ambientLight intensity={0.01}/>
          <Mermaid/>
          <Bubbles />
          <Particles count={isMobile ? 0 : 10000} mouse={mouse} />
          <Environment  preset="city" />
        <OrbitControls />
        <Effects/>
      </Canvas>
    </Suspense>
  );
}
