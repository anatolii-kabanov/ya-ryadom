import { Reducer } from 'redux';
import { UsersState } from './state';
import { UsersTypes } from './types';
import { UsersActions } from './actions';
import _ from 'lodash';
import { AppState } from '../app-state';

export const initialState: UsersState = {
    usersProfiles: {},
    selectedProfileVkId: 0,
}

const reducer: Reducer<UsersState, UsersActions> = (state = initialState, action: UsersActions) => {
    switch (action.type) {
        case UsersTypes.FETCH_USER_INFO_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.usersProfiles[action.payload.vkUserId] = action.payload;
            return newState;
        }
        case UsersTypes.SET_PROFILE_VK_ID: {
            const newState = _.cloneDeep(state);
            newState.selectedProfileVkId = action.payload;
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as usersReducer };

export const getSelectedProfileVkUserId = (state: AppState) => state.users.selectedProfileVkId;
