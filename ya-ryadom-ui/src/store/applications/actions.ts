import { action, ActionType } from 'typesafe-actions';
import { ApplicationsTypes } from './types';
import { EventApplications, EventApplicationRequest } from './models';

export const fetchEventApplicantsRequest = (payload: number) =>
	action(ApplicationsTypes.FETCH_EVENT_APPLICANTS, payload);
export const fetchEventApplicantsSuccess = (payload: EventApplications) =>
	action(ApplicationsTypes.FETCH_EVENT_APPLICANTS_SUCCESS, payload);
export const fetchEventApplicantsError = (payload: any) =>
	action(ApplicationsTypes.FETCH_EVENT_APPLICANTS_ERROR, payload);

export const fetchMineApplicationsRequest = () =>
	action(ApplicationsTypes.FETCH_MINE_APPLICATIONS);
export const fetchMineApplicationsSuccess = (payload: any) =>
	action(ApplicationsTypes.FETCH_MINE_APPLICATIONS_SUCCESS, payload);
export const fetchMineApplicationsError = (payload: any) =>
	action(ApplicationsTypes.FETCH_MINE_APPLICATIONS_ERROR, payload);

export const fetchApplicationsToMeRequest = () =>
	action(ApplicationsTypes.FETCH_APPLICATIONS_TO_ME);
export const fetchApplicationsToMeSuccess = (payload: any) =>
	action(ApplicationsTypes.FETCH_APPLICATIONS_TO_ME_SUCCESS, payload);
export const fetchApplicationsToMeError = (payload: any) =>
	action(ApplicationsTypes.FETCH_APPLICATIONS_TO_ME_ERROR, payload);

export const applyToEventFromEvents = (payload: number) =>
	action(ApplicationsTypes.APPLY_TO_EVENT_FROM_EVENTS, payload);
export const applyToEventFromUserEvents = (payload: number) =>
	action(ApplicationsTypes.APPLY_TO_EVENT_FROM_USERS_EVENTS, payload);
export const applyToEventFromSelectedEvent = (payload: number) =>
	action(ApplicationsTypes.APPLY_TO_EVENT_FROM_SELECTED_EVENT, payload);
export const applyToEventRequest = (payload: number) =>
	action(ApplicationsTypes.APPLY_TO_EVENT, payload);
export const applyToEventSuccess = (payload: any) =>
	action(ApplicationsTypes.APPLY_TO_EVENT_SUCCESS, payload);
export const applyToEventError = (payload: any) =>
	action(ApplicationsTypes.APPLY_TO_EVENT_ERROR, payload);

export const confirmApplicantRequest = (payload: EventApplicationRequest) =>
	action(ApplicationsTypes.CONFIRM_APPLICANT, payload);
export const confirmApplicantSuccess = (payload: EventApplicationRequest) =>
	action(ApplicationsTypes.CONFIRM_APPLICANT_SUCCESS, payload);
export const confirmApplicantError = (payload: any) =>
	action(ApplicationsTypes.CONFIRM_APPLICANT_ERROR, payload);

export const rejectApplicantRequest = (payload: EventApplicationRequest) =>
	action(ApplicationsTypes.REJECT_APPLICANT, payload);
export const rejectApplicantSuccess = (payload: EventApplicationRequest) =>
	action(ApplicationsTypes.REJECT_APPLICANT_SUCCESS, payload);
export const rejectApplicantError = (payload: any) =>
	action(ApplicationsTypes.REJECT_APPLICANT_ERROR, payload);

export const revokeApplicationRequest = (payload: number) =>
	action(ApplicationsTypes.REVOKE_APPLICATION, payload);
export const revokeApplicationSuccess = (payload: number) =>
	action(ApplicationsTypes.REVOKE_APPLICATION_SUCCESS, payload);
export const revokeApplicationError = (payload: any) =>
	action(ApplicationsTypes.REVOKE_APPLICATION_ERROR, payload);

export const removeApplication = (payload: number) =>
	action(ApplicationsTypes.REMOVE_APPLICATION, payload);

export type ApplicationsActions = ActionType<
	| typeof fetchEventApplicantsSuccess
	| typeof fetchMineApplicationsSuccess
	| typeof fetchApplicationsToMeSuccess
	| typeof applyToEventSuccess
	| typeof confirmApplicantSuccess
	| typeof rejectApplicantSuccess
	| typeof revokeApplicationSuccess
	| typeof removeApplication
>;
