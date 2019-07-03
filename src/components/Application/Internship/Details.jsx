import { Button, Divider, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';


const InternshipApplicationDetails = ({ details }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Internship Application
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>LABORATORY NAME</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.laboratoryName}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>LABORATORY WEBSITE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.laboratoryWebsite}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Typography variant="subtitle1" className={classes.subtitle}>
					Location
				</Typography>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CITY</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.city}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>COUNTRY</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.country}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Typography variant="subtitle1" className={classes.subtitle}>
					Duration
				</Typography>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>From</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.durationFrom}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>To</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.durationTo}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>WORK PLAN</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button color="primary" component="a" href={details.workPlanLink} download>
						download
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

InternshipApplicationDetails.propTypes = {
	details: PropTypes.object.isRequired
};

export default InternshipApplicationDetails;