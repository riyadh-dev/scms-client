import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import useStyles from '../detailsStyles';
import LoadingTrigger from '../LoadingTrigger';
import { GET_ACTIVE_SC_SESSION } from '../SCSession/queries';

export default function AgendaAndSubmissionState() {
	const classes = useStyles();
	return (
		<Query query={GET_ACTIVE_SC_SESSION}>
			{({ data: { activeSCSession }, loading, error }) => {
				if (loading) return <LoadingTrigger />;
				if (error) return null;
				const isSubmissionOpen = !activeSCSession ? false : (
					activeSCSession.canSubmit ? true : false
				);
				return (
					<Fragment>
						<Paper className={classes.root}>
							<Typography variant="h5">
								{isSubmissionOpen ? 
									'Submissions Are Open Till '+ dayjs(activeSCSession.submssionsEndDate).format('MMM DD, YYYY') :
									'Submission Are Closed'
								}
							</Typography>
							{isSubmissionOpen && <Fragment>
								<Typography variant="h6">
									{'SC Metting Will Be Held On '+ dayjs(activeSCSession.mettingDate).format('MMM DD, YYYY')}
								</Typography>
							</Fragment>}
						</Paper>
						{activeSCSession && Boolean(activeSCSession.mettingAgenda.length) && <Paper className={classes.root}>
							<Typography akign="center" variant="h5">
								Metting Agenda
							</Typography>
							<List>
								{activeSCSession.mettingAgenda.map(topic => (
									<ListItem>
										<ListItemText primary={topic} />
									</ListItem>
								))}
							</List>
						</Paper>}
					</Fragment>
				);
			}}
		</Query>
	);
}
