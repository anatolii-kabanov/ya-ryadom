import { Reducer } from 'redux';
import { EventsNearMeState } from './state';
import { EventsNearMeTypes } from './types';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';

export const initialState: EventsNearMeState = {
    eventsList: [],
    isLoading: false,
    currentVkId: 0
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
                ...state, eventsList: [
                    ...state.eventsList.slice(0, index),
                    event,
                    ...state.eventsList.slice(index + 1),
                ]
            }
        }
        case EventsNearMeTypes.SET_CURRENT_VK_ID: {
            console.log('reducer')
            console.log(action.payload)
            return {
                ...state,
                currentVkId: action.payload
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as eventsNearMeReducer };
