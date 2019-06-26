import { Grid, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';

const ThesisTitleChangeApplicationDetails = ({ details }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Add Thesis Co-Supervisor Application
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Year of First PhD Registration</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.firstPhDRegistrationYear}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Supervisor</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.supervisor}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Current Title</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.currentTitle}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Desired Title</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.desiredTitle}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12}>
					<Typography className={classes.heading}>Cause</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.secondaryHeading}>{details.cause}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

ThesisTitleChangeApplicationDetails.propTypes = {
	details: PropTypes.object.isRequired
};

export default ThesisTitleChangeApplicationDetails;