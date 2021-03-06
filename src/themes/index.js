// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer';

const theme = {};

theme.palette = {
  primary: ['#247AFDE6'],
  secondary: ['#FFD700'],
  danger: [],
  alert: [],
  success: [],
  white: ['#FFFFFF', '#F7F7FF', '#FBFFFE33', '#FBFFFE'],
  black: ['#0D1212'],
  grayscale: [
    '#212121',
    '#414141',
    '#616161',
    '#9e9e9e',
    '#bdbdbd',
    '#e0e0e0',
    '#eeeeee',
    '#ffffff',
  ],
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: 'GoogleSansRegular, Roboto, sans-serif',
  pre: 'Spartan, Liberation Mono, Menlo, Courier, monospace',
  medium: 'GoogleSansMedium',
  bold: 'GoogleSansBold',
  italic: 'GoogleSansItalic',
  quote: 'Georgia, serif',
};

theme.sizes = {
  maxWidth: '1100px',
};

export default theme;
