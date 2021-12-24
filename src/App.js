import React, { useRef,  Suspense } from 'react'
import { Canvas, extend} from "@react-three/fiber"
import { Html, OrbitControls, Environment, Effects } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette} from '@react-three/postprocessing'
import Overlay from './components/Overlay.js'
import Mermaid from './objects/mermaid'
import Bubbles from './objects/bubbles'
import Swarm from './objects/swarm'
import CustomEffects from './CustomEffects'

import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";

import { WaterPass } from "./post/Waterpass";

extend({ WaterPass, BloomPass });


export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mouse = useRef([0, 0])
  const colorTheme = "#01524D"

  return (
    <>
      <Overlay/>
      <Canvas dpr={[1,2]} camera={{position: [0, -2, 4], fov: 40}} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false}} >
        <Suspense fallback={<Html center>Loading..</Html>}>
          <color attach="background" args={["#01524D"]} />
          <fog color={colorTheme} attach="fog" near={8} far={30} />
          <ambientLight color={colorTheme} intensity={1}/>
          <Mermaid/>
          <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Swarm count={isMobile ? 100 : 500} mouse={mouse} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Environment  preset="city" />
          <OrbitControls />
          <CustomEffects isMobile={isMobile}/>
        </Suspense>
      </Canvas>
    </>
  );
}

