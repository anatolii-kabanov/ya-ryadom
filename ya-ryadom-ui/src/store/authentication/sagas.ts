import { all, call, fork, put, takeEvery, takeLatest, select, take } from 'redux-saga/effects';
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
    saveUserThemesRequest,
    saveUserThemesError,
    saveUserThemesSuccess,
    saveUserLocationRequest,
    saveUserLocationError,
    saveUserLocationSuccess,
    saveUserAboutMyselfRequest,
    saveUserAboutMyselfError,
    saveUserAboutMyselfSuccess,
    saveUserGuideCompletedRequest,
    saveUserGuideCompletedSuccess,
    saveUserGuideCompletedError,
    allowNotificationsRequest,
    allowNotificationsError,
    allowNotificationsSuccess,
    disableNotificationsRequest,
    disableNotificationsError,
    disableNotificationsSuccess,
    saveUserIntroThemes,
    saveUserProfileThemes
} from './actions'
import { callApi } from '../../utils/api';
import { Geo, User } from './models';
import { goForward, reset, goBack } from '../history/actions';
import { VkHistoryModel } from '../history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { getVkUserId, getGeoData } from './reducer';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';
import { TABS } from '../../utils/constants/tab.constants';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

function* handleFetchUserInfo(action: ReturnType<typeof fetchUserInfoRequest>) {
    try {
        yield put(showSpinner());
        const result = yield call(callApi, 'get', API_ENDPOINT, `/user-info/${action.payload}`);

        if (result.errors) {
            yield put(fetchUserInfoError(result.errors));
        } else {
            var user: User = result;
            yield put(fetchUserInfoSuccess(user));
            if (user.guideCompleted) {
                yield put(reset(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP)));
            }
        }
    } catch (error) {
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
    yield takeEvery(AuthenticationTypes.FETCH_USER_INFO, handleFetchUserInfo)
}

function* handleFetchVkUserInfo(action: ReturnType<typeof fetchVkUserInfoRequest>) {
    try {
        // Work only via vk tunnel
        const result = yield vkBridge.send('VKWebAppGetUserInfo', {});

        if (result.error_type) {
            yield put(fetchVkUserInfoError(result.errors));
        } else {
            const vkUserInfo = result as UserInfo;
            yield put(fetchVkUserInfoSuccess(vkUserInfo));
            yield put(saveUserInfoRequest({
                vkUserId: vkUserInfo.id,
                firstName: vkUserInfo.first_name,
                lastName: vkUserInfo.last_name,
                vkUserAvatarUrl: vkUserInfo.photo_200,
            }));
            yield take(saveUserInfoRequest);
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
            const geoData = result as Geo;
            yield put(fetchUserGeoSuccess(geoData));
            if (geoData?.available) {
                yield put(saveUserLocationRequest({ latitude: geoData?.lat, longitude: geoData?.long }));
            } else {
                yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.SELECT_CITY_INTRO_PANEL)));
            }
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

function* handleSaveUserIntroThemes(action: ReturnType<typeof saveUserIntroThemes>) {    
    yield put(saveUserThemesRequest(action.payload));
    yield take(AuthenticationTypes.SAVE_USER_THEMES_SUCCESS);
    yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.ABOUT_MYSELF_INTRO_PANEL)));
}

function* watchSaveUserIntroThemes() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_INTRO_THEMES, handleSaveUserIntroThemes)
}

function* handleSaveUserProfileThemes(action: ReturnType<typeof saveUserProfileThemes>) {    
    yield put(saveUserThemesRequest(action.payload));
    yield take(AuthenticationTypes.SAVE_USER_THEMES_SUCCESS);
    yield put(goBack());
}

function* watchSaveUserProfileThemes() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_PROFILE_THEMES, handleSaveUserProfileThemes)
}

function* handleSaveUserThemesRequest(action: ReturnType<typeof saveUserThemesRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);

        const userIntro = {
            vkUserId: vkUserId,
            selectedThemes: action.payload
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/themes/save', userIntro);

        if (result.errors) {
            yield put(saveUserThemesError(result.errors));
        } else {
            yield put(saveUserThemesSuccess(action.payload));            
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserThemesError(error.stack));
        } else {
            yield put(saveUserThemesError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchSaveUserThemesRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_THEMES, handleSaveUserThemesRequest)
}

function* handleSaveUserLocationRequest(action: ReturnType<typeof saveUserLocationRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const userLocation = {
            vkUserId: vkUserId,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/location/save', userLocation);

        if (result.errors) {
            yield put(saveUserLocationError(result.errors));
        } else {
            yield put(saveUserLocationSuccess(action.payload));
            yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.THEMES_INTRO_PANEL)));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserLocationError(error.stack));
        } else {
            yield put(saveUserLocationError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchSaveUserLocationRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_LOCATION, handleSaveUserLocationRequest)
}

function* handleSaveUserAboutMyselfRequest(action: ReturnType<typeof saveUserAboutMyselfRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);

        const userAboutMySelf = {
            vkUserId: vkUserId,
            aboutMyself: action.payload,
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/about-myself/save', userAboutMySelf);

        if (result.errors) {
            yield put(saveUserAboutMyselfError(result.errors));
        } else {
            yield put(saveUserAboutMyselfSuccess(action.payload));
            yield put(goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.CREATE_EVENT_PANEL)));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserAboutMyselfError(error.stack));
        } else {
            yield put(saveUserAboutMyselfError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchSaveUserAboutMyselfRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_ABOUT_MYSELF, handleSaveUserAboutMyselfRequest)
}

function* handleSaveUserGuideCompletedRequest(action: ReturnType<typeof saveUserGuideCompletedRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);

        const user = {
            vkUserId: vkUserId,
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/user-info/guide/save', user);

        if (result.errors) {
            yield put(saveUserGuideCompletedError(result.errors));
        } else {
            yield put(saveUserGuideCompletedSuccess());
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(saveUserGuideCompletedError(error.stack));
        } else {
            yield put(saveUserGuideCompletedError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchSaveUserGuideCompletedRequest() {
    yield takeLatest(AuthenticationTypes.SAVE_USER_GUIDE_COMPLETED, handleSaveUserGuideCompletedRequest)
}

function* handleAllowNotificationsRequest(action: ReturnType<typeof allowNotificationsRequest>) {
    try {
        yield put(showSpinner());

        const result = yield vkBridge.send("VKWebAppAllowNotifications", {});

        if (result.error_type) {
            yield put(allowNotificationsError(result.errors));
        } else {
            yield put(allowNotificationsSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(allowNotificationsError(error.stack));
        } else {
            yield put(allowNotificationsError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchAllowNotificationsRequest() {
    yield takeLatest(AuthenticationTypes.ALLOW_NOTIFICATIONS, handleAllowNotificationsRequest)
}

function* handleDisableNotificationsRequest(action: ReturnType<typeof disableNotificationsRequest>) {
    try {
        yield put(showSpinner());

        const result = yield vkBridge.send("VKWebAppDenyNotifications", {});

        if (result.error_type) {
            yield put(disableNotificationsError(result.errors));
        } else {
            yield put(disableNotificationsSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(disableNotificationsError(error.stack));
        } else {
            yield put(disableNotificationsError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchDisableNotificationsRequest() {
    yield takeLatest(AuthenticationTypes.DISABLE_NOTIFICATIONS, handleDisableNotificationsRequest)
}

function* authenticationSagas() {
    yield all([
        fork(watchFetchUserInfoRequest),
        fork(watchFetchVkUserInfoRequest),
        fork(watchSaveUserInfoRequest),
        fork(watchFetchUserGeoRequest),
        fork(watchSaveUserThemesRequest),
        fork(watchSaveUserLocationRequest),
        fork(watchSaveUserAboutMyselfRequest),
        fork(watchSaveUserGuideCompletedRequest),
        fork(watchAllowNotificationsRequest),
        fork(watchDisableNotificationsRequest),
        fork(watchSaveUserIntroThemes),
        fork(watchSaveUserProfileThemes)
    ])
}

export default authenticationSagas;
