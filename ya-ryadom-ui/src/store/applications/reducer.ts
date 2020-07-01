import { Reducer } from 'redux';
import { ApplicationsState } from './state';
import { ApplicationsTypes } from './types';

export const initialState: ApplicationsState = {
    eventsApplicants: null
}

const reducer: Reducer<ApplicationsState> = (state = initialState, action) => {
    switch (action.type) {
        case ApplicationsTypes.FETCH_EVENT_APPLICANTS: {
            return { ...state, vkUserInfo: action.payload }
        }
        default: {
            return state
        }
    }
};

export { reducer as applicationsReducer };
