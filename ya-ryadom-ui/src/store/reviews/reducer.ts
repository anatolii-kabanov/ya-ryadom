import { Reducer } from 'redux';
import { ReviewsState } from './state';
import { ReviewsTypes } from './types';

export const initialState: ReviewsState = {
    eventsReviews: {}
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
        default: {
            return state
        }
    }
};

export { reducer as reviewsReducer };
