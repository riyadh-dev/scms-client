import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import SubmitFormButton from '../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../utils';
import { ADD_ANNOUNCEMENT } from '../mutations';
import AnnouncementFormFields from './Fields';
import validationSchema from './validation';

const AnnouncementAddForm = ({ history }) => {
	const classes = useStyles();

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = AddAnnouncement => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = validationRes.validateInput;
		await AddAnnouncement({ variables: { input } });
		history.push('/announcement');
	};

	return (
		<Mutation mutation={ADD_ANNOUNCEMENT}>
			{(AddAnnouncement, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Add An Announcement
						</Typography>
						<form onSubmit={handleSubmit(AddAnnouncement)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<AnnouncementFormFields errors={errors} values={values} handleChange={handleChange} />
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
	title: '',
	content: ''
};

export default AnnouncementAddForm;