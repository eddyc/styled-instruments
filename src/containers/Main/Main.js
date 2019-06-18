import React from "react";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { instr } from "../../lib/Instrument";

const kFreq = { kFreq: v => v * 100 };
const kOut = v => ({ kOut: parseInt(v * 50 + 50) });
const Saw = instr("Saw")`
   aOut vco2 0.2, ${kFreq}
   ${kOut} lfo 1, 0.1
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
                <Saw kFreq={this.state.number * 100} kAmp={0.1}>
                    {({ kOut }) => {
                        return <pre>{kOut}</pre>;
                    }}
                </Saw>
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
