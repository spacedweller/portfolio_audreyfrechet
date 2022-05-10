import React, {useState, useEffect} from 'react'
import styled, {css, keyframes} from 'styled-components'

import { useSpring, easings} from '@react-spring/core'

const flip = keyframes`
  0%,10% {
    background-color: rgb(0, 183, 171, 0.65);
  }
`

const WavyText = styled.div`
  position: relative;
  &:active {
    background-color: rgb(0, 183, 171, 1);
    color: #00b7ab;
    border-radius: 3px;
  }
`

const WavyTextSpan = styled.span`
  position: relative;
  border-radius: 3px;
  display: inline-block;
  color: #ebf0ff;
  text-transform: uppercase;
  animation: ${flip} var(--t) infinite;
  animation-delay: calc(.2s * var(--i));
  &:active {
    color: #00b7ab;
  }
`
const MenuButton = ({children, sceneLoading}) => {
  const [letters, setLetters] = useState([])
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    setLetters([...children])
  }, [children])

  return (
    <>
      <WavyText onMouseEnter={() => {setHovered(true)}} onMouseLeave={() => {setHovered(false)}}>

          {letters.map((letter, i) => (
            <WavyTextSpan style={{"--i":i+1, "--t": ((hovered && !sceneLoading) ? "1s" : "0s"), color: (hovered && !sceneLoading) ? "#FFFFFF" : "#ADB2C1", opacity: sceneLoading ? 0.5 : 1}} key={i+1}>{letter}</WavyTextSpan>
          ))}
          
      </WavyText>
    </>
  )
}

export default MenuButton;