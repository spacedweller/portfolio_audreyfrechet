import * as THREE from "three"
import {useRef} from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame, extend, useThree } from "@react-three/fiber"
import Titles from '../components/Titles'
import WireframeShaderMaterial from "../shaders/WireframeShader"
import { MeshStandardMaterial } from 'three'


extend({WireframeShaderMaterial})

export default function Mermaid({ isMobile, mouse, ...props }) {
    const group = useRef()
    const source = isMobile ? '/mermaid4.glb' : '/mermaid4.glb'
    const { nodes, materials } = useGLTF(source)
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      const posY = (Math.sin(t / 4)) / 30
      const rotX =  (Math.sin(t / 3)) / 40
      group.current.position.y = posY
      group.current.rotation.x = rotX
    })

    let lol = false
    return (
      <>
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.Merged_sirene_72_1.geometry} material={ lol ? new MeshStandardMaterial({opacity: 1, transparent: true}) :  materials.Merged_sirene_72}
          position={[0, 0.05, 1.9]}
          rotation={[-0.04, 0, 0]}
        />
      </group>
      </>
    )
  }