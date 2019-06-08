import { AppBar, Fade, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import UserSection from './UserSection';
import { GET_LOADING } from '../queries';

const useStyles = makeStyles(theme => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.text.primary,
		borderWidth: '0px 0px 1px 0px'
	},
	title: {
		textDecoration: 'none'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		}
	},
	toolbar: {
		minHeight: 59,
		height: 59,
		display: 'flex',
		justifyContent: 'space-between',
	},
	toolbarFilling: theme.mixins.toolbar,
	linearProgressPlaceholder: {
		height: 4
	}
}));

const Navbar = ({ data: { loading }, toggleSidebar }) => {
	const classes = useStyles();

	return (
		<Fragment>
			<AppBar elevation={0} position="fixed" className={classes.root}>
				<Fade in={loading}><LinearProgress /></Fade>
				<Toolbar className={classes.toolbar}>
					<IconButton onClick={toggleSidebar} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
						SCMS
					</Typography>
					<UserSection />
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarFilling} />
		</Fragment>
	);
};

export default graphql(GET_LOADING)(Navbar);