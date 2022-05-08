import * as THREE from 'three'
import {useRef, useState, useEffect} from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { animated, useSpring, config, easings} from '@react-spring/three'





export default function Rig({currentScene, colorTheme, isMobile, mainScene}) {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { renderer, camera, mouse } = useThree()
    const light = useRef()
    const vec = new THREE.Vector3()
    const [Scene, setScene] = useState(1)
    const [bgActive, setBgActive] = useState(true)
    
    function SetSceneOptions(scene) {
        switch(scene) {
            case 1:
                setBgActive(true)
                break;
            case 2:
                setTimeout(() => {setBgActive(false)}, 50)
                break;
            case 3:
                alert("Scene 3 triggered!")
                break;
        }
    }
    
    useEffect(() => {
        SetSceneOptions(currentScene)
    }, [currentScene])
    
    
    useFrame(({clock, camera}) => {
        light.current.position.set(mouse.x - 0, mouse.y -1.2, 2)
        camera.position.lerp(vec.set(mouse.x * 0.12, camera.position.y, camera.position.z), 0.01)
    
    })
    return (
        <>
        {mainScene && bgActive? <> 
            <color attach="background" args={[colorTheme]}/>
        </> 
        :
        null
        }
        <pointLight ref={light} color={"yellow"} distance={5} intensity={currentScene==1? 0.7: 0.0}/>
        <fog attach="fog" args={isMobile? ["#5a9391", 3, 8] : ["#5a9391", 2.3, 4]} />
        <ambientLight color="#62c7e9" intensity={0.7}/>
        <pointLight position={[3, 3, -1]} distance={10} intensity={6} color="#add8e6" />
        <pointLight position={[-1.5, 3, -1]} distance={10} intensity={5} color="#add8e6" />
        </>
    )
  }

