import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {setVisibilityFilter, setInputValue, clearGridItem} from "../actions";
import GridTablePart from "./GridTablePart";
import "react-datepicker/dist/react-datepicker.css";


class SearchForm extends React.Component<any, any>{

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

        let out_html: JSX.Element = null;
        let search = this.props.search;
        //console.log('Props', this.props);
        out_html =
            (
                <form>
                    <div className="table-responsive">
                        <div className="table-header">
                            <div className="table-filter">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="sr-only">搜尋社區名稱</label> { }
                                        <input type="text" className="form-control form-control-sm"
                                            value={search.key}
                                            onChange={this.props.onChange.bind(this, 'key') }
                                            placeholder="社區名稱" />
                                        <button className="btn btn-sm btn-primary" type="button" onClick={this.props.onClick}>
                                            <i className="fa-search"></i> 搜尋
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GridTablePart />
                </form>

            );

        return out_html;
    }
}

function makeInputValue(name: string, e: React.SyntheticEvent) {
    let input: HTMLInputElement = e.target as HTMLInputElement;
    let value;

    if (input.value == 'true') {
        value = true;
    } else if (input.value == 'false') {
        value = false;
    } else {
        value = input.value;
    }

    //var objForUpdate = {
    //    [collentName]:
    //    {
    //        [name]: { $set: value }
    //    }
    //};
    //var newState = update(this.state, objForUpdate);

    //this.setState(newState);
    return value;
}

const mapStateToProps = (state, ownProps) => {
    //console.log('SearchForm mapStateToProps', state);
    return {
        search: state.search,
        count: state.grid_items.length
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {

    let r = {
        onChange: (name: string, e: React.SyntheticEvent) => {
            let value = makeInputValue(name, e);
            dispatch(setInputValue(name, value));
        },
        onClick: (e: React.SyntheticEvent) => {
            dispatch(clearGridItem());
        }
    };

    //let bind = bindActionCreators(
    //    {
    //        onChange: setInputValue
    //    }, dispatch)

    return r;
}
const SearchFormPart = connect(mapStateToProps, mapDispatchToProps)(SearchForm)
export default SearchFormPart;