import { ThemeType } from '../../utils/enums/theme-type.enum';

export interface ReviewsRequest {
	eventId: number;
	vkUserId: number;
}

export interface EventReviews {
	eventId: number;
	applications: Review[];
}

export interface Review {
	vkUserId: number;
	userFullName: string;
	vkUserAvatarUrl: string;
	date: Date;
}

export interface SelectedUserToReview {
	eventId: number;
	vkUserId: number;
	applicationId: number;
}

export interface ReviewModel {
	text: string;
	rating: number;
}

export interface SaveReviewRequest {
	vkUserId: number;
	text: string;
	rating: number;
	eventId: number;
	vkUserToReviewId: number;
}

export interface EventsReviews {
	[key: number]: Review[];
}

export interface UserReview {
	id: number;
	text: string;
	rating: number;
	eventTitle: string;
	themeType: ThemeType;
	userFullName: string;
	eventId: number;
	vkUserAvatarUrl: string;
}
