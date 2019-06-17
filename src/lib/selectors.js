export const selectCsoundStarted = ({ CsoundReducer }) => {
    return CsoundReducer.started;
};

export const selectCsoundObj = ({ CsoundReducer }) => {
    return CsoundReducer.csoundObj;
};
