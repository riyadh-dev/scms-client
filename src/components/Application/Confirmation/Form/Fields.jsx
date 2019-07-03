import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const ConfirmationApplicationFormFields = ({ handleChange, errors, values, loading }) => {
	return (
		<Fragment>
			<Grid item xs={12}>
				<TextField
					id="rank"
					name="rank"
					label="Rank"
					error={Boolean(errors.rank)}
					helperText={errors.rank}
					value={values.rank}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					type="date"
					id="recruitmentDate"
					name="recruitmentDate"
					label="Recruitment Date"
					error={Boolean(errors.recruitmentDate)}
					helperText={errors.recruitmentDate}
					onChange={handleChange}
					value={values.recruitmentDate}
					InputLabelProps={{ shrink: true }}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
		</Fragment>
	);
};
			
export default ConfirmationApplicationFormFields;