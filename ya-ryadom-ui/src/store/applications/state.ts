import { EventsApplications, Application } from './models';

export interface ApplicationsState {
	eventsApplicants: EventsApplications;
	mineApplications: Application[];
	applicationsToMe: Application[];
}
