import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const PromotionApplicationFormFields = ({ handleChange, errors, values, loading }) => {
	return (
		<Fragment>
			<Grid item xs={12} sm={6}>
				<TextField
					id="currentRank"
					name="currentRank"
					label="Current Rank"
					error={Boolean(errors.currentRank)}
					helperText={errors.currentRank}
					value={values.currentRank}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					id="desiredRank"
					name="desiredRank"
					label="Desired Rank"
					error={Boolean(errors.desiredRank)}
					helperText={errors.desiredRank}
					onChange={handleChange}
					value={values.desiredRank}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
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
			<Grid item xs={12} sm={6}>
				<TextField
					type="date"
					id="confirmationDate"
					name="confirmationDate"
					label="Confirmation Date"
					error={Boolean(errors.confirmationDate)}
					helperText={errors.confirmationDate}
					onChange={handleChange}
					value={values.confirmationDate}
					InputLabelProps={{ shrink: true }}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="PhDRegistrationsNumber"
					name="PhDRegistrationsNumber"
					label="Number of PhD Registrations"
					error={Boolean(errors.PhDRegistrationsNumber)}
					helperText={errors.PhDRegistrationsNumber}
					value={values.PhDRegistrationsNumber}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="lastPhDRegistrationYear"
					name="lastPhDRegistrationYear"
					label="Last Year of PhD Registration"
					error={Boolean(errors.lastPhDRegistrationYear)}
					helperText={errors.lastPhDRegistrationYear}
					onChange={handleChange}
					value={values.lastPhDRegistrationYear}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
		</Fragment>
	);
};

export default PromotionApplicationFormFields;