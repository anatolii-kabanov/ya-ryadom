import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { EventsNearMeTypes } from './types';
import {
    fetchEventByIdError,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchListError,
    fetchListRequest,
    fetchListSuccess,
} from './actions'
import { callApi } from '../../../utils/api';
import { showSpinner, hideSpinner } from '../../ui/spinner/actions';
import { getVkUserId } from '../../authentication/reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/events-near-me`;

function* handleFetch(action: ReturnType<typeof fetchListRequest>) {
    try {
        yield put(showSpinner());
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
    } finally {
        yield put(hideSpinner());
    }
}

function* watchFetchRequest() {
    yield takeEvery(EventsNearMeTypes.FETCH_LIST, handleFetch)
}

function* handleFetchEventByIdRequest(action: ReturnType<typeof fetchEventByIdRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const model = {
            vkUserId,
            eventId: action.payload
        };
        const result = yield call(callApi, 'POST', API_ENDPOINT, '/event-by-id', model);

        if (result.errors) {
            yield put(fetchEventByIdError(result.errors));
        } else {
            yield put(fetchEventByIdSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchEventByIdError(error.stack));
        } else {
            yield put(fetchEventByIdError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchFetchEventByIdRequest() {
    yield takeEvery(EventsNearMeTypes.FETCH_EVENT_BY_ID, handleFetchEventByIdRequest)
}

function* eventsNearMeSagas() {
    yield all([
        fork(watchFetchRequest),
        fork(watchFetchEventByIdRequest)
    ])
}

export default eventsNearMeSagas;
