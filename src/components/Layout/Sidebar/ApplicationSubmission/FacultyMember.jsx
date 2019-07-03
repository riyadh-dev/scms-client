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

const FacultyMemberApplicationSubmissionSection = ({ onSubmissionPeriod }) => {
	const classes = useStyles();
	const [openSubList, setOpenSubList] = useState({
		showMore: false,
		defense: false,
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
			<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/internship/submit" className={classes.nested}>
				<ListItemText primary="Internship" />
			</ListItem>
			<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/confrence/submit" className={classes.nested}>
				<ListItemText primary="Confrence" />
			</ListItem>
			<Collapse in={openSubList.showMore} timeout="auto" unmountOnExit>
				<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/confirmation/submit" className={classes.nested}>
					<ListItemText primary="Confirmation" />
				</ListItem>
				<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/promotion/submit" className={classes.nested}>
					<ListItemText primary="Promotion" />
				</ListItem>
				<ListItem button onClick={handleSubListClick('thesis')}>
					<ListItemIcon>
						{openSubList.thesis ? <ExpandLess /> : <ExpandMore />}
					</ListItemIcon>
					<ListItemText primary="Thesis" />
				</ListItem>
				<Collapse in={openSubList.thesis} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/thesis-title-change/submit" className={classes.lev2Nested}>
							<ListItemText primary="Title Change" />
						</ListItem>
						<ListItem disabled={!onSubmissionPeriod} button component={Link} to="/applications/add-thesis-co-supervisor/submit" className={classes.lev2Nested}>
							<ListItemText primary="Add Co-Supervisor" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={handleSubListClick('defense')}>
					<ListItemIcon>
						{openSubList.defense ? <ExpandLess /> : <ExpandMore />}
					</ListItemIcon>
					<ListItemText primary="Defense" />
				</ListItem>
				<Collapse in={openSubList.defense} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem disabled button component={Link} to="/applications/phd-defense/submit" className={classes.lev2Nested}>
							<ListItemText primary="PhD" />
						</ListItem>
						<ListItem disabled button component={Link} to="/applications/habilitation-defence/submit" className={classes.lev2Nested}>
							<ListItemText primary="Habilitation" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem disabled button component={Link} to="/applications/research-submission/submit" className={classes.nested}>
					<ListItemText primary="Research Sumition" />
				</ListItem>
				<ListItem disabled button component={Link} to="/applications/course-handout/submit" className={classes.nested}>
					<ListItemText primary="Course Handout" />
				</ListItem>
			</Collapse>
			<ListItem button onClick={handleSubListClick('showMore')}>
				<ListItemIcon>
					{openSubList.showMore ? <ExpandLess /> : <ExpandMore />}
				</ListItemIcon>
				<ListItemText primary={openSubList.showMore ? 'Show less' : 'Show more'} primaryTypographyProps={{ color: 'textSecondary' }} />
			</ListItem>
		</List>
	);
};

export default FacultyMemberApplicationSubmissionSection;