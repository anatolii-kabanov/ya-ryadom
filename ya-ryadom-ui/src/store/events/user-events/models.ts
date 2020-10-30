import { ThemeType } from '../../../utils/enums/theme-type.enum';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';

export interface UserEvents {
	[key: number]: UserEvent[];
}

export interface UserEventsResponse {
	vkUserId: number;
	events: UserEvent[];
}

export interface ApplyToEvent {
	vkUserId: number;
	eventId: number;
}

export interface UserEvent {
	distance: number;
	longitude: number;
	latitude: number;
	createdDate: Date;
	date: Date;
	time: string;
	title: string;
	description: string;
	maxQuantity: number;
	revoked: boolean;
	id: number;
	themeType: ThemeType;
	ended: boolean;
	participants: Applicant[];
}

export interface Applicant {
	applicationId: number;
	vkUserId: number;
	vkUserAvatarUrl: string;
	applicationStatus: ApplicationStatus;
}
