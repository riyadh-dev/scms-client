import { boolean, object } from 'yup';

export default object().shape({
	finalDecision: boolean().required(),
});