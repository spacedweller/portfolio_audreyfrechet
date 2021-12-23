
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree} from "@react-three/fiber"
import { Html, OrbitControls, Icosahedron, Environment, Sky,  MeshDistortMaterial, useTexture, useCubeTexture, ContactShadows, CameraShake} from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette} from '@react-three/postprocessing'
import Overlay from './components/Overlay.js'
import Particles from './objects/particles'
import Mermaid from './objects/mermaid'
import Bubbles from './objects/bubbles'
import Swarm from './objects/swarm'



export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mouse = useRef([0, 0])
  const colorTheme = "#01524D"



  return (
    <>
       <Overlay/>
      <Canvas dpr={[1,2]} camera={{position: [0, -2, 4], fov: 40}} gl={{ powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false}} >
          <Suspense fallback={<Html center>Loading..</Html>}>
          

        <color attach="background" args={["#01524D"]} />
        <fog color={colorTheme} attach="fog" near={8} far={30} />
        <ambientLight color={colorTheme} intensity={1}/>
          <Mermaid/>
          <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Swarm count={isMobile ? 5000 : 10000} mouse={mouse} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Environment  preset="city" />
        <OrbitControls />
        
        <EffectComposer>
          <DepthOfField focusDistance={0.1} focalLength={0.5} bokehScale={1} height={480} />
          <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.9} />
          <Noise opacity={0.05} />
          <Vignette darkness={3} eskil={true}/>
          <Vignette darkness={0.5}/>
        </EffectComposer>
        
        </Suspense>

      </Canvas>
    </>
  );
}
