// action-creaters for filtering-todos!
import * as FilterActions from '../constants/filterActions';

export const setFilter = (filter) => ({
    type: FilterActions.SET_FILTER,
    filter
});
