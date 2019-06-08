import gql from 'graphql-tag';

export const GET_TOKEN = gql`
	query Token(
		$email: String!,
		$password: String!
	) {
		token(input: {
			email: $email,
			password: $password
		})
	}
`;

export const GET_CACHED_TOKEN = gql`
	query Token {
		token @client
	}
`;

export const GET_TOKEN_EXPIRATION = gql`
	query TokenExpiration {
		tokenExpiration @client
	}
`;

export const AUTHENTICATED = gql`
	query Authenticated {
		authenticated @client
	}
`;

export const GET_USER = gql`
	query User($_id: ID!) {
		user(_id: $_id) {
			firstName
			lastName
			gender
			department
			major
			option
			roles
			email
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query CurrentUser {
		currentUser @client {
			_id
			firstName
			lastName
			gender
			department
			major
			option
			roles
			email
		}
	}
`;