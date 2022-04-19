import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

export default function RollOut( props ) {
  const [finished, setFinished] = useState(false)
  console.log("Rollout, finished is:", finished)
  

  const IntroProps = useSpring({ to: {clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" } ,
    from:  {clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)"}, delay: 4000,  width: 500, height: 500, config: {tension: 25}, onRest: () => setFinished(true)})


    useEffect(() => {
      console.log("Running useeffect is Loaded!")
      
      if (finished) {
        props.onChange()

        }
        }, [finished]);

  return (
    <>
     
        <animated.div style={{width: "100%", height: "100%", backgroundColor: "#171717", ...IntroProps}}>
        {props.children}
      </animated.div>
    
      
      </>
  );
}