import { action } from 'typesafe-actions';
import { ApplicationsTypes } from "./types";
import { EventApplications } from './models';

export const fetchEventApplicantsRequest = (payload: number) => action(ApplicationsTypes.FETCH_EVENT_APPLICANTS, payload);
export const fetchEventApplicantsSuccess = (payload: EventApplications) => action(ApplicationsTypes.FETCH_EVENT_APPLICANTS_SUCCESS, payload);
export const fetchEventApplicantsError = (payload: any) => action(ApplicationsTypes.FETCH_EVENT_APPLICANTS_ERROR, payload);

export const applyToEventRequest = (payload: number) => action(ApplicationsTypes.APPLY_TO_EVENT, payload);
export const applyToEventSuccess = (payload: any) => action(ApplicationsTypes.APPLY_TO_EVENT_SUCCESS, payload);
export const applyToEventError = (payload: any) => action(ApplicationsTypes.APPLY_TO_EVENT_ERROR, payload);

export const confirmApplicantRequest = (payload: any) => action(ApplicationsTypes.CONFIRM_APPLICANT, payload);
export const confirmApplicantSuccess = (payload: any) => action(ApplicationsTypes.CONFIRM_APPLICANT_SUCCESS, payload);
export const confirmApplicantError = (payload: any) => action(ApplicationsTypes.CONFIRM_APPLICANT_ERROR, payload);

export const rejectApplicantRequest = (payload: any) => action(ApplicationsTypes.REJECT_APPLICANT, payload);
export const rejectApplicantSuccess = (payload: any) => action(ApplicationsTypes.REJECT_APPLICANT_SUCCESS, payload);
export const rejectApplicantError = (payload: any) => action(ApplicationsTypes.REJECT_APPLICANT_ERROR, payload);

export const revokeApplicationRequest = (payload: any) => action(ApplicationsTypes.REVOKE_APPLICATION, payload);
export const revokeApplicationSuccess = (payload: any) => action(ApplicationsTypes.REVOKE_APPLICATION_SUCCESS, payload);
export const revokeApplicationError = (payload: any) => action(ApplicationsTypes.REVOKE_APPLICATION_ERROR, payload);
