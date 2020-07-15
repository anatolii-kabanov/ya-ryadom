import { EventNearMe } from "./models";

export interface EventsNearMeState {
    eventsList: EventNearMe[];
    isLoading: boolean;
    currentVkId: number;
};
