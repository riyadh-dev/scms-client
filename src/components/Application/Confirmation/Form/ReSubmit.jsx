import { Button, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RemoveCircle } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../../utils';
import { RESUBMIT_CONFIRMATION_APPLICATION } from '../../mutations';
import ConfirmationApplicationFormFields from './Fields';
import validationSchema from './validation';

const ConfirmationApplicationForm = ({ history, match }) => {
	const classes = useStyles();
	const applicationID = match.params.applicationID;

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

	const handleSubmit = reSubmitConfirmationApplication => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput, applicationID, teachingActivitiesFile: file };
		const { data } = await reSubmitConfirmationApplication({
			variables: { input }
		});
		if (data.reSubmitConfirmationApplication.errors) {
			setErrors(data.reSubmitConfirmationApplication.errors);
			return;
		}
		history.push('/applications/' + applicationID);
	};

	return (
		<Mutation mutation={RESUBMIT_CONFIRMATION_APPLICATION}>
			{(reSubmitConfirmationApplication, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Confirmation Application
						</Typography>
						<form onSubmit={handleSubmit(reSubmitConfirmationApplication)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<ConfirmationApplicationFormFields loading={loading} errors={errors} values={values} handleChange={handleChange} />
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
	rank: '',
	recruitmentDate: '2019-06-13',
};

export default ConfirmationApplicationForm;