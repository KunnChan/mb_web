import * as TYPES from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case TYPES.TXNS:
			return action.payload;
		default:
			return state;
	}
}
