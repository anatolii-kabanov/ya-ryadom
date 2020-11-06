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
    viewsHistory: [VIEWS.INTRO_VIEW],
    viewPanelsHistory: {
        [VIEWS.INTRO_VIEW]: [{ panel: PANELS.HELLO_INTRO_PANEL }],
        [VIEWS.APPLICATIONS_VIEW]: [
            {
                panel: PANELS.APPLICATIONS_PANEL,
                tab: TABS.CREATED_APPLICATIONS,
            },
        ],
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
            const { view } = action.payload;
            if (newState.currentView !== view) {
                newState.viewsHistory.push(view);
            }
            newState.viewPanelsHistory[view].push(action.payload);
            newState.currentView = view;
            return newState;
        }
        case HistoryTypes.MOVE_TO_PREVIOUS_PANEL: {
            const newState = _.cloneDeep(state);

            if (
                newState.currentView &&
                newState.viewPanelsHistory[newState.currentView].length > 1
            ) {
                newState.viewPanelsHistory[newState.currentView].pop();
            } else {
                newState.viewsHistory.pop();
                const view =
                    newState.viewsHistory[newState.viewsHistory.length - 1];
                newState.currentView = view;
            }

            return newState;
        }
        case HistoryTypes.RESET_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            const { view } = action.payload;
            newState.viewsHistory = [view];
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
            newState.viewsHistory.push(action.payload);
            newState.currentView = action.payload;
            return newState;
        }
        case HistoryTypes.SET_TAB_FOR_CURRENT_VIEW_PANEL: {
            const newState = _.cloneDeep(state);
            newState.viewPanelsHistory[newState.currentView][
                newState.viewPanelsHistory[newState.currentView].length - 1
            ].tab = action.payload;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export { reducer as historyReducer };

export const getViewsHistoryLength = (state: AppState) =>
    state.history.viewsHistory?.length;
export const getIsFirstPanelForView = (state: AppState, view: VIEWS) =>
    state.history.viewPanelsHistory[view].length === 1;
export const getPanelsCountForCurrentView = (state: AppState) =>
    state.history.viewPanelsHistory[state.history.currentView].length;
export const getViewLastPanel = (state: AppState) =>
    state.history.viewPanelsHistory[state.history.currentView][
        state.history.viewPanelsHistory[state.history.currentView].length - 1
    ];
export const getCurrentModal = (state: AppState) => state.history.currentModal;
