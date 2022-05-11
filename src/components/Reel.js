import React, {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import { useSpring, easings} from '@react-spring/core'
import { animated } from 'react-spring';
import useComponentVisible from "../hooks/useComponentVisible";

const Fullscreen = styled(animated.div)`
  position: absolute;
  bottom: 0px;
  height: 100%;
  width: 100%;
  background-color: #001916;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  `


export default function Reel(props) {
  const [stylez, api] = useSpring(() => ({ height: "0%" }))
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    if (props.reel) {
      api.start({ height: props.reel ? "100%" : "0%"})
    } else {
      setTimeout(() => {api.start({ height: props.reel ? "100%" : "0%"})
    }, 50)
    }
  }, [props.reel, api])

  useEffect(() => {
    if (isComponentVisible) {
      console.log("[REEL] click outside the VIDEO--------------------")
      props.onChange()
    }
  }, [isComponentVisible])

  return (
    <Fullscreen style={{...stylez}}>
      {props.reel ? 
      <iframe ref={ref} frameBorder="0" title="vimeo-player" src="https://player.vimeo.com/video/644036051?h=b260a3b1b0" width="1024" height="768" allowFullScreen={true}></iframe>
      : null }
    </Fullscreen>
  )
}