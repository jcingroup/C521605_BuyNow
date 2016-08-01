import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {setVisibilityFilter} from "../actions";
import "react-datepicker/dist/react-datepicker.css";
import SearchFormPart from "./SearchFormPart";

export class GridForm extends React.Component<any, any>{

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
        alert('Update');
    }
    componentWillUnmount() {
        //元件被從 DOM 卸載之前執行，通常我們在這個方法清除一些不再需要地物件或 timer。
    }

    render() {

        var out_html: JSX.Element = null;

        out_html =
            (
                <div>
                    <ul className="breadcrumb">
                        <li>
                            <i className="fa-caret-right"></i> { }
                            {this.props.menuName}
                        </li>
                        <li>
                            <i className="fa-angle-right"></i> { }
                            {this.props.caption}
                        </li>
                    </ul>
                    <h3 className="h3">
                        {this.props.caption}
                    </h3>
                    <SearchFormPart />
                </div>
            );

        return out_html;
    }
}

const mapStateToProps = (state, ownProps) => {

    console.log('GridForm mapStateToProps', state);

    return {
        active: ownProps.filter === state.visibilityFilter,
        myage: 6
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            console.log(1, 'Event')
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}
const GridFormPart = connect(mapStateToProps, mapDispatchToProps)(GridForm)


export default GridFormPart;