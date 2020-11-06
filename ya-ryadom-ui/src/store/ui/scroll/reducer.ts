import { Reducer } from 'redux';
import { ScrollActions } from './actions';
import { ScrollState } from './state';
import { ScrollTypes } from './types';
import _ from 'lodash';
import { AppState } from '../../app-state';

export const initialState: ScrollState = {
    scrollPositions: {},
};

const reducer: Reducer<ScrollState, ScrollActions> = (
    state = initialState,
    action: ScrollActions,
) => {
    switch (action.type) {
        case ScrollTypes.SET_SCROLL_POSITION: {
            const newState = _.cloneDeep(state);
            const { id, position } = action.payload;
            newState.scrollPositions[id] = position;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export { reducer as scrollReducer };

export const getScrollPositionById = (state: AppState, id: string) =>
    state.ui.scroll.scrollPositions[id] ?? 0;
