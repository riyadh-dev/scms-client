import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';
import { GET_CURRENT_USER } from './User/queries';
import { GET_ACTIVE_SESSION } from './YearlyReport/queries';

const ProtectedRoute = ({
	component: Component,
	location,
	allowedRoles = null,
	session: { activeSession },
	user: { currentUser },
	...rest
}) => (
	<Route {...rest} render={props => {
		const hasAllowedRole = allowedRoles ?
			currentUser.roles.filter(role => allowedRoles.includes(role)).length :
			true;

		if (!hasAllowedRole)
			return <Redirect to={{ pathname: '/not-allowed', state: { from: location } }} />;

		return < Component {...props} currentUser={currentUser} activeSession={activeSession} />;
	}} />
);

export default compose(
	graphql(GET_CURRENT_USER, { name: 'user' }),
	graphql(GET_ACTIVE_SESSION, { name: 'session' }),
)(ProtectedRoute);