import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { ThemeType } from '../../utils/enums/theme-type.enum';

export interface ApplicationRequest {
	eventId: number;
	vkUserId: number;
}

export interface EventApplications {
	eventId: number;
	applications: Application[];
}

export interface EventApplicationRequest {
	eventId: number;
	applicationId: number;
}

export interface EventApplicationUpdateStatus extends EventApplicationRequest {
	status: ApplicationStatus;
}

export interface Application {
	id: number;
	userId: number;
	vkUserId: number;
	userFullName: string;
	vkUserAvatarUrl: string;
	sentDate: Date;
	eventDate: Date;
	eventTime: string;
	text: string;
	status: ApplicationStatus;
	distance: number;
	eventId: number;
	themeType: ThemeType;
}

export interface EventsApplications {
	[key: number]: Application[];
}
