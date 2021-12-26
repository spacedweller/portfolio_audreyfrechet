import {useRef} from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame } from "@react-three/fiber"
import Titles from '../components/Titles'

export default function Mermaid({ ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/mermaid2.glb')
  
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      group.current.position.y = (0 + Math.sin(t / 4)) / 30
  
      group.current.rotation.x = (Math.sin(t / 3)) / 40
    })
  
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.Merged_sirene_68_copy.geometry}
          material={materials['Default OBJ']}
          position={[0, 0, 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />

      </group>
    )
  }
  