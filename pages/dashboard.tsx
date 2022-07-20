/* eslint-disable @next/next/no-img-element */
import { Box, Button, Grid, Toolbar, Typography } from '@mui/material'
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
					<LogoutIcon sx={{ marginLeft: 'auto', marginRight: 6 }} />
				</Toolbar>
			</AppBar>

			<Grid
				justifyContent={'space-evenly'}
				padding={3}
				sx={{ alignItems: 'center' }}>
				<Button sx={{ color: '#777777' }} variant='text'>
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
				<Tab value='one' label='Vegetables' />
				<Tab value='two' label='Fruits' />
				<Tab value='three' label='Others' />
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
export default Dashboard
