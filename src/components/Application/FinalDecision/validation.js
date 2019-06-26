import { object, boolean } from 'yup';

export default object().shape({
	finalDecision: boolean().required(),
});