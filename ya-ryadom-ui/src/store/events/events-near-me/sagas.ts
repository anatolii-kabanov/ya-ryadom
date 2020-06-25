import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { EventsNearMeTypes } from './types';
import {
    fetchListError,
    fetchListSuccess,
} from './actions'
import { callApi } from '../../../utils/api';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/events-near-me`;

function* handleFetch(action) {
    try {
        const result = yield call(callApi, 'POST', API_ENDPOINT, '', action.payload);

        if (result.errors) {
            yield put(fetchListError(result.errors));
        } else {
            yield put(fetchListSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchListError(error.stack));
        } else {
            yield put(fetchListError('An unknown error occured.'));
        }
    }
}

function* watchFetchRequest() {
    yield takeEvery(EventsNearMeTypes.FETCH_LIST, handleFetch)
}

function* eventsNearMeSagas() {
    yield all([
        fork(watchFetchRequest),
    ])
}

export default eventsNearMeSagas;
