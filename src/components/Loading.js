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

export default function Loading() {
    const { active, progress } = useProgress();
    const transition = useTransition(active, {
      from: { opacity: 1, progress: 0 },
      leave: { opacity: 0 },
      update: { progress },
    });
    var progressWidth = progress.toString() + "%"
    return transition(
      ({ progress, opacity }, active) =>
        active && (
          <StyledLoading>
          <a.div className='loading' style={{ opacity }}>
            <div className='loading-bar-container'>
              <a.div className='loading-bar' style={{ width: progressWidth }}></a.div>
            </div>

          </a.div>
          <div>Made by </div>

          </StyledLoading>
        )
    );
  }
