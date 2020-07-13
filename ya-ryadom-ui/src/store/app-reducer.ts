import { combineReducers } from 'redux';
import { historyReducer } from './history/reducer';
import { authenticationReducer } from './authentication/reducer';
import { eventsNearMeReducer } from "./events/events-near-me/reducer";
import { myEventsReducer } from './events/my-events/reducer';
import { applicationsReducer } from './applications/reducer';
import { reviewsReducer } from './reviews/reducer';
import { spinnerReducer } from './ui/spinner/reducer';
import { settingsReducer } from './ui/settings/reducer';

export const createRootReducer = () =>
    combineReducers({
        authentication: authenticationReducer,
        history: historyReducer,
        events: combineReducers({
            eventsNearMe: eventsNearMeReducer,
            myEvents: myEventsReducer,
        }),
        applications: applicationsReducer,
        reviews: reviewsReducer,
        ui: combineReducers({
            spinner: spinnerReducer,
            settings: settingsReducer
        }),
    });
