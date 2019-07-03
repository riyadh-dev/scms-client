import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
	},
	cardDetails: {
		flex: 1,
	},
}));

export default function AnnouncementDetails({ details }) {
	const classes = useStyles();
	const { title, content, createdAt } = details;
	return (
		<CardActionArea component={Link} to={{
			pathname: '/announcements/' + details._id,
			state: { announcement: details }
		}}>
			<Card className={classes.card}>
				<div className={classes.cardDetails}>
					<CardContent>
						<Typography component="h2" variant="h5">
							{title}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							{createdAt}
						</Typography>
						<Typography variant="subtitle1" paragraph>
							{content.substring(0, 50)}...
						</Typography>
						<Typography variant="subtitle1" color="primary">
							Continue reading
						</Typography>
					</CardContent>
				</div>
			</Card>
		</CardActionArea>
	);
}
