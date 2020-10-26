import { Reducer } from 'redux';
import { HistoryState } from './state';
import { HistoryTypes } from './types';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../app-state';
import { HistoryActions } from './actions';
import _ from 'lodash';

export const initialState: HistoryState = {
    history: [{ view: VIEWS.INTRO_VIEW, panel: PANELS.HELLO_INTRO_PANEL }],
    currentViewPanel: { view: VIEWS.INTRO_VIEW, panel: PANELS.HELLO_INTRO_PANEL },
    currentModal: null,
}

const reducer: Reducer<HistoryState, HistoryActions> = (state = initialState, action: HistoryActions) => {
    switch (action.type) {
        case HistoryTypes.GO_FORWARD_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            newState.history.push(action.payload);
            newState.currentViewPanel = { ...action.payload };
            return newState;
        }
        case HistoryTypes.MOVE_TO_PREVIOUS_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            newState.history.pop();
            newState.currentViewPanel = { ...newState.history[newState.history.length - 1] };
            return newState;
        }
        case HistoryTypes.RESET_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            newState.history = [action.payload];
            newState.currentViewPanel = { ...action.payload };
            return newState;
        }
        case HistoryTypes.SET_ACTIVE_MODAL: {
            const newState = _.cloneDeep(state);
            newState.currentModal = action.payload;
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as historyReducer };

export const getHistoryLength = (state: AppState) => state.history.history?.length;
export const getCurrentModal = (state: AppState) => state.history.currentModal;
