import 'styled-components';
import { ThemeType } from './theme/dark';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
} 