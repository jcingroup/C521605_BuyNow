import $ = require('jquery');
import React = require('react');
import ReactDOM = require('react-dom');
import Moment = require('moment');
import ReactBootstrap = require("react-bootstrap");
import CommCmpt = require('comm-cmpt');
import CommFunc = require('comm-func');

namespace Community {
    interface Rows {
        community_id?: string;
        check_del?: boolean,
        name?: string;

    }
    interface FormState<G, F> extends BaseDefine.GirdFormStateBase<G, F> {

    }
    interface FormResult extends IResultBase {
        ID: string
    }
    interface GridProps {
        gridData: { rows: Array<Rows>, page: number },
        delCheck(i: number, chd: boolean): void,
        updateType(p1: IEditType): void,
        queryGridData(page: number): void,
        insertType(): void,
        deleteSubmit(): void,
        checkAll(): void
    }
    interface EditFormProps {
        fieldData: server.Community,
        handleSubmit(e: React.FormEvent): void,
        changeFDValue(name: string, e: React.SyntheticEvent): void,
        noneType():void
    }

    class QueryForm extends React.Component<any, any>{
        constructor() {
            super();
        }
        static defaultProps = {
        }
        render() {
            return <form onSubmit={this.props.handleSearch}>
                        <div className="table-responsive">
                            <div className="table-header">
                                <div className="table-filter">
                                    <div className="form-inline">
                                        <div className="form-group">
                                            <label>使用者名稱</label> { }
                                            <input type="text" className="form-control"
                                                onChange={this.props.changeGDValue.bind(this, 'UserName') }
                                                placeholder="請輸入關鍵字..." /> { }
                                            <button className="btn-primary" type="submit"><i className="fa-search"></i> 搜尋</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </form>;
        }
    }
    class GridRow extends React.Component<BaseDefine.GridRowPropsBase<Rows>, BaseDefine.GridRowStateBase> {
        constructor() {
            super();
            this.delCheck = this.delCheck.bind(this);
            this.modify = this.modify.bind(this);
        }
        static defaultProps = {
            fdName: 'fieldData',
            gdName: 'searchData',
            apiPathName: gb_approot + 'api/Community'
        }
        delCheck(i, chd) {
            this.props.delCheck(i, chd);
        }
        modify() {
            this.props.updateType(this.props.primKey)
        }
        render() {

            return <tr>
                       <td className="text-center">
                           <CommCmpt.GridCheckDel iKey={this.props.ikey} chd={this.props.itemData.check_del} delCheck={this.delCheck} />
                           </td>
                       <td className="text-center">
                           <CommCmpt.GridButtonModify modify={this.modify} />
                           </td>
                       <td>
                           {this.props.itemData.name}
                           </td>
                </tr>;

        }
    }
    class Grid extends React.Component<GridProps, any>{
        constructor() {
            super();
            this.state = {
                gridData: { rows: [], page: 1 }
            }
        }
        render() {

            let GridNavPage = CommCmpt.GridNavPage;

            return (
                <div>
                <table>
                                <thead>
                                    <tr>
                                        <th className="col-xs-1 text-center">
                                            <label className="cbox">
                                                <input type="checkbox" checked={this.state.checkAll} onChange={this.props.checkAll} />
                                                <i className="fa-check"></i>
                                                </label>
                                            </th>
                                        <th className="col-xs-1 text-center">修改</th>
                                        <th className="col-xs-10">Name</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {
                                    this.props.gridData.rows.map(
                                        (itemData, i) =>
                                            <GridRow key={i}
                                                ikey={i}
                                                primKey={itemData.community_id}
                                                itemData={itemData}
                                                delCheck={this.props.delCheck}
                                                updateType={this.props.updateType} />
                                    )
                                    }
                                    </tbody>
                    </table>
                <GridNavPage
                    startCount= { this.state.gridData.startcount }
                    endCount = { this.state.gridData.endcount }
                    recordCount = { this.state.gridData.records }
                    totalPage = { this.state.gridData.total }
                    nowPage = { this.state.gridData.page }
                    onQueryGridData = { this.props.queryGridData }
                    InsertType = { this.props.insertType }
                    deleteSubmit = { this.props.deleteSubmit }
                    />
                    </div>
            );
        }
    }
    class EditForm extends React.Component<EditFormProps, any>{


        render() {
            let fieldData = this.props.fieldData;

            return (
                <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
        <div className="col-xs-8">
            <div className="form-group">
                <label className="col-xs-2 control-label">中文名稱</label>
                <div className="col-xs-8">
                    <input type="text" className="form-control" onChange={this.props.changeFDValue.bind(this, 'name') } value={fieldData.name} maxLength={50} required />
                    </div>
                <small className="col-xs-2 text-danger">(必填) </small>
                </div>


            <div className="form-action">
                <div className="col-xs-4 col-xs-offset-2">
                    <button type="submit" className="btn-primary"><i className="fa-check"></i> 儲存</button>
                    {}
                    <button type="button" onClick={this.props.noneType}><i className="fa-times"></i> 回前頁</button>
                    </div>
                </div>
            </div>
                    </form>
            );
        }
    }
    export class GridForm extends React.Component<BaseDefine.GridFormPropsBase, FormState<Rows, server.Community>>{

        constructor() {

            super();
            this.updateType = this.updateType.bind(this);
            this.noneType = this.noneType.bind(this);
            this.queryGridData = this.queryGridData.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.deleteSubmit = this.deleteSubmit.bind(this);
            this.delCheck = this.delCheck.bind(this);
            this.checkAll = this.checkAll.bind(this);
            this.componentDidMount = this.componentDidMount.bind(this);
            this.insertType = this.insertType.bind(this);
            this.changeGDValue = this.changeGDValue.bind(this);
            this.changeFDValue = this.changeFDValue.bind(this);
            this.setInputValue = this.setInputValue.bind(this);
            this.render = this.render.bind(this);

            this.state = {
                fieldData: {},
                gridData: { rows: [], page: 1 },
                edit_type: IEditType.none
            }
        }
        static defaultProps: BaseDefine.GridFormPropsBase = {
            fdName: 'fieldData',
            gdName: 'searchData',
            apiPath: gb_approot + 'api/Community'
        }
        componentDidMount() {
            this.queryGridData(1);
        }

        gridData(page: number) {

            var parms = {
                page: 0
            };

            if (page == 0) {
                parms.page = this.state.gridData.page;
            } else {
                parms.page = page;
            }

            $.extend(parms, this.state.searchData);
            return CommFunc.jqGet(this.props.apiPath, parms);
        }
        queryGridData(page: number) {
            this.gridData(page)
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({ gridData: data });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    CommFunc.showAjaxError(errorThrown);
                });
        }
        handleSubmit(e: React.FormEvent) {
            e.preventDefault();
            if (this.state.edit_type == IEditType.insert) {
                CommFunc.jqPost(this.props.apiPath, this.state.fieldData)
                    .done((data: FormResult, textStatus, jqXHRdata) => {
                        if (data.result) {
                            CommFunc.tosMessage(null, '新增完成', 1);
                            this.updateType(data.ID);
                        } else {
                            alert(data.message);
                        }
                    })
                    .fail((jqXHR, textStatus, errorThrown) => {
                        CommFunc.showAjaxError(errorThrown);
                    });
            }
            else if (this.state.edit_type == IEditType.update) {

                CommFunc.jqPut(this.props.apiPath, this.state.fieldData)
                    .done((data, textStatus, jqXHRdata) => {
                        if (data.result) {
                            CommFunc.tosMessage(null, '修改完成', 1);
                        } else {
                            alert(data.message);
                        }
                    })
                    .fail((jqXHR, textStatus, errorThrown) => {
                        CommFunc.showAjaxError(errorThrown);
                    });

            };

            return;
        }
        deleteSubmit() {

            if (!confirm('確定是否刪除?')) {
                return;
            }

            var ids = [];
            for (var i in this.state.gridData.rows) {
                if (this.state.gridData.rows[i].check_del) {
                    ids.push('ids=' + this.state.gridData.rows[i].community_id);
                }
            }

            if (ids.length == 0) {
                CommFunc.tosMessage(null, '未選擇刪除項', 2);
                return;
            }

            CommFunc.jqDelete(this.props.apiPath + '?' + ids.join('&'), {})
                .done(function (data, textStatus, jqXHRdata) {
                    if (data.result) {
                        CommFunc.tosMessage(null, '刪除完成', 1);
                        this.queryGridData(0);
                    } else {
                        alert(data.message);
                    }
                }.bind(this))
                .fail(function (jqXHR, textStatus, errorThrown) {
                    CommFunc.showAjaxError(errorThrown);
                });
        }
        handleSearch(e: React.FormEvent) {
            e.preventDefault();
            this.queryGridData(0);
            return;
        }
        delCheck(i: number, chd: boolean) {
            let newState = this.state;
            this.state.gridData.rows[i].check_del = !chd;
            this.setState(newState);
        }
        checkAll(): void {

            let newState = this.state;
            newState.checkAll = !newState.checkAll;
            for (var prop in this.state.gridData.rows) {
                this.state.gridData.rows[prop].check_del = newState.checkAll;
            }
            this.setState(newState);
        }
        insertType() {
            this.setState({ edit_type: 1, fieldData: {} });
        }
        updateType(id: number | string) {

            CommFunc.jqGet(this.props.apiPath, { id: id })
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({ edit_type: 2, fieldData: data.data });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    CommFunc.showAjaxError(errorThrown);
                });
        }
        noneType() {
            this.gridData(0)
                .done(function (data, textStatus, jqXHRdata) {
                    this.setState({ edit_type: 0, gridData: data });
                }.bind(this))
                .fail(function (jqXHR, textStatus, errorThrown) {
                    CommFunc.showAjaxError(errorThrown);
                });
        }

        changeFDValue(name: string, e: React.SyntheticEvent) {
            this.setInputValue(this.props.fdName, name, e);
        }
        changeGDValue(name: string, e: React.SyntheticEvent) {
            this.setInputValue(this.props.gdName, name, e);
        }
        setInputValue(collentName: string, name: string, e: React.SyntheticEvent) {
            let input: HTMLInputElement = e.target as HTMLInputElement;
            let obj = this.state[collentName];
            console.log(name);
            if (input.value == 'true') {
                obj[name] = true;
            } else if (input.value == 'false') {
                obj[name] = false;
            } else {
                obj[name] = input.value;
            }
            this.setState({ fieldData: obj });
        }

        render() {

            var outHtml: JSX.Element = null;

            if (this.state.edit_type == IEditType.none) {
                let searchData = this.state.searchData;
                outHtml =
                    (
                        <div>
                            <ul className="breadcrumb">
                                <li><i className="fa-list-alt"></i> {this.props.menuName}</li>
                                </ul>
                            <h3 className="title">
                                {this.props.caption}
                                </h3>
                            <QueryForm changeGDValue={this.changeGDValue} handleSearch={this.handleSearch} />
                            <Grid
                                gridData={this.state.gridData}
                                checkAll={this.checkAll}
                                delCheck={this.delCheck}
                                updateType={this.updateType}
                                deleteSubmit={this.deleteSubmit}
                                insertType = {this.insertType}
                                queryGridData={this.queryGridData}
                                />
                            </div>
                    );
            }
            else if (this.state.edit_type == IEditType.insert || this.state.edit_type == IEditType.update) {

                let fieldData = this.state.fieldData;
                outHtml = (
                    <div>
    <ul className="breadcrumb">
        <li><i className="fa-list-alt"></i>
            {this.props.menuName}
            </li>
        </ul>
    <h4 className="title"> {this.props.caption} 基本資料維護</h4>
    <EditForm
        fieldData={this.state.fieldData}
        changeFDValue={this.changeFDValue}
        handleSubmit={this.handleSubmit}
        noneType={this.noneType}                    
                            />
                        </div>
                );
            }

            return outHtml;
        }
    }
}

var dom = document.getElementById('page_content');
ReactDOM.render(<Community.GridForm caption={gb_caption} menuName={gb_menuname} iconClass="fa-list-alt" />, dom);