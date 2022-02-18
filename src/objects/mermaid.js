import {useRef} from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame } from "@react-three/fiber"
import Titles from '../components/Titles'

export default function Mermaid({ isMobile, ...props }) {
    const group = useRef()
    const source = isMobile ? '/mermaid4.glb' : '/mermaid4.glb'
    const { nodes, materials } = useGLTF(source)
  
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      group.current.position.y = (Math.sin(t / 4)) / 30
  
      group.current.rotation.x = (Math.sin(t / 3)) / 40
    })
  
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.Merged_sirene_72_1.geometry} material={materials.Merged_sirene_72}
          position={[0, 0.05, 1.9]}
          rotation={[-0.04, 0, 0]}
        />

      </group>
    )
  }
  