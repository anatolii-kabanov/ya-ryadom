import { all, fork } from "@redux-saga/core/effects";
import authenticationSagas from "./authentication/sagas";
import historySagas from "./history/sagas";
import eventsNearMeSagas from "./events/events-near-me/sagas";
import myEventsSagas from "./events/my-events/sagas";

export function* rootSaga() {
    yield all([
        fork(authenticationSagas),
        fork(historySagas),
        fork(eventsNearMeSagas),
        fork(myEventsSagas)
    ])
}
