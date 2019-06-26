import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const AnnouncementAddForm = lazy(() => import('./Form/Add'));
const AnnouncementEditForm = lazy(() => import('./Form/Edit'));
const AnnouncementList = lazy(() => import('./List'));

const MettingAgendaForm = lazy(() => import('../SCSession/MettingAgenda/CreateForm'));
const UserRoutes = () => (
	<Switch>
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcement/edit/:announcementID" component={AnnouncementEditForm} />
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcement/add" component={AnnouncementAddForm} />
		<ProtectedRoute excat path="/announcement" component={AnnouncementList} />
		<ProtectedRoute excat path="/set-metting-agenda" component={MettingAgendaForm} />
	</Switch>
);


export default UserRoutes;