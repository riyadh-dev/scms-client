import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
	mainFeaturedPost: {
		margin: 24,
		marginBottom: theme.spacing(4),
	},
	mainFeaturedPostContent: {
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
		},
	}
}));

export default function SubmissionState({ activeSession }) {
	const classes = useStyles();

	const getTitleAnddDscription = session => {
		if (!session) return {
			title: 'Submission Are Closed',
			description: <Typography variant="h5" gutterBottom>
				Submission are currently closed, you will not be able to submit any applications until they are open again
			</Typography>
		};

		if (session.onSubmissionPeriod) return {
			title: 'Submissions Are Open',
			description: <Typography variant="h5" gutterBottom>
				Submissions will stay open till&nbsp;
				<strong>{activeSession.submissionsEndDate}</strong><br />
				Scientific Council metting will be held on&nbsp;
				<strong>{activeSession.mettingDate}</strong>
			</Typography>
		};

		if (session.onReviewPeriod) return {
			title: 'Submissions Are Being Reviewed',
			description: <Typography variant="h5" gutterBottom>
				Applications submited between&nbsp;
				<strong>{activeSession.submissionsStartDate}</strong>&nbsp;and&nbsp;
				<strong>{activeSession.submissionsEndDate}
				</strong>&nbsp;are currently being reviewed, you will not be able to submit any applications until Submissions are open again.<br />
				Scientific Council metting will be held on&nbsp;
				<strong>{activeSession.mettingDate}</strong>
			</Typography>
		};
	};
	
	const { title, description } = getTitleAnddDscription(activeSession);
	return (
		<Paper className={classes.mainFeaturedPost}>
			<div className={classes.mainFeaturedPostContent}>
				<Typography component="h1" variant="h3" gutterBottom>
					{title}
				</Typography>
				{description}
			</div>
		</Paper>
	);
}
