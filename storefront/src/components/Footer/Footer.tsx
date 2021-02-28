import './scss/Footer.scss'

import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import SvgIcon from '@material-ui/core/SvgIcon'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined'
import { baseUrl, getCategoryUrl, getPageUrl } from '@temp/app/routes'
import Logo from 'images/logo.svg'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { categoriesQuery } from '@sdk/queries/category'
import { Categories, CategoriesVariables } from '@sdk/queries/types/Categories'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { usePages } from '@sdk/queries/page'
import Typography from '@material-ui/core/Typography'
import useShop from '@temp/hooks/useShop'
import { FaFacebookF, FaInstagram, FaVk } from 'react-icons/fa'
import { ReactSVG } from 'react-svg'

const useStyles = makeStyles((theme) => ({
	logo: {
		'& svg': {
			height: 70,
			fill: theme.palette.secondary.main
		}
	}
}))

const Footer: React.FC = () => {
	const classes = useStyles()
	const [isOpenAllCategories, setOpenAllCategories] = useState(false)
	const shop = useShop()
	const { data: dataCategories } = useQuery<Categories, CategoriesVariables>(
		categoriesQuery,
		{
			variables: { level: 0 }
		}
	)
	const { data: pagesData } = usePages({
		variables: {
			first: 5
		}
	})
	return (
		<footer className='footer'>
			<Container maxWidth='lg'>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={3}>
						<div className='footer__contacts flex flex-col'>
							<Typography variant='h5' gutterBottom>
								Контакты:
							</Typography>
							<div className='flex align-center py-5'>
								<SvgIcon className='mr-10' fontSize='small'>
									<PhoneOutlinedIcon />
								</SvgIcon>
								<a href={`tel:${shop?.companyAddress.phone}`}>
									{shop?.companyAddress.phone}
								</a>
							</div>
							<div className='flex align-center py-5'>
								<SvgIcon className='mr-10' fontSize='small'>
									<MailOutlineOutlinedIcon />
								</SvgIcon>
								<a href={`mailto:info@stroyluxdrev.by`}>info@stroyluxdrev.by</a>
							</div>
							<div className='flex align-center py-5'>
								<SvgIcon className='mr-10' fontSize='small'>
									<QueryBuilderOutlinedIcon />
								</SvgIcon>
								<div className='flex flex-col'>
									<div>Режим работы магазина:</div>
									<div>ПН - ПТ: с 9:00 до 18:00</div>
									<div>СБ: с 9:00 до 15:00</div>
									<div>ВС: выходной</div>
								</div>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={3} className='footer__links'>
						<Typography variant='h5' gutterBottom>
							О магазине:
						</Typography>
						{pagesData?.pages?.edges.map((edge, i) => (
							<div key={i}>
								<Link to={getPageUrl(edge.node.slug)}>{edge.node.title}</Link>
							</div>
						))}
					</Grid>
					<Grid item xs={12} sm={6} md={3} className='footer__categories'>
						<div className='categories-group'>
							<Typography variant='h5' gutterBottom>
								Каталог товаров:
							</Typography>
							<Collapse in={isOpenAllCategories} collapsedHeight={200}>
								<ul className='categories-group__list'>
									{dataCategories?.categories.edges.map((edge, i) => (
										<li key={i}>
											<Link
												to={getCategoryUrl(edge.node.slug, edge.node.id)}
												className='chevron-before relative'
											>
												{edge.node.name}
											</Link>
										</li>
									))}
								</ul>
							</Collapse>
							{dataCategories?.categories.edges.length > 7 && (
								<div className='mt-5 ml-20'>
									<IconButton
										size='small'
										color='inherit'
										disableRipple
										disableFocusRipple
										onClick={(e) => setOpenAllCategories((prev) => !prev)}
									>
										{isOpenAllCategories ? (
											<ExpandLessIcon fillRule='evenodd' clipRule='evenodd' />
										) : (
											<ExpandMoreIcon fillRule='evenodd' clipRule='evenodd' />
										)}
									</IconButton>
								</div>
							)}
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={3} className='footer__links'>
						<div className='social'>
							<Typography variant='h5' gutterBottom>
								Мы в соцсетях:
							</Typography>
							<div className='flex align-center'>
								<a
									href='https://www.facebook.com/stroy.lux.by/?modal=admin_todo_tour'
									target='_blank'
									rel='noopener'
								>
									<FaFacebookF />
								</a>
								<a
									href='https://www.instagram.com/stroy_lux.by/'
									target='_blank'
									rel='noopener'
								>
									<FaInstagram />
								</a>
								<a href='www.vk.com' target='_blank' rel='noopener'>
									<FaVk />
								</a>
							</div>
						</div>
						<div>
							<Link to={baseUrl} className={classes.logo}>
								<ReactSVG src={Logo} title='СтройЛюкс' className='max-w-250' />
							</Link>
						</div>
					</Grid>
				</Grid>
				<div className='text-center copyright-text'>
					<span>
						©{new Date().getFullYear()} {shop?.name}. Все права защищены
					</span>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
