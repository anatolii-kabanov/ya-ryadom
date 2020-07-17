import { EventsReviews, SelectedUserToReview } from "./models";

export interface ReviewsState {
   eventsReviews: EventsReviews,
   selectedUserToReview: SelectedUserToReview | null
}
