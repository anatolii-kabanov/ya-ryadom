import { Reducer } from 'redux';
import { SettingsState } from './state';
import { SettingsTypes } from './types';
import { SettingsActions } from './actions';
import _ from 'lodash';
import { shallowEqual } from '../../../utils/helpers/shallow-compare.helper';

export const initialState: SettingsState = {
	eventsFilter: {
		radius: 10,
	},
	eventsFilterForm: {
		selectedTheme: '' as any,
		text: '',
		radius: 10,
	},
	isClearFilterEnabled: false,
	isOnline: true,
	isWebView: false,
	vkStyles: {
		schemeType: 'bright_light',
        appearance: 'light',
        viewportHeight: 0
	},
};

const reducer: Reducer<SettingsState, SettingsActions> = (
	state = initialState,
	action: SettingsActions,
) => {
	switch (action.type) {
		case SettingsTypes.CLEAR_EVENTS_FILTER: {
			const newState = _.cloneDeep(state);
			newState.isClearFilterEnabled = false;
			newState.eventsFilterForm = { ...initialState.eventsFilterForm };
			return newState;
		}
		case SettingsTypes.SET_EVENTS_FILTER: {
			const newState = _.cloneDeep(state);
			newState.eventsFilter = _.cloneDeep(newState.eventsFilterForm);
			return newState;
		}
		case SettingsTypes.UPDATE_EVENTS_RADIUS_FILTER: {
			const newState = _.cloneDeep(state);
			newState.eventsFilterForm.radius = action.payload;
			newState.isClearFilterEnabled = !shallowEqual(
				initialState.eventsFilterForm,
				newState.eventsFilterForm,
			);
			return newState;
		}
		case SettingsTypes.UPDATE_EVENTS_THEME_FILTER: {
			const newState = _.cloneDeep(state);
			newState.eventsFilterForm.selectedTheme = action.payload;
			newState.isClearFilterEnabled = !shallowEqual(
				initialState.eventsFilterForm,
				newState.eventsFilterForm,
			);
			return newState;
		}
		case SettingsTypes.UPDATE_EVENTS_TEXT_FILTER: {
			const newState = _.cloneDeep(state);
			newState.eventsFilterForm.text = action.payload;
			newState.isClearFilterEnabled = !shallowEqual(
				initialState.eventsFilterForm,
				newState.eventsFilterForm,
			);
			return newState;
		}
		case SettingsTypes.UPDATE_EVENTS_ADDRESS_FILTER: {
			const newState = _.cloneDeep(state);
			newState.eventsFilterForm.selectedPosition = action.payload.position;
			newState.eventsFilterForm.address = action.payload.address;
			newState.isClearFilterEnabled = !shallowEqual(
				initialState.eventsFilterForm,
				newState.eventsFilterForm,
			);
			return newState;
		}
		case SettingsTypes.SET_ONLINE_STATUS: {
			const newState = _.cloneDeep(state);
			newState.isOnline = action.payload;
			return newState;
		}
		case SettingsTypes.UPDATE_VK_STYLES: {
			const newState = _.cloneDeep(state);
			newState.vkStyles = action.payload;
			return newState;
		}
		case SettingsTypes.REQUEST_IS_WEBVIEW_SUCCESS: {
			const newState = _.cloneDeep(state);
			newState.isWebView = action.payload;
			return newState;
		}
		default: {
			return state;
		}
	}
};

export { reducer as settingsReducer };
