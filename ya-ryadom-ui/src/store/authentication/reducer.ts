import { Reducer } from 'redux';
import { AuthenticationState } from './state';
import { AuthenticationTypes } from './types';
import { AppState } from '../app-state';

export const initialState: AuthenticationState = {
    currentUser: null,
    vkUserInfo: null,
    geoData: null,
}

const reducer: Reducer<AuthenticationState> = (state = initialState, action) => {
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
            return { ...state, currentUser: { ...state.currentUser, selectedThemes: action.payload } }
        }
        case AuthenticationTypes.SAVE_USER_LOCATION_SUCCESS: {
            return { ...state, currentUser: { ...state.currentUser, lastLocation: action.payload } }
        }
        case AuthenticationTypes.SAVE_USER_ABOUT_MYSELF_SUCCESS: {
            return { ...state, currentUser: { ...state.currentUser, aboutMySelf: action.payload } }
        }
        case AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_SUCCESS: {
            return { ...state, currentUser: { ...state.currentUser, guideCompleted: true } }
        }
        case AuthenticationTypes.ALLOW_NOTIFICATIONS_SUCCESS: {
            return { ...state, currentUser: { ...state.currentUser, notificationsEnabled: true } }
        }
        case AuthenticationTypes.DISABLE_NOTIFICATIONS_SUCCESS: {
            return { ...state, currentUser: { ...state.currentUser, notificationsEnabled: false } }
        }
        default: {
            return state
        }
    }
};

export { reducer as authenticationReducer };

export const getVkUserId = (state: AppState) => state.authentication.vkUserInfo?.id;
export const getGeoData = (state: AppState) => state.authentication.geoData;
