import React from "react";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { startCsound } from "./actions";

export class Csound extends React.Component {
    constructor(props) {
        super(props);
        props.startCsound(props.csd);
    }

    render() {
        return <>{this.props.children}</>;
    }
}

export default hot(
    connect(
        store => {
            return {};
        },
        { startCsound }
    )(Csound)
);
