import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { UserEventsTypes } from './types';
import {
    fetchUserCreatedEventsListError,
    fetchUserCreatedEventsListRequest,
    fetchUserCreatedEventsListSuccess,
    fetchUserVisitedEventsListRequest,
    fetchUserVisitedEventsListError,
    fetchUserVisitedEventsListSuccess,
} from './actions'
import { callApi } from '../../../utils/api';
import { showSpinner, hideSpinner } from '../../ui/spinner/actions';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/user-events`;

function* handleUserCreatedEventsFetch(action: ReturnType<typeof fetchUserCreatedEventsListRequest>) {
    try {
        yield put(showSpinner());
        const result = yield call(callApi, 'get', API_ENDPOINT, `/created/${action.payload}`);

        if (result.errors) {
            yield put(fetchUserCreatedEventsListError(result.errors));
        } else {
            yield put(fetchUserCreatedEventsListSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchUserCreatedEventsListError(error.stack));
        } else {
            yield put(fetchUserCreatedEventsListError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchUserCreatedEventsFetchRequest() {
    yield takeEvery(UserEventsTypes.FETCH_CREATED_EVENTS, handleUserCreatedEventsFetch)
}

function* handleUserVisitedEventsFetch(action: ReturnType<typeof fetchUserVisitedEventsListRequest>) {
    try {
        yield put(showSpinner());
        const result = yield call(callApi, 'get', API_ENDPOINT, `/visited/${action.payload}`);

        if (result.errors) {
            yield put(fetchUserVisitedEventsListError(result.errors));
        } else {
            yield put(fetchUserVisitedEventsListSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchUserVisitedEventsListError(error.stack));
        } else {
            yield put(fetchUserVisitedEventsListError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchUserVisitedEventsFetchRequest() {
    yield takeEvery(UserEventsTypes.FETCH_VISITED_EVENTS, handleUserVisitedEventsFetch)
}

function* userEventsSagas() {
    yield all([
        fork(watchUserCreatedEventsFetchRequest),
        fork(watchUserVisitedEventsFetchRequest)
    ])
}

export default userEventsSagas;
