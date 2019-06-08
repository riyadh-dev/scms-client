import gql from 'graphql-tag';

export const LOG_IN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password)@client
	}
`;

export const LOG_OUT = gql`
	mutation Logout {
		logout @client
	}
`;

export const CHECK_TOKEN_EXPIRED = gql`
	mutation CheckTokenExpired {
		checkTokenExpired @client
	}
`;