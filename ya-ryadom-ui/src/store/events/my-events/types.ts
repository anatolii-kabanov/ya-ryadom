export enum MyEventsTypes {
	FETCH_LIST = '[My Events] (GET) Fetching my events',
	FETCH_LIST_SUCCESS = '[My Events] Fetching my events success',
	FETCH_LIST_ERROR = '[My Events] Fetching my events error',

	UPDATE_PARTICIPANT_STATUS = '[My Events] Update participant status',

	SAVE_MY_EVENT = '[My Events] (POST) Save my event',
	SAVE_MY_EVENT_INTRO = '[My Events] Save my event intro',
	SAVE_MY_EVENT_GENERAL = '[My Events] Save my event general',
	SAVE_MY_EVENT_SUCCESS = '[My Events] Save my event success',
	SAVE_MY_EVENT_ERROR = '[My Events] Save my event error',

	REVOKE_MY_EVENT = '[My Events] (POST) Revoke my event',
	REVOKE_MY_EVENT_SUCCESS = '[My Events] Revoke my event success',
	REVOKE_MY_EVENT_ERROR = '[My Events] Revoke my event error',

	UPDATE_EVENT_FORM = '[My Events] Update event form',
	RESET_EVENT_FORM = '[My Events] Reset event form',
}
