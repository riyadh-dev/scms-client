import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const InternshipApplicationFormFields = ({ handleChange, errors, values, loading, subtitle }) => {
	return (
		<Fragment>
			<Grid item xs={12}>
				<TextField
					id="laboratoryName"
					name="laboratoryName"
					label="Laboratory Name"
					error={Boolean(errors.laboratoryName)}
					helperText={errors.laboratoryName}
					value={values.laboratoryName}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="laboratoryWebsite"
					name="laboratoryWebsite"
					label="Laboratory Website"
					error={Boolean(errors.laboratoryWebsite)}
					helperText={errors.laboratoryWebsite}
					onChange={handleChange}
					value={values.laboratoryWebsite}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Typography variant="subtitle1" className={subtitle}>
				Laboratory Location :
			</Typography>
			<Grid item xs={12} sm={6}>
				<TextField
					id="country"
					name="country"
					label="Country"
					error={Boolean(errors.country)}
					helperText={errors.country}
					value={values.country}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					id="city"
					name="city"
					label="City"
					error={Boolean(errors.city)}
					helperText={errors.city}
					value={values.city}
					onChange={handleChange}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Typography variant="subtitle1" className={subtitle}>
				Internship Duration :
			</Typography>
			<Grid item xs={12} sm={6}>
				<TextField
					type="date"
					id="durationFrom"
					name="durationFrom"
					label="From"
					error={Boolean(errors.durationFrom)}
					helperText={errors.durationFrom}
					onChange={handleChange}
					value={values.durationFrom}
					InputLabelProps={{ shrink: true }}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					type="date"
					id="durationTo"
					name="durationTo"
					label="To"
					error={Boolean(errors.durationTo)}
					helperText={errors.durationTo}
					onChange={handleChange}
					value={values.durationTo}
					InputLabelProps={{ shrink: true }}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
		</Fragment>
	);
};
			
export default InternshipApplicationFormFields;