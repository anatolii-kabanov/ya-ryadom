import { action } from 'typesafe-actions';
import { UserEventsTypes } from "./types";
import { UserEventsResponse } from './models';
import { ActionType } from 'typesafe-actions';

export const fetchUserCreatedEventsListRequest = (payload: number) => action(UserEventsTypes.FETCH_CREATED_EVENTS, payload);
export const fetchUserCreatedEventsListSuccess = (payload: UserEventsResponse) => action(UserEventsTypes.FETCH_CREATED_EVENTS_SUCCESS, payload);
export const fetchUserCreatedEventsListError = (payload: any) => action(UserEventsTypes.FETCH_CREATED_EVENTS_ERROR, payload);

export const fetchUserVisitedEventsListRequest = (payload: number) => action(UserEventsTypes.FETCH_VISITED_EVENTS, payload);
export const fetchUserVisitedEventsListSuccess = (payload: UserEventsResponse) => action(UserEventsTypes.FETCH_VISITED_EVENTS_SUCCESS, payload);
export const fetchUserVisitedEventsListError = (payload: any) => action(UserEventsTypes.FETCH_VISITED_EVENTS_ERROR, payload);


export type UserEventsActions = ActionType<
    typeof fetchUserCreatedEventsListRequest |
    typeof fetchUserCreatedEventsListSuccess |
    typeof fetchUserCreatedEventsListError |
    typeof fetchUserVisitedEventsListRequest |
    typeof fetchUserVisitedEventsListSuccess |
    typeof fetchUserVisitedEventsListError
>;