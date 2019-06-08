import { Grid, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';

const ConfrenceApplicationDetails = ({ confrence }) => {
	const classes = useStyles();
	const confrenceDate = (new Date(parseInt(confrence.date))).toDateString();
	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				Confrence Application
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CONFRENCE NAME</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{confrence.name}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CONFRENCE WEBSITE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{confrence.website}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>LOCATION</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{confrence.location}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CONFRENCE DATE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{confrenceDate}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Typography variant="subtitle1" className={classes.subtitle}>
					Communication Paper
				</Typography>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>TITLE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{confrence.communicationPaper.title}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>ABSTRACT</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.secondaryHeading}>{confrence.communicationPaper.abstract}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

ConfrenceApplicationDetails.propTypes = {
	confrence: PropTypes.object.isRequired
};

export default ConfrenceApplicationDetails;