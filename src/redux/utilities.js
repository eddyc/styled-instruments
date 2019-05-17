export const restRequest = (client, type) => {
    return {
        REQUEST: `${client}.${type}.REQUEST`,
        SUCCESS: `${client}.${type}.SUCCESS`,
        FAIL: `${client}.${type}.FAIL`
    };
};
