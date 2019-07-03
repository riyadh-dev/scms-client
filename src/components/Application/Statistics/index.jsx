import React, { useEffect, useState } from 'react';
import { graphql, Query } from 'react-apollo';
import LoadingTrigger from '../../LoadingTrigger';
import { GET_YEARLY_REPORTS, GET_YEARLY_STATS } from '../../YearlyReport/queries';
import StatisticsSelector from './Selector';
import StatisticsTable from './Table';

const Statistics = ({ data }) => {
	const { yearlyReports, loading, error } = data;
	const [input, setInput] = useState(null);

	useEffect(() => {
		if (yearlyReports)
			setInput(yearlyReports.filter(report => report.year !== new Date().getFullYear().toString())[0].year);
	}, [yearlyReports]);

	if (loading) return <LoadingTrigger />;
	if (error) return null;
	if (!input) return null;

	const handleChange = ({ target }) => {
		setInput(target.value);
	};

	return (
		<div style={{ width: 1000, margin: 'auto' }}>
			<StatisticsSelector yeralyReaports={yearlyReports.filter(report => report.year !== new Date().getFullYear().toString())} value={input} handleChange={handleChange} />
			<Query query={GET_YEARLY_STATS} variables={{ input }} fetchPolicy="network-only">
				{({ data, loading, error }) => {
					if (loading) return <LoadingTrigger />;
					if (error) return null;
					return <StatisticsTable
						data={data.yearlyReportStatistics}
					/>;
				}}
			</Query>
		</div>
	);
};

export default graphql(GET_YEARLY_REPORTS, { options: { fetchPolicy: 'network-only' } })(Statistics);