
import React from 'react'
import styled from 'styled-components'

import logo from './logo512.png'
import {APP_NAME} from "./constants"


const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
`
const Title = styled.text`
  color: ${props => props.theme.text.primary};
`

const Logo = styled.img`
  height: 40%;
`

export default function Loading() {
  return (
    <Container>
      <Title>{APP_NAME}</Title>
      <Logo src={logo}/> 
    </Container>
  )
}