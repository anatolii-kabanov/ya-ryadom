import { Reducer } from 'redux';
import { SettingsState } from './state';
import { SetingsTypes } from './types';

export const initialState: SettingsState = {
    eventsFilter: {
        radius: 10,
    },
    eventsFilterForm: {
        text: '',
        radius: 10,
    },
}

const reducer: Reducer<SettingsState> = (state = initialState, action) => {
    switch (action.type) {
        case SetingsTypes.CLEAR_EVENTS_FILTER: {
            return {
                ...state,
                eventsFilter: { ...initialState.eventsFilter },
                eventsFilterForm: { ...initialState.eventsFilterForm }
            };
        }
        case SetingsTypes.SET_EVENTS_FILTER: {
            return {
                ...state,
                eventsFilter: { ...state.eventsFilterForm }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_RADIUS_FILTER: {
            return {
                ...state,
                eventsFilterForm: { ...state.eventsFilterForm, radius: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_THEME_FILTER: {
            return {
                ...state,
                eventsFilterForm: { ...state.eventsFilterForm, selectedTheme: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_TEXT_FILTER: {
            return {
                ...state,
                eventsFilterForm: { ...state.eventsFilterForm, text: action.payload }
            };
        }
        case SetingsTypes.UPDATE_EVENTS_ADDRESS_FILTER: {
            return {
                ...state,
                eventsFilterForm: {
                    ...state.eventsFilterForm,
                    selectedPosition: action.payload.position,
                    address: action.payload.address
                }
            };
        }
        default: {
            return state
        }
    }
};

export { reducer as settingsReducer };