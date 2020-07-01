import { HistoryState } from "./history/state";
import { AuthenticationState } from "./authentication/state";
import { EventsState } from "./events/state";
import { ApplicationsState } from "./applications/state";

export interface AppState {
    authentication: AuthenticationState,
    history: HistoryState,
    events: EventsState,
    applications: ApplicationsState
}
