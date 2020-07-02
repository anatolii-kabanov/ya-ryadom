import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ReviewsTypes } from './types';
import {
    fetchEventReviewsRequest,
    fetchEventReviewsError,
    fetchEventReviewsSuccess
} from './actions'
import { callApi } from '../../utils/api';
import { ReviewsRequest } from './models';
import { getVkUserId } from '../authentication/reducer';

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

function* reviewsSagas() {
    yield all([
        fork(watchFetchEventReviewsRequest),
    ])
}

export default reviewsSagas;
