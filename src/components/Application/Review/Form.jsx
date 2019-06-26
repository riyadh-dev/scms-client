import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import SubmitFormButton from '../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../utils';
import { REVIEW_APPLICATION } from '../mutations';
import validationSchema from './validation';

const ReviewApplicationForm = ({ applicationID }) => {
	const classes = useStyles();
	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = reviewApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = {
			applicationID,
			...validationRes.validateInput
		};
		await reviewApplication({ variables: { input } });
	};

	return (
		<Mutation mutation={REVIEW_APPLICATION}>
			{(reviewApplication, { loading, error }) => (
				<div className={classes.root2}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Application Assessment
						</Typography>
						<form onSubmit={handleSubmit(reviewApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										select
										id="decision"
										name="decision"
										label="Your Decision"
										error={Boolean(errors.decision)}
										helperText={errors.decision}
										value={values.decision}
										onChange={handleChange}
										SelectProps={{ native: true }}
										variant="outlined"
										fullWidth
									>
										<option value="false">Disapprove</option>
										<option value="true">Approve</option>
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="comment"
										name="comment"
										label="Comment"
										error={Boolean(errors.comment)}
										helperText={errors.comment}
										onChange={handleChange}
										value={values.comment}
										variant="outlined"
										fullWidth
										multiline
										rows="4"
									/>
								</Grid>
								<Grid item xs={12}>
									<SubmitFormButton loading={loading} error={error}/>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>
			)}
		</Mutation>
	);
};

const defaults = {
	decision: 'true',
	comment: '',
};

export default ReviewApplicationForm;