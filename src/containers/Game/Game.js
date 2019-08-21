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
const Game = () => <Wrapper>not funny, didn't laugh</Wrapper>

export default Game
