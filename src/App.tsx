import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";

import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter basename="https://alex-britto.github.io/ax-timer">
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
