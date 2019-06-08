import gql from 'graphql-tag';

export const userDetails = gql`
	fragment UserDetails on User {
		firstName
		lastName
		gender
		department
		major
		option
		roles
		email
	}
`;