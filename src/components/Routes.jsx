import React, { Fragment } from 'react';
import UserRoutes from './User/Routes';
import ApplicationRoutes from './Application/Routes';
import AnnouncementRoutes from './Announcement/Routes';

const Routes = (
	<Fragment>
		<UserRoutes />
		<ApplicationRoutes />
		<AnnouncementRoutes />
	</Fragment>
);


export default Routes;