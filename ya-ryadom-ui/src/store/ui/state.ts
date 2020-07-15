import { SpinnerState } from "./spinner/state";
import { SettingsState } from "./settings/state";

export interface UiState {
    spinner: SpinnerState,
    settings: SettingsState
};