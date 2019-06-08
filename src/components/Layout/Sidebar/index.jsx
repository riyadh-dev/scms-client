import { Divider, Drawer, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_CURRENT_USER } from '../../User/queries';
import ApplicationReviewSection from './ApplicationReview';
import FacultyMemberApplicationSubmissionSection from './ApplicationSubmission/FacultyMember';
import PhDStudentApplicationSubmissionSection from './ApplicationSubmission/PhDStudent';

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		backgroundColor: theme.palette.secondary.main,
		width: drawerWidth,
		borderWidth: '0px 1px 0px 0px'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	grow: {
		flexGrow: 1,
		textDecoration: 'none'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		marginLeft: -12,
	},
	toolbar: theme.mixins.toolbar, 
	toolbarPaddingRight0: {
		paddingRight: 0
	}
}));

const Sidebar = ({ data, isSidebarOpen, toggleSidebar }) => {
	const classes = useStyles();
	const roles = data.currentUser.roles;
	const Common = (
		<Fragment>
			{roles.includes('SC_PRESIDENT') &&
				<Fragment>
					<ApplicationReviewSection />
					<Divider />
				</Fragment>
			}

			{roles.includes('SC_MEMBER') &&
				<Fragment>
					<ApplicationReviewSection />
					<Divider />
				</Fragment>
			}

			{roles.includes('FACULTY_MEMBER') &&
				<Fragment>
					<FacultyMemberApplicationSubmissionSection />
					<Divider />
				</Fragment>
			}

			{roles.includes('PHD_STUDENT') &&
				<Fragment>
					<PhDStudentApplicationSubmissionSection />
					<Divider />
				</Fragment>
			}
		</Fragment>
	);
	return (
		<Fragment>
			<Hidden mdDown>
				<Drawer
					className={classes.drawer}
					classes={{ paper: classes.drawerPaper }}
					variant="permanent"
				>
					<div className={classes.toolbar} />
					{Common}
				</Drawer>
			</Hidden>
			<Hidden lgUp>
				<Drawer
					open={isSidebarOpen}
					onClose={toggleSidebar}
					className={classes.drawer}
					classes={{ paper: classes.drawerPaper }}
					variant="temporary"
				>
					<Toolbar className={classes.toolbarPaddingRight0}>
						<IconButton
							onClick={toggleSidebar}
							className={classes.menuButton}
							aria-label="Close Sidebar"
						>
							<Close />
						</IconButton>
						<Typography onClick={toggleSidebar} component={Link} to="/" color="inherit" variant="h6" className={classes.grow}>
							SCMS
						</Typography>
					</Toolbar>
					<Divider />
					{Common}
				</Drawer>
			</Hidden>
		</Fragment>
	);
};

Sidebar.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
	toggleSidebar: PropTypes.func.isRequired
};

export default graphql(GET_CURRENT_USER)(Sidebar);