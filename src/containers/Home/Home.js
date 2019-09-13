import logo from 'assets/gui/logo.png'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TroubleIsBrewing from 'assets/music/Trouble-Is-Brewing.mp3'

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

const AppLogo = styled.img`
  width: 60%;
`

const StartButton = styled.button`
  margin: 1em 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 10px;
  background: transparent;
  color: white;
  font-size: 200%;

  &:active {
    outline: none;
  }
`

function Home() {
  useEffect(() => {
    const bgm = new Audio(TroubleIsBrewing)
    bgm.play()

    bgm.onended = () => {
      bgm.currentTime = 0
    }

    return () => {
      bgm.pause()
      bgm.currentTime = 0
    }
  })

  return (
    <Wrapper>
      <AppLogo src={logo} alt="logo" />
      <Link to="/game">
        <StartButton>START</StartButton>
      </Link>
    </Wrapper>
  )
}

export default Home
