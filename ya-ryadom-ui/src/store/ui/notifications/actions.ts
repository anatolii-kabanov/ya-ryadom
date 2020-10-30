import { action, ActionType } from 'typesafe-actions';
import { NotificationsTypes } from './types';
import { SnackbarNotification } from './state';

export const addNotificaiton = (payload: SnackbarNotification) =>
	action(NotificationsTypes.ADD_NOTIFICATION, payload);
export const removeNotificaiton = () =>
	action(NotificationsTypes.REMOVE_NOTIFICATION);

export type NotificationsActions = ActionType<
	typeof addNotificaiton | typeof removeNotificaiton
>;
