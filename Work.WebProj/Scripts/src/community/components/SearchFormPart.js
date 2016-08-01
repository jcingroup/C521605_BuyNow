"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const actions_1 = require("../actions");
require("react-datepicker/dist/react-datepicker.css");
class SearchForm extends React.Component {
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
        let out_html = null;
        let search = this.props.search;
        console.log('Props', this.props);
        out_html =
            (React.createElement("form", null, React.createElement("div", {className: "table-responsive"}, React.createElement("div", {className: "table-header"}, React.createElement("div", {className: "table-filter"}, React.createElement("div", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only"}, "搜尋社區名稱"), " ", React.createElement("input", {type: "text", className: "form-control form-control-sm", value: search.key, onChange: this.props.onChange.bind(this, 'key'), placeholder: "社區名稱"}), " ", React.createElement("button", {className: "btn btn-sm btn-primary", type: "submit"}, React.createElement("i", {className: "fa-search"}), " 搜尋"))))))));
        return out_html;
    }
}
function makeInputValue(name, e) {
    let input = e.target;
    let value;
    if (input.value == 'true') {
        value = true;
    }
    else if (input.value == 'false') {
        value = false;
    }
    else {
        value = input.value;
    }
    return value;
}
const mapStateToProps = (state, ownProps) => {
    console.log('SearchForm mapStateToProps', state);
    return {
        search: state.search
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    let r = {
        onChange: (name, e) => {
            let value = makeInputValue(name, e);
            dispatch(actions_1.setInputValue(name, value));
        }
    };
    return r;
};
const SearchFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchFormPart;
