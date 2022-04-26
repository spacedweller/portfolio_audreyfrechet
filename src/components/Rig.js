import * as THREE from 'three'
import {useRef, useState, useEffect} from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { animated, useSpring, config, easings} from '@react-spring/three'

export default function Rig({currentScene, colorTheme, isMobile}) {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { renderer, camera, mouse } = useThree()
    const light = useRef()
    const vec = new THREE.Vector3()
    const [Scene, setScene] = useState(1)
    const sceneProps = useSpring({ args:[currentScene==1? colorTheme : "#FFFFFF"] })


    useEffect(() => {
        console.log("Rig use effect, Scene changed! Current scene received", currentScene)
        console.log("Rig use effect, Scene changed! Scene Props", sceneProps)
        console.log("Rig use effect, Scene changed! Scene color", currentScene==1? colorTheme : "#000000")
        

        switch (currentScene) {
            case 1: 
            console.log("[RIG] switch 1");
            setScene(currentScene);
            break;

            case 2: 
            console.log("[RIG] switch 2");
            setScene(currentScene);
            break;
        }
    }, [currentScene])

    
    
    useFrame(({clock, camera}) => {
        if (currentScene==1) {
            light.current.position.set(mouse.x - 0, mouse.y -1.2, 2)

        }
        camera.position.lerp(vec.set(mouse.x * 0.12, camera.position.y, camera.position.z), 0.01)
    
    })
    return (
        <>
        {currentScene==1? <> 
        
            <pointLight ref={light} color={"yellow"} distance={5} intensity={0.7}/>
        </> :
        null
        }
        <fog attach="fog" args={isMobile? ["#5a9391", 3, 8] : ["#5a9391", 2.3, 4]} />
        <animated.color attach="background" {...sceneProps}></animated.color>
        <ambientLight color="#62c7e9" intensity={0.7}/>
        <pointLight position={[3, 3, -1]} distance={10} intensity={6} color="#add8e6" />
        <pointLight position={[-1.5, 3, -1]} distance={10} intensity={5} color="#add8e6" />
        </>
    )
  }

