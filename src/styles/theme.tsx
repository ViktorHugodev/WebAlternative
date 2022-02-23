import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: '30em',
	md: '52em',
	lg: '64em',
	xl: '80em',
});

export const theme = extendTheme({
	colors: {
		dark: {
			black: '#252525',
		},
		text: '#aaaaaa',
		gray: {
			'900': '#181B23',
			'800': '#1F2029',
			'700': '#353646',
			'600': '#4B4D63',
			'500': '#616480',
			'400': '#797D9A',
			'300': '#9699B0',
			'200': '#B3B5C6',
			'100': '#D1D2DC',
			'50': '#EEEEF2',
		},
	},
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
	},
	styles: {
		global: {
			body: {
				bg: '#181818',
				color: 'gray.50',
			},
		},
	},
});
