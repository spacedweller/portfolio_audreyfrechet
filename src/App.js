import React, { useRef, useEffect, Suspense, useCallback, useState, Button } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls} from '@react-three/drei'
import Mermaid from './objects/mermaid'
import Bubbles from './objects/bubbles'
import Swarm from './objects/swarm'
import CustomEffectsMermaid from './CustomEffectsMermaid'
import CustomEffectsFarm from './CustomEffectsFarm.js'
import Loading from './components/Loading'
import Rig from './components/Rig'
import styled, {css, keyframes} from 'styled-components'

import RollOut from './components/RollOut'
import Projects from './components/Projects.js'
import { useSpring, easings} from '@react-spring/core'

import { a as web } from '@react-spring/web'
import Reel from './components/Reel.js'
import MenuButton from './components/MenuButton'


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



export const base = css`
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  color: indianred;
  z-index: 0;
`


const UpperLeft = styled.div`
  ${base}
  color: #ebf0ff;
  pointer-events: none;
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
  top: 50px;
  right: 50px;
  opacity: 80%;
  font-size: 2.4em;
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

const MenuWrap = styled.div`

`

export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [introLoaded, setIntroLoaded] = useState(false)
  const [currentScene, setCurrentScene] = useState(1)
  const [colorTheme, setColorTheme] = useState("#01524D")
  const [loadingFinished, setLoadingFinished] = useState(false)
  const [mainScene, setMainScene] = useState(true)
  const [sceneLoading, setSceneLoading] = useState(false)
  const [reel, setReel] = useState(false)

  const bgGreen = "linear-gradient(0deg, rgba(1,82,77,1) 0%, rgba(1,82,77,1) 9%, rgba(1,82,77,1) 93%)"
  const bgGreenBlack = "linear-gradient(0deg, rgba(1,82,77,1) 0%, rgba(1,82,77,1) 5%, rgba(0,0,0,1) 100%)"
  const bgBlack = "linear-gradient(0deg, rgba(0,31,29,1) 0%, rgba(0,31,29,1) 9%, rgba(0,14,13,1) 93%)"

  const bg = useSpring({
    background: currentScene==1? bgGreen : bgGreenBlack, 
    onRest: {background: () => {setMainScene(currentScene==1? true: false); setSceneLoading(false)}}, 
    config: { mass: 1, tension: 100, friction: 100, precision: 0.01, easing: easings.easeInOutQuart}})


  console.log("[APP] Intro loaded state:", introLoaded)
  console.log("Current scene is:", currentScene)

  return (
    <>
      
        <RollOut onChange={() => {setIntroLoaded(true)}} > 
        
          <Reel reel={reel}/>

          <Projects currentScene={currentScene}/>

            <web.main style={{...bg}} >
              <Canvas onCreated={() => {setTimeout(function() {setCanvasLoaded(true)}, 5000); }} invalidateFrameloop dpr={[1,2]} camera={{position: [0, -2, isMobile ? 4.7 : 4], fov: 40}} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false}} >
                <Suspense fallback={null}>
                  <Mermaid isMobile={isMobile} currentScene={currentScene} />
                  <Bubbles color={colorTheme} shadow={"#01b7ab"} reflection={"#FFFFFF"} currentScene={currentScene}/>
                  <Swarm count={isMobile ? 250 : 500} color={"#0DA6D4"} shadow={"#01b7ab"} reflection={"#FFFFFF"} currentScene={currentScene}/>
                  <Environment preset="studio"/>
                  <CustomEffectsMermaid isMobile={isMobile} colorTheme={colorTheme} currentScene={currentScene}/>
                </Suspense>
                <Rig currentScene={currentScene} mainScene={mainScene} colorTheme={colorTheme} isMobile={isMobile}/> 
              </Canvas>
            </web.main>

        </RollOut> 
        
        {canvasLoaded&&introLoaded ? 
        <>
          {(currentScene==1 && !reel) ? <UpperLeft>
            AUDREY FRECHET
            <br/>
            <Text>3d artist</Text>
        </UpperLeft> : null }
            
        <Menu style={{display: reel ? "none" : "block"}}>
          <MenuWrap onClick={ !sceneLoading ? () => {setSceneLoading(true); console.log("CLICK, sceneLoading?", sceneLoading); currentScene == 1 ? setCurrentScene(2) : setCurrentScene(1)} : null}>
            <MenuButton style={{pointerEvents: "all"}} sceneLoading={sceneLoading} >Projects</MenuButton>
          </MenuWrap>
          <MenuWrap onClick={ !sceneLoading ? () => { !reel ? setReel(true) : setReel(false)} : null}>
            <MenuButton sceneLoading={sceneLoading}>Reel</MenuButton> 
          </MenuWrap>
          <MenuWrap>          
            <MenuButton sceneLoading={sceneLoading}>About</MenuButton> 
          </MenuWrap>
          <MenuWrap>          
            <MenuButton sceneLoading={sceneLoading}>Contact</MenuButton>
          </MenuWrap>
        </Menu>
        </>
        :
        null
        }

        <Loading onChange={() => {setLoadingFinished(true)}}/>
    </>
  );
}



