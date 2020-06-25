import { Reducer } from 'redux';
import { MyEventsState } from './state';
import { MyEventsTypes } from './types';

export const initialState: MyEventsState = {
    eventsList: [],
    isLoading: false,
}

const reducer: Reducer<MyEventsState> = (state = initialState, action) => {
    switch (action.type) {
        case MyEventsTypes.FETCH_LIST_SUCCESS: {
            return { ...state, eventsList: action.payload }
        }
        default: {
            return state
        }
    }
};

export { reducer as myEventsReducer };
