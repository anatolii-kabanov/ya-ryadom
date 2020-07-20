export enum UserEventsTypes {
    FETCH_CREATED_EVENTS = '[User Events] (GET) Fetching user created events',
    FETCH_CREATED_EVENTS_SUCCESS = '[User Events] Fetching user created events success',
    FETCH_CREATED_EVENTS_ERROR = '[User Events] Fetching user created events error',

    FETCH_VISITED_EVENTS = '[User Events] (GET) Fetching user visited events',
    FETCH_VISITED_EVENTS_SUCCESS = '[User Events] Fetching user visited events success',
    FETCH_VISITED_EVENTS_ERROR = '[User Events] Fetching user visited events error',

    SET_SENT_STATUS = '[User Events] Created event changed status for user to sent',
};