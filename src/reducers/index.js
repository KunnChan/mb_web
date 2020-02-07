import { combineReducers } from "redux";
import authReducer from "./authReducer";
import songReducer from "./songReducer";
import userReducer from "./userReducer";
import songsReducer from "./songsReducer";
import albumReducer from "./albumReducer";
import albumsReducer from "./albumsReducer";
import feedbackReducer from "./feedbackReducer";
import txnsReducer from "./txnsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
	auth: authReducer,
	song: songReducer,
	songs: songsReducer,
	album: albumReducer,
	albums: albumsReducer,
	user: userReducer,
	users: usersReducer,
	feedbacks: feedbackReducer,
	txns: txnsReducer
});
