import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../formStyles';
import SubmitFormButton from '../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../utils';
import { EDIT_ANNOUNCEMENT } from '../mutations';
import AnnouncementFormFields from './Fields';
import validationSchema from './validation';

const AnnouncementEditForm = ({ history, match }) => {
	const classes = useStyles();

	const announcementID = match.params.announcementID;

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = EditAnnouncement => async event => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(validationSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { ...validationRes.validateInput, announcementID };
		await EditAnnouncement({ variables: { input } });
		history.push('/announcement');
	};

	return (
		<Mutation mutation={EDIT_ANNOUNCEMENT}>
			{(EditAnnouncement, { loading, error }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Edit Announcement
						</Typography>
						<form onSubmit={handleSubmit(EditAnnouncement)} noValidate autoComplete="off">
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
	content: '',
};

export default AnnouncementEditForm;