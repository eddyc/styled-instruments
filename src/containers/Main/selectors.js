import { createSelector } from "reselect";

const controlMemo = {};
const scoreMemo = {};
const startedMemo = {};

const setControlMemoValue = (key, value, callback = () => {}) => {
    if (typeof controlMemo[key] === "undefined" || controlMemo[key] !== value) {
        controlMemo[key] = value;
        return callback();
    }
};

const setScoreMemoValue = (key, score, callback = () => {}) => {
    if (typeof scoreMemo[key] === "undefined" || scoreMemo[key] !== score) {
        scoreMemo[key] = score;
        return callback();
    }
};

const setStartedMemo = (key, started, callback = () => {}) => {
    if (
        typeof startedMemo[key] === "undefined" ||
        startedMemo[key] !== started
    ) {
        if (started === true && startedMemo[key] === false) {
            callback();
        }

        startedMemo[key] = started;
    }
};

export const selectFilePaths = ({ MainReducer }) => {
    return MainReducer.filePaths;
};

export const selectRoomSettings = ({ MainReducer }) => {
    const { filePaths, ...rest } = MainReducer;
    return rest;
};

export const selectHRTFPreset = ({ MainReducer }) => {
    return MainReducer.hrtfPreset;
};

export const selectSoundSourceFile = ({ MainReducer }) => {
    return MainReducer.soundSourceFile;
};

export const selectSoundSourceFileGenre = ({ MainReducer }) => {
    return MainReducer.soundSourceFileGenre;
};

export const selectMouseDown = ({ MainReducer }) => {
    return MainReducer.mouseDown;
};

export const selectPageIndex = ({ MainReducer }) => {
    return MainReducer.pageIndex;
};

export const selectVariable = key => {
    return ({ MainReducer }) => {
        const result = MainReducer[key];
        return result;
    };
};

export const selectScore = (key, readScore) => {
    return createSelector(
        [selectVariable(key), selectVariable("started")],
        (score, started) => {
            setScoreMemoValue(key, score, () => {
                if (started === true) {
                    readScore(score);
                } else {
                    console.log("not started");
                }
            });

            setStartedMemo(key, started, () => {
                readScore(score);
            });

            return score;
        }
    );
};

export const selectControlChannel = (key, setControlChannel) => {
    return createSelector(
        [selectVariable(key)],

        value => {
            setControlMemoValue(key, value, () => {
                setControlChannel(key, value);
            });
            return value;
        }
    );
};

export const selectFilterFiles = createSelector(
    [selectFilePaths],
    filePaths => {
        const result = filePaths.filter(e => e.path.includes("/filters/"));
        return result;
    }
);

export const selectSoundSourceFiles = createSelector(
    [selectFilePaths],
    filePaths => {
        const result = filePaths.filter(e => e.path.includes("/samples/"));
        return result;
    }
);

export const selectFilterFilesForDropdown = createSelector(
    [selectFilterFiles],
    filePaths => {
        const result = {};
        for (let i = 0, type = 1; i < filePaths.length; i += 2, ++type) {
            const l = filePaths[i];
            const r = filePaths[i + 1];

            result[`Type ${type}`] = {
                name: `Type ${type}`,
                left: l.name,
                right: r.name
            };
        }
        return result;
    }
);

export const selectCsoundReady = ({ MainSelector }) => {
    return MainSelector.csoundReady;
};
