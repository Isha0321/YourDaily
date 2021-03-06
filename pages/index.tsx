import {
	Box,
	Button,
	Typography,
	Paper,
	Stack,
	useMediaQuery,
	Theme,
} from '@mui/material'
import type { NextPage } from 'next'
import * as React from 'react'
import Image from 'next/image'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Person } from '@mui/icons-material'
import axios from 'axios'
import snackbarContext from '../shared/provider/snackprovider'
import { useRouter } from 'next/router'
// interface PostLoginApiPayload {
// 	email: string
// 	password: string
// }

const Home: NextPage = () => {
	interface State {
		username: string
		password: string
		showPassword: boolean
	}

	const router = useRouter()
	const { customizedSnackbar } = React.useContext(snackbarContext)

	const [values, setValues] = React.useState<State>({
		username: '',
		password: '',
		showPassword: false,
	})

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}

	const handleOnLogin = async () => {
		try {
			const { status, data } = await axios.post('/api/sm-login', {
				email: values.username,
				password: values.password,
			})
			if (status == 200) {
				customizedSnackbar('Successfully Logged In!', 'success')
				router.push('/dashboard')
			}
			console.log(data.Authorization)
			localStorage.setItem('Auth', data.Authorization)
		} catch (error: any) {
			customizedSnackbar('Invalid UserName or Password!', 'error')
			console.log(error)
		} finally {
		}
	}

	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<>
			<Box marginLeft={5} marginTop={2}>
				<Image
					src='/assets/image/logo.png'
					alt='logo'
					width='250px'
					height='106px'
				/>
			</Box>

			<Stack
				direction={isMobile ? 'column' : 'row'}
				justifyContent='space-evenly'
				alignItems='center'
				spacing={2}>
				<Stack
					position='relative'
					height={isMobile ? 400 : '100%'}
					width={isMobile ? '100%' : 600}>
					<Image
						style={{ flex: 1 }}
						src='/assets/image/ydd.png'
						alt='illustrator1'
						layout='fill'
					/>
				</Stack>
				<Paper>
					<Stack p={4} spacing={2}>
						<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
							LOGIN
						</Typography>

						<Typography variant='h6' sx={{ opacity: '0.6' }}>
							Please login into your account
						</Typography>

						<TextField
							label='UserName'
							color='secondary'
							placeholder='enter your user id'
							onChange={handleChange('username')}
							value={values.username}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<Person />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							label='Password'
							color='secondary'
							placeholder='enter your password'
							onChange={handleChange('password')}
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleClickShowPassword} edge='end'>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Button
							variant='contained'
							sx={{ opacity: '1', borderRadius: '5' }}
							onClick={handleOnLogin}>
							<Typography sx={{ opacity: '1' }}>Login</Typography>
						</Button>

						<Typography
							variant='h6'
							sx={{
								opacity: '0.6',
								color: 'primary.main',
								textAlign: 'right',
							}}>
							Forgot Password?
						</Typography>
					</Stack>
				</Paper>
			</Stack>
		</>
	)
}

export default Home
