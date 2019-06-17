const restRequest = type => {
    return {
        REQUEST: `${type}.REQUEST`,
        SUCCESS: `${type}.SUCCESS`,
        FAIL: `${type}.FAIL`
    };
};

export const START_CSOUND = restRequest("START_CSOUND");

console.log(START_CSOUND);
