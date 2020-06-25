import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import vkBridge, { UserInfo } from '@vkontakte/vk-bridge';
import { AuthenticationTypes } from './types';
import {
    fetchUserInfoError,
    fetchUserInfoSuccess,
    fetchUserInfoRequest,
    saveUserInfoRequest,
    saveUserInfoSuccess,
    saveUserInfoError,
    fetchVkUserInfoRequest,
    fetchVkUserInfoError,
    fetchVkUserInfoSuccess,
    fetchUserGeoError,
    fetchUserGeoSuccess,
    saveUserIntroRequest,
    saveUserIntroError,
    saveUserIntroSuccess
} from './actions'
import { callApi } from '../../utils/api';
import { Geo } from './models';
import { goForward } from '../history/actions';
import { VkHistoryModel } from '../history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { getVkUserId } from './reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

function* handleFetchUserInfo(action: ReturnType<typeof fetchUserInfoRequest>) {
    try {
        const result = yield call(callApi, 'get', API_ENDPOINT, `/user-info/${action.payload}`);

        if (result.errors) {
            yield put(fetchUserInfoError(result.errors));
        } else {
            yield put(fetchUserInfoSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchUserInfoError(error.stack));
        } else {
            yield put(fetchUserInfoError('An unknown error occured.'));
        }
    }
}

function* watchFetchUserInfoRequest() {
    yield takeEvery(AuthenticationTypes.FETCH_USER_INFO, handleFetchUserInfo)
}

function* handleFetchVkUserInfo(action: ReturnType<typeof fetchVkUserInfoRequest>) {
    try {
        console.log(API_ENDPOINT);
        // Work only via vk tunnel
        const result = yield vkBridge.send('VKWebAppGetUserInfo', {});

        if (result.error_type) {
            yield put(fetchVkUserInfoError(result.errors));
        } else {
            const vkUserInfo = result as UserInfo;
            yield put(fetchVkUserInfoSuccess(vkUserInfo));
            yield put(saveUserInfoRequest({
                guideCompleted: true,
                vkUserId: vkUserInfo.id,
                firstName: vkUserInfo.first_name,
                lastName: vkUserInfo.last_name,
                vkUserAvatarUrl: vkUserInfo.photo_200,
                selectedThemes: []
            }))
            // Request our user info
            yield put(fetchUserInfoRequest(vkUserInfo.id));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchVkUserInfoError(error.stack));
        } else {
            yield put(fetchVkUserInfoError('An unknown error occured.'));
        }
    }
}

function* watchFetchVkUserInfoRequest() {
    yield takeEvery(AuthenticationTypes.FETCH_VK_USER_INFO, handleFetchVkUserInfo)
}

function* handleFetchUserGeo() {
    try {
        // Work only via vk tunnel
        const result = yield vkBridge.send("VKWebAppGetGeodata", {});

        if (result.error_type) {
            yield put(fetchUserGeoError(result.errors));
        } else {
            yield put(fetchUserGeoSuccess(result as Geo));
            yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.PROFILE_INTRO_PANEL)));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchVkUserInfoError(error.stack));
        } else {
            yield put(fetchVkUserInfoError('An unknown error occured.'));
        }
    }
}

function* watchFetchUserGeoRequest() {
    yield takeEvery(AuthenticationTypes.FETCH_USER_GEO, handleFetchUserGeo)
}

function* handleSaveUserInfoRequest(action: ReturnType<typeof saveUserInfoRequest>) {
    try {
        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/save', action.payload);

        if (result.errors) {
            yield put(saveUserInfoError(result.errors));
        } else {
            yield put(saveUserInfoSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserInfoError(error.stack));
        } else {
            yield put(saveUserInfoError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchSaveUserInfoRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_INFO, handleSaveUserInfoRequest)
}

function* handleSaveUserIntroRequest(action: ReturnType<typeof saveUserIntroRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const userIntro = {
            vkUserId:  vkUserId,
            selectedThemes: action.payload
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/intro/save', userIntro);

        if (result.errors) {
            yield put(saveUserIntroError(result.errors));
        } else {
            yield put(saveUserIntroSuccess(action.payload));
            yield put(goForward(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.CREATE_EVENT_PANEL)));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserIntroError(error.stack));
        } else {
            yield put(saveUserIntroError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchSaveUserIntroRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_INTRO, handleSaveUserIntroRequest)
}

function* authenticationSagas() {
    yield all([
        fork(watchFetchUserInfoRequest),
        fork(watchFetchVkUserInfoRequest),
        fork(watchSaveUserInfoRequest),
        fork(watchFetchUserGeoRequest),
        fork(watchSaveUserIntroRequest),
    ])
}

export default authenticationSagas;
