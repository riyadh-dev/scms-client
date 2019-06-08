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

const PhDStudentApplicationSubmissionSection = () => {
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
			<ListItem button component={Link} to="/application/submit/intrenship" className={classes.nested}>
				<ListItemText primary="Intrenship" />
			</ListItem>
			<ListItem button component={Link} to="/application/submit/confrence" className={classes.nested}>
				<ListItemText primary="Confrence" />
			</ListItem>
			<ListItem button component={Link} to="/application/submit/phd-defense" className={classes.lev2Nested}>
				<ListItemText primary="PhD Defense" />
			</ListItem>
			<ListItem button component={Link} to="/phd-student/application/registration" className={classes.nested}>
				<ListItemText primary="Registration" />
			</ListItem>
			<ListItem button component={Link} to="/phd-student/application/registration-renewal" className={classes.nested}>
				<ListItemText primary="Registration Renewal" />
			</ListItem>
			<ListItem button onClick={handleSubListClick('thesis')}>
				<ListItemIcon>
					{openSubList.thesis ? <ExpandLess /> : <ExpandMore />}
				</ListItemIcon>
				<ListItemText primary="Thesis" />
			</ListItem>
			<Collapse in={openSubList.thesis} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button component={Link} to="/application/submit/thesis/title-change" className={classes.lev2Nested}>
						<ListItemText primary="Title Change" />
					</ListItem>
					<ListItem button component={Link} to="/application/submit/thesis/add-co-supervisor" className={classes.lev2Nested}>
						<ListItemText primary="Add Co-Supervisor" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={handleSubListClick('showMore')}>
				<ListItemIcon>
					{openSubList.showMore ? <ExpandLess /> : <ExpandMore />}
				</ListItemIcon>
				<ListItemText primary="Show more" primaryTypographyProps={{ color: 'textSecondary' }} />
			</ListItem>
		</List >
	);
};

export default PhDStudentApplicationSubmissionSection;