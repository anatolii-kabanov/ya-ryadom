import { combineReducers } from 'redux';
import { historyReducer } from './history/reducer';
import { authenticationReducer } from './authentication/reducer';
import {peopleNearMeReducer} from "./people-near-me/reducer";

export const createRootReducer = () =>
    combineReducers({
        authentication: authenticationReducer,
        history: historyReducer,
        peopleNearMe: peopleNearMeReducer
    });
