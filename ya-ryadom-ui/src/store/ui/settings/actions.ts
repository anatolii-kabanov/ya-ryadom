import { action } from 'typesafe-actions';
import { SetingsTypes } from "./types";
import { ThemeType } from '../../../utils/enums/theme-type.enum';

export const clearEventsFilter = () => action(SetingsTypes.CLEAR_EVENTS_FILTER);
export const setEventsFilter = () => action(SetingsTypes.SET_EVENTS_FILTER);
export const updateEventsRadiusFilter = (payload: number) => action(SetingsTypes.UPDATE_EVENTS_RADIUS_FILTER, payload);
export const updateEventsThemeFilter = (payload: ThemeType) => action(SetingsTypes.UPDATE_EVENTS_THEME_FILTER, payload);
export const updateEventsTextFilter = (payload: string) => action(SetingsTypes.UPDATE_EVENTS_TEXT_FILTER, payload);
export const updateEventsAddressFilter = (payload: any) => action(SetingsTypes.UPDATE_EVENTS_ADDRESS_FILTER, payload);
