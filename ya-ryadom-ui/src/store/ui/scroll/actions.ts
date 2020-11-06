import { action, ActionType } from 'typesafe-actions';
import { ScrollTypes } from './types';

export const setScroll = (payload: { id: string; position: number }) =>
    action(ScrollTypes.SET_SCROLL_POSITION, payload);
export const scrollToPosition = (payload: number) =>
    action(ScrollTypes.SCROLL_TO_POSITION, payload);
export const scrollToIdPosition = (payload: string) =>
    action(ScrollTypes.SCROLL_TO_ID_POSITION, payload);

export type ScrollActions = ActionType<typeof setScroll>;
