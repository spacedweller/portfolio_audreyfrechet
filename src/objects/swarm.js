import React, { useMemo} from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree} from "@react-three/fiber"



export default function Swarm({ count, mouse, color, shadow, reflection }) {
    const mesh = useRef()
    const light = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
  
    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
      const temp = []
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 100
        const factor = 20 + Math.random() * 100
        const speed = 0.001 + Math.random() / 200
        const xFactor = -7 + Math.random() * 10
        const yFactor = -5 + Math.random() * 10
        const zFactor = -15 + Math.random() * 10
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
      }
      return temp
    }, [count])
    // The innards of this hook will run every frame
    useFrame(state => {
      // Makes the light follow the mouse
      light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
      // Run through the randomized data to calculate some movement
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle
        // There is no sense or reason to any of this, just messing around with trigonometric functions
        t = particle.t += speed / 5
        const a = Math.cos(t) + Math.sin(t * 1) / 10
        const b = Math.sin(t) + Math.cos(t * 2) / 10
        const s = Math.cos(t)
        particle.mx += (mouse.current[0] - particle.mx) * 0.01
        particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
        // Update the dummy object
        dummy.position.set(
          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        )
        dummy.scale.set(0.15, 0.15, 0.15)
        dummy.rotation.set(s * 5, s * 5, s * 5)
        dummy.updateMatrix()
        // And apply the matrix to the instanced item
        mesh.current.setMatrixAt(i, dummy.matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
      <>
        <pointLight ref={light}  distance={1} intensity={0} color="#FFFFFF" />
        <instancedMesh ref={mesh} args={[null, null, count]}>
          <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
          <meshPhongMaterial attach="material" color={color} emissive={shadow} specular={reflection} opacity={0.67} transparent />
        </instancedMesh>
      </>
    )
  }
  