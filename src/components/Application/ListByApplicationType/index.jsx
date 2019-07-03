import React, { useEffect, useState } from 'react';
import { graphql, Query } from 'react-apollo';
import LoadingTrigger from '../../LoadingTrigger';
import { GET_YEARLY_REPORTS } from '../../YearlyReport/queries';
import { GET_APPLICATIONS_BY_SESSION_AND_TYPE } from '../queries';
import ApplicationListByApplicationTypeSessionSelector from './SCSessionSelector';
import ApplicationListByApplicationTypeTable from './Table';

const ApplicationListByApplicationType = ({ data, currentUser }) => {
	const { yearlyReports, loading, error } = data;
	
	const [values, setValues] = useState({
		yearlyReportIndex: 0,
		SessionIndex: 0,
		applicationType: 'INTERNSHIP'
	});
	const handleChange = ({ target: { name, value } }) => {
		setValues({ ...values, SessionIndex: 0, [name]: value });
	};
	
	const [input, setInput] = useState(null);
	useEffect(() => {
		if (yearlyReports)
			setInput({
				SessionID: yearlyReports[values.yearlyReportIndex].sessions[values.SessionIndex]._id,
				applicationType: values.applicationType
			});
	}, [yearlyReports, values]);

	if (loading) return <LoadingTrigger />;
	if (error) return null;
	if (!input) return null;

	return (
		<div style={{ width: 1000, margin: 'auto' }}>
			<ApplicationListByApplicationTypeSessionSelector
				handleChange={handleChange}
				values={values}
				yearlyReports={data.yearlyReports}
			/>
			<Query query={GET_APPLICATIONS_BY_SESSION_AND_TYPE} variables={{ input }} fetchPolicy="network-only">
				{({ data, loading, error }) => {
					if (loading) return <LoadingTrigger />;
					if (error) return null;
					return <ApplicationListByApplicationTypeTable
						data={data.applicationsBySessionAndType}
						currentUserID={currentUser._id}
					/>;
				}}
			</Query>
		</div>
	);
};

export default graphql(GET_YEARLY_REPORTS, { options: { fetchPolicy: 'network-only' } })(ApplicationListByApplicationType);