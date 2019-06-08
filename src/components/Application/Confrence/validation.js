import { string, object } from 'yup';

export default object().shape({
	name: string().required(),
	website: string().url().required(),
	location: string().required(),
	date: string().required(),
	communicationPaperTitle: string().required(),
	communicationPaperAbstract: string().required(),
});