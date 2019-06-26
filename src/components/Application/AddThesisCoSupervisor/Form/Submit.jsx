import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { SUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION } from '../../mutations';
import AddThesisCoSupervisorApplicationFormFields from './Fields';
import validationSchema from './validation';

const AddThesisCoSupervisorApplicationForm = ({ history }) => {
	const classes = useStyles();

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = submitAddThesisCoSupervisorApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = validationRes.validateInput;
		const { data } = await submitAddThesisCoSupervisorApplication({ variables: { input } });
		if (data.submitAddThesisCoSupervisorApplication.errors) {
			setErrors(data.submitAddThesisCoSupervisorApplication.errors);
			return;
		}
		const applicationID = data.submitAddThesisCoSupervisorApplication._id;
		history.push('/application/' + applicationID);
	};

	return (
		<Mutation mutation={SUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION}>
			{(submitAddThesisCoSupervisorApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Add Thesis Co-Supervisor Application
						</Typography>
						<form onSubmit={handleSubmit(submitAddThesisCoSupervisorApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<AddThesisCoSupervisorApplicationFormFields errors={errors} values={values} handleChange={handleChange} />
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

export default AddThesisCoSupervisorApplicationForm;