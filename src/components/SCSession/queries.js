import gql from 'graphql-tag';

export const GET_ACTIVE_SC_SESSION = gql`
	query ActiveSCSession {
		activeSCSession @client{
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

export const GET_SC_SESSIONS = gql`
	query SCSessions {
		SCSessions {
			_id
			submissionsStartDate
			submissionsEndDate
		}
	}
`;

export const GET_SC_YEARLY_REPORTS = gql`
	query SCYearlyReports {
		SCYearlyReports {
			_id
			year
			SCSessions {
				_id
				submissionsStartDate
				submissionsEndDate
			}
		}
	}
`;

export const GET_SC_YEARLY_REPORTS_FOR_STATS = gql`
	query SCYearlyReportsForStats {
		SCYearlyReportsForStats {
			_id
			year
			SCSessions {
				_id
				submissionsStartDate
				submissionsEndDate
			}
		}
	}
`;

export const GET_YEARLY_STATS = gql`
	query SCYearlyReportStatistics($input: String!) {
		SCYearlyReportStatistics(year: $input) {
			_id
			year
			statistics {
				addThesisCoSupervisorApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
				confirmationApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
				confrenceApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
				internshipApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
				promotionApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
				thesisTitleChangeApplication {
					applications
					accepted

					electronicsDepartment
					fundamentalEducationDepartment
					powerAndContorlDepartment

					controlMajor
					electronicsMajor
					powerMajor
					telecommunicationMajor

					female
					male
				}
			}
		}
	}
`;

export const GET_SESSION_STATS = gql`
	query SCSessionsApplicationListByApplicationType($_id: ID!) {
		SCSessionsApplicationListByApplicationType(_id: $_id) {
			_id
			statistics {
				applications
				accepted

				addThesisCoSupervisorApplications
				confirmationApplications
				confrenceApplications
				internshipApplications
				promotionApplications
				thesisTitleChangeApplications

				acceptedAddThesisCoSupervisorApplications
				acceptedConfirmationApplications
				acceptedConfrenceApplications
				acceptedInternshipApplications
				acceptedPromotionApplications
				acceptedThesisTitleChangeApplications

				electronicsDepartment
				fundamentalEducationDepartment
				powerAndContorlDepartment

				controlMajor
				electronicsMajor
				powerMajor
				telecommunicationMajor

				female
				male
			}
		}
	}
`;