import axios from "axios";
import qs from "qs";

import * as TYPES from "./types";

const axiosInstance = axios.create({
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		}
  });

axiosInstance.interceptors.request.use(
	request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
	response => successHandler(response),
	error => errorHandler(error)
)

const requestHandler = (request) => {
	const auth = JSON.parse(localStorage.getItem(TYPES.keyToken));
	if (!auth) {
		return request;
	}else{
		request.headers['Authorization'] = 'Bearer ' + auth.access_token
	}
	return request
  }
 
const errorHandler = (err) => {
	return new Promise((resolve, reject) => {
		const originalReq = err.config;
		if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest ){
			originalReq._retry = true;

			const auth = localStorage.getItem(TYPES.keyToken);
				if(!auth){
					return;
				}
				const data = qs.stringify({
					refresh_token: auth.refresh_token,
					grant_type: 'refresh_token'
				});

			const header = getLoginHeader();
			axios.post(TYPES.urlToken, data, header)
			.then(res => res.json()).then(res => {
				console.log(res);
				this.setSession({token: res.token, refresh_token: res.refresh});
				originalReq.headers['Token'] = res.token;
				originalReq.headers['Device'] = "device";


				return axios(originalReq);
			});
			resolve(resolve);
		}
		return Promise.reject(err);
	});
}
  
const successHandler = (response) => {

//console.log("successHandler ", response);
 return response
}

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

export const fetchUser = () => async dispatch => {
	try {
		let username = localStorage.getItem(TYPES.keyUserName);
		const res = await axiosInstance.get(TYPES.urlUserInfo + username);
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
  localStorage.setItem(TYPES.keyToken, JSON.stringify(res.data));
  dispatch({ type: TYPES.AUTH_USER, payload: res.data });
};

// export const refreshToken = () => {
	
// 	const auth = localStorage.getItem(TYPES.keyToken);
// 	if(!auth){
// 		return;
// 	}
// 	const data = qs.stringify({
// 		refresh_token: auth.refresh_token,
// 		grant_type: 'refresh_token'
// 	});

//   const header = getLoginHeader();
//   const res = await axios.post(TYPES.urlToken, data, header);
//   return res;
//  // localStorage.setItem(TYPES.keyToken, JSON.stringify(res.data));
//  // dispatch({ type: TYPES.AUTH_USER, payload: res.data });
// };

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
		await axios.post(TYPES.urlLogout,null);
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
		await localStorage.removeItem(TYPES.keyUser)
	}
};

export const fetchSongs = reqData => async dispatch => {
	const data = {
		title : reqData.title,
		artist: reqData.artist,
		language: reqData.language,
		info: reqData.info,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  const res = await axiosInstance.post(TYPES.urlSongs, data);
  dispatch({ type: TYPES.SONGS, payload: res.data });
};