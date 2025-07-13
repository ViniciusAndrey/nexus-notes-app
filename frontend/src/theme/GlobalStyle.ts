import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './dark';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
  
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
    min-height: 100vh;
    transition: background 0.2s, color 0.2s;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  button, input, textarea {
    font-family: inherit;
    background: none;
    border: none;
    color: inherit;
    outline: none;
  }
  
  /* Melhorar a experiência de toque em dispositivos móveis */
  button, input, textarea, [role="button"] {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  /* Prevenir zoom em inputs no iOS */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 16px; /* Previne zoom no iOS */
    }
  }
  
  /* Melhorar scroll em dispositivos móveis */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #2d2d2d;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
  
  /* Prevenir seleção de texto em botões */
  button {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  /* Melhorar foco para acessibilidade */
  *:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
  }
  
  /* Prevenir overflow horizontal */
  img, video, canvas, svg {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle;
