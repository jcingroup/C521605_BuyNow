"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
require("react-datepicker/dist/react-datepicker.css");
const SearchFormPart_1 = require("./SearchFormPart");
class GridForm extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            searchData: null
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        var out_html = null;
        out_html =
            (React.createElement("div", null, React.createElement("ul", {className: "breadcrumb"}, React.createElement("li", null, React.createElement("i", {className: "fa-caret-right"}), " ", this.props.menuName), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", this.props.caption)), React.createElement("h3", {className: "h3"}, this.props.caption), React.createElement(SearchFormPart_1.default, null)));
        return out_html;
    }
}
exports.GridForm = GridForm;
const mapStateToProps = (state, ownProps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
        }
    };
};
const GridFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridFormPart;
