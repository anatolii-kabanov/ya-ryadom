import { Reducer } from 'redux';
import { MyEventsState } from './state';
import { MyEventsTypes } from './types';
import _ from 'lodash';
import { MyEventsActions } from './actions';

export const initialState: MyEventsState = {
    eventsList: [],
    isLoading: false,
}

const reducer: Reducer<MyEventsState, MyEventsActions> = (state = initialState, action: MyEventsActions) => {
    switch (action.type) {
        case MyEventsTypes.FETCH_LIST_SUCCESS: {
            return { ...state, eventsList: action.payload }
        }
        case MyEventsTypes.UPDATE_PARTICIPANT_STATUS: {
            const payload = action.payload;
            const newEventsList = _.cloneDeep(state.eventsList);
            const event = newEventsList.find((e) => e.id === payload.eventId);
            const participant = event?.participants.find((e) => e.applicationId === payload.applicationId);
            if (participant) {
                participant.applicationStatus = payload.status;
            }
            return { ...state, eventsList: newEventsList }
        }
        case MyEventsTypes.REVOKE_MY_EVENT_SUCCESS: {
            const newState = _.cloneDeep(state);
            newState.eventsList = newState.eventsList.filter((e) => e.id !== action.payload);
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as myEventsReducer };
