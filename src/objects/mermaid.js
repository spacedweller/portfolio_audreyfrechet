import * as THREE from "three"
import {useRef, useState, useEffect} from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame, extend, useThree } from "@react-three/fiber"
import Titles from '../components/Titles'
import WireframeShaderMaterial from "../shaders/WireframeShader"
import { MeshStandardMaterial } from 'three'
import { a, useSpring, config, easings} from '@react-spring/three'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei'

extend({WireframeShaderMaterial})

export default function Mermaid({ isMobile, mouse, currentScene, ...props }) {
    const group = useRef()
    const [modelPos, setModelPos] = useState([0, 0, 1.9])
    const source = isMobile ? '/mermaid4.glb' : '/mermaid4.glb'
    const { nodes, materials } = useGLTF(source)
    const modelProps = useSpring({ position: modelPos, config: { mass: 3, tension: 100, friction: 100, precision: 0.0001, easing: easings.easeInOutQuart }} )
    
    const AnimatedMaterial = a(MeshDistortMaterial)

    function SetSceneOptions(scene) {
      console.log("Mermaid model switching to %d scene", scene)
      switch(scene) {
          case 1:
              setModelPos([0, 0, 1.9])
              break;
          case 2:
              setModelPos([0, -2, 1.9])
              break;
          case 3:
              setModelPos([0, -4, 1.9])
              break;
      }
    }
  
    useEffect(() => {
      SetSceneOptions(currentScene)
    }, [currentScene])

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
        <a.mesh
          geometry={nodes.Merged_sirene_72_1.geometry} 
          material={ lol ? new MeshStandardMaterial({opacity: 1, transparent: true}) :  materials.Merged_sirene_72}
          rotation={[-0.04, 0, 0]}
          {...modelProps}
        />
      </group>


      
      </>
    )
  }