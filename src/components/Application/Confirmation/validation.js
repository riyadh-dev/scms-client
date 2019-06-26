import { string, object, date } from 'yup';

export default object().shape({
	rank: string().required(),
	recruitmentDate: date().required(),
});