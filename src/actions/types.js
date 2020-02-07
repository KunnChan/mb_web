export const FETCH_USER = "FETCH_USER";
export const AUTH_USER = "AUTH_USER";
export const LOCALE_SET = "LOCALE_SET";
export const UNAUTH_USER = "UNAUTH_USER";

export const SONGS = "SONGS";
export const SONG = "SONG";
export const USER ="USER";
export const ALBUM ="ALBUM";
export const ALBUMS ="ALBUMS";

export const keyToken = "access_token";
export const keyUserName = "user_name";
export const keyUser = "user_data";
export const keySongs = 'key_songs';

const endpoint = "/xapiv1";
export const urlToken = endpoint + "/oauth/token";
export const urlUserInfo = endpoint + '/zone/user/username/';

export const urlSongs = endpoint + '/song/query';
export const urlSaveSong = endpoint + '/shield/song/save';

export const urlAlbums = endpoint + '/album/query';
export const urlSaveAlbum = endpoint + '/shield/album/save';



export const levelOrder = "order";
export const levelReOrder = "reOrder";
export const levelViewBill = "viewBill";
export const levelPrintBill = "printBill";
export const levelPaid = "paid";
export const levelPaidDirect = "directPaid";
export const levelCancelOrder = "cancelOrder";