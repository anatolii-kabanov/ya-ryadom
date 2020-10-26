import { EventNearMe } from "./models";

export interface EventsNearMeState {
    eventsList: EventNearMe[];
    sharedEvents: SharedEvents;
    selectedEventId: number | null;
    isLoading: boolean;
};

export interface SharedEvents {
    [key: number]: EventNearMe;
};
