import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { DELETE_ANNOUNCEMENT } from './mutations';
import { GET_ANNOUNCEMENTS } from './queries';


const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		margin: 'auto',
		marginBottom: theme.spacing(3),
		width: 700,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
	}
}));

const AnnouncementDetails = ({ location, currentUser, history }) => {
	const classes = useStyles();
	const { announcement } = location.state;
	const isPresident = currentUser.roles.includes('SC_PRESIDENT');
	const handleDelete = deleteAnnouncement => async () => {
		await deleteAnnouncement({ variables: { input: announcement._id } });
		history.push('/');
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography omponent="h1" variant="h4">
					{announcement.title}
				</Typography>
				<Typography variant="h6" color="textSecondary" gutterBottom>
					{announcement.createdAt}
				</Typography>
				<Typography variant="subtitle1" paragraph>
					{announcement.content}
				</Typography>
			</CardContent>
			{isPresident && <CardActions>
				<Button component={Link} to={'/announcements/' + announcement._id + '/edit'} color="primary">
					Edit
				</Button>
				<Mutation mutation={DELETE_ANNOUNCEMENT} refetchQueries={() => [{ query: GET_ANNOUNCEMENTS }]}>
					{deleteAnnouncement => (
						<Button
							color="primary"
							onClick={handleDelete(deleteAnnouncement)}
						>
							Delete
						</Button>
					)}
				</Mutation>
			</CardActions>}
		</Card>
	);
};

export default AnnouncementDetails;