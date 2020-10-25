import { action, ActionType } from 'typesafe-actions';
import { EventsNearMeTypes } from "./types";
import { EventNearMe } from './models';

export const fetchListRequest = (payload: any) => action(EventsNearMeTypes.FETCH_LIST, payload);
export const fetchListSuccess = (payload: EventNearMe[]) => action(EventsNearMeTypes.FETCH_LIST_SUCCESS, payload);
export const fetchListError = (payload: any) => action(EventsNearMeTypes.FETCH_LIST_ERROR, payload);

export const setSentStatus = (payload: number) => action(EventsNearMeTypes.SET_SENT_STATUS, payload);

export const fetchEventByIdRequest = (payload: number) => action(EventsNearMeTypes.FETCH_EVENT_BY_ID, payload);
export const fetchEventByIdSuccess = (payload: EventNearMe) => action(EventsNearMeTypes.FETCH_EVENT_BY_ID_SUCCESS, payload);
export const fetchEventByIdError = (payload: any) => action(EventsNearMeTypes.FETCH_EVENT_BY_ID_ERROR, payload);

export type EventsNearMeActions = ActionType<
    typeof fetchListSuccess |
    typeof setSentStatus |
    typeof fetchEventByIdSuccess
>;
