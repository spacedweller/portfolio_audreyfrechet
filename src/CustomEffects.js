import * as THREE from 'three'
import React, { useRef, useEffect, useMemo } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { WaterPass } from "./post/Waterpass"
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, BokehPass })

export default function CustomEffects({isMobile}) {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  const params = useMemo(() => ({ focus: 2.3, aperture: 0.005, maxblur: 0.008 }), [])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <waterPass attachArray="passes" factor={isMobile? 0.4 : 0.15} />
      <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      <bokehPass attachArray="passes" args={[scene, camera, params]} />

    </effectComposer>
  )
}
