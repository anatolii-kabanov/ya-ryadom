import { Reducer } from 'redux';
import { ApplicationsState } from './state';
import { ApplicationsTypes } from './types';

export const initialState: ApplicationsState = {
    eventsApplicants: {},
    mineApplications: [],
    applicationsToMe: []
}

const reducer: Reducer<ApplicationsState> = (state = initialState, action) => {
    switch (action.type) {
        case ApplicationsTypes.FETCH_EVENT_APPLICANTS_SUCCESS: {
            return {
                ...state, eventsApplicants: {
                    ...state.eventsApplicants,
                    [action.payload.eventId]: action.payload.applications
                }
            }
        }
        case ApplicationsTypes.FETCH_MINE_APPLICATIONS_SUCCESS: {
            return {
                ...state, mineApplications: action.payload
            }
        }
        case ApplicationsTypes.FETCH_APPLICATIONS_TO_ME_SUCCESS: {
            return {
                ...state, applicationsToMe: action.payload
            }
        }
        case ApplicationsTypes.REVOKE_APPLICATION_SUCCESS: {           
            return {
                ...state, mineApplications: [
                    ...state.mineApplications.filter(m => m.id !== action.payload)
                ]
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as applicationsReducer };
