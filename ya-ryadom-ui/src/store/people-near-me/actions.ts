import { action } from 'typesafe-actions';
import { PeopleNearMeTypes } from "./types";
import { PersonNearMe } from './models';

export const fetchListRequest = (payload: any) => action(PeopleNearMeTypes.FETCH_LIST, payload);
export const fetchListSuccess = (payload: PersonNearMe[]) => action(PeopleNearMeTypes.FETCH_LIST_SUCCESS, payload);
export const fetchListError = (payload: any) => action(PeopleNearMeTypes.FETCH_LIST_ERROR, payload);

export const fetchMyEventsListRequest = () => action(PeopleNearMeTypes.FETCH_MY_EVENTS_LIST);
export const fetchMyEventsListSuccess = (payload: PersonNearMe[]) => action(PeopleNearMeTypes.FETCH_MY_EVENTS_LIST_SUCCESS, payload);
export const fetchMyEventsListError = (payload: any) => action(PeopleNearMeTypes.FETCH_MY_EVENTS_LIST_ERROR, payload);

export const setCurrentPerson = (payload: number) => action(PeopleNearMeTypes.SET_CURRENT_PERSON, payload)

export const saveMyEventRequest = (payload: any) => action(PeopleNearMeTypes.SAVE_MY_EVENT, payload)
export const saveMyEventSuccess = (payload: any) => action(PeopleNearMeTypes.SAVE_MY_EVENT_SUCCESS, payload)
export const saveMyEventError = (payload: any) => action(PeopleNearMeTypes.SAVE_MY_EVENT_ERROR, payload)
