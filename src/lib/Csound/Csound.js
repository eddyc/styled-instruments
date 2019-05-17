import React from "react";
/* global CsoundObj */

export const CsoundContext = React.createContext({});
const setControlChannelInit = [];
const readScoreInit = [];
export class Csound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csoundObj: null
        };
        this.startCsound();
    }

    uploadFile = async (path, name, csoundObj) => {
        let result = await fetch(path);
        result = await result.arrayBuffer();
        csoundObj.writeToFS(name, result);
    };

    startCsound = async () => {
        await CsoundObj.importScripts("https://waaw.csound.com/js/");
        const result = await fetch(this.props.csd);
        const csdText = await result.text();
        const csoundObj = new CsoundObj();
        csoundObj.compileCSD(csdText);

        if (Array.isArray(this.props.preloadFiles)) {
            await Promise.all(
                this.props.preloadFiles.map(async ({ path, name }) => {
                    return await this.uploadFile(path, name, csoundObj);
                })
            );
        }

        this.setState({ csoundObj }, () => {
            csoundObj.start();
            Array.isArray(setControlChannelInit) &&
                setControlChannelInit.map(e => {
                    csoundObj.setControlChannel(e.key, e.value);
                    return null;
                });

            Array.isArray(readScoreInit) &&
                readScoreInit.map(e => {
                    csoundObj.readScore(e);
                    return null;
                });
        });
    };

    start = () => {
        this.state.csoundObj.start();
    };

    stop = () => {
        this.state.csoundObj.stop();
    };

    render() {
        const { csoundObj } = this.state;

        const value =
            csoundObj === null
                ? {
                      ready: false,
                      setControlChannel: (key, value) => {
                          setControlChannelInit.push({ key, value });
                      },
                      readScore: score => {
                          readScoreInit.push(score);
                      }
                  }
                : {
                      ready: true,
                      setControlChannel: (channel, value) => {
                          csoundObj.setControlChannel(channel, value);
                      },
                      readScore: scoreString => csoundObj.readScore(scoreString)
                  };

        return (
            <CsoundContext.Provider value={value}>
                {this.props.children}
            </CsoundContext.Provider>
        );
    }
}

export const withCsound = Component => {
    return function CsoundWrapper(props) {
        return (
            <CsoundContext.Consumer>
                {context => <Component {...props} {...context} />}
            </CsoundContext.Consumer>
        );
    };
};
