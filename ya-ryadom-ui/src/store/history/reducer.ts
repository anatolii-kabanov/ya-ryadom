import { Reducer } from 'redux';
import { HistoryState } from './state';
import { HistoryTypes } from './types';
import { VIEWS } from '../../utils/enums/views.enum';
import { PANELS } from '../../utils/enums/panels.enum';
import { AppState } from '../app-state';
import { HistoryActions } from './actions';
import _ from 'lodash';
import { TABS } from '../../utils/enums/tabs.enum';

export const initialState: HistoryState = {
    history: [{ view: VIEWS.INTRO_VIEW, panel: PANELS.HELLO_INTRO_PANEL }],
    viewPanelsHistory: {
        [VIEWS.INTRO_VIEW]: [{ panel: PANELS.HELLO_INTRO_PANEL }],
        [VIEWS.APPLICATIONS_VIEW]: [{ panel: PANELS.APPLICATIONS_PANEL, tab: TABS.CREATED_APPLICATIONS }],
        [VIEWS.EVENTS_NEAR_ME_VIEW]: [
            { panel: PANELS.EVENTS_NEAR_ME_PANEL, tab: TABS.EVENTS_MAP },
        ],
        [VIEWS.GENERAL_VIEW]: [],
        [VIEWS.MY_EVENT_CREATE_VIEW]: [{ panel: PANELS.CREATE_EVENT_PANEL }],
        [VIEWS.MY_PROFILE_VIEW]: [{ panel: PANELS.MY_PROFILE_PANEL }],
        [VIEWS.REVIEWS_VIEW]: [{ panel: PANELS.REVIEWS_PANEL }],
    },
    currentModal: null,
    currentView: VIEWS.INTRO_VIEW,
};

const reducer: Reducer<HistoryState, HistoryActions> = (
    state = initialState,
    action: HistoryActions,
) => {
    switch (action.type) {
        case HistoryTypes.MOVE_TO_NEXT_PANEL: {
            const newState = _.cloneDeep(state);
            newState.history.push(action.payload);
            newState.viewPanelsHistory[action.payload.view].push(
                action.payload,
            );
            const { view } = action.payload;
            newState.currentView = view;
            return newState;
        }
        case HistoryTypes.MOVE_TO_PREVIOUS_PANEL: {
            const newState = _.cloneDeep(state);
            const model = newState.history.pop();
            if (model && newState.viewPanelsHistory[model.view].length > 1) {
                newState.viewPanelsHistory[model.view].pop();
            }
            const { view } = newState.history[newState.history.length - 1];
            newState.currentView = view;
            return newState;
        }
        case HistoryTypes.RESET_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            newState.history = [action.payload];
            const { view } = action.payload;
            newState.currentView = view;
            return newState;
        }
        case HistoryTypes.SET_ACTIVE_MODAL: {
            const newState = _.cloneDeep(state);
            newState.currentModal = action.payload;
            return newState;
        }
        case HistoryTypes.SET_CURRENT_VIEW: {
            const newState = _.cloneDeep(state);
            newState.currentView = action.payload;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export { reducer as historyReducer };

export const getHistoryLength = (state: AppState) =>
    state.history.history?.length;
export const getIsFirstPanelForView = (state: AppState, view: VIEWS) =>
    state.history.viewPanelsHistory[view].length === 1;
export const getPanelsCountForCurrentView = (state: AppState) =>
    state.history.viewPanelsHistory[state.history.currentView].length;
export const getCurrentModal = (state: AppState) => state.history.currentModal;
