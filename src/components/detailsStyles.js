import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
		margin: 'auto',
		marginBottom: theme.spacing(3),
		width: 700,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
	},
	heading: {
		fontSize: '1rem',
		color: theme.palette.text.secondary,
	},
	secondaryHeading: {
		fontSize: '1rem',
	},
	title:{
		marginBottom: theme.spacing(3),
		fontSize: '1.4rem'
	},
	subtitle: {
		padding: 8,
		marginTop: 4,
		width: '100%',
		fontSize: '1.2rem'
	},
	divider: {
		margin: 8,
		width: '100%'
	},
	container: {
		width: 700,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
		margin: 'auto',
	}
}));