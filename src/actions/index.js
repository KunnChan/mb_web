import axios from "axios";
import qs from "qs";

import * as TYPES from "./types";

const urlEncodedHeader = {
	'Content-Type': 'application/json;charset=UTF-8'
  };

const getLoginHeader = () => {
	const clientId = "kcrock";
	const clientSecret = "securekc";
	let encryptKey = btoa(clientId + ':' + clientSecret);
	return { 
			headers: {
				"Authorization": `Basic ${encryptKey}`,
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "application/json"
			}
		};
}

const getAuthHeader = () => {
	const auth = localStorage.getItem(TYPES.AUTH_USER);
	if (!auth) {
		return false;
	}
	return { 
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + auth.access_token
			}
		};
}

const getAuthHeaderParam = token => {
	return { 
			headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Authorization': 'Bearer ' + token
			}
		};
}

const getAuthJSONHeader = () => {
	const token = localStorage.getItem(TYPES.keyToken);
	if (!token) {
		return false;
	}
	return { 
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
			}
		};
}


export const fetchUser = () => async dispatch => {
	try {
		let username = localStorage.getItem(TYPES.keyUserName);
		const res = await axios.get(TYPES.urlUserInfo + username, getAuthHeader());
		localStorage.setItem(TYPES.keyUser, JSON.stringify(res.data));

		dispatch({ type: TYPES.WAITER, payload: res.data });
	} catch (error) {
		console.error("fetchUser error ", error);
	}
};

export const signinUser = (username, password) => async dispatch => {
	
	const data = qs.stringify({
		username: username,
		password: password,
		grant_type: 'password'
	});

  const header = getLoginHeader();
  const res = await axios.post(TYPES.urlToken, data, header);
  localStorage.setItem(TYPES.keyUserName, username);
  dispatch({ type: TYPES.AUTH_USER, payload: res.data });
};

// export const refreshToken = refresh_token => async dispatch => {
	
// 	const data = qs.stringify({
// 		refresh_token,
// 		grant_type: 'refresh_token'
// 	});
//   const res = await axios.post(TYPES.urlLogin, data, urlEncodedHeader);
  
//   let str = JSON.stringify(res.data);
// 	dispatch({ type: TYPES.AUTH_USER, payload: str });
// 	localStorage.setItem(TYPES.keyToken, res.data.access_token);
// 	localStorage.setItem(TYPES.keyUserName, res.data.userName);
// 	localStorage.setItem(TYPES.keyUser, str);
	
// };

export const signout = history => async dispatch => {
	try {
		await axios.post(TYPES.urlLogout,null, getAuthHeader());
		dispatch({ type: TYPES.UNAUTH_USER, payload: false });
	} catch (error) {
		if (error.response) {
		const { status } = error.response;
			if(status === 401){
			let user = localStorage.getItem(TYPES.keyUser);
			if(user){
				let userData = JSON.parse(user);
				const data = qs.stringify({
					refresh_token: userData.refresh_token,
					grant_type: 'refresh_token'
				});
				//  const res = await axios.post(TYPES.urlLogin, data, urlEncodedHeader);
				//  const token = res.data.access_token;
				//  await axios.post(TYPES.urlLogout,null, getAuthHeaderParam(token));
				  dispatch({ type: TYPES.UNAUTH_USER, payload: false });
				}
			}
		}
	} finally {
		await localStorage.removeItem(TYPES.keyToken);
		await localStorage.removeItem(TYPES.keyUserName);
		await localStorage.removeItem(TYPES.keyWaiter);
		await localStorage.removeItem(TYPES.keyUser)
	}
};