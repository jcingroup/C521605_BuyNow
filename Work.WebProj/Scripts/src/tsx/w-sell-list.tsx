import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import ReactBootstrap = require('react-bootstrap');
import LazyLoad = require('react-lazyload');
import CommFunc = require('comm-func');
//import { LazyLoad } from "./react-lazyload";
namespace WWW {
    declare var info_type: string;

    interface WWWState {
        search?: {
            city?: string,
            footage?: number,
            info_type: string,
            price_top?: number,
            price_bottom?: number,
            footage_bottom?: number,
            footage_top?: number
        },
        lists?: Array<server.Matter>
    }

    export class SellList extends React.Component<any, WWWState>{

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
                lists: []
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            $.get(gb_approot + 'api/GetAction/SearchMatter', { info_type: info_type })
                .done((data, textStatus, jqXHRdata) => {
                    _this.setState({ lists: data });
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });


            $('.dropdown-menu').click(function (e) {
                e.stopPropagation();
            });

            $('[name=city]').click(function (e) {
                _this.setSearchValue('city', e);
            })

            $('#price_bottom').change(function (e) {
                _this.setSearchValue('price_bottom', e);
            })

            $('#price_top').change(function (e) {
                _this.setSearchValue('price_top', e);
            })

            $('input[name=footage]').click(function (e) {
                //console.log($(this).val());
                _this.setSearchValue('footage', e);
            })


            $('#footage_bottom').change(function (e) {
                _this.setSearchValue('footage_bottom', e);
            })

            $('#footage_top').change(function (e) {
                _this.setSearchValue('footage_top', e);
            })
            //$('.dropdown-toggle').click(function (e) {
            //    $('#collapse-other').collapse('hide');
            //});
            //$('#collapse-other').on('show.bs.collapse', function () {
            //    $('.btn[data-toggle="collapse"]').addClass('active');
            //});
            //$('#collapse-other').on('hide.bs.collapse', function () {
            //    $('.btn[data-toggle="collapse"]').removeClass('active');
            //});
        }
        componentDidUpdate(prevProps, prevState) {

        }
        componentWillUnmount() {

        }

        setSearchEventValue(name: string, e: React.SyntheticEvent) {
            //console.log('Event');
            let input: HTMLInputElement = e.target as HTMLInputElement;
            let value;

            if (input.value == 'true') {
                value = true;
            } else if (input.value == 'false') {
                value = false;
            } else {
                value = input.value;
            }
            var objForUpdate = {
                search:
                {
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
                search:
                {
                    [name]: { $set: value }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        submitSearch(e) {
            e.preventDefault();
            $.get(gb_approot + 'api/GetAction/SearchMatter', this.state.search)
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({ lists: data });
                });
            return;
        }
        render() {
            //console.log(LazyLoad);
            var outHtml: JSX.Element = null;
            //var LazyLoad = ReactLazyLoad;

            outHtml = (
                <div className="wrap">
                    <div className="filter">
                        <form className="form-inline" onSubmit={this.submitSearch}>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="">縣市</label>
                                <div className="btn-group">
                                    <button aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" className="btn btn-secondary style2 dropdown-toggle" type="button">縣市<i className="ti-angle-down" /></button>
                                    <div className="dropdown-menu city">
                                        <div className="row">
                                            <label className="col-xs-2 form-control-label text-xs-right" htmlFor="">北部</label>
                                            <div className="col-xs-10 input-inline-group">
                                                {
                                                    DT.twDistrict.map(function (item, i) {
                                                        return (
                                                            <label className="c-input c-radio m-b-0">
                                                                <input type="radio" name="city"
                                                                    value={item.city}
                                                                    checked={this.state.search.city == item.city} />
                                                                <span className="c-indicator" />{item.city}
                                                            </label>);
                                                    }.bind(this))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="sr-only" htmlFor="">總價</label>
                                <div className="btn-group">
                                    <button aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" className="btn btn-secondary style2 dropdown-toggle" type="button">總價<i className="ti-angle-down" /></button>
                                    <div className="dropdown-menu price form-inline p-t-1">
                                        <div className="input-group">
                                            <select className="form-control form-control-sm" id="price_bottom">
                                                <option value="0">0</option>
                                                <option value="2000000">200</option>
                                                <option value="4000000">400</option>
                                                <option value="8000000">800</option>
                                            </select>
                                            <span className="input-group-addon form-control-sm">萬</span>
                                        </div>
                                        ~
                                        <div className="input-group">
                                            <select className="form-control form-control-sm" id="price_top">
                                                <option value="">不限</option>
                                                <option value="2000000">200</option>
                                                <option value="4000000">400</option>
                                                <option value="8000000">800</option>
                                            </select>
                                            <span className="input-group-addon form-control-sm">萬</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="sr-only" htmlFor="">坪數</label>
                                <div className="btn-group">
                                    <button data-toggle="dropdown" className="btn btn-secondary style2 dropdown-toggle" type="button">坪數<i className="ti-angle-down" /></button>
                                    <div className="dropdown-menu size form-inline">
                                        <label htmlFor="">計算方式：</label>
                                        <select className="form-control form-control-sm" id="footageType">
                                            <option value="1">建坪</option>
                                            <option value="2">主+陽</option>
                                            <option value="3">地坪</option>
                                        </select>
                                        <hr className="sm" />
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="0" />
                                            <span className="c-indicator" />
                                            0坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="20" />
                                            <span className="c-indicator" />
                                            20坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio"  name="footage" value="30" />
                                            <span className="c-indicator" />
                                            30坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="40" />
                                            <span className="c-indicator" />
                                            40坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="50" />
                                            <span className="c-indicator" />
                                            50坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="60" />
                                            <span className="c-indicator" />
                                            60坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" name="footage" value="100" />
                                            <span className="c-indicator" />
                                            100坪以上
                                        </label>
                                        <label className="c-input c-radio">
                                            <input type="radio" />
                                            <span className="c-indicator" />
                                            <span className="input-group">
                                                <input type="number" className="form-control form-control-sm w-x-4" id="footage_bottom" />
                                                <span className="input-group-addon form-control-sm">坪</span>
                                            </span>
                                            ~
                                            <span className="input-group">
                                                <input type="number" className="form-control form-control-sm w-x-4" id="footage_top" />
                                                <span className="input-group-addon form-control-sm">坪</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">搜　尋</button>
                            </div>
                        </form>
                    </div>
                    <p className="clearfix">
                        <span className="result pull-xs-left">共有<strong className="text-danger">{this.state.lists.length}</strong>間房屋符合條件</span>
                        <span className="pull-xs-right form-inline">
                            <label htmlFor="">排序方式：</label>
                            <select className="form-control form-control-sm">
                                <option value>預設排序</option>
                                <option value>更新時間新 → 舊</option>
                                <option value>總價低 → 高</option>
                                <option value>總價高 → 低</option>
                                <option value>坪數低 → 高</option>
                                <option value>坪數高 → 低</option>
                                <option value>屋齡低 → 高</option>
                                <option value>屋齡高 → 低</option>
                            </select>
                        </span>
                    </p>
                    <ol className="prolist row">
                        {
                            this.state.lists.map(function (item, i) {

                                var out_html = null;
                                //賣
                                if (info_type == 'S') {
                                    out_html = <li className="pro" key={item.matter_id}>

                                        <article className="card">
                                            <a className="card-img-top" href={gb_approot + 'Sell/Content?id=' + item.matter_id}>
                                                <img alt={item.matter_name} src={item.list_src} />
                                            </a>
                                            <div className="card-block">
                                                <h4 className="card-title"><a href={gb_approot + 'Sell/Content?id=' + item.matter_id}>{item.matter_name}</a></h4>
                                                <section className="card-text">
                                                    <h5 className="card-subtitle">{item.title}</h5>
                                                    <ul className="feature list-inline">
                                                        <li>{item.city + item.country + item.address}</li>
                                                    </ul>
                                                    <ul className="info list-inline">
                                                        <li>{item.build_area} <span className="text-muted">建坪</span></li>
                                                        <li>{item.house_area + item.balcony_area} <span className="text-muted">主+陽</span></li>
                                                        <li>{item.age} <span className="text-muted">年</span></li>
                                                        <li>14/16 <span className="text-muted">樓</span></li>
                                                        <li>
                                                            {item.bedrooms} <span className="text-muted">房</span>
                                                            {item.livingrooms} <span className="text-muted">廳</span>
                                                            {item.bathrooms} <span className="text-muted">衛</span>
                                                            {item.rooms} <span className="text-muted">室</span>
                                                        </li>
                                                    </ul>
                                                    <span className="price">
                                                        <strong className="text-danger">{item.price / 10000}</strong>萬
                                                    </span>
                                                </section>
                                                <a className="more btn btn-secondary" href={gb_approot + 'Sell/Content?id=' + item.matter_id}>
                                                    看更多
                                                    <i className="ti-angle-right" />
                                                </a>
                                            </div>
                                        </article>

                                    </li>;
                                }

                                //租
                                if (info_type == 'R') {
                                    out_html = <li className="pro">
                                        <article className="card">
                                            <a className="card-img-top" href={gb_approot + 'Rent/Content?id=' + item.matter_id}>
                                                <img alt={item.matter_name} src={item.list_src} />
                                            </a>
                                            <div className="card-block">
                                                <h4 className="card-title"><a href={gb_approot + 'Rent/Content?id=' + item.matter_id}>{item.matter_name}</a></h4>
                                                <section className="card-text">
                                                    <h5 className="card-subtitle">{item.title}</h5>
                                                    <ul className="feature list-inline">
                                                        <li>{item.city + item.country + item.address}</li>
                                                    </ul>
                                                    <ul className="info list-inline">
                                                        <li>{item.build_area} <span className="text-muted">坪</span></li>
                                                        <li>14/16 <span className="text-muted">樓</span></li>
                                                        <li>
                                                            {item.bedrooms} <span className="text-muted">房</span>
                                                            {item.livingrooms} <span className="text-muted">廳</span>
                                                            {item.bathrooms} <span className="text-muted">衛</span>
                                                            {item.rooms} <span className="text-muted">室</span>
                                                        </li>
                                                    </ul>
                                                    <span className="price">
                                                        <strong className="text-danger">{CommFunc.formatNumber(item.rentOfMonh) }</strong>元/月
                                                    </span>
                                                </section>
                                                <a href={gb_approot + 'Rent/Content?id=' + item.matter_id} className="more btn btn-secondary">
                                                    看更多
                                                    <i className="ti-angle-right"></i>
                                                </a>
                                            </div>
                                        </article>
                                    </li>;
                                }

                                return out_html;
                            })
                        }

                    </ol>
                </div>
            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
ReactDOM.render(<WWW.SellList  />, dom); 