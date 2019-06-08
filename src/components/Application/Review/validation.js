import { object, string, boolean } from 'yup';

export default object().shape({
	decision: boolean().required(),
	comment: string().required(),
});