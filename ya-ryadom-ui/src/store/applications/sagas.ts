import { all, call, fork, put, takeEvery, takeLatest, select, take } from 'redux-saga/effects';
import { ApplicationsTypes } from './types';
import { 
    fetchEventApplicantsRequest, 
    fetchEventApplicantsError, 
    fetchEventApplicantsSuccess, 
    applyToEventRequest, 
    applyToEventError, 
    applyToEventSuccess, 
    confirmApplicantRequest, 
    confirmApplicantError, 
    confirmApplicantSuccess, 
    rejectApplicantRequest, 
    rejectApplicantError,
    rejectApplicantSuccess, 
    revokeApplicationRequest, 
    revokeApplicationError, 
    revokeApplicationSuccess, 
    fetchMineApplicationsRequest, 
    fetchMineApplicationsError, 
    fetchMineApplicationsSuccess, 
    fetchApplicationsToMeRequest, 
    fetchApplicationsToMeError, 
    fetchApplicationsToMeSuccess, 
    applyToEventFromUserEvents, 
    applyToEventFromEvents 
} from './actions'
import { callApi } from '../../utils/api';
import { ApplicationRequest } from './models';
import { getVkUserId } from '../authentication/reducer';
import { setSentStatus } from '../events/events-near-me/actions';
import { fetchUserCreatedEventsListRequest } from '../events/user-events/actions';
import { showSpinner, hideSpinner } from '../ui/spinner/actions';
import { updateParticipantStatus } from '../events/my-events/actions';
import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { addNotificaiton } from '../ui/notifications/actions';
import { NOTIFICATION_MESSAGES } from '../../utils/constants/notification-messages.constants';
import { SnackbarErrorNotification } from '../ui/notifications/models';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/applicatioins`;

function* handleFetchEventApplicantsRequest(action: ReturnType<typeof fetchEventApplicantsRequest>) {
    try {
        const result = yield call(callApi, 'get', API_ENDPOINT, `/${action.payload}`);

        if (result.errors) {
            yield put(fetchEventApplicantsError(result.errors));
        } else {
            yield put(fetchEventApplicantsSuccess({ eventId: action.payload, applications: result }));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchEventApplicantsError(error.stack));
        } else {
            yield put(fetchEventApplicantsError('An unknown error occured.'));
        }
    }
}

function* watchFetchEventApplicantsRequest() {
    yield takeEvery(ApplicationsTypes.FETCH_EVENT_APPLICANTS, handleFetchEventApplicantsRequest)
}

function* handleFetchMineApplicationsRequest(action: ReturnType<typeof fetchMineApplicationsRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const result = yield call(callApi, 'get', API_ENDPOINT, `/mine/${vkUserId}`);

        if (result.errors) {
            yield put(fetchMineApplicationsError(result.errors));
        } else {
            yield put(fetchMineApplicationsSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchMineApplicationsError(error.stack));
        } else {
            yield put(fetchMineApplicationsError('An unknown error occured.'));
        }
    }
}

function* watchFetchMineApplicationsRequest() {
    yield takeEvery(ApplicationsTypes.FETCH_MINE_APPLICATIONS, handleFetchMineApplicationsRequest)
}

function* handleFetchApplicationsToMeRequest(action: ReturnType<typeof fetchApplicationsToMeRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const result = yield call(callApi, 'get', API_ENDPOINT, `/to-me/${vkUserId}`);

        if (result.errors) {
            yield put(fetchApplicationsToMeError(result.errors));
        } else {
            yield put(fetchApplicationsToMeSuccess(result));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(fetchApplicationsToMeError(error.stack));
        } else {
            yield put(fetchApplicationsToMeError('An unknown error occured.'));
        }
    }
}

function* watchFetchApplicationsToMeRequest() {
    yield takeEvery(ApplicationsTypes.FETCH_APPLICATIONS_TO_ME, handleFetchApplicationsToMeRequest)
}

function* handleApplyToEventFromUserEvents(action: ReturnType<typeof applyToEventFromUserEvents>) {
    yield put(applyToEventRequest(action.payload));
    yield take(ApplicationsTypes.APPLY_TO_EVENT_SUCCESS);
    yield put(fetchUserCreatedEventsListRequest());
    // need to return application id from server
    // yield put(setSentStatusFromUserEvents(action.payload));
}

function* watchApplyToEventFromUserEvents() {
    yield takeLatest(ApplicationsTypes.APPLY_TO_EVENT_FROM_USERS_EVENTS, handleApplyToEventFromUserEvents)
}

function* handleApplyToEventFromEvents(action: ReturnType<typeof applyToEventFromEvents>) {
    yield put(applyToEventRequest(action.payload));
    yield take(ApplicationsTypes.APPLY_TO_EVENT_SUCCESS);
    yield put(setSentStatus(action.payload));
}

function* watchApplyToEventFromEvents() {
    yield takeLatest(ApplicationsTypes.APPLY_TO_EVENT_FROM_EVENTS, handleApplyToEventFromEvents)
}

function* handleApplyToEventRequest(action: ReturnType<typeof applyToEventRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);

        const applyToEvent: ApplicationRequest = {
            vkUserId: vkUserId,
            eventId: action.payload,
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/apply', applyToEvent);

        if (result.errors) {
            yield put(applyToEventError(result.errors));
        } else {
            yield put(applyToEventSuccess(action.payload));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(applyToEventError(error.stack));
        } else {
            yield put(applyToEventError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchApplyToEventRequest() {
    yield takeLatest(ApplicationsTypes.APPLY_TO_EVENT, handleApplyToEventRequest)
}

function* handleConfirmApplicantRequest(action: ReturnType<typeof confirmApplicantRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const model = {
            vkUserId,
            applicationId: action.payload.applicationId
        }
        const result = yield call(callApi, 'post', API_ENDPOINT, '/approve', model);

        if (result.errors) {
            yield put(confirmApplicantError(result.errors));
        } else {
            yield put(confirmApplicantSuccess(action.payload));
            yield put(updateParticipantStatus({ ...action.payload, status: ApplicationStatus.confirmed }));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(confirmApplicantError(error.stack));
        } else {
            yield put(confirmApplicantError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchConfirmApplicantRequest() {
    yield takeLatest(ApplicationsTypes.CONFIRM_APPLICANT, handleConfirmApplicantRequest)
}

function* handleRejectApplicantRequest(action: ReturnType<typeof rejectApplicantRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const model = {
            vkUserId,
            applicationId: action.payload.applicationId
        }
        const result = yield call(callApi, 'post', API_ENDPOINT, '/reject', model);

        if (result.errors) {
            yield put(rejectApplicantError(result.errors));
        } else {
            yield put(rejectApplicantSuccess(action.payload));
            yield put(updateParticipantStatus({ ...action.payload, status: ApplicationStatus.rejected }));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(rejectApplicantError(error.stack));
        } else {
            yield put(rejectApplicantError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchRejectApplicantRequest() {
    yield takeLatest(ApplicationsTypes.REJECT_APPLICANT, handleRejectApplicantRequest)
}

function* handleRevokeApplicationRequest(action: ReturnType<typeof revokeApplicationRequest>) {
    try {
        yield put(showSpinner());
        const vkUserId = yield select(getVkUserId);
        const model = {
            vkUserId,
            applicationId: action.payload
        }
        const result = yield call(callApi, 'post', API_ENDPOINT, '/revoke', model);

        if (result.errors) {
            yield put(revokeApplicationError(result.errors));
        } else {
            yield put(revokeApplicationSuccess(action.payload));
        }
    } catch (error) {
        yield put(addNotificaiton(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.REQUEST_ERROR)));
        if (error instanceof Error && error.stack) {
            yield put(revokeApplicationError(error.stack));
        } else {
            yield put(revokeApplicationError('An unknown error occured.'));
        }
    } finally {
        yield put(hideSpinner());
    }
}

function* watchRevokeApplicationRequest() {
    yield takeLatest(ApplicationsTypes.REVOKE_APPLICATION, handleRevokeApplicationRequest)
}

function* applicationsSagas() {
    yield all([
        fork(watchFetchEventApplicantsRequest),
        fork(watchApplyToEventRequest),
        fork(watchConfirmApplicantRequest),
        fork(watchRejectApplicantRequest),
        fork(watchRevokeApplicationRequest),
        fork(watchFetchMineApplicationsRequest),
        fork(watchFetchApplicationsToMeRequest),
        fork(watchApplyToEventFromUserEvents),
        fork(watchApplyToEventFromEvents),
    ])
}

export default applicationsSagas;
