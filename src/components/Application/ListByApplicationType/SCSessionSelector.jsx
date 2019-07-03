import { Grid, TextField } from '@material-ui/core';
import { startCase } from 'lodash';
import React from 'react';


const applicationTypes = [
	'ADD_THESIS_CO_SUPERVISOR',
	'CONFIRMATION',
	'CONFRENCE',
	'INTERNSHIP',
	'PROMOTION',
	'THESIS_TITLE_CHANGE'
];

const ApplicationListByApplicationTypeSessionSelector = ({ yearlyReports, handleChange, values }) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md="auto">
				<TextField
					select
					id="applicationType"
					name="applicationType"
					label="Application Type"
					value={values.applicationType}
					onChange={handleChange}
					SelectProps={{ native: true }}
					variant="outlined"
				>
					{applicationTypes.map((appType, index) => (
						<option value={appType} key={'applicationType' + index}>
							{startCase(appType)}
						</option>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md="auto">
				<TextField
					select
					id="submissionsYear"
					name="yearlyReportIndex"
					label="Year"
					value={values.yearlyReportIndex}
					onChange={handleChange}
					SelectProps={{ native: true }}
					variant="outlined"
				>
					{yearlyReports.map((yearlyReport, index) => (
						<option value={index} key={yearlyReport._id}>
							{yearlyReport.year}
						</option>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md="auto">
				<TextField
					select
					id="submissionsDuration"
					name="SessionIndex"
					label="Submissions Duration"
					value={values.SessionIndex}
					onChange={handleChange}
					SelectProps={{ native: true }}
					variant="outlined"
				>
					{yearlyReports[values.yearlyReportIndex].sessions.map((Session, index) => (
						<option value={index} key={Session._id}>
							{Session.submissionsStartDate} - {Session.submissionsEndDate}
						</option>
					))}
				</TextField>
			</Grid>
		</Grid>
	);
};

export default ApplicationListByApplicationTypeSessionSelector;
