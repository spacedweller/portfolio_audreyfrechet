
import React from 'react'
import { Html } from '@react-three/drei'
import "../styles.css";


export default function Titles() {
    return (
             <Html scale={0.3} rotation={[1, 0, 0]} position={[-1, 0.3, 1.5]} transform occlude>
          <div className="annotation">
            AUDREY FRECHET<span style={{ fontSize: '0.1px' }}></span>
          </div>
        </Html>
    )
}
