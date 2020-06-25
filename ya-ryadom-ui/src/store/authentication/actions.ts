import { action } from 'typesafe-actions';
import { AuthenticationTypes } from "./types";
import { User } from './models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { ThemeType } from '../../utils/enums/theme-type.enum';

export const fetchUserInfoRequest = (payload: number) => action(AuthenticationTypes.FETCH_USER_INFO, payload);
export const fetchUserInfoSuccess = (payload: User) => action(AuthenticationTypes.FETCH_USER_INFO_SUCCESS, payload);
export const fetchUserInfoError = (payload: any) => action(AuthenticationTypes.FETCH_USER_INFO_ERROR, payload);

export const fetchVkUserInfoRequest = () => action(AuthenticationTypes.FETCH_VK_USER_INFO);
export const fetchVkUserInfoSuccess = (payload: UserInfo) => action(AuthenticationTypes.FETCH_VK_USER_INFO_SUCCESS, payload);
export const fetchVkUserInfoError = (payload: any) => action(AuthenticationTypes.FETCH_VK_USER_INFO_ERROR, payload);

export const fetchUserGeoRequest = () => action(AuthenticationTypes.FETCH_USER_GEO);
export const fetchUserGeoSuccess = (payload: any) => action(AuthenticationTypes.FETCH_USER_GEO_SUCCESS, payload);
export const fetchUserGeoError = (payload: any) => action(AuthenticationTypes.FETCH_USER_GEO_ERROR, payload);

export const saveUserInfoRequest = (payload: User) => action(AuthenticationTypes.SAVE_USER_INFO, payload);
export const saveUserInfoSuccess = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_SUCCESS, payload);
export const saveUserInfoError = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_ERROR, payload);

export const saveUserInfoGuideRequest = () => action(AuthenticationTypes.SAVE_USER_INFO_GUIDE);
export const saveUserInfoGuideSuccess = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_GUIDE_SUCCESS, payload);
export const saveUserInfoGuideError = (payload: any) => action(AuthenticationTypes.SAVE_USER_INFO_GUIDE_ERROR, payload);

export const saveUserIntroRequest = (payload: ThemeType[]) => action(AuthenticationTypes.SAVE_USER_INTRO, payload);
export const saveUserIntroSuccess = (payload: any) => action(AuthenticationTypes.SAVE_USER_INTRO_SUCCESS, payload);
export const saveUserIntroError = (payload: any) => action(AuthenticationTypes.SAVE_USER_INTRO_ERROR, payload);
