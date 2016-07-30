"use strict";
const jQuery = require('jquery');
const Bootstrap = require('bootstrap');
[jQuery, Bootstrap];
const React = require('react');
const DT = require('dt');
const update = require('react-addons-update');
const CommFunc = require('comm-func');
class MatterList extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.setSearchEventValue = this.setSearchEventValue.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.state = {
            search: {
                city: null,
                info_type: info_type
            },
            lists: [],
            loading: true
        };
    }
    componentDidMount() {
        var _this = this;
        var params = { info_type: info_type };
        if (this.props.community_id != null)
            params['community_id'] = community_id;
        $.get(gb_approot + 'api/GetAction/SearchMatter', params)
            .done((data, textStatus, jqXHRdata) => {
            _this.setState({ lists: data, loading: false });
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        $('.dropdown-menu').click(function (e) {
            e.stopPropagation();
        });
        $('[name=city]').click(function (e) {
            _this.setSearchValue('city', e);
        });
        $('#price_bottom').change(function (e) {
            _this.setSearchValue('price_bottom', e);
        });
        $('#price_top').change(function (e) {
            _this.setSearchValue('price_top', e);
        });
        $('input[name=footage]').click(function (e) {
            _this.setSearchValue('footage', e);
        });
        $('#footage_bottom').change(function (e) {
            _this.setSearchValue('footage_bottom', e);
        });
        $('#footage_top').change(function (e) {
            _this.setSearchValue('footage_top', e);
        });
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    setSearchEventValue(name, e) {
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
        var objForUpdate = {
            search: {
                [name]: { $set: value }
            }
        };
        var newState = update(this.state, objForUpdate);
        this.setState(newState);
    }
    setSearchValue(name, e) {
        var target = $(e.target);
        var value = target.val();
        var objForUpdate = {
            search: {
                [name]: { $set: value }
            }
        };
        var newState = update(this.state, objForUpdate);
        this.setState(newState);
    }
    submitSearch(e) {
        e.preventDefault();
        this.setState({ loading: true });
        $.get(gb_approot + 'api/GetAction/SearchMatter', this.state.search)
            .done((data, textStatus, jqXHRdata) => {
            this.setState({ lists: data, loading: false });
        });
        return;
    }
    render() {
        var outHtml = null;
        var ele_search_form = null;
        ele_search_form = React.createElement("div", {className: "filter"}, React.createElement("form", {className: "form-inline", onSubmit: this.submitSearch}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only", htmlFor: ""}, "縣市"), React.createElement("div", {className: "btn-group"}, React.createElement("button", {"aria-expanded": "false", "aria-haspopup": "true", "data-toggle": "dropdown", className: "btn btn-secondary style2 dropdown-toggle", type: "button"}, "縣市", React.createElement("i", {className: "icon-angle-down"})), React.createElement("div", {className: "dropdown-menu city"}, React.createElement("div", {className: "row"}, React.createElement("label", {className: "col-xs-2 form-control-label text-xs-right", htmlFor: ""}, "北部"), React.createElement("div", {className: "col-xs-10 input-inline-group"}, DT.twDistrict.map(function (item, i) {
            return (React.createElement("label", {className: "c-input c-radio m-b-0"}, React.createElement("input", {type: "radio", name: "city", value: item.city, checked: this.state.search.city == item.city}), React.createElement("span", {className: "c-indicator"}), item.city));
        }.bind(this))))))), React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only", htmlFor: ""}, "總價"), React.createElement("div", {className: "btn-group"}, React.createElement("button", {"aria-expanded": "false", "aria-haspopup": "true", "data-toggle": "dropdown", className: "btn btn-secondary style2 dropdown-toggle", type: "button"}, "總價", React.createElement("i", {className: "icon-angle-down"})), React.createElement("div", {className: "dropdown-menu price form-inline p-t-1"}, React.createElement("div", {className: "input-group"}, React.createElement("select", {className: "form-control form-control-sm", id: "price_bottom"}, React.createElement("option", {value: "0"}, "0"), React.createElement("option", {value: "2000000"}, "200"), React.createElement("option", {value: "4000000"}, "400"), React.createElement("option", {value: "8000000"}, "800")), React.createElement("span", {className: "input-group-addon form-control-sm"}, "萬")), "~", React.createElement("div", {className: "input-group"}, React.createElement("select", {className: "form-control form-control-sm", id: "price_top"}, React.createElement("option", {value: ""}, "不限"), React.createElement("option", {value: "2000000"}, "200"), React.createElement("option", {value: "4000000"}, "400"), React.createElement("option", {value: "8000000"}, "800")), React.createElement("span", {className: "input-group-addon form-control-sm"}, "萬"))))), React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only", htmlFor: ""}, "坪數"), React.createElement("div", {className: "btn-group"}, React.createElement("button", {"data-toggle": "dropdown", className: "btn btn-secondary style2 dropdown-toggle", type: "button"}, "坪數", React.createElement("i", {className: "icon-angle-down"})), React.createElement("div", {className: "dropdown-menu size form-inline"}, React.createElement("label", {htmlFor: ""}, "計算方式："), React.createElement("select", {className: "form-control form-control-sm", id: "footageType"}, React.createElement("option", {value: "1"}, "建坪"), React.createElement("option", {value: "2"}, "主+陽"), React.createElement("option", {value: "3"}, "地坪")), React.createElement("hr", {className: "sm"}), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "0"}), React.createElement("span", {className: "c-indicator"}), "0坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "20"}), React.createElement("span", {className: "c-indicator"}), "20坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "30"}), React.createElement("span", {className: "c-indicator"}), "30坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "40"}), React.createElement("span", {className: "c-indicator"}), "40坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "50"}), React.createElement("span", {className: "c-indicator"}), "50坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "60"}), React.createElement("span", {className: "c-indicator"}), "60坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio", name: "footage", value: "100"}), React.createElement("span", {className: "c-indicator"}), "100坪以上"), React.createElement("label", {className: "c-input c-radio"}, React.createElement("input", {type: "radio"}), React.createElement("span", {className: "c-indicator"}), React.createElement("span", {className: "input-group"}, React.createElement("input", {type: "number", className: "form-control form-control-sm w-x-4", id: "footage_bottom"}), React.createElement("span", {className: "input-group-addon form-control-sm"}, "坪")), "~", React.createElement("span", {className: "input-group"}, React.createElement("input", {type: "number", className: "form-control form-control-sm w-x-4", id: "footage_top"}), React.createElement("span", {className: "input-group-addon form-control-sm"}, "坪")))))), React.createElement("div", {className: "form-group"}, React.createElement("button", {type: "submit", className: "btn btn-primary"}, "搜　尋"))));
        if (this.state.loading) {
            outHtml = React.createElement("div", {className: "loading"}, React.createElement("div", {className: "loader", "data-loader": "circle-side"}), React.createElement("p", {className: "h4"}, "資料讀取中……"));
        }
        else {
            outHtml = (React.createElement("div", {className: "wrap"}, ele_search_form, React.createElement("p", {className: "clearfix"}, React.createElement("span", {className: "result pull-xs-left"}, "共有", React.createElement("strong", {className: "text-danger"}, this.state.lists.length), "間房屋符合條件"), React.createElement("span", {className: "pull-xs-right form-inline"}, React.createElement("label", {htmlFor: ""}, "排序方式："), React.createElement("select", {className: "form-control form-control-sm"}, React.createElement("option", {value: true}, "預設排序"), React.createElement("option", {value: true}, "更新時間新 → 舊"), React.createElement("option", {value: true}, "總價低 → 高"), React.createElement("option", {value: true}, "總價高 → 低"), React.createElement("option", {value: true}, "坪數低 → 高"), React.createElement("option", {value: true}, "坪數高 → 低"), React.createElement("option", {value: true}, "屋齡低 → 高"), React.createElement("option", {value: true}, "屋齡高 → 低")))), React.createElement("ol", {className: "prolist row"}, this.state.lists.map((item, i) => {
                var out_html = null;
                if (this.props.info_type == 'S') {
                    var link_content = this.props.community_id == null ? gb_approot + 'Sell/Content?id=' : 'Sell_content?id=';
                    out_html = React.createElement("li", {className: "pro", key: item.matter_id}, React.createElement("article", {className: "card"}, React.createElement("a", {className: "card-img-top", href: link_content + item.matter_id}, React.createElement("img", {alt: item.matter_name, src: item.list_src})), React.createElement("div", {className: "card-block"}, React.createElement("h4", {className: "card-title"}, React.createElement("a", {href: link_content + item.matter_id}, item.matter_name)), React.createElement("section", {className: "card-text"}, React.createElement("h5", {className: "card-subtitle"}, item.title), React.createElement("ul", {className: "feature list-inline"}, React.createElement("li", null, item.city + item.country + item.address)), React.createElement("ul", {className: "info list-inline"}, React.createElement("li", null, item.build_area, " ", React.createElement("span", {className: "text-muted"}, "建坪")), React.createElement("li", null, (item.house_area + item.balcony_area).toFixed(2), " ", React.createElement("span", {className: "text-muted"}, "主+陽")), React.createElement("li", null, item.age, " ", React.createElement("span", {className: "text-muted"}, "年")), React.createElement("li", null, item.site_floor, "/", item.total_floor, " ", React.createElement("span", {className: "text-muted"}, "樓")), React.createElement("li", null, item.bedrooms, " ", React.createElement("span", {className: "text-muted"}, "房"), item.livingrooms, " ", React.createElement("span", {className: "text-muted"}, "廳"), item.bathrooms, " ", React.createElement("span", {className: "text-muted"}, "衛"), item.rooms, " ", React.createElement("span", {className: "text-muted"}, "室"))), React.createElement("span", {className: "price"}, React.createElement("strong", {className: "text-danger"}, item.price / 10000), "萬")), React.createElement("a", {className: "more btn btn-secondary", href: link_content + item.matter_id}, "看更多", React.createElement("i", {className: "icon-angle-right"})))));
                }
                if (this.props.info_type == 'R') {
                    var link_content = this.props.community_id == null ? gb_approot + 'Rent/Content?id=' : 'Rent_content?id=';
                    out_html = React.createElement("li", {className: "pro"}, React.createElement("article", {className: "card"}, React.createElement("a", {className: "card-img-top", href: link_content + item.matter_id}, React.createElement("img", {alt: item.matter_name, src: item.list_src})), React.createElement("div", {className: "card-block"}, React.createElement("h4", {className: "card-title"}, React.createElement("a", {href: link_content + item.matter_id}, item.matter_name)), React.createElement("section", {className: "card-text"}, React.createElement("h5", {className: "card-subtitle"}, item.title), React.createElement("ul", {className: "feature list-inline"}, React.createElement("li", null, item.city + item.country + item.address)), React.createElement("ul", {className: "info list-inline"}, React.createElement("li", null, item.build_area, " ", React.createElement("span", {className: "text-muted"}, "坪")), React.createElement("li", null, item.site_floor, "/", item.total_floor, " ", React.createElement("span", {className: "text-muted"}, "樓")), React.createElement("li", null, item.bedrooms, " ", React.createElement("span", {className: "text-muted"}, "房"), item.livingrooms, " ", React.createElement("span", {className: "text-muted"}, "廳"), item.bathrooms, " ", React.createElement("span", {className: "text-muted"}, "衛"), item.rooms, " ", React.createElement("span", {className: "text-muted"}, "室"))), React.createElement("span", {className: "price"}, React.createElement("strong", {className: "text-danger"}, CommFunc.formatNumber(item.rentOfMonh)), "元/月")), React.createElement("a", {href: link_content + item.matter_id, className: "more btn btn-secondary"}, "看更多", React.createElement("i", {className: "icon-angle-right"})))));
                }
                return out_html;
            }))));
        }
        return outHtml;
    }
}
MatterList.defaultProps = {
    community_id: null,
    info_type: null
};
exports.MatterList = MatterList;
