import { action, ActionType } from 'typesafe-actions';
import { ComplaintsTypes } from "./types";
import { ComplaintToEventRequest, ComplaintToUserRequest } from './models';

export const sendComplaintToEventRequest = (payload: ComplaintToEventRequest) => action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT, payload);
export const sendComplaintToEventSuccess = () => action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT_SUCCESS);
export const sendComplaintToEventError = (payload: any) => action(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT_ERROR, payload);

export const sendComplaintToUserRequest = (payload: ComplaintToUserRequest) => action(ComplaintsTypes.SEND_COMPLAINT_TO_USER, payload);
export const sendComplaintToUserSuccess = () => action(ComplaintsTypes.SEND_COMPLAINT_TO_USER_SUCCESS);
export const sendComplaintToUserError = (payload: any) => action(ComplaintsTypes.SEND_COMPLAINT_TO_USER_ERROR, payload);

export type ComplaintsActions = ActionType<
    typeof sendComplaintToEventSuccess |
    typeof sendComplaintToUserSuccess
>;
