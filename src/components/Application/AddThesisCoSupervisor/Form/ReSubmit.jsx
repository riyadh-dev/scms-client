import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { RESUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION } from '../../mutations';
import AddThesisCoSupervisorApplicationFormFields from './Fields';
import validationSchema from './validation';

const AddThesisCoSupervisorApplicationReSubmitForm = ({ history, match }) => {
	const classes = useStyles();

	const applicationID = match.params.applicationID;

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = ReSubmitAddThesisCoSupervisorApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput, applicationID };
		const { data } = await ReSubmitAddThesisCoSupervisorApplication({ variables: { input } });
		if (data.reSubmitAddThesisCoSupervisorApplication.errors) {
			setErrors(data.reSubmitAddThesisCoSupervisorApplication.errors);
			return;
		}
		history.push('/applications/' + applicationID);
	};

	return (
		<Mutation mutation={RESUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION}>
			{(reSubmitAddThesisCoSupervisorApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Add Thesis Co-Supervisor Application
						</Typography>
						<form onSubmit={handleSubmit(reSubmitAddThesisCoSupervisorApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<AddThesisCoSupervisorApplicationFormFields loading={loading} errors={errors} values={values} handleChange={handleChange} />
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
	supervisor: '',
	coSupervisor: '',
	firstPhDRegistrationYear: '',
	cause: ''
};

export default AddThesisCoSupervisorApplicationReSubmitForm;