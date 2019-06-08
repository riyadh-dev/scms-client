import { makeStyles } from '@material-ui/core';
import React, { Fragment, Suspense, useEffect } from 'react';
import Navbar from './Layout/Navbar';
import LoadingTrigger from './LoadingTrigger';
import Routes from './Routes';
import { CHECK_TOKEN_EXPIRED } from './User/mutations';
import { graphql } from 'react-apollo';

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up('lg')]: {
			marginLeft: 270,
		},
	}
}));

const Main = ({ checkTokenExpired }) => {
	const classes = useStyles();
	useEffect(() => {
		checkTokenExpired();
	}, [checkTokenExpired]);

	return (
		//TODO add Error Boundaries
		<Fragment>
			<Navbar />
			<div className={classes.root}>
				<Suspense fallback={<LoadingTrigger />}>
					{Routes}
				</Suspense>
			</div>
		</Fragment>
	);
};

export default graphql(CHECK_TOKEN_EXPIRED, { name: 'checkTokenExpired' })(Main);
