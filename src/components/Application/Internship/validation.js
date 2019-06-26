import { string, object } from 'yup';

export default object().shape({
	laboratoryName: string().required(),
	laboratoryWebsite: string().required(),
	country: string().required(),
	city: string().required(),
	durationFrom: string().required(),
	durationTo: string().required(),
});