import * as yup from 'yup';

export default yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required(),
});