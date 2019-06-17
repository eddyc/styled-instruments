import { START_CSOUND } from "./types";

const INITIAL_STATE = {
    started: false,
    csoundObj: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_CSOUND.SUCCESS: {
            return {
                ...state,
                started: true,
                csoundObj: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
