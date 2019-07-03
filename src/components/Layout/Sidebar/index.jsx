import { Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { AddComment, Assignment, Close, EventNote, Home, InsertChart, ListAlt, MeetingRoom } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_CURRENT_USER } from '../../User/queries';
import { GET_ACTIVE_SESSION } from '../../YearlyReport/queries';
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

const Sidebar = ({ session: { activeSession }, user, isSidebarOpen, toggleSidebar }) => {
	const classes = useStyles();
	const roles = user.currentUser.roles;
	const onSubmissionPeriod = activeSession ? activeSession.onSubmissionPeriod : false;
	const onReviewPeriod = activeSession ? activeSession.onReviewPeriod : false;

	const Common = (
		<Fragment>
			<List>
				<ListItem button component={Link} to="/" className={classes.nested}>
					<ListItemIcon><Home /></ListItemIcon>
					<ListItemText primary="Home Page" />
				</ListItem>
				<ListItem button component={Link} to="/applications/mine" className={classes.nested}>
					<ListItemIcon><Assignment /></ListItemIcon>
					<ListItemText primary="My Applications" />
				</ListItem>
				{roles.includes('SC_PRESIDENT') &&
					<ListItem button component={Link} to="/announcements/add" className={classes.nested}>
						<ListItemIcon><AddComment /></ListItemIcon>
						<ListItemText primary="Add Announcement" />
					</ListItem>
				}
				{roles.includes('SC_PRESIDENT') &&
					<ListItem disabled={Boolean(activeSession)} button component={Link} to="/applications/open-submissions" className={classes.nested}>
						<ListItemIcon><MeetingRoom /></ListItemIcon>
						<ListItemText primary="Open Submissions" />
					</ListItem>
				}
				{roles.includes('SC_PRESIDENT') &&
					<ListItem disabled={!onReviewPeriod} button component={Link} to="/announcements/set-metting-agenda" className={classes.nested}>
						<ListItemIcon><EventNote /></ListItemIcon>
						<ListItemText primary="Set Metting Agenda" />
					</ListItem>
				}
				{roles.includes('SC_PRESIDENT') &&
					<ListItem button component={Link} to="/applications/statistics" className={classes.nested}>
						<ListItemIcon><InsertChart /></ListItemIcon>
						<ListItemText primary="Statistics" />
					</ListItem>
				}
				{roles.includes('SC_PRESIDENT') &&
					<ListItem button component={Link} to="/applications" className={classes.nested}>
						<ListItemIcon><ListAlt /></ListItemIcon>
						<ListItemText primary="Submitted Applications" />
					</ListItem>
				}
			</List>
			<Divider />
			{roles.includes('FACULTY_MEMBER') &&
				<Fragment>
					<FacultyMemberApplicationSubmissionSection onSubmissionPeriod={onSubmissionPeriod} />
					<Divider />
				</Fragment>
			}
			{roles.includes('PHD_STUDENT') &&
				<Fragment>
					<PhDStudentApplicationSubmissionSection onSubmissionPeriod={onSubmissionPeriod} />
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
						<Typography onClick={toggleSidebar} color="inherit" variant="h6" className={classes.grow}>
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

export default compose(
	graphql(GET_CURRENT_USER, { name: 'user' }),
	graphql(GET_ACTIVE_SESSION, { name: 'session' }),
)(Sidebar);