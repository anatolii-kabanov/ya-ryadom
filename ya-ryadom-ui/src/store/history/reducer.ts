import { Reducer } from 'redux';
import { HistoryState } from './state';
import { HistoryTypes } from './types';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../app-state';

export const initialState: HistoryState = {
    history: [{ view: VIEWS.INTRO_VIEW, panel: PANELS.HELLO_INTRO_PANEL }],
    currentViewPanel: { view: VIEWS.INTRO_VIEW, panel: PANELS.HELLO_INTRO_PANEL },
}

const reducer: Reducer<HistoryState> = (state = initialState, action) => {
    switch (action.type) {
        case HistoryTypes.GO_FORWARD_VIEW_PANEL: {
            return { ...state, history: [...state.history, action.payload], currentViewPanel: action.payload }
        }
        case HistoryTypes.GO_BACK_VIEW_PANEL: {
            const history = [...state.history];
            history.pop();
            const currentViewPanel = { ...history[history.length - 1] };
            return { ...state, history: history, currentViewPanel: currentViewPanel }
        }
        default: {
            return state
        }
    }
};

export { reducer as historyReducer };

export const getHistoryLength = (state: AppState) => state.history.history?.length;
