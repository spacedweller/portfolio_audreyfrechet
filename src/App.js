import React, { useRef, useEffect, Suspense, useCallback, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls} from '@react-three/drei'
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
import styled, {css, keyframes} from 'styled-components'

import RollOut from './components/RollOut'

const fadeIn = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 0.8;
}
`
const base = css`
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: indianred;
  
`
const UpperLeft = styled.div`
  ${base}
  color: white;
  font-family: 'NeueHaasDisplayBold';
  top: 100px;
  left: 250px;
  opacity: 80%;
  font-size: 2.8em;
  transform: skew(0deg, 0deg);

  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }

  animation: ${fadeIn} 4s linear;

`
const Text = styled.div`
  font-size: 0.5em;
  text-align: right;
  margin-right: 15px;
`


export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mouse = useRef([0, 0])
  const colorTheme = "#01524D"
  const [mermaid, setMermaid] = useState(true)
  const [rendering, setRendering] = useState(true)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [introLoaded, setIntroLoaded] = useState(false)
  console.log("[APP] Intro loaded state:", introLoaded)

  const RenderConditionally = props => useFrame(({ gl, scene, camera }) =>
  props.isScrolling && gl.render(scene, camera), 1)

  return (
    <>
      <RollOut onChange={() => {setIntroLoaded(true)}}>
        <Canvas onCreated={() => {setTimeout(function() {setCanvasLoaded(true)}, 5000); }} invalidateFrameloop dpr={[1,2]} camera={{position: [0, -2, isMobile ? 4.7 : 4], fov: 40}} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false}} >
          {mermaid ?
          <Suspense fallback={null}>
            <color attach="background" args={["#01524D"]}/>
            <ambientLight color="#62c7e9" intensity={0.7}/>
            <pointLight position={[3, 3, -1]} distance={10} intensity={6} color="#add8e6" />
            <pointLight position={[-1.5, 3, -1]} distance={10} intensity={5} color="#add8e6" />
            <Mermaid isMobile={isMobile}/>
            <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
            <Swarm count={isMobile ? 500 : 500} mouse={mouse} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
            <Environment
              preset="studio"
            />
            <CustomEffectsMermaid isMobile={isMobile}/>
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
      </RollOut>
      {canvasLoaded&&introLoaded ? 
        <UpperLeft>
          AUDREY FRECHET
          <br/>
          <Text>3d artist</Text>
       </UpperLeft>
      :
      <div></div>
      }
      <Loading/>
    </>
  );
}



