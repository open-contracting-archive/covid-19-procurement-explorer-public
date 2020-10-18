import { combineReducers } from "redux";
import { GeneralReducer } from "./general";

const appReducers = combineReducers({
	general: GeneralReducer,
});

export default appReducers;
