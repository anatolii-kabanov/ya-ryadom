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
        default: {
            return state
        }
    }
};

export { reducer as authenticationReducer };

export const getVkUserId = (state: AppState) => state.authentication.vkUserInfo?.id;
