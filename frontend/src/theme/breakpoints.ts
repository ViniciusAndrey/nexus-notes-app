// Breakpoints responsivos para o projeto Nexus
export const breakpoints = {
  // Desktop grande
  xl: '1200px',
  // Desktop
  lg: '1024px',
  // Tablet landscape
  md: '768px',
  // Tablet portrait
  sm: '480px',
  // Mobile pequeno
  xs: '360px',
};

// Media queries helpers
export const media = {
  xl: `@media (max-width: ${breakpoints.xl})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  md: `@media (max-width: ${breakpoints.md})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  xs: `@media (max-width: ${breakpoints.xs})`,
};

// Tamanhos de fonte responsivos
export const fontSizes = {
  // Desktop
  title: {
    desktop: '2.5rem',
    tablet: '2.2rem',
    mobile: '2rem',
    smallMobile: '1.5rem',
    tinyMobile: '1.3rem',
  },
  // Subtítulo
  subtitle: {
    desktop: '1.8rem',
    tablet: '1.7rem',
    mobile: '1.6rem',
    smallMobile: '1.4rem',
    tinyMobile: '1.2rem',
  },
  // Texto normal
  body: {
    desktop: '1.1rem',
    tablet: '1.05rem',
    mobile: '1rem',
    smallMobile: '0.95rem',
    tinyMobile: '0.9rem',
  },
  // Texto pequeno
  small: {
    desktop: '0.9rem',
    tablet: '0.88rem',
    mobile: '0.85rem',
    smallMobile: '0.8rem',
    tinyMobile: '0.75rem',
  },
};

// Espaçamentos responsivos
export const spacing = {
  // Desktop
  large: {
    desktop: '2rem',
    tablet: '1.8rem',
    mobile: '1.5rem',
    smallMobile: '1rem',
    tinyMobile: '0.8rem',
  },
  // Médio
  medium: {
    desktop: '1.5rem',
    tablet: '1.3rem',
    mobile: '1.2rem',
    smallMobile: '1rem',
    tinyMobile: '0.8rem',
  },
  // Pequeno
  small: {
    desktop: '1rem',
    tablet: '0.9rem',
    mobile: '0.8rem',
    smallMobile: '0.6rem',
    tinyMobile: '0.5rem',
  },
};

// Configurações de layout
export const layout = {
  // Sidebar
  sidebar: {
    desktop: {
      width: '22vw',
      minWidth: '220px',
      maxWidth: '320px',
    },
    tablet: {
      width: '25vw',
      minWidth: '200px',
    },
    mobile: {
      width: '280px',
    },
    smallMobile: {
      width: '85vw',
      maxWidth: '300px',
    },
  },
  // Header mobile
  mobileHeader: {
    desktop: '60px',
    mobile: '55px',
    smallMobile: '50px',
  },
  // Padding do editor
  editorPadding: {
    desktop: '3rem 4rem',
    tablet: '2rem 3rem',
    mobile: '1rem',
    smallMobile: '0.8rem',
    tinyMobile: '0.5rem',
  },
}; 