import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import '../css/fonts.css'
import '../css/global.css'
import { createCustomTheme } from '../shared'
import axios from 'axios'

axios.defaults.baseURL =
	'http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com'

function MyApp({ Component, pageProps }: AppProps) {
	const theme = createCustomTheme('light')
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
