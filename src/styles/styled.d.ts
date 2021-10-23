import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      light: string;
      textDark: string;
      textLight: string;

      // secondary: string;
      // success: string;
      // error: string;
      // alert: string;
      // dark: string;
    };
  }
}
