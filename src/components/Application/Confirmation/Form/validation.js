import { date, object, string } from 'yup';

export default object().shape({
	rank: string().required(),
	recruitmentDate: date().required(),
});