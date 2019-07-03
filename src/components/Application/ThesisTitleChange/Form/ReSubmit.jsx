import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { RESUBMIT_THESIS_TITLE_CHANGE_APPLICATION } from '../../mutations';
import ThesisTitleChangeApplicationFormFields from './Fields';
import validationSchema from './validation';

const ThesisTitleChangeApplicationReSubmitForm = ({ history, match }) => {
	const classes = useStyles();

	const applicationID = match.params.applicationID;

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = reSubmitThesisTitleChangeApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput, applicationID };
		const { data } = await reSubmitThesisTitleChangeApplication({ variables: { input } });
		if (data.reSubmitThesisTitleChangeApplication.errors) {
			setErrors(data.reSubmitThesisTitleChangeApplication.errors);
			return;
		}
		history.push('/applications/' + applicationID);
	};

	return (
		<Mutation mutation={RESUBMIT_THESIS_TITLE_CHANGE_APPLICATION}>
			{(reSubmitThesisTitleChangeApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Thesis Title Change Application
						</Typography>
						<form onSubmit={handleSubmit(reSubmitThesisTitleChangeApplication)} noValidate autoComplete="off">
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

export default ThesisTitleChangeApplicationReSubmitForm;