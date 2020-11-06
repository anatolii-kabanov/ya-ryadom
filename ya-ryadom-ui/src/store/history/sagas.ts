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
import {
    getCurrentModal,
    getViewsHistoryLength,
    getIsFirstPanelForView,
    getPanelsCountForCurrentView,
} from './reducer';
import {
    openUserProfile,
    goForward,
    openEventById,
    moveToPrevious,
    setActiveModal,
    moveToNext,
    setCurrentView,
} from './actions';
import { VkHistoryModel } from './models';
import { PANELS } from '../../utils/enums/panels.enum';
import { setProfileVkId } from '../users/actions';
import {
    fetchEventByIdRequest,
    setSelectedEvent,
} from '../events/events-near-me/actions';
import { AuthenticationTypes } from '../authentication/types';
import { TABS } from '../../utils/enums/tabs.enum';
import { getCurrentUser } from '../authentication/reducer';
import { CurrentUser } from '../authentication/models';
import { scrollToIdPosition } from '../ui/scroll/actions';
import { VIEWS } from '../../utils/enums/views.enum';

function* handleGoForward(action: ReturnType<typeof goForward>) {
    try {
        const historyModel = action.payload;
        const isFirstPanelForView = yield select(
            getIsFirstPanelForView,
            historyModel.view,
        );
        window.history.pushState(historyModel, historyModel.view);
        yield put(moveToNext(action.payload));
        if (isFirstPanelForView) {
            yield vkBridge.send('VKWebAppEnableSwipeBack');
        }
        yield put(
            scrollToIdPosition(
                historyModel.modal || historyModel.tab || historyModel.panel,
            ),
        );
    } catch (error) {}
}

function* watchGoForwardRequest() {
    yield takeEvery(HistoryTypes.GO_FORWARD_PANEL, handleGoForward);
}

function* handleGoBack() {
    try {
        const historyLength = yield select(getViewsHistoryLength);
        const currentModal = yield select(getCurrentModal);
        const panelsCountForCurrentView = yield select(
            getPanelsCountForCurrentView,
        );
        if (currentModal) {
            yield put(setActiveModal(null));
        } else {
            if (historyLength === 1 && panelsCountForCurrentView === 1) {
                yield vkBridge.send('VKWebAppDisableSwipeBack');
                yield vkBridge.send('VKWebAppClose', { status: 'success' });
            }
            if (historyLength > 1 || panelsCountForCurrentView > 1) {
                yield put(moveToPrevious());
            }
            if (panelsCountForCurrentView == 2) {
                yield vkBridge.send('VKWebAppDisableSwipeBack');
            }
        }
    } catch (error) {}
}

function* watchGoBackRequest() {
    yield takeEvery(HistoryTypes.GO_BACK_PANEL, handleGoBack);
}

function* handleOpenUserProfile(action: ReturnType<typeof openUserProfile>) {
    yield put(setProfileVkId(action.payload));
    yield put(setCurrentView(VIEWS.GENERAL_VIEW));
}

function* watchOpenUserProfile() {
    yield takeLatest(HistoryTypes.OPEN_USER_PROFILE, handleOpenUserProfile);
}

function* handleSetCurrentView(action: ReturnType<typeof setCurrentView>) {
    window.history.pushState(action.payload, action.payload);
}

function* watchSetCurrentView() {
    yield takeLatest(HistoryTypes.SET_CURRENT_VIEW, handleSetCurrentView);
}

function* handleOpenEventById(action: ReturnType<typeof openEventById>) {
    yield take(AuthenticationTypes.FETCH_USER_INFO_SUCCESS);
    const user: CurrentUser = yield select(getCurrentUser);
    if (user?.guideCompleted) {
        yield put(fetchEventByIdRequest(action.payload));
        yield put(setSelectedEvent(action.payload));
        yield put(setCurrentView(VIEWS.EVENTS_NEAR_ME_VIEW));
        yield put(
            goForward(
                new VkHistoryModel(
                    VIEWS.EVENTS_NEAR_ME_VIEW,
                    PANELS.SELECTED_EVENT_PANEL,
                ),
            ),
        );
    }
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
        fork(watchSetCurrentView),
    ]);
}

export default historySagas;
