import { Reducer } from 'redux';
import { SettingsState } from './state';
import { SetingsTypes } from './types';
import { SettingsActions } from './actions';
import _ from 'lodash';

export const initialState: SettingsState = {
    eventsFilter: {
        radius: 10,
    },
    eventsFilterForm: {
        text: '',
        radius: 10,
    },
    isClearFilterEnabled: false,
    isOnline: true,
}

const reducer: Reducer<SettingsState, SettingsActions> = (state = initialState, action: SettingsActions) => {
    switch (action.type) {
        case SetingsTypes.CLEAR_EVENTS_FILTER: {
            const newState = _.cloneDeep(state);
            newState.isClearFilterEnabled = false;
            newState.eventsFilterForm = { ...initialState.eventsFilterForm };
            return newState;
        }
        case SetingsTypes.SET_EVENTS_FILTER: {
            const newState = _.cloneDeep(state);
            newState.eventsFilter = _.cloneDeep(newState.eventsFilterForm);
            return newState;
        }
        case SetingsTypes.UPDATE_EVENTS_RADIUS_FILTER: {
            return {
                ...state,
                isClearFilterEnabled: true,
                eventsFilterForm: { ...state.eventsFilterForm, radius: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_THEME_FILTER: {
            return {
                ...state,
                isClearFilterEnabled: true,
                eventsFilterForm: { ...state.eventsFilterForm, selectedTheme: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_TEXT_FILTER: {
            return {
                ...state,
                isClearFilterEnabled: true,
                eventsFilterForm: { ...state.eventsFilterForm, text: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_ADDRESS_FILTER: {
            return {
                ...state,
                isClearFilterEnabled: true,
                eventsFilterForm: {
                    ...state.eventsFilterForm,
                    selectedPosition: action.payload.position,
                    address: action.payload.address
                }
            };
        }
        case SetingsTypes.SET_ONLINE_STATUS: {
            const newState = _.cloneDeep(state);
            newState.isOnline = action.payload;
            return newState;
        }
        default: {
            return state
        }
    }
};

export { reducer as settingsReducer };