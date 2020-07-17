export interface ReviewsRequest {
    eventId: number;
    vkUserId: number;
}

export interface EventReviews {
    eventId: number;
    applications: Review[]
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
}

export interface ReviewModel {
    text: string;
    rating: number;
}

export interface SaveReviewRequest {
    vkOwnerUserId: number;
    text: string;
    rating: number;
    eventId: number;
    vkUserId: number;
}

export interface EventsReviews {
    [key: number]: Review[]
}