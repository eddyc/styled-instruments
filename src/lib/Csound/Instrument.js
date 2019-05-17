import React from "react";
import { CsoundContext } from "./Csound";

export const instr = label => (strs, ...exprs) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                instrument: this.interpolate(exprs)
            };
        }

        getExpressionLabel = expr => {
            return `k${label}${expr.toString().replace(/\W/g, "")}`;
        };

        getExpressionGetters() {
            const filtered = exprs.filter(expr => typeof expr === "function");
            return filtered.map(expr => {
                let value = this.getExpressionLabel(expr);
                value = `${value} chnget "${value}"\n`;
                return { [value]: value };
            });
        }
        reduceExpressions() {
            let getters = this.getExpressionGetters();
            getters = getters.map(e => {
                return Object.keys(e)[0];
            });
            getters = [...new Set(getters)].reduce((acc, curr) => {
                return (acc += `${curr}`);
            }, "");

            console.log(getters);

            const resultInstrument = exprs.reduce((result, expr, index) => {
                let value = [];

                if (typeof expr === "function") {
                    value = this.getExpressionLabel(expr);
                } else {
                    value = expr;
                }

                return result + value + strs[index + 1];
            }, strs[0]);

            return `${getters}\n${resultInstrument}`;
        }

        interpolate() {
            const result = `instr ${label}\n${this.reduceExpressions()}\nendin`;
            return result;
        }

        componentDidUpdate(prevProps) {
            if (prevProps !== this.props) {
                this.setState({
                    instrument: this.interpolate(exprs)
                });
            }
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
    getInput = key => {
        return `k${key} chnget "${key}`;
    };

    render() {
        console.log(this.props.instrument);

        return null;
    }
}
