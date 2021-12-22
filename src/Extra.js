<EffectComposer>
          <DepthOfField focusDistance={0.1} focalLength={0.5} bokehScale={1} height={480} />
          <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.9} />
          <Noise opacity={0.05} />
          <Vignette darkness={3} eskil={true}/>
          <Vignette darkness={0.5}/>
        </EffectComposer>








<Particles count={isMobile ? 0 : 10000} mouse={mouse} />




<Sky
        turbidity={7.3}
        rayleigh={3.4}
        mieCoefficient={0.013}
        mieDirectionalG={0.78}
        inclination={0.49}
        azimuth={0.25}
      />



      <RimLight brightness={0.5} color={"#ffedb6"} position={[-3, 1, 3]}/>
        <RimLight brightness={30} color={"#ffedb6"} position={[-2, 5, 3]}/>



        function RimLight({ brightness, color, position}) {
            return (
              <rectAreaLight
                width={7}
                height={7}
                intensity={brightness}
                color={color}
                position={position}
                rotation={[0, 180, 0]}
                castShadow
              />
            );
          }