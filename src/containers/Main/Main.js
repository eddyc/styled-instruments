import React from "react";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { instr } from "../../lib/Csound/Instrument";

const kAmp = { kAmp: v => v };
const kFreq = { kFreq: v => v * 100 };
// const kOut = v => ({ kOut: v });
const Saw = instr("Saw")`
   aOut vco2 ${kAmp}, ${kFreq}
   outs(aOut, aOut) 
`;

class Main extends React.Component {
    state = {
        number: 1
    };
    render() {
        return (
            <>
                <button
                    onClick={() => {
                        const number = this.state.number;
                        this.setState({ number: number + 1 });
                    }}
                />
                {/* <Saw kFreq={this.state.number * 100} kAmp={0.5} /> */}
            </>
        );
    }
}
export default hot(
    connect(
        store => {
            return {};
        },
        {}
    )(Main)
);
