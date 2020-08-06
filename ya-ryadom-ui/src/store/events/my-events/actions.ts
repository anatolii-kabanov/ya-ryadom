import { action, ActionType } from 'typesafe-actions';
import { MyEventsTypes } from "./types";
import { MyEvent, MyEventCreate } from './models';
import { EventApplicationUpdateStatus } from '../../applications/models';

export const fetchMyEventsListRequest = () => action(MyEventsTypes.FETCH_LIST);
export const fetchMyEventsListSuccess = (payload: MyEvent[]) => action(MyEventsTypes.FETCH_LIST_SUCCESS, payload);
export const fetchMyEventsListError = (payload: any) => action(MyEventsTypes.FETCH_LIST_ERROR, payload);

export const updateParticipantStatus = (payload: EventApplicationUpdateStatus) => action(MyEventsTypes.UPDATE_PARTICIPANT_STATUS, payload);

export const saveMyEventRequest = (payload: MyEventCreate) => action(MyEventsTypes.SAVE_MY_EVENT, payload);
export const saveMyEventIntroRequest = (payload: MyEventCreate) => action(MyEventsTypes.SAVE_MY_EVENT_INTRO, payload)
export const saveMyEventGeneralRequest = (payload: MyEventCreate) => action(MyEventsTypes.SAVE_MY_EVENT_GENERAL, payload)
export const saveMyEventSuccess = (payload: any) => action(MyEventsTypes.SAVE_MY_EVENT_SUCCESS, payload);
export const saveMyEventError = (payload: any) => action(MyEventsTypes.SAVE_MY_EVENT_ERROR, payload);

export const revokeEventRequest = (payload: number) => action(MyEventsTypes.REVOKE_MY_EVENT, payload);
export const revokeEventSuccess = (payload: number) => action(MyEventsTypes.REVOKE_MY_EVENT_SUCCESS, payload);
export const revokeEventError = (payload: any) => action(MyEventsTypes.REVOKE_MY_EVENT_ERROR, payload);


export type MyEventsActions = ActionType<
    typeof fetchMyEventsListSuccess |
    typeof saveMyEventSuccess |
    typeof revokeEventSuccess |
    typeof updateParticipantStatus
>;