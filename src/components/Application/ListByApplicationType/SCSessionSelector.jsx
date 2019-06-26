import React from 'react';
import { TextField } from '@material-ui/core';
import dayjs from 'dayjs';

const ApplicationListByApplicationTypeSCSessionSelector = ({ SCYearlyReports, handleChange, values }) => {
	return(
		<div
			style={{
				marginBottom: 12,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<TextField
				select
				id="submissionsYear"
				name="SCYearlyReportIndex"
				label="Year"
				value={values.SCYearlyReportIndex}
				onChange={handleChange}
				SelectProps={{ native: true }}
				variant="outlined"
			>
				{SCYearlyReports.map((SCYearlyReport, index) => (
					<option value={index} key={SCYearlyReport._id}>
						{SCYearlyReport.year}
					</option>
				))}
			</TextField>
			<TextField
				select
				id="submissionsDuration"
				name="SCSessionIndex"
				label="Submissions Duration"
				value={values.SCSessionIndex}
				onChange={handleChange}
				SelectProps={{ native: true }}
				variant="outlined"
			>
				{SCYearlyReports[values.SCYearlyReportIndex].SCSessions.map((SCSession, index) => (
					<option value={index} key={SCSession._id}>
						{dayjs(SCSession.submissionsStartDate).format('MMM DD, YYYY')} - {dayjs(SCSession.submissionsEndDate).format('MMM DD, YYYY')}
					</option>
				))}
			</TextField>
		</div>
	);};

export default ApplicationListByApplicationTypeSCSessionSelector;
