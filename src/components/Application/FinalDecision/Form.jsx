import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import SubmitFormButton from '../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../utils';
import { GIVE_APPLICATION_FINAL_DECISION } from '../mutations';
import validationSchema from './validation';

const FinalDecisionForm = ({ applicationID }) => {
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
		<Mutation mutation={GIVE_APPLICATION_FINAL_DECISION}>
			{(reviewApplication, { loading, error }) => (
				<div className={classes.root2}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Final Decision
						</Typography>
						<form onSubmit={handleSubmit(reviewApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										select
										id="finalDecision"
										name="finalDecision"
										label="Final Decision"
										error={Boolean(errors.finalDecision)}
										helperText={errors.finalDecision}
										value={values.finalDecision}
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
	finalDecision: 'true',
};

export default FinalDecisionForm;