import React from "react";
import { render } from "react-dom";
import App from "./App/App";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { ConnectedRouter } from "connected-react-router";
import configureStore from "./redux/configureStore";
const { store, history } = configureStore();
const Root = props => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history} {...props}>
                <App history={history} />
            </ConnectedRouter>
        </Provider>
    );
};
render(<Root />, document.getElementById("root"));
