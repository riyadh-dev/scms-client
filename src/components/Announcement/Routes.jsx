import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const AnnouncementAddForm = lazy(() => import('./Form/Add'));
const AnnouncementEditForm = lazy(() => import('./Form/Edit'));
const AnnouncementDetails = lazy(() => import('./Details'));
const MettingAgendaForm = lazy(() => import('../YearlyReport/Session/MettingAgenda/CreateForm'));

const  AnnouncementRoutes = () => (
	<Switch>
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcements/add" component={AnnouncementAddForm} />
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcements/set-metting-agenda" component={MettingAgendaForm} />
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcements/:announcementID/edit" component={AnnouncementEditForm} />
		<ProtectedRoute allowedRoles={['SC_PRESIDENT']} excat path="/announcements/:announcementID" component={AnnouncementDetails} />
	</Switch>
);


export default  AnnouncementRoutes;