import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../formStyles';
import { useFormInputGroup, validate } from '../utils';
import { ADD_SC_SESSION } from './mutations';
import validationSchema from './validation';
import SubmitFormButton from '../SubmitFromButton';
import dayjs from 'dayjs';

const SCSessionForm = ({ history }) => {
	const classes = useStyles();
	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = (addSCSession, client) => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput };
		const { data: { addSCSession: activeSCSession } } = await addSCSession({ variables: { input } });
		const data = { activeSCSession };
		client.writeData({ data });
		history.push('/announcement');
	};

	return (
		<Mutation mutation={ADD_SC_SESSION}>
			{(addSCSession, { loading, error, client }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Open Submissions Application
						</Typography>
						<form onSubmit={handleSubmit(addSCSession, client)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="submissionsStartDate"
										name="submissionsStartDate"
										label="Submissions Start Date"
										error={Boolean(errors.submissionsStartDate)}
										helperText={errors.submissionsStartDate}
										onChange={handleChange}
										value={values.submissionsStartDate}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="submissionsEndDate"
										name="submissionsEndDate"
										label="Submissions End Date"
										error={Boolean(errors.submissionsEndDate)}
										helperText={errors.submissionsEndDate}
										onChange={handleChange}
										value={values.submissionsEndDate}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type="date"
										id="mettingDate"
										name="mettingDate"
										label="Metting Date"
										error={Boolean(errors.mettingDate)}
										helperText={errors.mettingDate}
										onChange={handleChange}
										value={values.mettingDate}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<SubmitFormButton loading={loading} error={error} />
								</Grid>
							</Grid>
						</form>
					</Paper>
				</main>
			)}
		</Mutation>
	);
};

const defaults = {
	submissionsStartDate: dayjs().format('YYYY-MM-DD'),
	submissionsEndDate: dayjs().add(2, 'month').format('YYYY-MM-DD'),
	mettingDate: dayjs().add(2, 'month').add(1, 'week').format('YYYY-MM-DD')
};

export default SCSessionForm;