import { EventNearMe } from "./models";

export interface EventsNearMeState {
    eventsList: EventNearMe[];
    sharedEvents: SharedEvents;
    isLoading: boolean;
};

export interface SharedEvents {
    [key: number]: EventNearMe;
};
