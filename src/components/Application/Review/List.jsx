import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import useStyles from '../../detailsStyles';

const ReviewList = ({ reviews, refuses, accepts }) => {
	const classes = useStyles();
	return (
		<Fragment>
			<Grid container spacing={2} className={classes.container}>
				<Grid item xs={12} sm={4}>
					<Typography align="center" gutterBottom variant="h6" component="h2">
						{reviews.length} Reviews
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography align="center" gutterBottom variant="h6" component="h2">
						{accepts} Accepts
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography align="center" gutterBottom variant="h6" component="h2">
						{refuses} Refuses
					</Typography>
				</Grid>
			</Grid>
			{reviews.map((review, index) => (
				<Paper className={classes.root} key={'reviex'+index}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.heading}>REVIEWER</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.secondaryHeading}>{review.reviewer.firstName + ' ' + review.reviewer.lastName}</Typography>
						</Grid>
						<Divider className={classes.divider} />
						<Grid item xs={12} sm={6}>
							<Typography className={classes.heading}>DECISION</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.secondaryHeading}>{review.decision ? 'Accepted' : 'Refused'}</Typography>
						</Grid>
						<Divider className={classes.divider} />
						<Grid item xs={12}>
							<Typography className={classes.heading}>COMMENT</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography paragraph component="p" >{review.comment}</Typography>
						</Grid>
					</Grid>
				</Paper>
			))}
		</Fragment>
	);
};

export default ReviewList;