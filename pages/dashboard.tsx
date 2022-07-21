/* eslint-disable @next/next/no-img-element */
import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Image from 'next/image'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import { Router, useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import snackbarContext from '../shared/provider/snackprovider'

// interface GetItemApiResponse{
//     items:Item[]
// }
interface Item {
	id: number
	categoryID: number
	name: string
	price: number
	inStock: true
	itemImageLinks: string[]
	baseQuantity: number
}
const Dashboard = () => {
	const router = useRouter()
	const { customizedSnackbar } = React.useContext(snackbarContext)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, setValue] = useState(0)
	const [items, setItems] = useState<Item[]>()
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	useEffect(() => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const response = await axios.get('/api/store-manager/item', {
					headers: {
						Authorization: Auth,
					},
				})
				setItems(response.data)
				console.log(response.data)
			})()
		} catch (error) {
			console.log(error)
		}
	}, [])

	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleLogout = () => {
		router.push('/')
		customizedSnackbar('Successfully logged out!', 'success')
	}

	const handleDelete = (id: number) => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const { status, data } = await axios.delete(
					`/api/store-manager/item/${id}`,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 200) {
					customizedSnackbar('Deleted successfully!', 'success')
					window.location.reload()
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Box>
						<Image
							src='/assets/image/shortlogo.png'
							alt='logo'
							width='73px'
							height='51px'
						/>
					</Box>
					<Typography variant='h6'>Dashboard</Typography>
					<PersonAddAltIcon sx={{ marginLeft: 118 }} />
					<LogoutIcon
						sx={{ marginLeft: 'auto', marginRight: 6 }}
						onClick={handleClickOpen}
					/>
					<div>
						<Dialog open={open} onClose={handleClose}>
							<DialogContent>
								<DialogContentText>
									Do you want to logout from the session?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>No</Button>
								<Button onClick={handleLogout} autoFocus>
									Yes
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</Toolbar>
			</AppBar>

			<Grid
				justifyContent={'space-evenly'}
				padding={3}
				sx={{ alignItems: 'center' }}>
				<Button
					sx={{ color: '#777777' }}
					variant='text'
					onClick={() => router.push('/')}>
					Back
				</Button>
				<Typography variant='h3'>Items</Typography>
				<Button variant='text'>+ADD NEW ITEMS</Button>
			</Grid>

			<Tabs
				value={value}
				onChange={handleChange}
				textColor='primary'
				indicatorColor='primary'
				centered>
				<Tab value='all' label='All' />
				<Tab value='vegetables' label='Vegetables' />
				<Tab value='fruits' label='Fruits' />
				<Tab value='others' label='Others' />
			</Tabs>

			<TableContainer sx={{ padding: 2, paddingLeft: 10, paddingRight: 10 }}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography sx={{ color: '#777777' }}>S. No.</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>Image</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>
									Vegetables Name
								</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>Base Qty.</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>
									Price (per base Qty)
								</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>In Stock</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>Delete</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography sx={{ color: '#777777' }}>Edit</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items?.map((row) => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell align='right'>
									<img
										alt='image'
										src={row.itemImageLinks[0] ?? ''}
										width={50}
										height={50}
									/>
								</TableCell>
								<TableCell align='right' sx={{ color: '#F88A12' }}>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.baseQuantity}</TableCell>
								<TableCell align='right'>{row.price}</TableCell>
								<TableCell align='right'>
									<Checkbox
										sx={{
											color: '#21F812',
											'&.Mui-checked': {
												color: '#21F812',
											},
										}}
										checked={row.inStock}
									/>
								</TableCell>
								<TableCell align='right'>
									<IconButton
										color='primary'
										onClick={() => handleDelete(row.id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
								<TableCell align='right'>
									<IconButton aria-label='edit' color='primary'>
										<EditIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Dashboard
