import React from 'react'
import styled from 'styled-components'
import {WINDOW_DIMENSIONS} from '../features/app/constants'
import { useSelector } from 'react-redux';

const Container = styled.div`
  background-color: ${props => props.theme.background};
  height: ${WINDOW_DIMENSIONS.height}px;
  width: ${WINDOW_DIMENSIONS.width}px;
`

export default function Index() {
    console.log(
    "THEME",
    useSelector((state) => state)
  );
  console.log('WINDOW_DIMENSIONS')
  return (
    <Container>
      <text>hej</text>
    </Container>
  )
}