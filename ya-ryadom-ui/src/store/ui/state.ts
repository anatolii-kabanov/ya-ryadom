import { SpinnerState } from './spinner/state';
import { SettingsState } from './settings/state';
import { NotificationsState } from './notifications/state';
import { ScrollState } from './scroll/state';

export interface UiState {
	spinner: SpinnerState;
	settings: SettingsState;
    notifications: NotificationsState;
    scroll: ScrollState;
}
