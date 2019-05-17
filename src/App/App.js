import React from "react";
import { Csound } from "../lib/Csound/Csound";
import Main from "../containers/Main/Main";
import MainCsd from "../csound/main.csd";
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <Csound csd={MainCsd} preloadFiles={this.props.filePaths}>
                <Main history={this.props.history} />
            </Csound>
        );
    }
}

export default connect(
    (store, props) => {
        return {};
    },
    {}
)(App);
