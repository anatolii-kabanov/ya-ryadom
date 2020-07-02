import { action } from 'typesafe-actions';
import { EventsNearMeTypes } from "./types";
import { EventNearMe } from './models';

export const fetchListRequest = (payload: any) => action(EventsNearMeTypes.FETCH_LIST, payload);
export const fetchListSuccess = (payload: EventNearMe[]) => action(EventsNearMeTypes.FETCH_LIST_SUCCESS, payload);
export const fetchListError = (payload: any) => action(EventsNearMeTypes.FETCH_LIST_ERROR, payload);

export const setSentStatus = (payload: number) => action(EventsNearMeTypes.SET_SENT_STATUS, payload);
