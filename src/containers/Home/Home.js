import logo from '../../assets/logo.png'

import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

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
  border-radius: 3px;
  background: transparent;
  color: white;
  font-size: 200%;
`

function Home({ history }) {
  return (
    <Wrapper>
      <AppLogo src={logo} alt="logo" />
      <StartButton onClick={() => history.push('/game')}>START</StartButton>
    </Wrapper>
  )
}

export default withRouter(Home)
