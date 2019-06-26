import React, { useState, useEffect } from 'react';
import { Query, graphql } from 'react-apollo';
import LoadingTrigger from '../../LoadingTrigger';
import { GET_YEARLY_STATS, GET_SC_YEARLY_REPORTS_FOR_STATS } from '../../SCSession/queries';
import StatisticsTable from './Table';
import StatisticsSelector from './Selector';

const Statistics = ({ data }) => {
	const { SCYearlyReportsForStats, loading, error } = data;
	const [input, setInput] = useState(null);
	useEffect(() => {
		if (SCYearlyReportsForStats)
			setInput(SCYearlyReportsForStats[0].year);
	}, [SCYearlyReportsForStats]);
	if (loading) return <LoadingTrigger />;
	if (error) return null;
	if (!input) return null;

	const handleChange = ({ target }) => {
		setInput(target.value);
	};

	return (
		<div style={{ width: 1000, margin: 'auto' }}>
			<StatisticsSelector yeralyReaports={SCYearlyReportsForStats} value={input} handleChange={handleChange} />
			<Query query={GET_YEARLY_STATS} variables={{ input }} fetchPolicy="network-only">
				{({ data, loading, error }) => {
					if (loading) return <LoadingTrigger />;
					if (error) return null;
					return <StatisticsTable
						data={data.SCYearlyReportStatistics}
					/>;
				}}
			</Query>
		</div>
	);
};

export default graphql(GET_SC_YEARLY_REPORTS_FOR_STATS, { options: { fetchPolicy: 'network-only' } })(Statistics);