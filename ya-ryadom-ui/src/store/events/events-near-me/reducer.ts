import { Reducer } from 'redux';
import { EventsNearMeState } from './state';
import { EventsNearMeTypes } from './types';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';

export const initialState: EventsNearMeState = {
    eventsList: [],
    isLoading: false,
}

const reducer: Reducer<EventsNearMeState> = (state = initialState, action) => {
    switch (action.type) {
        case EventsNearMeTypes.FETCH_LIST_SUCCESS: {
            return { ...state, eventsList: action.payload.sort((a, b) => a.distance - b.distance) }
        }
        case EventsNearMeTypes.SET_SENT_STATUS: {
            const index = state.eventsList.findIndex(a => a.id === action.payload);
            const event = { ...state.eventsList[index] };
            event.applicationStatus = ApplicationStatus.sent;
            return {
                ...state, discountsList: [
                    ...state.eventsList.slice(0, index),
                    event,
                    ...state.eventsList.slice(index + 1),
                ]
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as eventsNearMeReducer };
