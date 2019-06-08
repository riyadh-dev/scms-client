import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import useStyles from '../../formStyles';
import { useFormInputGroup, validate } from '../../utils';
import { Mutation } from 'react-apollo';
import { SUBMIT_CONFRENCE_APPLICATION } from '../mutations';
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
		const { communicationPaperAbstract, communicationPaperTitle, ...rest } = validationRes.validateInput;
		const ConfrenceApplicationInput = {
			...rest,
			communicationPaper: {
				title: communicationPaperTitle,
				abstract: communicationPaperAbstract
			}
		};
		const { data } = await submitConfrenceApplication({ variables: { ConfrenceApplicationInput } });
		if (data.submitConfrenceApplication.errors) {
			setErrors(data.submitConfrenceApplication.errors);
			return;
		}
		history.push('/submission-review/confrence');
	};

	return (
		<Mutation mutation={SUBMIT_CONFRENCE_APPLICATION}>
			{(submitConfrenceApplication, {loading, error}) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Confrence Visite Application
						</Typography>
						<form onSubmit={handleSubmit(submitConfrenceApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="name"
										name="name"
										label="Confrence Name"
										error={Boolean(errors.name)}
										helperText={errors.name}
										value={values.name}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="website"
										name="website"
										label="Confrence Website"
										error={Boolean(errors.website)}
										helperText={errors.website}
										onChange={handleChange}
										value={values.website}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="location"
										name="location"
										label="Location"
										error={Boolean(errors.location)}
										helperText={errors.location}
										value={values.location}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type="date"
										id="date"
										name="date"
										label="Confrence Date"
										error={Boolean(errors.date)}
										helperText={errors.date}
										onChange={handleChange}
										value={values.date}
										InputLabelProps={{ shrink: true }}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="communicationPaperTitle"
										name="communicationPaperTitle"
										label="Communication Paper Title"
										error={Boolean(errors.communicationPaperTitle)}
										helperText={errors.communicationPaperTitle}
										onChange={handleChange}
										value={values.communicationPaperTitle}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="communicationPaperAbstract"
										name="communicationPaperAbstract"
										label="Communication Paper Abstract"
										error={Boolean(errors.communicationPaperAbstract)}
										helperText={errors.communicationPaperAbstract}
										onChange={handleChange}
										value={values.communicationPaperAbstract}
										variant="outlined"
										fullWidth
										multiline
										rows="4"
									/>
								</Grid>
								<Grid item xs={12}>
									<Button type="submit" variant="contained" color="primary" fullWidth>submit</Button>
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