import { action } from 'typesafe-actions';
import { SpinnerTypes } from './types';

export const showSpinner = () => action(SpinnerTypes.SHOW_SPINNER);
export const hideSpinner = () => action(SpinnerTypes.HIDE_SPINNER);
