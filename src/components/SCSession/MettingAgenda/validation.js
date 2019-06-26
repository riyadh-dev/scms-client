import { array, object, string } from 'yup';

export default object().shape({
	mettingAgenda: array().of(string()).min(3).max(10)
});