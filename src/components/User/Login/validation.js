import * as yup from 'yup';

export default yup.object().shape({
	email: yup.string().email('Must Be a Valid Email').required(),
	password: yup.string().required(),
});