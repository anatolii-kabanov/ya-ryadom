import { action, ActionType } from 'typesafe-actions';
import { UsersTypes } from './types';
import { User } from './models';

export const fetchUserInfoRequest = () => action(UsersTypes.FETCH_USER_INFO);
export const fetchUserInfoSuccess = (payload: User) =>
	action(UsersTypes.FETCH_USER_INFO_SUCCESS, payload);
export const fetchUserInfoError = (payload: any) =>
	action(UsersTypes.FETCH_USER_INFO_ERROR, payload);

export const setProfileVkId = (payload: number) =>
	action(UsersTypes.SET_PROFILE_VK_ID, payload);

export type UsersActions = ActionType<
	typeof fetchUserInfoSuccess | typeof setProfileVkId
>;
