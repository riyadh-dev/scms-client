import { Button, Fade, LinearProgress, makeStyles } from '@material-ui/core';
import { indigo, red } from '@material-ui/core/colors';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
	linearProgress: {
		borderRadius: '4px 4px 0 0',
	},
	buttonLoading: {
		borderRadius: '0 0 4px 4px',
	},
	buttonError: {
		color: 'white',
		backgroundColor: red[600],
		'&:hover': {
			backgroundColor: red[800],
		},
	},
	button: {
		color: 'white',
		backgroundColor: indigo[500],
		'&:hover': {
			backgroundColor: indigo[700],
		},
	}
}));

const SubmitFormButton = ({
	loading,
	error,
	label = 'submit',
	loadingLabel = 'submiting...',
	errorLabel = 'error try again'
}) => {
	const classes = useStyles();
	const buttonclassName = loading ? classes.buttonLoading : (error ? classes.buttonError : classes.button);
	const buttonLabel = loading ? loadingLabel : (error ? errorLabel : label);
	return (
		<Fragment>
			<Fade in={loading}><LinearProgress className={classes.linearProgress} /></Fade>
			<Button type="submit" variant="contained" disabled={loading} className={buttonclassName} fullWidth>
				{buttonLabel}
			</Button>
		</Fragment>
	);
};

export default SubmitFormButton;