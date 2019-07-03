import gql from 'graphql-tag';

export const applicationDetails = gql`
	fragment ApplicationDetails on Application {
		submittedAt
		treated
		finalDecision
		reviews {
			reviewer { _id firstName lastName }
			decision
			comment
		}
		accepts
		refuses
		session {
			_id
		}
	}
`;

export const confrenceApplicationDetails = gql`
	fragment ConfrenceApplicationDetails on ConfrenceApplication {
		name
		communicationPaperTitle
		communicationPaperAbstract
		location
		date
		website
	}
`;

export const internshipApplicationDetails = gql`
	fragment InternshipApplicationDetails on InternshipApplication {
		laboratoryName
		laboratoryWebsite
		country
		city
		durationFrom
		durationTo
		workPlanLink
	}
`;

export const confirmationApplicationDetails = gql`
	fragment ConfirmationApplicationDetails on ConfirmationApplication {
		rank
		recruitmentDate
		teachingActivitiesLink
	}
`;

export const promotionApplicationDetails = gql`
	fragment PromotionApplicationDetails on PromotionApplication {
		recruitmentDate
		confirmationDate
		currentRank
		desiredRank
		PhDRegistrationsNumber
		lastPhDRegistrationYear
		teachingActivitiesLink
	}
`;

export const thesisTitleChangeApplicationDetails = gql`
	fragment ThesisTitleChangeApplicationDetails on ThesisTitleChangeApplication {
		firstPhDRegistrationYear
		supervisor
		currentTitle
		desiredTitle
		cause
	}
`;

export const addThesisCoSupervisorApplicationDetails = gql`
	fragment AddThesisCoSupervisorApplicationDetails on AddThesisCoSupervisorApplication {
		firstPhDRegistrationYear
		supervisor
		coSupervisor
		cause
	}
`;

export const fullApplicationDetails = gql`
	fragment FullApplicationDetails on Application {
		__typename
		_id
		...ApplicationDetails
		...on ConfrenceApplication {
			...ConfrenceApplicationDetails
		}
		...on InternshipApplication {
			...InternshipApplicationDetails
		}
		...on ConfirmationApplication {
			...ConfirmationApplicationDetails
		}
		...on PromotionApplication {
			...PromotionApplicationDetails
		}
		...on AddThesisCoSupervisorApplication {
			...AddThesisCoSupervisorApplicationDetails
		}
		...on ThesisTitleChangeApplication {
			...ThesisTitleChangeApplicationDetails
		}
	}
	${applicationDetails}
	${confrenceApplicationDetails}
	${internshipApplicationDetails}
	${confirmationApplicationDetails}
	${promotionApplicationDetails}
	${thesisTitleChangeApplicationDetails}
	${addThesisCoSupervisorApplicationDetails}
`;