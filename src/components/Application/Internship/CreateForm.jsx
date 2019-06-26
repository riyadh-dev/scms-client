import { Grid, Paper, TextField, Typography, Button, InputAdornment, IconButton } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import { useFormInputGroup, validate } from '../../utils';
import { SUBMIT_INTRENSHIP_APPLICATION } from '../mutations';
import validationSchema from './validation';
import SubmitFormButton from '../../SubmitFromButton';
import { RemoveCircle } from '@material-ui/icons';

const InternshipApplicationForm = ({ history }) => {
	const classes = useStyles();

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const [file, setFile] = useState(null);
	const handleFileInputChange = event => {
		setFile(event.target.files[0]);
	};
	const handleRemoveFile = () => {
		setFile(null);
	};

	const handleSubmit = submitInternshipApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = {...validationRes.validateInput, workPlanFile: file};
		const { data } = await submitInternshipApplication({
			variables: { input }
		});
		if (data.submitInternshipApplication.errors) {
			setErrors(data.submitInternshipApplication.errors);
			return;
		}
		const applicationID = data.submitInternshipApplication._id;
		history.push('/application/'+applicationID);
	};

	return (
		<Mutation mutation={SUBMIT_INTRENSHIP_APPLICATION}>
			{(submitInternshipApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Internship Application
						</Typography>
						<form onSubmit={handleSubmit(submitInternshipApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="laboratoryName"
										name="laboratoryName"
										label="Laboratory Name"
										error={Boolean(errors.laboratoryName)}
										helperText={errors.laboratoryName}
										value={values.laboratoryName}
										onChange={handleChange}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="laboratoryWebsite"
										name="laboratoryWebsite"
										label="Laboratory Website"
										error={Boolean(errors.laboratoryWebsite)}
										helperText={errors.laboratoryWebsite}
										onChange={handleChange}
										value={values.laboratoryWebsite}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Typography variant="subtitle1" className={classes.subtitle}>
									Laboratory Location :
								</Typography>
								<Grid item xs={12} sm={6}>
									<TextField
										id="country"
										name="country"
										label="Country"
										error={Boolean(errors.country)}
										helperText={errors.country}
										value={values.country}
										onChange={handleChange}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="city"
										name="city"
										label="City"
										error={Boolean(errors.city)}
										helperText={errors.city}
										value={values.city}
										onChange={handleChange}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Typography variant="subtitle1" className={classes.subtitle}>
									Internship Duration :
								</Typography>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="durationFrom"
										name="durationFrom"
										label="From"
										error={Boolean(errors.durationFrom)}
										helperText={errors.durationFrom}
										onChange={handleChange}
										value={values.durationFrom}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="durationTo"
										name="durationTo"
										label="To"
										error={Boolean(errors.durationTo)}
										helperText={errors.durationTo}
										onChange={handleChange}
										value={values.durationTo}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								{!file && <Grid item xs={12}>
									<input
										className={classes.fileInput}
										id="work-plan-file-uploader"
										type="file"
										accept=".pdf"
										onChange={handleFileInputChange}
									/>
									<label htmlFor="work-plan-file-uploader">
										<Button variant="contained" color="default" component="span" fullWidth>
											Select Work Plan file
										</Button>
									</label>
								</Grid>}
								{file && <Fragment> <Grid item xs={12}>
									<TextField
										label='Selected Work Plan File'
										value={file.name}
										disabled={loading}
										variant="outlined"
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="Remove File"
														onClick={handleRemoveFile}
														disabled={loading}
													>
														<RemoveCircle color="error" />
													</IconButton>
												</InputAdornment>
											),
										}} />
								</Grid>
								<Grid item xs={12}>
									<SubmitFormButton loading={loading} error={error} />
								</Grid>
								</Fragment>}
							</Grid>
						</form>
					</Paper>
				</main>
			)}
		</Mutation>
	);
};

const defaults = {
	laboratoryName: '',
	laboratoryWebsite: '',
	city: '',
	country: '',
	durationFrom: '2019-05-13',
	durationTo: '2019-06-13',
};

export default InternshipApplicationForm;