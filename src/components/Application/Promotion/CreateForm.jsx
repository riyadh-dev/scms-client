import { Grid, Paper, TextField, Typography, Button, InputAdornment, IconButton } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import { useFormInputGroup, validate } from '../../utils';
import { SUBMIT_PROMOTION_APPLICATION } from '../mutations';
import validationSchema from './validation';
import SubmitFormButton from '../../SubmitFromButton';
import { RemoveCircle } from '@material-ui/icons';

const PromotionApplicationForm = ({ history }) => {
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

	const handleSubmit = submitPromotionApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = {...validationRes.validateInput, teachingActivitiesFile: file};
		const { data } = await submitPromotionApplication({
			variables: { input }
		});
		if (data.submitPromotionApplication.errors) {
			setErrors(data.submitPromotionApplication.errors);
			return;
		}
		const applicationID = data.submitPromotionApplication._id;
		history.push('/application/'+applicationID);
	};

	return (
		<Mutation mutation={SUBMIT_PROMOTION_APPLICATION}>
			{(submitPromotionApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Promotion Application
						</Typography>
						<form onSubmit={handleSubmit(submitPromotionApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										id="currentRank"
										name="currentRank"
										label="Current Rank"
										error={Boolean(errors.currentRank)}
										helperText={errors.currentRank}
										value={values.currentRank}
										onChange={handleChange}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="desiredRank"
										name="desiredRank"
										label="Desired Rank"
										error={Boolean(errors.desiredRank)}
										helperText={errors.desiredRank}
										onChange={handleChange}
										value={values.desiredRank}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="recruitmentDate"
										name="recruitmentDate"
										label="Recruitment Date"
										error={Boolean(errors.recruitmentDate)}
										helperText={errors.recruitmentDate}
										onChange={handleChange}
										value={values.recruitmentDate}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										type="date"
										id="confirmationDate"
										name="confirmationDate"
										label="Confirmation Date"
										error={Boolean(errors.confirmationDate)}
										helperText={errors.confirmationDate}
										onChange={handleChange}
										value={values.confirmationDate}
										InputLabelProps={{ shrink: true }}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="PhDRegistrationsNumber"
										name="PhDRegistrationsNumber"
										label="Number of PhD Registrations"
										error={Boolean(errors.PhDRegistrationsNumber)}
										helperText={errors.PhDRegistrationsNumber}
										value={values.PhDRegistrationsNumber}
										onChange={handleChange}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="lastPhDRegistrationYear"
										name="lastPhDRegistrationYear"
										label="Last Year of PhD Registration"
										error={Boolean(errors.lastPhDRegistrationYear)}
										helperText={errors.lastPhDRegistrationYear}
										onChange={handleChange}
										value={values.lastPhDRegistrationYear}
										disabled={loading}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								{!file && <Grid item xs={12}>
									<input
										className={classes.fileInput}
										id="teaching-activities-file-uploader"
										type="file"
										accept=".pdf"
										onChange={handleFileInputChange}
									/>
									<label htmlFor="teaching-activities-file-uploader">
										<Button variant="contained" color="default" component="span" fullWidth>
											Select Teaching Activities file
										</Button>
									</label>
								</Grid>}
								{file && <Fragment> <Grid item xs={12}>
									<TextField
										label='Selected Teaching Activities File'
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
	currentRank: '',
	desiredRank: '',
	PhDRegistrationsNumber: '',
	lastPhDRegistrationYear: '',
	recruitmentDate: '2019-05-13',
	confirmationDate: '2019-06-13',
};

export default PromotionApplicationForm;