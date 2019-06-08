import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orderBy } from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const ApplicationsListTable = ({ data, currentUserID }) => {
	const classes = useStyles();

	const isReviewed = review => review.reviewer._id === currentUserID;
	const formatedData = data.map(app => ({
		_id: app._id,
		name: app.applicant.firstName + ' ' + app.applicant.lastName,
		accepts: app.accepts,
		refuses: app.refuses,
		finalDecision: app.finalDecision,
		reviewed: Boolean(app.reviews.find(isReviewed))
	}));
	
	const [applications, setApplications] = useState(formatedData);
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
								active={sortBy === 'firstName'}
								direction={sortDirection}
								onClick={handleSortBy('firstName')}
							>Name</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'accepts'}
								direction={sortDirection}
								onClick={handleSortBy('accepts')}
							>Accepts</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'refuses'}
								direction={sortDirection}
								onClick={handleSortBy('refuses')}
							>Refuses</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'finalDecision'}
								direction={sortDirection}
								onClick={handleSortBy('finalDecision')}
							>Final Decision</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortBy === 'reviewed'}
								direction={sortDirection}
								onClick={handleSortBy('reviewed')}
							>Reviewed By You</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{applications.map(application => (
						<TableRow key={application._id} hover component={Link} to={`/application/review/confrence/${application._id}`} className={classes.tableRow}>
							<TableCell>{application.name}</TableCell>
							<TableCell>{application.accepts}</TableCell>
							<TableCell>{application.refuses}</TableCell>
							<TableCell>{application.finalDecision ? 'accepted' : 'refused'}</TableCell>
							<TableCell>{application.reviewed ? 'yes' : 'no'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

export default ApplicationsListTable;