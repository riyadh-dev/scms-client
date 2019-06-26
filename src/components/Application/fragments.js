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