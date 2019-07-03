import gql from 'graphql-tag';
import { userDetails } from '../User/fragments';
import { fullApplicationDetails } from './fragments';

export const GET_APPLICATIONS_BY_SESSION_AND_TYPE = gql`
	query ApplicationsByType($input: applicationsBySessionAndTypeInput!) {
		applicationsBySessionAndType(input: $input) {
			applicant {
				_id
				...UserDetails
			}
			...FullApplicationDetails
		}
	}
	${userDetails}
	${fullApplicationDetails}
`;

export const GET_APPLICATIONS_BY_APPLICANT = gql`
	query ApplicationsByApplicant($input: ID!) {
		applicationsByApplicant(_id: $input) {
			...FullApplicationDetails
		}
	}
	${fullApplicationDetails}
`;

export const GET_APPLICATION = gql`
	query application($_id: ID!) {
		application(_id: $_id) {
			applicant {
				_id
				...UserDetails
			}
			...FullApplicationDetails
		}
	}
	${userDetails}
	${fullApplicationDetails}
`;