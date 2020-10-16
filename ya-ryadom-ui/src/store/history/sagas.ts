import { all, fork, takeEvery, select, put, takeLatest } from 'redux-saga/effects';
import vkBridge from '@vkontakte/vk-bridge';
import { HistoryTypes } from './types';
import { getHistoryLength } from './reducer';
import { openUserProfile, goForward } from './actions';
import { VkHistoryModel } from './models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { setProfileVkId } from '../users/actions';

function* handleGoForward(action: ReturnType<typeof goForward>) {
    try {
        const historyLength = yield select(getHistoryLength);
        window.history.pushState(action.payload, action.payload.view);
        if (historyLength === 1)
            yield vkBridge.send('VKWebAppEnableSwipeBack');
    } catch (error) {

    }
}

function* watchGoForwardRequest() {
    yield takeEvery(HistoryTypes.GO_FORWARD_VIEW_PANEL, handleGoForward)
}

function* handleGoBack() {
    try {
        const historyLength = yield select(getHistoryLength);
        if (historyLength === 1)
            yield vkBridge.send('VKWebAppDisableSwipeBack');
        if (historyLength === 0) {
            yield vkBridge.send("VKWebAppClose", { "status": "success" });
        }
    } catch (error) {

    }
}

function* watchGoBackRequest() {
    yield takeEvery(HistoryTypes.GO_BACK_VIEW_PANEL, handleGoBack)
}

function* handleOpenUserProfile(action: ReturnType<typeof openUserProfile>) {
    yield put(setProfileVkId(action.payload));
    yield put(goForward(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.PROFILE_PANEL)));
}

function* watchOpenUserProfile() {
    yield takeLatest(HistoryTypes.OPEN_USER_PROFILE, handleOpenUserProfile)
}

function* historySagas() {
    yield all([
        fork(watchGoForwardRequest),
        fork(watchGoBackRequest),
        fork(watchOpenUserProfile)])
}

export default historySagas;
