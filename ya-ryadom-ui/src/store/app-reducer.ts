import { combineReducers } from 'redux';
import { historyReducer } from './history/reducer';
import { authenticationReducer } from './authentication/reducer';
import { eventsNearMeReducer } from "./events/events-near-me/reducer";
import { myEventsReducer } from './events/my-events/reducer';
import { applicationsReducer } from './applications/reducer';

export const createRootReducer = () =>
    combineReducers({
        authentication: authenticationReducer,
        history: historyReducer,
        events: combineReducers({
            eventsNearMe: eventsNearMeReducer,
            myEvents: myEventsReducer,
        }),
        applications: applicationsReducer
    });
