import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AnnouncementRoutes from './Announcement/Routes';
import ApplicationRoutes from './Application/Routes';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';
import UserDetails from './User/Details';

const Routes = (
	<Switch>
		<ProtectedRoute excat path="/profile" component={UserDetails} />
		<Route excat path="/applications" component={ApplicationRoutes} />
		<Route excat path="/announcements" component={AnnouncementRoutes} />
		<ProtectedRoute excat path="/" component={HomePage} />
	</Switch>
);


export default Routes;