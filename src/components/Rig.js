import * as THREE from 'three'
import { useFrame, useThree } from "@react-three/fiber"


export default function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()
    
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.12, camera.position.y, camera.position.z), 0.01)
    })
  }

