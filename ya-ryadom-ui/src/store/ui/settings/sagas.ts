import { all, fork, put, call, take, takeEvery } from 'redux-saga/effects';
import vkBridge from '@vkontakte/vk-bridge';
import { requestIsWebViewSuccess, updateVkStyles } from './actions';
import { eventChannel } from 'redux-saga';
import { VkStyles } from './models';
import { SettingsTypes } from './types';
import { addNotificaiton } from '../notifications/actions';
import { Appearance, Scheme } from '@vkontakte/vkui';

function* handleVkIsWebViewRequest() {
	try {
		const result: boolean = yield vkBridge.isWebView();
		yield put(requestIsWebViewSuccess(result));
	} catch (error) {}
}

function* watchVkIsWebViewRequest() {
	yield takeEvery(SettingsTypes.REQUEST_IS_WEBVIEW, handleVkIsWebViewRequest);
}

function initVkAppSettingsEvents() {
	return eventChannel((eventEmmiter) => {
		const vkAppSettingsHandler = async ({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const vkStyles: VkStyles = new VkStyles();
				let isLight = [
					Scheme.BRIGHT_LIGHT,
					Scheme.DEPRECATED_CLIENT_LIGHT,
				].includes(data.scheme);
				vkStyles.schemeType = isLight ? Scheme.BRIGHT_LIGHT : Scheme.SPACE_GRAY;
                vkStyles.appearance = isLight ? Appearance.LIGHT : Appearance.DARK;
                vkStyles.viewportHeight = data.viewport_height;
                // Because bar style will be wrong in case of changing theme and restore app from cache
                await vkBridge.send('VKWebAppSetViewSettings', {
                    status_bar_style: isLight ? 'dark' : 'light',
                    action_bar_color: isLight ? '#000' : '#ffff',
                    navigation_bar_color: isLight ? '#000' : '#ffff',
               });
				eventEmmiter(vkStyles);
			}
		};
		vkBridge.subscribe(vkAppSettingsHandler);
		return () => {
			vkBridge.unsubscribe(vkAppSettingsHandler);
		};
	});
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
	yield all([fork(vkListener), fork(watchVkIsWebViewRequest)]);
}

export default settingsSagas;
