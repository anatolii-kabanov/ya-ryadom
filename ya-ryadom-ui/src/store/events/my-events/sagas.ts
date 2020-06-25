import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { MyEventsTypes } from './types';
import {
    fetchMyEventsListError,
    fetchMyEventsListSuccess,
    saveMyEventRequest,
    saveMyEventError,
    saveMyEventSuccess,
} from './actions'
import { callApi } from '../../../utils/api';
import { getVkUserId } from '../../authentication/reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/my-events`;

function* handleMyEventsFetch() {
    try {
        const vkUserId = yield select(getVkUserId);
        const result = yield call(callApi, 'get', API_ENDPOINT, `/${vkUserId}`);

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
    yield takeEvery(MyEventsTypes.FETCH_LIST, handleMyEventsFetch)
}

function* handleSaveEventRequest(action: ReturnType<typeof saveMyEventRequest>) {
    try {
        const result = yield call(callApi, 'post', API_ENDPOINT, '/create', action.payload);

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
    yield takeLatest(MyEventsTypes.SAVE_MY_EVENT, handleSaveEventRequest)
}


function* myEventsSagas() {
    yield all([
        fork(watchMyEventsFetchRequest),
        fork(watchSaveEventRequest),
    ])
}

export default myEventsSagas;
