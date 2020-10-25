import {
  all,
  fork,
  takeEvery,
  take,
  select,
  put,
  takeLatest,
} from 'redux-saga/effects';
import vkBridge from '@vkontakte/vk-bridge';
import { HistoryTypes } from './types';
import { getHistoryLength } from './reducer';
import {
  openUserProfile,
  goForward,
  openEventById,
  moveToPrevious,
} from './actions';
import { VkHistoryModel } from './models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';
import { setProfileVkId } from '../users/actions';
import {
  fetchEventByIdRequest,
  fetchEventByIdSuccess,
} from '../events/events-near-me/actions';
import { AuthenticationTypes } from '../authentication/types';
import { fetchUserInfoRequest } from '../authentication/actions';
import { Action } from 'redux';

function* handleGoForward(action: ReturnType<typeof goForward>) {
  try {
    const historyLength = yield select(getHistoryLength);
    window.history.pushState(action.payload, action.payload.view);
    if (historyLength === 1) yield vkBridge.send('VKWebAppEnableSwipeBack');
  } catch (error) {}
}

function* watchGoForwardRequest() {
  yield takeEvery(HistoryTypes.GO_FORWARD_VIEW_PANEL, handleGoForward);
}

function* handleGoBack() {
  try {
    const historyLength = yield select(getHistoryLength);
    if (historyLength === 1) {
      yield vkBridge.send('VKWebAppDisableSwipeBack');
      yield vkBridge.send('VKWebAppClose', { status: 'success' });
    }
    if (historyLength > 1) {
      yield put(moveToPrevious());
    }
  } catch (error) {}
}

function* watchGoBackRequest() {
  yield takeEvery(HistoryTypes.GO_BACK_VIEW_PANEL, handleGoBack);
}

function* handleOpenUserProfile(action: ReturnType<typeof openUserProfile>) {
  yield put(setProfileVkId(action.payload));
  yield put(
    goForward(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.PROFILE_PANEL))
  );
}

function* watchOpenUserProfile() {
  yield takeLatest(HistoryTypes.OPEN_USER_PROFILE, handleOpenUserProfile);
}

function* handleOpenEventById(action: ReturnType<typeof openEventById>) {
  yield take(AuthenticationTypes.FETCH_VK_USER_INFO_SUCCESS);
  yield put(fetchEventByIdRequest(action.payload));
  yield put(
    goForward(
      new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL)
    )
  );
}

function* watchOpenEventById() {
  yield takeLatest(HistoryTypes.OPEN_EVENT_BY_ID, handleOpenEventById);
}

function* historySagas() {
  yield all([
    fork(watchGoForwardRequest),
    fork(watchGoBackRequest),
    fork(watchOpenUserProfile),
    fork(watchOpenEventById),
  ]);
}

export default historySagas;
