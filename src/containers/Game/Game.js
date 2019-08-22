import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import TheRoom from 'core/game'
import P5Wrapper from 'react-p5-wrapper'

const color = '#1D1F27'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${color};
`

const Game = () => {
  const sketch = useRef(null)

  useEffect(() => {
    document.title = 'The Room'

    const game = new TheRoom(sketch)

    return () => {
      game.terminate()
    }
  })

  return (
    <Wrapper>
      <P5Wrapper sketch={sketch.current} />
    </Wrapper>
  )
}

export default Game
