import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { SUBMIT_CONFRENCE_APPLICATION } from '../../mutations';
import ConfrenceApplicationFormFields from './Fields';
import validationSchema from './validation';

const ConfrenceApplicationForm = ({ history }) => {
	const classes = useStyles();

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = submitConfrenceApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = validationRes.validateInput;
		const { data } = await submitConfrenceApplication({ variables: { input } });
		if (data.submitConfrenceApplication.errors) {
			setErrors(data.submitConfrenceApplication.errors);
			return;
		}
		const applicationID = data.submitConfrenceApplication._id;
		history.push('/application/'+applicationID);
	};

	return (
		<Mutation mutation={SUBMIT_CONFRENCE_APPLICATION}>
			{(submitConfrenceApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Confrence Application
						</Typography>
						<form onSubmit={handleSubmit(submitConfrenceApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<ConfrenceApplicationFormFields errors={errors} values={values} handleChange={handleChange} />
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
	name: '',
	date: '2019-05-13',
	location: '',
	website: '',
	communicationPaperTitle: '',
	communicationPaperAbstract: '',
};

export default ConfrenceApplicationForm;