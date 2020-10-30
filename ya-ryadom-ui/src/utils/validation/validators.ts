import { ValidationErrors } from './../constants/validation-error.constants';

export const required = (value: any) =>
	!value || value.length === 0 || (typeof value === 'string' && !value.trim())
		? ValidationErrors.REQUIRED
		: undefined;
export const maxLength = (value: any, max: number = 20) =>
	value && value.length > max ? `Максимум ${max} символа` : undefined;
export const minDate = (value: Date, minDate: Date) => {
	const min = -minDate.getTimezoneOffset();
	minDate.setHours(0, min, 0, 0);
	if (value < minDate) {
		return 'Нельзя выбрать прошедшие даты';
	}
	return undefined;
};

export const Validators = {
	required,
	maxLength,
	minDate,
};
