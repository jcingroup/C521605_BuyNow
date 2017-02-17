webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var $ = __webpack_require__(503);
	var React = __webpack_require__(298);
	var ReactDOM = __webpack_require__(331);
	var update = __webpack_require__(520);
	var Moment = __webpack_require__(512);
	var CommCmpt = __webpack_require__(527);
	var CommFunc = __webpack_require__(524);
	var dt = __webpack_require__(783);
	var DatePicker = __webpack_require__(511);
	__webpack_require__(505);
	var CommunityBanner;
	(function (CommunityBanner) {
	    var GridRow = (function (_super) {
	        __extends(GridRow, _super);
	        function GridRow() {
	            _super.call(this);
	            this.modify = this.modify.bind(this);
	        }
	        GridRow.prototype.modify = function () {
	            this.props.updateType(this.props.primKey);
	        };
	        GridRow.prototype.render = function () {
	            var state = [];
	            state['A'] = React.createElement("span", {className: "label label-success"}, "顯示");
	            state['C'] = React.createElement("span", {className: "label label-danger"}, "關閉");
	            return React.createElement("tr", null, React.createElement("td", {className: "text-xs-center"}, React.createElement(CommCmpt.GridButtonDel, {removeItemSubmit: this.props.removeItemSubmit, primKey: this.props.primKey})), React.createElement("td", {className: "text-xs-center"}, React.createElement(CommCmpt.GridButtonModify, {modify: this.modify})), React.createElement("td", null, this.props.itemData.community_name), React.createElement("td", null, this.props.itemData.title), React.createElement("td", null, Moment(this.props.itemData.start_date).format(dt.dateFT)), React.createElement("td", null, Moment(this.props.itemData.end_date).format(dt.dateFT)), React.createElement("td", null, state[this.props.itemData.state]));
	        };
	        GridRow.defaultProps = {};
	        return GridRow;
	    }(React.Component));
	    var GirdForm = (function (_super) {
	        __extends(GirdForm, _super);
	        function GirdForm() {
	            _super.call(this);
	            this.updateType = this.updateType.bind(this);
	            this.noneType = this.noneType.bind(this);
	            this.queryGridData = this.queryGridData.bind(this);
	            this.handleSubmit = this.handleSubmit.bind(this);
	            this.handleSearch = this.handleSearch.bind(this);
	            this.removeItemSubmit = this.removeItemSubmit.bind(this);
	            this.deleteSubmit = this.deleteSubmit.bind(this);
	            this.delCheck = this.delCheck.bind(this);
	            this.checkAll = this.checkAll.bind(this);
	            this.componentDidMount = this.componentDidMount.bind(this);
	            this.componentDidUpdate = this.componentDidUpdate.bind(this);
	            this.componentWillUnmount = this.componentWillUnmount.bind(this);
	            this.insertType = this.insertType.bind(this);
	            this.state = {
	                fieldData: null,
	                gridData: { rows: [], page: 1 },
	                edit_type: 0,
	                searchData: { keyword: null },
	                editPrimKey: null
	            };
	        }
	        GirdForm.prototype.componentDidMount = function () {
	            var _this = this;
	            CommFunc.jqGet(gb_approot + 'Api/GetAction/GetOptionsCommunity', {})
	                .done(function (data) {
	                _this.setState({ options_community: data });
	            });
	            this.queryGridData(1);
	        };
	        GirdForm.prototype.componentDidUpdate = function (prevProps, prevState) {
	            if ((prevState.edit_type == 0 && (this.state.edit_type == 1 || this.state.edit_type == 2))) {
	                CKEDITOR.replace('news_content', { customConfig: '../ckeditor/inlineConfig.js' });
	            }
	        };
	        GirdForm.prototype.componentWillUnmount = function () {
	        };
	        GirdForm.prototype.gridData = function (page) {
	            var parms = {
	                page: 0
	            };
	            if (page == 0) {
	                parms.page = this.state.gridData.page;
	            }
	            else {
	                parms.page = page;
	            }
	            $.extend(parms, this.state.searchData);
	            return CommFunc.jqGet(this.props.apiPath, parms);
	        };
	        GirdForm.prototype.queryGridData = function (page) {
	            var _this = this;
	            this.gridData(page)
	                .done(function (data, textStatus, jqXHRdata) {
	                if (data.records == 0) {
	                    CommFunc.tosMessage(null, '無任何資料', 2);
	                }
	                _this.setState({ gridData: data });
	            })
	                .fail(function (jqXHR, textStatus, errorThrown) {
	                CommFunc.showAjaxError(errorThrown);
	            });
	        };
	        GirdForm.prototype.handleSubmit = function (e) {
	            var _this = this;
	            e.preventDefault();
	            this.state.fieldData.context = CKEDITOR.instances['news_content'].getData();
	            if (this.state.edit_type == 1) {
	                console.log(this.state.fieldData);
	                CommFunc.jqPost(this.props.apiPath, this.state.fieldData)
	                    .done(function (data, textStatus, jqXHRdata) {
	                    if (data.result) {
	                        CommFunc.tosMessage(null, '新增完成', 1);
	                        _this.updateType(data.id);
	                    }
	                    else {
	                        alert(data.message);
	                    }
	                })
	                    .fail(function (jqXHR, textStatus, errorThrown) {
	                    CommFunc.showAjaxError(errorThrown);
	                });
	            }
	            else if (this.state.edit_type == 2) {
	                var packData = { id: this.state.editPrimKey, md: this.state.fieldData };
	                CommFunc.jqPut(this.props.apiPath, packData)
	                    .done(function (data, textStatus, jqXHRdata) {
	                    if (data.result) {
	                        CommFunc.tosMessage(null, '修改完成', 1);
	                    }
	                    else {
	                        alert(data.message);
	                    }
	                })
	                    .fail(function (jqXHR, textStatus, errorThrown) {
	                    CommFunc.showAjaxError(errorThrown);
	                });
	            }
	            ;
	            return;
	        };
	        GirdForm.prototype.deleteSubmit = function () {
	            if (!confirm('確定是否刪除?')) {
	                return;
	            }
	            var ids = [];
	            for (var i in this.state.gridData.rows) {
	                if (this.state.gridData.rows[i].check_del) {
	                    ids.push('ids=' + this.state.gridData.rows[i].community_banner_id);
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
	                }
	                else {
	                    alert(data.message);
	                }
	            }.bind(this))
	                .fail(function (jqXHR, textStatus, errorThrown) {
	                CommFunc.showAjaxError(errorThrown);
	            });
	        };
	        GirdForm.prototype.removeItemSubmit = function (primKey) {
	            if (!confirm('確定是否刪除?')) {
	                return;
	            }
	            CommFunc.jqDelete(this.props.apiPath, { id: primKey })
	                .done(function (data, textStatus, jqXHRdata) {
	                if (data.result) {
	                    CommFunc.tosMessage(null, '刪除完成', 1);
	                    this.queryGridData(0);
	                }
	                else {
	                    alert(data.message);
	                }
	            }.bind(this))
	                .fail(function (jqXHR, textStatus, errorThrown) {
	                CommFunc.showAjaxError(errorThrown);
	            });
	        };
	        GirdForm.prototype.handleSearch = function (e) {
	            e.preventDefault();
	            this.queryGridData(0);
	            return;
	        };
	        GirdForm.prototype.delCheck = function (i, chd) {
	            var newState = this.state;
	            this.state.gridData.rows[i].check_del = !chd;
	            this.setState(newState);
	        };
	        GirdForm.prototype.checkAll = function () {
	            var newState = this.state;
	            newState.checkAll = !newState.checkAll;
	            for (var prop in this.state.gridData.rows) {
	                this.state.gridData.rows[prop].check_del = newState.checkAll;
	            }
	            this.setState(newState);
	        };
	        GirdForm.prototype.insertType = function () {
	            this.setState({
	                edit_type: 1,
	                fieldData: {
	                    start_date: Moment().format(),
	                    state: 'A',
	                    community_id: community_id
	                }
	            });
	        };
	        GirdForm.prototype.updateType = function (id) {
	            var _this = this;
	            var idPack = { id: id };
	            CommFunc.jqGet(this.props.apiPath, idPack)
	                .done(function (data, textStatus, jqXHRdata) {
	                _this.setState({
	                    edit_type: 2,
	                    fieldData: data.data,
	                    editPrimKey: id
	                });
	            })
	                .fail(function (jqXHR, textStatus, errorThrown) {
	                CommFunc.showAjaxError(errorThrown);
	            });
	        };
	        GirdForm.prototype.noneType = function () {
	            var _this = this;
	            this.gridData(0)
	                .done(function (data, textStatus, jqXHRdata) {
	                _this.setState({ edit_type: 0, gridData: data, editPrimKey: null });
	            })
	                .fail(function (jqXHR, textStatus, errorThrown) {
	                CommFunc.showAjaxError(errorThrown);
	            });
	        };
	        GirdForm.prototype.changeFDValue = function (name, e) {
	            this.setEventValue(this.props.fdName, name, e);
	        };
	        GirdForm.prototype.changeGDValue = function (name, e) {
	            this.setEventValue(this.props.gdName, name, e);
	        };
	        GirdForm.prototype.setEventValue = function (collentName, name, e) {
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
	            var objForUpdate = (_a = {},
	                _a[collentName] = (_b = {},
	                    _b[name] = { $set: value },
	                    _b
	                ),
	                _a
	            );
	            var newState = update(this.state, objForUpdate);
	            this.setState(newState);
	            var _a, _b;
	        };
	        GirdForm.prototype.setInputValue = function (collentName, name, v) {
	            var objForUpdate = (_a = {},
	                _a[collentName] = (_b = {},
	                    _b[name] = { $set: v },
	                    _b
	                ),
	                _a
	            );
	            var newState = update(this.state, objForUpdate);
	            this.setState(newState);
	            var _a, _b;
	        };
	        GirdForm.prototype.setInputValueMuti = function (collentName, name, v) {
	            var objForUpdate = (_a = {}, _a[collentName] = {}, _a);
	            for (var i in name) {
	                var item = name[i];
	                var value = v[i];
	                objForUpdate[collentName][item] = { $set: value };
	            }
	            var newState = update(this.state, objForUpdate);
	            this.setState(newState);
	            var _a;
	        };
	        GirdForm.prototype.setChangeDate = function (collentName, name, date) {
	            var v = date == null ? null : date.format();
	            var objForUpdate = (_a = {},
	                _a[collentName] = (_b = {},
	                    _b[name] = {
	                        $set: v
	                    },
	                    _b
	                ),
	                _a
	            );
	            var newState = update(this.state, objForUpdate);
	            this.setState(newState);
	            var _a, _b;
	        };
	        GirdForm.prototype.render = function () {
	            var _this = this;
	            var outHtml = null;
	            var GridNavPage = CommCmpt.GridNavPage;
	            if (this.state.edit_type == 0) {
	                var search = this.state.searchData;
	                outHtml =
	                    (React.createElement("div", null, React.createElement("ul", {className: "breadcrumb"}, React.createElement("li", null, React.createElement("i", {className: "fa-caret-right"}), " ", this.props.menuName), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", this.props.caption)), React.createElement("h3", {className: "h3"}, this.props.caption), React.createElement("form", {onSubmit: this.handleSearch}, React.createElement("div", {className: "table-responsive"}, React.createElement("div", {className: "table-header"}, React.createElement("div", {className: "table-filter"}, React.createElement("div", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only"}, "商家名稱"), " ", React.createElement("input", {type: "text", className: "form-control form-control-sm", onChange: this.changeGDValue.bind(this, 'keyword'), value: this.state.searchData.keyword, placeholder: "商家名稱"}), " ", React.createElement("button", {className: "btn btn-sm btn-primary", type: "submit"}, React.createElement("i", {className: "fa-search"}), " 搜尋"))))), React.createElement("table", {className: "table table-sm table-bordered table-striped"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "刪除"), React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "修改"), React.createElement("th", {style: { "width": "16%" }}, "商家名稱"), React.createElement("th", {style: { "width": "20%" }}, "標題"), React.createElement("th", {style: { "width": "20%" }}, "啟始日期"), React.createElement("th", {style: { "width": "20%" }}, "結束日期"), React.createElement("th", {style: { "width": "10%" }}, "狀態"))), React.createElement("tbody", null, this.state.gridData.rows.map(function (itemData, i) {
	                        return React.createElement(GridRow, {key: i, primKey: itemData.community_banner_id, itemData: itemData, removeItemSubmit: _this.removeItemSubmit, updateType: _this.updateType});
	                    })))), React.createElement(GridNavPage, {startCount: this.state.gridData.startcount, endCount: this.state.gridData.endcount, recordCount: this.state.gridData.records, totalPage: this.state.gridData.total, nowPage: this.state.gridData.page, queryGridData: this.queryGridData, insertType: this.insertType, deleteSubmit: this.deleteSubmit, showDelete: false}))));
	            }
	            else if (this.state.edit_type == 1 || this.state.edit_type == 2) {
	                var field = this.state.fieldData;
	                var mnt_start_date = CommFunc.MntV(field.start_date);
	                var mnt_end_date = CommFunc.MntV(field.end_date);
	                var end_date_disabled = mnt_start_date == null ? true : false;
	                var fldState = {
	                    label: field.state == 'A' ?
	                        React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, "狀態") :
	                        React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, "狀態"),
	                    tip: field.state == 'A' ?
	                        React.createElement("span", {className: "col-xs-1"}) :
	                        React.createElement("span", {className: "col-xs-1"}, React.createElement(CommCmpt.Tips, {comment: "關閉說明：即使日期目前仍在有效範圍也不會顯示在前台！"}))
	                };
	                var outHtml = (React.createElement("div", null, React.createElement("ul", {className: "breadcrumb"}, React.createElement("li", null, React.createElement("i", {className: "fa-caret-right"}), " ", this.props.menuName), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", this.props.caption), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", "資料維護")), React.createElement("h3", {className: "h3"}, " ", this.props.caption, " ", React.createElement("small", {className: "sub"}, React.createElement("i", {className: "fa-angle-double-right"}), " 資料維護")), React.createElement("form", {className: "form form-sm", onSubmit: this.handleSubmit}, React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, React.createElement("small", {className: "text-danger"}, "*"), " 標題"), React.createElement("div", {className: "col-xs-8"}, React.createElement("input", {type: "text", className: "form-control", onChange: this.changeFDValue.bind(this, 'title'), value: field.title, maxLength: 64, required: true}))), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, React.createElement("small", {className: "text-danger"}, "*"), " 所屬商家"), React.createElement("div", {className: "col-xs-8"}, React.createElement("select", {className: "form-control", required: true, value: field.community_id, onChange: this.changeFDValue.bind(this, 'community_id'), disabled: community_id != null}, React.createElement("option", {value: "請選擇", selected: true, disabled: true}), this.state.options_community.map(function (item, i) {
	                    return (React.createElement("option", {value: item.community_id, key: item.community_id}, item.community_name));
	                })))), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, "代表圖"), React.createElement("div", {className: "col-xs-8"}, React.createElement(CommCmpt.MasterImageUpload, {FileKind: "BannerList", MainId: field.community_banner_id, ParentEditType: this.state.edit_type, url_upload: gb_approot + 'Active/CommunityBanner/axFUpload', url_list: gb_approot + 'Active/CommunityBanner/axFList', url_delete: gb_approot + 'Active/CommunityBanner/axFDelete', url_sort: gb_approot + 'Active/CommunityBanner/axFSort'}), React.createElement("small", {className: "text-muted"}, "最多可上傳 1 張圖片"))), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, React.createElement("small", {className: "text-danger"}, "*"), " 刊登時間"), React.createElement("div", {className: "col-xs-4"}, React.createElement("div", {className: "input-group input-group-sm"}, React.createElement("span", {className: "input-group-addon"}, "起"), React.createElement(DatePicker, {selected: mnt_start_date, dateFormat: dt.dateFT, isClearable: true, required: true, locale: "zh-TW", showYearDropdown: true, minDate: Moment(), onChange: this.setChangeDate.bind(this, this.props.fdName, 'start_date'), className: "form-control"}))), React.createElement("div", {className: "col-xs-4"}, React.createElement("div", {className: "input-group input-group-sm"}, React.createElement("span", {className: "input-group-addon"}, "迄"), React.createElement(DatePicker, {selected: mnt_end_date, dateFormat: dt.dateFT, isClearable: true, required: true, locale: "zh-TW", showYearDropdown: true, onChange: this.setChangeDate.bind(this, this.props.fdName, 'end_date'), className: "form-control", minDate: mnt_start_date, disabled: end_date_disabled})))), React.createElement("div", {className: "form-group row"}, fldState.label, React.createElement("div", {className: "col-xs-4"}, React.createElement("select", {className: "form-control", required: true, value: field.state, onChange: this.changeFDValue.bind(this, 'state')}, React.createElement("option", {value: "A"}, "顯示"), React.createElement("option", {value: "C"}, "關閉"))), fldState.tip), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, "廣告內容"), React.createElement("div", {className: "col-xs-8"}, React.createElement("textarea", {type: "date", className: "form-control", id: "news_content", name: "news_content", value: field.context, onChange: this.changeFDValue.bind(this, 'context')}))), React.createElement("div", {className: "form-action"}, React.createElement("div", {className: "col-xs-offset-1"}, React.createElement("button", {type: "submit", className: "btn btn-sm btn-primary"}, React.createElement("i", {className: "fa-check"}), " 儲存"), " ", React.createElement("button", {type: "button", onClick: this.noneType, className: "btn btn-sm btn-secondary"}, React.createElement("i", {className: "fa-times"}), " 回前頁"))))));
	            }
	            return outHtml;
	        };
	        GirdForm.defaultProps = {
	            fdName: 'fieldData',
	            gdName: 'searchData',
	            apiPath: gb_approot + 'api/CommunityBanner'
	        };
	        return GirdForm;
	    }(React.Component));
	    CommunityBanner.GirdForm = GirdForm;
	})(CommunityBanner || (CommunityBanner = {}));
	var dom = document.getElementById('page_content');
	ReactDOM.render(React.createElement(CommunityBanner.GirdForm, {caption: gb_caption, menuName: gb_menuname, iconClass: "fa-list-alt"}), dom);


/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(506);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(508)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./react-datepicker.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./react-datepicker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(507)();
	// imports


	// module
	exports.push([module.id, ".react-datepicker__tether-element-attached-top .react-datepicker__triangle, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow {\n  margin-left: -8px;\n  position: absolute;\n}\n.react-datepicker__tether-element-attached-top .react-datepicker__triangle, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow, .react-datepicker__tether-element-attached-top .react-datepicker__triangle::before, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before {\n  box-sizing: content-box;\n  position: absolute;\n  border: 8px solid transparent;\n  height: 0;\n  width: 1px;\n}\n.react-datepicker__tether-element-attached-top .react-datepicker__triangle::before, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before {\n  content: \"\";\n  z-index: -1;\n  border-width: 8px;\n  left: -8px;\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker__tether-element-attached-top .react-datepicker__triangle {\n  top: 0;\n  margin-top: -8px;\n}\n.react-datepicker__tether-element-attached-top .react-datepicker__triangle, .react-datepicker__tether-element-attached-top .react-datepicker__triangle::before {\n  border-top: none;\n  border-bottom-color: #f0f0f0;\n}\n.react-datepicker__tether-element-attached-top .react-datepicker__triangle::before {\n  top: -1px;\n  border-bottom-color: #aeaeae;\n}\n\n.react-datepicker__tether-element-attached-bottom .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow {\n  bottom: 0;\n  margin-bottom: -8px;\n}\n.react-datepicker__tether-element-attached-bottom .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before {\n  border-bottom: none;\n  border-top-color: #fff;\n}\n.react-datepicker__tether-element-attached-bottom .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before {\n  bottom: -1px;\n  border-top-color: #aeaeae;\n}\n\n.react-datepicker {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 11px;\n  background-color: #fff;\n  color: #000;\n  border: 1px solid #aeaeae;\n  border-radius: 4px;\n  display: inline-block;\n  position: relative;\n}\n\n.react-datepicker__triangle {\n  position: absolute;\n  left: 50px;\n}\n\n.react-datepicker__tether-element-attached-bottom.react-datepicker__tether-element {\n  margin-top: -20px;\n}\n\n.react-datepicker__header {\n  text-align: center;\n  background-color: #f0f0f0;\n  border-bottom: 1px solid #aeaeae;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  padding-top: 8px;\n  position: relative;\n}\n\n.react-datepicker__current-month {\n  margin-top: 0;\n  color: #000;\n  font-weight: bold;\n  font-size: 13px;\n}\n.react-datepicker__current-month--hasYearDropdown {\n  margin-bottom: 16px;\n}\n\n.react-datepicker__navigation {\n  line-height: 24px;\n  text-align: center;\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  width: 0;\n  border: 6px solid transparent;\n}\n.react-datepicker__navigation--previous {\n  left: 10px;\n  border-right-color: #ccc;\n}\n.react-datepicker__navigation--previous:hover {\n  border-right-color: #b3b3b3;\n}\n.react-datepicker__navigation--next {\n  right: 10px;\n  border-left-color: #ccc;\n}\n.react-datepicker__navigation--next:hover {\n  border-left-color: #b3b3b3;\n}\n.react-datepicker__navigation--years {\n  position: relative;\n  top: 0;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.react-datepicker__navigation--years-previous {\n  top: 4px;\n  border-top-color: #ccc;\n}\n.react-datepicker__navigation--years-previous:hover {\n  border-top-color: #b3b3b3;\n}\n.react-datepicker__navigation--years-upcoming {\n  top: -4px;\n  border-bottom-color: #ccc;\n}\n.react-datepicker__navigation--years-upcoming:hover {\n  border-bottom-color: #b3b3b3;\n}\n\n.react-datepicker__month {\n  margin: 5px;\n  text-align: center;\n}\n\n.react-datepicker__day-name,\n.react-datepicker__day {\n  color: #000;\n  display: inline-block;\n  width: 24px;\n  line-height: 24px;\n  text-align: center;\n  margin: 2px;\n}\n\n.react-datepicker__day {\n  cursor: pointer;\n}\n.react-datepicker__day:hover {\n  border-radius: 4px;\n  background-color: #f0f0f0;\n}\n.react-datepicker__day--today {\n  font-weight: bold;\n}\n.react-datepicker__day--selected, .react-datepicker__day--in-range {\n  border-radius: 4px;\n  background-color: #216ba5;\n  color: #fff;\n}\n.react-datepicker__day--selected:hover, .react-datepicker__day--in-range:hover {\n  background-color: #1d5d90;\n}\n.react-datepicker__day--disabled {\n  cursor: default;\n  color: #ccc;\n}\n.react-datepicker__day--disabled:hover {\n  background-color: transparent;\n}\n\n.react-datepicker__input-container {\n  position: relative;\n  display: inline-block;\n}\n\n.react-datepicker__year-read-view {\n  width: 50%;\n  left: 25%;\n  position: absolute;\n  bottom: 25px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.react-datepicker__year-read-view:hover {\n  cursor: pointer;\n}\n.react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow {\n  border-top-color: #b3b3b3;\n}\n.react-datepicker__year-read-view--down-arrow {\n  border-top-color: #ccc;\n  margin-bottom: 3px;\n  left: 5px;\n  top: 9px;\n  position: relative;\n  border-width: 6px;\n}\n.react-datepicker__year-read-view--selected-year {\n  right: 6px;\n  position: relative;\n}\n\n.react-datepicker__year-dropdown {\n  background-color: #f0f0f0;\n  position: absolute;\n  width: 50%;\n  left: 25%;\n  top: 30px;\n  text-align: center;\n  border-radius: 4px;\n  border: 1px solid #aeaeae;\n}\n.react-datepicker__year-dropdown:hover {\n  cursor: pointer;\n}\n\n.react-datepicker__year-option {\n  line-height: 20px;\n  width: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.react-datepicker__year-option:first-of-type {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.react-datepicker__year-option:last-of-type {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.react-datepicker__year-option:hover {\n  background-color: #ccc;\n}\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming {\n  border-bottom-color: #b3b3b3;\n}\n.react-datepicker__year-option:hover .react-datepicker__navigation--years-previous {\n  border-top-color: #b3b3b3;\n}\n.react-datepicker__year-option--selected {\n  position: absolute;\n  left: 30px;\n}\n\n.react-datepicker__close-icon {\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  display: inline-block;\n  height: 0;\n  outline: 0;\n  padding: 0;\n  vertical-align: middle;\n}\n.react-datepicker__close-icon::after {\n  background-color: #216ba5;\n  border-radius: 50%;\n  bottom: 0;\n  box-sizing: border-box;\n  color: #fff;\n  content: \"\\D7\";\n  cursor: pointer;\n  font-size: 12px;\n  height: 16px;\n  width: 16px;\n  line-height: 1;\n  margin: -8px auto 0;\n  padding: 2px;\n  position: absolute;\n  right: 7px;\n  text-align: center;\n  top: 50%;\n}\n\n.react-datepicker__today-button {\n  background: #f0f0f0;\n  border-top: 1px solid #aeaeae;\n  cursor: pointer;\n  text-align: center;\n  font-weight: bold;\n  padding: 5px 0;\n}\n\n.react-datepicker__tether-element {\n  z-index: 2147483647;\n}\n", ""]);

	// exports


/***/ },

/***/ 507:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 511:
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(512),__webpack_require__(298),__webpack_require__(516),__webpack_require__(331)):"function"==typeof define&&define.amd?define(["moment","react","react-onclickoutside","react-dom"],t):"object"==typeof exports?exports.DatePicker=t(require("moment"),require("react"),require("react-onclickoutside"),require("react-dom")):e.DatePicker=t(e.moment,e.React,e.OnClickOutside,e.ReactDOM)}(this,function(e,t,n,o){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(1),i=o(a),s=n(5),l=o(s),p=n(3),d=o(p),f=n(13),u=o(f),c=n(12),h=o(c),m=n(4),y="react-datepicker-ignore-onclickoutside",g=d["default"].createClass({displayName:"DatePicker",propTypes:{autoComplete:d["default"].PropTypes.string,className:d["default"].PropTypes.string,dateFormat:d["default"].PropTypes.string,dateFormatCalendar:d["default"].PropTypes.string,disabled:d["default"].PropTypes.bool,endDate:d["default"].PropTypes.object,excludeDates:d["default"].PropTypes.array,filterDate:d["default"].PropTypes.func,fixedHeight:d["default"].PropTypes.bool,id:d["default"].PropTypes.string,includeDates:d["default"].PropTypes.array,inline:d["default"].PropTypes.bool,isClearable:d["default"].PropTypes.bool,locale:d["default"].PropTypes.string,maxDate:d["default"].PropTypes.object,minDate:d["default"].PropTypes.object,name:d["default"].PropTypes.string,onBlur:d["default"].PropTypes.func,onChange:d["default"].PropTypes.func.isRequired,onFocus:d["default"].PropTypes.func,openToDate:d["default"].PropTypes.object,placeholderText:d["default"].PropTypes.string,popoverAttachment:d["default"].PropTypes.string,popoverTargetAttachment:d["default"].PropTypes.string,popoverTargetOffset:d["default"].PropTypes.string,readOnly:d["default"].PropTypes.bool,renderCalendarTo:d["default"].PropTypes.any,required:d["default"].PropTypes.bool,selected:d["default"].PropTypes.object,showYearDropdown:d["default"].PropTypes.bool,startDate:d["default"].PropTypes.object,tabIndex:d["default"].PropTypes.number,tetherConstraints:d["default"].PropTypes.array,title:d["default"].PropTypes.string,todayButton:d["default"].PropTypes.string},getDefaultProps:function(){return{dateFormatCalendar:"MMMM YYYY",onChange:function(){},disabled:!1,onFocus:function(){},onBlur:function(){},popoverAttachment:"top left",popoverTargetAttachment:"bottom left",popoverTargetOffset:"10px 0",tetherConstraints:[{to:"window",attachment:"together"}]}},getInitialState:function(){return{open:!1}},setOpen:function(e){this.setState({open:e})},handleFocus:function(e){this.props.onFocus(e),this.setOpen(!0)},handleBlur:function(e){this.state.open?this.refs.input.focus():this.props.onBlur(e)},handleCalendarClickOutside:function(e){this.setOpen(!1)},handleSelect:function(e){this.setSelected(e),this.setOpen(!1)},setSelected:function(e){(0,m.isSameDay)(this.props.selected,e)||this.props.onChange(e)},onInputClick:function(){this.props.disabled||this.setOpen(!0)},onInputKeyDown:function(e){"Enter"===e.key||"Escape"===e.key?(e.preventDefault(),this.setOpen(!1)):"Tab"===e.key&&this.setOpen(!1)},onClearClick:function(e){e.preventDefault(),this.props.onChange(null)},renderCalendar:function(){return this.props.inline||this.state.open&&!this.props.disabled?d["default"].createElement(l["default"],{ref:"calendar",locale:this.props.locale,dateFormat:this.props.dateFormatCalendar,selected:this.props.selected,onSelect:this.handleSelect,openToDate:this.props.openToDate,minDate:this.props.minDate,maxDate:this.props.maxDate,startDate:this.props.startDate,endDate:this.props.endDate,excludeDates:this.props.excludeDates,filterDate:this.props.filterDate,onClickOutside:this.handleCalendarClickOutside,includeDates:this.props.includeDates,showYearDropdown:this.props.showYearDropdown,todayButton:this.props.todayButton,outsideClickIgnoreClass:y,fixedHeight:this.props.fixedHeight}):null},renderDateInput:function(){var e=(0,h["default"])(this.props.className,r({},y,this.state.open));return d["default"].createElement(i["default"],{ref:"input",id:this.props.id,name:this.props.name,date:this.props.selected,locale:this.props.locale,minDate:this.props.minDate,maxDate:this.props.maxDate,excludeDates:this.props.excludeDates,includeDates:this.props.includeDates,filterDate:this.props.filterDate,dateFormat:this.props.dateFormat,onFocus:this.handleFocus,onBlur:this.handleBlur,onClick:this.onInputClick,onKeyDown:this.onInputKeyDown,onChangeDate:this.setSelected,placeholder:this.props.placeholderText,disabled:this.props.disabled,autoComplete:this.props.autoComplete,className:e,title:this.props.title,readOnly:this.props.readOnly,required:this.props.required,tabIndex:this.props.tabIndex})},renderClearButton:function(){return this.props.isClearable&&null!=this.props.selected?d["default"].createElement("a",{className:"react-datepicker__close-icon",href:"#",onClick:this.onClearClick}):null},render:function(){var e=this.renderCalendar();return this.props.inline?e:d["default"].createElement(u["default"],{classPrefix:"react-datepicker__tether",attachment:this.props.popoverAttachment,targetAttachment:this.props.popoverTargetAttachment,targetOffset:this.props.popoverTargetOffset,renderElementTo:this.props.renderCalendarTo,constraints:this.props.tetherConstraints},d["default"].createElement("div",{className:"react-datepicker__input-container"},this.renderDateInput(),this.renderClearButton()),e)}});e.exports=g},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=n(2),s=o(i),l=n(3),p=o(l),d=n(4),f=p["default"].createClass({displayName:"DateInput",propTypes:{date:p["default"].PropTypes.object,dateFormat:p["default"].PropTypes.string,disabled:p["default"].PropTypes.bool,excludeDates:p["default"].PropTypes.array,filterDate:p["default"].PropTypes.func,includeDates:p["default"].PropTypes.array,locale:p["default"].PropTypes.string,maxDate:p["default"].PropTypes.object,minDate:p["default"].PropTypes.object,onBlur:p["default"].PropTypes.func,onChange:p["default"].PropTypes.func,onChangeDate:p["default"].PropTypes.func},getDefaultProps:function(){return{dateFormat:"L"}},getInitialState:function(){return{value:this.safeDateFormat(this.props)}},componentWillReceiveProps:function(e){(0,d.isSameDay)(e.date,this.props.date)&&e.locale===this.props.locale&&e.dateFormat===this.props.dateFormat||this.setState({value:this.safeDateFormat(e)})},handleChange:function(e){this.props.onChange&&this.props.onChange(e),e.isDefaultPrevented()||this.handleChangeDate(e.target.value)},handleChangeDate:function(e){if(this.props.onChangeDate){var t=(0,s["default"])(e,this.props.dateFormat,this.props.locale||s["default"].locale(),!0);t.isValid()&&!(0,d.isDayDisabled)(t,this.props)?this.props.onChangeDate(t):""===e&&this.props.onChangeDate(null)}this.setState({value:e})},safeDateFormat:function(e){return e.date&&e.date.clone().locale(e.locale||s["default"].locale()).format(e.dateFormat)||""},handleBlur:function(e){this.setState({value:this.safeDateFormat(this.props)}),this.props.onBlur&&this.props.onBlur(e)},focus:function(){this.refs.input.focus()},render:function(){var e=this.props,t=(e.date,e.locale,e.minDate,e.maxDate,e.excludeDates,e.includeDates,e.filterDate,e.dateFormat,e.onChangeDate,r(e,["date","locale","minDate","maxDate","excludeDates","includeDates","filterDate","dateFormat","onChangeDate"]));return p["default"].createElement("input",a({ref:"input",type:"text"},t,{value:this.state.value,onBlur:this.handleBlur,onChange:this.handleChange}))}});e.exports=f},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){return e&&t?e.isSame(t,"day"):!e&&!t}function a(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=t.minDate,o=t.maxDate,a=t.excludeDates,i=t.includeDates,s=t.filterDate;return n&&e.isBefore(n,"day")||o&&e.isAfter(o,"day")||a&&a.some(function(t){return r(e,t)})||i&&!i.some(function(t){return r(e,t)})||s&&!s(e.clone())||!1}function i(e,t){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=n.minDate,r=n.includeDates,a=e.clone().subtract(1,t);return o&&a.isBefore(o,t)||r&&r.every(function(e){return a.isBefore(e,t)})||!1}function s(e,t){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=n.maxDate,r=n.includeDates,a=e.clone().add(1,t);return o&&a.isAfter(o,t)||r&&r.every(function(e){return a.isAfter(e,t)})||!1}function l(e){var t=e.minDate,n=e.includeDates;return n&&t?f["default"].min(n.filter(function(e){return t.isSameOrBefore(e,"day")})):n?f["default"].min(n):t}function p(e){var t=e.maxDate,n=e.includeDates;return n&&t?f["default"].max(n.filter(function(e){return t.isSameOrAfter(e,"day")})):n?f["default"].max(n):t}Object.defineProperty(t,"__esModule",{value:!0}),t.isSameDay=r,t.isDayDisabled=a,t.allDaysDisabledBefore=i,t.allDaysDisabledAfter=s,t.getEffectiveMinDate=l,t.getEffectiveMaxDate=p;var d=n(2),f=o(d)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(2),a=o(r),i=n(6),s=o(i),l=n(9),p=o(l),d=n(3),f=o(d),u=n(4),c=f["default"].createClass({displayName:"Calendar",propTypes:{dateFormat:f["default"].PropTypes.string.isRequired,endDate:f["default"].PropTypes.object,excludeDates:f["default"].PropTypes.array,filterDate:f["default"].PropTypes.func,fixedHeight:f["default"].PropTypes.bool,includeDates:f["default"].PropTypes.array,locale:f["default"].PropTypes.string,maxDate:f["default"].PropTypes.object,minDate:f["default"].PropTypes.object,onClickOutside:f["default"].PropTypes.func.isRequired,onSelect:f["default"].PropTypes.func.isRequired,openToDate:f["default"].PropTypes.object,selected:f["default"].PropTypes.object,showYearDropdown:f["default"].PropTypes.bool,startDate:f["default"].PropTypes.object,todayButton:f["default"].PropTypes.string},mixins:[n(8)],getInitialState:function(){return{date:this.localizeMoment(this.getDateInView())}},componentWillReceiveProps:function(e){e.selected&&!(0,u.isSameDay)(e.selected,this.props.selected)&&this.setState({date:this.localizeMoment(e.selected)})},handleClickOutside:function(e){this.props.onClickOutside(e)},getDateInView:function(){var e=this.props,t=e.selected,n=e.openToDate,o=(0,u.getEffectiveMinDate)(this.props),r=(0,u.getEffectiveMaxDate)(this.props),i=(0,a["default"])();return t?t:o&&r&&n&&n.isBetween(o,r)?n:o&&n&&n.isAfter(o)?n:o&&o.isAfter(i)?o:r&&n&&n.isBefore(r)?n:r&&r.isBefore(i)?r:n?n:i},localizeMoment:function(e){return e.clone().locale(this.props.locale||a["default"].locale())},increaseMonth:function(){this.setState({date:this.state.date.clone().add(1,"month")})},decreaseMonth:function(){this.setState({date:this.state.date.clone().subtract(1,"month")})},handleDayClick:function(e){this.props.onSelect(e)},changeYear:function(e){this.setState({date:this.state.date.clone().set("year",e)})},header:function(){var e=this.state.date.clone().startOf("week");return[0,1,2,3,4,5,6].map(function(t){var n=e.clone().add(t,"days");return f["default"].createElement("div",{key:t,className:"react-datepicker__day-name"},n.localeData().weekdaysMin(n))})},renderPreviousMonthButton:function(){if(!(0,u.allDaysDisabledBefore)(this.state.date,"month",this.props))return f["default"].createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--previous",onClick:this.decreaseMonth})},renderNextMonthButton:function(){if(!(0,u.allDaysDisabledAfter)(this.state.date,"month",this.props))return f["default"].createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--next",onClick:this.increaseMonth})},renderCurrentMonth:function(){var e=["react-datepicker__current-month"];return this.props.showYearDropdown&&e.push("react-datepicker__current-month--hasYearDropdown"),f["default"].createElement("div",{className:e.join(" ")},this.state.date.format(this.props.dateFormat))},renderYearDropdown:function(){if(this.props.showYearDropdown)return f["default"].createElement(s["default"],{onChange:this.changeYear,year:this.state.date.year()})},renderTodayButton:function(){var e=this;if(this.props.todayButton)return f["default"].createElement("div",{className:"react-datepicker__today-button",onClick:function(){return e.props.onSelect((0,a["default"])())}},this.props.todayButton)},render:function(){return f["default"].createElement("div",{className:"react-datepicker"},f["default"].createElement("div",{className:"react-datepicker__triangle"}),f["default"].createElement("div",{className:"react-datepicker__header"},this.renderPreviousMonthButton(),this.renderCurrentMonth(),this.renderYearDropdown(),this.renderNextMonthButton(),f["default"].createElement("div",null,this.header())),f["default"].createElement(p["default"],{day:this.state.date,onDayClick:this.handleDayClick,minDate:this.props.minDate,maxDate:this.props.maxDate,excludeDates:this.props.excludeDates,includeDates:this.props.includeDates,fixedHeight:this.props.fixedHeight,filterDate:this.props.filterDate,selected:this.props.selected,startDate:this.props.startDate,endDate:this.props.endDate}),this.renderTodayButton())}});e.exports=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(3),a=o(r),i=n(7),s=o(i),l=a["default"].createClass({displayName:"YearDropdown",propTypes:{onChange:a["default"].PropTypes.func.isRequired,year:a["default"].PropTypes.number.isRequired},getInitialState:function(){return{dropdownVisible:!1}},renderReadView:function(){return a["default"].createElement("div",{className:"react-datepicker__year-read-view",onClick:this.toggleDropdown},a["default"].createElement("span",{className:"react-datepicker__year-read-view--selected-year"},this.props.year),a["default"].createElement("span",{className:"react-datepicker__year-read-view--down-arrow"}))},renderDropdown:function(){return a["default"].createElement(s["default"],{ref:"options",year:this.props.year,onChange:this.onChange,onCancel:this.toggleDropdown})},onChange:function(e){this.toggleDropdown(),e!==this.props.year&&this.props.onChange(e)},toggleDropdown:function(){this.setState({dropdownVisible:!this.state.dropdownVisible})},render:function(){return a["default"].createElement("div",null,this.state.dropdownVisible?this.renderDropdown():this.renderReadView())}});e.exports=l},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e){for(var t=[],n=0;n<5;n++)t.push(e-n);return t}var a=n(3),i=o(a),s=i["default"].createClass({displayName:"YearDropdownOptions",propTypes:{onCancel:i["default"].PropTypes.func.isRequired,onChange:i["default"].PropTypes.func.isRequired,year:i["default"].PropTypes.number.isRequired},mixins:[n(8)],getInitialState:function(){return{yearsList:r(this.props.year)}},renderOptions:function(){var e=this,t=this.props.year,n=this.state.yearsList.map(function(n){return i["default"].createElement("div",{className:"react-datepicker__year-option",key:n,onClick:e.onChange.bind(e,n)},t===n?i["default"].createElement("span",{className:"react-datepicker__year-option--selected"},"✓"):"",n)});return n.unshift(i["default"].createElement("div",{className:"react-datepicker__year-option",ref:"upcoming",key:"upcoming",onClick:this.incrementYears},i["default"].createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"}))),n.push(i["default"].createElement("div",{className:"react-datepicker__year-option",ref:"previous",key:"previous",onClick:this.decrementYears},i["default"].createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"}))),n},onChange:function(e){this.props.onChange(e)},handleClickOutside:function(){this.props.onCancel()},shiftYears:function(e){var t=this.state.yearsList.map(function(t){return t+e});this.setState({yearsList:t})},incrementYears:function(){return this.shiftYears(1)},decrementYears:function(){return this.shiftYears(-1)},render:function(){return i["default"].createElement("div",{className:"react-datepicker__year-dropdown"},this.renderOptions())}});e.exports=s},function(e,t){e.exports=n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(3),a=o(r),i=n(10),s=o(i),l=a["default"].createClass({displayName:"Month",propTypes:{day:a["default"].PropTypes.object.isRequired,endDate:a["default"].PropTypes.object,excludeDates:a["default"].PropTypes.array,filterDate:a["default"].PropTypes.func,fixedHeight:a["default"].PropTypes.bool,includeDates:a["default"].PropTypes.array,maxDate:a["default"].PropTypes.object,minDate:a["default"].PropTypes.object,onDayClick:a["default"].PropTypes.func,selected:a["default"].PropTypes.object,startDate:a["default"].PropTypes.object},handleDayClick:function(e){this.props.onDayClick&&this.props.onDayClick(e)},isWeekInMonth:function(e){var t=this.props.day,n=e.clone().add(6,"days");return e.isSame(t,"month")||n.isSame(t,"month")},renderWeeks:function(){var e=this,t=this.props.day.clone().startOf("month").startOf("week");return[0,1,2,3,4,5].map(function(e){return t.clone().add(e,"weeks")}).filter(function(t){return e.props.fixedHeight||e.isWeekInMonth(t)}).map(function(t,n){return a["default"].createElement(s["default"],{key:n,day:t,month:e.props.day.month(),onDayClick:e.handleDayClick,minDate:e.props.minDate,maxDate:e.props.maxDate,excludeDates:e.props.excludeDates,includeDates:e.props.includeDates,filterDate:e.props.filterDate,selected:e.props.selected,startDate:e.props.startDate,endDate:e.props.endDate})})},render:function(){return a["default"].createElement("div",{className:"react-datepicker__month"},this.renderWeeks())}});e.exports=l},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(3),a=o(r),i=n(11),s=o(i),l=a["default"].createClass({displayName:"Week",propTypes:{day:a["default"].PropTypes.object.isRequired,endDate:a["default"].PropTypes.object,excludeDates:a["default"].PropTypes.array,filterDate:a["default"].PropTypes.func,includeDates:a["default"].PropTypes.array,maxDate:a["default"].PropTypes.object,minDate:a["default"].PropTypes.object,month:a["default"].PropTypes.number,onDayClick:a["default"].PropTypes.func,selected:a["default"].PropTypes.object,startDate:a["default"].PropTypes.object},handleDayClick:function(e){this.props.onDayClick&&this.props.onDayClick(e)},renderDays:function(){var e=this,t=this.props.day.clone().startOf("week");return[0,1,2,3,4,5,6].map(function(n){var o=t.clone().add(n,"days");return a["default"].createElement(s["default"],{key:n,day:o,month:e.props.month,onClick:e.handleDayClick.bind(e,o),minDate:e.props.minDate,maxDate:e.props.maxDate,excludeDates:e.props.excludeDates,includeDates:e.props.includeDates,filterDate:e.props.filterDate,selected:e.props.selected,startDate:e.props.startDate,endDate:e.props.endDate})})},render:function(){return a["default"].createElement("div",{className:"react-datepicker__week"},this.renderDays())}});e.exports=l},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=n(2),a=o(r),i=n(3),s=o(i),l=n(12),p=o(l),d=n(4),f=s["default"].createClass({displayName:"Day",propTypes:{day:s["default"].PropTypes.object.isRequired,endDate:s["default"].PropTypes.object,excludeDates:s["default"].PropTypes.array,filterDate:s["default"].PropTypes.func,includeDates:s["default"].PropTypes.array,maxDate:s["default"].PropTypes.object,minDate:s["default"].PropTypes.object,month:s["default"].PropTypes.number,onClick:s["default"].PropTypes.func,selected:s["default"].PropTypes.object,startDate:s["default"].PropTypes.object},handleClick:function(e){!this.isDisabled()&&this.props.onClick&&this.props.onClick(e)},isSameDay:function(e){return(0,d.isSameDay)(this.props.day,e)},isDisabled:function(){return(0,d.isDayDisabled)(this.props.day,this.props)},isInRange:function(){var e=this.props,t=e.day,n=e.startDate,o=e.endDate;if(!n||!o)return!1;var r=n.clone().startOf("day").subtract(1,"seconds"),a=o.clone().startOf("day").add(1,"seconds");return t.clone().startOf("day").isBetween(r,a)},isWeekend:function(){var e=this.props.day.day();return 0===e||6===e},isOutsideMonth:function(){return void 0!==this.props.month&&this.props.month!==this.props.day.month()},getClassNames:function(){return(0,p["default"])("react-datepicker__day",{"react-datepicker__day--disabled":this.isDisabled(),"react-datepicker__day--selected":this.isSameDay(this.props.selected),"react-datepicker__day--in-range":this.isInRange(),"react-datepicker__day--today":this.isSameDay((0,a["default"])()),"react-datepicker__day--weekend":this.isWeekend(),"react-datepicker__day--outside-month":this.isOutsideMonth()})},render:function(){return s["default"].createElement("div",{className:this.getClassNames(),onClick:this.handleClick},this.props.day.date())}});e.exports=f},function(e,t,n){var o,r;/*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/
	!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=typeof o;if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o))e.push(n.apply(null,o));else if("object"===r)for(var i in o)a.call(o,i)&&o[i]&&e.push(i)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=n:(o=[],r=function(){return n}.apply(t,o),!(void 0!==r&&(e.exports=r)))}()},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}function a(e,t,n){var o=e.children,r=s.Children.count(o);return r<=0?new Error(n+" expects at least one child to use as the target element."):r>2?new Error("Only a max of two children allowed in "+n+"."):void 0}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=n(3),l=o(s),p=n(14),d=o(p),f=n(15),u=o(f),c=["top left","top center","top right","middle left","middle center","middle right","bottom left","bottom center","bottom right"],h=l["default"].createClass({displayName:"TetherComponent",propTypes:{attachment:s.PropTypes.oneOf(c).isRequired,children:a,className:s.PropTypes.string,classPrefix:s.PropTypes.string,classes:s.PropTypes.object,constraints:s.PropTypes.array,enabled:s.PropTypes.bool,id:s.PropTypes.string,offset:s.PropTypes.string,optimizations:s.PropTypes.object,renderElementTag:s.PropTypes.string,renderElementTo:s.PropTypes.any,style:s.PropTypes.object,targetAttachment:s.PropTypes.oneOf(c),targetModifier:s.PropTypes.string,targetOffset:s.PropTypes.string},getDefaultProps:function(){return{renderElementTag:"div",renderElementTo:null}},componentDidMount:function(){this._targetNode=d["default"].findDOMNode(this),this._update()},componentDidUpdate:function(){this._update()},componentWillUnmount:function(){this._destroy()},disable:function(){this._tether.disable()},enable:function(){this._tether.enable()},position:function(){this._tether.position()},_destroy:function(){this._elementParentNode&&(d["default"].unmountComponentAtNode(this._elementParentNode),this._elementParentNode.parentNode.removeChild(this._elementParentNode)),this._tether&&this._tether.destroy(),this._elementParentNode=null,this._tether=null},_update:function(){var e=this,t=this.props,n=t.children,o=t.renderElementTag,r=t.renderElementTo,a=n[1];if(!a)return void(this._tether&&this._destroy());if(!this._elementParentNode){this._elementParentNode=document.createElement(o);var i=r||document.body;i.appendChild(this._elementParentNode)}d["default"].unstable_renderSubtreeIntoContainer(this,a,this._elementParentNode,function(){e._updateTether()})},_updateTether:function(){var e=this.props,t=(e.renderElementTag,e.renderElementTo,r(e,["renderElementTag","renderElementTo"])),n=i({target:this._targetNode,element:this._elementParentNode},t);this._tether?this._tether.setOptions(n):this._tether=new u["default"](n),this._tether.position()},render:function(){var e=this.props.children,t=null;return s.Children.forEach(e,function(e,n){if(0===n)return void(t=e)}),t}});e.exports=h},function(e,t){e.exports=o},function(e,t,n){var o,r;/*! tether 1.3.3 */
	!function(a,i){o=i,r="function"==typeof o?o.call(t,n,t,e):o,!(void 0!==r&&(e.exports=r))}(this,function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){var t=e.getBoundingClientRect(),n={};for(var o in t)n[o]=t[o];if(e.ownerDocument!==document){var a=e.ownerDocument.defaultView.frameElement;if(a){var i=r(a);n.top+=i.top,n.bottom+=i.top,n.left+=i.left,n.right+=i.left}}return n}function a(e){var t=getComputedStyle(e)||{},n=t.position,o=[];if("fixed"===n)return[e];for(var r=e;(r=r.parentNode)&&r&&1===r.nodeType;){var a=void 0;try{a=getComputedStyle(r)}catch(i){}if("undefined"==typeof a||null===a)return o.push(r),o;var s=a,l=s.overflow,p=s.overflowX,d=s.overflowY;/(auto|scroll)/.test(l+d+p)&&("absolute"!==n||["relative","absolute","fixed"].indexOf(a.position)>=0)&&o.push(r)}return o.push(e.ownerDocument.body),e.ownerDocument!==document&&o.push(e.ownerDocument.defaultView),o}function i(){_&&document.body.removeChild(_),_=null}function s(e){var t=void 0;e===document?(t=document,e=document.documentElement):t=e.ownerDocument;var n=t.documentElement,o=r(e),a=k();return o.top-=a.top,o.left-=a.left,"undefined"==typeof o.width&&(o.width=document.body.scrollWidth-o.left-o.right),"undefined"==typeof o.height&&(o.height=document.body.scrollHeight-o.top-o.bottom),o.top=o.top-n.clientTop,o.left=o.left-n.clientLeft,o.right=t.body.clientWidth-o.width-o.left,o.bottom=t.body.clientHeight-o.height-o.top,o}function l(e){return e.offsetParent||document.documentElement}function p(){var e=document.createElement("div");e.style.width="100%",e.style.height="200px";var t=document.createElement("div");d(t.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);var n=e.offsetWidth;t.style.overflow="scroll";var o=e.offsetWidth;n===o&&(o=t.clientWidth),document.body.removeChild(t);var r=n-o;return{width:r,height:r}}function d(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=[];return Array.prototype.push.apply(t,arguments),t.slice(1).forEach(function(t){if(t)for(var n in t)({}).hasOwnProperty.call(t,n)&&(e[n]=t[n])}),e}function f(e,t){if("undefined"!=typeof e.classList)t.split(" ").forEach(function(t){t.trim()&&e.classList.remove(t)});else{var n=new RegExp("(^| )"+t.split(" ").join("|")+"( |$)","gi"),o=h(e).replace(n," ");m(e,o)}}function u(e,t){if("undefined"!=typeof e.classList)t.split(" ").forEach(function(t){t.trim()&&e.classList.add(t)});else{f(e,t);var n=h(e)+(" "+t);m(e,n)}}function c(e,t){if("undefined"!=typeof e.classList)return e.classList.contains(t);var n=h(e);return new RegExp("(^| )"+t+"( |$)","gi").test(n)}function h(e){return e.className instanceof e.ownerDocument.defaultView.SVGAnimatedString?e.className.baseVal:e.className}function m(e,t){e.setAttribute("class",t)}function y(e,t,n){n.forEach(function(n){t.indexOf(n)===-1&&c(e,n)&&f(e,n)}),t.forEach(function(t){c(e,t)||u(e,t)})}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function v(e,t){var n=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return e+n>=t&&t>=e-n}function b(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function D(){for(var e={top:0,left:0},t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return n.forEach(function(t){var n=t.top,o=t.left;"string"==typeof n&&(n=parseFloat(n,10)),"string"==typeof o&&(o=parseFloat(o,10)),e.top+=n,e.left+=o}),e}function C(e,t){return"string"==typeof e.left&&e.left.indexOf("%")!==-1&&(e.left=parseFloat(e.left,10)/100*t.width),"string"==typeof e.top&&e.top.indexOf("%")!==-1&&(e.top=parseFloat(e.top,10)/100*t.height),e}function T(e,t){return"scrollParent"===t?t=e.scrollParents[0]:"window"===t&&(t=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),t===document&&(t=t.documentElement),"undefined"!=typeof t.nodeType&&!function(){var e=t,n=s(t),o=n,r=getComputedStyle(t);if(t=[o.left,o.top,n.width+o.left,n.height+o.top],e.ownerDocument!==document){var a=e.ownerDocument.defaultView;t[0]+=a.pageXOffset,t[1]+=a.pageYOffset,t[2]+=a.pageXOffset,t[3]+=a.pageYOffset}K.forEach(function(e,n){e=e[0].toUpperCase()+e.substr(1),"Top"===e||"Left"===e?t[n]+=parseFloat(r["border"+e+"Width"]):t[n]-=parseFloat(r["border"+e+"Width"])})}(),t}var w=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),P=void 0;"undefined"==typeof P&&(P={modules:[]});var _=null,x=function(){var e=0;return function(){return++e}}(),O={},k=function(){var e=_;e||(e=document.createElement("div"),e.setAttribute("data-tether-id",x()),d(e.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(e),_=e);var t=e.getAttribute("data-tether-id");return"undefined"==typeof O[t]&&(O[t]=r(e),j(function(){delete O[t]})),O[t]},E=[],j=function(e){E.push(e)},S=function(){for(var e=void 0;e=E.pop();)e()},N=function(){function e(){o(this,e)}return w(e,[{key:"on",value:function(e,t,n){var o=!(arguments.length<=3||void 0===arguments[3])&&arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[e]&&(this.bindings[e]=[]),this.bindings[e].push({handler:t,ctx:n,once:o})}},{key:"once",value:function(e,t,n){this.on(e,t,n,!0)}},{key:"off",value:function(e,t){if("undefined"!=typeof this.bindings&&"undefined"!=typeof this.bindings[e])if("undefined"==typeof t)delete this.bindings[e];else for(var n=0;n<this.bindings[e].length;)this.bindings[e][n].handler===t?this.bindings[e].splice(n,1):++n}},{key:"trigger",value:function(e){if("undefined"!=typeof this.bindings&&this.bindings[e]){for(var t=0,n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];for(;t<this.bindings[e].length;){var a=this.bindings[e][t],i=a.handler,s=a.ctx,l=a.once,p=s;"undefined"==typeof p&&(p=this),i.apply(p,o),l?this.bindings[e].splice(t,1):++t}}}}]),e}();P.Utils={getActualBoundingClientRect:r,getScrollParents:a,getBounds:s,getOffsetParent:l,extend:d,addClass:u,removeClass:f,hasClass:c,updateClasses:y,defer:j,flush:S,uniqueId:x,Evented:N,getScrollBarSize:p,removeUtilElements:i};var M=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(l){r=!0,a=l}finally{try{!o&&s["return"]&&s["return"]()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),A=function(e,t,n){for(var o=!0;o;){var r=e,a=t,i=n;o=!1,null===r&&(r=Function.prototype);var s=Object.getOwnPropertyDescriptor(r,a);if(void 0!==s){if("value"in s)return s.value;var l=s.get;if(void 0===l)return;return l.call(i)}var p=Object.getPrototypeOf(r);if(null===p)return;e=p,t=a,n=i,o=!0,s=p=void 0}};if("undefined"==typeof P)throw new Error("You must include the utils.js file before tether.js");var B=P.Utils,a=B.getScrollParents,s=B.getBounds,l=B.getOffsetParent,d=B.extend,u=B.addClass,f=B.removeClass,y=B.updateClasses,j=B.defer,S=B.flush,p=B.getScrollBarSize,i=B.removeUtilElements,F=function(){if("undefined"==typeof document)return"";for(var e=document.createElement("div"),t=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],n=0;n<t.length;++n){var o=t[n];if(void 0!==e.style[o])return o}}(),Y=[],W=function(){Y.forEach(function(e){e.position(!1)}),S()};!function(){var e=null,t=null,n=null,o=function r(){return"undefined"!=typeof t&&t>16?(t=Math.min(t-16,250),void(n=setTimeout(r,250))):void("undefined"!=typeof e&&b()-e<10||(null!=n&&(clearTimeout(n),n=null),e=b(),W(),t=b()-e))};"undefined"!=typeof window&&"undefined"!=typeof window.addEventListener&&["resize","scroll","touchmove"].forEach(function(e){window.addEventListener(e,o)})}();var q={center:"center",left:"right",right:"left"},I={middle:"middle",top:"bottom",bottom:"top"},R={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},z=function(e,t){var n=e.left,o=e.top;return"auto"===n&&(n=q[t.left]),"auto"===o&&(o=I[t.top]),{left:n,top:o}},H=function(e){var t=e.left,n=e.top;return"undefined"!=typeof R[e.left]&&(t=R[e.left]),"undefined"!=typeof R[e.top]&&(n=R[e.top]),{left:t,top:n}},L=function(e){var t=e.split(" "),n=M(t,2),o=n[0],r=n[1];return{top:o,left:r}},V=L,X=function(e){function t(e){var n=this;o(this,t),A(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.position=this.position.bind(this),Y.push(this),this.history=[],this.setOptions(e,!1),P.modules.forEach(function(e){"undefined"!=typeof e.initialize&&e.initialize.call(n)}),this.position()}return g(t,e),w(t,[{key:"getClass",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=this.options.classes;return"undefined"!=typeof t&&t[e]?this.options.classes[e]:this.options.classPrefix?this.options.classPrefix+"-"+e:e}},{key:"setOptions",value:function(e){var t=this,n=arguments.length<=1||void 0===arguments[1]||arguments[1],o={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=d(o,e);var r=this.options,i=r.element,s=r.target,l=r.targetModifier;if(this.element=i,this.target=s,this.targetModifier=l,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(e){if("undefined"==typeof t[e])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof t[e].jquery?t[e]=t[e][0]:"string"==typeof t[e]&&(t[e]=document.querySelector(t[e]))}),u(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&u(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=V(this.options.targetAttachment),this.attachment=V(this.options.attachment),this.offset=L(this.options.offset),this.targetOffset=L(this.options.targetOffset),"undefined"!=typeof this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=a(this.target),this.options.enabled!==!1&&this.enable(n)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return s(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var e=s(this.target),t={height:e.height,width:e.width,top:e.top,left:e.left};return t.height=Math.min(t.height,e.height-(pageYOffset-e.top)),t.height=Math.min(t.height,e.height-(e.top+e.height-(pageYOffset+innerHeight))),t.height=Math.min(innerHeight,t.height),t.height-=2,t.width=Math.min(t.width,e.width-(pageXOffset-e.left)),t.width=Math.min(t.width,e.width-(e.left+e.width-(pageXOffset+innerWidth))),t.width=Math.min(innerWidth,t.width),t.width-=2,t.top<pageYOffset&&(t.top=pageYOffset),t.left<pageXOffset&&(t.left=pageXOffset),t}if("scroll-handle"===this.targetModifier){var e=void 0,n=this.target;n===document.body?(n=document.documentElement,e={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):e=s(n);var o=getComputedStyle(n),r=n.scrollWidth>n.clientWidth||[o.overflow,o.overflowX].indexOf("scroll")>=0||this.target!==document.body,a=0;r&&(a=15);var i=e.height-parseFloat(o.borderTopWidth)-parseFloat(o.borderBottomWidth)-a,t={width:15,height:.975*i*(i/n.scrollHeight),left:e.left+e.width-parseFloat(o.borderLeftWidth)-15},l=0;i<408&&this.target===document.body&&(l=-11e-5*Math.pow(i,2)-.00727*i+22.58),this.target!==document.body&&(t.height=Math.max(t.height,24));var p=this.target.scrollTop/(n.scrollHeight-i);return t.top=p*(i-t.height-l)+e.top+parseFloat(o.borderTopWidth),this.target===document.body&&(t.height=Math.max(t.height,24)),t}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(e,t){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[e]&&(this._cache[e]=t.call(this)),this._cache[e]}},{key:"enable",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0];this.options.addTargetClasses!==!1&&u(this.target,this.getClass("enabled")),u(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach(function(t){t!==e.target.ownerDocument&&t.addEventListener("scroll",e.position)}),t&&this.position()}},{key:"disable",value:function(){var e=this;f(this.target,this.getClass("enabled")),f(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParents&&this.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.position)})}},{key:"destroy",value:function(){var e=this;this.disable(),Y.forEach(function(t,n){t===e&&Y.splice(n,1)}),0===Y.length&&i()}},{key:"updateAttachClasses",value:function(e,t){var n=this;e=e||this.attachment,t=t||this.targetAttachment;var o=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var r=this._addAttachClasses;e.top&&r.push(this.getClass("element-attached")+"-"+e.top),e.left&&r.push(this.getClass("element-attached")+"-"+e.left),t.top&&r.push(this.getClass("target-attached")+"-"+t.top),t.left&&r.push(this.getClass("target-attached")+"-"+t.left);var a=[];o.forEach(function(e){a.push(n.getClass("element-attached")+"-"+e),a.push(n.getClass("target-attached")+"-"+e)}),j(function(){"undefined"!=typeof n._addAttachClasses&&(y(n.element,n._addAttachClasses,a),n.options.addTargetClasses!==!1&&y(n.target,n._addAttachClasses,a),delete n._addAttachClasses)})}},{key:"position",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(this.enabled){this.clearCache();var n=z(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,n);var o=this.cache("element-bounds",function(){return s(e.element)}),r=o.width,a=o.height;if(0===r&&0===a&&"undefined"!=typeof this.lastSize){var i=this.lastSize;r=i.width,a=i.height}else this.lastSize={width:r,height:a};var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),f=d,u=C(H(this.attachment),{width:r,height:a}),c=C(H(n),f),h=C(this.offset,{width:r,height:a}),m=C(this.targetOffset,f);u=D(u,h),c=D(c,m);for(var y=d.left+c.left-u.left,g=d.top+c.top-u.top,v=0;v<P.modules.length;++v){var b=P.modules[v],T=b.position.call(this,{left:y,top:g,targetAttachment:n,targetPos:d,elementPos:o,offset:u,targetOffset:c,manualOffset:h,manualTargetOffset:m,scrollbarSize:O,attachment:this.attachment});if(T===!1)return!1;"undefined"!=typeof T&&"object"==typeof T&&(g=T.top,y=T.left)}var w={page:{top:g,left:y},viewport:{top:g-pageYOffset,bottom:pageYOffset-g-a+innerHeight,left:y-pageXOffset,right:pageXOffset-y-r+innerWidth}},_=this.target.ownerDocument,x=_.defaultView,O=void 0;return _.body.scrollWidth>x.innerWidth&&(O=this.cache("scrollbar-size",p),w.viewport.bottom-=O.height),_.body.scrollHeight>x.innerHeight&&(O=this.cache("scrollbar-size",p),w.viewport.right-=O.width),["","static"].indexOf(_.body.style.position)!==-1&&["","static"].indexOf(_.body.parentElement.style.position)!==-1||(w.page.bottom=_.body.scrollHeight-g-a,w.page.right=_.body.scrollWidth-y-r),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var t=e.cache("target-offsetparent",function(){return l(e.target)}),n=e.cache("target-offsetparent-bounds",function(){return s(t)}),o=getComputedStyle(t),r=n,a={};if(["Top","Left","Bottom","Right"].forEach(function(e){a[e.toLowerCase()]=parseFloat(o["border"+e+"Width"])}),n.right=_.body.scrollWidth-n.left-r.width+a.right,n.bottom=_.body.scrollHeight-n.top-r.height+a.bottom,w.page.top>=n.top+a.top&&w.page.bottom>=n.bottom&&w.page.left>=n.left+a.left&&w.page.right>=n.right){var i=t.scrollTop,p=t.scrollLeft;w.offset={top:w.page.top-n.top+i-a.top,left:w.page.left-n.left+p-a.left}}}(),this.move(w),this.history.unshift(w),this.history.length>3&&this.history.pop(),t&&S(),!0}}},{key:"move",value:function(e){var t=this;if("undefined"!=typeof this.element.parentNode){var n={};for(var o in e){n[o]={};for(var r in e[o]){for(var a=!1,i=0;i<this.history.length;++i){var s=this.history[i];if("undefined"!=typeof s[o]&&!v(s[o][r],e[o][r])){a=!0;break}}a||(n[o][r]=!0)}}var p={top:"",left:"",right:"",bottom:""},f=function(e,n){var o="undefined"!=typeof t.options.optimizations,r=o?t.options.optimizations.gpu:null;if(r!==!1){var a=void 0,i=void 0;e.top?(p.top=0,a=n.top):(p.bottom=0,a=-n.bottom),e.left?(p.left=0,i=n.left):(p.right=0,i=-n.right),p[F]="translateX("+Math.round(i)+"px) translateY("+Math.round(a)+"px)","msTransform"!==F&&(p[F]+=" translateZ(0)")}else e.top?p.top=n.top+"px":p.bottom=n.bottom+"px",e.left?p.left=n.left+"px":p.right=n.right+"px"},u=!1;if((n.page.top||n.page.bottom)&&(n.page.left||n.page.right)?(p.position="absolute",f(n.page,e.page)):(n.viewport.top||n.viewport.bottom)&&(n.viewport.left||n.viewport.right)?(p.position="fixed",f(n.viewport,e.viewport)):"undefined"!=typeof n.offset&&n.offset.top&&n.offset.left?!function(){p.position="absolute";var o=t.cache("target-offsetparent",function(){return l(t.target)});l(t.element)!==o&&j(function(){t.element.parentNode.removeChild(t.element),o.appendChild(t.element)}),f(n.offset,e.offset),u=!0}():(p.position="absolute",f({top:!0,left:!0},e.page)),!u){for(var c=!0,h=this.element.parentNode;h&&1===h.nodeType&&"BODY"!==h.tagName;){if("static"!==getComputedStyle(h).position){c=!1;break}h=h.parentNode}c||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var m={},y=!1;for(var r in p){var g=p[r],b=this.element.style[r];b!==g&&(y=!0,m[r]=g)}y&&j(function(){d(t.element.style,m)})}}}]),t}(N);X.modules=[],P.position=W;var U=d(X,P),M=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(l){r=!0,a=l}finally{try{!o&&s["return"]&&s["return"]()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),B=P.Utils,s=B.getBounds,d=B.extend,y=B.updateClasses,j=B.defer,K=["left","top","right","bottom"];P.modules.push({position:function(e){var t=this,n=e.top,o=e.left,r=e.targetAttachment;if(!this.options.constraints)return!0;var a=this.cache("element-bounds",function(){return s(t.element)}),i=a.height,l=a.width;if(0===l&&0===i&&"undefined"!=typeof this.lastSize){var p=this.lastSize;l=p.width,i=p.height}var f=this.cache("target-bounds",function(){return t.getTargetBounds()}),u=f.height,c=f.width,h=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(e){var t=e.outOfBoundsClass,n=e.pinnedClass;t&&h.push(t),n&&h.push(n)}),h.forEach(function(e){["left","top","right","bottom"].forEach(function(t){h.push(e+"-"+t)})});var m=[],g=d({},r),v=d({},this.attachment);return this.options.constraints.forEach(function(e){var a=e.to,s=e.attachment,p=e.pin;"undefined"==typeof s&&(s="");var d=void 0,f=void 0;if(s.indexOf(" ")>=0){var h=s.split(" "),y=M(h,2);f=y[0],d=y[1]}else d=f=s;var b=T(t,a);"target"!==f&&"both"!==f||(n<b[1]&&"top"===g.top&&(n+=u,g.top="bottom"),n+i>b[3]&&"bottom"===g.top&&(n-=u,g.top="top")),"together"===f&&("top"===g.top&&("bottom"===v.top&&n<b[1]?(n+=u,g.top="bottom",n+=i,v.top="top"):"top"===v.top&&n+i>b[3]&&n-(i-u)>=b[1]&&(n-=i-u,g.top="bottom",v.top="bottom")),"bottom"===g.top&&("top"===v.top&&n+i>b[3]?(n-=u,g.top="top",n-=i,v.top="bottom"):"bottom"===v.top&&n<b[1]&&n+(2*i-u)<=b[3]&&(n+=i-u,g.top="top",v.top="top")),"middle"===g.top&&(n+i>b[3]&&"top"===v.top?(n-=i,v.top="bottom"):n<b[1]&&"bottom"===v.top&&(n+=i,v.top="top"))),"target"!==d&&"both"!==d||(o<b[0]&&"left"===g.left&&(o+=c,g.left="right"),o+l>b[2]&&"right"===g.left&&(o-=c,g.left="left")),"together"===d&&(o<b[0]&&"left"===g.left?"right"===v.left?(o+=c,g.left="right",o+=l,v.left="left"):"left"===v.left&&(o+=c,g.left="right",o-=l,v.left="right"):o+l>b[2]&&"right"===g.left?"left"===v.left?(o-=c,g.left="left",o-=l,v.left="right"):"right"===v.left&&(o-=c,g.left="left",o+=l,v.left="left"):"center"===g.left&&(o+l>b[2]&&"left"===v.left?(o-=l,v.left="right"):o<b[0]&&"right"===v.left&&(o+=l,v.left="left"))),"element"!==f&&"both"!==f||(n<b[1]&&"bottom"===v.top&&(n+=i,v.top="top"),n+i>b[3]&&"top"===v.top&&(n-=i,v.top="bottom")),"element"!==d&&"both"!==d||(o<b[0]&&("right"===v.left?(o+=l,v.left="left"):"center"===v.left&&(o+=l/2,v.left="left")),o+l>b[2]&&("left"===v.left?(o-=l,v.left="right"):"center"===v.left&&(o-=l/2,v.left="right"))),"string"==typeof p?p=p.split(",").map(function(e){return e.trim()}):p===!0&&(p=["top","left","right","bottom"]),p=p||[];var D=[],C=[];n<b[1]&&(p.indexOf("top")>=0?(n=b[1],D.push("top")):C.push("top")),n+i>b[3]&&(p.indexOf("bottom")>=0?(n=b[3]-i,D.push("bottom")):C.push("bottom")),o<b[0]&&(p.indexOf("left")>=0?(o=b[0],D.push("left")):C.push("left")),o+l>b[2]&&(p.indexOf("right")>=0?(o=b[2]-l,D.push("right")):C.push("right")),D.length&&!function(){var e=void 0;e="undefined"!=typeof t.options.pinnedClass?t.options.pinnedClass:t.getClass("pinned"),m.push(e),D.forEach(function(t){m.push(e+"-"+t)})}(),C.length&&!function(){var e=void 0;e="undefined"!=typeof t.options.outOfBoundsClass?t.options.outOfBoundsClass:t.getClass("out-of-bounds"),m.push(e),C.forEach(function(t){m.push(e+"-"+t)})}(),(D.indexOf("left")>=0||D.indexOf("right")>=0)&&(v.left=g.left=!1),(D.indexOf("top")>=0||D.indexOf("bottom")>=0)&&(v.top=g.top=!1),g.top===r.top&&g.left===r.left&&v.top===t.attachment.top&&v.left===t.attachment.left||(t.updateAttachClasses(v,g),t.trigger("update",{attachment:v,targetAttachment:g}))}),j(function(){t.options.addTargetClasses!==!1&&y(t.target,m,h),y(t.element,m,h)}),{top:n,left:o}}});var B=P.Utils,s=B.getBounds,y=B.updateClasses,j=B.defer;P.modules.push({position:function(e){var t=this,n=e.top,o=e.left,r=this.cache("element-bounds",function(){return s(t.element)}),a=r.height,i=r.width,l=this.getTargetBounds(),p=n+a,d=o+i,f=[];n<=l.bottom&&p>=l.top&&["left","right"].forEach(function(e){var t=l[e];t!==o&&t!==d||f.push(e)}),o<=l.right&&d>=l.left&&["top","bottom"].forEach(function(e){var t=l[e];t!==n&&t!==p||f.push(e)});var u=[],c=[],h=["left","top","right","bottom"];return u.push(this.getClass("abutted")),h.forEach(function(e){u.push(t.getClass("abutted")+"-"+e)}),f.length&&c.push(this.getClass("abutted")),f.forEach(function(e){c.push(t.getClass("abutted")+"-"+e)}),j(function(){t.options.addTargetClasses!==!1&&y(t.target,c,u),y(t.element,c,u)}),!0}});var M=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(l){r=!0,a=l}finally{try{!o&&s["return"]&&s["return"]()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return P.modules.push({position:function(e){var t=e.top,n=e.left;if(this.options.shift){var o=this.options.shift;"function"==typeof this.options.shift&&(o=this.options.shift.call(this,{top:t,left:n}));var r=void 0,a=void 0;if("string"==typeof o){o=o.split(" "),o[1]=o[1]||o[0];var i=o,s=M(i,2);r=s[0],a=s[1],r=parseFloat(r,10),a=parseFloat(a,10)}else r=o.top,a=o.left;return t+=r,n+=a,{top:t,left:n}}}}),U})}])});

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A mixin for handling (effectively) onClickOutside for React components.
	 * Note that we're not intercepting any events in this approach, and we're
	 * not using double events for capturing and discarding in layers or wrappers.
	 *
	 * The idea is that components define function
	 *
	 *   handleClickOutside: function() { ... }
	 *
	 * If no such function is defined, an error will be thrown, as this means
	 * either it still needs to be written, or the component should not be using
	 * this mixing since it will not exhibit onClickOutside behaviour.
	 *
	 */
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(331)], __WEBPACK_AMD_DEFINE_RESULT__ = function(reactDom) {
	      return factory(root, reactDom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Note that this does not work with strict
	    // CommonJS, but only CommonJS-like environments
	    // that support module.exports
	    module.exports = factory(root, require('react-dom'));
	  } else {
	    // Browser globals (root is window)
	    root.OnClickOutside = factory(root, ReactDOM);
	  }
	}(this, function (root, ReactDOM) {
	  "use strict";

	  // Use a parallel array because we can't use
	  // objects as keys, they get toString-coerced
	  var registeredComponents = [];
	  var handlers = [];

	  var IGNORE_CLASS = 'ignore-react-onclickoutside';

	  var isSourceFound = function(source, localNode, ignoreClass) {
	    if (source === localNode) {
	      return true;
	    }
	    // SVG <use/> elements do not technically reside in the rendered DOM, so
	    // they do not have classList directly, but they offer a link to their
	    // corresponding element, which can have classList. This extra check is for
	    // that case.
	    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
	    if (source.correspondingElement) {
	      return source.correspondingElement.classList.contains(ignoreClass);
	    }
	    return source.classList.contains(ignoreClass);
	  };

	  return {
	    componentDidMount: function() {
	      if(typeof this.handleClickOutside !== "function")
	        throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");

	      var fn = this.__outsideClickHandler = (function(localNode, eventHandler, ignoreClass) {
	        return function(evt) {
	          evt.stopPropagation();
	          var source = evt.target;
	          var found = false;
	          // If source=local then this event came from "somewhere"
	          // inside and should be ignored. We could handle this with
	          // a layered approach, too, but that requires going back to
	          // thinking in terms of Dom node nesting, running counter
	          // to React's "you shouldn't care about the DOM" philosophy.
	          while(source.parentNode) {
	            found = isSourceFound(source, localNode, ignoreClass);
	            if(found) return;
	            source = source.parentNode;
	          }
	          // If element is in detached DOM, consider it not clicked
	          // outside as it can't be known whether it was outside.
	          if(source !== document) return;
	          eventHandler(evt);
	        }
	      }(ReactDOM.findDOMNode(this), this.handleClickOutside, this.props.outsideClickIgnoreClass || IGNORE_CLASS));

	      var pos = registeredComponents.length;
	      registeredComponents.push(this);
	      handlers[pos] = fn;

	      // If there is a truthy disableOnClickOutside property for this
	      // component, don't immediately start listening for outside events.
	      if (!this.props.disableOnClickOutside) {
	        this.enableOnClickOutside();
	      }
	    },

	    componentWillUnmount: function() {
	      this.disableOnClickOutside();
	      this.__outsideClickHandler = false;
	      var pos = registeredComponents.indexOf(this);
	      if( pos>-1) {
	        if (handlers[pos]) {
	          // clean up so we don't leak memory
	          handlers.splice(pos, 1);
	          registeredComponents.splice(pos, 1);
	        }
	      }
	    },

	    /**
	     * Can be called to explicitly enable event listening
	     * for clicks and touches outside of this element.
	     */
	    enableOnClickOutside: function() {
	      var fn = this.__outsideClickHandler;
	      if (typeof document !== "undefined") {
	        document.addEventListener("mousedown", fn);
	        document.addEventListener("touchstart", fn);
	      }
	    },

	    /**
	     * Can be called to explicitly disable event listening
	     * for clicks and touches outside of this element.
	     */
	    disableOnClickOutside: function() {
	      var fn = this.__outsideClickHandler;
	      if (typeof document !== "undefined") {
	        document.removeEventListener("mousedown", fn);
	        document.removeEventListener("touchstart", fn);
	      }
	    }
	  };

	}));


/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var $ = __webpack_require__(503);
	var toastr = __webpack_require__(525);
	var Moment = __webpack_require__(512);
	function uniqid() {
	    var newDate = new Date();
	    return newDate.getTime();
	}
	exports.uniqid = uniqid;
	function obj_prop_list(obj) {
	    for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) {
	            console.log(prop + " :" + obj[prop]);
	        }
	    }
	}
	function isValidJSONDate(value, userFormat) {
	    var userFormat = userFormat || 'yyyy-mm-dd';
	    var delimiter = /[^mdy]/.exec(userFormat)[0];
	    var theFormat = userFormat.split(delimiter);
	    var splitDatePart = value.split('T');
	    if (splitDatePart.length == 1)
	        return false;
	    var theDate = splitDatePart[0].split(delimiter);
	    var isDate = function (date, format) {
	        var m, d, y;
	        for (var i = 0, len = format.length; i < len; i++) {
	            if (/m/.test(format[i]))
	                m = date[i];
	            if (/d/.test(format[i]))
	                d = date[i];
	            if (/y/.test(format[i]))
	                y = date[i];
	        }
	        ;
	        return (m > 0 && m < 13 &&
	            y && y.length === 4 &&
	            d > 0 && d <= (new Date(y, m, 0)).getDate());
	    };
	    return isDate(theDate, theFormat);
	}
	function moneyFormat(n) {
	    var s = n.toString();
	    return s.replace(/./g, function (c, i, a) {
	        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	    });
	}
	exports.moneyFormat = moneyFormat;
	function obj_prop_date(obj) {
	    for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) {
	            var getUTCStr = obj[prop];
	            if (typeof getUTCStr == 'string') {
	                var isValid = isValidJSONDate(getUTCStr, null);
	                if (isValid) {
	                    obj[prop] = new Date(getUTCStr);
	                }
	            }
	        }
	    }
	    return obj;
	}
	function stand_date(getDateStr) {
	    var d = new Date(getDateStr);
	    var r = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate;
	    return r;
	}
	function getNowDate() {
	    var d = new Date();
	    var r = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
	    return r;
	}
	function month_first_day() {
	    var d = new Date();
	    var r = new Date(d.getFullYear(), d.getMonth(), 1);
	    return r;
	}
	function month_last_day() {
	    var d = new Date();
	    var r = new Date(d.getFullYear(), d.getMonth() + 1, 0);
	    return r;
	}
	function tim() {
	    var d = new Date();
	    return d.toUTCString() + '.' + d.getMilliseconds().toString();
	}
	function pad(str, len, pad, dir) {
	    var padlen;
	    if (typeof (len) == "undefined") {
	        var len = 0;
	    }
	    if (typeof (pad) == "undefined") {
	        var pad = ' ';
	    }
	    if (typeof (dir) == "undefined") {
	        var dir = 3;
	    }
	    if (len + 1 >= str.length) {
	        switch (dir) {
	            case 1:
	                str = Array(len + 1 - str.length).join(pad) + str;
	                break;
	            case 2:
	                str = str + Array(len + 1 - str.length).join(pad);
	                break;
	            case 3:
	                var right = Math.ceil((padlen = len - str.length) / 2);
	                var left = padlen - right;
	                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
	                break;
	        }
	    }
	    return str;
	}
	function showAjaxError(data) {
	    alert('Ajax error,check console info!');
	    console.log(data);
	}
	exports.showAjaxError = showAjaxError;
	exports.jqGet = function jqGet(url, data) {
	    return $.ajax({
	        type: "GET",
	        url: url,
	        data: data,
	        dataType: 'json',
	        cache: false
	    });
	};
	function jqPost(url, data) {
	    return $.ajax({
	        type: "POST",
	        url: url,
	        data: data,
	        dataType: 'json',
	        cache: false
	    });
	}
	exports.jqPost = jqPost;
	function jqPut(url, data) {
	    return $.ajax({
	        type: "PUT",
	        url: url,
	        data: data,
	        dataType: 'json',
	        cache: false
	    });
	}
	exports.jqPut = jqPut;
	;
	function jqDelete(url, data) {
	    return $.ajax({
	        type: "DELETE",
	        url: url,
	        data: data,
	        dataType: 'json',
	        cache: false
	    });
	}
	exports.jqDelete = jqDelete;
	function tosMessage(title, message, type) {
	    if (type == 0)
	        toastr.info(message, title);
	    if (type == 1)
	        toastr.success(message, title);
	    if (type == 3)
	        toastr.error(message, title);
	    if (type == 2)
	        toastr.warning(message, title);
	}
	exports.tosMessage = tosMessage;
	function formatFileSize(byte_size) {
	    var get_size = byte_size;
	    if (get_size <= 1024) {
	        return get_size + 'Byte';
	    }
	    else if (get_size > 1024 && get_size <= 1024 * 1024) {
	        var num = get_size / 1024;
	        var fmt = Math.ceil(num);
	        return fmt + 'KB';
	    }
	    else {
	        var num = get_size / (1024 * 1024);
	        var fmt = Math.ceil(num);
	        return fmt + 'MB';
	    }
	}
	exports.formatFileSize = formatFileSize;
	function clone(obj) {
	    if (null == obj || "object" != typeof obj)
	        return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr))
	            copy[attr] = obj[attr];
	    }
	    return copy;
	}
	exports.clone = clone;
	function getBrower() {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
	        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	    if (Sys.ie)
	        return ('IE: ' + Sys.ie);
	    if (Sys.firefox)
	        return ('Firefox: ' + Sys.firefox);
	    if (Sys.chrome)
	        return ('Chrome: ' + Sys.chrome);
	    if (Sys.opera)
	        return ('Opera: ' + Sys.opera);
	    if (Sys.safari)
	        return ('Safari: ' + Sys.safari);
	}
	var replace_br = /(?:\\[rn]|[\r\n]+)+/g;
	function checkTwID(id) {
	    if (id != null && id != "") {
	        var city = new Array(1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30);
	        id = id.toUpperCase();
	        if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
	            return false;
	        }
	        else {
	            id = id.split('');
	            var total = city[id[0].charCodeAt(0) - 65];
	            for (var i = 1; i <= 8; i++) {
	                total += eval(id[i]) * (9 - i);
	            }
	            total += eval(id[9]);
	            return ((total % 10 == 0));
	        }
	    }
	    else {
	        return true;
	    }
	}
	function DiffDate(start, end) {
	    if (start != null && end != null) {
	        var day_s = new Date(start);
	        var day_e = new Date(end);
	        if (day_s <= day_e) {
	            var iDays = (Math.abs(day_e.getTime() - day_s.getTime()) / 1000 / 60 / 60 / 24) + 1;
	            return { result: 1, diff_day: iDays };
	        }
	        else {
	            return { result: -1, diff_day: 0 };
	        }
	    }
	    else {
	        return { result: -2, diff_day: 0 };
	    }
	}
	function MntV(date) {
	    var r = date === null || date === undefined ? null : Moment(date);
	    return r;
	}
	exports.MntV = MntV;
	function formatNumber(number) {
	    if (number == undefined || number == null) {
	        return '';
	    }
	    var snumber = number.toFixed(2) + '';
	    var x = snumber.split('.');
	    var x1 = x[0];
	    var x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1;
	}
	exports.formatNumber = formatNumber;
	exports.Ajax = {
	    xhr: null,
	    request: function (url, method, data, success, failure) {
	        if (!this.xhr) {
	            this.xhr = new XMLHttpRequest();
	        }
	        var self = this.xhr;
	        self.onreadystatechange = function () {
	            if (self.readyState === 4 && self.status === 200) {
	                var response = JSON.parse(self.responseText);
	                if (success != null)
	                    success(response);
	            }
	            else if (self.readyState === 4) {
	                if (failure != null)
	                    failure(self.responseText);
	            }
	        };
	        var parms = "?" + Object.keys(data).map(function (key) {
	            return key + "=" + data[key];
	        }).join("&");
	        var send_url = url + parms;
	        self.open(method, send_url, true);
	        self.send();
	    },
	};


/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Toastr
	 * Copyright 2012-2015
	 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
	 * All Rights Reserved.
	 * Use, reproduction, distribution, and modification of this code is subject to the terms and
	 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
	 *
	 * ARIA Support: Greta Krafsig
	 *
	 * Project: https://github.com/CodeSeven/toastr
	 */
	/* global define */
	; (function (define) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(503)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	        return (function () {
	            var $container;
	            var listener;
	            var toastId = 0;
	            var toastType = {
	                error: 'error',
	                info: 'info',
	                success: 'success',
	                warning: 'warning'
	            };

	            var toastr = {
	                clear: clear,
	                remove: remove,
	                error: error,
	                getContainer: getContainer,
	                info: info,
	                options: {},
	                subscribe: subscribe,
	                success: success,
	                version: '2.1.2',
	                warning: warning
	            };

	            var previousToast;

	            return toastr;

	            ////////////////

	            function error(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.error,
	                    iconClass: getOptions().iconClasses.error,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function getContainer(options, create) {
	                if (!options) { options = getOptions(); }
	                $container = $('#' + options.containerId);
	                if ($container.length) {
	                    return $container;
	                }
	                if (create) {
	                    $container = createContainer(options);
	                }
	                return $container;
	            }

	            function info(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.info,
	                    iconClass: getOptions().iconClasses.info,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function subscribe(callback) {
	                listener = callback;
	            }

	            function success(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.success,
	                    iconClass: getOptions().iconClasses.success,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function warning(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.warning,
	                    iconClass: getOptions().iconClasses.warning,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function clear($toastElement, clearOptions) {
	                var options = getOptions();
	                if (!$container) { getContainer(options); }
	                if (!clearToast($toastElement, options, clearOptions)) {
	                    clearContainer(options);
	                }
	            }

	            function remove($toastElement) {
	                var options = getOptions();
	                if (!$container) { getContainer(options); }
	                if ($toastElement && $(':focus', $toastElement).length === 0) {
	                    removeToast($toastElement);
	                    return;
	                }
	                if ($container.children().length) {
	                    $container.remove();
	                }
	            }

	            // internal functions

	            function clearContainer (options) {
	                var toastsToClear = $container.children();
	                for (var i = toastsToClear.length - 1; i >= 0; i--) {
	                    clearToast($(toastsToClear[i]), options);
	                }
	            }

	            function clearToast ($toastElement, options, clearOptions) {
	                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
	                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
	                    $toastElement[options.hideMethod]({
	                        duration: options.hideDuration,
	                        easing: options.hideEasing,
	                        complete: function () { removeToast($toastElement); }
	                    });
	                    return true;
	                }
	                return false;
	            }

	            function createContainer(options) {
	                $container = $('<div/>')
	                    .attr('id', options.containerId)
	                    .addClass(options.positionClass)
	                    .attr('aria-live', 'polite')
	                    .attr('role', 'alert');

	                $container.appendTo($(options.target));
	                return $container;
	            }

	            function getDefaults() {
	                return {
	                    tapToDismiss: true,
	                    toastClass: 'toast',
	                    containerId: 'toast-container',
	                    debug: false,

	                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
	                    showDuration: 300,
	                    showEasing: 'swing', //swing and linear are built into jQuery
	                    onShown: undefined,
	                    hideMethod: 'fadeOut',
	                    hideDuration: 1000,
	                    hideEasing: 'swing',
	                    onHidden: undefined,
	                    closeMethod: false,
	                    closeDuration: false,
	                    closeEasing: false,

	                    extendedTimeOut: 1000,
	                    iconClasses: {
	                        error: 'toast-error',
	                        info: 'toast-info',
	                        success: 'toast-success',
	                        warning: 'toast-warning'
	                    },
	                    iconClass: 'toast-info',
	                    positionClass: 'toast-top-right',
	                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
	                    titleClass: 'toast-title',
	                    messageClass: 'toast-message',
	                    escapeHtml: false,
	                    target: 'body',
	                    closeHtml: '<button type="button">&times;</button>',
	                    newestOnTop: true,
	                    preventDuplicates: false,
	                    progressBar: false
	                };
	            }

	            function publish(args) {
	                if (!listener) { return; }
	                listener(args);
	            }

	            function notify(map) {
	                var options = getOptions();
	                var iconClass = map.iconClass || options.iconClass;

	                if (typeof (map.optionsOverride) !== 'undefined') {
	                    options = $.extend(options, map.optionsOverride);
	                    iconClass = map.optionsOverride.iconClass || iconClass;
	                }

	                if (shouldExit(options, map)) { return; }

	                toastId++;

	                $container = getContainer(options, true);

	                var intervalId = null;
	                var $toastElement = $('<div/>');
	                var $titleElement = $('<div/>');
	                var $messageElement = $('<div/>');
	                var $progressElement = $('<div/>');
	                var $closeElement = $(options.closeHtml);
	                var progressBar = {
	                    intervalId: null,
	                    hideEta: null,
	                    maxHideTime: null
	                };
	                var response = {
	                    toastId: toastId,
	                    state: 'visible',
	                    startTime: new Date(),
	                    options: options,
	                    map: map
	                };

	                personalizeToast();

	                displayToast();

	                handleEvents();

	                publish(response);

	                if (options.debug && console) {
	                    console.log(response);
	                }

	                return $toastElement;

	                function escapeHtml(source) {
	                    if (source == null)
	                        source = "";

	                    return new String(source)
	                        .replace(/&/g, '&amp;')
	                        .replace(/"/g, '&quot;')
	                        .replace(/'/g, '&#39;')
	                        .replace(/</g, '&lt;')
	                        .replace(/>/g, '&gt;');
	                }

	                function personalizeToast() {
	                    setIcon();
	                    setTitle();
	                    setMessage();
	                    setCloseButton();
	                    setProgressBar();
	                    setSequence();
	                }

	                function handleEvents() {
	                    $toastElement.hover(stickAround, delayedHideToast);
	                    if (!options.onclick && options.tapToDismiss) {
	                        $toastElement.click(hideToast);
	                    }

	                    if (options.closeButton && $closeElement) {
	                        $closeElement.click(function (event) {
	                            if (event.stopPropagation) {
	                                event.stopPropagation();
	                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	                                event.cancelBubble = true;
	                            }
	                            hideToast(true);
	                        });
	                    }

	                    if (options.onclick) {
	                        $toastElement.click(function (event) {
	                            options.onclick(event);
	                            hideToast();
	                        });
	                    }
	                }

	                function displayToast() {
	                    $toastElement.hide();

	                    $toastElement[options.showMethod](
	                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
	                    );

	                    if (options.timeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.timeOut);
	                        progressBar.maxHideTime = parseFloat(options.timeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                        if (options.progressBar) {
	                            progressBar.intervalId = setInterval(updateProgress, 10);
	                        }
	                    }
	                }

	                function setIcon() {
	                    if (map.iconClass) {
	                        $toastElement.addClass(options.toastClass).addClass(iconClass);
	                    }
	                }

	                function setSequence() {
	                    if (options.newestOnTop) {
	                        $container.prepend($toastElement);
	                    } else {
	                        $container.append($toastElement);
	                    }
	                }

	                function setTitle() {
	                    if (map.title) {
	                        $titleElement.append(!options.escapeHtml ? map.title : escapeHtml(map.title)).addClass(options.titleClass);
	                        $toastElement.append($titleElement);
	                    }
	                }

	                function setMessage() {
	                    if (map.message) {
	                        $messageElement.append(!options.escapeHtml ? map.message : escapeHtml(map.message)).addClass(options.messageClass);
	                        $toastElement.append($messageElement);
	                    }
	                }

	                function setCloseButton() {
	                    if (options.closeButton) {
	                        $closeElement.addClass('toast-close-button').attr('role', 'button');
	                        $toastElement.prepend($closeElement);
	                    }
	                }

	                function setProgressBar() {
	                    if (options.progressBar) {
	                        $progressElement.addClass('toast-progress');
	                        $toastElement.prepend($progressElement);
	                    }
	                }

	                function shouldExit(options, map) {
	                    if (options.preventDuplicates) {
	                        if (map.message === previousToast) {
	                            return true;
	                        } else {
	                            previousToast = map.message;
	                        }
	                    }
	                    return false;
	                }

	                function hideToast(override) {
	                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
	                    var duration = override && options.closeDuration !== false ?
	                        options.closeDuration : options.hideDuration;
	                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	                    if ($(':focus', $toastElement).length && !override) {
	                        return;
	                    }
	                    clearTimeout(progressBar.intervalId);
	                    return $toastElement[method]({
	                        duration: duration,
	                        easing: easing,
	                        complete: function () {
	                            removeToast($toastElement);
	                            if (options.onHidden && response.state !== 'hidden') {
	                                options.onHidden();
	                            }
	                            response.state = 'hidden';
	                            response.endTime = new Date();
	                            publish(response);
	                        }
	                    });
	                }

	                function delayedHideToast() {
	                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
	                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                    }
	                }

	                function stickAround() {
	                    clearTimeout(intervalId);
	                    progressBar.hideEta = 0;
	                    $toastElement.stop(true, true)[options.showMethod](
	                        {duration: options.showDuration, easing: options.showEasing}
	                    );
	                }

	                function updateProgress() {
	                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
	                    $progressElement.width(percentage + '%');
	                }
	            }

	            function getOptions() {
	                return $.extend({}, getDefaults(), toastr.options);
	            }

	            function removeToast($toastElement) {
	                if (!$container) { $container = getContainer(); }
	                if ($toastElement.is(':visible')) {
	                    return;
	                }
	                $toastElement.remove();
	                $toastElement = null;
	                if ($container.children().length === 0) {
	                    $container.remove();
	                    previousToast = undefined;
	                }
	            }

	        })();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(526)));


/***/ },

/***/ 526:
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ 527:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(298);
	var CommFunc = __webpack_require__(524);
	var ReactBootstrap = __webpack_require__(528);
	var Sortable = __webpack_require__(781);
	var upload = __webpack_require__(782);
	var DT = __webpack_require__(783);
	var GridButtonModify = (function (_super) {
	    __extends(GridButtonModify, _super);
	    function GridButtonModify(props) {
	        _super.call(this, props);
	        this.onClick = this.onClick.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.state = {
	            className: 'fa-pencil'
	        };
	    }
	    GridButtonModify.prototype.componentDidMount = function () {
	        if (this.props.ver == 2) {
	            this.setState({ className: 'fa-search-plus' });
	        }
	    };
	    GridButtonModify.prototype.onClick = function () {
	        this.props.modify();
	    };
	    GridButtonModify.prototype.render = function () {
	        return React.createElement("button", {type: "button", className: "btn-link btn-lg", onClick: this.onClick}, React.createElement("i", {className: this.state.className}));
	    };
	    GridButtonModify.defaultProps = {
	        ver: 1
	    };
	    return GridButtonModify;
	}(React.Component));
	exports.GridButtonModify = GridButtonModify;
	var GridCheckDel = (function (_super) {
	    __extends(GridCheckDel, _super);
	    function GridCheckDel() {
	        _super.call(this);
	        this.onChange = this.onChange.bind(this);
	    }
	    GridCheckDel.prototype.onChange = function (e) {
	        this.props.delCheck(this.props.iKey, this.props.chd);
	    };
	    GridCheckDel.prototype.render = function () {
	        return React.createElement("label", {className: "c-input c-checkbox"}, React.createElement("input", {type: "checkbox", checked: this.props.chd, onChange: this.onChange}), React.createElement("span", {className: "c-indicator"}));
	    };
	    return GridCheckDel;
	}(React.Component));
	exports.GridCheckDel = GridCheckDel;
	var GridButtonDel = (function (_super) {
	    __extends(GridButtonDel, _super);
	    function GridButtonDel() {
	        _super.call(this);
	        this.onClick = this.onClick.bind(this);
	    }
	    GridButtonDel.prototype.onClick = function (e) {
	        this.props.removeItemSubmit(this.props.primKey);
	    };
	    GridButtonDel.prototype.render = function () {
	        return React.createElement("button", {type: "button", onClick: this.onClick, className: "btn-link btn-lg text-danger"}, React.createElement("i", {className: "fa-times"}));
	    };
	    return GridButtonDel;
	}(React.Component));
	exports.GridButtonDel = GridButtonDel;
	var GridNavPage = (function (_super) {
	    __extends(GridNavPage, _super);
	    function GridNavPage(props) {
	        _super.call(this, props);
	        this.nextPage = this.nextPage.bind(this);
	        this.prvePage = this.prvePage.bind(this);
	        this.firstPage = this.firstPage.bind(this);
	        this.lastPage = this.lastPage.bind(this);
	    }
	    GridNavPage.prototype.firstPage = function () {
	        this.props.queryGridData(1);
	    };
	    GridNavPage.prototype.lastPage = function () {
	        this.props.queryGridData(this.props.totalPage);
	    };
	    GridNavPage.prototype.nextPage = function () {
	        if (this.props.nowPage < this.props.totalPage) {
	            this.props.queryGridData(this.props.nowPage + 1);
	        }
	    };
	    GridNavPage.prototype.prvePage = function () {
	        if (this.props.nowPage > 1) {
	            this.props.queryGridData(this.props.nowPage - 1);
	        }
	    };
	    GridNavPage.prototype.jumpPage = function () {
	    };
	    GridNavPage.prototype.render = function () {
	        var setAddButton = null, setDeleteButton = null;
	        if (this.props.showAdd) {
	            setAddButton = React.createElement("button", {className: "btn btn-sm btn-success", type: "button", onClick: this.props.insertType}, React.createElement("i", {className: "fa-plus-circle"}), " 新增");
	        }
	        if (this.props.showDelete) {
	            setDeleteButton = React.createElement("button", {className: "btn btn-sm btn-danger", type: "button", onClick: this.props.deleteSubmit}, React.createElement("i", {className: "fa-trash-o"}), " 刪除");
	        }
	        var oper = null;
	        oper = (React.createElement("div", {className: "table-footer clearfix"}, React.createElement("div", {className: "pull-xs-left"}, setAddButton, " ", setDeleteButton), React.createElement("small", {className: "pull-xs-right"}, "第", this.props.startCount, "-", this.props.endCount, "筆，共", this.props.recordCount, "筆"), React.createElement("ul", {className: "pager pager-sm"}, React.createElement("li", null, React.createElement("a", {href: "#", title: "移至第一頁", tabIndex: -1, onClick: this.firstPage}, React.createElement("i", {className: "fa-angle-double-left"}))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "上一頁", tabIndex: -1, onClick: this.prvePage}, React.createElement("i", {className: "fa-angle-left"}))), " ", React.createElement("li", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", null, "第"), ' ', React.createElement("input", {style: { "width": "100px" }, className: "form-control form-control-sm text-xs-center", type: "number", min: "1", tabIndex: -1, value: this.props.nowPage.toString(), onChange: this.jumpPage}), ' ', React.createElement("label", null, "頁，共", this.props.totalPage, "頁"))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "@Resources.Res.NextPage", tabIndex: -1, onClick: this.nextPage}, React.createElement("i", {className: "fa-angle-right"}))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "移至最後一頁", tabIndex: -1, onClick: this.lastPage}, React.createElement("i", {className: "fa-angle-double-right"}))))));
	        return oper;
	    };
	    GridNavPage.defaultProps = {
	        showAdd: true,
	        showDelete: true
	    };
	    return GridNavPage;
	}(React.Component));
	exports.GridNavPage = GridNavPage;
	var Tips = (function (_super) {
	    __extends(Tips, _super);
	    function Tips() {
	        _super.apply(this, arguments);
	    }
	    Tips.prototype.render = function () {
	        var Tooltip = ReactBootstrap.Tooltip;
	        var OverlayTrigger = ReactBootstrap.OverlayTrigger;
	        var tooltipObj = (React.createElement(Tooltip, {id: "abc"}, this.props.comment));
	        var out_html = null;
	        out_html = (React.createElement(OverlayTrigger, {placement: "top", overlay: tooltipObj}, React.createElement("i", {className: "fa-question-circle text-info"})));
	        return out_html;
	    };
	    return Tips;
	}(React.Component));
	exports.Tips = Tips;
	var MasterImageUpload = (function (_super) {
	    __extends(MasterImageUpload, _super);
	    function MasterImageUpload() {
	        _super.call(this);
	        this.createFileUpLoadObject = this.createFileUpLoadObject.bind(this);
	        this.deleteFile = this.deleteFile.bind(this);
	        this.getFileList = this.getFileList.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.componentDidUpdate = this.componentDidUpdate.bind(this);
	        this.sortableGroupDecorator = this.sortableGroupDecorator.bind(this);
	        this.render = this.render.bind(this);
	        this.state = {
	            filelist: []
	        };
	        this._sortable = null;
	        this._upload = null;
	        if (Array.prototype.movesort === undefined) {
	            Array.prototype.movesort = function (old_index, new_index) {
	                if (new_index >= this.length) {
	                    var k = new_index - this.length;
	                    while ((k--) + 1) {
	                        this.push(undefined);
	                    }
	                }
	                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	                return this;
	            };
	        }
	    }
	    MasterImageUpload.prototype.componentDidMount = function () {
	        if (this.props.ParentEditType == 2) {
	            if (typeof this.props.MainId === 'string') {
	                if (this.props.MainId != null) {
	                    this.createFileUpLoadObject();
	                    this.getFileList();
	                }
	            }
	            else if (typeof this.props.MainId === 'number') {
	                if (this.props.MainId > 0) {
	                    this.createFileUpLoadObject();
	                    this.getFileList();
	                }
	            }
	        }
	    };
	    MasterImageUpload.prototype.componentDidUpdate = function (prevProps, prevState) {
	        console.log(this.props.MainId, prevProps.MainId);
	        if (this.props.ParentEditType == 2) {
	            if (typeof this.props.MainId === 'string') {
	                if (this.props.MainId != null && prevProps.MainId == null) {
	                    this.createFileUpLoadObject();
	                    this.getFileList();
	                }
	            }
	            else if (typeof this.props.MainId === 'number') {
	                if (this.props.MainId > 0 && prevProps.MainId == 0) {
	                    this.createFileUpLoadObject();
	                    this.getFileList();
	                }
	            }
	        }
	    };
	    MasterImageUpload.prototype.componentWillUnmount = function () {
	        if (this.props.ParentEditType == 2) {
	            this._sortable.destroy();
	            this._upload.destroy();
	        }
	    };
	    MasterImageUpload.prototype.deleteFile = function (guid) {
	        CommFunc.jqPost(this.props.url_delete, {
	            id: this.props.MainId,
	            fileKind: this.props.FileKind,
	            guid: guid
	        })
	            .done(function (data, textStatus, jqXHRdata) {
	            if (data.result) {
	                this.getFileList();
	            }
	            else {
	                alert(data.message);
	            }
	        }.bind(this))
	            .fail(function (jqXHR, textStatus, errorThrown) {
	            CommFunc.showAjaxError(errorThrown);
	        });
	    };
	    MasterImageUpload.prototype.createFileUpLoadObject = function () {
	        if (this.props.ParentEditType == 1)
	            return;
	        var btn = document.getElementById('upload-btn-' + this.props.MainId + '-' + this.props.FileKind);
	        var _this = this;
	        this._upload = new upload.SimpleUpload({
	            button: btn,
	            url: this.props.url_upload,
	            data: {
	                id: this.props.MainId,
	                fileKind: this.props.FileKind
	            },
	            name: 'fileName',
	            multiple: true,
	            maxSize: 5000,
	            allowedExtensions: ['jpg', 'jpeg', 'png'],
	            accept: 'image/*',
	            responseType: 'json',
	            encodeCustomHeaders: true,
	            onSubmit: function (filename, ext) {
	                if (_this.props.MainId == 0) {
	                    alert('此筆資料未完成新增，無法上傳檔案!');
	                    return false;
	                }
	                var progress = document.createElement('div'), fileSize = document.createElement('span'), wrapper = document.createElement('div'), progressBox = document.getElementById('progressBox-' + _this.props.MainId + '-' + _this.props.FileKind);
	                progress.className = 'progress progress-success';
	                fileSize.className = 'text-sm text-muted m-l-1';
	                wrapper.className = 'progress-wrap';
	                wrapper.innerHTML = '<span class="text-sm text-muted">' + filename + '</span>';
	                wrapper.appendChild(fileSize);
	                wrapper.appendChild(progress);
	                progressBox.appendChild(wrapper);
	                this.setFileSizeBox(fileSize);
	                this.setProgressContainer(wrapper);
	            },
	            onSizeError: function () {
	            },
	            onExtError: function () {
	            },
	            onComplete: function (file, response) {
	                if (response.result) {
	                    _this.getFileList();
	                }
	                else {
	                    alert(response.message);
	                }
	            }
	        });
	    };
	    MasterImageUpload.prototype.getFileList = function () {
	        CommFunc.jqPost(this.props.url_list, {
	            id: this.props.MainId,
	            fileKind: this.props.FileKind
	        })
	            .done(function (data, textStatus, jqXHRdata) {
	            if (data.result) {
	                this.setState({ filelist: data.files });
	            }
	            else {
	                alert(data.message);
	            }
	        }.bind(this))
	            .fail(function (jqXHR, textStatus, errorThrown) {
	            CommFunc.showAjaxError(errorThrown);
	        });
	    };
	    MasterImageUpload.prototype.sortableGroupDecorator = function (componentBackingInstance) {
	        if (componentBackingInstance) {
	            var _this_1 = this;
	            var options = {
	                draggable: "li",
	                group: "shared",
	                onSort: function (evt) {
	                    var data_array = _this_1.state.filelist;
	                    data_array.movesort(evt.oldIndex, evt.newIndex);
	                    var parms = [];
	                    for (var i in data_array) {
	                        var item = data_array[i];
	                        parms.push(item.guid);
	                    }
	                    CommFunc.jqPost(_this_1.props.url_sort, {
	                        id: _this_1.props.MainId,
	                        fileKind: _this_1.props.FileKind,
	                        guids: parms
	                    })
	                        .done(function (data, textStatus, jqXHRdata) {
	                        if (data.result) {
	                            _this_1.setState({ filelist: [] });
	                            _this_1.setState({ filelist: data_array });
	                        }
	                        else {
	                            alert(data.message);
	                        }
	                    })
	                        .fail(function (jqXHR, textStatus, errorThrown) {
	                        CommFunc.showAjaxError(errorThrown);
	                    });
	                },
	                onEnd: function (evt) {
	                    console.log('onEnd');
	                },
	                onUpdate: function (evt) {
	                    var itemEl = evt.item;
	                    console.log('onUpdate');
	                },
	            };
	            this._sortable = Sortable.create(componentBackingInstance, options);
	        }
	    };
	    ;
	    MasterImageUpload.prototype.render = function () {
	        var outHtml = null;
	        var img_button_html = null;
	        if (this.props.ParentEditType == 1) {
	            img_button_html = React.createElement("small", {className: "text-danger"}, "請先存檔，再上傳檔案");
	        }
	        else {
	            img_button_html =
	                React.createElement("div", {className: "form-control"}, React.createElement("input", {type: "file", id: 'upload-btn-' + this.props.MainId + '-' + this.props.FileKind, accept: "image/*"}));
	        }
	        outHtml = (React.createElement("div", null, img_button_html, React.createElement("ol", {className: "upload-img list-inline", ref: this.sortableGroupDecorator}, this.state.filelist.map(function (itemData, i) {
	            var subOutHtml = React.createElement("li", {key: itemData.guid}, React.createElement("button", {type: "button", className: "close", onClick: this.deleteFile.bind(this, itemData.guid), title: "刪除圖片"}, " × "), React.createElement("img", {src: itemData.iconPath, title: CommFunc.formatFileSize(itemData.size)}));
	            return subOutHtml;
	        }.bind(this))), React.createElement("div", {id: 'progressBox-' + this.props.MainId + '-' + this.props.FileKind})));
	        return outHtml;
	    };
	    MasterImageUpload.defaultProps = {
	        MainId: 0,
	        FileKind: 'F'
	    };
	    return MasterImageUpload;
	}(React.Component));
	exports.MasterImageUpload = MasterImageUpload;
	var MasterFileUpload = (function (_super) {
	    __extends(MasterFileUpload, _super);
	    function MasterFileUpload() {
	        _super.call(this);
	        this.createFileUpLoadObject = this.createFileUpLoadObject.bind(this);
	        this.deleteFile = this.deleteFile.bind(this);
	        this.getFileList = this.getFileList.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.componentDidUpdate = this.componentDidUpdate.bind(this);
	        this.render = this.render.bind(this);
	        this.state = {
	            filelist: [],
	            download_src: ''
	        };
	    }
	    MasterFileUpload.prototype.componentDidMount = function () {
	        if (typeof this.props.MainId === 'string') {
	            if (this.props.MainId != null) {
	                this.createFileUpLoadObject();
	                this.getFileList();
	            }
	        }
	        else if (typeof this.props.MainId === 'number') {
	            if (this.props.MainId > 0) {
	                this.createFileUpLoadObject();
	                this.getFileList();
	            }
	        }
	    };
	    MasterFileUpload.prototype.componentDidUpdate = function (prevProps, prevState) {
	        if (typeof this.props.MainId === 'string') {
	            if (this.props.MainId != null && prevProps.MainId == null) {
	                this.createFileUpLoadObject();
	                this.getFileList();
	            }
	        }
	        else if (typeof this.props.MainId === 'number') {
	            if (this.props.MainId > 0 && prevProps.MainId == 0) {
	                this.createFileUpLoadObject();
	                this.getFileList();
	            }
	        }
	    };
	    MasterFileUpload.prototype.deleteFile = function (filename) {
	        CommFunc.jqPost(this.props.url_delete, {
	            id: this.props.MainId,
	            fileKind: this.props.FileKind,
	            filename: filename
	        })
	            .done(function (data, textStatus, jqXHRdata) {
	            if (data.result) {
	                this.getFileList();
	            }
	            else {
	                alert(data.message);
	            }
	        }.bind(this))
	            .fail(function (jqXHR, textStatus, errorThrown) {
	            CommFunc.showAjaxError(errorThrown);
	        });
	    };
	    MasterFileUpload.prototype.downloadFile = function (id, filekind, filename) {
	        var parms = [];
	        parms.push('id=' + id);
	        parms.push('filekind=' + filekind);
	        parms.push('filename=' + filename);
	        parms.push('tid=' + CommFunc.uniqid());
	        var src = this.props.url_download + '?' + parms.join('&');
	        this.setState({ download_src: src });
	    };
	    MasterFileUpload.prototype.createFileUpLoadObject = function () {
	        if (this.props.ParentEditType == 1)
	            return;
	        var btn = document.getElementById('upload-btn-' + this.props.MainId + '-' + this.props.FileKind);
	        var _this = this;
	        var uploader = new upload.SimpleUpload({
	            button: btn,
	            url: this.props.url_upload,
	            data: {
	                id: this.props.MainId,
	                fileKind: this.props.FileKind
	            },
	            name: 'fileName',
	            multiple: true,
	            maxSize: 5000,
	            allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'png', 'jpg', 'jpeg'],
	            accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,image/*',
	            responseType: 'json',
	            encodeCustomHeaders: true,
	            onSubmit: function (filename, ext) {
	                if (_this.props.MainId == 0) {
	                    alert('此筆資料未完成新增，無法上傳檔案!');
	                    return false;
	                }
	                var progress = document.createElement('div'), fileSize = document.createElement('span'), wrapper = document.createElement('div'), progressBox = document.getElementById('progressBox-' + _this.props.MainId);
	                progress.className = 'progress progress-success';
	                fileSize.className = 'text-sm text-muted m-l-1';
	                wrapper.className = 'progress-wrap';
	                wrapper.innerHTML = '<span class="text-sm text-muted">' + filename + '</span>';
	                wrapper.appendChild(fileSize);
	                wrapper.appendChild(progress);
	                progressBox.appendChild(wrapper);
	                this.setFileSizeBox(fileSize);
	                this.setProgressContainer(wrapper);
	            },
	            onSizeError: function () {
	            },
	            onExtError: function () {
	            },
	            onComplete: function (file, response) {
	                if (response.result) {
	                    _this.getFileList();
	                }
	                else {
	                    alert(response.message);
	                }
	            }
	        });
	    };
	    MasterFileUpload.prototype.getFileList = function () {
	        CommFunc.jqPost(this.props.url_list, {
	            id: this.props.MainId,
	            fileKind: this.props.FileKind
	        })
	            .done(function (data, textStatus, jqXHRdata) {
	            if (data.result) {
	                this.setState({ filelist: data.files });
	            }
	            else {
	                alert(data.message);
	            }
	        }.bind(this))
	            .fail(function (jqXHR, textStatus, errorThrown) {
	            CommFunc.showAjaxError(errorThrown);
	        });
	    };
	    MasterFileUpload.prototype.render = function () {
	        var outHtml = null;
	        var fileButtonHtml = null;
	        if (this.props.ParentEditType == 1) {
	            fileButtonHtml = (React.createElement("div", {className: "form-control"}, React.createElement("small", {className: "col-xs-6 help-inline"}, "請先按儲存後方可上傳檔案")));
	        }
	        else if (this.props.ParentEditType == 2) {
	            fileButtonHtml = (React.createElement("div", {className: "form-control"}, React.createElement("input", {type: "file", id: 'upload-btn-' + this.props.MainId + '-' + this.props.FileKind})));
	        }
	        ;
	        outHtml = (React.createElement("div", null, fileButtonHtml, React.createElement("p", {className: "help-block", ref: "SortImage"}, this.state.filelist.map(function (itemData, i) {
	            var subOutHtml = React.createElement("span", {className: "doc-upload", key: i}, React.createElement("i", {className: "fa-file-text-o"}), React.createElement("button", {type: "button", className: "close", onClick: this.deleteFile.bind(this, itemData.fileName), title: "刪除檔案"}, " × "), React.createElement("button", {type: "button", className: "btn-link", onClick: this.downloadFile.bind(this, this.props.MainId, this.props.FileKind, itemData.fileName)}, itemData.fileName));
	            return subOutHtml;
	        }, this)), React.createElement("div", {id: 'progressBox-' + this.props.MainId}), React.createElement("iframe", {src: this.state.download_src, style: { visibility: 'hidden', display: 'none' }})));
	        return outHtml;
	    };
	    MasterFileUpload.defaultProps = {
	        MainId: 0,
	        FileKind: 'F'
	    };
	    return MasterFileUpload;
	}(React.Component));
	exports.MasterFileUpload = MasterFileUpload;
	var TwAddress = (function (_super) {
	    __extends(TwAddress, _super);
	    function TwAddress(props) {
	        _super.call(this, props);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.componentDidUpdate = this.componentDidUpdate.bind(this);
	        this.onZipChange = this.onZipChange.bind(this);
	        this.onCityChange = this.onCityChange.bind(this);
	        this.onCountryChange = this.onCountryChange.bind(this);
	        this.onAddressChange = this.onAddressChange.bind(this);
	        this.listCountry = this.listCountry.bind(this);
	        this.render = this.render.bind(this);
	        this.state = {
	            country_list: []
	        };
	    }
	    TwAddress.prototype.componentDidMount = function () {
	        if (this.props.city_value != null) {
	            this.listCountry(this.props.city_value);
	        }
	    };
	    TwAddress.prototype.componentDidUpdate = function (prevProps, prevState) {
	        if (this.props.city_value != null && this.props.city_value != prevProps.city_value) {
	            this.listCountry(this.props.city_value);
	        }
	    };
	    TwAddress.prototype.onZipChange = function (e) {
	        var input = e.target;
	        var data = {
	            identity: this.props.identity,
	            zip_value: input.value,
	            city_value: this.props.city_value,
	            country_value: this.props.country_value,
	            address_value: this.props.address_value,
	            index: this.props.index,
	            type: 1
	        };
	        this.props.onChange(data, e);
	    };
	    TwAddress.prototype.onCityChange = function (e) {
	        var input = e.target;
	        var data = {
	            identity: this.props.identity,
	            zip_value: this.props.zip_value,
	            city_value: input.value,
	            country_value: this.props.country_value,
	            address_value: this.props.address_value,
	            index: this.props.index,
	            type: 2
	        };
	        this.listCountry(input.value);
	        this.props.onChange(data, e);
	    };
	    TwAddress.prototype.onCountryChange = function (e) {
	        var input = e.target;
	        var zip_value = null;
	        for (var i in this.state.country_list) {
	            var item = this.state.country_list[i];
	            if (item.county == input.value) {
	                zip_value = item.zip;
	                break;
	            }
	        }
	        var data = {
	            identity: this.props.identity,
	            zip_value: zip_value,
	            city_value: this.props.city_value,
	            country_value: input.value,
	            address_value: this.props.address_value,
	            index: this.props.index,
	            type: 3
	        };
	        this.props.onChange(data, e);
	    };
	    TwAddress.prototype.onAddressChange = function (e) {
	        var input = e.target;
	        var data = {
	            identity: this.props.identity,
	            zip_value: this.props.zip_value,
	            city_value: this.props.city_value,
	            country_value: this.props.country_value,
	            address_value: input.value,
	            index: this.props.index,
	            type: 4
	        };
	        this.props.onChange(data, e);
	    };
	    TwAddress.prototype.listCountry = function (value) {
	        if (value == null || value == undefined || value == '') {
	            this.setState({ country_list: [] });
	        }
	        else {
	            for (var i in DT.twDistrict) {
	                var item = DT.twDistrict[i];
	                if (item.city == value) {
	                    this.setState({ country_list: item.contain });
	                    break;
	                }
	            }
	        }
	    };
	    TwAddress.prototype.render = function () {
	        var out_html = null;
	        if (this.props.ver == 1) {
	            out_html = (React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-xs-2"}, React.createElement("input", {type: "text", className: "form-control", value: this.props.zip_value, onChange: this.onZipChange, maxLength: 5, required: true, disabled: true})), React.createElement("div", {className: "col-xs-2"}, React.createElement("select", {className: "form-control", value: this.props.city_value, onChange: this.onCityChange, required: this.props.required, disabled: this.props.disabled}, React.createElement("option", {value: ""}), DT.twDistrict.map(function (itemData, i) {
	                return React.createElement("option", {key: itemData.city, value: itemData.city}, itemData.city);
	            }))), React.createElement("div", {className: "col-xs-2"}, React.createElement("select", {className: "form-control", value: this.props.country_value, onChange: this.onCountryChange, required: this.props.required, disabled: this.props.disabled}, React.createElement("option", {value: ""}), this.state.country_list.map(function (itemData, i) {
	                return React.createElement("option", {key: itemData.county, value: itemData.county}, itemData.county);
	            }))), React.createElement("div", {className: "col-xs-6"}, React.createElement("input", {type: "text", className: "form-control", value: this.props.address_value, onChange: this.onAddressChange, maxLength: 128, required: this.props.required, disabled: this.props.disabled}))));
	        }
	        return out_html;
	    };
	    TwAddress.defaultProps = {
	        onChange: null,
	        zip_value: null,
	        city_value: null,
	        country_value: null,
	        address_value: null,
	        required: false,
	        disabled: false,
	        ver: 1
	    };
	    return TwAddress;
	}(React.Component));
	exports.TwAddress = TwAddress;
	var StateForGird = (function (_super) {
	    __extends(StateForGird, _super);
	    function StateForGird() {
	        _super.call(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	        this.render = this.render.bind(this);
	        this.state = {
	            setClass: null,
	            label: null
	        };
	    }
	    StateForGird.prototype.componentWillReceiveProps = function (nextProps) {
	        for (var i in this.props.stateData) {
	            var item = this.props.stateData[i];
	            if (item.id == nextProps.id) {
	                this.setState({ setClass: item.classNameforG, label: item.label });
	                break;
	            }
	        }
	    };
	    StateForGird.prototype.componentDidMount = function () {
	        for (var i in this.props.stateData) {
	            var item = this.props.stateData[i];
	            if (item.id == this.props.id) {
	                this.setState({ setClass: item.classNameforG, label: item.label });
	                break;
	            }
	        }
	    };
	    StateForGird.prototype.render = function () {
	        var outHtml = null;
	        outHtml = React.createElement("span", {className: this.state.setClass}, this.state.label);
	        return outHtml;
	    };
	    StateForGird.defaultProps = {
	        stateData: [],
	        id: null,
	        ver: 1
	    };
	    return StateForGird;
	}(React.Component));
	exports.StateForGird = StateForGird;


/***/ },

/***/ 781:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
	 * Sortable
	 * @author	RubaXa   <trash@rubaxa.org>
	 * @license MIT
	 */


	(function (factory) {
		"use strict";

		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof module != "undefined" && typeof module.exports != "undefined") {
			module.exports = factory();
		}
		else if (typeof Package !== "undefined") {
			Sortable = factory();  // export for Meteor.js
		}
		else {
			/* jshint sub:true */
			window["Sortable"] = factory();
		}
	})(function () {
		"use strict";

		var dragEl,
			parentEl,
			ghostEl,
			cloneEl,
			rootEl,
			nextEl,

			scrollEl,
			scrollParentEl,

			lastEl,
			lastCSS,
			lastParentCSS,

			oldIndex,
			newIndex,

			activeGroup,
			autoScroll = {},

			tapEvt,
			touchEvt,

			moved,

			/** @const */
			RSPACE = /\s+/g,

			expando = 'Sortable' + (new Date).getTime(),

			win = window,
			document = win.document,
			parseInt = win.parseInt,

			supportDraggable = !!('draggable' in document.createElement('div')),
			supportCssPointerEvents = (function (el) {
				el = document.createElement('x');
				el.style.cssText = 'pointer-events:auto';
				return el.style.pointerEvents === 'auto';
			})(),

			_silent = false,

			abs = Math.abs,
			slice = [].slice,

			touchDragOverListeners = [],

			_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
				// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
				if (rootEl && options.scroll) {
					var el,
						rect,
						sens = options.scrollSensitivity,
						speed = options.scrollSpeed,

						x = evt.clientX,
						y = evt.clientY,

						winWidth = window.innerWidth,
						winHeight = window.innerHeight,

						vx,
						vy
					;

					// Delect scrollEl
					if (scrollParentEl !== rootEl) {
						scrollEl = options.scroll;
						scrollParentEl = rootEl;

						if (scrollEl === true) {
							scrollEl = rootEl;

							do {
								if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
									(scrollEl.offsetHeight < scrollEl.scrollHeight)
								) {
									break;
								}
								/* jshint boss:true */
							} while (scrollEl = scrollEl.parentNode);
						}
					}

					if (scrollEl) {
						el = scrollEl;
						rect = scrollEl.getBoundingClientRect();
						vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
						vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
					}


					if (!(vx || vy)) {
						vx = (winWidth - x <= sens) - (x <= sens);
						vy = (winHeight - y <= sens) - (y <= sens);

						/* jshint expr:true */
						(vx || vy) && (el = win);
					}


					if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
						autoScroll.el = el;
						autoScroll.vx = vx;
						autoScroll.vy = vy;

						clearInterval(autoScroll.pid);

						if (el) {
							autoScroll.pid = setInterval(function () {
								if (el === win) {
									win.scrollTo(win.pageXOffset + vx * speed, win.pageYOffset + vy * speed);
								} else {
									vy && (el.scrollTop += vy * speed);
									vx && (el.scrollLeft += vx * speed);
								}
							}, 24);
						}
					}
				}
			}, 30),

			_prepareGroup = function (options) {
				var group = options.group;

				if (!group || typeof group != 'object') {
					group = options.group = {name: group};
				}

				['pull', 'put'].forEach(function (key) {
					if (!(key in group)) {
						group[key] = true;
					}
				});

				options.groups = ' ' + group.name + (group.put.join ? ' ' + group.put.join(' ') : '') + ' ';
			}
		;



		/**
		 * @class  Sortable
		 * @param  {HTMLElement}  el
		 * @param  {Object}       [options]
		 */
		function Sortable(el, options) {
			if (!(el && el.nodeType && el.nodeType === 1)) {
				throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
			}

			this.el = el; // root element
			this.options = options = _extend({}, options);


			// Export instance
			el[expando] = this;


			// Default options
			var defaults = {
				group: Math.random(),
				sort: true,
				disabled: false,
				store: null,
				handle: null,
				scroll: true,
				scrollSensitivity: 30,
				scrollSpeed: 10,
				draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
				ghostClass: 'sortable-ghost',
				chosenClass: 'sortable-chosen',
				ignore: 'a, img',
				filter: null,
				animation: 0,
				setData: function (dataTransfer, dragEl) {
					dataTransfer.setData('Text', dragEl.textContent);
				},
				dropBubble: false,
				dragoverBubble: false,
				dataIdAttr: 'data-id',
				delay: 0,
				forceFallback: false,
				fallbackClass: 'sortable-fallback',
				fallbackOnBody: false
			};


			// Set default options
			for (var name in defaults) {
				!(name in options) && (options[name] = defaults[name]);
			}

			_prepareGroup(options);

			// Bind all private methods
			for (var fn in this) {
				if (fn.charAt(0) === '_') {
					this[fn] = this[fn].bind(this);
				}
			}

			// Setup drag mode
			this.nativeDraggable = options.forceFallback ? false : supportDraggable;

			// Bind events
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);

			if (this.nativeDraggable) {
				_on(el, 'dragover', this);
				_on(el, 'dragenter', this);
			}

			touchDragOverListeners.push(this._onDragOver);

			// Restore sorting
			options.store && this.sort(options.store.get(this));
		}


		Sortable.prototype = /** @lends Sortable.prototype */ {
			constructor: Sortable,

			_onTapStart: function (/** Event|TouchEvent */evt) {
				var _this = this,
					el = this.el,
					options = this.options,
					type = evt.type,
					touch = evt.touches && evt.touches[0],
					target = (touch || evt).target,
					originalTarget = target,
					filter = options.filter;


				if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
					return; // only left button or enabled
				}

				target = _closest(target, options.draggable, el);

				if (!target) {
					return;
				}

				// get the index of the dragged element within its parent
				oldIndex = _index(target);

				// Check filter
				if (typeof filter === 'function') {
					if (filter.call(this, evt, target, this)) {
						_dispatchEvent(_this, originalTarget, 'filter', target, el, oldIndex);
						evt.preventDefault();
						return; // cancel dnd
					}
				}
				else if (filter) {
					filter = filter.split(',').some(function (criteria) {
						criteria = _closest(originalTarget, criteria.trim(), el);

						if (criteria) {
							_dispatchEvent(_this, criteria, 'filter', target, el, oldIndex);
							return true;
						}
					});

					if (filter) {
						evt.preventDefault();
						return; // cancel dnd
					}
				}


				if (options.handle && !_closest(originalTarget, options.handle, el)) {
					return;
				}


				// Prepare `dragstart`
				this._prepareDragStart(evt, touch, target);
			},

			_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target) {
				var _this = this,
					el = _this.el,
					options = _this.options,
					ownerDocument = el.ownerDocument,
					dragStartFn;

				if (target && !dragEl && (target.parentNode === el)) {
					tapEvt = evt;

					rootEl = el;
					dragEl = target;
					parentEl = dragEl.parentNode;
					nextEl = dragEl.nextSibling;
					activeGroup = options.group;

					dragStartFn = function () {
						// Delayed drag has been triggered
						// we can re-enable the events: touchmove/mousemove
						_this._disableDelayedDrag();

						// Make the element draggable
						dragEl.draggable = true;

						// Chosen item
						_toggleClass(dragEl, _this.options.chosenClass, true);

						// Bind the events: dragstart/dragend
						_this._triggerDragStart(touch);
					};

					// Disable "draggable"
					options.ignore.split(',').forEach(function (criteria) {
						_find(dragEl, criteria.trim(), _disableDraggable);
					});

					_on(ownerDocument, 'mouseup', _this._onDrop);
					_on(ownerDocument, 'touchend', _this._onDrop);
					_on(ownerDocument, 'touchcancel', _this._onDrop);

					if (options.delay) {
						// If the user moves the pointer or let go the click or touch
						// before the delay has been reached:
						// disable the delayed drag
						_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
						_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);

						_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
					} else {
						dragStartFn();
					}
				}
			},

			_disableDelayedDrag: function () {
				var ownerDocument = this.el.ownerDocument;

				clearTimeout(this._dragStartTimer);
				_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
				_off(ownerDocument, 'touchend', this._disableDelayedDrag);
				_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
				_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
				_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			},

			_triggerDragStart: function (/** Touch */touch) {
				if (touch) {
					// Touch device support
					tapEvt = {
						target: dragEl,
						clientX: touch.clientX,
						clientY: touch.clientY
					};

					this._onDragStart(tapEvt, 'touch');
				}
				else if (!this.nativeDraggable) {
					this._onDragStart(tapEvt, true);
				}
				else {
					_on(dragEl, 'dragend', this);
					_on(rootEl, 'dragstart', this._onDragStart);
				}

				try {
					if (document.selection) {
						document.selection.empty();
					} else {
						window.getSelection().removeAllRanges();
					}
				} catch (err) {
				}
			},

			_dragStarted: function () {
				if (rootEl && dragEl) {
					// Apply effect
					_toggleClass(dragEl, this.options.ghostClass, true);

					Sortable.active = this;

					// Drag start event
					_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
				}
			},

			_emulateDragOver: function () {
				if (touchEvt) {
					if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
						return;
					}

					this._lastX = touchEvt.clientX;
					this._lastY = touchEvt.clientY;

					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', 'none');
					}

					var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
						parent = target,
						groupName = ' ' + this.options.group.name + '',
						i = touchDragOverListeners.length;

					if (parent) {
						do {
							if (parent[expando] && parent[expando].options.groups.indexOf(groupName) > -1) {
								while (i--) {
									touchDragOverListeners[i]({
										clientX: touchEvt.clientX,
										clientY: touchEvt.clientY,
										target: target,
										rootEl: parent
									});
								}

								break;
							}

							target = parent; // store last element
						}
						/* jshint boss:true */
						while (parent = parent.parentNode);
					}

					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', '');
					}
				}
			},


			_onTouchMove: function (/**TouchEvent*/evt) {
				if (tapEvt) {
					// only set the status to dragging, when we are actually dragging
					if (!Sortable.active) {
						this._dragStarted();
					}

					// as well as creating the ghost element on the document body
					this._appendGhost();

					var touch = evt.touches ? evt.touches[0] : evt,
						dx = touch.clientX - tapEvt.clientX,
						dy = touch.clientY - tapEvt.clientY,
						translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

					moved = true;
					touchEvt = touch;

					_css(ghostEl, 'webkitTransform', translate3d);
					_css(ghostEl, 'mozTransform', translate3d);
					_css(ghostEl, 'msTransform', translate3d);
					_css(ghostEl, 'transform', translate3d);

					evt.preventDefault();
				}
			},

			_appendGhost: function () {
				if (!ghostEl) {
					var rect = dragEl.getBoundingClientRect(),
						css = _css(dragEl),
						options = this.options,
						ghostRect;

					ghostEl = dragEl.cloneNode(true);

					_toggleClass(ghostEl, options.ghostClass, false);
					_toggleClass(ghostEl, options.fallbackClass, true);

					_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
					_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
					_css(ghostEl, 'width', rect.width);
					_css(ghostEl, 'height', rect.height);
					_css(ghostEl, 'opacity', '0.8');
					_css(ghostEl, 'position', 'fixed');
					_css(ghostEl, 'zIndex', '100000');
					_css(ghostEl, 'pointerEvents', 'none');

					options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

					// Fixing dimensions.
					ghostRect = ghostEl.getBoundingClientRect();
					_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
					_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
				}
			},

			_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
				var dataTransfer = evt.dataTransfer,
					options = this.options;

				this._offUpEvents();

				if (activeGroup.pull == 'clone') {
					cloneEl = dragEl.cloneNode(true);
					_css(cloneEl, 'display', 'none');
					rootEl.insertBefore(cloneEl, dragEl);
				}

				if (useFallback) {

					if (useFallback === 'touch') {
						// Bind touch events
						_on(document, 'touchmove', this._onTouchMove);
						_on(document, 'touchend', this._onDrop);
						_on(document, 'touchcancel', this._onDrop);
					} else {
						// Old brwoser
						_on(document, 'mousemove', this._onTouchMove);
						_on(document, 'mouseup', this._onDrop);
					}

					this._loopId = setInterval(this._emulateDragOver, 50);
				}
				else {
					if (dataTransfer) {
						dataTransfer.effectAllowed = 'move';
						options.setData && options.setData.call(this, dataTransfer, dragEl);
					}

					_on(document, 'drop', this);
					setTimeout(this._dragStarted, 0);
				}
			},

			_onDragOver: function (/**Event*/evt) {
				var el = this.el,
					target,
					dragRect,
					revert,
					options = this.options,
					group = options.group,
					groupPut = group.put,
					isOwner = (activeGroup === group),
					canSort = options.sort;

				if (evt.preventDefault !== void 0) {
					evt.preventDefault();
					!options.dragoverBubble && evt.stopPropagation();
				}

				moved = true;

				if (activeGroup && !options.disabled &&
					(isOwner
						? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
						: activeGroup.pull && groupPut && (
							(activeGroup.name === group.name) || // by Name
							(groupPut.indexOf && ~groupPut.indexOf(activeGroup.name)) // by Array
						)
					) &&
					(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
				) {
					// Smart auto-scrolling
					_autoScroll(evt, options, this.el);

					if (_silent) {
						return;
					}

					target = _closest(evt.target, options.draggable, el);
					dragRect = dragEl.getBoundingClientRect();

					if (revert) {
						_cloneHide(true);

						if (cloneEl || nextEl) {
							rootEl.insertBefore(dragEl, cloneEl || nextEl);
						}
						else if (!canSort) {
							rootEl.appendChild(dragEl);
						}

						return;
					}


					if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
						(el === evt.target) && (target = _ghostIsLast(el, evt))
					) {

						if (target) {
							if (target.animated) {
								return;
							}

							targetRect = target.getBoundingClientRect();
						}

						_cloneHide(isOwner);

						if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect) !== false) {
							if (!dragEl.contains(el)) {
								el.appendChild(dragEl);
								parentEl = el; // actualization
							}

							this._animate(dragRect, dragEl);
							target && this._animate(targetRect, target);
						}
					}
					else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
						if (lastEl !== target) {
							lastEl = target;
							lastCSS = _css(target);
							lastParentCSS = _css(target.parentNode);
						}


						var targetRect = target.getBoundingClientRect(),
							width = targetRect.right - targetRect.left,
							height = targetRect.bottom - targetRect.top,
							floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display)
								|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
							isWide = (target.offsetWidth > dragEl.offsetWidth),
							isLong = (target.offsetHeight > dragEl.offsetHeight),
							halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
							nextSibling = target.nextElementSibling,
							moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect),
							after
						;

						if (moveVector !== false) {
							_silent = true;
							setTimeout(_unsilent, 30);

							_cloneHide(isOwner);

							if (moveVector === 1 || moveVector === -1) {
								after = (moveVector === 1);
							}
							else if (floating) {
								var elTop = dragEl.offsetTop,
									tgTop = target.offsetTop;

								if (elTop === tgTop) {
									after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
								} else {
									after = tgTop > elTop;
								}
							} else {
								after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
							}

							if (!dragEl.contains(el)) {
								if (after && !nextSibling) {
									el.appendChild(dragEl);
								} else {
									target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
								}
							}

							parentEl = dragEl.parentNode; // actualization

							this._animate(dragRect, dragEl);
							this._animate(targetRect, target);
						}
					}
				}
			},

			_animate: function (prevRect, target) {
				var ms = this.options.animation;

				if (ms) {
					var currentRect = target.getBoundingClientRect();

					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) + 'px,'
						+ (prevRect.top - currentRect.top) + 'px,0)'
					);

					target.offsetWidth; // repaint

					_css(target, 'transition', 'all ' + ms + 'ms');
					_css(target, 'transform', 'translate3d(0,0,0)');

					clearTimeout(target.animated);
					target.animated = setTimeout(function () {
						_css(target, 'transition', '');
						_css(target, 'transform', '');
						target.animated = false;
					}, ms);
				}
			},

			_offUpEvents: function () {
				var ownerDocument = this.el.ownerDocument;

				_off(document, 'touchmove', this._onTouchMove);
				_off(ownerDocument, 'mouseup', this._onDrop);
				_off(ownerDocument, 'touchend', this._onDrop);
				_off(ownerDocument, 'touchcancel', this._onDrop);
			},

			_onDrop: function (/**Event*/evt) {
				var el = this.el,
					options = this.options;

				clearInterval(this._loopId);
				clearInterval(autoScroll.pid);
				clearTimeout(this._dragStartTimer);

				// Unbind events
				_off(document, 'mousemove', this._onTouchMove);

				if (this.nativeDraggable) {
					_off(document, 'drop', this);
					_off(el, 'dragstart', this._onDragStart);
				}

				this._offUpEvents();

				if (evt) {
					if (moved) {
						evt.preventDefault();
						!options.dropBubble && evt.stopPropagation();
					}

					ghostEl && ghostEl.parentNode.removeChild(ghostEl);

					if (dragEl) {
						if (this.nativeDraggable) {
							_off(dragEl, 'dragend', this);
						}

						_disableDraggable(dragEl);

						// Remove class's
						_toggleClass(dragEl, this.options.ghostClass, false);
						_toggleClass(dragEl, this.options.chosenClass, false);

						if (rootEl !== parentEl) {
							newIndex = _index(dragEl);

							if (newIndex >= 0) {
								// drag from one list and drop into another
								_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);

								// Add event
								_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

								// Remove event
								_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
							}
						}
						else {
							// Remove clone
							cloneEl && cloneEl.parentNode.removeChild(cloneEl);

							if (dragEl.nextSibling !== nextEl) {
								// Get the index of the dragged element within its parent
								newIndex = _index(dragEl);

								if (newIndex >= 0) {
									// drag & drop within the same list
									_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
									_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
								}
							}
						}

						if (Sortable.active) {
							if (newIndex === null || newIndex === -1) {
								newIndex = oldIndex;
							}

							_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

							// Save sorting
							this.save();
						}
					}

					// Nulling
					rootEl =
					dragEl =
					parentEl =
					ghostEl =
					nextEl =
					cloneEl =

					scrollEl =
					scrollParentEl =

					tapEvt =
					touchEvt =

					moved =
					newIndex =

					lastEl =
					lastCSS =

					activeGroup =
					Sortable.active = null;
				}
			},


			handleEvent: function (/**Event*/evt) {
				var type = evt.type;

				if (type === 'dragover' || type === 'dragenter') {
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
				}
				else if (type === 'drop' || type === 'dragend') {
					this._onDrop(evt);
				}
			},


			/**
			 * Serializes the item into an array of string.
			 * @returns {String[]}
			 */
			toArray: function () {
				var order = [],
					el,
					children = this.el.children,
					i = 0,
					n = children.length,
					options = this.options;

				for (; i < n; i++) {
					el = children[i];
					if (_closest(el, options.draggable, this.el)) {
						order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
					}
				}

				return order;
			},


			/**
			 * Sorts the elements according to the array.
			 * @param  {String[]}  order  order of the items
			 */
			sort: function (order) {
				var items = {}, rootEl = this.el;

				this.toArray().forEach(function (id, i) {
					var el = rootEl.children[i];

					if (_closest(el, this.options.draggable, rootEl)) {
						items[id] = el;
					}
				}, this);

				order.forEach(function (id) {
					if (items[id]) {
						rootEl.removeChild(items[id]);
						rootEl.appendChild(items[id]);
					}
				});
			},


			/**
			 * Save the current sorting
			 */
			save: function () {
				var store = this.options.store;
				store && store.set(this);
			},


			/**
			 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
			 * @param   {HTMLElement}  el
			 * @param   {String}       [selector]  default: `options.draggable`
			 * @returns {HTMLElement|null}
			 */
			closest: function (el, selector) {
				return _closest(el, selector || this.options.draggable, this.el);
			},


			/**
			 * Set/get option
			 * @param   {string} name
			 * @param   {*}      [value]
			 * @returns {*}
			 */
			option: function (name, value) {
				var options = this.options;

				if (value === void 0) {
					return options[name];
				} else {
					options[name] = value;

					if (name === 'group') {
						_prepareGroup(options);
					}
				}
			},


			/**
			 * Destroy
			 */
			destroy: function () {
				var el = this.el;

				el[expando] = null;

				_off(el, 'mousedown', this._onTapStart);
				_off(el, 'touchstart', this._onTapStart);

				if (this.nativeDraggable) {
					_off(el, 'dragover', this);
					_off(el, 'dragenter', this);
				}

				// Remove draggable attributes
				Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
					el.removeAttribute('draggable');
				});

				touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

				this._onDrop();

				this.el = el = null;
			}
		};


		function _cloneHide(state) {
			if (cloneEl && (cloneEl.state !== state)) {
				_css(cloneEl, 'display', state ? 'none' : '');
				!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
				cloneEl.state = state;
			}
		}


		function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
			if (el) {
				ctx = ctx || document;
				selector = selector.split('.');

				var tag = selector.shift().toUpperCase(),
					re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

				do {
					if (
						(tag === '>*' && el.parentNode === ctx) || (
							(tag === '' || el.nodeName.toUpperCase() == tag) &&
							(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
						)
					) {
						return el;
					}
				}
				while (el !== ctx && (el = el.parentNode));
			}

			return null;
		}


		function _globalDragOver(/**Event*/evt) {
			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'move';
			}
			evt.preventDefault();
		}


		function _on(el, event, fn) {
			el.addEventListener(event, fn, false);
		}


		function _off(el, event, fn) {
			el.removeEventListener(event, fn, false);
		}


		function _toggleClass(el, name, state) {
			if (el) {
				if (el.classList) {
					el.classList[state ? 'add' : 'remove'](name);
				}
				else {
					var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
					el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
				}
			}
		}


		function _css(el, prop, val) {
			var style = el && el.style;

			if (style) {
				if (val === void 0) {
					if (document.defaultView && document.defaultView.getComputedStyle) {
						val = document.defaultView.getComputedStyle(el, '');
					}
					else if (el.currentStyle) {
						val = el.currentStyle;
					}

					return prop === void 0 ? val : val[prop];
				}
				else {
					if (!(prop in style)) {
						prop = '-webkit-' + prop;
					}

					style[prop] = val + (typeof val === 'string' ? '' : 'px');
				}
			}
		}


		function _find(ctx, tagName, iterator) {
			if (ctx) {
				var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

				if (iterator) {
					for (; i < n; i++) {
						iterator(list[i], i);
					}
				}

				return list;
			}

			return [];
		}



		function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
			var evt = document.createEvent('Event'),
				options = (sortable || rootEl[expando]).options,
				onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

			evt.initEvent(name, true, true);

			evt.to = rootEl;
			evt.from = fromEl || rootEl;
			evt.item = targetEl || rootEl;
			evt.clone = cloneEl;

			evt.oldIndex = startIndex;
			evt.newIndex = newIndex;

			rootEl.dispatchEvent(evt);

			if (options[onName]) {
				options[onName].call(sortable, evt);
			}
		}


		function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect) {
			var evt,
				sortable = fromEl[expando],
				onMoveFn = sortable.options.onMove,
				retVal;

			evt = document.createEvent('Event');
			evt.initEvent('move', true, true);

			evt.to = toEl;
			evt.from = fromEl;
			evt.dragged = dragEl;
			evt.draggedRect = dragRect;
			evt.related = targetEl || toEl;
			evt.relatedRect = targetRect || toEl.getBoundingClientRect();

			fromEl.dispatchEvent(evt);

			if (onMoveFn) {
				retVal = onMoveFn.call(sortable, evt);
			}

			return retVal;
		}


		function _disableDraggable(el) {
			el.draggable = false;
		}


		function _unsilent() {
			_silent = false;
		}


		/** @returns {HTMLElement|false} */
		function _ghostIsLast(el, evt) {
			var lastEl = el.lastElementChild,
					rect = lastEl.getBoundingClientRect();

			return ((evt.clientY - (rect.top + rect.height) > 5) || (evt.clientX - (rect.right + rect.width) > 5)) && lastEl; // min delta
		}


		/**
		 * Generate id
		 * @param   {HTMLElement} el
		 * @returns {String}
		 * @private
		 */
		function _generateId(el) {
			var str = el.tagName + el.className + el.src + el.href + el.textContent,
				i = str.length,
				sum = 0;

			while (i--) {
				sum += str.charCodeAt(i);
			}

			return sum.toString(36);
		}

		/**
		 * Returns the index of an element within its parent
		 * @param  {HTMLElement} el
		 * @return {number}
		 */
		function _index(el) {
			var index = 0;

			if (!el || !el.parentNode) {
				return -1;
			}

			while (el && (el = el.previousElementSibling)) {
				if (el.nodeName.toUpperCase() !== 'TEMPLATE') {
					index++;
				}
			}

			return index;
		}

		function _throttle(callback, ms) {
			var args, _this;

			return function () {
				if (args === void 0) {
					args = arguments;
					_this = this;

					setTimeout(function () {
						if (args.length === 1) {
							callback.call(_this, args[0]);
						} else {
							callback.apply(_this, args);
						}

						args = void 0;
					}, ms);
				}
			};
		}

		function _extend(dst, src) {
			if (dst && src) {
				for (var key in src) {
					if (src.hasOwnProperty(key)) {
						dst[key] = src[key];
					}
				}
			}

			return dst;
		}


		// Export utils
		Sortable.utils = {
			on: _on,
			off: _off,
			css: _css,
			find: _find,
			is: function (el, selector) {
				return !!_closest(el, selector, el);
			},
			extend: _extend,
			throttle: _throttle,
			closest: _closest,
			toggleClass: _toggleClass,
			index: _index
		};


		/**
		 * Create sortable instance
		 * @param {HTMLElement}  el
		 * @param {Object}      [options]
		 */
		Sortable.create = function (el, options) {
			return new Sortable(el, options);
		};


		// Export
		Sortable.version = '1.4.2';
		return Sortable;
	});


/***/ },

/***/ 782:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Simple Ajax Uploader
	 * Version 2.2.4
	 * https://github.com/LPology/Simple-Ajax-Uploader
	 *
	 * Copyright 2012-2015 LPology, LLC
	 * Released under the MIT license
	 */

	;(function( global, factory ) {
	    if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return factory( global );
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if ( typeof module === 'object' && module.exports ) {
	        module.exports = factory( global );

	    } else {
	        global.ss = factory( global );
	    }

	}( typeof window !== 'undefined' ? window : this, function( window ) {

	    var ss = window.ss || {},

	        // ss.trim()
	        rLWhitespace = /^\s+/,
	        rTWhitespace = /\s+$/,

	        // ss.getUID
	        uidReplace = /[xy]/g,

	        // ss.getFilename()
	        rPath = /.*(\/|\\)/,

	        // ss.getExt()
	        rExt = /.*[.]/,

	        // ss.hasClass()
	        rHasClass = /[\t\r\n]/g,

	        // Check for Safari -- it doesn't like multi file uploading. At all.
	        // http://stackoverflow.com/a/9851769/1091949
	        isSafari = Object.prototype.toString.call( window.HTMLElement ).indexOf( 'Constructor' ) > 0,

	        isIE7 = ( navigator.userAgent.indexOf('MSIE 7') !== -1 ),

	        // Check whether XHR uploads are supported
	        input = document.createElement( 'input' ),

	        XhrOk;

	    input.type = 'file';

	    XhrOk = ( 'multiple' in input &&
	              typeof File !== 'undefined' &&
	              typeof ( new XMLHttpRequest() ).upload !== 'undefined' );


	/**
	* Converts object to query string
	*/
	ss.obj2string = function( obj, prefix ) {
	    "use strict";

	    var str = [];

	    for ( var prop in obj ) {
	        if ( obj.hasOwnProperty( prop ) ) {
	            var k = prefix ? prefix + '[' + prop + ']' : prop, v = obj[prop];
	            str.push( typeof v === 'object' ?
	                        ss.obj2string( v, k ) :
	                        encodeURIComponent( k ) + '=' + encodeURIComponent( v ) );
	        }
	    }

	    return str.join( '&' );
	};

	/**
	* Copies all missing properties from second object to first object
	*/
	ss.extendObj = function( first, second ) {
	    "use strict";

	    for ( var prop in second ) {
	        if ( second.hasOwnProperty( prop ) ) {
	            first[prop] = second[prop];
	        }
	    }
	};

	ss.addEvent = function( elem, type, fn ) {
	    "use strict";

	    if ( elem.addEventListener ) {
	        elem.addEventListener( type, fn, false );

	    } else {
	        elem.attachEvent( 'on' + type, fn );
	    }
	    return function() {
	        ss.removeEvent( elem, type, fn );
	    };
	};

	ss.removeEvent = document.removeEventListener ?
	    function( elem, type, fn ) {
	        if ( elem.removeEventListener ) {
	            elem.removeEventListener( type, fn, false );
	        }
	    } :
	    function( elem, type, fn ) {
	        var name = 'on' + type;

	        if ( typeof elem[ name ] === 'undefined' ) {
	            elem[ name ] = null;
	        }

	        elem.detachEvent( name, fn );
	    };

	ss.newXHR = function() {
	    "use strict";

	    if ( typeof XMLHttpRequest !== 'undefined' ) {
	        return new window.XMLHttpRequest();

	    } else if ( window.ActiveXObject ) {
	        try {
	            return new window.ActiveXObject( 'Microsoft.XMLHTTP' );
	        } catch ( err ) {
	            return false;
	        }
	    }
	};

	ss.getIFrame = function() {
	    "use strict";

	    var id = ss.getUID(),
	        iframe;

	    // IE7 can only create an iframe this way, all others are the other way
	    if ( isIE7 ) {
	        iframe = document.createElement('<iframe src="javascript:false;" name="' + id + '">');

	    } else {
	        iframe = document.createElement('iframe');
	        /*jshint scripturl:true*/
	        iframe.src = 'javascript:false;';
	        iframe.name = id;
	    }

	    iframe.style.display = 'none';
	    iframe.id = id;
	    return iframe;
	};

	ss.getForm = function( opts ) {
	    "use strict";

	    var form = document.createElement('form');

	    form.encoding = 'multipart/form-data'; // IE
	    form.enctype = 'multipart/form-data';
	    form.style.display = 'none';

	    for ( var prop in opts ) {
	        if ( opts.hasOwnProperty( prop ) ) {
	            form[prop] = opts[prop];
	        }
	    }

	    return form;
	};

	ss.getHidden = function( name, value ) {
	    "use strict";

	    var input = document.createElement( 'input' );

	    input.type = 'hidden';
	    input.name = name;
	    input.value = value;
	    return input;
	};

	/**
	* Parses a JSON string and returns a Javascript object
	* Borrowed from www.jquery.com
	*/
	ss.parseJSON = function( data ) {
	    "use strict";

	    if ( !data ) {
	        return false;
	    }

	    data = ss.trim( data + '' );

	    if ( window.JSON && window.JSON.parse ) {
	        try {
	            // Support: Android 2.3
	            // Workaround failure to string-cast null input
	            return window.JSON.parse( data + '' );
	        } catch ( err ) {
	            return false;
	        }
	    }

	    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
	        depth = null,
	        requireNonComma;

	    // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	    // after removing valid tokens
	    return data && !ss.trim( data.replace( rvalidtokens, function( token, comma, open, close ) {

	        // Force termination if we see a misplaced comma
	        if ( requireNonComma && comma ) {
	            depth = 0;
	        }

	        // Perform no more replacements after returning to outermost depth
	        if ( depth === 0 ) {
	            return token;
	        }

	        // Commas must not follow "[", "{", or ","
	        requireNonComma = open || comma;

	        // Determine new depth
	        // array/object open ("[" or "{"): depth += true - false (increment)
	        // array/object close ("]" or "}"): depth += false - true (decrement)
	        // other cases ("," or primitive): depth += true - true (numeric cast)
	        depth += !close - !open;

	        // Remove this token
	        return '';
	    }) ) ?
	        ( Function( 'return ' + data ) )() :
	        false;
	};

	ss.getBox = function( elem ) {
	    "use strict";

	    var box,
	        docElem,
	        top = 0,
	        left = 0;

	    if ( elem.getBoundingClientRect ) {
	        box = elem.getBoundingClientRect();
	        docElem = document.documentElement;
	        top = box.top  + ( window.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 );
	        left = box.left + ( window.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 );

	    } else {
	        do {
	            left += elem.offsetLeft;
	            top += elem.offsetTop;
	        } while ( ( elem = elem.offsetParent ) );
	    }

	    return {
	        top: Math.round( top ),
	        left: Math.round( left )
	    };
	};

	/**
	* Helper that takes object literal
	* and add all properties to element.style
	* @param {Element} el
	* @param {Object} styles
	*/
	ss.addStyles = function( elem, styles ) {
	    "use strict";

	    for ( var name in styles ) {
	        if ( styles.hasOwnProperty( name ) ) {
	            elem.style[name] = styles[name];
	        }
	    }
	};

	/**
	* Function places an absolutely positioned
	* element on top of the specified element
	* copying position and dimensions.
	*/
	ss.copyLayout = function( from, to ) {
	    "use strict";

	    var box = ss.getBox( from );

	    ss.addStyles( to, {
	        position: 'absolute',
	        left : box.left + 'px',
	        top : box.top + 'px',
	        width : from.offsetWidth + 'px',
	        height : from.offsetHeight + 'px'
	    });
	};

	/**
	* Generates unique ID
	* Complies with RFC 4122 version 4
	* http://stackoverflow.com/a/2117523/1091949
	* ID begins with letter "a" to be safe for HTML elem ID/name attr (can't start w/ number)
	*/
	ss.getUID = function() {
	    "use strict";

	    /*jslint bitwise: true*/
	    return 'axxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(uidReplace, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	};

	/**
	* Removes white space from left and right of string
	*/
	ss.trim = function( text ) {
	    "use strict";
	    return text.toString().replace( rLWhitespace, '' ).replace( rTWhitespace, '' );
	};

	/**
	* Extract file name from path
	*/
	ss.getFilename = function( path ) {
	    "use strict";
	    return path.replace( rPath, '' );
	};

	/**
	* Get file extension
	*/
	ss.getExt = function( file ) {
	    "use strict";
	    return ( -1 !== file.indexOf( '.' ) ) ? file.replace( rExt, '' ) : '';
	};

	/**
	* Check whether element has a particular CSS class
	* Parts borrowed from www.jquery.com
	*/
	ss.hasClass = function( elem, name ) {
	    "use strict";

	    if ( !elem || !name ) {
	        return false;
	    }

	    return ( ' ' + elem.className + ' ' ).replace( rHasClass, ' ' ).indexOf( ' ' + name + ' ' ) >= 0;
	};

	/**
	* Adds CSS class to an element
	*/
	ss.addClass = function( elem, name ) {
	    "use strict";

	    if ( !elem || !name ) {
	        return false;
	    }

	    if ( !ss.hasClass( elem, name ) ) {
	        elem.className += ' ' + name;
	    }
	};

	/**
	* Removes CSS class from an element
	*/
	ss.removeClass = (function() {
	    "use strict";

	    var c = {}; //cache regexps for performance

	    return function( e, name ) {
	        if ( !e || !name ) {
	            return false;
	        }

	        if ( !c[name] ) {
	            c[name] = new RegExp('(?:^|\\s)' + name + '(?!\\S)');
	        }

	        e.className = e.className.replace( c[name], '' );
	    };
	})();

	/**
	* Nulls out event handlers to prevent memory leaks in IE6/IE7
	* http://javascript.crockford.com/memory/leak.html
	* @param {Element} d
	* @return void
	*/
	ss.purge = function( d ) {
	    "use strict";

	    var a = d.attributes, i, l, n;

	    if ( a ) {
	        for ( i = a.length - 1; i >= 0; i -= 1 ) {
	            n = a[i].name;

	            if ( typeof d[n] === 'function' ) {
	                d[n] = null;
	            }
	        }
	    }

	    a = d.childNodes;

	    if ( a ) {
	        l = a.length;
	        for ( i = 0; i < l; i += 1 ) {
	            ss.purge( d.childNodes[i] );
	        }
	    }
	};

	/**
	* Removes element from the DOM
	*/
	ss.remove = function( elem ) {
	    "use strict";

	    if ( elem && elem.parentNode ) {
	        // null out event handlers for IE
	        ss.purge( elem );
	        elem.parentNode.removeChild( elem );
	    }
	    elem = null;
	};

	/**
	* Accepts either a jQuery object, a string containing an element ID, or an element,
	* verifies that it exists, and returns the element.
	* @param {Mixed} elem
	* @return {Element}
	*/
	ss.verifyElem = function( elem ) {
	    "use strict";

	    if ( typeof jQuery !== 'undefined' && elem instanceof jQuery ) {
	        elem = elem[0];

	    } else if ( typeof elem === 'string' ) {
	        if ( elem.charAt( 0 ) == '#' ) {
	            elem = elem.substr( 1 );
	        }
	        elem = document.getElementById( elem );
	    }

	    if ( !elem || elem.nodeType !== 1 ) {
	        return false;
	    }

	    if ( elem.nodeName.toUpperCase() == 'A' ) {
	        elem.style.cursor = 'pointer';

	        ss.addEvent( elem, 'click', function( e ) {
	            if ( e && e.preventDefault ) {
	                e.preventDefault();

	            } else if ( window.event ) {
	                window.event.returnValue = false;
	            }
	        });
	    }

	    return elem;
	};

	ss._options = {};

	ss.uploadSetup = function( options ) {
	    "use strict";
	    ss.extendObj( ss._options, options );
	};

	ss.SimpleUpload = function( options ) {
	    "use strict";

	    var i,
	        len,
	        btn;

	    this._opts = {
	        button: '',
	        url: '',
	        dropzone: '',
	        dragClass: '',
	        cors: false,
	        progressUrl: false,
	        sessionProgressUrl: false,
	        nginxProgressUrl: false,
	        multiple: false,
	        maxUploads: 3,
	        queue: true,
	        checkProgressInterval: 500,
	        keyParamName: 'APC_UPLOAD_PROGRESS',
	        sessionProgressName: 'PHP_SESSION_UPLOAD_PROGRESS',
	        nginxProgressHeader: 'X-Progress-ID',
	        corsInputName: 'XHR_CORS_TARGETORIGIN',
	        allowedExtensions: [],
	        accept: '',
	        maxSize: false,
	        name: '',
	        data: {},
	        noParams: false,
	        autoSubmit: true,
	        multipart: false,
	        method: 'POST',
	        responseType: '',
	        debug: false,
	        hoverClass: '',
	        focusClass: '',
	        disabledClass: '',
	        customHeaders: {},
	        encodeCustomHeaders: false,
	        onAbort: function( filename, uploadBtn, size ) {},
	        onChange: function( filename, extension, uploadBtn, size ) {},
	        onSubmit: function( filename, extension, uploadBtn, size ) {},
	        onProgress: function( pct ) {},
	        onUpdateFileSize: function( filesize ) {},
	        onComplete: function( filename, response, uploadBtn, size ) {},
	        onExtError: function( filename, extension ) {},
	        onSizeError: function( filename, fileSize ) {},
	        onError: function( filename, type, status, statusText, response, uploadBtn, size ) {},
	        startXHR: function( filename, fileSize, uploadBtn ) {},
	        endXHR: function( filename, fileSize, uploadBtn ) {},
	        startNonXHR: function( filename, uploadBtn ) {},
	        endNonXHR: function( filename, uploadBtn ) {}
	    };

	    // Include any setup options
	    ss.extendObj( this._opts, ss._options );

	    // Then add options for this instance
	    ss.extendObj( this._opts, options );

	    options = null;

	    this._btns = [];

	    // An array of buttons was passed
	    if ( this._opts.button instanceof Array ) {
	        len = this._opts.button.length;

	        for ( i = 0; i < len; i++ ) {
	            btn = ss.verifyElem( this._opts.button[i] );

	            if ( btn !== false ) {
	                this._btns.push( this.rerouteClicks( btn ) );

	            } else {
	                this.log( 'Button with array index ' + i + ' is invalid' );
	            }
	        }

	    // A single button was passed
	    } else {
	        btn = ss.verifyElem( this._opts.button );

	        if ( btn !== false ) {
	            this._btns.push( this.rerouteClicks( btn ) );
	        }
	    }

	    delete this._opts.button;
	    this._opts.button = btn = null;

	    // No valid elements were passed to button option
	    if ( this._opts.dropzone === '' && ( this._btns.length < 1 || this._btns[0] === false ) ) {
	        throw new Error( "Invalid button. Make sure the element you're passing exists." );
	    }

	    if ( this._opts.multiple === false ) {
	        this._opts.maxUploads = 1;
	    }

	    // An array of objects, each containing two items, a file and a reference
	    // to the button which triggered the upload: { file: uploadFile, btn: button }
	    this._queue = [];

	    this._active = 0;
	    this._disabled = false; // if disabled, clicking on button won't do anything
	    this._maxFails = 10; // max allowed failed progress updates requests in iframe mode
	    this._progKeys = {}; // contains the currently active upload ID progress keys

	    if ( !XhrOk ) {
	        // Cache progress keys after we set sizeBox for fewer trips to the DOM
	        this._sizeFlags = {};
	    }

	    if ( XhrOk && this._opts.dropzone !== '' ) {
	        this._dzone = ss.verifyElem( this._opts.dropzone );

	        if ( !this._dzone ) {
	            this.log( 'Invalid or nonexistent element passed for drop zone' );
	        } else {
	            this.addDropZone( this._dzone );
	        }
	    }

	    this._createInput();

	    this._manDisabled = false;
	    this.enable( true );
	};

	ss.SimpleUpload.prototype = {

	    _killInput: function() {
	        "use strict";

	        if ( !this._input ) {
	            return;
	        }

	        if ( this._input.turnOff ) {
	            this._input.turnOff();
	        }

	        if ( this._input.focusOff ) {
	            this._input.focusOff();
	        }

	        if ( this._input.blurOff ) {
	            this._input.blurOff();
	        }

	        if ( this._input.parentNode.mouseOverOff ) {
	            this._input.parentNode.mouseOverOff();
	        }

	        ss.remove( this._input.parentNode );
	        delete this._input;
	        this._input = null;
	    },

	    destroy: function() {
	        "use strict";

	        // # of upload buttons
	        var i = this._btns.length;

	        // Put upload buttons back to the way we found them
	        while ( i-- ) {
	            // Remove event listener
	            if ( this._btns[i].off ) {
	                this._btns[i].off();
	            }

	            // Remove any lingering classes
	            ss.removeClass( this._btns[i], this._opts.hoverClass );
	            ss.removeClass( this._btns[i], this._opts.focusClass );
	            ss.removeClass( this._btns[i], this._opts.disabledClass );

	            // In case we disabled it
	            this._btns[i].disabled = false;
	        }

	        this._killInput();

	        // Set a flag to be checked in _last()
	        this._destroy = true;
	    },

	    /**
	    * Send data to browser console if debug is set to true
	    */
	    log: function( str ) {
	        "use strict";

	        if ( this._opts && this._opts.debug && window.console && window.console.log ) {
	            window.console.log( '[Uploader] ' + str );
	        }
	    },

	    /**
	    * Replaces user data
	    * Note that all previously set data is entirely removed and replaced
	    */
	    setData: function( data ) {
	        "use strict";
	        this._opts.data = data;
	    },

	    /**
	    * Set or change uploader options
	    * @param {Object} options
	    */
	    setOptions: function( options ) {
	        "use strict";
	        ss.extendObj( this._opts, options );
	    },

	    /**
	    * Designate an element as a progress bar
	    * The CSS width % of the element will be updated as the upload progresses
	    */
	    setProgressBar: function( elem ) {
	        "use strict";
	        this._progBar = ss.verifyElem( elem );
	    },

	    /**
	    * Designate an element to receive a string containing progress % during upload
	    * Note: Uses innerHTML, so any existing child elements will be wiped out
	    */
	    setPctBox: function( elem ) {
	        "use strict";
	        this._pctBox = ss.verifyElem( elem );
	    },

	    /**
	    * Designate an element to receive a string containing file size at start of upload
	    * Note: Uses innerHTML, so any existing child elements will be wiped out
	    */
	    setFileSizeBox: function( elem ) {
	        "use strict";
	        this._sizeBox = ss.verifyElem( elem );
	    },

	    /**
	    * Designate an element to be removed from DOM when upload is completed
	    * Useful for removing progress bar, file size, etc. after upload
	    */
	    setProgressContainer: function( elem ) {
	        "use strict";
	        this._progBox = ss.verifyElem( elem );
	    },

	    /**
	    * Designate an element to serve as the upload abort button
	    */
	    setAbortBtn: function( elem, remove ) {
	        "use strict";

	        this._abortBtn = ss.verifyElem( elem );
	        this._removeAbort = false;

	        if ( remove ) {
	            this._removeAbort = true;
	        }
	    },

	    /**
	    * Returns number of files currently in queue
	    */
	    getQueueSize: function() {
	        "use strict";
	        return this._queue.length;
	    },

	    /**
	    * Enables uploader and submits next file for upload
	    */
	    _cycleQueue: function() {
	        "use strict";

	        if ( this._queue.length > 0 && this._opts.autoSubmit ) {
	            this.submit();
	        }
	    },

	    /**
	    * Remove current file from upload queue, reset props, cycle to next upload
	    */
	    removeCurrent: function( id ) {
	        "use strict";

	        if ( id ) {
	            var i = this._queue.length;

	            while ( i-- ) {
	                if ( this._queue[i].id === id ) {
	                    this._queue.splice( i, 1 );
	                    break;
	                }
	            }

	        } else {
	            this._queue.splice( 0, 1 );
	        }

	        this._cycleQueue();
	    },

	    /**
	    * Clears Queue so only most recent select file is uploaded
	    */
	    clearQueue: function() {
	        "use strict";
	        this._queue.length = 0;
	    },

	    /**
	    * Disables upload functionality
	    */
	    disable: function( _self ) {
	        "use strict";

	        var i = this._btns.length,
	            nodeName;

	        // _self is always true when disable() is called internally
	        this._manDisabled = !_self || this._manDisabled === true ? true : false;
	        this._disabled = true;

	        while ( i-- ) {
	            nodeName = this._btns[i].nodeName.toUpperCase();

	            if ( nodeName == 'INPUT' || nodeName == 'BUTTON' ) {
	                this._btns[i].disabled = true;
	            }

	            if ( this._opts.disabledClass !== '' ) {
	                ss.addClass( this._btns[i], this._opts.disabledClass );
	            }
	        }

	        // Hide file input
	        if ( this._input && this._input.parentNode ) {
	            this._input.parentNode.style.visibility = 'hidden';
	        }
	    },

	    /**
	    * Enables upload functionality
	    */
	    enable: function( _self ) {
	        "use strict";

	        // _self will always be true when enable() is called internally
	        if ( !_self ) {
	            this._manDisabled = false;
	        }

	        // Don't enable uploader if it was manually disabled
	        if ( this._manDisabled === true ) {
	            return;
	        }

	        var i = this._btns.length;

	        this._disabled = false;

	        while ( i-- ) {
	            ss.removeClass( this._btns[i], this._opts.disabledClass );
	            this._btns[i].disabled = false;
	        }
	    },

	    /**
	     * Updates invisible button position
	     */
	    updatePosition: function() {
	        "use strict";

	        if ( this._btns[0] && this._input && this._input.parentNode ) {
	            this._overBtn = this._btns[0];
	            ss.copyLayout( this._btns[0], this._input.parentNode );
	        }
	    }

	};

	ss.IframeUpload = {

	    /**
	    * Accepts a URI string and returns the hostname
	    */
	    _getHost: function( uri ) {
	        var a = document.createElement( 'a' );

	        a.href = uri;

	        if ( a.hostname ) {
	            return a.hostname.toLowerCase();
	        }
	        return uri;
	    },

	    _addFiles: function( file ) {
	        var filename = ss.getFilename( file.value ),
	            ext = ss.getExt( filename );

	        if ( false === this._opts.onChange.call( this, filename, ext, this._overBtn ) ) {
	            return false;
	        }

	        this._queue.push({
	            id: ss.getUID(),
	            file: file,
	            name: filename,
	            ext: ext,
	            btn: this._overBtn,
	            size: null
	        });

	        return true;
	    },

	    /**
	    * Handles uploading with iFrame
	    */
	    _uploadIframe: function( fileObj, progBox, sizeBox, progBar, pctBox, abortBtn, removeAbort ) {
	        "use strict";

	        var self = this,
	            opts = this._opts,
	            key = ss.getUID(),
	            iframe = ss.getIFrame(),
	            form,
	            url,
	            msgLoaded = false,
	            iframeLoaded = false,
	            removeMessageListener,
	            removeLoadListener,
	            cancel;

	        if ( opts.noParams === true ) {
	            url = opts.url;

	        } else {
	            // If we're using Nginx Upload Progress Module, append upload key to the URL
	            // Also, preserve query string if there is one
	            url = !opts.nginxProgressUrl ?
	                    opts.url :
	                    url + ( ( url.indexOf( '?' ) > -1 ) ? '&' : '?' ) +
	                          encodeURIComponent( opts.nginxProgressHeader ) +
	                          '=' + encodeURIComponent( key );
	        }

	        form = ss.getForm({
	            action: url,
	            target: iframe.name,
	            method: opts.method
	        });

	        // Begin progress bars at 0%
	        opts.onProgress.call( this, 0 );

	        if ( pctBox ) {
	            pctBox.innerHTML = '0%';
	        }

	        if ( progBar ) {
	            progBar.style.width = '0%';
	        }

	        // For CORS, add a listener for the "message" event, which will be
	        // triggered by the Javascript snippet in the server response
	        if ( opts.cors ) {
	            removeMessageListener = ss.addEvent( window, 'message', function( event ) {
	                // Make sure event.origin matches the upload URL
	                if ( self._getHost( event.origin ) != self._getHost( opts.url ) ) {
	                    self.log('Non-matching origin: ' + event.origin);
	                    return;
	                }

	                // Set message event success flag to true
	                msgLoaded = true;

	                // Remove listener for message event
	                removeMessageListener();

	                opts.endNonXHR.call( self, fileObj.name, fileObj.btn );

	                self._finish( fileObj,  '', '', event.data, sizeBox, progBox, pctBox, abortBtn, removeAbort );
	            });
	        }

	        var remove = ss.addEvent( iframe, 'load', function() {
	            remove();

	            if ( opts.sessionProgressUrl ) {
	                form.appendChild( ss.getHidden( opts.sessionProgressName, key ) );
	            }

	            // PHP APC upload progress key field must come before the file field
	            else if ( opts.progressUrl ) {
	                form.appendChild( ss.getHidden( opts.keyParamName, key ) );
	            }

	            // We get any additional data here after startNonXHR()
	            // in case the data was changed with setData() prior to submitting
	            for ( var prop in opts.data ) {
	                if ( opts.data.hasOwnProperty( prop ) ) {
	                    form.appendChild( ss.getHidden( prop, opts.data[prop] ) );
	                }
	            }

	            // Add a field (default name: "XHR_CORS_TRARGETORIGIN") to tell server this is a CORS request
	            // Value of the field is targetOrigin parameter of postMessage(message, targetOrigin)
	            if ( opts.cors ) {
	                form.appendChild( ss.getHidden( opts.corsInputName, window.location.href ) );
	            }

	            form.appendChild( fileObj.file );

	            removeLoadListener = ss.addEvent( iframe, 'load', function() {
	                if ( !iframe.parentNode || iframeLoaded ) {
	                    return;
	                }

	                iframeLoaded = true;

	                delete self._progKeys[key];
	                delete self._sizeFlags[key];

	                // Remove listener for iframe load event
	                removeLoadListener();

	                if ( abortBtn ) {
	                    ss.removeEvent( abortBtn, 'click', cancel );
	                }

	                // After a CORS response, we wait briefly for the "message" event to finish,
	                // during which time the msgLoaded var will be set to true, signalling success.
	                // If iframe loads without "message" event, we assume there was an error
	                if ( opts.cors ) {
	                    window.setTimeout(function() {
	                        ss.remove( form );
	                        ss.remove( iframe );

	                        // If msgLoaded has not been set to true after "message" event fires, we
	                        // infer that an error must have occurred and respond accordingly
	                        if ( !msgLoaded ) {
	                            self._errorFinish( fileObj, '', '', false, 'error', progBox, sizeBox, pctBox, abortBtn, removeAbort );
	                        }

	                        opts = key = form = iframe = sizeBox = progBox = pctBox = abortBtn = removeAbort = null;
	                    }, 600);
	                }

	                // Ordinary, non-CORS upload
	                else {
	                    try {
	                        var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document,
	                            response = doc.body.innerHTML;

	                        opts.endNonXHR.call( self, fileObj.name, fileObj.btn );

	                        // No way to get status and statusText for an iframe so return empty strings
	                        self._finish( fileObj, '', '', response, sizeBox, progBox, pctBox, abortBtn, removeAbort );

	                    } catch ( e ) {
	                        self._errorFinish( fileObj, '', e.message, false, 'error', progBox, sizeBox, pctBox, abortBtn, removeAbort );
	                    }

	                    window.setTimeout(function() {
	                        ss.remove( form );
	                        ss.remove( iframe );
	                        form = iframe = null;
	                    }, 0);

	                    fileObj = opts = key = sizeBox = progBox = pctBox = null;
	                }
	            });// end load

	            if ( abortBtn ) {
	                cancel = function() {
	                    ss.removeEvent( abortBtn, 'click', cancel );

	                    delete self._progKeys[key];
	                    delete self._sizeFlags[key];

	                    if ( iframe ) {
	                        iframeLoaded = true;
	                        removeLoadListener();

	                        try {
	                            if ( iframe.contentWindow.document.execCommand ) {
	                                iframe.contentWindow.document.execCommand('Stop');
	                            }
	                        } catch( err ) {}

	                        try {
	                            iframe.src = 'javascript'.concat(':false;');
	                        } catch( err ) {}

	                        window.setTimeout(function() {
	                            ss.remove( form );
	                            ss.remove( iframe );
	                            form = iframe = null;
	                        }, 0);
	                    }

	                    self.log('Upload aborted');
	                    opts.onAbort.call( self, fileObj.name, fileObj.btn, fileObj.size );
	                    self._last( sizeBox, progBox, pctBox, abortBtn, removeAbort );
	                };

	                ss.addEvent( abortBtn, 'click', cancel );
	            }

	            self.log( 'Commencing upload using iframe' );
	            form.submit();

	            if ( self._hasProgUrl ) {
	                // Add progress key to active key array
	                self._progKeys[key] = 1;

	                // Start timer for first progress update
	                window.setTimeout( function() {
	                    self._getProg( key, progBar, sizeBox, pctBox, 1 );
	                    progBar = sizeBox = pctBox = null;
	                }, 600 );
	            }

	            // Remove this file from the queue and begin next upload
	            window.setTimeout(function() {
	                self.removeCurrent( fileObj.id );
	            }, 0);

	        });// end load

	        document.body.appendChild( form );
	        document.body.appendChild( iframe );
	    },

	    /**
	    * Retrieves upload progress updates from the server
	    * (For fallback upload progress support)
	    */
	    _getProg: function( key, progBar, sizeBox, pctBox, counter ) {
	        "use strict";

	        var self = this,
	            opts = this._opts,
	            time = new Date().getTime(),
	            xhr,
	            url,
	            callback;

	        if ( !key ) {
	            return;
	        }

	        // Nginx Upload Progress Module
	        if ( opts.nginxProgressUrl ) {
	            url = opts.nginxProgressUrl + '?' +
	                  encodeURIComponent( opts.nginxProgressHeader ) + '=' + encodeURIComponent( key ) +
	                  '&_=' + time;
	        }

	        else if ( opts.sessionProgressUrl ) {
	            url = opts.sessionProgressUrl;
	        }

	        // PHP APC upload progress
	        else if ( opts.progressUrl ) {
	            url = opts.progressUrl +
	            '?progresskey=' + encodeURIComponent( key ) +
	            '&_=' + time;
	        }

	        callback = function() {
	            var response,
	                size,
	                pct,
	                status,
	                statusText;

	            try {
	                // XDomainRequest doesn't have readyState so we
	                // just assume that it finished correctly
	                if ( callback && ( opts.cors || xhr.readyState === 4 ) ) {
	                    callback = undefined;
	                    xhr.onreadystatechange = function() {};

	                    try {
	                        statusText = xhr.statusText;
	                        status = xhr.status;
	                    } catch( e ) {
	                        // We normalize with Webkit giving an empty statusText
	                        statusText = '';
	                        status = '';
	                    }

	                    // XDomainRequest also doesn't have status, so we
	                    // again just assume that everything is fine
	                    if ( opts.cors || ( status >= 200 && status < 300 ) ) {
	                        response = ss.parseJSON( xhr.responseText );

	                        if ( response === false ) {
	                            self.log( 'Error parsing progress response (expecting JSON)' );
	                            return;
	                        }

	                        // Handle response if using Nginx Upload Progress Module
	                        if ( opts.nginxProgressUrl ) {

	                            if ( response.state == 'uploading' ) {
	                                size = parseInt( response.size, 10 );
	                                if ( size > 0 ) {
	                                    pct = Math.round( ( parseInt( response.received, 10 ) / size ) * 100 );
	                                    size = Math.round( size / 1024 ); // convert to kilobytes
	                                }

	                            } else if ( response.state == 'done' ) {
	                                pct = 100;

	                            } else if ( response.state == 'error' ) {
	                                self.log( 'Error requesting upload progress: ' + response.status );
	                                return;
	                            }
	                        }

	                        // Handle response if using PHP APC
	                        else if ( opts.sessionProgressUrl || opts.progressUrl ) {
	                            if ( response.success === true ) {
	                                size = parseInt( response.size, 10 );
	                                pct = parseInt( response.pct, 10 );
	                            }
	                        }

	                        // Update progress bar width
	                        if ( pct ) {
	                            if ( pctBox ) {
	                                pctBox.innerHTML = pct + '%';
	                            }

	                            if ( progBar ) {
	                                progBar.style.width = pct + '%';
	                            }

	                            opts.onProgress.call( self, pct );
	                        }

	                        if ( size && !self._sizeFlags[key] ) {
	                            if ( sizeBox ) {
	                                sizeBox.innerHTML = size + 'K';
	                            }

	                            self._sizeFlags[key] = 1;
	                            opts.onUpdateFileSize.call( self, size );
	                        }

	                        // Stop attempting progress checks if we keep failing
	                        if ( !pct &&
	                             !size &&
	                             counter >= self._maxFails )
	                        {
	                            counter++;
	                            self.log( 'Failed progress request limit reached. Count: ' + counter );
	                            return;
	                        }

	                        // Begin countdown until next progress update check
	                        if ( pct < 100 && self._progKeys[key] ) {
	                            window.setTimeout( function() {
	                                self._getProg( key, progBar, sizeBox, pctBox, counter );

	                                key = progBar = sizeBox = pctBox = counter = null;
	                            }, opts.checkProgressInterval );
	                        }

	                        // We didn't get a 2xx status so don't continue sending requests
	                    } else {
	                        delete self._progKeys[key];
	                        self.log( 'Error requesting upload progress: ' + status + ' ' + statusText );
	                    }

	                    xhr = size = pct = status = statusText = response = null;
	                }

	            } catch( e ) {
	                self.log( 'Error requesting upload progress: ' + e.message );
	            }
	        };

	        // CORS requests in IE8 and IE9 must use XDomainRequest
	        if ( opts.cors && !opts.sessionProgressUrl ) {

	            if ( window.XDomainRequest ) {
	                xhr = new window.XDomainRequest();
	                xhr.open( 'GET', url, true );
	                xhr.onprogress = xhr.ontimeout = function() {};
	                xhr.onload = callback;

	                xhr.onerror = function() {
	                    delete self._progKeys[key];
	                    key = null;
	                    self.log('Error requesting upload progress');
	                };

	                // IE7 or some other dinosaur -- just give up
	            } else {
	                return;
	            }

	        } else {
	            var method = !opts.sessionProgressUrl ? 'GET' : 'POST',
	                params;

	            xhr = ss.newXHR();
	            xhr.onreadystatechange = callback;
	            xhr.open( method, url, true );

	            // PHP session progress updates must be a POST request
	            if ( opts.sessionProgressUrl ) {
	                params = encodeURIComponent( opts.sessionProgressName ) + '=' + encodeURIComponent( key );
	                xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
	            }

	            // Set the upload progress header for Nginx
	            if ( opts.nginxProgressUrl ) {
	                xhr.setRequestHeader( opts.nginxProgressHeader, key );
	            }

	            xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
	            xhr.setRequestHeader( 'Accept', 'application/json, text/javascript, */*; q=0.01' );

	           xhr.send( ( opts.sessionProgressUrl &&  params ) || null );
	        }
	    },

	    _initUpload: function( fileObj ) {
	        if ( false === this._opts.startNonXHR.call( this, fileObj.name, fileObj.btn ) ) {

	            if ( this._disabled ) {
	                this.enable( true );
	            }

	            this._active--;
	            return;
	        }

	        this._hasProgUrl = ( this._opts.progressUrl ||
	                             this._opts.sessionProgressUrl ||
	                             this._opts.nginxProgressUrl ) ?
	                             true : false;

	        this._uploadIframe( fileObj, this._progBox, this._sizeBox, this._progBar, this._pctBox, this._abortBtn, this._removeAbort );

	        this._progBox = this._sizeBox = this._progBar = this._pctBox = this._abortBtn = this._removeAbort = null;
	    }
	};

	ss.XhrUpload = {

	    _addFiles: function( files ) {
	        var total = files.length,
	            filename,
	            ext,
	            size,
	            i;

	        if ( !this._opts.multiple ) {
	            total = 1;
	        }

	        for ( i = 0; i < total; i++ ) {
	            filename = ss.getFilename( files[i].name );
	            ext = ss.getExt( filename );
	            size = Math.round( files[i].size / 1024 );

	            if ( false === this._opts.onChange.call( this, filename, ext, this._overBtn, size ) ) {
	                return false;
	            }

	            this._queue.push({
	                id: ss.getUID(),
	                file: files[i],
	                name: filename,
	                ext: ext,
	                btn: this._overBtn,
	                size: size
	            });
	        }

	        return true;
	    },

	    /**
	    * Handles uploading with XHR
	    */
	    _uploadXhr: function( fileObj, url, params, headers, sizeBox, progBar, progBox, pctBox, abortBtn, removeAbort ) {
	        "use strict";

	        var self = this,
	            opts = this._opts,
	            xhr = ss.newXHR(),
	            callback,
	            cancel;

	        // Inject file size into size box
	        if ( sizeBox ) {
	            sizeBox.innerHTML = fileObj.size + 'K';
	        }

	        // Begin progress bars at 0%
	        if ( pctBox ) {
	            pctBox.innerHTML = '0%';
	        }

	        if ( progBar ) {
	            progBar.style.width = '0%';
	        }

	        opts.onProgress.call( this, 0 );

	        // Borrows heavily from jQuery ajax transport
	        callback = function( _, isAbort ) {
	            var status,
	                statusText;

	            // Firefox throws exceptions when accessing properties
	            // of an xhr when a network error occurred
	            try {
	                // Was never called and is aborted or complete
	                if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

	                    callback = undefined;
	                    xhr.onreadystatechange = function() {};

	                    // If it's an abort
	                    if ( isAbort ) {

	                        // Abort it manually if needed
	                        if ( xhr.readyState !== 4 ) {
	                            xhr.abort();
	                        }

	                        opts.onAbort.call( self, fileObj.name, fileObj.btn, fileObj.size );
	                        self._last( sizeBox, progBox, pctBox, abortBtn, removeAbort );

	                    } else {
	                        if ( abortBtn ) {
	                            ss.removeEvent( abortBtn, 'click', cancel );
	                        }

	                        status = xhr.status;

	                        // Firefox throws an exception when accessing
	                        // statusText for faulty cross-domain requests
	                        try {
	                            statusText = xhr.statusText;

	                        } catch( e ) {
	                            // We normalize with Webkit giving an empty statusText
	                            statusText = '';
	                        }

	                        if ( status >= 200 && status < 300 ) {
	                            opts.endXHR.call( self, fileObj.name, fileObj.size, fileObj.btn );
	                            self._finish( fileObj, status, statusText, xhr.responseText, sizeBox, progBox, pctBox, abortBtn, removeAbort );

	                            // We didn't get a 2xx status so throw an error
	                        } else {
	                            self._errorFinish( fileObj, status, statusText, xhr.responseText, 'error', progBox, sizeBox, pctBox, abortBtn, removeAbort );
	                        }
	                    }
	                }

	            }
	            catch ( e ) {
	                if ( !isAbort ) {
	                    self._errorFinish( fileObj, -1, e.message, false, 'error', progBox, sizeBox, pctBox, abortBtn, removeAbort );
	                }
	            }
	        };

	        if ( abortBtn ) {
	            cancel = function() {
	                ss.removeEvent( abortBtn, 'click', cancel );

	                if ( callback ) {
	                    callback( undefined, true );
	                }
	            };

	            ss.addEvent( abortBtn, 'click', cancel );
	        }

	        xhr.onreadystatechange = callback;
	        xhr.open( opts.method.toUpperCase(), url, true );

	        ss.extendObj( headers, opts.customHeaders );

	        for ( var i in headers ) {
	            if ( headers.hasOwnProperty( i ) ) {
	                if ( opts.encodeCustomHeaders && opts.customHeaders.hasOwnProperty( i ) ) {
	                    xhr.setRequestHeader( i, encodeURIComponent( headers[ i ] ) + '' );
	                } else {
	                    xhr.setRequestHeader( i, headers[ i ] + '' );
	                }
	            }
	        }

	        ss.addEvent( xhr.upload, 'progress', function( event ) {
	            if ( event.lengthComputable ) {
	                var pct = Math.round( ( event.loaded / event.total ) * 100 );

	                opts.onProgress.call( self, pct );

	                if ( pctBox ) {
	                    pctBox.innerHTML = pct + '%';
	                }

	                if ( progBar ) {
	                    progBar.style.width = pct + '%';
	                }
	            }
	        });

	        if ( opts.multipart === true ) {
	            var formData = new FormData();

	            for ( var prop in params ) {
	                if ( params.hasOwnProperty( prop ) ) {
	                    formData.append( prop, params[prop] );
	                }
	            }

	            formData.append( opts.name, fileObj.file );
	            this.log( 'Commencing upload using multipart form' );
	            xhr.send( formData );

	        } else {
	            this.log( 'Commencing upload using binary stream' );
	            xhr.send( fileObj.file );
	        }

	        // Remove file from upload queue and begin next upload
	        this.removeCurrent( fileObj.id );
	    },

	    _initUpload: function( fileObj ) {
	        "use strict";

	        var params = {},
	            headers = {},
	            url;

	        // Call the startXHR() callback and stop upload if it returns false
	        // We call it before _uploadXhr() in case setProgressBar, setPctBox, etc., is called
	        if ( false === this._opts.startXHR.call( this, fileObj.name, fileObj.size, fileObj.btn ) ) {

	            if ( this._disabled ) {
	                this.enable( true );
	            }

	            this._active--;
	            return;
	        }

	        params[this._opts.name] = fileObj.name;

	        headers['X-Requested-With'] = 'XMLHttpRequest';
	        headers['X-File-Name'] = !this._opts.encodeCustomHeaders ? fileObj.name : encodeURIComponent( fileObj.name );

	        if ( this._opts.responseType.toLowerCase() == 'json' ) {
	            headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
	        }

	        if ( !this._opts.multipart ) {
	            headers['Content-Type'] = 'application/octet-stream';
	        }

	        // We get the any additional data here after startXHR()
	        ss.extendObj( params, this._opts.data );

	        // Build query string while preserving any existing parameters
	        url = this._opts.noParams === true ?
	                this._opts.url :
	                this._opts.url + ( ( this._opts.url.indexOf( '?' ) > -1 ) ? '&' : '?' ) +ss.obj2string( params );

	        this._uploadXhr( fileObj, url, params, headers, this._sizeBox, this._progBar, this._progBox, this._pctBox, this._abortBtn, this._removeAbort );

	        this._sizeBox = this._progBar = this._progBox = this._pctBox = this._abortBtn = this._removeAbort = null;
	    }

	};

	(function(){
	    ss.extendObj( ss.SimpleUpload.prototype, {

	        _createInput: function() {
	            "use strict";

	            var self = this,
	                div = document.createElement( 'div' );

	            this._input = document.createElement( 'input' );
	            this._input.type = 'file';
	            this._input.name = this._opts.name;

	            // Don't allow multiple file selection in Safari -- it has a nasty bug
	            // http://stackoverflow.com/q/7231054/1091949
	            if ( XhrOk && !isSafari && this._opts.multiple ) {
	                this._input.multiple = true;
	            }

	            // Check support for file input accept attribute
	            if ( 'accept' in this._input && this._opts.accept !== '' ) {
	                this._input.accept = this._opts.accept;
	            }

	            ss.addStyles( div, {
	                'display' : 'block',
	                'position' : 'absolute',
	                'overflow' : 'hidden',
	                'margin' : 0,
	                'padding' : 0,
	                'opacity' : 0,
	                'direction' : 'ltr',
	                'zIndex': 2147483582
	            });

	            ss.addStyles( this._input, {
	                'position' : 'absolute',
	                'right' : 0,
	                'margin' : 0,
	                'padding' : 0,
	                'fontSize' : '480px',
	                'fontFamily' : 'sans-serif',
	                'cursor' : 'pointer',
	                'height' : '100%'
	            });

	            if ( div.style.opacity !== '0' ) {
	                div.style.filter = 'alpha(opacity=0)';
	            }

	            this._input.turnOff = ss.addEvent( this._input, 'change', function() {
	                if ( !self._input || self._input.value === '' ) {
	                    return;
	                }

	                if ( false === self._addFiles( XhrOk ? self._input.files : self._input ) ) {
	                    return;
	                }

	                ss.removeClass( self._overBtn, self._opts.hoverClass );
	                ss.removeClass( self._overBtn, self._opts.focusClass );

	                self._killInput();

	                // Then create a new file input
	                self._createInput();

	                // Submit if autoSubmit option is true
	                if ( self._opts.autoSubmit ) {
	                    self.submit();
	                }
	            });

	            if ( self._opts.hoverClass !== '' ) {
	                div.mouseOverOff = ss.addEvent( div, 'mouseover', function() {
	                    ss.addClass( self._overBtn, self._opts.hoverClass );
	                });
	            }

	            div.mouseOutOff = ss.addEvent( div, 'mouseout', function() {
	                self._input.parentNode.style.visibility = 'hidden';

	                if ( self._opts.hoverClass !== '' ) {
	                    ss.removeClass( self._overBtn, self._opts.hoverClass );
	                    ss.removeClass( self._overBtn, self._opts.focusClass );
	                }
	            });

	            if ( self._opts.focusClass !== '' ) {
	                this._input.focusOff = ss.addEvent( this._input, 'focus', function() {
	                    ss.addClass( self._overBtn, self._opts.focusClass );
	                });

	                this._input.blurOff = ss.addEvent( this._input, 'blur', function() {
	                    ss.removeClass( self._overBtn, self._opts.focusClass );
	                });
	            }

	            document.body.appendChild( div );
	            div.appendChild( this._input );
	            div = null;
	        },

	        rerouteClicks: function( elem ) {
	            "use strict";

	            var self = this;

	            // ss.addEvent() returns a function to detach, which
	            // allows us to call elem.off() to remove mouseover listener
	            elem.off = ss.addEvent( elem, 'mouseover', function() {
	                if ( self._disabled ) {
	                    return;
	                }

	                if ( !self._input ) {
	                    self._createInput();
	                }

	                self._overBtn = elem;
	                ss.copyLayout( elem, self._input.parentNode );
	                self._input.parentNode.style.visibility = 'visible';
	            });

	            return elem;
	        },

	        /**
	        * Final cleanup function after upload ends
	        */
	        _last: function( sizeBox, progBox, pctBox, abortBtn, removeAbort ) {
	            "use strict";

	            if ( sizeBox ) {
	               sizeBox.innerHTML = '';
	            }

	            if ( pctBox ) {
	                pctBox.innerHTML = '';
	            }

	            if ( abortBtn && removeAbort ) {
	                ss.remove( abortBtn );
	            }

	            if ( progBox ) {
	                ss.remove( progBox );
	            }

	            // Decrement the active upload counter
	            this._active--;

	            sizeBox = progBox = pctBox = abortBtn = removeAbort = null;

	            if ( this._disabled ) {
	                this.enable( true );
	            }

	            // Burn it all down if destroy() was called
	            // We have to do it here after everything is finished to avoid any errors
	            if ( this._destroy &&
	                 this._queue.length === 0 &&
	                 this._active.length === 0 )
	            {
	                for ( var prop in this ) {
	                    if ( this.hasOwnProperty( prop ) ) {
	                        delete this[ prop ];
	                    }
	                }

	            // Otherwise just go to the next upload as usual
	            } else {
	                this._cycleQueue();
	            }
	        },

	        /**
	        * Completes upload request if an error is detected
	        */
	        _errorFinish: function( fileObj, status, statusText, response, errorType, progBox, sizeBox, pctBox, abortBtn, removeAbort ) {
	            "use strict";

	            this.log( 'Upload failed: ' + status + ' ' + statusText );
	            this._opts.onError.call( this, fileObj.name, errorType, status, statusText, response, fileObj.btn, fileObj.size );
	            this._last( sizeBox, progBox, pctBox, abortBtn, removeAbort );

	            fileObj = status = statusText = response = errorType = sizeBox = progBox = pctBox = abortBtn = removeAbort = null;
	        },

	        /**
	        * Completes upload request if the transfer was successful
	        */
	        _finish: function( fileObj, status, statusText, response, sizeBox, progBox, pctBox, abortBtn, removeAbort ) {
	            "use strict";

	            this.log( 'Server response: ' + response );

	            if ( this._opts.responseType.toLowerCase() == 'json' ) {
	                response = ss.parseJSON( response );

	                if ( response === false ) {
	                    this._errorFinish( fileObj, status, statusText, false, 'parseerror', progBox, sizeBox, abortBtn, removeAbort );
	                    return;
	                }
	            }

	            this._opts.onComplete.call( this, fileObj.name, response, fileObj.btn, fileObj.size );
	            this._last( sizeBox, progBox, pctBox, abortBtn, removeAbort );

	            fileObj = status = statusText = response = sizeBox = progBox = pctBox = abortBtn = removeAbort = null;
	        },

	        /**
	        * Verifies that file is allowed
	        * Checks file extension and file size if limits are set
	        */
	        _checkFile: function( fileObj ) {
	            "use strict";

	            var extOk = false,
	                i = this._opts.allowedExtensions.length;

	            // Only file extension if allowedExtensions is set
	            if ( i > 0 ) {
	                while ( i-- ) {
	                    if ( this._opts.allowedExtensions[i].toLowerCase() == fileObj.ext.toLowerCase() ) {
	                        extOk = true;
	                        break;
	                    }
	                }

	                if ( !extOk ) {
	                    this.removeCurrent( fileObj.id );
	                    this.log( 'File extension not permitted' );
	                    this._opts.onExtError.call( this, fileObj.name, fileObj.ext );
	                    return false;
	                }
	            }

	            if ( fileObj.size &&
	                this._opts.maxSize !== false &&
	                fileObj.size > this._opts.maxSize )
	            {
	                this.removeCurrent( fileObj.id );
	                this.log( fileObj.name + ' exceeds ' + this._opts.maxSize + 'K limit' );
	                this._opts.onSizeError.call( this, fileObj.name, fileObj.size );
	                return false;
	            }

	            fileObj = null;

	            return true;
	        },

	        /**
	        * Validates input and directs to either XHR method or iFrame method
	        */
	        submit: function() {
	            "use strict";

	            if ( this._disabled ||
	                this._active >= this._opts.maxUploads ||
	                this._queue.length < 1 )
	            {
	                return;
	            }

	            if ( !this._checkFile( this._queue[0] ) ) {
	                return;
	            }

	            // User returned false to cancel upload
	            if ( false === this._opts.onSubmit.call( this, this._queue[0].name, this._queue[0].ext, this._queue[0].btn, this._queue[0].size ) ) {
	                return;
	            }

	            // Increment the active upload counter
	            this._active++;

	            // Disable uploading if multiple file uploads are not enabled
	            // or if queue is disabled and we've reached max uploads
	            if ( this._opts.multiple === false ||
	                this._opts.queue === false && this._active >= this._opts.maxUploads )
	            {
	                this.disable( true );
	            }

	            this._initUpload( this._queue[0] );
	        }
	    });

	    if ( XhrOk ) {
	        ss.extendObj( ss.SimpleUpload.prototype, ss.XhrUpload );

	    } else {
	        ss.extendObj( ss.SimpleUpload.prototype, ss.IframeUpload );
	    }

	}());

	ss.extendObj(ss.SimpleUpload.prototype, {

	    _dragFileCheck: function( e ) {
	        if ( e.dataTransfer.types ) {
	            for ( var i = 0; i < e.dataTransfer.types.length; i++ ) {
	                if ( e.dataTransfer.types[i] == 'Files' ) {
	                    return true;
	                }
	            }
	        }

	        return false;
	    },

	    addDropZone: function( elem ) {
	        var self = this;

	        ss.addStyles( elem, {
	            'zIndex': 2147483583
	        });

	        elem.ondragenter = function( e ) {
	            if ( !self._dragFileCheck( e ) ) {
	                return false;
	            }
	            ss.addClass( this, self._opts.dragClass );
	            return false;
	        };

	        elem.ondragover = function() {
	            return false;
	        };

	        elem.ondragend = function() {
	            ss.removeClass( this, self._opts.dragClass );
	            return false;
	        };

	        elem.ondragleave = function() {
	            ss.removeClass( this, self._opts.dragClass );
	            return false;
	        };

	        elem.ondrop = function( e ) {
	            e.preventDefault();

	            ss.removeClass( this, self._opts.dragClass );

	            if ( !self._dragFileCheck( e ) ) {
	                return false;
	            }

	            self._addFiles( e.dataTransfer.files );
	            self._cycleQueue();
	        };
	    }
	});

	return ss;

	}));


/***/ },

/***/ 783:
/***/ function(module, exports) {

	"use strict";
	exports.twDistrict = [
	    {
	        city: '基隆市',
	        contain: [
	            { zip: '200', county: '仁愛區' },
	            { zip: '201', county: '信義區' },
	            { zip: '202', county: '中正區' },
	            { zip: '203', county: '中山區' },
	            { zip: '204', county: '安樂區' },
	            { zip: '205', county: '暖暖區' },
	            { zip: '206', county: '七堵區' }
	        ]
	    },
	    {
	        city: '臺北市',
	        contain: [
	            { zip: '100', county: '中正區' },
	            { zip: '103', county: '大同區' },
	            { zip: '104', county: '中山區' },
	            { zip: '105', county: '松山區' },
	            { zip: '106', county: '大安區' },
	            { zip: '108', county: '萬華區' },
	            { zip: '110', county: '信義區' },
	            { zip: '111', county: '士林區' },
	            { zip: '112', county: '北投區' },
	            { zip: '114', county: '內湖區' },
	            { zip: '115', county: '南港區' },
	            { zip: '116', county: '文山區' }
	        ]
	    },
	    {
	        city: '新北市',
	        contain: [
	            { zip: '207', county: '萬里區' },
	            { zip: '208', county: '金山區' },
	            { zip: '220', county: '板橋區' },
	            { zip: '221', county: '汐止區' },
	            { zip: '222', county: '深坑區' },
	            { zip: '223', county: '石碇區' },
	            { zip: '224', county: '瑞芳區' },
	            { zip: '226', county: '平溪區' },
	            { zip: '227', county: '雙溪區' },
	            { zip: '228', county: '貢寮區' },
	            { zip: '231', county: '新店區' },
	            { zip: '232', county: '坪林區' },
	            { zip: '233', county: '烏來區' },
	            { zip: '234', county: '永和區' },
	            { zip: '235', county: '中和區' },
	            { zip: '236', county: '土城區' },
	            { zip: '237', county: '三峽區' },
	            { zip: '238', county: '樹林區' },
	            { zip: '239', county: '鶯歌區' },
	            { zip: '241', county: '三重區' },
	            { zip: '242', county: '新莊區' },
	            { zip: '243', county: '泰山區' },
	            { zip: '244', county: '林口區' },
	            { zip: '247', county: '蘆洲區' },
	            { zip: '248', county: '五股區' },
	            { zip: '249', county: '八里區' },
	            { zip: '251', county: '淡水區' },
	            { zip: '252', county: '三芝區' },
	            { zip: '253', county: '石門區' }
	        ]
	    },
	    {
	        city: '桃園市',
	        contain: [
	            { zip: '320', county: '中壢區' },
	            { zip: '324', county: '平鎮區' },
	            { zip: '325', county: '龍潭區' },
	            { zip: '326', county: '楊梅區' },
	            { zip: '327', county: '新屋區' },
	            { zip: '328', county: '觀音區' },
	            { zip: '330', county: '桃園區' },
	            { zip: '333', county: '龜山區' },
	            { zip: '334', county: '八德區' },
	            { zip: '335', county: '大溪區' },
	            { zip: '336', county: '復興區' },
	            { zip: '337', county: '大園區' },
	            { zip: '338', county: '蘆竹區' }
	        ]
	    },
	    {
	        city: '新竹市',
	        contain: [
	            { zip: '300', county: '新竹市' }
	        ]
	    },
	    {
	        city: '新竹縣',
	        contain: [
	            { zip: '302', county: '竹北市' },
	            { zip: '303', county: '湖口鄉' },
	            { zip: '304', county: '新豐鄉' },
	            { zip: '305', county: '新埔鎮' },
	            { zip: '306', county: '關西鎮' },
	            { zip: '307', county: '芎林鄉' },
	            { zip: '308', county: '寶山鄉' },
	            { zip: '310', county: '竹東鎮' },
	            { zip: '311', county: '五峰鄉' },
	            { zip: '312', county: '橫山鄉' },
	            { zip: '313', county: '尖石鄉' },
	            { zip: '314', county: '北埔鄉' },
	            { zip: '315', county: '峨眉鄉' }
	        ]
	    },
	    {
	        city: '苗栗縣',
	        contain: [
	            { zip: '350', county: '竹南鎮' },
	            { zip: '351', county: '頭份鎮' },
	            { zip: '352', county: '三灣鄉' },
	            { zip: '353', county: '南庄鄉' },
	            { zip: '354', county: '獅潭鄉' },
	            { zip: '356', county: '後龍鎮' },
	            { zip: '357', county: '通霄鎮' },
	            { zip: '358', county: '苑裡鎮' },
	            { zip: '360', county: '苗栗市' },
	            { zip: '361', county: '造橋鄉' },
	            { zip: '362', county: '頭屋鄉' },
	            { zip: '363', county: '公館鄉' },
	            { zip: '364', county: '大湖鄉' },
	            { zip: '365', county: '泰安鄉' },
	            { zip: '366', county: '銅鑼鄉' },
	            { zip: '367', county: '三義鄉' },
	            { zip: '368', county: '西湖鄉' },
	            { zip: '369', county: '卓蘭鎮' }
	        ]
	    },
	    {
	        city: '臺中市',
	        contain: [
	            { zip: '400', county: '中區' },
	            { zip: '401', county: '東區' },
	            { zip: '402', county: '南區' },
	            { zip: '403', county: '西區' },
	            { zip: '404', county: '北區' },
	            { zip: '406', county: '北屯區' },
	            { zip: '407', county: '西屯區' },
	            { zip: '408', county: '南屯區' },
	            { zip: '411', county: '太平區' },
	            { zip: '412', county: '大里區' },
	            { zip: '413', county: '霧峰區' },
	            { zip: '414', county: '烏日區' },
	            { zip: '420', county: '豐原區' },
	            { zip: '421', county: '后里區' },
	            { zip: '422', county: '石岡區' },
	            { zip: '423', county: '東勢區' },
	            { zip: '424', county: '和平區' },
	            { zip: '426', county: '新社區' },
	            { zip: '427', county: '潭子區' },
	            { zip: '428', county: '大雅區' },
	            { zip: '429', county: '神岡區' },
	            { zip: '432', county: '大肚區' },
	            { zip: '433', county: '沙鹿區' },
	            { zip: '434', county: '龍井區' },
	            { zip: '435', county: '梧棲區' },
	            { zip: '436', county: '清水區' },
	            { zip: '437', county: '大甲區' },
	            { zip: '438', county: '外埔區' },
	            { zip: '439', county: '大安區' }
	        ]
	    },
	    {
	        city: '彰化縣',
	        contain: [
	            { zip: '500', county: '彰化市' },
	            { zip: '502', county: '芬園鄉' },
	            { zip: '503', county: '花壇鄉' },
	            { zip: '504', county: '秀水鄉' },
	            { zip: '505', county: '鹿港鎮' },
	            { zip: '506', county: '福興鄉' },
	            { zip: '507', county: '線西鄉' },
	            { zip: '508', county: '和美鎮' },
	            { zip: '509', county: '伸港鄉' },
	            { zip: '510', county: '員林鎮' },
	            { zip: '511', county: '社頭鄉' },
	            { zip: '512', county: '永靖鄉' },
	            { zip: '513', county: '埔心鄉' },
	            { zip: '514', county: '溪湖鎮' },
	            { zip: '515', county: '大村鄉' },
	            { zip: '516', county: '埔鹽鄉' },
	            { zip: '520', county: '田中鎮' },
	            { zip: '521', county: '北斗鎮' },
	            { zip: '522', county: '田尾鄉' },
	            { zip: '523', county: '埤頭鄉' },
	            { zip: '524', county: '溪州鄉' },
	            { zip: '525', county: '竹塘鄉' },
	            { zip: '526', county: '二林鎮' },
	            { zip: '527', county: '大城鄉' },
	            { zip: '528', county: '芳苑鄉' },
	            { zip: '530', county: '二水鄉' }
	        ]
	    },
	    {
	        city: '南投縣',
	        contain: [
	            { zip: '540', county: '南投市' },
	            { zip: '541', county: '中寮鄉' },
	            { zip: '542', county: '草屯鎮' },
	            { zip: '544', county: '國姓鄉' },
	            { zip: '545', county: '埔里鎮' },
	            { zip: '546', county: '仁愛鄉' },
	            { zip: '551', county: '名間鄉' },
	            { zip: '552', county: '集集鎮' },
	            { zip: '553', county: '水里鄉' },
	            { zip: '555', county: '魚池鄉' },
	            { zip: '556', county: '信義鄉' },
	            { zip: '557', county: '竹山鎮' },
	            { zip: '558', county: '鹿谷鄉' }
	        ]
	    },
	    {
	        city: '雲林縣',
	        contain: [
	            { zip: '630', county: '斗南鎮' },
	            { zip: '631', county: '大埤鄉' },
	            { zip: '632', county: '虎尾鎮' },
	            { zip: '633', county: '土庫鎮' },
	            { zip: '634', county: '褒忠鄉' },
	            { zip: '635', county: '東勢鄉' },
	            { zip: '637', county: '崙背鄉' },
	            { zip: '638', county: '麥寮鄉' },
	            { zip: '640', county: '斗六市' },
	            { zip: '643', county: '林內鄉' },
	            { zip: '646', county: '古坑鄉' },
	            { zip: '647', county: '莿桐鄉' },
	            { zip: '648', county: '西螺鎮' },
	            { zip: '649', county: '二崙鄉' },
	            { zip: '651', county: '北港鎮' },
	            { zip: '652', county: '水林鄉' },
	            { zip: '653', county: '口湖鄉' },
	            { zip: '654', county: '四湖鄉' },
	            { zip: '655', county: '元長鄉' }
	        ]
	    },
	    {
	        city: '嘉義市',
	        contain: [
	            { zip: '600', county: '嘉義市' }
	        ]
	    },
	    {
	        city: '嘉義縣',
	        contain: [
	            { zip: '602', county: '番路鄉' },
	            { zip: '603', county: '梅山鄉' },
	            { zip: '604', county: '竹崎鄉' },
	            { zip: '605', county: '阿里山鄉' },
	            { zip: '606', county: '中埔鄉' },
	            { zip: '607', county: '大埔鄉' },
	            { zip: '608', county: '水上鄉' },
	            { zip: '611', county: '鹿草鄉' },
	            { zip: '612', county: '太保市' },
	            { zip: '613', county: '朴子市' },
	            { zip: '614', county: '東石鄉' },
	            { zip: '615', county: '六腳鄉' },
	            { zip: '616', county: '新港鄉' },
	            { zip: '621', county: '民雄鄉' },
	            { zip: '622', county: '大林鎮' },
	            { zip: '623', county: '溪口鄉' },
	            { zip: '624', county: '義竹鄉' },
	            { zip: '625', county: '布袋鎮' }
	        ]
	    },
	    {
	        city: '臺南市',
	        contain: [
	            { zip: '700', county: '中西區' },
	            { zip: '701', county: '東區' },
	            { zip: '702', county: '南區' },
	            { zip: '704', county: '北區' },
	            { zip: '708', county: '安平區' },
	            { zip: '709', county: '安南區' },
	            { zip: '710', county: '永康區' },
	            { zip: '711', county: '歸仁區' },
	            { zip: '712', county: '新化區' },
	            { zip: '713', county: '左鎮區' },
	            { zip: '714', county: '玉井區' },
	            { zip: '715', county: '楠西區' },
	            { zip: '716', county: '南化區' },
	            { zip: '717', county: '仁德區' },
	            { zip: '718', county: '關廟區' },
	            { zip: '719', county: '龍崎區' },
	            { zip: '720', county: '官田區' },
	            { zip: '721', county: '麻豆區' },
	            { zip: '722', county: '佳里區' },
	            { zip: '723', county: '西港區' },
	            { zip: '724', county: '七股區' },
	            { zip: '725', county: '將軍區' },
	            { zip: '726', county: '學甲區' },
	            { zip: '727', county: '北門區' },
	            { zip: '730', county: '新營區' },
	            { zip: '731', county: '後壁區' },
	            { zip: '732', county: '白河區' },
	            { zip: '733', county: '東山區' },
	            { zip: '734', county: '六甲區' },
	            { zip: '735', county: '下營區' },
	            { zip: '736', county: '柳營區' },
	            { zip: '737', county: '鹽水區' },
	            { zip: '741', county: '善化區' },
	            { zip: '742', county: '大內區' },
	            { zip: '743', county: '山上區' },
	            { zip: '744', county: '新市區' },
	            { zip: '745', county: '安定區' }
	        ]
	    },
	    {
	        city: '高雄市',
	        contain: [
	            { zip: '800', county: '新興區' },
	            { zip: '801', county: '前金區' },
	            { zip: '802', county: '苓雅區' },
	            { zip: '803', county: '鹽埕區' },
	            { zip: '804', county: '鼓山區' },
	            { zip: '805', county: '旗津區' },
	            { zip: '806', county: '前鎮區' },
	            { zip: '807', county: '三民區' },
	            { zip: '811', county: '楠梓區' },
	            { zip: '812', county: '小港區' },
	            { zip: '813', county: '左營區' },
	            { zip: '814', county: '仁武區' },
	            { zip: '815', county: '大社區' },
	            { zip: '820', county: '岡山區' },
	            { zip: '821', county: '路竹區' },
	            { zip: '822', county: '阿蓮區' },
	            { zip: '823', county: '田寮區' },
	            { zip: '824', county: '燕巢區' },
	            { zip: '825', county: '橋頭區' },
	            { zip: '826', county: '梓官區' },
	            { zip: '827', county: '彌陀區' },
	            { zip: '828', county: '永安區' },
	            { zip: '829', county: '湖內區' },
	            { zip: '830', county: '鳳山區' },
	            { zip: '831', county: '大寮區' },
	            { zip: '832', county: '林園區' },
	            { zip: '833', county: '鳥松區' },
	            { zip: '840', county: '大樹區' },
	            { zip: '842', county: '旗山區' },
	            { zip: '843', county: '美濃區' },
	            { zip: '844', county: '六龜區' },
	            { zip: '845', county: '內門區' },
	            { zip: '846', county: '杉林區' },
	            { zip: '847', county: '甲仙區' },
	            { zip: '848', county: '桃源區' },
	            { zip: '849', county: '那瑪夏區' },
	            { zip: '851', county: '茂林區' },
	            { zip: '852', county: '茄萣區' }
	        ]
	    },
	    {
	        city: '屏東縣',
	        contain: [
	            { zip: '900', county: '屏東市' },
	            { zip: '901', county: '三地門鄉' },
	            { zip: '902', county: '霧臺鄉' },
	            { zip: '903', county: '瑪家鄉' },
	            { zip: '904', county: '九如鄉' },
	            { zip: '905', county: '里港鄉' },
	            { zip: '906', county: '高樹鄉' },
	            { zip: '907', county: '鹽埔鄉' },
	            { zip: '908', county: '長治鄉' },
	            { zip: '909', county: '麟洛鄉' },
	            { zip: '911', county: '竹田鄉' },
	            { zip: '912', county: '內埔鄉' },
	            { zip: '913', county: '萬丹鄉' },
	            { zip: '920', county: '潮州鎮' },
	            { zip: '921', county: '泰武鄉' },
	            { zip: '922', county: '來義鄉' },
	            { zip: '923', county: '萬巒鄉' },
	            { zip: '924', county: '崁頂鄉' },
	            { zip: '925', county: '新埤鄉' },
	            { zip: '926', county: '南州鄉' },
	            { zip: '927', county: '林邊鄉' },
	            { zip: '928', county: '東港鎮' },
	            { zip: '929', county: '琉球鄉' },
	            { zip: '931', county: '佳冬鄉' },
	            { zip: '932', county: '新園鄉' },
	            { zip: '940', county: '枋寮鄉' },
	            { zip: '941', county: '枋山鄉' },
	            { zip: '942', county: '春日鄉' },
	            { zip: '943', county: '獅子鄉' },
	            { zip: '944', county: '車城鄉' },
	            { zip: '945', county: '牡丹鄉' },
	            { zip: '946', county: '恆春鎮' },
	            { zip: '947', county: '滿州鄉' }
	        ]
	    },
	    {
	        city: '宜蘭縣',
	        contain: [
	            { zip: '260', county: '宜蘭市' },
	            { zip: '261', county: '頭城鎮' },
	            { zip: '262', county: '礁溪鄉' },
	            { zip: '263', county: '壯圍鄉' },
	            { zip: '264', county: '員山鄉' },
	            { zip: '265', county: '羅東鎮' },
	            { zip: '266', county: '三星鄉' },
	            { zip: '267', county: '大同鄉' },
	            { zip: '268', county: '五結鄉' },
	            { zip: '269', county: '冬山鄉' },
	            { zip: '270', county: '蘇澳鎮' },
	            { zip: '272', county: '南澳鄉' }
	        ]
	    },
	    {
	        city: '花蓮縣',
	        contain: [
	            { zip: '970', county: '花蓮市' },
	            { zip: '971', county: '新城鄉' },
	            { zip: '972', county: '秀林鄉' },
	            { zip: '973', county: '吉安鄉' },
	            { zip: '974', county: '壽豐鄉' },
	            { zip: '975', county: '鳳林鎮' },
	            { zip: '976', county: '光復鄉' },
	            { zip: '977', county: '豐濱鄉' },
	            { zip: '978', county: '瑞穗鄉' },
	            { zip: '979', county: '萬榮鄉' },
	            { zip: '981', county: '玉里鎮' },
	            { zip: '982', county: '卓溪鄉' },
	            { zip: '983', county: '富里鄉' }
	        ]
	    },
	    {
	        city: '臺東縣',
	        contain: [
	            { zip: '950', county: '台東市' },
	            { zip: '951', county: '綠島鄉' },
	            { zip: '952', county: '蘭嶼鄉' },
	            { zip: '953', county: '延平鄉' },
	            { zip: '954', county: '卑南鄉' },
	            { zip: '955', county: '鹿野鄉' },
	            { zip: '956', county: '關山鎮' },
	            { zip: '957', county: '海端鄉' },
	            { zip: '958', county: '池上鄉' },
	            { zip: '959', county: '東河鄉' },
	            { zip: '961', county: '成功鎮' },
	            { zip: '962', county: '長濱鄉' },
	            { zip: '963', county: '太麻里鄉' },
	            { zip: '964', county: '金峰鄉' },
	            { zip: '965', county: '大武鄉' },
	            { zip: '966', county: '達仁鄉' }
	        ]
	    },
	    {
	        city: '澎湖縣',
	        contain: [
	            { zip: '880', county: '馬公市' },
	            { zip: '881', county: '西嶼鄉' },
	            { zip: '882', county: '望安鄉' },
	            { zip: '883', county: '七美鄉' },
	            { zip: '884', county: '白沙鄉' },
	            { zip: '885', county: '湖西鄉' }
	        ]
	    },
	    {
	        city: '金門縣',
	        contain: [
	            { zip: '890', county: '金沙鎮' },
	            { zip: '891', county: '金湖鎮' },
	            { zip: '892', county: '金寧鄉' },
	            { zip: '893', county: '金城鎮' },
	            { zip: '894', county: '烈嶼鄉' },
	            { zip: '896', county: '烏坵鄉' }
	        ]
	    },
	    {
	        city: '連江縣',
	        contain: [
	            { zip: '209', county: '南竿鄉' },
	            { zip: '210', county: '北竿鄉' },
	            { zip: '211', county: '莒光鄉' },
	            { zip: '212', county: '東引鄉' }
	        ]
	    },
	];
	exports.dateFT = 'YYYY-MM-DD';
	exports.LangType = [
	    { id: 'en-US', label: '英語(美國)', classNameforG: 'label label-primary' },
	    { id: 'ja-JP', label: '日本語(日本)', classNameforG: 'label label-info' }
	];
	exports.PurchaseStateType = [
	    { id: 0, label: '現場付款', classNameforG: 'label label-primary' },
	    { id: 1, label: '待繳款', className: 'text-error', classNameforG: 'label label-warning' },
	    { id: 2, label: '待對帳確認', className: 'text-error', classNameforG: 'label label-danger' },
	    { id: 3, label: '匯款完畢待出貨通知', className: 'text-warning', classNameforG: 'label label-info' },
	    { id: 4, label: '訂單完成', className: 'text-success', classNameforG: 'label label-success' }
	];


/***/ }

});