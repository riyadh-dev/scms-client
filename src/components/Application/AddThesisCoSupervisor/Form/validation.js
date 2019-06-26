import { string, object } from 'yup';

export default object().shape({
	supervisor: string().required(),
	coSupervisor: string().required(),
	firstPhDRegistrationYear: string().required(),
	cause: string().required()
});