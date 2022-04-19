import React, { useState, useEffect, memo, useRef} from 'react'
import { useProgress } from "@react-three/drei";
import { a, useTransition } from "@react-spring/web";
import styled, { css, createGlobalStyle } from 'styled-components'


const StyledLoading = styled.div`
.loading {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #171717;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-bar-container {
  width: 100%;
  height: 3px;
  background: #272727;
}

.loading-bar {
  height: 3px;
  background: #01524D;
}
`



function Loading(props) {
    const { active, progress } = useProgress();
    const [finished, setFinished] = useState(false)
    console.log("Louading, finished is:", finished)
    console.log("Louading, progress:", progress)
    const progBar = useRef()
  
    const transition = useTransition(active, {
      from: { opacity: 1, progress: 0 },
      leave: { opacity: 0 },
      update: { progress },
    });
    var progressWidth = progress.toString() + "%"
    


    useEffect(() => {
      console.log("Running useeffect is Loaded!")
      if (progress == 100) {
        console.log("Loading: progress is 100% done")
        props.onChange()
        }
        }, [finished]);

    useEffect(() => {
      if (progress == 100) {
        progressWidth = progress.toString() + "%"
        console.log("Loading progress is 100% setting finished to True")
        setFinished(true)
      }
    }, [progress])


    return transition(
      ({ progress, opacity }, active) =>
        active && (
          <StyledLoading>
            <a.div className='loading' style={{ opacity }}>
              <div className='loading-bar-container'>
                <a.div className='loading-bar' style={{ width: progressWidth }}></a.div>
              </div>
            </a.div>
          </StyledLoading>
        )
    );
  }

  export default memo(Loading)