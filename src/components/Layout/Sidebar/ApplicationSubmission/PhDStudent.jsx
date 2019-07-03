import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(9),
	},
	lev2Nested: {
		paddingLeft: theme.spacing(12),
	},
}));

const PhDStudentApplicationSubmissionSection = ({ onSubmissionPeriod }) => {
	const classes = useStyles();
	const [openSubList, setOpenSubList] = useState({
		showMore: false,
		thesis: false,
	});
	const handleSubListClick = listName => () => {
		setOpenSubList({ ...openSubList, [listName]: !openSubList[listName] });
	};
	return (
		<List
			component="nav"
			subheader={<ListSubheader disableSticky>SUBMIT AN APPLICATION</ListSubheader>}
		>
			<ListItem disabled={!onSubmissionPeriod} button component={Link} to="applications/internship/submit" className={classes.nested}>
				<ListItemText primary="Internship" />
			</ListItem>
			<ListItem disabled={!onSubmissionPeriod} button component={Link} to="applications/confrence/submit" className={classes.nested}>
				<ListItemText primary="Confrence" />
			</ListItem>
			<Collapse in={openSubList.showMore} timeout="auto" unmountOnExit>
				<ListItem button onClick={handleSubListClick('thesis')}>
					<ListItemIcon>
						{openSubList.thesis ? <ExpandLess /> : <ExpandMore />}
					</ListItemIcon>
					<ListItemText primary="Thesis" />
				</ListItem>
				<Collapse in={openSubList.thesis} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem disabled={!onSubmissionPeriod} button component={Link} to="applications/thesis-title-change/submit" className={classes.lev2Nested}>
							<ListItemText primary="Title Change" />
						</ListItem>
						<ListItem disabled={!onSubmissionPeriod} button component={Link} to="applications/add-thesis-co-supervisor/submit" className={classes.lev2Nested}>
							<ListItemText primary="Add Co-Supervisor" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem disabled={!onSubmissionPeriod} button component={Link} to="applications/phd-defense/submit" className={classes.nested}>
					<ListItemText primary="PhD Defense" />
				</ListItem>
				<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/phd-student/application/registration/submit" className={classes.nested}>
					<ListItemText primary="Registration" />
				</ListItem>
				<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/phd-student/application/registration-renewal/submit" className={classes.nested}>
					<ListItemText primary="Registration Renewal" />
				</ListItem>
			</Collapse>
			<ListItem button onClick={handleSubListClick('showMore')}>
				<ListItemIcon>
					{openSubList.showMore ? <ExpandLess /> : <ExpandMore />}
				</ListItemIcon>
				<ListItemText primary={openSubList.showMore ? 'Show less' : 'Show more'} primaryTypographyProps={{ color: 'textSecondary' }} />
			</ListItem>
		</List >
	);
};

export default PhDStudentApplicationSubmissionSection;