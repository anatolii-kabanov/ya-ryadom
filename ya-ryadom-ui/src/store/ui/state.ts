import { SpinnerState } from "./spinner/state";
import { SettingsState } from "./settings/state";
import { NotificationsState } from "./notifications/state";

export interface UiState {
    spinner: SpinnerState,
    settings: SettingsState,
    notifications: NotificationsState,
};