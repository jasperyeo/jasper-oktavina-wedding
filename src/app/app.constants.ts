export const THEME_PRESET: any = {
  semantic: {
    primary: {
      50: '{rose.50}',
      100: '{rose.100}',
      200: '{rose.200}',
      300: '{rose.300}',
      400: '{rose.400}',
      500: '{rose.500}',
      600: '{rose.600}',
      700: '{rose.700}',
      800: '{rose.800}',
      900: '{rose.900}',
      950: '{rose.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{rose.800}',
          inverseColor: '#ffffff',
          hoverColor: '{rose.900}',
          activeColor: '{rose.800}',
        },
        highlight: {
          background: '{rose.950}',
          focusBackground: '{rose.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{rose.50}',
          inverseColor: '{rose.950}',
          hoverColor: '{rose.100}',
          activeColor: '{rose.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
};

export const HEART_RAIN_ATTRIBUTES: any = {
  IMAGE_URL: 'assets/images/mini-heart.gif',
  CONTAINER_CLASS: 'rain-container'
};

export const HEADER_AND_FOOTER: any = {
  HEADER: {
    ID: 'image__header',
    ALT: 'Header',
    TITLE: 'Header',
    PATH: 'assets/images/header-flowers-full.png'
  },
  FOOTER: {
    ID: 'image__footer',
    ALT: 'Footer',
    TITLE: 'Footer',
    PATH: 'assets/images/footer-flowers-full.png'
  }
}