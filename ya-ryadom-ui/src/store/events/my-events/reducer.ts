import { Reducer } from 'redux';
import { MyEventsState } from './state';
import { MyEventsTypes } from './types';
import _ from 'lodash';
import { MyEventsActions } from './actions';
import { EventForm } from './models';

export const initialState: MyEventsState = {
	eventsList: [],
	isLoading: false,
	eventForm: new EventForm(),
};

const reducer: Reducer<MyEventsState, MyEventsActions> = (
	state = initialState,
	action: MyEventsActions,
) => {
	switch (action.type) {
		case MyEventsTypes.FETCH_LIST_SUCCESS: {
			const newState = _.cloneDeep(state);
			newState.eventsList = action.payload;
			return newState;
		}
		case MyEventsTypes.UPDATE_PARTICIPANT_STATUS: {
			const payload = action.payload;
			const newEventsList = _.cloneDeep(state.eventsList);
			const event = newEventsList.find((e) => e.id === payload.eventId);
			const participant = event?.participants.find(
				(e) => e.applicationId === payload.applicationId,
			);
			if (participant) {
				participant.applicationStatus = payload.status;
			}
			return { ...state, eventsList: newEventsList };
		}
		case MyEventsTypes.REVOKE_MY_EVENT_SUCCESS: {
			const newState = _.cloneDeep(state);
			const event = newState.eventsList.find((e) => e.id === action.payload);
			if (event) {
				event.revoked = true;
				event.ended = true;
			}
			return newState;
		}
		case MyEventsTypes.UPDATE_EVENT_FORM: {
			const newState = _.cloneDeep(state);
			newState.eventForm[action.payload.name] = action.payload.value;
			return newState;
		}
		case MyEventsTypes.RESET_EVENT_FORM: {
			const newState = _.cloneDeep(state);
			newState.eventForm = new EventForm();
			return newState;
		}
		default: {
			return state;
		}
	}
};

export { reducer as myEventsReducer };
