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

export const useDynamicArrayForm = (defaults, min = 1, max = 10) => {
	const [array, setArray] = useState(new Array(min).fill(defaults));
	
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
		if(array.length === max) return;
		setArray([...array, defaults]);
	};

	const handleRemoveElement = index => () => {
		if(array.length === min) return;
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