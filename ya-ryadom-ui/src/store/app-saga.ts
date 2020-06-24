import { all, fork } from "@redux-saga/core/effects";
import authenticationSagas from "./authentication/sagas";
import historySagas from "./history/sagas";
import peopleNearMeSagas from "./people-near-me/sagas";

export function* rootSaga() {
    yield all([
        fork(authenticationSagas),
        fork(historySagas),
        fork(peopleNearMeSagas)
    ])
}
