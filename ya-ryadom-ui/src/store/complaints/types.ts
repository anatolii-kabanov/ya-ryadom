export enum ComplaintsTypes {
	SEND_COMPLAINT_TO_EVENT = '[ComplaintsTypes] (POST) Send complaint to event',
	SEND_COMPLAINT_TO_EVENT_SUCCESS = '[ComplaintsTypes] Send complaint to event success',
	SEND_COMPLAINT_TO_EVENT_ERROR = '[ComplaintsTypes] Send complaint to event error',

	SEND_COMPLAINT_TO_USER = '[ComplaintsTypes] (POST) Send complaint to user',
	SEND_COMPLAINT_TO_USER_SUCCESS = '[ComplaintsTypes] Send complaint to user success',
	SEND_COMPLAINT_TO_USER_ERROR = '[ComplaintsTypes] Send complaint to user error',

	SET_SELECTED_EVENT_ID = '[History Types] Set selected event id',
	OPEN_EVENT_COMPLAINT_FORM = '[History Types] Open event complaint form',
}
