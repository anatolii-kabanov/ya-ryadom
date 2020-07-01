import { all, call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ApplicationsTypes } from './types';
import { fetchEventApplicantsRequest, fetchEventApplicantsError, fetchEventApplicantsSuccess, applyToEventRequest, applyToEventError, applyToEventSuccess, confirmApplicantRequest, confirmApplicantError, confirmApplicantSuccess } from './actions'
import { callApi } from '../../utils/api';
import { Application } from './models';
import { getVkUserId } from '../authentication/reducer';

const API_ENDPOINT: any = `${process.env.REACT_APP_API_ENDPOINT}/applicatioins`;

function* handleFetchEventApplicantsRequest(action: ReturnType<typeof fetchEventApplicantsRequest>) {
    try {
        const result = yield call(callApi, 'get', API_ENDPOINT, `/${action.payload}`);

        if (result.errors) {
            yield put(fetchEventApplicantsError(result.errors));
        } else {
            yield put(fetchEventApplicantsSuccess(result));
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

function* handleApplyToEventRequest(action: ReturnType<typeof applyToEventRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const applyToEvent: Application = {
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
        if (error instanceof Error && error.stack) {
            yield put(applyToEventError(error.stack));
        } else {
            yield put(applyToEventError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchApplyToEventRequest() {
    yield takeLatest(ApplicationsTypes.APPLY_TO_EVENT, handleApplyToEventRequest)
}

function* handleConfirmApplicantRequest(action: ReturnType<typeof confirmApplicantRequest>) {
    try {
        const vkUserId = yield select(getVkUserId);

        const confirmApplicant: Application = {
            vkUserId: vkUserId,
            eventId: action.payload,
        };

        const result = yield call(callApi, 'post', API_ENDPOINT, '/confirm', confirmApplicant);

        if (result.errors) {
            yield put(confirmApplicantError(result.errors));
        } else {
            yield put(confirmApplicantSuccess(action.payload));
        }
    } catch (error) {
        if (error instanceof Error && error.stack) {
            yield put(confirmApplicantError(error.stack));
        } else {
            yield put(confirmApplicantError('An unknown error occured.'));
        }
    } finally {

    }
}

function* watchConfirmApplicantRequest() {
    yield takeLatest(ApplicationsTypes.CONFIRM_APPLICANT, handleConfirmApplicantRequest)
}

function* applicationsSagas() {
    yield all([
        fork(watchFetchEventApplicantsRequest),
        fork(watchApplyToEventRequest),
        fork(watchConfirmApplicantRequest)
    ])
}

export default applicationsSagas;
