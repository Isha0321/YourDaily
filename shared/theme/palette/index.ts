import { PaletteMode, PaletteOptions } from '@mui/material'

export const palette = (mode: PaletteMode) => {
	const palette: PaletteOptions = {
		mode: mode,
		custom: {},
		primary: {
			main: '#F88A12',
			contrastText: '#FFFFFF',
			light: '#CEFBEA',
			dark: 'rgb(249, 161, 65)',
		},
		secondary: {
			main: '#666666',
			contrastText: '#FFFFFF',
			light: '#E2E8F0',
			dark: '#4F5A6A',
		},
		error: {
			main: '#E04141',
			light: '#E66767',
			dark: '#9C2D2D',
			contrastText: '#FFFFFF',
		},
		warning: {
			main: '#FF7426',
			contrastText: 'rgba(255,255,255,0.87)',
		},
		info: {
			main: '#1452FD',
			light: '#4374FD',
			dark: '#0E39B1',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#27AE60',
			light: '#52BE7F',
			dark: '#1B7943',
			contrastText: '#FFFFFF',
		},
		text: {
			primary: '#171923',
			secondary: '#4F5A6A',
			disabled: '#F4F4F3',
		},
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
		background: {
			paper: mode === 'light' ? '#FFFFFF' : '#4F5A6A',
			default: mode === 'light' ? '#F3F2EF' : '#171923',
		},
		grey: {
			A100: '#F4F4F3',
			A200: '#F3F2EF',
			A400: '#E0DFDC',
			A700: '#B0B0B0',
		},
		divider: '#E0DFDC',
	}
	return palette
}
