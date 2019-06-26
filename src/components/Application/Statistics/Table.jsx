import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

const useStyles = makeStyles(theme => ({
	root: {
		width: 1000,
		margin: 'auto',
		overflowX: 'auto',
		borderWidth: '1px 1px 0px 1px'
	},
	table: {
		minWidth: '98%',
	},
	tableRow: {
		textDecoration: 'inherit',
		color: 'inherit'
	}
}));

const StatisticsTable = ({ data, currentUserID }) => {
	const classes = useStyles();

	const [applications, setApplications] = useState([]);
	const [total, setTotal] = useState({
		accepted: 0,
		refused: 0,
		male: 0,
		female: 0,
		applicaionType: 'Total'
	});

	useEffect(() => {
		const stats = Object.entries(data.statistics).reduce((stats, [key, value]) => {
			if (key === '__typename') return stats;

			stats.total.applications += value.applications;

			stats.total.accepted += value.accepted;
			stats.total.refused += value.applications - value.accepted;
			stats.total.male += value.male;
			stats.total.female += value.female;

			stats.total.electronicsDepartment += value.electronicsDepartment;
			stats.total.fundamentalEducationDepartment += value.fundamentalEducationDepartment;
			stats.total.powerAndContorlDepartment += value.powerAndContorlDepartment;

			stats.total.controlMajor += value.controlMajor;
			stats.total.electronicsMajor += value.electronicsMajor; 
			stats.total.powerMajor += value.powerMajor; 
			stats.total.telecommunicationMajor += value.telecommunicationMajor; 

			stats.arr.unshift({
				applications: value.applications,
				accepted: value.accepted,
				refused: value.applications - value.accepted,

				electronicsDepartment: value.electronicsDepartment,
				fundamentalEducationDepartment: value.fundamentalEducationDepartment,
				powerAndContorlDepartment: value.powerAndContorlDepartment,

				controlMajor: value.controlMajor,
				electronicsMajor: value.electronicsMajor, 
				powerMajor: value.powerMajor, 
				telecommunicationMajor: value.telecommunicationMajor, 

				male: value.male,
				female: value.female,
				applicaionType: startCase(key)
			});

			return stats;
		}, {
			total: {
				applications: 0,
				accepted: 0,
				refused: 0,

				electronicsDepartment: 0,
				fundamentalEducationDepartment: 0,
				powerAndContorlDepartment: 0,

				male: 0,
				female: 0,

				applicaionType: 'Total'
			},
			arr: []
		});

		setApplications(stats.arr);
		setTotal(stats.total);

	}, [currentUserID, data]);

	const [sortBy, setSortBy] = useState('');
	const [sortDirection, setSortDirection] = useState('desc');
	const directionToggle = sortDirection => (
		sortDirection === 'desc' ? 'asc' : 'desc'
	);
	const handleSortBy = columnName => () => {
		const toggledDirection = directionToggle(sortDirection);
		const sortedRows = orderBy(applications, [columnName], [toggledDirection]);
		setApplications(sortedRows);
		setSortBy(columnName);
		setSortDirection(toggledDirection);
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'applicaionType'}
								direction={sortDirection}
								onClick={handleSortBy('applicaionType')}
							>Application Type</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'applications'}
								direction={sortDirection}
								onClick={handleSortBy('applications')}
							>Applications Number</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'accepted'}
								direction={sortDirection}
								onClick={handleSortBy('accepted')}
							>Accepted</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'refused'}
								direction={sortDirection}
								onClick={handleSortBy('refused')}
							>Refused</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{applications.map((application, index) => (
						<TableRow
							key={application.applicaionType + index}
							hover
							component={Link}
							to={{
								pathname: '/statistics/details',
								state: { rawData: application }
							}}
							className={classes.tableRow}
						>
							<TableCell>{application.applicaionType.replace('Application', '')}</TableCell>
							<TableCell>{application.applications}</TableCell>
							<TableCell>{application.accepted}</TableCell>
							<TableCell>{application.refused}</TableCell>

						</TableRow>
					))}
					<TableRow key={total.applicaionType} className={classes.tableRow}>
						<TableCell>{total.applicaionType}</TableCell>
						<TableCell>{total.applications}</TableCell>
						<TableCell>{total.accepted}</TableCell>
						<TableCell>{total.refused}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
};

export default StatisticsTable;