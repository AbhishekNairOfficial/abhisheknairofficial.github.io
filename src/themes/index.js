// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer';

const theme = {};

theme.palette = {
  primary: ['#247AFDE6'],
  secondary: [],
  danger: [],
  alert: [],
  success: [],
  white: ['#fff', '#F7F7FF'],
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
  primary: 'Product Sans, Roboto, sans-serif',
  pre: 'Spartan, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
};

theme.sizes = {
  maxWidth: '1100px',
};

export default theme;
