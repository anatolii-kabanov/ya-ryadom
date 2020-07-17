import { Reducer } from 'redux';
import { MyEventsState } from './state';
import { MyEventsTypes } from './types';
import { EventApplicationUpdateStatus } from '../../applications/models';
import _ from 'lodash';

export const initialState: MyEventsState = {
    eventsList: [],
    isLoading: false,
}

const reducer: Reducer<MyEventsState> = (state = initialState, action) => {
    switch (action.type) {
        case MyEventsTypes.FETCH_LIST_SUCCESS: {
            return { ...state, eventsList: action.payload }
        }
        case MyEventsTypes.UPDATE_PARTICIPANT_STATUS: {
            const payload: EventApplicationUpdateStatus = action.payload;
            const newEventsList = _.cloneDeep(state.eventsList);
            const event = newEventsList.find((e) => e.id === payload.eventId);
            const participant = event?.participants.find((e) => e.applicationId === payload.applicationId);
            if (participant) {
                participant.applicationStatus = payload.status;
            }
            return { ...state, eventsList: newEventsList }
        }
        default: {
            return state
        }
    }
};

export { reducer as myEventsReducer };
