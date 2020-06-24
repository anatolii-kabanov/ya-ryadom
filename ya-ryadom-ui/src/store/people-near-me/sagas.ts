import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { PeopleNearMeTypes } from './types';
import {
    fetchListError,
    fetchListSuccess,
    fetchMyEventsListSuccess,
    fetchMyEventsListError,
    saveMyEventRequest,
    saveMyEventError,
    saveMyEventSuccess
} from './actions'
import { callApi } from '../../utils/api';
import { getVkUserId } from './reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/events-near-me`;

function* handleFetch(action) {
    try {
        const result = yield call(callApi, 'POST', API_ENDPOINT,  '', action.payload);

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
    yield takeEvery(PeopleNearMeTypes.FETCH_LIST, handleFetch)
}

function* handleMyEventsFetch() {
    try {
        const vkUserId = yield select(getVkUserId);
        console.log(vkUserId)
        const result = yield call(callApi, 'get', `${process.env.REACT_APP_API_ENDPOINT}/my-events`, `/${vkUserId}`);

        if (result.errors) {
            yield put(fetchMyEventsListError(result.errors));
        } else {
            yield put(fetchMyEventsListSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchMyEventsListError(error.stack));
        } else {
            yield put(fetchMyEventsListError('An unknown error occured.'));
        }
    }
}

function* watchMyEventsFetchRequest() {
    yield takeEvery(PeopleNearMeTypes.FETCH_MY_EVENTS_LIST, handleMyEventsFetch)
}

function* handleSaveEventRequest(action: ReturnType<typeof saveMyEventRequest>) {
    try {
        const result = yield call(callApi, 'post', `${process.env.REACT_APP_API_ENDPOINT}/my-events`, '/create', action.payload);

        if (result.errors) {
            yield put(saveMyEventError(result.errors));
        } else {
            yield put(saveMyEventSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveMyEventError(error.stack));
        } else {
            yield put(saveMyEventError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchSaveEventRequest() {
    yield takeLatest(PeopleNearMeTypes.SAVE_MY_EVENT, handleSaveEventRequest)
}


function* peopleNearMeSagas() {
    yield all([
        fork(watchFetchRequest),
        fork(watchMyEventsFetchRequest),
        fork(watchSaveEventRequest),
    ])
}

export default peopleNearMeSagas;
