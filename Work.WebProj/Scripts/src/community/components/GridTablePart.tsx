import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {setVisibilityFilter} from "../actions";
import "react-datepicker/dist/react-datepicker.css";


const Rows = ({ item, onClick }) => {
    return (
        <tr>
            <td><button type="button" onClick={onClick}>Click</button></td>
            <td>Modify</td>
            <td>{item.community_name}</td>
            <td>{item.address}</td>
        </tr>
    )
}

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
                                <Rows
                                    key={item.community_id}
                                    item={item}
                                    onClick={this.props.onClick}

                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
const mapStateToProps = (state, ownProps) => {
    //console.log('=>', state)
    return {
        grid_items: state.grid_items
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            alert('1')
            //dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}
const GridTablePart = connect(mapStateToProps, mapDispatchToProps)(GridTable)


export default GridTablePart;