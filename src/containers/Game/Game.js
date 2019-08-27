import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import TheRoom from 'core/game'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(#003, #000);
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
  border: 30px solid #b88846;
  border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23B88846' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23B88846'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E")
    30;
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
