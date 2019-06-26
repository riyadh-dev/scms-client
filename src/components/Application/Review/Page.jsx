import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
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
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { kebabCase } from 'lodash';
import { GET_ACTIVE_SC_SESSION } from '../../SCSession/queries';
import dayjs from 'dayjs';

const ApplicationReviewPage = ({ match, currentUser }) => {
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
					...applicaion
				} = data.application;

				const isReviewed = review => review.reviewer._id === currentUser._id;
				const currentUserReview = reviews.find(isReviewed);
				const isPresident = currentUser.roles.includes('SC_PRESIDENT');
				const isSCMember = currentUser.roles.includes('SC_MEMBER');
				const isApplicant = currentUser._id === applicant._id;
				const applicationTypeURL = kebabCase(__typename.replace('Application', ''));
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
								to={'/application/user/' + applicant._id + '/list'}
							>check past submissions</Button>
						</div>}
						{__typename === 'AddThesisCoSupervisorApplication' && <AddThesisCoSupervisorApplicationDetails details={applicaion} />}
						{__typename === 'ConfirmationApplication' && <ConfirmationApplicationDetails details={applicaion} />}
						{__typename === 'ConfrenceApplication' && <ConfrenceApplicationDetails details={applicaion} />}
						{__typename === 'InternshipApplication' && <InternshipApplicationDetails details={applicaion} />}
						{__typename === 'PromotionApplication' && <PromotionApplicationDetails details={applicaion} />}
						{__typename === 'ThesisTitleChangeApplication' && <ThesisTitleChangeApplicationDetails details={applicaion} />}
						{isApplicant && <div
							style={{
								width: 700,
								marginBottom: 24,
								paddingBottom: 24,
								margin: 'auto'
							}}
						>
							<Button
								fullWidth
								color="primary"
								variant="contained"
								component={Link}
								to={'/application/re-submit/' + applicationTypeURL + '/' + applicaion._id}
							>edit</Button>
						</div>}
						{isSCMember && !isApplicant && <ReviewApplicationDetails reviews={{ refuses, accepts, finalDecision, currentUserReview }} />}
						{!isApplicant && !applicaion.treated && <ReviewApplicationForm applicationID={applicaion._id} />}
						{isPresident && <Query query={GET_ACTIVE_SC_SESSION}>
							{({ data }) => {
								if (!data.activeSCSession) return null;
								const today = Date.now();
								const mettingDate = data.activeSCSession.mettingDate;
								const ismettingDate = dayjs(mettingDate).isSame(today, 'day');
								if (!ismettingDate) return null;
								return <FinalDecisionForm applicationID={applicaion._id} />;
							}}
						</Query>}
						{isPresident && <ReviewList reviews={reviews} accepts={accepts} refuses={refuses} finalDecision={finalDecision} />}
					</Fragment>
				);
			}}
		</Query>
	);
};

export default ApplicationReviewPage;