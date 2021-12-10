import { combineReducers } from "redux";
import user from './user_reducer';

const roootReducer = combineReducers({
    user
})

export default roootReducer;