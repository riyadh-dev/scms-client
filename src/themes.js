import { grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const commonOverrides = {
	MuiListSubheader: {
		root: { height: 40 }
	},
	/* 	MuiIconButton: {
			root: {
				'&:hover': {
					backgroundColor: 'transparent'
				}
			}
		}, */
};

const commonProps = {
	//MuiPaper: { elevation: 0 },
	//	MuiButtonBase: { disableRipple: true },
	MuiTable: { component: 'div' },
	MuiTableHead: { component: 'div' },
	MuiTableBody: { component: 'div' },
	MuiTableRow: { component: 'div' },
	MuiTableCell: { component: 'div' },
};

export const mainThemeDrak = createMuiTheme({
	props: {
		...commonProps
	},
	palette: {
		type: 'dark',
		secondary: grey,
		background: { default: '#212121' }
	},
	overrides: {
		...commonOverrides,
		MuiAppBar: {
			root: { backgroundColor: '#282828' }
		},
		MuiPaper: {
			root: { border: '1px solid rgba(255, 255, 255, 0.12)' }
		}
	}
});

export const mainThemeLight = createMuiTheme({
	props: {
		...commonProps
	},
	palette: {
		type: 'light',
		secondary: { main: '#f5f5f5' },
	},
	overrides: {
		...commonOverrides,
		MuiAppBar: {
			root: { backgroundColor: '#ffffff' }
		},
		MuiPaper: {
			root: { border: '1px solid rgba(0, 0, 0, 0.12)' }
		}
	}
});