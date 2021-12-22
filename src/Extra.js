<EffectComposer>
          <DepthOfField focusDistance={0.1} focalLength={0.5} bokehScale={1} height={480} />
          <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.9} />
          <Noise opacity={0.05} />
          <Vignette darkness={3} eskil={true}/>
          <Vignette darkness={0.5}/>
        </EffectComposer>








<Particles count={isMobile ? 0 : 10000} mouse={mouse} />
