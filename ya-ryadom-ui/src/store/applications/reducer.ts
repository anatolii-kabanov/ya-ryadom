import { Reducer } from 'redux';
import { ApplicationsState } from './state';
import { ApplicationsTypes } from './types';

export const initialState: ApplicationsState = {
    eventsApplicants: {}
}

const reducer: Reducer<ApplicationsState> = (state = initialState, action) => {
    switch (action.type) {
        case ApplicationsTypes.FETCH_EVENT_APPLICANTS: {
            return {
                ...state, eventsApplicants: {
                    ...state.eventsApplicants,
                    [action.payload.eventId]: action.payload.applications
                }
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as applicationsReducer };
