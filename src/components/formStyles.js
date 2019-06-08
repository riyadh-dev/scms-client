import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
	root: {
		margin: 'auto',
		width: 480,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
	},
	root2: {
		margin: 'auto',
		marginBottom: theme.spacing(3),
		width: 700,
		[theme.breakpoints.down('xs')]: {
			width: '96%',
		},
	},
	paper:{
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	linearProgress: {
		borderRadius: '50px 50px 0 0',
		marginBottom: -4
	},
	title:{
		marginBottom: theme.spacing(3),
	},
	subtitle: {
		paddingTop: 12,
		paddingLeft: 12,
		width: '100%'
	},
}));