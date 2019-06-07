import React from "react";
import { CsoundContext } from "./Csound";

const reduceCsoundArgs = argArray => {
    return argArray.reduce((acc, curr) => {
        acc[curr.label] = curr.f;
        return acc;
    }, {});
};

const getChngetStrings = inputs => {
    return inputs.map(e => {
        return `${e.label} chnget "${e.label}"`;
    });
};

const getChnsetStrings = outputs => {
    return outputs.map(e => {
        return `chnset ${e.label}, "${e.label}"`;
    });
};

const getFinalInstrumentOrc = (
    chngetStrings,
    rawInstOrc,
    chnsetStrings,
    label
) => {
    const allLines = [
        "",
        ...chngetStrings,
        "",
        ...rawInstOrc,
        "",
        chnsetStrings,
        ""
    ];
    let instrumentString = `instr ${label}\n    ${allLines.join(
        "\n    "
    )}\nendin`;
    return instrumentString;
};

const getInitialInstrumentOrc = (inputs, outputs, exprs, strs) => {
    let inputIndex = 0,
        outputIndex = 0;

    return exprs
        .reduce((result, expr, index) => {
            let label;

            if (typeof expr === "object") {
                label = inputs[inputIndex].label;
                inputIndex++;
            }
            if (typeof expr === "function") {
                label = outputs[outputIndex].label;
                outputIndex++;
            }
            return result + label + strs[index + 1];
        }, strs[0])
        .split("\n")
        .map(e => e.trim())
        .filter(e => e !== "");
};
const getArguments = exprs => {
    let outputs = [];
    let inputs = [];
    exprs.map(e => {
        if (typeof e === "object") {
            inputs.push(e);
        }
        if (typeof e === "function") {
            outputs.push(e);
        }

        return null;
    });

    outputs = outputs.map(e => {
        const label = Object.keys(e())[0];
        const g = v => e(v)[label];
        return {
            f: v => g(v),
            label
        };
    });

    inputs = inputs.map(e => {
        const label = Object.keys(e)[0];
        const g = v => e[label](v);
        return {
            f: v => g(v),
            label
        };
    });

    return {
        inputs,
        outputs
    };
};

const getInstrumentState = (label, strs, exprs) => {
    const { inputs, outputs } = getArguments(exprs);
    const rawInstOrc = getInitialInstrumentOrc(inputs, outputs, exprs, strs);
    const chngetStrings = getChngetStrings(inputs);
    const chnsetStrings = getChnsetStrings(outputs);
    const instrument = getFinalInstrumentOrc(
        chngetStrings,
        rawInstOrc,
        chnsetStrings,
        label
    );

    const inputFunctions = reduceCsoundArgs(inputs);
    const outputFunctions = reduceCsoundArgs(outputs);

    return {
        instrument,
        ioFunctions: { ...inputFunctions, ...outputFunctions }
    };
};

export const instr = label => (strs, ...exprs) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = getInstrumentState(label, strs, exprs);
            this.state = { ...this.state, ...this.props };
            console.log(this.state);
        }

        render() {
            return (
                <CsoundContext.Consumer>
                    {({ ready, ...rest }) => {
                        if (ready) {
                            return (
                                <IOComponent
                                    context={rest}
                                    instrument={this.state.instrument}
                                    {...this.props}
                                />
                            );
                        }
                    }}
                </CsoundContext.Consumer>
            );
        }
    };
};

class IOComponent extends React.Component {
    constructor(props) {
        super(props);
        const { context, instrument } = props;
        const { compileOrc, readScore } = context;
        compileOrc(instrument);
        readScore(`i "Saw" 0 -1`);
        this.updateProps();
    }

    updateProps() {
        const { context, instrument, ...restProps } = this.props;
        const { setControlChannel } = context;
        for (const key in restProps) {
            setControlChannel(key, this.props[key]);
        }
    }
    componentDidUpdate(prevProps) {
        const { context, instrument, ...restProps } = prevProps;
        const { setControlChannel } = context;
        for (const key in restProps) {
            if (restProps[key] !== this.props[key]) {
                setControlChannel(key, this.props[key]);
                console.log(key, this.props[key], "-->", restProps[key]);
            }
        }
    }

    componentDidMount() {}

    getInput = key => {
        return `k${key} chnget "${key}`;
    };

    render() {
        return null;
    }
}
