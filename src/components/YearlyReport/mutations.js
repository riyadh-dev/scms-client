import gql from 'graphql-tag';

export const ADD_SESSION = gql`
	mutation AddSession($input: addSessionInput!) {
		addSession(input: $input) {
			_id
			mettingDate
			submissionsStartDate
			submissionsEndDate
			mettingAgenda
			onSubmissionPeriod
			onReviewPeriod
			onMettingDate
		}
	}
`;

export const SET_METTING_AGENDA = gql`
	mutation SetMettingAgenda($input: setMettingAgendaInput!) {
		setMettingAgenda(input: $input) {
			_id
			mettingAgenda
		}
	}
`;