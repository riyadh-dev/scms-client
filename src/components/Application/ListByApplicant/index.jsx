import React from 'react';
import { Query } from 'react-apollo';
import LoadingTrigger from '../../LoadingTrigger';
import ApplicationListByApplicantTable from './Table';
import { GET_APPLICATIONS_BY_APPLICANT } from '../queries';

const ApplicationsListByApplicant = ({ currentUser, match }) => {
	const input = match.params._id ? match.params._id : currentUser._id;
	
	return (
		<Query query={GET_APPLICATIONS_BY_APPLICANT} variables={{ input }} fetchPolicy="network-only">
			{({ data, loading, error }) => {
				if (loading) return <LoadingTrigger />;
				if (error) return null;
				return <ApplicationListByApplicantTable data={data.applicationsByApplicant} />;
			}}
		</Query>
	);
};

export default ApplicationsListByApplicant;