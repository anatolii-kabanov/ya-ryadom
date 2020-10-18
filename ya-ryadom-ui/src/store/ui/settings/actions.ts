import { action, ActionType } from 'typesafe-actions';
import { SettingsTypes } from "./types";
import { ThemeType } from '../../../utils/enums/theme-type.enum';
import { Position } from '../../authentication/models';
import { VkStyles } from './models';

export const clearEventsFilter = () => action(SettingsTypes.CLEAR_EVENTS_FILTER);
export const setEventsFilter = () => action(SettingsTypes.SET_EVENTS_FILTER);
export const updateEventsRadiusFilter = (payload: number) => action(SettingsTypes.UPDATE_EVENTS_RADIUS_FILTER, payload);
export const updateEventsThemeFilter = (payload: ThemeType) => action(SettingsTypes.UPDATE_EVENTS_THEME_FILTER, payload);
export const updateEventsTextFilter = (payload: string) => action(SettingsTypes.UPDATE_EVENTS_TEXT_FILTER, payload);
export const updateEventsAddressFilter = (payload: { position: Position, address: string }) => action(SettingsTypes.UPDATE_EVENTS_ADDRESS_FILTER, payload);
export const setOnlineStatus = (payload: boolean) => action(SettingsTypes.SET_ONLINE_STATUS, payload);

export const updateVkStyles = (payload: VkStyles) => action(SettingsTypes.UPDATE_VK_STYLES, payload);

export const requestIsWebView = () => action(SettingsTypes.REQUEST_IS_WEBVIEW);
export const requestIsWebViewSuccess = (payload: boolean) => action(SettingsTypes.REQUEST_IS_WEBVIEW_SUCCESS, payload);

export type SettingsActions = ActionType<
    typeof clearEventsFilter |
    typeof setEventsFilter |
    typeof updateEventsRadiusFilter |
    typeof updateEventsThemeFilter |
    typeof updateEventsTextFilter |
    typeof updateEventsAddressFilter |
    typeof setOnlineStatus |
    typeof updateVkStyles |
    typeof requestIsWebViewSuccess
>;