import { Grid, Divider, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';
import dayjs from 'dayjs';

const PromotionApplicationDetails = ({ details }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Promotion Application
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Current Rank</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.currentRank}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Desired Rank</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.desiredRank}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Recruitment Date</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{dayjs(details.recruitmentDate).format('MMM DD, YYYY')}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Confirmation Date</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{dayjs(details.confirmationDate).format('MMM DD, YYYY')}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Number of PhD Registrations</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.PhDRegistrationsNumber}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Last Year of PhD Registration</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.lastPhDRegistrationYear}</Typography>
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

PromotionApplicationDetails.propTypes = {
	details: PropTypes.object.isRequired
};

export default PromotionApplicationDetails;