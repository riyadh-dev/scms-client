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

const ApplicationReviewSection = () => {
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
			subheader={<ListSubheader disableSticky>REVIEW APPLICATIONS</ListSubheader>}
		>
			<ListItem button component={Link} to="/application/internship/list" className={classes.nested}>
				<ListItemText primary="Internship" />
			</ListItem>
			<ListItem button component={Link} to="/application/confrence/list" className={classes.nested}>
				<ListItemText primary="Confrence" />
			</ListItem>
			<Collapse in={openSubList.showMore} timeout="auto" unmountOnExit>
				<ListItem button component={Link} to="/application/confirmation/list" className={classes.nested}>
					<ListItemText primary="Confirmation" />
				</ListItem>
				<ListItem button component={Link} to="/application/promotion/list" className={classes.nested}>
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
						<ListItem button component={Link} to="/application/thesis-title-change/list" className={classes.lev2Nested}>
							<ListItemText primary="Title Change" />
						</ListItem>
						<ListItem button component={Link} to="/application/add-thesis-co-supervisor/list" className={classes.lev2Nested}>
							<ListItemText primary="Add Co-Supervisor" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem disabled button component={Link} to="/application/registration" className={classes.nested}>
					<ListItemText primary="Registration" />
				</ListItem>
				<ListItem disabled button component={Link} to="/application/registration-renewal" className={classes.nested}>
					<ListItemText primary="Registration Renewal" />
				</ListItem>
				<ListItem button onClick={handleSubListClick('defense')}>
					<ListItemIcon>
						{openSubList.defense ? <ExpandLess /> : <ExpandMore />}
					</ListItemIcon>
					<ListItemText primary="Defense" />
				</ListItem>
				<Collapse in={openSubList.defense} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem disabled button component={Link} to="/application/phd-defense/list" className={classes.lev2Nested}>
							<ListItemText primary="PhD" />
						</ListItem>
						<ListItem disabled button component={Link} to="/application/habilitation-defence/list" className={classes.lev2Nested}>
							<ListItemText primary="Habilitation" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem disabled button component={Link} to="/application/research-submission/list" className={classes.nested}>
					<ListItemText primary="Research Sumition" />
				</ListItem>
				<ListItem disabled button component={Link} to="/application/course-handout/list" className={classes.nested}>
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

export default ApplicationReviewSection;