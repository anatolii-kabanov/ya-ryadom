import { ComplaintType } from '../../utils/enums/complaint-type.enum';

export interface ComplaintToEventRequest {
	eventId: number;
	vkUserId: number;
	complaintType: ComplaintType;
	text: string;
}

export interface ComplaintToUserRequest {
	toVkUserId: number;
	vkUserId: number;
}

export interface ComplaintForm {
	selectedComplaint: number;
	text: string;
}
