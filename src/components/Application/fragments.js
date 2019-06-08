import gql from 'graphql-tag';

export const confrenceApplicationDetails = gql`
	fragment ConfrenceApplicationDetails on ConfrenceApplication {
		name
		communicationPaper {
			title
			abstract
		}
		location
		date
		website

		submissionYear
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