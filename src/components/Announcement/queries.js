import gql from 'graphql-tag';

export const GET_ANNOUNCEMENTS = gql`
	query Announcements {
		announcements {
			_id
			title
			content
			createdAt
			updatedAt
		}
	}
`;
