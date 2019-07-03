import { Button, Divider, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';


const ConfirmationApplicationDetails = ({ details }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Confirmation Application
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Rank</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.rank}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Recruitment Date</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.recruitmentDate}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Teaching Activities</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button color="primary" component="a" href={details.teachingActivitiesLink} download>
						download
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

ConfirmationApplicationDetails.propTypes = {
	details: PropTypes.object.isRequired
};

export default ConfirmationApplicationDetails;