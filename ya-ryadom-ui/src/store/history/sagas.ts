import { all, fork, takeEvery, select } from 'redux-saga/effects';
import vkBridge from '@vkontakte/vk-bridge';
import { HistoryTypes } from './types';
import { getHistoryLength } from './reducer';

function* handleGoForward() {
    try {
        const historyLength = yield select(getHistoryLength);
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
        if (historyLength === 2)
            yield vkBridge.send('VKWebAppDisableSwipeBack');
    } catch (error) {

    }
}

function* watchGoBackRequest() {
    yield takeEvery(HistoryTypes.GO_BACK_VIEW_PANEL, handleGoBack)
}

function* historySagas() {
    yield all([fork(watchGoForwardRequest), fork(watchGoBackRequest)])
}

export default historySagas;
