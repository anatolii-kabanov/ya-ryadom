import { action } from 'typesafe-actions';
import { MyEventsTypes } from "./types";
import { MyEvent } from './models';

export const fetchMyEventsListRequest = () => action(MyEventsTypes.FETCH_LIST);
export const fetchMyEventsListSuccess = (payload: MyEvent[]) => action(MyEventsTypes.FETCH_LIST_SUCCESS, payload);
export const fetchMyEventsListError = (payload: any) => action(MyEventsTypes.FETCH_LIST_ERROR, payload);

export const saveMyEventRequest = (payload: any) => action(MyEventsTypes.SAVE_MY_EVENT, payload)
export const saveMyEventSuccess = (payload: any) => action(MyEventsTypes.SAVE_MY_EVENT_SUCCESS, payload)
export const saveMyEventError = (payload: any) => action(MyEventsTypes.SAVE_MY_EVENT_ERROR, payload)