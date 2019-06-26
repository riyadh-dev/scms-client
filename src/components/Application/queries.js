import gql from 'graphql-tag';
import {
	applicationDetails,
	confrenceApplicationDetails,
	internshipApplicationDetails,
	confirmationApplicationDetails,
	promotionApplicationDetails,
	thesisTitleChangeApplicationDetails,
	addThesisCoSupervisorApplicationDetails
} from './fragments';
import { userDetails } from '../User/fragments';

export const GET_APPLICATIONS_BY_SC_SESSION_AND_TYPE = gql`
	query ApplicationsByType($input: applicationsBySCSessionAndTypeInput!) {
		applicationsBySCSessionAndType(input: $input) {
			__typename
			applicant {
				_id
				...UserDetails
			}
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
	}
	${userDetails}
	${applicationDetails}
	${confrenceApplicationDetails}
	${internshipApplicationDetails}
	${confirmationApplicationDetails}
	${promotionApplicationDetails}
	${thesisTitleChangeApplicationDetails}
	${addThesisCoSupervisorApplicationDetails}
`;

export const GET_APPLICATIONS_BY_APPLICANT = gql`
	query ApplicationsByApplicant($input: ID!) {
		applicationsByApplicant(_id: $input) {
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
	}
	${applicationDetails}
	${confrenceApplicationDetails}
	${internshipApplicationDetails}
	${confirmationApplicationDetails}
	${promotionApplicationDetails}
	${thesisTitleChangeApplicationDetails}
	${addThesisCoSupervisorApplicationDetails}
`;

export const GET_APPLICATION = gql`
	query application($_id: ID!) {
		application(_id: $_id) {
			__typename
			applicant {
				_id
				...UserDetails
			}
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
	}
	${userDetails}
	${applicationDetails}
	${confrenceApplicationDetails}
	${internshipApplicationDetails}
	${confirmationApplicationDetails}
	${promotionApplicationDetails}
	${thesisTitleChangeApplicationDetails}
	${addThesisCoSupervisorApplicationDetails}
`;