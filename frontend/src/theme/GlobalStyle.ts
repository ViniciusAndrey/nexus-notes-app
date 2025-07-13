import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './dark';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    min-height: 100vh;
    transition: background 0.2s, color 0.2s;
  }
  button, input, textarea {
    font-family: inherit;
    background: none;
    border: none;
    color: inherit;
    outline: none;
  }
`;

export default GlobalStyle;
