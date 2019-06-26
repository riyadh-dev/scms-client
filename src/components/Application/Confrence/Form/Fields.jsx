import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const ConfrenceApplicationFormFields = ({ handleChange, errors, values }) => {

	return (
		<Fragment>
			<Grid item xs={12}>
				<TextField
					id="name"
					name="name"
					label="Confrence Name"
					error={Boolean(errors.name)}
					helperText={errors.name}
					value={values.name}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="website"
					name="website"
					label="Confrence Website"
					error={Boolean(errors.website)}
					helperText={errors.website}
					onChange={handleChange}
					value={values.website}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="location"
					name="location"
					label="Location"
					error={Boolean(errors.location)}
					helperText={errors.location}
					value={values.location}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					type="date"
					id="date"
					name="date"
					label="Confrence Date"
					error={Boolean(errors.date)}
					helperText={errors.date}
					onChange={handleChange}
					value={values.date}
					InputLabelProps={{ shrink: true }}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="communicationPaperTitle"
					name="communicationPaperTitle"
					label="Communication Paper Title"
					error={Boolean(errors.communicationPaperTitle)}
					helperText={errors.communicationPaperTitle}
					onChange={handleChange}
					value={values.communicationPaperTitle}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="communicationPaperAbstract"
					name="communicationPaperAbstract"
					label="Communication Paper Abstract"
					error={Boolean(errors.communicationPaperAbstract)}
					helperText={errors.communicationPaperAbstract}
					onChange={handleChange}
					value={values.communicationPaperAbstract}
					variant="outlined"
					fullWidth
					multiline
					rows="4"
				/>
			</Grid>
		</Fragment>
	);
};

export default ConfrenceApplicationFormFields;