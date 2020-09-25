import { action, ActionType } from 'typesafe-actions';
import { ReviewsTypes } from "./types";
import { SelectedUserToReview, ReviewModel, UserReview } from './models';

export const fetchEventReviewsRequest = (payload: number) => action(ReviewsTypes.FETCH_EVENT_REVIEWS, payload);
export const fetchEventReviewsSuccess = (payload: any) => action(ReviewsTypes.FETCH_EVENT_REVIEWS_SUCCESS, payload);
export const fetchEventReviewsError = (payload: any) => action(ReviewsTypes.FETCH_EVENT_REVIEWS_ERROR, payload);

export const setUserToReview = (payload: SelectedUserToReview | null) => action(ReviewsTypes.SET_USER_TO_REVIEW, payload);

export const addReviewRequest = (payload: ReviewModel) => action(ReviewsTypes.ADD_REVIEW, payload);
export const addReviewSuccess = (payload: any) => action(ReviewsTypes.ADD_REVIEW_SUCCESS, payload);
export const addReviewError = (payload: any) => action(ReviewsTypes.ADD_REVIEW_ERROR, payload);

export const fetchReviewsAboutUserRequest = () => action(ReviewsTypes.FETCH_REVIEWS_ABOUT_USER);
export const fetchReviewsAboutUserSuccess = (payload: { vkUserId: number, reviews: UserReview[] }) => action(ReviewsTypes.FETCH_REVIEWS_ABOUT_USER_SUCCESS, payload);
export const fetchReviewsAboutUserError = (payload: any) => action(ReviewsTypes.FETCH_REVIEWS_ABOUT_USER_ERROR, payload);

export type ReviewsActions = ActionType<
    typeof fetchEventReviewsSuccess |
    typeof setUserToReview |
    typeof addReviewSuccess |
    typeof fetchReviewsAboutUserSuccess
>;
