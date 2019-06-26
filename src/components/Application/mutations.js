import gql from 'graphql-tag';
import {
	confrenceApplicationDetails,
	internshipApplicationDetails,
	confirmationApplicationDetails,
	promotionApplicationDetails,
	addThesisCoSupervisorApplicationDetails,
	thesisTitleChangeApplicationDetails
} from './fragments';

export const REVIEW_APPLICATION = gql`
	mutation ReviewApplication(
		$input: reviewApplicationInput!
	) {
		reviewApplication(
			input: $input
		) {
			_id
			reviews {
				reviewer { _id }
				decision
				comment
			}
			accepts
			refuses
		}
	}
`;

export const GIVE_APPLICATION_FINAL_DECISION = gql`
	mutation GiveApplicationFinalDecision(
		$input: giveApplicationFinalDecisionInput!
	) {
		giveApplicationFinalDecision(
				input: $input
		) {
			_id
			finalDecision
			treated
		}
	}
`;

export const SUBMIT_CONFRENCE_APPLICATION = gql`
	mutation SubmitConfrenceApplication(
		$input: SubmitConfrenceApplicationInput!
	) {
		submitConfrenceApplication(
			input: $input
		) {
			_id
			...ConfrenceApplicationDetails
		}
	}
	${confrenceApplicationDetails}
`;

export const RESUBMIT_CONFRENCE_APPLICATION = gql`
	mutation ReSubmitConfrenceApplication(
		$input: ReSubmitConfrenceApplicationInput!
	) {
		reSubmitConfrenceApplication(
			input: $input
		) {
			_id
			...ConfrenceApplicationDetails
		}
	}
	${confrenceApplicationDetails}
`;

export const SUBMIT_INTRENSHIP_APPLICATION = gql`
	mutation SubmitInternshipApplication(
		$input: InternshipApplicationInput!
	) {
		submitInternshipApplication(
				input: $input
		) {
			_id
			...InternshipApplicationDetails
		}
	}
	${internshipApplicationDetails}
`;

export const SUBMIT_CONFIRMATION_APPLICATION = gql`
	mutation SubmitConfirmationApplication(
		$input: ConfirmationApplicationInput!
	) {
		submitConfirmationApplication(
				input: $input
		) {
			_id
			...ConfirmationApplicationDetails
		}
	}
	${confirmationApplicationDetails}
`;

export const SUBMIT_PROMOTION_APPLICATION = gql`
	mutation SubmitPromotionApplication(
		$input: PromotionApplicationInput!
	) {
		submitPromotionApplication(
				input: $input
		) {
			_id
			...PromotionApplicationDetails
		}
	}
	${promotionApplicationDetails}
`;

export const SUBMIT_THESIS_TITLE_CHANGE_APPLICATION = gql`
	mutation SubmitThesisTitleChangeApplication(
		$input: SubmitThesisTitleChangeApplicationInput!
	) {
		submitThesisTitleChangeApplication(
				input: $input
		) {
			_id
			...ThesisTitleChangeApplicationDetails
		}
	}
	${thesisTitleChangeApplicationDetails}
`;

export const RESUBMIT_THESIS_TITLE_CHANGE_APPLICATION = gql`
	mutation ReSubmitThesisTitleChangeApplication(
		$input: ReSubmitThesisTitleChangeApplicationInput!
	) {
		reSubmitThesisTitleChangeApplication(
				input: $input
		) {
			_id
			...ThesisTitleChangeApplicationDetails
		}
	}
	${thesisTitleChangeApplicationDetails}
`;

export const SUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION = gql`
	mutation SubmitAddThesisCoSupervisorApplication(
		$input: SubmitAddThesisCoSupervisorApplicationInput!
	) {
		submitAddThesisCoSupervisorApplication(
				input: $input
		) {
			_id
			...AddThesisCoSupervisorApplicationDetails
		}
	}
	${addThesisCoSupervisorApplicationDetails}
`;

export const RESUBMIT_ADD_THESIS_CO_SUPERVISOR_APPLICATION = gql`
	mutation ReSubmitAddThesisCoSupervisorApplication(
		$input: ReSubmitAddThesisCoSupervisorApplicationInput!
	) {
		reSubmitAddThesisCoSupervisorApplication(
				input: $input
		) {
			_id
			...AddThesisCoSupervisorApplicationDetails
		}
	}
	${addThesisCoSupervisorApplicationDetails}
`;