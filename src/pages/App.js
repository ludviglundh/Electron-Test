import React from "react";
import { Provider } from "react-redux";
import withRedux from "../lib/withRedux";

import Index from "./Index";
import ThemeProvider from "../services/theme/ThemeProvider";

function App({ reduxStore }) {
  console.log("Component", reduxStore);
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    </Provider>
  );
}

export default withRedux(App);
