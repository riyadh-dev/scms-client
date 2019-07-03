import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { SUBMIT_THESIS_TITLE_CHANGE_APPLICATION } from '../../mutations';
import ThesisTitleChangeApplicationFormFields from './Fields';
import validationSchema from './validation';

const ThesisTitleChangeApplicationForm = ({ history }) => {
	const classes = useStyles();

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = submitThesisTitleChangeApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = validationRes.validateInput;
		const { data } = await submitThesisTitleChangeApplication({ variables: { input } });
		if (data.submitThesisTitleChangeApplication.errors) {
			setErrors(data.submitThesisTitleChangeApplication.errors);
			return;
		}
		const applicationID = data.submitThesisTitleChangeApplication._id;
		history.push('/applications/' + applicationID);
	};

	return (
		<Mutation mutation={SUBMIT_THESIS_TITLE_CHANGE_APPLICATION}>
			{(submitThesisTitleChangeApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Thesis Title Change Application
						</Typography>
						<form onSubmit={handleSubmit(submitThesisTitleChangeApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<ThesisTitleChangeApplicationFormFields loading={loading} errors={errors} values={values} handleChange={handleChange} />
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
	desiredTitle: '',
	currentTitle: '',
	supervisor:'',
	firstPhDRegistrationYear: '',
	cause: ''
};

export default ThesisTitleChangeApplicationForm;