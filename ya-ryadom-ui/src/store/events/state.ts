import { EventsNearMeState } from "./events-near-me/state";
import { MyEventsState } from "./my-events/state";
import { UserEventsState } from "./user-events/state";

export interface EventsState {
    eventsNearMe: EventsNearMeState,
    myEvents: MyEventsState,
    userEvents: UserEventsState
};