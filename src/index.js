import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import App from './App';
import { GET_CACHED_TOKEN } from './components/User/queries';
import resolvers from './graphql/resolvers';

const cache = new InMemoryCache();

const request = async (operation) => {
	const { token } = cache.readQuery({ query: GET_CACHED_TOKEN });
	operation.setContext({
		headers: { authorization: token }
	});
};

const requestLink = new ApolloLink((operation, forward) =>
	new Observable(observer => {
		let handle;
		Promise.resolve(operation)
			.then(oper => request(oper))
			.then(() => {
				handle = forward(operation).subscribe({
					next: observer.next.bind(observer),
					error: observer.error.bind(observer),
					complete: observer.complete.bind(observer),
				});
			})
			.catch(observer.error.bind(observer));

		return () => {
			if (handle) handle.unsubscribe();
		};
	})
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		//sendToLoggingService(graphQLErrors);
	}
	if (networkError) {
		//TODO logoutUser();
	}
});

/* const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include'
}); */

const uploadLink = createUploadLink({
	uri: process.env.REACT_APP_SERVER_URI,
	credentials: 'include'
});

const waitForCahce = persistCache({
	cache,
	storage: window.localStorage,
});

const data = {
	theme: false,
	authenticated: false,
	token: '',
	loading: false
};

cache.writeData({ data });

waitForCahce.then(() => {
	const client = new ApolloClient({
		link: ApolloLink.from([
			errorLink,
			requestLink,
			uploadLink
		]),
		cache,
		resolvers
	});

	client.onResetStore(() => cache.writeData({ data }));

	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
		document.getElementById('root')
	);
});




