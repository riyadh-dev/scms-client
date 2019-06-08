import gql from 'graphql-tag';
import { confrenceApplicationDetails } from './fragments';
import { userDetails } from '../User/fragments';

export const GET_CONFRENCE_APPLICATIONS = gql`
	query ConfrenceApplications {
		confrenceApplications {
			applicant {
				_id
				...UserDetails
			}
			_id
			...ConfrenceApplicationDetails
		}
	}
	${userDetails}
	${confrenceApplicationDetails}
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
			... on ConfrenceApplication {
				...ConfrenceApplicationDetails
			}
		}
	}
	${userDetails}
	${confrenceApplicationDetails}
`;