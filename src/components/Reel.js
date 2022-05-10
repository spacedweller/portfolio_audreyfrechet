import React, {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import { useSpring, easings} from '@react-spring/core'
import { animated } from 'react-spring';
import onClickOutside from './OutsideClick'


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


export default function Reel({reel}) {
  const [stylez, api] = useSpring(() => ({ height: "0%" }))
  useEffect(() => { 
    if (reel) {
      api.start({ height: reel ? "100%" : "0%"})
    } else {
      setTimeout(() => {api.start({ height: reel ? "100%" : "0%"})
    }, 50)
    }
  }, [reel, api])



  return (
    <Fullscreen onClickOutside={() => {console.log("lol")}} style={{...stylez}}>
      {reel ? 
      <iframe frameBorder="0" title="vimeo-player" src="https://player.vimeo.com/video/644036051?h=b260a3b1b0" width="1024" height="768" allowFullScreen={true}></iframe>
      : null }
    </Fullscreen>
  )
}
