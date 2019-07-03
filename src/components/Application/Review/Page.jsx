import { Button } from '@material-ui/core';
import { kebabCase } from 'lodash';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingTrigger from '../../LoadingTrigger';
import UserDetails from '../../User/Details';
import AddThesisCoSupervisorApplicationDetails from '../AddThesisCoSupervisor/Details';
import ConfirmationApplicationDetails from '../Confirmation/Details';
import ConfrenceApplicationDetails from '../Confrence/Details';
import FinalDecisionForm from '../FinalDecision/Form';
import InternshipApplicationDetails from '../Internship/Details';
import PromotionApplicationDetails from '../Promotion/Details';
import { GET_APPLICATION } from '../queries';
import ReviewApplicationDetails from '../Review/Details';
import ThesisTitleChangeApplicationDetails from '../ThesisTitleChange/Details';
import ReviewApplicationForm from './Form';
import ReviewList from './List';


const ApplicationDetails = ({ type, details }) => {
	switch (type) {
	case 'AddThesisCoSupervisorApplication': return <AddThesisCoSupervisorApplicationDetails details={details} />;
	case 'ConfirmationApplication': return <ConfirmationApplicationDetails details={details} />;
	case 'ConfrenceApplication': return <ConfrenceApplicationDetails details={details} />;
	case 'InternshipApplication': return <InternshipApplicationDetails details={details} />;
	case 'PromotionApplication': return <PromotionApplicationDetails details={details} />;
	case 'ThesisTitleChangeApplication': return <ThesisTitleChangeApplicationDetails details={details} />;
	default: return null;
	}
};

const ApplicationReviewPage = ({ match, currentUser, activeSession }) => {
	return (
		<Query query={GET_APPLICATION} variables={{ _id: match.params._id }}>
			{({ data, loading, error }) => {
				if (loading) return <LoadingTrigger />;
				if (error) return null;

				const {
					__typename,
					applicant,
					reviews,
					accepts,
					refuses,
					finalDecision,
					...application
				} = data.application;

				const isReviewed = review => review.reviewer._id === currentUser._id;
				const currentUserReview = reviews.find(isReviewed);
				const isPresident = currentUser.roles.includes('SC_PRESIDENT');
				const isSCMember = currentUser.roles.includes('SC_MEMBER');
				const isApplicant = currentUser._id === applicant._id;
				const applicationTypeURL = kebabCase(__typename.replace('Application', ''));
				const canEdit = isApplicant && !activeSession ? false : (activeSession._id === application.session._id);
				return (
					<Fragment>
						{!isApplicant && <UserDetails user={applicant} title="Applicant Info" />}
						{isPresident && !isApplicant && <div
							style={{
								width: 700,
								margin: 'auto',
								marginBottom: 24
							}}
						>
							<Button
								fullWidth
								color="primary"
								variant="contained"
								component={Link}
								to={'/applications/user/' + applicant._id}
							>check past submissions</Button>
						</div>}
						<ApplicationDetails type={__typename} details={application} />
						{canEdit && <div
							style={{
								width: 700,
								marginBottom: 24,
								paddincgBottom: 24,
								margin: 'auto'
							}}
						>
							<Button
								fullWidth
								color="primary"
								variant="contained"
								component={Link}
								to={'/applications/' + applicationTypeURL + '/' + application._id + '/re-submit'}
							>edit</Button>
						</div>}
						{isSCMember && !isApplicant && <ReviewApplicationDetails reviews={{ refuses, accepts, finalDecision, currentUserReview, treated: application.treated }} />}
						{!isApplicant && !application.treated && <ReviewApplicationForm applicationID={application._id} />}
						{isPresident && activeSession && activeSession.onMettingDate && <FinalDecisionForm applicationID={application._id} />}
						{isPresident && <ReviewList treated={application.treated} reviews={reviews} accepts={accepts} refuses={refuses} finalDecision={finalDecision} />}
					</Fragment>
				);
			}}
		</Query>
	);
};

export default ApplicationReviewPage;