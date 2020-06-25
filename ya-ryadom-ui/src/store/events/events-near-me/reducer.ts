import { Reducer } from 'redux';
import { EventsNearMeState } from './state';
import { EventsNearMeTypes } from './types';

export const initialState: EventsNearMeState = {
    eventsList: [],
    isLoading: false,
}

const reducer: Reducer<EventsNearMeState> = (state = initialState, action) => {
    switch (action.type) {
        case EventsNearMeTypes.FETCH_LIST_SUCCESS: {
            return { ...state, eventsList: action.payload.sort((a,b) => a.distance-b.distance) }
        }
        default: {
            return state
        }
    }
};

export { reducer as eventsNearMeReducer };
