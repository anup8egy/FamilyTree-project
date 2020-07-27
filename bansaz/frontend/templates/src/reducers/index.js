import {combineReducers} from "redux"
import loggedReducer from "./isLogged"
const AllReducers=combineReducers({
    isLogged:loggedReducer
})
export default AllReducers
