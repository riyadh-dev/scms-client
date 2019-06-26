import React from 'react';
import { TextField } from '@material-ui/core';

const StatisticsSelector = ({ yeralyReaports, handleChange, value }) => {
	return(
		<div
			style={{
				marginBottom: 12,
			}}
		>
			<TextField
				select
				id="year"
				name="year"
				label="Year"
				value={value}
				onChange={handleChange}
				SelectProps={{ native: true }}
				variant="outlined"
			>
				{yeralyReaports.map(yeralyReaport => (
					<option value={yeralyReaport.year} key={yeralyReaport._id}>
						{yeralyReaport.year}
					</option>
				))}
			</TextField>
		</div>
	);};

export default StatisticsSelector;
