import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ReviewsTypes } from './types';
import {
    fetchEventReviewsRequest,
    fetchEventReviewsError,
    fetchEventReviewsSuccess,
    addReviewRequest,
    addReviewError,
    addReviewSuccess
} from './actions'
import { callApi } from '../../utils/api';
import { ReviewsRequest, SaveReviewRequest } from './models';
import { getVkUserId } from '../authentication/reducer';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';

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
        const model: SaveReviewRequest = {} as any;
        const result = yield call(callApi, 'post', API_ENDPOINT, '/add', model);

        if (result.errors) {
            yield put(addReviewError(result.errors));
        } else {
            yield put(addReviewSuccess(result));
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
