import { START_CSOUND } from "./types";
import { selectCsoundObj } from "./selectors";
/* global CsoundObj */

export const startCsound = csd => {
    return async dispatch => {
        dispatch({ type: START_CSOUND.REQUEST });
        await CsoundObj.importScripts("/js/");
        const result = await fetch(csd);
        const csdText = await result.text();
        const csoundObj = new CsoundObj();
        csoundObj.compileCSD(csdText);
        csoundObj.play();
        dispatch({ type: START_CSOUND.SUCCESS, payload: csoundObj });
    };
};

export const setControlChannel = (channel, value) => {
    return (dispatch, getState) => {
        const store = getState();
        const csoundObj = selectCsoundObj(store);
        csoundObj.setControlChannel(channel, value);
    };
};

export const compileOrc = orc => {
    return (dispatch, getState) => {
        const store = getState();
        const csoundObj = selectCsoundObj(store);
        csoundObj.compileOrc(orc);
    };
};

export const readScore = sco => {
    return (dispatch, getState) => {
        const store = getState();
        const csoundObj = selectCsoundObj(store);
        csoundObj.readScore(sco);
    };
};

export const setOutputChannelCallback = (channel, callback) => {
    return (dispatch, getState) => {
        const store = getState();
        const csoundObj = selectCsoundObj(store);
        csoundObj.setOutputChannelCallback(channel, callback);
    };
};
