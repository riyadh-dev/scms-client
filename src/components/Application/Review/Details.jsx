import { Grid, Divider, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import useStyles from '../../detailsStyles';

const ReviewApplicationDetails = ({ reviews }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Review
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Accepts</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{reviews.accepts}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Refuses</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{reviews.refuses}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>Final Decision</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{!reviews.treated ? '_' : (reviews.finalDecision ? 'accepted' : 'refused')}</Typography>
				</Grid>
				{reviews.currentUserReview && <Fragment>
					<Divider className={classes.divider} />
					<Grid item xs={12} sm={6}>
						<Typography className={classes.heading}>Your Decision</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography className={classes.secondaryHeading}>{reviews.currentUserReview.decision ? 'accepted' : 'refused'}</Typography>
					</Grid>
					<Divider className={classes.divider} />
					<Grid item xs={12} sm={6}>
						<Typography className={classes.heading}>Your Comment</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography className={classes.secondaryHeading}>{reviews.currentUserReview.comment}</Typography>
					</Grid> 
				</Fragment>}
			</Grid>
		</Paper>
	);
};

ReviewApplicationDetails.propTypes = {
	reviews: PropTypes.object.isRequired,
};

export default ReviewApplicationDetails;