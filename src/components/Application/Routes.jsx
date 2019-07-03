import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';


const ApplicationsListByApplicationType = lazy(() => import('./ListByApplicationType'));
const ApplicationsListByApplicant = lazy(() => import('./ListByApplicant'));
const ApplicationReviewPage = lazy(() => import('./Review/Page'));

const AddThesisCoSupervisorApplicationSubmitForm = lazy(() => import('./AddThesisCoSupervisor/Form/Submit'));
const ConfirmationApplicationSubmitForm = lazy(() => import('./Confirmation/Form/Submit'));
const ConfrenceApplicationSubmitForm = lazy(() => import('./Confrence/Form/Submit'));
const InternshipApplicationSubmitForm = lazy(() => import('./Internship/Form/Submit'));
const PromotionApplicationSubmitForm = lazy(() => import('./Promotion/Form/Submit'));
const ThesisTitleChangeApplicationSubmitForm = lazy(() => import('./ThesisTitleChange/Form/Submit'));

const AddThesisCoSupervisorApplicationReSubmitForm = lazy(() => import('./AddThesisCoSupervisor/Form/ReSubmit'));
const ConfirmationApplicationReSubmitForm = lazy(() => import('./Confirmation/Form/ReSubmit'));
const ConfrenceApplicationReSubmitForm = lazy(() => import('./Confrence/Form/ReSubmit'));
const InternshipApplicationReSubmitForm = lazy(() => import('./Internship/Form/ReSubmit'));
const PromotionApplicationReSubmitForm = lazy(() => import('./Promotion/Form/ReSubmit'));
const ThesisTitleChangeApplicationReSubmitForm = lazy(() => import('./ThesisTitleChange/Form/ReSubmit'));

const Statistics = lazy(() => import('./Statistics/index'));
const StatisticsDetails = lazy(() => import('./Statistics/Details'));

const SessionForm = lazy(() => import('../YearlyReport/Session/CreateForm'));

const ApplicationRoutes = () => (
	<Switch>
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/add-thesis-co-supervisor/:applicationID/re-submit" component={AddThesisCoSupervisorApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/confirmation/:applicationID/re-submit" component={ConfirmationApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/confrence/:applicationID/re-submit" component={ConfrenceApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/internship/:applicationID/re-submit" component={InternshipApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/promotion/:applicationID/re-submit" component={PromotionApplicationReSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/thesis-title-change/:applicationID/re-submit" component={ThesisTitleChangeApplicationReSubmitForm} />

		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/add-thesis-co-supervisor/submit" component={AddThesisCoSupervisorApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/confirmation/submit" component={ConfirmationApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/confrence/submit" component={ConfrenceApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/internship/submit" component={InternshipApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/promotion/submit" component={PromotionApplicationSubmitForm} />
		<ProtectedRoute allowedRoles={['FACULTY_MEMBER', 'PHD_STUDENT']} excat path="/applications/thesis-title-change/submit" component={ThesisTitleChangeApplicationSubmitForm} />

		
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/applications/statistics/charts" component={StatisticsDetails} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/applications/statistics" component={Statistics} />

		<ProtectedRoute excat path="/applications/mine" component={ApplicationsListByApplicant} />
		
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/applications/open-submissions" component={SessionForm} />

		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/applications/user/:_id" component={ApplicationsListByApplicant} />
		<ProtectedRoute excat path="/applications/:_id" component={ApplicationReviewPage} />
		<ProtectedRoute allowedRoles={['SC_MEMBER', 'SC_PRESIDENT']} excat path="/applications" component={ApplicationsListByApplicationType} />
	</Switch>
);


export default ApplicationRoutes;