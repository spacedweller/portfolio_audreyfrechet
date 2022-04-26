import React, { useRef, useEffect, Suspense, useCallback, useState, Button } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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
import Projects from './components/Projects.js'
import TestSpring from './components/TestSpring.js'
import { useSpring } from '@react-spring/core'

import { a as web } from '@react-spring/web'


const fadeIn = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 0.8;
}
`
const fadeOut = keyframes`
0% {
  opacity: 0.8;
}

100% {
  opacity: 0;
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
  color: #ebf0ff;
  font-family: 'NeueHaasDisplayBold';
  top: 100px;
  left: 250px;
  opacity: 80%;
  font-size: 2.8em;
  transform: skew(0deg, 0deg);

  @media only screen and (max-width: 900px) {
    font-size: 1.8em;
    left: 80px;
  }

  animation: ${fadeIn} 4s linear;

`
const Text = styled.div`
  font-size: 0.5em;
  text-align: right;
  margin-right: 15px;
`

const Menu = styled.div`
  ${base}
  color: #ADB2C1;
  font-family: 'NeueHaasDisplayBold';
  top: 30px;
  right: 80px;
  opacity: 80%;
  font-size: 2.0em;
  transform: skew(0deg, 0deg);
  word-spacing: 15px;

  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
    right: 30px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1.5em;
    right: 15px;
  }


  animation: ${fadeIn} 8s linear;
`


export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [introLoaded, setIntroLoaded] = useState(false)
  const [currentScene, setCurrentScene] = useState(1)
  const [colorTheme, setColorTheme] = useState("#01524D")
  const [loadingFinished, setLoadingFinished] = useState(false)


  console.log("[APP] Intro loaded state:", introLoaded)


  // const onKeyDown = (e) => {
  //   if (e.key === "Tab" ) {
  //     if (isGlitching == false) {
  //       e.preventDefault();
  //       setIsGlitching(true)
  //       setColorTheme("#000000")
  //       console.log("Tab нажата");
  //     } else {
  //       e.preventDefault();
  //       setIsGlitching(false)
  //       setColorTheme("#01524D")
  //       console.log("Tab отжата");
  //     }
  //   } 
  // }
  
  return (
    <>   
      <RollOut onChange={() => {setIntroLoaded(true)}}> 
          <Canvas onCreated={() => {setTimeout(function() {setCanvasLoaded(true)}, 5000); }} invalidateFrameloop dpr={[1,2]} camera={{position: [0, -2, isMobile ? 4.7 : 4], fov: 40}} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false}} >
            <Suspense fallback={"This is fallback"}>
              <Mermaid isMobile={isMobile} currentScene={currentScene} currentScene={currentScene} />
              <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"}/>
              <Swarm count={isMobile ? 250 : 500} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"} currentScene={currentScene}/>
              <Environment preset="studio"/>
              <CustomEffectsMermaid isMobile={isMobile}/>
            </Suspense>
            <Rig currentScene={currentScene} colorTheme={colorTheme}/> 
          </Canvas>
      </RollOut> 
      
      {canvasLoaded&&introLoaded ? 
      <>
        { currentScene==1 ? <UpperLeft>
          AUDREY FRECHET
          <br/>
          <Text>3d artist</Text>
       </UpperLeft> : <div>scene 2</div> }
        
       <Menu>Projects Reel About Contact</Menu>
       </>
      :
      <div></div>
      }
      <Loading onChange={() => {setLoadingFinished(true)}}/>
   
    </>
  );
}



