import { HistoryState } from "./history/state";
import { AuthenticationState } from "./authentication/state";
import {PeopleNearMeState} from "./people-near-me/state";

export interface AppState {
    authentication: AuthenticationState,
    history: HistoryState,
    peopleNearMe: PeopleNearMeState
}
