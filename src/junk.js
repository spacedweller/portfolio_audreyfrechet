const group2 = useRef()



group2.current.position.y = posY
group2.current.rotation.x = rotX



<group ref={group2} {...props} dispose={null}>
<mesh
  geometry={nodes.Merged_sirene_72_1.geometry} material={hover ? new MeshStandardMaterial({opacity: 0.2,  transparent: true, wireframe: true, blending: THREE.AdditiveBlending}) : materials.Merged_sirene_72}
  position={[0, 0.05, 1.91]}
  rotation={[-0.04, 0, 0]}
/>
</group>


<mesh ref={group} >
        <planeBufferGeometry args={[5, 5, 16, 16]}/>
        <wireframeShaderMaterial wireframe/>
      </mesh>