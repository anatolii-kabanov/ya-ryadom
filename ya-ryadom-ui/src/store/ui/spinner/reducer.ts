import { Reducer } from 'redux';
import { SpinnerState } from './state';
import { SpinnerTypes } from './types';

export const initialState: SpinnerState = {
	spinnerVisible: false,
};

const reducer: Reducer<SpinnerState> = (state = initialState, action) => {
	switch (action.type) {
		case SpinnerTypes.SHOW_SPINNER: {
			return {
				...state,
				spinnerVisible: true,
			};
		}
		case SpinnerTypes.HIDE_SPINNER: {
			return {
				...state,
				spinnerVisible: false,
			};
		}
		default: {
			return state;
		}
	}
};

export { reducer as spinnerReducer };
