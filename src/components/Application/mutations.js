import gql from 'graphql-tag';

export const SUBMIT_CONFRENCE_APPLICATION = gql`
	mutation SubmitConfrenceApplication(
		$ConfrenceApplicationInput: ConfrenceApplicationInput!
	) {
		submitConfrenceApplication(
			input: $ConfrenceApplicationInput
		) {
			_id
			name
			communicationPaper {
				title
				abstract
			}
			location
				date
			website
		}
	}
`;

export const REVIEW_APPLICATION = gql`
	mutation ReviewApplication(
		$reviewApplicationInput: reviewApplicationInput!
	) {
		reviewApplication(
			input: $reviewApplicationInput
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