import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import AnnouncementDetails from '../Announcement/ListItem';
import LoadingTrigger from '../LoadingTrigger';
import { GET_ANNOUNCEMENTS } from '../Announcement/queries';
import MettingAgenda from './MettingAgenda';
import SubmissionState from './SubmissionState';

export default function HomePage({ activeSession }) {
	return (
		<Fragment>
			<SubmissionState activeSession={activeSession}/>
			{activeSession && Boolean(activeSession.mettingAgenda.length) && <MettingAgenda mettingAgenda={activeSession.mettingAgenda} />}
			<Grid container spacing={3} style={{ paddingLeft: 24, paddingRight: 24 }}>
				<Query query={GET_ANNOUNCEMENTS} fetchPolicy="network-only">
					{({ data, loading, error }) => {
						if (loading) return <LoadingTrigger />;
						if (error) return null;
						return data.announcements.map(announcement => (
							<Grid item xs={12} md={6} key={announcement._id}>
								<AnnouncementDetails details={announcement} />
							</Grid>
						));

					}}
				</Query>
			</Grid>
		</Fragment>
	);
}


