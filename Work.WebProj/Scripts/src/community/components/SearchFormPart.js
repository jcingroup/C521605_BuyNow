"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var actions_1 = require("../actions");
var GridTablePart_1 = require("./GridTablePart");
require("react-datepicker/dist/react-datepicker.css");
var SearchForm = (function (_super) {
    __extends(SearchForm, _super);
    function SearchForm() {
        _super.call(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            searchData: null
        };
    }
    SearchForm.prototype.componentDidMount = function () {
    };
    SearchForm.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    SearchForm.prototype.componentWillUnmount = function () {
    };
    SearchForm.prototype.render = function () {
        var out_html = null;
        var search = this.props.search;
        out_html =
            (React.createElement("form", null, React.createElement("div", {className: "table-responsive"}, React.createElement("div", {className: "table-header"}, React.createElement("div", {className: "table-filter"}, React.createElement("div", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only"}, "搜尋社區名稱"), " ", React.createElement("input", {type: "text", className: "form-control form-control-sm", value: search.key, onChange: this.props.onChange.bind(this, 'key'), placeholder: "社區名稱"}), React.createElement("button", {className: "btn btn-sm btn-primary", type: "button", onClick: this.props.onClick}, React.createElement("i", {className: "fa-search"}), " 搜尋")))))), React.createElement(GridTablePart_1.default, null)));
        return out_html;
    };
    return SearchForm;
}(React.Component));
function makeInputValue(name, e) {
    var input = e.target;
    var value;
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
var mapStateToProps = function (state, ownProps) {
    return {
        search: state.search,
        count: state.grid_items.length
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var r = {
        onChange: function (name, e) {
            var value = makeInputValue(name, e);
            dispatch(actions_1.setInputValue(name, value));
        },
        onClick: function (e) {
            dispatch(actions_1.clearGridItem());
        }
    };
    return r;
};
var SearchFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchFormPart;
