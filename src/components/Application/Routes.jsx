import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';


const ApplicationsListByApplicationType = lazy(() => import('./ListByApplicationType'));
const ApplicationsListByApplicant = lazy(() => import('./ListByApplicant'));
const ApplicationReviewPage = lazy(() => import('./Review/Page'));

const AddThesisCoSupervisorApplicationSubmitForm = lazy(() => import('./AddThesisCoSupervisor/Form/Submit'));
const ConfirmationApplicationForm = lazy(() => import('./Confirmation/CreateForm'));
const ConfrenceApplicationSubmitForm = lazy(() => import('./Confrence/Form/Submit'));
const IntrenshipApplicationForm = lazy(() => import('./Internship/CreateForm'));
const PromotionApplicationForm = lazy(() => import('./Promotion/CreateForm'));
const ThesisTitleChangeApplicationSubmitForm = lazy(() => import('./ThesisTitleChange/Form/Submit'));

const AddThesisCoSupervisorApplicationReSubmitForm = lazy(() => import('./AddThesisCoSupervisor/Form/ReSubmit'));
const ConfrenceApplicationReSubmitForm = lazy(() => import('./Confrence/Form/ReSubmit'));
const ThesisTitleChangeApplicationReSubmitForm = lazy(() => import('./ThesisTitleChange/Form/ReSubmit'));

const Statistics = lazy(() => import('./Statistics/index'));
const StatisticsDetails = lazy(() => import('./Statistics/Details'));

const SCSessionForm = lazy(() => import('../SCSession/CreateForm'));

const ApplicationRoutes = () => (
	<Switch>
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/add-thesis-co-supervisor" component={AddThesisCoSupervisorApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/confirmation" component={ConfirmationApplicationForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/confrence" component={ConfrenceApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/internship" component={IntrenshipApplicationForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/promotion" component={PromotionApplicationForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/submit/thesis-title-change" component={ThesisTitleChangeApplicationSubmitForm} />

		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/re-submit/add-thesis-co-supervisor/:applicationID" component={AddThesisCoSupervisorApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/re-submit/confrence/:applicationID" component={ConfrenceApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/application/re-submit/thesis-title-change/:applicationID" component={ThesisTitleChangeApplicationReSubmitForm} />

		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/open-submissions" component={SCSessionForm} />

		<ProtectedRoute excat path="/my-applications" component={ApplicationsListByApplicant} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/statistics/details" component={StatisticsDetails} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/statistics" component={Statistics} />

		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/user/:_id/list" component={ApplicationsListByApplicant} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/:applicationType/list" component={ApplicationsListByApplicationType} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/application/:_id" component={ApplicationReviewPage} />	
	</Switch>
);


export default ApplicationRoutes;