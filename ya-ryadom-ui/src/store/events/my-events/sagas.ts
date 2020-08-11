import { all, call, fork, put, takeEvery, takeLatest, select, take } from 'redux-saga/effects';
import { MyEventsTypes } from './types';
import {
    fetchMyEventsListError,
    fetchMyEventsListSuccess,
    saveMyEventRequest,
    saveMyEventError,
    saveMyEventSuccess,
    saveMyEventIntroRequest,
    saveMyEventGeneralRequest,
    revokeEventRequest,
    revokeEventError,
    revokeEventSuccess,
} from './actions'
import { callApi } from '../../../utils/api';
import { getVkUserId } from '../../authentication/reducer';
import { goForward, goBack } from '../../history/actions';
import { VkHistoryModel } from '../../history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';
import { showSpinner, hideSpinner } from '../../ui/spinner/actions';
import { saveUserGuideCompletedRequest } from '../../authentication/actions';
import { AuthenticationTypes } from '../../authentication/types';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/my-events`;

function* handleMyEventsFetch() {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const result = yield call(callApi, 'get', API_ENDPOINT, `/with-applications/${vkUserId}`);

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
    } finally {
        yield put(hideSpinner());
    }
}

function* watchMyEventsFetchRequest() {
    yield takeEvery(MyEventsTypes.FETCH_LIST, handleMyEventsFetch)
}

function* handleSaveEventRequest(action: ReturnType<typeof saveMyEventRequest>) {
    try {
        yield put(showSpinner());
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
        yield put(hideSpinner());
    }
}

function* watchSaveEventRequest() {
    yield takeLatest(MyEventsTypes.SAVE_MY_EVENT, handleSaveEventRequest)
}

function* handleSaveEventIntroRequest(action: ReturnType<typeof saveMyEventIntroRequest>) {
    // yield put(saveMyEventRequest(action.payload));
    // yield take(MyEventsTypes.SAVE_MY_EVENT_SUCCESS);
    // yield put(saveUserGuideCompletedRequest());
    // yield take(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED_SUCCESS);
    // yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.COMPLETED_INTRO_PANEL)));
}

function* watchSaveEventIntroRequest() {
    yield takeLatest(MyEventsTypes.SAVE_MY_EVENT_INTRO, handleSaveEventIntroRequest)
}

function* handleSaveEventGeneralRequest(action: ReturnType<typeof saveMyEventGeneralRequest>) {
    yield put(saveMyEventRequest(action.payload));
    yield take(MyEventsTypes.SAVE_MY_EVENT_SUCCESS);
    yield put(goBack());
}

function* watchSaveEventGeneralRequest() {
    yield takeLatest(MyEventsTypes.SAVE_MY_EVENT_GENERAL, handleSaveEventGeneralRequest)
}

function* handleRevokeEventRequest(action: ReturnType<typeof revokeEventRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const model = {
            vkUserId,
            eventId: action.payload
        }
        const result = yield call(callApi, 'post', API_ENDPOINT, '/revoke', model);

        if (result.errors) {
            yield put(revokeEventError(result.errors));
        } else {
            yield put(revokeEventSuccess(action.payload));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(revokeEventError(error.stack));
        } else {
            yield put(revokeEventError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchRevokeEventRequest() {
    yield takeLatest(MyEventsTypes.REVOKE_MY_EVENT, handleRevokeEventRequest)
}

function* myEventsSagas() {
    yield all([
        fork(watchMyEventsFetchRequest),
        fork(watchSaveEventRequest),
        fork(watchSaveEventIntroRequest),
        fork(watchSaveEventGeneralRequest),
        fork(watchRevokeEventRequest)
    ])
}

export default myEventsSagas;
