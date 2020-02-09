import axios from "axios";
import qs from "qs";
import * as TYPES from "./types";
import { message } from 'antd';


const showErrorMessage = (text) => {
	message.error(text);
};

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
	
	request.headers['device-type'] = "Portal";
	if (!auth) {
		return request;
	}else{
		request.headers['Authorization'] = 'Bearer ' + auth.access_token
	}
	return request
  }
 
let isInPregress = false;
const errorHandler = (err) => {
	
	return new Promise((resolve, reject) => {
		const originalReq = err.config;
		if ( err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest ){

			console.log("401", err);
			
			originalReq._retry = true;

			const auth = localStorage.getItem(TYPES.keyToken);
				if(!auth){
					return;
				}
			let refreshToken = JSON.parse(auth).refresh_token;
			const header = getLoginHeader();
			const data = qs.stringify({
				refresh_token: refreshToken,
				grant_type: 'refresh_token'
			});
			if(!isInPregress){
					isInPregress = true;
					axios.post(TYPES.urlToken, data, header)
				.then(res => {
					isInPregress = false;
					originalReq.headers['Authorization'] = 'Bearer ' + res.data.access_token
					localStorage.setItem(TYPES.keyToken, JSON.stringify(res.data));
					return axiosInstance(originalReq);
				}).catch(error => {
					debugger
					localStorage.removeItem(TYPES.keyToken);
					localStorage.removeItem(TYPES.keyUserName);
					localStorage.removeItem(TYPES.keyUser)
					return reject(err);
				})
			}
			return resolve();
		}
		const { status, error } = err.response.data;
		showErrorMessage(status + " : "+ error)
		return reject(err);
	});
}
  
const successHandler = (response) => {

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

export const fetchUser = () => dispatch => {
	let username = localStorage.getItem(TYPES.keyUserName);
	axiosInstance.get(TYPES.urlUserInfo + username)
		.then(response => {
			localStorage.setItem(TYPES.keyUser, JSON.stringify(response.data));
			dispatch({ type: TYPES.USER, payload: response.data });
		}).catch( error => {
			console.error("fetchUser ", error);
		})
		
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


export const signout = () => async dispatch => {

	dispatch({ type: TYPES.UNAUTH_USER, payload: false });
	localStorage.removeItem(TYPES.keyToken);
	localStorage.removeItem(TYPES.keyUserName);
	localStorage.removeItem(TYPES.keyUser)
};

export const fetchSongs = reqData => async dispatch => {
	const data = {
		id: reqData.id,
		title : reqData.title,
		artist: reqData.artist,
		language: reqData.language,
		info: reqData.info,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  axiosInstance.post(TYPES.urlSongs, data)
  	.then( res => {
		dispatch({ type: TYPES.SONGS, payload: res.data });
  }).catch(error => {
	console.error("fetchSongs ",error);
  })
  
};

export const saveSong = reqData => async dispatch => {
  axiosInstance.post(TYPES.urlSaveSong, reqData)
  	.then(res => {
		dispatch({ type: TYPES.SONG, payload: res.data });
  }).catch(error => {
	console.error("saveSong ",error);
  })
  
};

export const fetchAlbums = reqData => async dispatch => {
	const data = {
		id: reqData.id,
		title : reqData.title,
		artist: reqData.artist,
		genre: reqData.genre,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  axiosInstance.post(TYPES.urlAlbums, data)
  	.then( res => {
		dispatch({ type: TYPES.ALBUMS, payload: res.data });
  }).catch(error => {
	console.error("fetchAlbums ",error);
  })
  
};

export const saveAlbum = reqData => async dispatch => {
  axiosInstance.post(TYPES.urlSaveAlbum, reqData)
  	.then(res => {
		dispatch({ type: TYPES.ALBUM, payload: res.data });
  }).catch(error => {
	console.error("saveAlbum ",error);
  })
  
};

export const fetchFeedbacks = reqData => async dispatch => {
	const data = {
		id: reqData.id,
		fromDt : reqData.fromDt,
		toDt: reqData.toDt,
		emailOrphone: reqData.emailOrphone,
		text: reqData.text,
		name: reqData.name,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  axiosInstance.post(TYPES.urlFeedback, data)
  	.then( res => {
		dispatch({ type: TYPES.FEEDBACK, payload: res.data });
  }).catch(error => {
	console.error("fetchFeedbacks ",error);
  })
  
};

export const fetchTxns = reqData => async dispatch => {
	const data = {
		id: reqData.id,
		fromDt : reqData.fromDt,
		toDt: reqData.toDt,
		eventAction: reqData.eventAction,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  axiosInstance.post(TYPES.urlTxns, data)
  	.then( res => {
		dispatch({ type: TYPES.TXNS, payload: res.data });
  }).catch(error => {
	console.error("fetchTxns ",error);
  })
  
};

export const fetchUsers = reqData => async dispatch => {
	const data = {
		id: reqData.id,
		username : reqData.username,
		name: reqData.name,
		email: reqData.email,
		phone: reqData.phone,
		page: {
			page: reqData.page,
			size: reqData.size
		}
	}
  axiosInstance.post(TYPES.urlUsers, data)
  	.then( res => {
		dispatch({ type: TYPES.USERS, payload: res.data });
  }).catch(error => {
	console.error("fetchUsers ",error);
  })
  
};

export const saveUser = reqData => async dispatch => {
  axiosInstance.post(TYPES.urlSaveUser, reqData)
  	.then(res => {
		dispatch({ type: TYPES.USER, payload: res.data });
  }).catch(error => {
	console.error("saveUser ",error);
  })
  
};