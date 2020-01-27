import { chartConstants } from '../constants';

export const chartsActions = {
    fireChartUpdated,
};
function fireChartUpdated(status) {
    return dispatch => {
        dispatch(success(status));
    };
    function success(status) { return { type: chartConstants.FIRE_CHART_UPDATED, status} }
}