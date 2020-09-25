import { all, fork } from "@redux-saga/core/effects";
import authenticationSagas from "./authentication/sagas";
import historySagas from "./history/sagas";
import eventsNearMeSagas from "./events/events-near-me/sagas";
import myEventsSagas from "./events/my-events/sagas";
import applicationsSagas from "./applications/sagas";
import reviewsSagas from "./reviews/sagas";
import userEventsSagas from "./events/user-events/sagas";
import complaintsSagas from "./complaints/sagas";
import usersSagas from "./users/sagas";

export function* rootSaga() {
    yield all([
        fork(authenticationSagas),
        fork(complaintsSagas),
        fork(historySagas),
        fork(eventsNearMeSagas),
        fork(myEventsSagas),
        fork(applicationsSagas),
        fork(reviewsSagas),
        fork(userEventsSagas),
        fork(usersSagas),
    ])
}
