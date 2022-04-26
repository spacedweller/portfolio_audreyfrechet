import { useSpring, animated } from 'react-spring'
import {useState, useEffect} from 'react'

export default function TestSpring () {
    const [target, setTarget] = useState(false);
    const value = useSpring({height: target ? "100px" : "0px"});
    
    useEffect(() => {
        console.log("value", value)
        return () => {
            
        }
    }, [target])
  
    return (
      <div>
        <animated.div style={{opacity: "1", backgroundColor: "#FFFFFF", ...value }}></animated.div>
        <br />
        <button onClick={() => setTarget(false)}>Set 0</button>
        <button onClick={() => setTarget(true)}>Set 100</button>
      </div>
    );
  };