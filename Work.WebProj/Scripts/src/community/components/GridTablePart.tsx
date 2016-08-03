import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {setVisibilityFilter} from "../actions";
import "react-datepicker/dist/react-datepicker.css";

export class GridTable extends React.Component<any, any>{

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

        var out_html: JSX.Element = null;

        out_html =
            (
                <table className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ "width": "7%" }} className="text-xs-center">刪除</th>
                            <th style={{ "width": "7%" }} className="text-xs-center">修改</th>
                            <th style={{ "width": "26%" }}>編號</th>
                            <th style={{ "width": "60%" }}>社區名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.grid_items.map(
                            (item, i) =>
                                <tr key={item.community_id}>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td className="text-xs-center">{item.community_name}</td>
                                    <td className="text-xs-center">{item.company}</td>
                                </tr>
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        grid_items: state.grid_items
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            //dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}
const GridTablePart = connect(mapStateToProps, mapDispatchToProps)(GridTable)


export default GridTablePart;