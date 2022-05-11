import * as THREE from 'three'
import React, { useRef, useEffect, useMemo, memo, useState} from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { WaterPass } from "./post/Waterpass"
import { BokehPass } from './post/BokehPass'
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass'




extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, BokehPass, GlitchPass, ClearPass})

const CustomEffectsMermaid = ({isMobile, currentScene, colorTheme}) => {
  const composer = useRef()
  const { renderer, scene, gl, size, camera } = useThree()
  const [bokehActive, setBokehActive] = useState(true)
  const [waterActive, setWaterActive] = useState(true)
  const params = useMemo(() => ({ focus: 2.3, aperture: 0.005, maxblur: 0.008 }), [])
  const aspect = useMemo(() => new THREE.Vector2(1920, 1080), [])
  const width = 1920
  const height = 1080
  const effectDelay = 2000


  function SetSceneOptions(scene) {
    console.log("EFFECTS switching to %d scene", scene)
    switch(scene) {
        case 1:
            setTimeout(() => {setBokehActive(true)}, effectDelay+3000)
            setTimeout(() => {setWaterActive(true)}, effectDelay-1500)
            break;
        case 2:
            setBokehActive(false)
            setTimeout(() => {setWaterActive(false)}, effectDelay-500)
            break;
        case 3:
            setBokehActive(false)
            setTimeout(() => {setWaterActive(false)}, effectDelay-500)
            break;
    }
  }

  useEffect(() => {
    SetSceneOptions(currentScene)
  }, [currentScene])


  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      {waterActive?
      <waterPass attachArray="passes" factor={isMobile? 0.4 : 0.15} />
      : null
      }
      {bokehActive? 
      <>
      <bokehPass attachArray="passes" args={[scene, camera, params]} />
      </>
      : null
    }
      
    </effectComposer>
  )
}

export default memo(CustomEffectsMermaid)