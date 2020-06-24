import { PersonNearMe, MyEvent } from "./models";

export interface PeopleNearMeState {
    peopleList: PersonNearMe[];
    isLoading: boolean;
    myEvents: MyEvent[];
};
