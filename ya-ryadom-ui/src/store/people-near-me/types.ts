export enum PeopleNearMeTypes {
    FETCH_LIST = '[People near me] (GET) Fetching people near me',
    FETCH_LIST_SUCCESS = '[People near me] Fetching people near me success',
    FETCH_LIST_ERROR = '[People near me] Fetching people near me error',

    FETCH_MY_EVENTS_LIST = '[People near me] (GET) Fetching my events',
    FETCH_MY_EVENTS_LIST_SUCCESS = '[People near me] Fetching my events success',
    FETCH_MY_EVENTS_LIST_ERROR = '[People near me] Fetching my events error',


    SET_CURRENT_PERSON = '[People near me] To open particular person description',

    FILL_IN_PROFILE = '[People near me] Fill profile to appear in map',
    FILL_IN_PROFILE_SUCCESS = '[People near me] Successfully filled profile',
    FILL_IN_PROFILE_ERROR = '[People near me] Filling profile error happened',

    SAVE_MY_EVENT = '[People near me] (POST) Save my event',
    SAVE_MY_EVENT_SUCCESS = '[People near me] (POST) Save my event success',
    SAVE_MY_EVENT_ERROR = '[People near me] (POST) Save my event error',
};
