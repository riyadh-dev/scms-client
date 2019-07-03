import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
	mainFeaturedPost: {
		margin: 24,
		marginBottom: theme.spacing(4),
	},
	mainFeaturedPostContent: {
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	}
}));

const MettingAgenda = ({ mettingAgenda }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.mainFeaturedPost}>
			<div className={classes.mainFeaturedPostContent}>
				<Typography component="h1" variant="h3" gutterBottom>
					Metting Agenda
				</Typography>
				<Typography variant="h5" gutterBottom>

				</Typography>
				<Grid container spacing={2}>
					{mettingAgenda.map((topic, index) => (
						<Grid item xs={12} sm={6} key={'mettingAgenda' + index}>
							<Typography variant="h5" gutterBottom>{(index + 1) + '. ' + topic}</Typography>
						</Grid>
					))}
				</Grid>
			</div>
		</Paper>
	);
};

export default MettingAgenda;