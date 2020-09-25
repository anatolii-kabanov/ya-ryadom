import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { UsersTypes } from './types';
import {
    fetchUserInfoError,
    fetchUserInfoSuccess,
    fetchUserInfoRequest,
} from './actions'
import { callApi } from '../../utils/api';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';
import { addNotificaiton } from '../ui/notifications/actions';
import { SnackbarErrorNotification } from '../ui/notifications/models';
import { NOTIFICATION_MESSAGES } from '../../utils/constants/notification-messages.constants';
import { getSelectedProfileVkUserId } from './reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/users`;

function* handleFetchUserInfo(action: ReturnType<typeof fetchUserInfoRequest>) {
    try {
        yield put(showSpinner());
        
        const vkUserId = yield select(getSelectedProfileVkUserId);

        const result = yield call(callApi, 'get', API_ENDPOINT, `/info/${vkUserId}`);

        if (result?.errors) {
            yield put(fetchUserInfoError(result.errors));
        } else {
            yield put(fetchUserInfoSuccess(result));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(fetchUserInfoError(error.stack));
        } else {
            yield put(fetchUserInfoError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchFetchUserInfoRequest() {
    yield takeEvery(UsersTypes.FETCH_USER_INFO, handleFetchUserInfo)
}

function* usersSagas() {
    yield all([
        fork(watchFetchUserInfoRequest),
    ])
}

export default usersSagas;
