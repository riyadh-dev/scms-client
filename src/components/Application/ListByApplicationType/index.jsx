import React, { useEffect, useState } from 'react';
import { graphql, Query } from 'react-apollo';
import LoadingTrigger from '../../LoadingTrigger';
import { GET_SC_YEARLY_REPORTS } from '../../SCSession/queries';
import ApplicationListByApplicationTypeSCSessionSelector from './SCSessionSelector';
import ApplicationListByApplicationTypeTable from './Table';
import { GET_APPLICATIONS_BY_SC_SESSION_AND_TYPE } from '../queries';

const ApplicationListByApplicationType = ({ data, currentUser, match }) => {
	const { SCYearlyReports, loading, error } = data;
	const applicationType = match.params.applicationType;

	const getApplicationType = key => {
		switch (key) {
		case 'add-thesis-co-supervisor': return 'ADD_THESIS_CO_SUPERVISOR';
		case 'confirmation': return 'CONFIRMATION';
		case 'confrence': return 'CONFRENCE';
		case 'internship': return 'INTERNSHIP';
		case 'promotion': return 'PROMOTION';
		case 'thesis-title-change': return 'THESIS_TITLE_CHANGE';
		default: return null;
		}
	};

	const [indexes, setIndexes] = useState({
		SCYearlyReportIndex: 0,
		SCSessionIndex: 0,
	});
	const [input, setInput] = useState(null);
	useEffect(() => {
		if (SCYearlyReports)
			setInput({
				SCSessionID: SCYearlyReports[indexes.SCYearlyReportIndex].SCSessions[indexes.SCSessionIndex]._id,
				applicationType: getApplicationType(applicationType)
			});
	}, [SCYearlyReports, applicationType, indexes.SCSessionIndex, indexes.SCYearlyReportIndex]);

	if (loading) return <LoadingTrigger />;
	if (error) return null;
	if (!input) return null;

	const handleChange = ({ target: { name, value } }) => {
		setIndexes({ ...indexes, SCSessionIndex: 0, [name]: value });
	};

	return (
		<div style={{ width: 1000, margin: 'auto' }}>
			<ApplicationListByApplicationTypeSCSessionSelector
				handleChange={handleChange}
				values={indexes}
				SCYearlyReports={data.SCYearlyReports}
			/>
			<Query query={GET_APPLICATIONS_BY_SC_SESSION_AND_TYPE} variables={{ input }} fetchPolicy="network-only">
				{({ data, loading, error }) => {
					if (loading) return <LoadingTrigger />;
					if (error) return null;
					return <ApplicationListByApplicationTypeTable
						data={data.applicationsBySCSessionAndType}
						currentUserID={currentUser._id}
					/>;
				}}
			</Query>
		</div>
	);
};

export default graphql(GET_SC_YEARLY_REPORTS, { options: { fetchPolicy: 'network-only' } })(ApplicationListByApplicationType);