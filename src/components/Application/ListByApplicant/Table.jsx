import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { kebabCase, startCase } from 'lodash';
import dayjs from 'dayjs';

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

const ApplicationListByApplicantTable = ({ data, currentUserID }) => {
	const classes = useStyles();
	const [applications, setApplications] = useState([]);
	useEffect(() => {
		setApplications(
			data.map(app => ({
				_id: app._id,
				applicationType: startCase(app.__typename.replace('Application', '')),
				submittedAt: (app.submittedAt),
				treated: app.treated,
				finalDecision: app.finalDecision,
				applicationTypeURL: kebabCase(app.__typename.replace('Application', ''))
			}))
		);
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
								active={sortBy === 'applicationType'}
								direction={sortDirection}
								onClick={handleSortBy('applicationType')}
							>Application Type</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'submittedAt'}
								direction={sortDirection}
								onClick={handleSortBy('submittedAt')}
							>Submission Date</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'treated'}
								direction={sortDirection}
								onClick={handleSortBy('treated')}
							>Treated</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'finalDecision'}
								direction={sortDirection}
								onClick={handleSortBy('finalDecision')}
							>Final Decision</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{applications.map(application => (
						<TableRow 
							key={application._id} 
							hover 
							component={Link} 
							to={`/application/${application._id}`} 
							className={classes.tableRow}
						>
							<TableCell>{application.applicationType}</TableCell>
							<TableCell>{dayjs(application.submittedAt).format('MMM DD, YYYY')}</TableCell>
							<TableCell>{application.treated ? 'yes' : 'no'}</TableCell>
							<TableCell>{application.treated ? (application.finalDecision ? 'accepted' : 'refused') : '_'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

export default ApplicationListByApplicantTable;