import * as THREE from 'three'
import {useRef} from 'react'
import { useFrame, useThree } from "@react-three/fiber"


export default function Rig() {
    const { camera, mouse } = useThree()
    const light = useRef()
    const vec = new THREE.Vector3()
    useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.12, camera.position.y, camera.position.z), 0.01)
        light.current.position.set(mouse.x - 0, mouse.y -1.2, 2)
    })
    return (
        <>
        <pointLight ref={light} color={"yellow"} distance={5} intensity={0.7}/>
        </>
    )
  }

