export enum ReviewsTypes {
	FETCH_EVENT_REVIEWS = '[ReviewsTypes] (GET) Fetch event reviews',
	FETCH_EVENT_REVIEWS_SUCCESS = '[ReviewsTypes] Fetch event reviews success',
	FETCH_EVENT_REVIEWS_ERROR = '[ReviewsTypes] Fetch event reviews error',

	SET_USER_TO_REVIEW = '[ReviewsTypes] Set user to review',

	ADD_REVIEW = '[ReviewsTypes] (POST) Add review',
	ADD_REVIEW_SUCCESS = '[ReviewsTypes] Add review success',
	ADD_REVIEW_ERROR = '[ReviewsTypes] Add review error',

	FETCH_REVIEWS_ABOUT_USER = '[ReviewsTypes] (GET) Fetch reviews about user',
	FETCH_REVIEWS_ABOUT_USER_SUCCESS = '[ReviewsTypes] Fetch reviews about user success',
	FETCH_REVIEWS_ABOUT_USER_ERROR = '[ReviewsTypes] Fetch reviews about user error',
}
