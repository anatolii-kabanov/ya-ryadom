export enum ApplicationsTypes {
	FETCH_EVENT_APPLICANTS = '[ApplicationsTypes] (GET) Fetch event applicants',
	FETCH_EVENT_APPLICANTS_SUCCESS = '[ApplicationsTypes] Fetch event applicants success',
	FETCH_EVENT_APPLICANTS_ERROR = '[ApplicationsTypes] Fetch event applicants error',

	FETCH_MINE_APPLICATIONS = '[ApplicationsTypes] (GET) Fetch my applications',
	FETCH_MINE_APPLICATIONS_SUCCESS = '[ApplicationsTypes] Fetch my applications success',
	FETCH_MINE_APPLICATIONS_ERROR = '[ApplicationsTypes] Fetch my applications error',

	FETCH_APPLICATIONS_TO_ME = '[ApplicationsTypes] (GET) Fetch applications to me',
	FETCH_APPLICATIONS_TO_ME_SUCCESS = '[ApplicationsTypes] Fetch applications to me success',
	FETCH_APPLICATIONS_TO_ME_ERROR = '[ApplicationsTypes] Fetch applications to me error',

	APPLY_TO_EVENT_FROM_USERS_EVENTS = '[ApplicationsTypes] Apply to event from users created events',
	APPLY_TO_EVENT_FROM_EVENTS = '[ApplicationsTypes] Apply to event from events page',
	APPLY_TO_EVENT_FROM_SELECTED_EVENT = '[ApplicationsTypes] Apply to event from selected event page',
	APPLY_TO_EVENT = '[ApplicationsTypes] (POST) Apply to event',
	APPLY_TO_EVENT_SUCCESS = '[ApplicationsTypes] Apply to event success',
	APPLY_TO_EVENT_ERROR = '[ApplicationsTypes] Apply to event error',

	CONFIRM_APPLICANT = '[ApplicationsTypes] (POST) Confirm applicant to event',
	CONFIRM_APPLICANT_SUCCESS = '[ApplicationsTypes] Confirm applicant to event success',
	CONFIRM_APPLICANT_ERROR = '[ApplicationsTypes] Confirm applicant to event error',

	REJECT_APPLICANT = '[ApplicationsTypes] (POST) Reject applicant to event',
	REJECT_APPLICANT_SUCCESS = '[ApplicationsTypes] Reject applicant to event success',
	REJECT_APPLICANT_ERROR = '[ApplicationsTypes] Reject applicant to event error',

	REVOKE_APPLICATION = '[ApplicationsTypes] (POST) Revoke application to event',
	REVOKE_APPLICATION_SUCCESS = '[ApplicationsTypes] Revoke application to event success',
	REVOKE_APPLICATION_ERROR = '[ApplicationsTypes] Revoke application to event error',
	REMOVE_APPLICATION = '[ApplicationsTypes] Remove application to event',
}
