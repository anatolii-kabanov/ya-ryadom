import { EventForm, MyEvent } from './models';

export interface MyEventsState {
	eventsList: MyEvent[];
	isLoading: boolean;
	eventForm: EventForm;
}
