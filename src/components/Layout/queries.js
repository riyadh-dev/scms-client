import gql from 'graphql-tag';

export const GET_LOADING = gql`
	query Theme {
		loading @client
	}
`;

export const GET_THEME = gql`
	query Theme {
		theme @client
	}
`;