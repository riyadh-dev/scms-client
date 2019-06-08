import gql from 'graphql-tag';

export const TOGGLE_THEME = gql`
	mutation ToggleTheme {
		toggleTheme @client
	}
`;
