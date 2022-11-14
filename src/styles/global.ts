import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
${({ theme }) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${theme.colors["green-500"]};
  }

  body {
    background-color: ${theme.colors["gray-900"]};
    color: ${theme.colors["gray-300"]};
  }

  body,
  border-style,
  input-security,
  text-area,
  button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`}`;
