import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const AddThesisCoSupervisorApplicationFormFields = ({ handleChange, errors, values }) => {

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
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="coSupervisor"
					name="coSupervisor"
					label="Co-Supervisor"
					error={Boolean(errors.coSupervisor)}
					helperText={errors.coSupervisor}
					onChange={handleChange}
					value={values.coSupervisor}
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
					variant="outlined"
					fullWidth
					multiline
					rows="3"
				/>
			</Grid>
		</Fragment>
	);
};

export default AddThesisCoSupervisorApplicationFormFields;