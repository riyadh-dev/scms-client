import { Avatar, Button, Grid, IconButton, InputAdornment, LinearProgress, makeStyles, TextField, Typography, Paper } from '@material-ui/core';
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { useFormInputGroup, validate } from '../../utils';
import { LOG_IN } from '../mutations';
import yupSchema from './validation';

const useStyles = makeStyles(theme => ({
	root: {
		width: 400,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
		marginTop: theme.spacing(10),
		margin: 'auto'
	},
	linearProgress: {
		borderRadius: '50px 50px 0 0',
		marginBottom: -4
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
	}
}));

const LoginForm = () => {
	useEffect(() => {
		import(/* webpackChunkName: "MainApp" */ '../../Main');
	}, []);

	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(prev => !prev);

	const {
		values,
		handleChange,
	} = useFormInputGroup(defaults);

	const [errors, setErrors] = useState({});

	const handleSubmit = login => async event => {
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
					{loading && <LinearProgress className={classes.linearProgress} />}
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<Lock />
						</Avatar>
						<Typography component="h1" variant="h6" className={classes.title}>
							Login To Continue
						</Typography>
						{error && <Typography align="center" variant="h6" color="error" className={classes.title}>
							Somthing went wrong
						</Typography>}
						<form onSubmit={handleSubmit(login)} noValidate autoComplete="off">
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="email"
										name="email"
										label="Email"
										error={Boolean(errors.email)}
										helperText={errors.email}
										onChange={handleChange}
										value={values.email}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type={showPassword ? 'text' : 'password'}
										id="password"
										name="password"
										label="Password"
										error={Boolean(errors.password)}
										helperText={errors.password}
										onChange={handleChange}
										value={values.password}
										variant="outlined"
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="Toggle password visibility"
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
									<Button type="submit" variant="contained" color="primary" fullWidth>log in</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>
			)}
		</Mutation>
	);
};

const defaults = {
	email: '',
	password: ''
};

export default LoginForm;
