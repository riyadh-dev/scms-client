import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StatisticsPieChart from './PieChart';

const StatisticsDetails = ({ location }) => {
	const [genderStats, setGenderStats] = useState([]);
	const [acceptanceStats, setAcceptancStats] = useState([]);
	const [department, setDepartment] = useState([]);
	const [major, setMajor] = useState([]);
	useEffect(() => {
		const { rawData } = location.state;
		setGenderStats([{
			'id': 'Male',
			'label': 'Male',
			'value': rawData.male,
		}, {
			'id': 'Female',
			'label': 'Female',
			'value': rawData.female,
		}]);

		setAcceptancStats([{
			'id': 'Accepted',
			'label': 'Accepted',
			'value': rawData.accepted,
		}, {
			'id': 'Refused',
			'label': 'Refused',
			'value': rawData.refused,
		}]);

		setDepartment([{
			'id': 'Electronics',
			'label': 'Electronics',
			'value': rawData.electronicsDepartment,
		}, {
			'id': 'Fundamental Education',
			'label': 'Fundamental Education',
			'value': rawData.fundamentalEducationDepartment,
		}, {
			'id': 'Power & Contorl',
			'label': 'Power & Contorl',
			'value': rawData.powerAndContorlDepartment,
		}]);

		setMajor([{
			'id': 'Control',
			'label': 'Control',
			'value': rawData.controlMajor,
		},{
			'id': 'Electronics',
			'label': 'Electronics',
			'value': rawData.electronicsMajor,
		},{
			'id': 'Power',
			'label': 'Power',
			'value': rawData.powerMajor,
		},{
			'id': 'Telecommunication',
			'label': 'Telecommunication',
			'value': rawData.telecommunicationMajor,
		}]);

	}, [location.state]);
	
	if (!location.state) return null;
	return (
		<Grid container spacing={3} style={{ paddingLeft: 24, paddingRight: 24 }}>
			<Grid item xs={12} md={6}>
				<StatisticsPieChart chartData={genderStats} title="Gender" colors={['#7986cb', '#f06292']}/>
			</ Grid>
			<Grid item xs={12} md={6}>
				<StatisticsPieChart chartData={acceptanceStats} title="Acceptance"/>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatisticsPieChart chartData={department} title="Departments"/>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatisticsPieChart chartData={major} title="Majors"/>
			</Grid>
		</Grid>

	);
};

export default StatisticsDetails;