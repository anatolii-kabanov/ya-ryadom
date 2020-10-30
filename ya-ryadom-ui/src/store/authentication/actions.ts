import { action, ActionType } from 'typesafe-actions';
import { AuthenticationTypes } from './types';
import {
	CurrentUser,
	SaveUserInfoRequest,
	GeolocationRequest,
	Geo,
} from './models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { ThemeType } from '../../utils/enums/theme-type.enum';
import { Position } from './models';

export const fetchUserInfoRequest = (payload: number) =>
	action(AuthenticationTypes.FETCH_USER_INFO, payload);
export const fetchUserInfoSuccess = (payload: CurrentUser) =>
	action(AuthenticationTypes.FETCH_USER_INFO_SUCCESS, payload);
export const fetchUserInfoError = (payload: any) =>
	action(AuthenticationTypes.FETCH_USER_INFO_ERROR, payload);

export const fetchVkUserInfoRequest = () =>
	action(AuthenticationTypes.FETCH_VK_USER_INFO);
export const fetchVkUserInfoSuccess = (payload: UserInfo) =>
	action(AuthenticationTypes.FETCH_VK_USER_INFO_SUCCESS, payload);
export const fetchVkUserInfoError = (payload: any) =>
	action(AuthenticationTypes.FETCH_VK_USER_INFO_ERROR, payload);

export const fetchUserGeoRequest = () =>
	action(AuthenticationTypes.FETCH_USER_GEO);
export const fetchUserGeoSuccess = (payload: Geo | null) =>
	action(AuthenticationTypes.FETCH_USER_GEO_SUCCESS, payload);
export const fetchUserGeoError = (payload: any) =>
	action(AuthenticationTypes.FETCH_USER_GEO_ERROR, payload);

export const saveUserInfoRequest = (payload: SaveUserInfoRequest) =>
	action(AuthenticationTypes.SAVE_USER_INFO, payload);
export const saveUserInfoSuccess = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_INFO_SUCCESS, payload);
export const saveUserInfoError = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_INFO_ERROR, payload);

export const saveUserGuideCompletedRequest = () =>
	action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED);
export const saveUserGuideCompletedSuccess = () =>
	action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_SUCCESS);
export const saveUserGuideCompletedError = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_ERROR, payload);

export const saveUserProfileThemes = (payload: ThemeType[]) =>
	action(AuthenticationTypes.SAVE_USER_PROFILE_THEMES, payload);

export const saveUserThemesRequest = (payload: ThemeType[]) =>
	action(AuthenticationTypes.SAVE_USER_THEMES, payload);
export const saveUserThemesSuccess = (payload: ThemeType[]) =>
	action(AuthenticationTypes.SAVE_USER_THEMES_SUCCESS, payload);
export const saveUserThemesError = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_THEMES_ERROR, payload);

export const saveUserLocationRequest = (payload: GeolocationRequest) =>
	action(AuthenticationTypes.SAVE_USER_LOCATION, payload);
export const saveUserLocationSuccess = (payload: Position | null) =>
	action(AuthenticationTypes.SAVE_USER_LOCATION_SUCCESS, payload);
export const saveUserLocationError = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_LOCATION_ERROR, payload);

export const saveUserProfileAboutMyself = (payload: string) =>
	action(AuthenticationTypes.SAVE_USER_PROFILE_ABOUT_MYSELF, payload);

export const saveUserAboutMyselfRequest = (payload: string) =>
	action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF, payload);
export const saveUserAboutMyselfSuccess = (payload: string) =>
	action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_SUCCESS, payload);
export const saveUserAboutMyselfError = (payload: any) =>
	action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_ERROR, payload);

export const allowNotifications = () =>
	action(AuthenticationTypes.ALLOW_NOTIFICATIONS);
export const allowNotificationsRequest = () =>
	action(AuthenticationTypes.ALLOW_NOTIFICATIONS_REQUEST);
export const allowNotificationsSuccess = () =>
	action(AuthenticationTypes.ALLOW_NOTIFICATIONS_SUCCESS);
export const allowNotificationsError = (payload: any) =>
	action(AuthenticationTypes.ALLOW_NOTIFICATIONS_ERROR, payload);

export const disableNotifications = () =>
	action(AuthenticationTypes.DISABLE_NOTIFICATIONS);
export const disableNotificationsRequest = () =>
	action(AuthenticationTypes.DISABLE_NOTIFICATIONS_REQUEST);
export const disableNotificationsSuccess = () =>
	action(AuthenticationTypes.DISABLE_NOTIFICATIONS_SUCCESS);
export const disableNotificationsError = (payload: any) =>
	action(AuthenticationTypes.DISABLE_NOTIFICATIONS_ERROR, payload);

export const clearUserGeo = () => action(AuthenticationTypes.CLEAR_USER_GEO);
export const setUserGeo = (payload: Geo) =>
	action(AuthenticationTypes.SET_USER_GEO, payload);

export const setUserDefaultLocation = (payload: Position) =>
	action(AuthenticationTypes.SET_USER_DEFAULT_LOCATION, payload);
export const setUserThemes = (payload: ThemeType[]) =>
	action(AuthenticationTypes.SET_USER_THEMES, payload);
export const setUserAboutMyself = (payload: string) =>
	action(AuthenticationTypes.SET_USER_ABOUT_MYSELF, payload);
export const setUserGeolocation = (payload: boolean) =>
	action(AuthenticationTypes.SET_USER_GEOLOCATION, payload);
export const completeUserGuide = (payload: string) =>
	action(AuthenticationTypes.COMPLETE_USER_GUIDE, payload);

export const enableUserGeolocation = () =>
	action(AuthenticationTypes.ENABLE_USER_LOCATION);
export const disableUserGeolocation = () =>
	action(AuthenticationTypes.DISABLE_USER_LOCATION);

export const setUserLocationProcess = (payload: boolean) =>
	action(AuthenticationTypes.SET_USER_LOCATION_PROCESS, payload);

export type AuthenticationActions = ActionType<
	| typeof fetchUserInfoSuccess
	| typeof fetchVkUserInfoSuccess
	| typeof fetchUserGeoSuccess
	| typeof saveUserInfoSuccess
	| typeof saveUserGuideCompletedSuccess
	| typeof saveUserThemesSuccess
	| typeof saveUserLocationSuccess
	| typeof saveUserAboutMyselfSuccess
	| typeof allowNotificationsSuccess
	| typeof disableNotificationsSuccess
	| typeof clearUserGeo
	| typeof setUserDefaultLocation
	| typeof setUserThemes
	| typeof setUserAboutMyself
	| typeof setUserGeolocation
	| typeof setUserGeo
>;
