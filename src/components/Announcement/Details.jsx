import { Button, Paper } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { DELETE_ANNOUNCEMENT } from './mutations';
import { GET_ANNOUNCEMENTS } from './queries';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(3, 2),
	},
	buttonError: {
		color: 'white',
		backgroundColor: red[600],
		'&:hover': {
			backgroundColor: red[800],
		},
	},
}));

export default function AnnouncementDetails({ details, isPresident }) {
	const classes = useStyles();
	const { title, content } = details;
	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" component="h3">
				{title}
			</Typography>
			<Typography paragraph>
				{content}
			</Typography>
			{isPresident && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant="outlined" color="primary" component={Link} to={'/announcement/edit/' + details._id}>
					Edit
				</Button>
				<Mutation mutation={DELETE_ANNOUNCEMENT} refetchQueries={() => [{ query: GET_ANNOUNCEMENTS }]}>
					{deleteAnnouncement => (
						<Button className={classes.buttonError}
							onClick={() => deleteAnnouncement({ variables: { input: details._id } })}
						>
							Delete
						</Button>
					)}
				</Mutation>
			</div>}
		</Paper>
	);
}
