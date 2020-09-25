import { EventsReviews, SelectedUserToReview, UserReview } from "./models";

export interface ReviewsState {
   eventsReviews: EventsReviews;
   selectedUserToReview: SelectedUserToReview | null;
   reviewsAboutUsers: ReviewsAboutUsers;
}

export interface ReviewsAboutUsers {
   [key: number]: UserReview[]
}
