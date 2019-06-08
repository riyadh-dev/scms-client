import React, { Fragment, lazy } from 'react';
import ProtectedRoute from '../ProtectedRoute';

/* const LoginForm = lazy(() => {
	return new Promise(res => {
		setTimeout(() => res(import('./Login/Form')), 3000);
	});
}); */

const UserDetails = lazy(() => import('./Details'));
const UserRoutes = () => (
	<Fragment>
		<ProtectedRoute excat path="/profile" component={UserDetails} />
	</Fragment>
);


export default UserRoutes;