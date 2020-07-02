import { action } from 'typesafe-actions';
import { ReviewsTypes } from "./types";

export const fetchEventReviewsRequest = (payload: number) => action(ReviewsTypes.FETCH_EVENT_REVIEWS, payload);
export const fetchEventReviewsSuccess = (payload: any) => action(ReviewsTypes.FETCH_EVENT_REVIEWS_SUCCESS, payload);
export const fetchEventReviewsError = (payload: any) => action(ReviewsTypes.FETCH_EVENT_REVIEWS_ERROR, payload);
