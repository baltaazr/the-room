import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import TheRoom from 'core/game'

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

const DebugWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

const SpotlightWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle,
    transparent 160px,
    rgba(0, 0, 0) 200px
  );
`

const GameWrapper = styled.div`
  position: relative;
`

const Game = () => {
  const mount = useRef(null)

  useEffect(() => {
    document.title = 'The Room'

    const game = new TheRoom(mount.current)

    return () => {
      game.terminate()
    }
  }, [mount])

  return (
    <Wrapper>
      <DebugWrapper id="debug" />
      <GameWrapper ref={mount}>
        <SpotlightWrapper id="spotlight" />
      </GameWrapper>
    </Wrapper>
  )
}

export default Game
