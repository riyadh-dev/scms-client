import React from 'react';
import ApplicationsListTable from './ListTable';
import { Query } from 'react-apollo';
import { GET_CONFRENCE_APPLICATIONS } from './queries';
import LoadingTrigger from '../LoadingTrigger';

const ConfrenceApplicationsList = ({ currentUser }) => {
	return (
		<Query query={GET_CONFRENCE_APPLICATIONS} fetchPolicy="network-only">
			{({ data: { confrenceApplications }, loading, error }) => {
				if (loading) return <LoadingTrigger />;
				if (error) return null;
				return <ApplicationsListTable data={confrenceApplications} currentUserID={currentUser._id} />;
			}}
		</Query>
	);
};

export default ConfrenceApplicationsList;