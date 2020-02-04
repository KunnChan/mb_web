import "antd/dist/antd.css";
import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";
import { AUTH_USER, keyToken } from "./actions/types";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const data = localStorage.getItem(keyToken);
// If we have a token, consider the user to be signed in
if (data) {
	// we need to update application state
	store.dispatch({ type: AUTH_USER, payload: data });
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
