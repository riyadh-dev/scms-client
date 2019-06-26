import { GET_TOKEN, GET_TOKEN_EXPIRATION } from '../components/User/queries';
import { GET_THEME } from '../components/Layout/queries';
import gql from 'graphql-tag';

export default {
	Mutation: {
		toggleTheme: (_root, _args, { cache }) => {
			const { theme } = cache.readQuery({ query: GET_THEME });
			const data = { theme: !theme };
			cache.writeData({ data });
			return null;
		},

		logout: (_root, _args, { client }) => {
			client.resetStore();
			return null;
		},

		login: async (_root, values, { cache, client }) => {
			try {
				const { data: { token } } = await client.query({
					query: GET_TOKEN,
					fetchPolicy: 'network-only',
					variables: values
				});

				const { data: { activeSCSession } } = await client.query({
					query: gql`
						query ActiveSCSession {
							activeSCSession {
								_id
								submissionsStartDate
								submissionsEndDate
								mettingDate
								mettingAgenda
								canSubmit
								canSetAgenda
							}	
						}
					`
				});

				const { iat, exp, ...currentUser } = JSON.parse(atob(token.split('.')[1]));
				currentUser.__typename = 'User';

				const data = {
					currentUser,
					activeSCSession,
					token: token,
					tokenExpiration: exp,
					authenticated: true
				};

				cache.writeData({ data });
				return {};
			} catch (error) {
				const errors = {};
				error.graphQLErrors.forEach(err => { errors[err.extensions.exception.field] = err.message; });
				return { errors };
			}
		},

		checkTokenExpired: async (_root, _args, { client, cache }) => {
			const { tokenExpiration } = cache.readQuery({ query: GET_TOKEN_EXPIRATION });
			if (Math.floor(Date.now() / 1000) > tokenExpiration) {
				client.resetStore();
				return null;
			}
			return null;
		}
	}
};