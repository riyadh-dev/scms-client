import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import LoadingTrigger from '../LoadingTrigger';
import AgendaAndSubmissionState from './AgendaAndSubmissionState';
import AnnouncementDetails from './Details';
import { GET_ANNOUNCEMENTS } from './queries';

function AnnouncementList({ currentUser }) {
	const isPresident = currentUser.roles.includes('SC_PRESIDENT');
	return (
		<Fragment>
			<AgendaAndSubmissionState />
			<Grid container spacing={3} style={{ paddingLeft: 24, paddingRight: 24 }}>
				<Query query={GET_ANNOUNCEMENTS} fetchPolicy="network-only">
					{({ data, loading, error }) => {
						if (loading) return <LoadingTrigger />;
						if (error) return null;
						return data.announcements.map(announcement => (
							<Grid item xs={12} sm={6} key={announcement._id}>
								<AnnouncementDetails details={announcement} isPresident={isPresident} />
							</Grid>
						));

					}}
				</Query>
			</Grid>
		</Fragment>
	);
}

export default AnnouncementList;
