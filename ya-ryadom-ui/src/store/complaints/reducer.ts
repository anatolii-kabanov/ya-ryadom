import { Reducer } from 'redux';
import { ComplaintsState } from './state';
import { ComplaintsTypes } from './types';
import { ComplaintsActions } from './actions';

export const initialState: ComplaintsState = {
}

const reducer: Reducer<ComplaintsState, ComplaintsActions> = (state = initialState, action: ComplaintsActions) => {
    switch (action.type) {

        default: {
            return state
        }
    }
};

export { reducer as complaintsReducer };
