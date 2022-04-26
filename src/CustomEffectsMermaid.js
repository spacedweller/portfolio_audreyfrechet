import * as THREE from 'three'
import React, { useRef, useEffect, useMemo, memo } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { WaterPass } from "./post/Waterpass"
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, BokehPass, GlitchPass})

const CustomEffectsMermaid = ({isMobile}) => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const params = useMemo(() => ({ focus: 2.3, aperture: 0.005, maxblur: 0.008 }), [])
  const aspect = useMemo(() => new THREE.Vector2(1920, 1080), [])
  const width = 1920
  const height = 1080


  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      <waterPass attachArray="passes" factor={isMobile? 0.4 : 0.15} />
      <bokehPass attachArray="passes" args={[scene, camera, params]} />
      <glitchPass attachArray="passes" goWild={true} enabled={false} />
    </effectComposer>
  )
}

export default memo(CustomEffectsMermaid)