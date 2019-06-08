import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const ConfrenceApplicationForm = lazy(() => import('./Confrence/CreateForm'));
const ConfrenceApplicationList = lazy(() => import('./ListPage'));
const ConfrenceApplicationReviewPage = lazy(() => import('./Review/Page'));

const ApplicationRoutes = () => (
	<Switch>
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/confrence" component={ConfrenceApplicationForm} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/review/:applicationType/list" component={ConfrenceApplicationList} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/review/:applicationType/:_id" component={ConfrenceApplicationReviewPage} />
	</Switch>
);


export default ApplicationRoutes;