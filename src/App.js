import React, { useRef, useEffect, Suspense, useCallback, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, Environment, OrbitControls} from '@react-three/drei'
import Overlay from './components/Overlay.js'
import Mermaid from './objects/mermaid'
import Bubbles from './objects/bubbles'
import Swarm from './objects/swarm'
import CustomEffectsMermaid from './CustomEffectsMermaid'
import CustomEffectsFarm from './CustomEffectsFarm.js'
import Loading from './components/Loading'
import Titles from './components/Titles'
import Farm from './objects/farm'
import Rig from './components/Rig'
import useScrollHandler from './components/useScrollHandler'

export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mouse = useRef([0, 0])
  const colorTheme = "#01524D"
  const [mermaid, setMermaid] = useState(true)
  const [rendering, setRendering] = useState(true)

  const RenderConditionally = props => useFrame(({ gl, scene, camera }) =>
  props.isScrolling && gl.render(scene, camera), 1)

  return (
    <>
      <Canvas invalidateFrameloop dpr={[1,2]} camera={{position: [0, -2, isMobile ? 4.7 : 4], fov: 40}} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false}} >
        {mermaid ?
        <Suspense fallback={null}>
          <color attach="background" args={["#01524D"]}/>
          <ambientLight color={colorTheme} intensity={1}/>
          <Mermaid/>
          <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Swarm count={isMobile ? 500 : 500} mouse={mouse} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
          <Environment  preset="city"/>

          <CustomEffectsMermaid isMobile={isMobile}/>
          <OrbitControls/>
        </Suspense>
        :
        <Suspense fallback={null}>
          <Farm/>
          <Environment  preset="city"/>
          <CustomEffectsFarm isMobile={isMobile}/>
        </Suspense>
        }
       <Rig/>
       <RenderConditionally isScrolling={true} />
      </Canvas>
      <Overlay/>
      
      <Loading/>
    </>
  );
}

