import gql from 'graphql-tag';

export const ADD_ANNOUNCEMENT = gql`
	mutation AddAnnouncement($input: AddAnnouncementInput!) {
		addAnnouncement(input: $input) {
			_id
			title
			content
			createdAt
			updatedAt
		}
	}
`;

export const EDIT_ANNOUNCEMENT = gql`
	mutation EditAnnouncement($input: EditAnnouncementInput!) {
		editAnnouncement(input: $input) {
			_id
			title
			content
			createdAt
			updatedAt
		}
	}
`;

export const DELETE_ANNOUNCEMENT = gql`
	mutation DeleteAnnouncement($input: ID!) {
		deleteAnnouncement(_id: $input) 
	}
`;