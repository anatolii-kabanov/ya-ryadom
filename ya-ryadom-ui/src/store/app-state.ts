import { HistoryState } from "./history/state";
import { AuthenticationState } from "./authentication/state";
import { EventsState } from "./events/state";
import { ApplicationsState } from "./applications/state";
import { ReviewsState } from "./reviews/state";
import { UiState } from "./ui/state";
import { ComplaintsState } from "./complaints/state";
import { UsersState } from "./users/state";

export interface AppState {
    authentication: AuthenticationState,
    complaints: ComplaintsState,
    history: HistoryState,
    events: EventsState,
    applications: ApplicationsState,
    reviews: ReviewsState,
    ui: UiState,
    users: UsersState,
}
