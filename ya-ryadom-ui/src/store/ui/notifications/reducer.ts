import { Reducer } from 'redux';
import { NotificationsState } from './state';
import { NotificationsTypes } from './types';
import { NotificationsActions } from './actions';
import _ from 'lodash';

export const initialState: NotificationsState = {
	notificationsList: [],
};

const reducer: Reducer<NotificationsState, NotificationsActions> = (
	state = initialState,
	action: NotificationsActions,
) => {
	switch (action.type) {
		case NotificationsTypes.ADD_NOTIFICATION: {
			const newState = _.cloneDeep(state);
			newState.notificationsList.push(action.payload);
			return newState;
		}
		case NotificationsTypes.REMOVE_NOTIFICATION: {
			const newState = _.cloneDeep(state);
			const notification = newState.notificationsList.shift();
			return newState;
		}
		default: {
			return state;
		}
	}
};

export { reducer as notificationsReducer };
