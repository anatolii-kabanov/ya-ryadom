import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { AppState } from './app-state';
import { createRootReducer } from './app-reducer';
import { rootSaga } from './app-saga';

export default function configureStore(initialState: AppState) {
	const composeEnhancers = composeWithDevTools({});

	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		createRootReducer(),
		initialState,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
