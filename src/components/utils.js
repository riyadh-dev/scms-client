import { useState } from 'react';

export const useFormInputGroup = defaults => {
	const [values, setValues] = useState(defaults);
	const handleChange = ({ target: { name, value } }) => {
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange };
};

export const validate = (yupSchema, input) => {
	try {
		const validateInput = yupSchema.validateSync(input, { abortEarly: false });
		return { validateInput };
	} catch (ValidationError) {
		const errors = {};
		ValidationError.inner.forEach(error => { errors[error.path] = error.message; });
		return { errors };
	}
};

export const useDynamicArrayForm = defaults => {
	const [array, setArray] = useState([defaults]);

	const handleElementChange = ({ target: { value, dataset } }) => {
		if (!dataset.name) {
			const newArray = array.map((element, index) => {
				if (index !== parseInt(dataset.index)) return element;
				return value;
			});
			setArray([...newArray]);
		} else {
			const newArray = array.map((element, index) => {
				if (index !== parseInt(dataset.index)) return element;
				return { ...element, [dataset.name]: value };
			});
			setArray([...newArray]);
		}
	};

	const handleAddElement = () => {
		setArray([...array, defaults]);
	};

	const handleRemoveElement = index => () => {
		const newArray = array.filter((_, elementIndex) => elementIndex !== index);
		setArray([...newArray]);
	};

	return {
		array,
		handleElementChange,
		handleAddElement,
		handleRemoveElement,
	};
};