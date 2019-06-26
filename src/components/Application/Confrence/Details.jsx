import { Grid, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../../detailsStyles';
import dayjs from 'dayjs';

const ConfrenceApplicationDetails = ({ details }) => {
	const classes = useStyles();
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
					<Typography className={classes.secondaryHeading}>{details.name}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CONFRENCE WEBSITE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.website}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>LOCATION</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.location}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>CONFRENCE DATE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{dayjs(details.confrenceDate).format('MMM DD, YYYY')}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Typography variant="subtitle1" className={classes.subtitle}>
					Communication Paper
				</Typography>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>TITLE</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{details.communicationPaperTitle}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>ABSTRACT</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.secondaryHeading}>{details.communicationPaperAbstract}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

ConfrenceApplicationDetails.propTypes = {
	details: PropTypes.object.isRequired
};

export default ConfrenceApplicationDetails;