import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_APPLICATION } from '../queries';
import ConfrenceApplicationDetails from '../Confrence/Details';
import UserDetails from '../../User/Details';
import ReviewApplicationForm from './Form';
import ReviewApplicationDetails from '../Review/Details';
import ReviewList from './List';
import LoadingTrigger from '../../LoadingTrigger';

const ApplicationReviewPage = ({ match, currentUser }) => {
	return (
		<Query query={GET_APPLICATION} variables={{ _id: match.params._id }} fetchPolicy="network-only" >
			{({ data, loading, error }) => {
				if (loading) return <LoadingTrigger />;
				if (error) return null;

				const {
					_id,
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
				return (
					<Fragment>
						<UserDetails user={applicant} title="Applicant Info" />
						{__typename === 'ConfrenceApplication' && <ConfrenceApplicationDetails confrence={applicaion} />}
						{!isPresident && <ReviewApplicationDetails reviews={{ refuses, accepts, finalDecision, currentUserReview }} />}
						<ReviewApplicationForm applicationID={_id} />
						{isPresident && <ReviewList reviews={reviews} accepts={accepts} refuses={refuses} />}
					</Fragment>
				);
			}}
		</Query>
	);
};

export default ApplicationReviewPage;