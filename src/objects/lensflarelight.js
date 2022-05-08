import React from 'react'
import { Lensflare, LensflareElement } from './lensflare'
import * as THREE from "three"
import { extend, useFrame, useThree } from "@react-three/fiber"

extend({Lensflare})


export default function Lensflarelight() {
    
    const flareEffect = new Lensflare();

    return (
        <>
        <flareEffect/>
        </>
    )

}
