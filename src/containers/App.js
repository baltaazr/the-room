import logo from '../assets/logo.png'

import React from 'react'
import styled from 'styled-components'

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

function App() {
  return (
    <Wrapper>
      <AppLogo src={logo} alt="logo" />
    </Wrapper>
  )
}

export default App
