import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from './User/queries';

const ProtectedRoute = ({ component: Component, location, allowedRoles = null, ...rest }) => (
	<Query query={GET_CURRENT_USER}>
		{({ data: { currentUser } }) => (
			<Route {...rest} render={props => {
				const hasAllowedRole = allowedRoles ?
					currentUser.roles.filter(role => allowedRoles.includes(role)).length :
					true;
				
				if (!hasAllowedRole)
					return <Redirect to={{ pathname: '/not-allowed', state: { from: location } }} />;

				return <Component {...props} currentUser={currentUser} />;
			}} />
		)}
	</Query>
);

export default ProtectedRoute;