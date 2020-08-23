import React from "react";
import { Provider } from "react-redux";
import withRedux from "../lib/withRedux";

import Index from "./Index";
import ThemeProvider from "../services/theme/ThemeProvider";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
`;

function App({ reduxStore }) {
  console.log("Component", reduxStore);
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        <Container>
          <Index />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default withRedux(App);
