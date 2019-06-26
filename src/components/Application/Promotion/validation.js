import { string, object } from 'yup';

export default object().shape({
	recruitmentDate: string().required(),
	confirmationDate: string().required(),
	currentRank: string().required(),
	desiredRank: string().required(),
	PhDRegistrationsNumber: string().required(),
	lastPhDRegistrationYear: string().required(),
});