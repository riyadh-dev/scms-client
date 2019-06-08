import { Divider, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import useStyles from '../detailsStyles';
const UserDetails = ({ user, currentUser, title = 'My Profile' }) => {
	const classes = useStyles();
	const info = user ? user : currentUser;

	return (
		<Paper className={classes.root}>
			<Typography align="center" className={classes.title}>
				{title}
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>FIRST NAME</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.firstName}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>LAST NAME</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.lastName}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>GENDER</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.gender}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>EMAIL</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.email}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>DEPARTEMENT</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.department}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>MAJOR</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.major}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>OPTION</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.secondaryHeading}>{info.option}</Typography>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item xs={12} sm={6}>
					<Typography className={classes.heading}>ROLES</Typography>
				</Grid>
				{info.roles.map((role, index) => (
					<Fragment key={'infoDtailsRoles' + index}>
						{index !== 0 && <Grid item xs={12} sm={6} />}
						<Grid item xs={12} sm={6} >
							<Typography className={classes.secondaryHeading}>{role.replace('_',' ')}</Typography>
						</Grid>
					</Fragment>
				))}
			</Grid>
		</Paper>
	);
};

UserDetails.propTypes = {
	user: PropTypes.object,
	currentUser: PropTypes.object,
	title: PropTypes.string,
};

export default UserDetails;
