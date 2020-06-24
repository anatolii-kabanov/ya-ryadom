import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
    saveUserInfoGuideSuccess,
    saveUserInfoGuideError
} from './actions'
import { callApi } from '../../utils/api';
import { Geo } from './models';
import { goForward } from '../history/actions';
import { VkHistoryModel } from '../history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';

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
                vkUserAvatarUrl: vkUserInfo.photo_200
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

function* handleSaveUserInfoGuideRequest() {
    try {
        console.log('222')
        const vkUserInfo = yield vkBridge.send('VKWebAppGetUserInfo', {});
        console.log(vkUserInfo)
        if (vkUserInfo.errors) {
            yield put(saveUserInfoGuideError(vkUserInfo.errors));
        } else {
            yield put(saveUserInfoRequest({ 
                guideCompleted: true, 
                vkUserId: vkUserInfo.id, 
                firstName: vkUserInfo.first_name,
                lastName: vkUserInfo.last_name,
                vkUserAvatarUrl: vkUserInfo.photo_200
            }))
            yield put(goForward(new VkHistoryModel(VIEWS.PEOPLE_NEAR_ME_VIEW, PANELS.PEOPLE_NEAR_ME_PANEL)))
            yield put(saveUserInfoGuideSuccess(vkUserInfo));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserInfoGuideError(error.stack));
        } else {
            yield put(saveUserInfoGuideError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchSaveUserInfoGuideRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_INFO_GUIDE, handleSaveUserInfoGuideRequest)
}

function* authenticationSagas() {
    yield all([fork(watchSaveUserInfoGuideRequest), fork(watchFetchUserInfoRequest), fork(watchFetchVkUserInfoRequest), fork(watchSaveUserInfoRequest), fork(watchFetchUserGeoRequest)])
}

export default authenticationSagas;
