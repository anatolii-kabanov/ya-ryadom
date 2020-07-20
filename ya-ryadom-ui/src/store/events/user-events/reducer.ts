import { Reducer } from 'redux';
import { UserEventsState } from './state';
import { UserEventsTypes } from './types';
import { UserEventsActions } from './actions';
import _ from 'lodash';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';


export const initialState: UserEventsState = {
    userCreatedEvents: {},
    userVisitedEvents: {},
}

const reducer: Reducer<UserEventsState, UserEventsActions> = (state = initialState, action: UserEventsActions) => {
    switch (action.type) {
        case UserEventsTypes.FETCH_VISITED_EVENTS_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.userVisitedEvents[action.payload.vkUserId] = action.payload.events
            return newState;
        }
        case UserEventsTypes.FETCH_CREATED_EVENTS_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.userCreatedEvents[action.payload.vkUserId] = action.payload.events
            return newState;
        }
        case UserEventsTypes.SET_SENT_STATUS: {
            const newState = _.cloneDeep(state);
            const event = newState.userCreatedEvents[action.payload.vkUserId].find(a => a.id === action.payload.eventId);
            let applicant = event?.participants.find((p) => p.vkUserId === action.payload.vkUserId);
            if (applicant) {
                applicant.applicationStatus = ApplicationStatus.sent;
            } 
            return newState;

        }
        default: {
            return state
        }
    }
};

export { reducer as userEventsReducer };
