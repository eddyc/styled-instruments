import { GET_FILE_PATHS } from "./types";

const INITIAL_STATE = {
    filePaths: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FILE_PATHS: {
            return {
                ...state,
                filePaths: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
