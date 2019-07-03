import gql from 'graphql-tag';
import { GET_THEME } from '../components/Layout/queries';
import { GET_TOKEN, GET_TOKEN_EXPIRATION } from '../components/User/queries';

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

				const { iat, exp, ...currentUser } = JSON.parse(atob(token.split('.')[1]));
				currentUser.__typename = 'User';



				const { data: { activeSession } } = await client.query({
					query: gql`
						query ActiveSession {
							activeSession {
								_id
								submissionsStartDate
								submissionsEndDate
								mettingDate
								mettingAgenda
								onSubmissionPeriod
								onReviewPeriod
								onMettingDate
							}	
						}
					`
				});

				const data = {
					currentUser,
					activeSession,
					token: token,
					tokenExpiration: exp,
					authenticated: true,
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