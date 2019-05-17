import React from "react";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { instr } from "../../lib/Csound/Instrument";

const Saw = instr("Saw")`
   aOut vco2 ${({ test }) => test}, ${props => props.freq}
   aOut2 vco2 ${({ test }) => test}, 440
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
                <Saw test={this.state.number} freq={440} />
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
