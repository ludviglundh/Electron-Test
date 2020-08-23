import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import withRedux from '../lib/withRedux'

import Apploader from '../features/app/Apploader'
import Index from './Index'

import ThemeProvider from '../services/theme/ThemeProvider'

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
`

function App({ reduxStore }) {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        <Container>
          <Apploader>
            <Index />
          </Apploader>
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default withRedux(App)

App.propTypes = {
  reduxStore: PropTypes.objectOf(PropTypes.any).isRequired,
}
