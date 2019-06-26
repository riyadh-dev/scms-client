import { string, object } from 'yup';

export default object().shape({
	title: string().required(),
	content: string().required(),
});