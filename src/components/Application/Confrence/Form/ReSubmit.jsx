import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { RESUBMIT_CONFRENCE_APPLICATION } from '../../mutations';
import ConfrenceApplicationFormFields from './Fields';
import validationSchema from './validation';

const ConfrenceApplicationReSubmitForm = ({ history, match }) => {
	const classes = useStyles();

	const applicationID = match.params.applicationID;

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = reSubmitConfrenceApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput, applicationID };
		const { data } = await reSubmitConfrenceApplication({ variables: { input } });
		if (data.reSubmitConfrenceApplication.errors) {
			setErrors(data.reSubmitConfrenceApplication.errors);
			return;
		}
		const str = '/application/'+applicationID;
		history.push(str);
	};

	return (
		<Mutation mutation={RESUBMIT_CONFRENCE_APPLICATION}>
			{(reSubmitConfrenceApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Confrence Application
						</Typography>
						<form onSubmit={handleSubmit(reSubmitConfrenceApplication)} noValidate autoComplete="off">
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

export default ConfrenceApplicationReSubmitForm;