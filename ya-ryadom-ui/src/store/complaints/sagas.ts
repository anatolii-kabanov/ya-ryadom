import { all, call, fork, put, takeEvery, takeLatest, select, take } from 'redux-saga/effects';
import { ComplaintsTypes } from './types';
import {
    sendComplaintToEventRequest,
    sendComplaintToEventSuccess,
    sendComplaintToEventError,
    sendComplaintToUserRequest,
    sendComplaintToUserError,
    sendComplaintToUserSuccess,
    openEventComplaintForm,
    setSelectedEventId
} from './actions'
import { callApi } from '../../utils/api';
import { ComplaintToEventRequest, ComplaintToUserRequest } from './models';
import { getVkUserId } from '../authentication/reducer';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';
import { setActiveModal } from '../history/actions';
import { MODALS } from '../../utils/constants/modal.constants';
import { getSelectedEventId } from './reducer';
import { addNotificaiton } from '../ui/notifications/actions';
import { SnackbarErrorNotification } from '../ui/notifications/models';
import { NOTIFICATION_MESSAGES } from '../../utils/constants/notification-messages.constants';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/complaints`;

function* handleSendComplaintToEventRequest(action: ReturnType<typeof sendComplaintToEventRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const eventId = yield select(getSelectedEventId);

        const complaintToEvent: ComplaintToEventRequest = {
            vkUserId: vkUserId,
            eventId: eventId,
            complaintType: action.payload.selectedComplaint,
            text: action.payload.text
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/to-event', complaintToEvent);

        if (result.errors) {
            yield put(sendComplaintToEventError(result.errors));
        } else {
            yield put(sendComplaintToEventSuccess());
            yield put(setActiveModal(null));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(sendComplaintToEventError(error.stack));
        } else {
            yield put(sendComplaintToEventError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchSendComplaintToEventRequest() {
    yield takeLatest(ComplaintsTypes.SEND_COMPLAINT_TO_EVENT, handleSendComplaintToEventRequest)
}

function* handleSendComplaintToUserRequest(action: ReturnType<typeof sendComplaintToUserRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);

        const applyToUser = action.payload;
        applyToUser.vkUserId = vkUserId;

        const result = yield call(callApi, 'post', API_ENDPOINT, '/to-user', applyToUser);

        if (result.errors) {
            yield put(sendComplaintToUserError(result.errors));
        } else {
            yield put(sendComplaintToUserSuccess());
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(sendComplaintToUserError(error.stack));
        } else {
            yield put(sendComplaintToUserError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchSendComplaintToUserRequest() {
    yield takeLatest(ComplaintsTypes.SEND_COMPLAINT_TO_USER, handleSendComplaintToUserRequest)
}

function* handleOpenEventComplaintForm(action: ReturnType<typeof openEventComplaintForm>) {
    yield put(setSelectedEventId(action.payload));
    yield put(setActiveModal(MODALS.COMPLAINT));
}

function* watchOpenEventComplaintForm() {
    yield takeLatest(ComplaintsTypes.OPEN_EVENT_COMPLAINT_FORM, handleOpenEventComplaintForm)
}

function* complaintsSagas() {
    yield all([
        fork(watchSendComplaintToEventRequest),
        fork(watchSendComplaintToUserRequest),
        fork(watchOpenEventComplaintForm)
    ])
}

export default complaintsSagas;
