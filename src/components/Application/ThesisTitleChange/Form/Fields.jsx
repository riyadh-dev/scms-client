import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const ThesisTitleChangeApplicationFormFields = ({ handleChange, errors, values, loading }) => {

	return (
		<Fragment>
			<Grid item xs={12}>
				<TextField
					id="firstPhDRegistrationYear"
					name="firstPhDRegistrationYear"
					label="Year of First PhD Registration"
					error={Boolean(errors.firstPhDRegistrationYear)}
					helperText={errors.firstPhDRegistrationYear}
					onChange={handleChange}
					value={values.firstPhDRegistrationYear}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="supervisor"
					name="supervisor"
					label="Supervisor"
					error={Boolean(errors.supervisor)}
					helperText={errors.supervisor}
					onChange={handleChange}
					value={values.supervisor}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					id="currentTitle"
					name="currentTitle"
					label="Current Title"
					error={Boolean(errors.currentTitle)}
					helperText={errors.currentTitle}
					onChange={handleChange}
					value={values.currentTitle}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					id="desiredTitle"
					name="desiredTitle"
					label="Desired Title"
					error={Boolean(errors.desiredTitle)}
					helperText={errors.desiredTitle}
					onChange={handleChange}
					value={values.desiredTitle}
					disabled={loading}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="cause"
					name="cause"
					label="Cause"
					error={Boolean(errors.cause)}
					helperText={errors.cause}
					onChange={handleChange}
					value={values.cause}
					disabled={loading}
					variant="outlined"
					fullWidth
					multiline
					rows="3"
				/>
			</Grid>
		</Fragment>
	);
};

export default ThesisTitleChangeApplicationFormFields;