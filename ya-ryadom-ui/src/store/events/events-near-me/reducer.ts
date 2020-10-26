import { Reducer } from 'redux';
import { EventsNearMeState } from './state';
import { EventsNearMeTypes } from './types';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { EventsNearMeActions } from './actions';
import _ from 'lodash';

export const initialState: EventsNearMeState = {
    eventsList: [],
    sharedEvents: {},
    isLoading: false,
    selectedEventId: null,
}

const reducer: Reducer<EventsNearMeState, EventsNearMeActions> = (state = initialState, action: EventsNearMeActions) => {
    switch (action.type) {
        case EventsNearMeTypes.FETCH_LIST_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.eventsList = action.payload;
            return newState;
        }
        case EventsNearMeTypes.SET_SENT_STATUS: {
            const newState = _.cloneDeep(state);
            const index = newState.eventsList.findIndex(a => a.id === action.payload);
            newState.eventsList[index].applicationStatus = ApplicationStatus.sent;
            return newState;
        }
        case EventsNearMeTypes.SET_SHARED_EVENT_SENT_STATUS: {
            const newState = _.cloneDeep(state);
            newState.sharedEvents[action.payload].applicationStatus = ApplicationStatus.sent;
            return newState;
        }
        case EventsNearMeTypes.FETCH_EVENT_BY_ID_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.sharedEvents[action.payload.id] = action.payload;
            return newState;
        }
        case EventsNearMeTypes.SET_SELECTED_EVENT: {
            const newState = _.cloneDeep(state);
            newState.selectedEventId = action.payload;
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as eventsNearMeReducer };
