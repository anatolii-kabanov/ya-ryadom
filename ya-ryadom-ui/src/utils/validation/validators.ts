import { ValidationErrors } from "./../constants/validation-error.constants";

export const required = (value: any) => value ? undefined : ValidationErrors.REQUIRED;

export const Validators= {
    required
};