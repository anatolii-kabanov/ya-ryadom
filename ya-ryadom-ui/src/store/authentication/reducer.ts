import { Reducer } from 'redux';
import { AuthenticationState } from './state';
import { AuthenticationTypes } from './types';
import { AppState } from '../app-state';
import { AuthenticationActions } from './actions';
import _ from 'lodash';

export const initialState: AuthenticationState = {
    currentUser: null,
    vkUserInfo: null,
    geoData: null,
}

const reducer: Reducer<AuthenticationState, AuthenticationActions> = (state = initialState, action: AuthenticationActions) => {
    switch (action.type) {
        case AuthenticationTypes.FETCH_VK_USER_INFO_SUCCESS: {
            return { ...state, vkUserInfo: action.payload }
        }
        case AuthenticationTypes.FETCH_USER_INFO_SUCCESS: {
            return { ...state, currentUser: action.payload }
        }
        case AuthenticationTypes.FETCH_USER_GEO_SUCCESS: {
            return { ...state, geoData: action.payload }
        }
        case AuthenticationTypes.SAVE_USER_THEMES_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.selectedThemes = action.payload;
            }
            return newState;
        }
        case AuthenticationTypes.SAVE_USER_LOCATION_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.lastLocation = action.payload;
            }
            return newState;
        }
        case AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.aboutMySelf = action.payload;
            }
            return newState;
        }
        case AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.guideCompleted = true;
            }
            return newState;
        }
        case AuthenticationTypes.ALLOW_NOTIFICATIONS_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.notificationsEnabled = true;
            }
            return newState;
        }
        case AuthenticationTypes.DISABLE_NOTIFICATIONS_SUCCESS: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.notificationsEnabled = false;
            }
            return newState;
        }
        case AuthenticationTypes.CLEAR_USER_GEO: {
            const newState = _.cloneDeep(state);
            newState.geoData = null;
            return newState;
        }
        case AuthenticationTypes.SET_USER_DEFAULT_LOCATION: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.lastLocation = action.payload;
            }
            return newState;
        }
        case AuthenticationTypes.SET_USER_THEMES: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.selectedThemes = action.payload;
            }
            return newState;
        }
        case AuthenticationTypes.SET_USER_ABOUT_MYSELF: {
            const newState = _.cloneDeep(state);
            if (newState.currentUser) {
                newState.currentUser.aboutMySelf = action.payload;
            }
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as authenticationReducer };

export const getVkUserId = (state: AppState) => state.authentication.vkUserInfo?.id;
export const getGeoData = (state: AppState) => state.authentication.geoData;
export const getVkUserInfo = (state: AppState) => state.authentication.vkUserInfo;
export const getCurrentUser = (state: AppState) => state.authentication.currentUser;
