import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import TheRoom from 'core/game'
import { Link } from 'react-router-dom'
import DarkFog from 'assets/music/Dark-Fog.mp3'

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

const EffectWrapper = styled.div`
  position: absolute;
  z-index: 20;
  bottom: 0;
  left: 0;
  margin: 15px;
  color: #eae7af;
  font-family: 'Gayathri', sans-serif;
  font-size: 24px;
`

const GameOverWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  top: -20%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 10px solid #160f30;
  border-radius: 5px;
  background: #01024e;
  color: #eae7af;
  font-size: 50px;
  transform: translate(-50%, -50%);
  transition: 0.2s ease all;
`

const HomeButton = styled.button`
  width: 50px;
  height: 25px;
  margin: 5px;
  border: 1px solid #eae7af;
  border-radius: 5px;
  background: transparent;
  color: #eae7af;
  font-size: 16px;
  font-weight: 100;
`

const LevelWrapper = styled.div`
  margin: 20px;
  border-bottom: 3px solid #eae7af;
  color: #eae7af;
  font-family: 'Lexend Zetta', sans-serif;
  font-size: 40px;
`

const GameWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 60%;
  border: 25px solid #b88846;
  border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23B88846' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23B88846'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E")
    25;
`

const Game = () => {
  const mount = useRef(null)

  useEffect(() => {
    document.title = 'The Room'

    const bgm = new Audio(DarkFog)
    bgm.play()

    bgm.onended = () => {
      bgm.currentTime = 0
    }

    // eslint-disable-next-line no-unused-vars
    const game = new TheRoom(mount.current)

    return () => {
      bgm.pause()
      bgm.currentTime = 0
      game.terminate()
    }
  }, [mount])

  return (
    <Wrapper>
      <GameOverWrapper id="gameover">
        GAME OVER
        <Link to="/home">
          <HomeButton>Home</HomeButton>
        </Link>
      </GameOverWrapper>
      <DebugWrapper id="debug" />
      <LevelWrapper id="score">Level 1</LevelWrapper>
      <GameWrapper ref={mount}>
        <EffectWrapper id="effect" />
        <SpotlightWrapper id="spotlight" />
      </GameWrapper>
    </Wrapper>
  )
}

export default Game
