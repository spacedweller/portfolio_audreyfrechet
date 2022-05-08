import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components'


const AnimatedCard = styled(animated.div)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  will-change: transform;
  width:100%;
  height: 100%;
`

const DescWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  justify-content: center; 
  align-items: center;
  height: 100%;
  position: absolute;
  z-index: 3;
  width:100%;
`
const DescTitle = styled.div`
  padding: 10px;
  position: relative;
  font-family: 'RobotoCondensed';
  font-weight: 400;
  font-size: 36px;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.55);
  margin: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  @media only screen and (max-width: 900px) {
    font-size: 22px;
  }
`

const DescTitle2 = styled.div`
  font-family: 'RobotoCondensed';
  font-weight: 400;
  font-size: 24px;
  color: white;
  text-align: center;
  padding: 0px;
  margin: 5px;

  @media only screen and (max-width: 900px) {
    font-size: 16px;
  }
`


export function Card({ children, title, title2 }) {
    // We add this ref to card element and use in onMouseMove event ...
    // ... to get element's offset and dimensions.
    const ref = useRef();
  
    // Keep track of whether card is hovered so we can increment ...
    // ... zIndex to ensure it shows up above other cards when animation causes overlap.
    const [isHovered, setHovered] = useState(false);
  
    const [animatedProps, setAnimatedProps] = useSpring(() => {
      return {
        // Array containing [rotateX, rotateY, and scale] values.
        // We store under a single key (xys) instead of separate keys ...
        // ... so that we can use animatedProps.xys.interpolate() to ...
        // ... easily generate the css transform value below.
        xys: [0, 0, 1],
        // Setup physics
        config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
      };
    });
  
    return (
      <AnimatedCard
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={({ clientX, clientY }) => {
          // Get mouse x position within card
          const x =
            clientX -
            (ref.current.offsetLeft -
              (window.scrollX || window.pageXOffset || document.body.scrollLeft));
  
          // Get mouse y position within card
          const y =
            clientY
            
             
              // console.log("MOUSE window.scrollY", window.scrollY)
              // console.log("MOUSE window.pageYOffset", window.pageYOffset)
              // console.log("MOUSE document.body.scrollTop", document.body.scrollTop)
          // Set animated values based on mouse position and card dimensions
          const dampen = 100; // Lower the number the less rotation
          const xys = [
            -(y - ref.current.clientHeight / 2) / dampen, // rotateX
            (x - ref.current.clientWidth / 2) / dampen, // rotateY
            1.07 // Scale
          ];
  
          // Update values to animate to
          setAnimatedProps({ xys: xys });
        }}
        onMouseLeave={() => {
          setHovered(false);
          // Set xys back to original
          setAnimatedProps({ xys: [0, 0, 1] });
        }}
        style={{
          // If hovered we want it to overlap other cards when it scales up
          zIndex: isHovered ? 2 : 1,
          
          // Interpolate function to handle css changes
          transform: animatedProps.xys.to(
            (x, y, s) =>
              `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
          )
        }}
      >
        {isHovered ? 
          <DescWrap>
            <DescTitle>
              {title.toUpperCase()}
                <DescTitle2>
              {title2.toUpperCase()}
                </DescTitle2>
            </DescTitle>
            
          </DescWrap> 
          : 
          null}

          {children}
      </AnimatedCard>
    );
  }

  const ImageContainer = styled.div`
    margin-top: auto;
    background: #01524D;

    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 576px) {
    }

    img {
      width: 100%;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
    }
  `
  const ImageContainerFull = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 576px) {
    }

    img {
      width: 100%;
      height:100%;
      min-width:100%;
      min-height: 100%;
      object-fit: scale-down;
    }
  `

  const ImageInnerContainer = styled.div`
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
    margin: 0 auto;
  `

  const ImageRatio = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
  `

  const ImageRatioInner = styled.div`
  
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  `


 export function Image({ ratio, src }) {
    return (
      <ImageContainer>
        <ImageInnerContainer>

          <ImageRatio style={{
              paddingTop: ratio * 100 + '%'
            }}>
              <ImageRatioInner>
            <img src={src} />
          </ImageRatioInner>
          </ImageRatio>
          
        </ImageInnerContainer>
      </ImageContainer>
    );
  }


 export function ImageFull({ ratio, src }) {
    return (
      <ImageContainerFull>
        <ImageInnerContainer>

          
              <ImageRatioInner>
            <img src={src} />
          </ImageRatioInner>
          
        </ImageInnerContainer>
      </ImageContainerFull>
    );
  }