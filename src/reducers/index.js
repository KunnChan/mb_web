import { combineReducers } from "redux";
import authReducer from "./authReducer";
import songReducer from "./songReducer";
import userReducer from "./userReducer";

export default combineReducers({
	auth: authReducer,
	songs: songReducer,
	user: userReducer,
});
