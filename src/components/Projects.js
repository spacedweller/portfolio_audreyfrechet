import React, {useState, Suspense, useEffect} from 'react'
import styled, {css, keyframes} from 'styled-components'
import {Card, Image, ImageFull} from './Card'
import {cards} from '../project_list.js'
import { useSpring, easings} from '@react-spring/core'
import { animated } from 'react-spring';


const projectsCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index:2;
`

const ProjectGallery = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  `

const Container = styled.div`
  ${projectsCss}
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 150px;
  padding-top: 200px;
  overflow-x: hidden;
  scrollbar-width: none;
  @media only screen and (max-width: 900px) {
    padding: 50px;
    padding-top: 150px;
    }
  
  ::-webkit-scrollbar {
      display: none;

  
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: 10px;
  width: 100%;
  cursor: pointer;

  @media screen and (min-width: 1380px) {
    width: 25%;
   
  }
`



const CardBody = styled.div`
  margin-top: 27px;
  margin-bottom: 27px;
  line-height: 1.5;
  font-size: 16px;

  @media screen and (min-width: 576px) {
    font-size: 18px;
  }
`

const FullScreen = styled.div`
  position: absolute;
  bottom: 0px;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 3;
`

const FullDescWrap = styled.div`
  display: table-cell;
  vertical-align: bottom;
  height: 100%;
  position: absolute;
  z-index: 1;
  width:100%;
`

const FullDesc = styled.div`
  padding: 10px;
  position: relative;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 30px;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.55);
  margin: 0;
  top: 100%;
  -ms-transform: translateY(-100%);
  transform: translateY(-100%);

  @media only screen and (max-width: 900px) {
   
  }
`

export default function Projects({ currentScene }) {
    const [fullScreen, setFullScreen] = useState(false)
    const [focusedCard, setFocusedCard] = useState()
    
    const [stylez, api] = useSpring(() => ({ opacity: 1 }))

    useEffect(() => { 
      if (currentScene==1) {
        api.start({ opacity: currentScene==1 ? 0 : 1, config: { mass: 1, tension: 100, friction: 100, precision: 0.01, easing: easings.easeInOutQuart}})
      } else {
        setTimeout(() => {api.start({ opacity: currentScene==1 ? 0 : 1, config: { mass: 1, tension: 100, friction: 100, precision: 0.05, easing: easings.easeInOutQuart}})
      }, 50)
      }
    }, [currentScene, api])

    console.log("PROJECTS received scene", currentScene)
    return (
      <>  
        <ProjectGallery style={{...stylez}}>
          {fullScreen ? 
            <FullScreen onClick={() => {setFullScreen(false)}}>
              <FullDescWrap>
                <FullDesc>
                  {cards[focusedCard].description}
                </FullDesc>
              </FullDescWrap>

              <ImageFull ratio={cards[focusedCard].imageRatio} src={cards[focusedCard].image}/>
            </FullScreen>
          : null }
          <Container style={{opacity: fullScreen ? 0 : 1, pointerEvents: fullScreen ? "none" : "auto"}}>
              <Row >
                  {cards.map((card, i) => (
                  
                  <Column key={i} onClick={() => {setFullScreen(true); setFocusedCard(i)}} >
                    <Card title={card.title} title2={card.title2} >
                      <Image ratio={card.imageRatio} src={card.image}/> 
                      
                    </Card>
                  </Column>
                ))}
                
                
              </Row>
          </Container>
          
        </ProjectGallery>
           
     </>
    )
}
