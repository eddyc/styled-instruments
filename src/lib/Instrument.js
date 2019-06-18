import React from "react";
import { connect } from "react-redux";
import { selectCsoundStarted } from "./selectors";
import {
    setControlChannel,
    compileOrc,
    readScore,
    setOutputChannelCallback
} from "./actions";
import { getInstrumentState } from "./csoundStringParser";
import { throttle } from "lodash";
export const instr = label => (strs, ...exprs) => {
    const InstrumentClass = class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ...getInstrumentState(label, strs, exprs),
                compiled: false
            };
        }

        componentDidUpdate(prevProps) {
            const { children, csoundStarted, ...restProps } = this.props;

            if (
                prevProps.csoundStarted !== csoundStarted &&
                csoundStarted === true &&
                this.state.compiled === false
            ) {
                this.props.compileOrc(this.state.instrument);
                this.setState({ ...this.state, compiled: true });

                this.props.readScore(`i "Saw" 0 -1`);

                Object.keys(this.state.ioFunctions.output).map(e => {
                    const f = this.state.ioFunctions.output[e];
                    this.props.setOutputChannelCallback(
                        e,
                        throttle(v => {
                            this.setState({ [e]: f(v) });
                        }, 1000 / 60)
                    );
                });
            }

            if (csoundStarted === true) {
                for (const key in restProps) {
                    if (restProps[key] !== prevProps[key]) {
                        this.props.setControlChannel(key, restProps[key]);
                    }
                }
            }
        }

        render() {
            if (this.props.csoundStarted === true) {
                if (typeof this.props.children === "function") {
                    const {
                        compiled,
                        instrument,
                        ioFunctions,
                        ...restState
                    } = this.state;
                    return <pre>{this.props.children(restState)}</pre>;
                } else {
                    return <pre>{this.props.children}</pre>;
                }
            } else {
                return <pre>Not Started</pre>;
            }
        }
    };

    return connect(
        store => {
            return {
                csoundStarted: selectCsoundStarted(store)
            };
        },
        { setControlChannel, compileOrc, readScore, setOutputChannelCallback }
    )(InstrumentClass);
};
