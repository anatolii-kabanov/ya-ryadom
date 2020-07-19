import { action } from 'typesafe-actions';
import { HistoryTypes } from "./types";
import { VkHistoryModel } from './models';

export const goForward = (payload: VkHistoryModel) => action(HistoryTypes.GO_FORWARD_VIEW_PANEL, payload);
export const goBack = () => action(HistoryTypes.GO_BACK_VIEW_PANEL);
export const reset = (payload: VkHistoryModel) => action(HistoryTypes.RESET_VIEW_PANEL, payload);

export const setActiveModal = (payload: string | null) => action(HistoryTypes.SET_ACTIVE_MODAL, payload);
export const openUserProfile = (payload: number) => action(HistoryTypes.OPEN_USER_PROFILE, payload);
