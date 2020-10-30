import './assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppState } from './store/app-state';
import configureStore from './store/configure-store';

// Init VK App
bridge.send('VKWebAppInit', {});

const initialState: AppState = window.INITIAL_REDUX_STATE;
const store = configureStore(initialState);

ReactDOM.render(
	<React.StrictMode>
		<App store={store} />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
