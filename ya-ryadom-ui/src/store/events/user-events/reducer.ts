import { Reducer } from 'redux';
import { UserEventsState } from './state';
import { UserEventsTypes } from './types';
import { UserEventsActions } from './actions';
import _ from 'lodash';


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
        default: {
            return state
        }
    }
};

export { reducer as userEventsReducer };
