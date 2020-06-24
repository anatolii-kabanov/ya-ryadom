import { action } from 'typesafe-actions';
import { HistoryTypes } from "./types";
import { VkHistoryModel } from './models';

export const goForward = (payload: VkHistoryModel) => action(HistoryTypes.GO_FORWARD_VIEW_PANEL, payload);
export const goBack = () => action(HistoryTypes.GO_BACK_VIEW_PANEL);
