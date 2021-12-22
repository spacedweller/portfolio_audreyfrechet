import * as THREE from 'three';
import { useRef, useState } from 'react'
import {useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, useTexture, useCubeTexture, MeshDistortMaterial} from '@react-three/drei'


function MainSphere({ material }) {
    const main = useRef()
    // main sphere rotates following the mouse position
    useFrame(({ clock, mouse }) => {
      main.current.rotation.z = clock.getElapsedTime()
      main.current.rotation.y = THREE.MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1)
      main.current.rotation.x = THREE.MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1)
    })
    return <Icosahedron args={[1, 4]} ref={main} material={material} position={[0, 0, 0]} />
  }
  
  function Instances({ material }) {
    // we use this array ref to store the spheres after creating them
    const [sphereRefs] = useState(() => [])
    // we use this array to initialize the background spheres
    const initialPositions = [
      [-4, 30, 0],
      [-2, 32, -4],
      [-1, 12, 2],
      [1, 6, -1],
      [3, 4, -3],
      [2, 14, 0],
      [4, 8, -2],
      [0, 20, -2],
      [1, 26, -1],
      [0, 0, -3],
    ]


    // smaller spheres movement
    useFrame(() => {
      // animate each sphere in the array
      sphereRefs.forEach((el) => {
        el.position.y += 0.01
        if (el.position.y > 20) el.position.y = -10
        el.rotation.x += 0.06
        el.rotation.y += 0.06
        el.rotation.z += 0.02
      })
    })
    return (
      <>
        
        {initialPositions.map((pos, i) => (
            <>
            
          <Icosahedron
            args={[1, 4]}
            position={[pos[0], pos[1], pos[2]]}
            material={material}
            key={i}
            ref={(ref) => (sphereRefs[i] = ref)}
          />
          </>
        ))}
      </>
    )
  }
  
 export default function Bubbles({color}) {
    const bumpMap = useTexture('/bump.jpg')
    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cube/' })

  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={color ? color : "#010101"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.003}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={0.05}
        distort={0.10}
        opacity={1} 
      />
      {material && <Instances material={material} />}
    </>
  );
}


  