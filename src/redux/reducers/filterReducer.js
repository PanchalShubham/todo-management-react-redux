import * as FilterActions from '../constants/filterActions';
import * as Filters from '../constants/filters';

// initially we start with empty list of filteredTodos
const initialState = Filters.ACTIVE_TODOS;
const filterReducer = (state = initialState, action) => {    
    switch(action.type) {
        case FilterActions.SET_FILTER: 
            return action.filter;
        default: 
            return state;
    }
};
export default filterReducer;