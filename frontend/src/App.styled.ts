import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Helvetica';
}

  html {
    font-size: 10px;
  }

  body {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
  }

  #root {
    min-width: 100vw;
    min-height: 100vh;
  }
`; 
