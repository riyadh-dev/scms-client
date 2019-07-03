import gql from 'graphql-tag';

export const GET_ACTIVE_SESSION = gql`
	query ActiveSession {
		activeSession @client{
			_id
			mettingDate
			submissionsStartDate
			submissionsEndDate
			mettingAgenda
			onSubmissionPeriod,
			onReviewPeriod,
			onMettingDate
		}
	}
`;

export const GET_YEARLY_REPORTS = gql`
	query YearlyReports {
		yearlyReports {
			_id
			year
			sessions {
				_id
				submissionsStartDate
				submissionsEndDate
			}
		}
	}
`;

export const GET_YEARLY_STATS = gql`
	query YearlyReportStatistics($input: String!) {
		yearlyReportStatistics(year: $input) {
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