import { Reducer } from 'redux';
import { ComplaintsState } from './state';
import { ComplaintsTypes } from './types';
import { ComplaintsActions } from './actions';
import _ from 'lodash';
import { AppState } from '../app-state';

export const initialState: ComplaintsState = {
	selectedEventId: null,
};

const reducer: Reducer<ComplaintsState, ComplaintsActions> = (
	state = initialState,
	action: ComplaintsActions,
) => {
	switch (action.type) {
		case ComplaintsTypes.SET_SELECTED_EVENT_ID: {
			const newState = _.cloneDeep(state);
			newState.selectedEventId = action.payload;
			return newState;
		}
		default: {
			return state;
		}
	}
};

export { reducer as complaintsReducer };

export const getSelectedEventId = (state: AppState) =>
	state.complaints.selectedEventId;
