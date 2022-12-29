import {
	Avatar,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import SubmitFormButton from '../../SubmitFromButton';
import { useFormInputGroup, validate } from '../../utils';
import { LOG_IN } from '../mutations';
import MockAccountsList from './MockAccountsList';
import yupSchema from './validation';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 400,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
		marginTop: theme.spacing(10),
		margin: 'auto',
	},
	title: {
		marginBottom: theme.spacing(3),
		fontWeight: 500,
	},
	avatar: {
		marginBottom: theme.spacing(1),
		backgroundColor: '#f50057',
	},
	paper: {
		padding: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const LoginForm = () => {
	useEffect(() => {
		import(/* webpackChunkName: "MainApp" */ '../../Main');
	}, []);

	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((prev) => !prev);

	const { values, handleChange } = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const [openMockAccountsList, setMockAccountsList] = useState(false);
	const handleOpenOpenMockAccountsList = () => setMockAccountsList(true);
	const handleCloseOpenMockAccountsList = () => setMockAccountsList(false);

	const handleSubmit = (login) => async (event) => {
		event.preventDefault();
		setErrors({});
		const validationRes = validate(yupSchema, values);
		if (validationRes.errors) {
			setErrors(validationRes.errors);
			return;
		}
		const { data } = await login({ variables: validationRes.validateInput });
		if (data.login.errors) {
			setErrors(data.login.errors);
			return;
		}
	};

	return (
		<Mutation mutation={LOG_IN}>
			{(login, { loading, error }) => (
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<Lock />
						</Avatar>
						<Typography component='h1' variant='h6' className={classes.title}>
							Login To Continue
						</Typography>
						<form onSubmit={handleSubmit(login)} noValidate autoComplete='off'>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id='email'
										name='email'
										label='Email'
										error={Boolean(errors.email)}
										helperText={errors.email}
										onChange={handleChange}
										value={values.email}
										disabled={loading}
										variant='outlined'
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type={showPassword ? 'text' : 'password'}
										id='password'
										name='password'
										label='Password'
										error={Boolean(errors.password)}
										helperText={errors.password}
										onChange={handleChange}
										value={values.password}
										disabled={loading}
										variant='outlined'
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='Toggle password visibility'
														onClick={handleClickShowPassword}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<SubmitFormButton
										loading={loading}
										error={error}
										label='log in'
										loadingLabel='logging in...'
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='default'
										onClick={handleOpenOpenMockAccountsList}
										fullWidth
									>
										Mock Accounts
									</Button>
								</Grid>
								<Grid item xs />
								<Grid item>
									<Link
										download
										href='http://localhost:4000/uploads/597de8c7-0001-4763-bc52-dfbfa600ec5b.pdf'
										variant='body2'
									>
										Don't have an account? Sign Up
									</Link>
								</Grid>
							</Grid>
						</form>
					</Paper>
					<MockAccountsList
						handleCloseOpenMockAccountsList={handleCloseOpenMockAccountsList}
						openMockAccountsList={openMockAccountsList}
						login={login}
					/>
				</div>
			)}
		</Mutation>
	);
};

const defaults = {
	email: '',
	password: '',
};

export default LoginForm;
