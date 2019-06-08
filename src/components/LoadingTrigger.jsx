import { useEffect } from 'react';
import { withApollo } from 'react-apollo';

const LoadingTrigger = ({ client }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			client.writeData({ data: { loading: true } });
		}, 750);
		return () => {
			clearTimeout(timer);
			client.writeData({ data: { loading: false } });
		};
	}, [client]);
	return null;
};

export default withApollo(LoadingTrigger);