import { object, string } from 'yup';

export default object().shape({
	desiredTitle: string().required(),
	currentTitle: string().required(),
	supervisor: string().required(),
	firstPhDRegistrationYear: string().required(),
	cause: string().required()
});