import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';

const AnnouncementFormFields = ({ handleChange, errors, values }) => {

	return (
		<Fragment>
			<Grid item xs={12}>
				<TextField
					id="title"
					name="title"
					label="Title"
					error={Boolean(errors.title)}
					helperText={errors.title}
					onChange={handleChange}
					value={values.title}
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id="content"
					name="content"
					label="Content"
					error={Boolean(errors.content)}
					helperText={errors.content}
					onChange={handleChange}
					value={values.content}
					variant="outlined"
					fullWidth
					multiline
					rows="3"
				/>
			</Grid>
		</Fragment>
	);
};

export default AnnouncementFormFields;