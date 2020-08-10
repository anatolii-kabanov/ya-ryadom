import { action, ActionType } from 'typesafe-actions';
import { AuthenticationTypes } from "./types";
import { CurrentUser, UserBaseInfo } from './models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { ThemeType } from '../../utils/enums/theme-type.enum';
import { Position } from './models';

export const fetchUserInfoRequest = (payload: number) => action(AuthenticationTypes.FETCH_USER_INFO, payload);
export const fetchUserInfoSuccess = (payload: CurrentUser) => action(AuthenticationTypes.FETCH_USER_INFO_SUCCESS, payload);
export const fetchUserInfoError = (payload: any) => action(AuthenticationTypes.FETCH_USER_INFO_ERROR, payload);

export const fetchVkUserInfoRequest = () => action(AuthenticationTypes.FETCH_VK_USER_INFO);
export const fetchVkUserInfoSuccess = (payload: UserInfo) => action(AuthenticationTypes.FETCH_VK_USER_INFO_SUCCESS, payload);
export const fetchVkUserInfoError = (payload: any) => action(AuthenticationTypes.FETCH_VK_USER_INFO_ERROR, payload);

export const fetchUserGeoRequest = () => action(AuthenticationTypes.FETCH_USER_GEO);
export const fetchUserGeoSuccess = (payload: any) => action(AuthenticationTypes.FETCH_USER_GEO_SUCCESS, payload);
export const fetchUserGeoError = (payload: any) => action(AuthenticationTypes.FETCH_USER_GEO_ERROR, payload);

export const saveUserInfoRequest = (payload: UserBaseInfo) => action(AuthenticationTypes.SAVE_USER_INFO, payload);
export const saveUserInfoSuccess = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_SUCCESS, payload);
export const saveUserInfoError = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_ERROR, payload);

export const saveUserGuideCompletedRequest = () => action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED);
export const saveUserGuideCompletedSuccess = () => action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_SUCCESS);
export const saveUserGuideCompletedError = (payload: any) => action(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_ERROR, payload);

export const saveUserIntroThemes = (payload: ThemeType[]) => action(AuthenticationTypes.SAVE_USER_INTRO_THEMES, payload);
export const saveUserProfileThemes = (payload: ThemeType[]) => action(AuthenticationTypes.SAVE_USER_PROFILE_THEMES, payload);

export const saveUserThemesRequest = (payload: ThemeType[]) => action(AuthenticationTypes.SAVE_USER_THEMES, payload);
export const saveUserThemesSuccess = (payload: ThemeType[]) => action(AuthenticationTypes.SAVE_USER_THEMES_SUCCESS, payload);
export const saveUserThemesError = (payload: any) => action(AuthenticationTypes.SAVE_USER_THEMES_ERROR, payload);

export const saveUserLocationRequest = (payload: Position) => action(AuthenticationTypes.SAVE_USER_LOCATION, payload);
export const saveUserLocationSuccess = (payload: Position) => action(AuthenticationTypes.SAVE_USER_LOCATION_SUCCESS, payload);
export const saveUserLocationError = (payload: any) => action(AuthenticationTypes.SAVE_USER_LOCATION_ERROR, payload);

export const saveUserIntroAboutMyself = (payload: string) => action(AuthenticationTypes.SAVE_USER_INTRO_ABOUT_MYSELF, payload);
export const saveUserProfileAboutMyself = (payload: string) => action(AuthenticationTypes.SAVE_USER_PROFILE_ABOUT_MYSELF, payload);

export const saveUserAboutMyselfRequest = (payload: string) => action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF, payload);
export const saveUserAboutMyselfSuccess = (payload: string) => action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_SUCCESS, payload);
export const saveUserAboutMyselfError = (payload: any) => action(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_ERROR, payload);

export const allowNotificationsRequest = () => action(AuthenticationTypes.ALLOW_NOTIFICATIONS);
export const allowNotificationsSuccess = () => action(AuthenticationTypes.ALLOW_NOTIFICATIONS_SUCCESS);
export const allowNotificationsError = (payload: any) => action(AuthenticationTypes.ALLOW_NOTIFICATIONS_ERROR, payload);

export const disableNotificationsRequest = () => action(AuthenticationTypes.DISABLE_NOTIFICATIONS);
export const disableNotificationsSuccess = () => action(AuthenticationTypes.DISABLE_NOTIFICATIONS_SUCCESS);
export const disableNotificationsError = (payload: any) => action(AuthenticationTypes.DISABLE_NOTIFICATIONS_ERROR, payload);

export type AuthenticationActions = ActionType<
    typeof fetchUserInfoSuccess |
    typeof fetchVkUserInfoSuccess |
    typeof fetchUserGeoSuccess |
    typeof saveUserInfoSuccess |
    typeof saveUserGuideCompletedSuccess |
    typeof saveUserThemesSuccess |
    typeof saveUserLocationSuccess |
    typeof saveUserAboutMyselfSuccess |
    typeof allowNotificationsSuccess |
    typeof disableNotificationsSuccess
>;