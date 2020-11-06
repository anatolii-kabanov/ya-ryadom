import { all, fork, put, select, takeEvery } from 'redux-saga/effects';
import { scrollToIdPosition, scrollToPosition } from './actions';
import { getScrollPositionById } from './reducer';
import { ScrollTypes } from './types';

function* handleScrollToPosition(action: ReturnType<typeof scrollToPosition>) {
    try {
        window.scrollTo(0, action.payload);
    } catch (error) {}
}

function* watchScrollToPosition() {
    yield takeEvery(ScrollTypes.SCROLL_TO_POSITION, handleScrollToPosition);
}

function* handleScrollToIdPosition(
    action: ReturnType<typeof scrollToIdPosition>,
) {
    try {
        const scrollPosition: number = yield select(
            getScrollPositionById,
            action.payload,
        );
        yield put(scrollToPosition(scrollPosition));
    } catch (error) {}
}

function* watchScrollToIdPosition() {
    yield takeEvery(
        ScrollTypes.SCROLL_TO_ID_POSITION,
        handleScrollToIdPosition,
    );
}

function* scrollSagas() {
    yield all([fork(watchScrollToPosition), fork(watchScrollToIdPosition)]);
}

export default scrollSagas;
