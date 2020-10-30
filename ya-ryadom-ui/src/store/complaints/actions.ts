import { action, ActionType } from 'typesafe-actions';
import { ComplaintsTypes } from './types';
import { ComplaintToUserRequest, ComplaintForm } from './models';

export const sendComplaintToEventRequest = (payload: ComplaintForm) =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT, payload);
export const sendComplaintToEventSuccess = () =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT_SUCCESS);
export const sendComplaintToEventError = (payload: any) =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT_ERROR, payload);

export const sendComplaintToUserRequest = (payload: ComplaintToUserRequest) =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_USER, payload);
export const sendComplaintToUserSuccess = () =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_USER_SUCCESS);
export const sendComplaintToUserError = (payload: any) =>
	action(ComplaintsTypes.SEND_COMPLAINT_TO_USER_ERROR, payload);

export const openEventComplaintForm = (payload: number) =>
	action(ComplaintsTypes.OPEN_EVENT_COMPLAINT_FORM, payload);
export const setSelectedEventId = (payload: number | null) =>
	action(ComplaintsTypes.SET_SELECTED_EVENT_ID, payload);

export type ComplaintsActions = ActionType<
	| typeof sendComplaintToEventSuccess
	| typeof sendComplaintToUserSuccess
	| typeof setSelectedEventId
>;
