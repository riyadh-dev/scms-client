import { boolean, object, string } from 'yup';

export default object().shape({
	decision: boolean().required(),
	comment: string().required(),
});