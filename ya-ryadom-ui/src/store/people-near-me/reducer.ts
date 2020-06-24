import { Reducer } from 'redux';
import { PeopleNearMeState } from './state';
import { PeopleNearMeTypes } from './types';
import { AppState } from '../app-state';

export const initialState: PeopleNearMeState = {
    peopleList: [],
    isLoading: false,
    myEvents: [],
}

const reducer: Reducer<PeopleNearMeState> = (state = initialState, action) => {
    switch (action.type) {
        case PeopleNearMeTypes.FETCH_LIST_SUCCESS: {
            return { ...state, peopleList: action.payload.sort((a,b) => a.distance-b.distance) }
        }
        case PeopleNearMeTypes.SET_CURRENT_PERSON: {
            return { ...state, currentPerson: state.peopleList.filter(event => event.id === action.payload)[0] }
        }
        case PeopleNearMeTypes.FETCH_MY_EVENTS_LIST_SUCCESS: {
            return { ...state, myEvents: action.payload }
        }
        default: {
            return state
        }
    }
};

export { reducer as peopleNearMeReducer };

export const getVkUserId = (state: AppState) => state.authentication.vkUserInfo?.id;
