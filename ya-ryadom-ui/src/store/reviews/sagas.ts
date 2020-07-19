import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ReviewsTypes } from './types';
import {
    fetchEventReviewsRequest,
    fetchEventReviewsError,
    fetchEventReviewsSuccess,
    addReviewRequest,
    addReviewError,
    addReviewSuccess,
    setUserToReview
} from './actions'
import { callApi } from '../../utils/api';
import { SaveReviewRequest, SelectedUserToReview } from './models';
import { getVkUserId } from '../authentication/reducer';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';
import { setActiveModal } from '../history/actions';
import { getSelectedUserToReview } from './reducer';
import { removeApplication } from '../applications/actions';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/reviews`;

function* handleFetchEventReviewsRequest(action: ReturnType<typeof fetchEventReviewsRequest>) {
    try {
        const result = yield call(callApi, 'get', API_ENDPOINT, `/${action.payload}`);

        if (result.errors) {
            yield put(fetchEventReviewsError(result.errors));
        } else {
            yield put(fetchEventReviewsSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchEventReviewsError(error.stack));
        } else {
            yield put(fetchEventReviewsError('An unknown error occured.'));
        }
    }
}

function* watchFetchEventReviewsRequest() {
    yield takeEvery(ReviewsTypes.FETCH_EVENT_REVIEWS, handleFetchEventReviewsRequest)
}

function* handleAddReviewRequest(action: ReturnType<typeof addReviewRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const user: SelectedUserToReview = yield select(getSelectedUserToReview);
        const model: SaveReviewRequest = {
            rating: action.payload.rating,
            text: action.payload.text,
            vkOwnerUserId: vkUserId,
            vkUserId: user.vkUserId,
            eventId: user.eventId
        };
        const result = yield call(callApi, 'post', API_ENDPOINT, '/add', model);

        if (result.errors) {
            yield put(addReviewError(result.errors));
        } else {
            yield put(addReviewSuccess(result));
            yield put(removeApplication(user.applicationId));
            yield put(setActiveModal(null));
            yield put(setUserToReview(null));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(addReviewError(error.stack));
        } else {
            yield put(addReviewError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchAddReviewRequest() {
    yield takeLatest(ReviewsTypes.ADD_REVIEW, handleAddReviewRequest)
}

function* reviewsSagas() {
    yield all([
        fork(watchFetchEventReviewsRequest),
        fork(watchAddReviewRequest),
    ])
}

export default reviewsSagas;
