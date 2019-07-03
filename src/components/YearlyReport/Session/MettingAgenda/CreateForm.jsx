/* eslint-disable react/jsx-no-duplicate-props */
import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useStyles from '../../../formStyles';
import SubmitFormButton from '../../../SubmitFromButton';
import { useDynamicArrayForm, validate } from '../../../utils';
import { SET_METTING_AGENDA } from '../../mutations';
import validationSchema from './validation';

const MettingAgendaForm = ({ activeSession, history }) => {
	const classes = useStyles();
	const mettingAgenda = useDynamicArrayForm('', 2, 10);
	const [errors, setErrors] = useState({});

	const handleSubmit = (setMettingAgenda, client) => async event => {
		event.preventDefault();
		if (!activeSession) return;
		const sessionID = activeSession._id;
		setErrors({});
		const validationRes = validate(validationSchema, mettingAgenda);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const input = { mettingAgenda: validationRes.validateInput.array, sessionID };
		await setMettingAgenda({ variables: { input } });
		history.push('/');
	};

	return (
		<Mutation mutation={SET_METTING_AGENDA}>
			{(setMettingAgenda, { data, loading, client }) => (
				<main className={classes.root}>
					<Paper className={classes.paper}>
						<Typography align="center" variant="h6" className={classes.title}>
							Metting Agenda
						</Typography>
						<form onSubmit={handleSubmit(setMettingAgenda, client)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								{mettingAgenda.array.map((mettingAgendaTopic, index) => (
									<Grid item xs={12} key={'juryMember' + index}>
										<TextField
											id={`mettingAgendaTopic#${index + 1}`}
											name={`mettingAgendaTopic#${index + 1}`}
											label={`Metting Agenda Topic #${index + 1}`}
											inputProps={{ 'data-index': index }}
											error={Boolean(errors.Team)}
											helperText={errors.Team}
											onChange={mettingAgenda.handleElementChange}
											value={mettingAgendaTopic}
											variant="outlined"
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="Remove Team Member"
															onClick={mettingAgenda.handleRemoveElement(index)}
														>
															<RemoveCircle color="error" />
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</Grid>
								))}
								<Grid item xs={12} sm={6}></Grid>
								<Grid item xs={12} sm={6}>
									<Button onClick={mettingAgenda.handleAddElement} variant="contained" color="default" fullWidth>Add A Topic</Button>
								</Grid>
								<Grid item xs={12}>
									<SubmitFormButton />
								</Grid>
							</Grid>
						</form>
					</Paper>
				</main >
			)}
		</Mutation>
	);
};

export default MettingAgendaForm;