import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React, { lazy, Suspense } from 'react';
import { compose, graphql } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { AUTHENTICATED } from './components/User/queries';
import { GET_THEME } from './components/Layout/queries';
import { mainThemeDrak, mainThemeLight } from './themes';
const Main = lazy(() => import(/* webpackChunkName: "MainApp" */ './components/Main'));
const LoginForm = lazy(() => import(/* webpackChunkName: "Login" */ './components/User/Login/Form'));

const App = ({ auth, theme }) => {
	return (
		//TODO add Error Boundaries
		<ThemeProvider theme={theme.theme ? mainThemeDrak : mainThemeLight}>
			<CssBaseline />
			<Router>
				<Suspense fallback={null}>
					{auth.authenticated ? <Main /> : <LoginForm />}
				</Suspense>
			</Router>
		</ThemeProvider>
	);
};

export default compose(
	graphql(AUTHENTICATED, { name: 'auth' }),
	graphql(GET_THEME, { name: 'theme' }),
)(App);
