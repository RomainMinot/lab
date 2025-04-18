import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind3 from '@unocss/preset-wind3';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        primary: {
          name: 'Funnel Display',
          weights: ['400', '700'],
        },
        secondary: {
          name: 'Funnel Sans',
          weights: ['400'],
        },
      },
    }),
  ],
  theme: {
    colors: {
      smokyBlack: '#191308',
      vanDyke: '#322A26',
      vanDykeLight: '#322A26BF',
      delftBlue: '#454B66',
      glaucous: '#677DB7',
      vistaBlue: '#9CA3DB',
      vistaBlueLight: '#9CA3DB26',
      background: '#9CA3DB0D',
    },
  },
});
