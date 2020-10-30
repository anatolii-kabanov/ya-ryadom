import { Reducer } from 'redux';
import { ReviewsState } from './state';
import { ReviewsTypes } from './types';
import { AppState } from '../app-state';
import { ReviewsActions } from './actions';
import _ from 'lodash';

export const initialState: ReviewsState = {
	eventsReviews: {},
	selectedUserToReview: null,
	reviewsAboutUsers: {},
};

const reducer: Reducer<ReviewsState, ReviewsActions> = (
	state = initialState,
	action: ReviewsActions,
) => {
	switch (action.type) {
		case ReviewsTypes.FETCH_EVENT_REVIEWS_SUCCESS: {
			const newState = _.cloneDeep(state);
			newState.eventsReviews[action.payload.eventId] = action.payload.reviews;
			return newState;
		}
		case ReviewsTypes.FETCH_REVIEWS_ABOUT_USER_SUCCESS: {
			const newState = _.cloneDeep(state);
			newState.reviewsAboutUsers[action.payload.vkUserId] =
				action.payload.reviews;
			return newState;
		}
		case ReviewsTypes.SET_USER_TO_REVIEW: {
			const newState = _.cloneDeep(state);
			newState.selectedUserToReview = action.payload;
			return newState;
		}
		default: {
			return state;
		}
	}
};

export { reducer as reviewsReducer };

export const getSelectedUserToReview = (state: AppState) =>
	state.reviews.selectedUserToReview;
