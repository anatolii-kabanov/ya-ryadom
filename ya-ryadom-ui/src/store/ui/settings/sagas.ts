import { all, fork, put, call, take, takeEvery } from 'redux-saga/effects';
import vkBridge from '@vkontakte/vk-bridge';
import { requestIsWebViewSuccess, updateVkStyles } from './actions';
import { eventChannel } from 'redux-saga';
import { VkStyles } from './models';
import { SettingsTypes } from './types';

function* handleVkIsWebViewRequest() {
    try {
        const result: boolean = yield vkBridge.isWebView();
        yield put(requestIsWebViewSuccess(result));
    } catch (error) {
       
    }
}

function* watchVkIsWebViewRequest() {
    yield takeEvery(SettingsTypes.REQUEST_IS_WEBVIEW, handleVkIsWebViewRequest)
}


function initVkAppSettingsEvents() {
    return eventChannel(eventEmmiter => {
        const vkAppSettingsHandler = ({ detail: { type, data } }) => {            
            if (type === 'VKWebAppUpdateConfig') {
                const vkStyles: VkStyles = new VkStyles();
                let isLight = ['bright_light', 'client_light'].includes(data.scheme);
                vkStyles.schemeType = isLight ? 'bright_light' : 'space_gray';
                vkStyles.appearance = isLight ? 'light' : 'dark';
                eventEmmiter(vkStyles);
            }
        };;
        vkBridge.subscribe(vkAppSettingsHandler);
        return () => {
            vkBridge.unsubscribe(vkAppSettingsHandler);
        }
    }
    )
}

function* vkListener() {
    const chanel = yield call(initVkAppSettingsEvents);
    try {
        while (true) {
            const message = yield take(chanel);
            yield put(updateVkStyles(message));
        }
    } finally {

    }
}

function* settingsSagas() {
    yield all([
        fork(vkListener),
        fork(watchVkIsWebViewRequest)
    ])
}

export default settingsSagas;
