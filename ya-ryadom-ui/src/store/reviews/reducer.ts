import { Reducer } from 'redux';
import { ReviewsState } from './state';
import { ReviewsTypes } from './types';
import { AppState } from '../app-state';

export const initialState: ReviewsState = {
    eventsReviews: {},
    selectedUserToReview: null
}

const reducer: Reducer<ReviewsState> = (state = initialState, action) => {
    switch (action.type) {
        case ReviewsTypes.FETCH_EVENT_REVIEWS_SUCCESS: {
            return {
                ...state, eventsReviews: {
                    ...state.eventsReviews,
                    [action.payload.eventId]: action.payload.reviews
                }
            }
        }
        case ReviewsTypes.SET_USER_TO_REVIEW: {
            return {
                ...state, selectedUserToReview: action.payload
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as reviewsReducer };

export const getSelectedUserToReview = (state: AppState) => state.reviews.selectedUserToReview;
