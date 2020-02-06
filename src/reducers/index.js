import { combineReducers } from "redux";
import authReducer from "./authReducer";
import songReducer from "./songReducer";
import userReducer from "./userReducer";
import songsReducer from "./songsReducer";

export default combineReducers({
	auth: authReducer,
	song: songReducer,
	songs: songsReducer,
	user: userReducer,
});
