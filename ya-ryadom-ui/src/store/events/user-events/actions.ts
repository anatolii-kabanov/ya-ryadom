import { action } from 'typesafe-actions';
import { UserEventsTypes } from "./types";
import { UserEventsResponse, ApplyToEvent } from './models';
import { ActionType } from 'typesafe-actions';

export const fetchUserCreatedEventsListRequest = () => action(UserEventsTypes.FETCH_CREATED_EVENTS);
export const fetchUserCreatedEventsListSuccess = (payload: UserEventsResponse) => action(UserEventsTypes.FETCH_CREATED_EVENTS_SUCCESS, payload);
export const fetchUserCreatedEventsListError = (payload: any) => action(UserEventsTypes.FETCH_CREATED_EVENTS_ERROR, payload);

export const fetchUserVisitedEventsListRequest = () => action(UserEventsTypes.FETCH_VISITED_EVENTS);
export const fetchUserVisitedEventsListSuccess = (payload: UserEventsResponse) => action(UserEventsTypes.FETCH_VISITED_EVENTS_SUCCESS, payload);
export const fetchUserVisitedEventsListError = (payload: any) => action(UserEventsTypes.FETCH_VISITED_EVENTS_ERROR, payload);

export const setSentStatus = (payload: ApplyToEvent) => action(UserEventsTypes.SET_SENT_STATUS, payload);

export type UserEventsActions = ActionType<
    typeof fetchUserCreatedEventsListRequest |
    typeof fetchUserCreatedEventsListSuccess |
    typeof fetchUserCreatedEventsListError |
    typeof fetchUserVisitedEventsListRequest |
    typeof fetchUserVisitedEventsListSuccess |
    typeof fetchUserVisitedEventsListError |
    typeof setSentStatus 
>;