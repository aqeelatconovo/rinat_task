import { chartConstants } from '../constants';

const initialState = false;

export function chartReducer(state = initialState, action) {
    switch (action.type) {
        case chartConstants.FIRE_CHART_UPDATED:
            return {
                chart_updated: action.status
            };

        default:
            return state
    }
}