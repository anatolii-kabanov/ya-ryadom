export enum EventsNearMeTypes {
    FETCH_LIST = '[Events near me] (POST) Fetching events near me',
    FETCH_LIST_SUCCESS = '[Events near me] Fetching events near me success',
    FETCH_LIST_ERROR = '[Events near me] Fetching events near me error',

    SET_SENT_STATUS = '[Events near me] Event changed status for user to sent',
    SET_SHARED_EVENT_SENT_STATUS = '[Events near me] Shared event changed status for user to sent',

    FETCH_EVENT_BY_ID = '[Events near me] (POST) Fetching event near me by id',
    FETCH_EVENT_BY_ID_SUCCESS = '[Events near me] Fetching event near me by id success',
    FETCH_EVENT_BY_ID_ERROR = '[Events near me] Fetching event near me by id error',

    SET_SELECTED_EVENT = '[Events near me] Set selected event',
};
