import gql from 'graphql-tag';

export const ADD_SC_SESSION = gql`
	mutation AddSCSession($input: addSCSessionInput!) {
		addSCSession(input: $input) {
			_id
			mettingDate
			submissionsStartDate
			submissionsEndDate
			mettingAgenda
			canSubmit
			canSetAgenda
		}
	}
`;

export const SET_METTING_AGENDA = gql`
	mutation SetMettingAgenda($input: setMettingAgendaInput!) {
		setMettingAgenda(input: $input) {
			_id
			mettingDate
			submissionsStartDate
			submissionsEndDate
			mettingAgenda
		}
	}
`;