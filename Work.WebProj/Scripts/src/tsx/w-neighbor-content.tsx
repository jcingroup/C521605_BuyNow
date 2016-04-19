import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import CommFunc = require('comm-func');
declare var id: number;
namespace WWW {

    interface WWWState {
        item?: server.Matter
    }

    export class SellContent extends React.Component<any, WWWState>{

        constructor() {

            super();
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.setSearchEventValue = this.setSearchEventValue.bind(this);
            this.setSearchValue = this.setSearchValue.bind(this);

            this.state = {
                item: { imgurl_MatterPhoto: [] }
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            $.get(gb_approot + 'api/GetAction/GetMatter', { id: id })
                .done((data: IResultData<server.Matter>, textStatus, jqXHRdata) => {
                    if (data.result) {
                        _this.setState({ item: data.data });
                        $("img.lazy").lazyload({ effect: "fadeIn" });
                    } else {
                        alert(data.message);
                    }
                });
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

        render() {

            var outHtml: JSX.Element = null;
            var item = this.state.item;

            var EletypeOfHouse;
            if (item.typeOfHouse == 'F') {
                EletypeOfHouse = (<span>大樓</span>);
            }
            else if (item.typeOfHouse == 'H') {
                EletypeOfHouse = (<span>成屋</span>);
            } else {
                EletypeOfHouse = (<span></span>);
            }

            outHtml = (
                <div className="wrap">
                    <h2 className="h2 title">{item.matter_name}</h2>
                    <ol className="breadcrumb">
                        <li><a href="~/Index">HOME</a></li>
                        <li><a href="~/Sell/List">我要買房</a></li>
                    </ol>
                    <dl className="grid-pro row">
                        <dt className="thumb">
                            <i className="img-thumbnail">
                                <img className="lazy" alt="" data-original={item.imgurl_MatterPhoto_1} />
                            </i>
                            <a className="btn btn-secondary btn-sm scroll" href="#gallery">看更多實景照片</a>
                        </dt>
                        <dd className="profile">
                            <article>
                                <h3 className="h4">
                                    <span className="label label-sell">售</span>
                                    新北市樹林區中華路
                                    <small className="text-primary m-l-1">物件編號：{item.sn}</small>
                                </h3>
                                <ul className="detail list-unstyled">
                                    <li><strong className="text-secondary">總價：</strong><strong className="price text-danger">{CommFunc.formatNumber(item.price / 10000) }</strong>萬</li>
                                    <li><strong className="text-secondary">建物登記：</strong>{item.build_area} 坪</li>
                                    <li><strong className="text-secondary">每坪單價：</strong>{}24.3 萬</li>
                                    <li><strong className="text-secondary">類型：</strong>{item.typeOfHouse}大樓、成屋</li>
                                    <li><strong className="text-secondary">社區名稱：</strong>{item.community_name}</li>
                                    <li><strong className="text-secondary">格局：</strong>{item.bedrooms}房 / {item.livingrooms}廳 / {item.bathrooms}衛 / {item.rooms}室</li>
                                    <li>
                                        <div className="row">
                                            <div className="grid">
                                                <strong className="text-secondary">主建物：</strong>{item.house_area} 坪
                                            </div>
                                            <div className="grid">
                                                <strong className="text-secondary">土地登記：</strong>{item.land_area} 坪
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="grid">
                                                <strong className="text-secondary">屋齡：</strong>{item.age}年
                                            </div>
                                            <div className="grid">
                                                <strong className="text-secondary">車位：</strong>{item.parking}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="grid">
                                                <strong className="text-secondary">電梯：</strong>有
                                            </div>
                                            <div className="grid">
                                                <strong className="text-secondary">樓層/樓高：</strong>14/16樓
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <p>高樓景觀屋況佳、格局方正採光佳、市場學區交通便利、優質社區平面車位</p>
                                    </li>
                                </ul>
                                <ul className="more-info list-unstyled clearfix">
                                    <li className="tel">
                                        <h5 className="h5 m-b-0">來電預約賞屋</h5>
                                        <strong>02-8765-4321</strong>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2 scroll" href="#interior">格局圖</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2 scroll" href="#location">地圖</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2 scroll" href="#facility">生活機能</a>
                                    </li>
                                </ul>
                            </article>
                        </dd>
                    </dl>
                    <section className="grid-info">
                        <h3 className="h3">基本資料</h3>
                        <table className="table table-striped">
                            <tbody><tr>
                                <th scope="row">地址</th>
                                <td colSpan={3}>{item.city + item.country + item.address}</td>
                            </tr>
                                <tr>
                                    <th scope="row">總價</th>
                                    <td colSpan={3}>{CommFunc.formatNumber(item.price / 10000) } 萬</td>
                                </tr>
                                <tr>
                                    <th scope="row">格局</th>
                                    <td colSpan={3}>{item.bedrooms}房/ {item.livingrooms}廳/ {item.bedrooms}衛/ {item.rooms}室</td>
                                </tr>
                                <tr>
                                    <th scope="row">建物登記</th>
                                    <td colSpan={3}>4{item.build_area} 坪</td>
                                </tr>
                                <tr>
                                    <th scope="row">土地登記</th>
                                    <td colSpan={3}>
                                        {item.land_area} 坪<br />
                                        主建物 {item.house_area}坪　陽台 {item.balcony_area}坪　雨遮 {item.umbrella_aea}坪　公共設施 {item.public_area}坪
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">屋齡</th>
                                    <td colSpan={3}>{item.age} 年</td>
                                </tr>
                                <tr>
                                    <th scope="row">該層戶數</th>
                                    <td style={{ width: '30%' }}>該層{item.buildhouses}戶；共用2部電梯</td>
                                    <th scope="row" style={{ width: '15%' }}>出售樓層/總樓層</th>
                                    <td>14/16樓</td>
                                </tr>
                                <tr>
                                    <th scope="row">類型</th>
                                    <td>{EletypeOfHouse}</td>
                                    <th scope="row">朝向</th>
                                    <td>{ item.orientation }</td>
                                </tr>
                                <tr>
                                    <th scope="row">月管理費</th>
                                    <td>{item.managementFeeOfMonth} 元</td>
                                    <th scope="row">警衛管理</th>
                                    <td>{item.guard}</td>
                                </tr>
                                <tr>
                                    <th scope="row">建物結構</th>
                                    <td>{item.architecture}</td>
                                    <th scope="row">特殊格局</th>
                                    <td>{item.is_end}{item.is_darkroom}</td>
                                </tr>
                                <tr>
                                    <th scope="row">車位</th>
                                    <td>{item.parking}</td>
                                    <th scope="row">外牆建材</th>
                                    <td>{item.wall_materials}</td>
                                </tr>
                            </tbody></table>
                    </section>
                    <section className="grid-info" id="gallery">
                        <h3 className="h3">物件實景照片</h3>
                        <ol className="gallery row">
                            {
                                this.state.item.imgurl_MatterPhoto.map(function (sub_item, i) {
                                    return (
                                        <li key={i}><a className="img-thumbnail" href=""><img className="lazy" alt="" data-original={sub_item} /></a></li>
                                    );
                                })
                            }
                        </ol>
                    </section>
                    <section className="grid-info" id="interior">
                        <h3 className="h3">格局圖</h3>
                        <p className="text-xs-center">
                            <img className="img-thumbnail lazy" alt="" data-original={item.imgurl_MatterStyle} />
                        </p>
                    </section>
                    <section className="grid-info" id="facility">
                        <h3 className="h3">生活機能</h3>
                        <ul className="list-unstyled">
                            <li><strong className="text-secondary">學校：</strong>鄰近大同國小、樹林國中。</li>
                            <li><strong className="text-secondary">市場：</strong>鄰近彭厝市場</li>
                            <li><strong className="text-secondary">公園：</strong>鎮前親子公園</li>
                            <li><strong className="text-secondary">交通：</strong>捷運萬大線(預定) 彭福站步行 6 分鐘</li>
                        </ul>
                    </section>
                    <section className="grid-info" id="location">
                        <h3 className="h3">地圖</h3>
                        <iframe frameBorder={0} allowFullScreen src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyAkdAGlHjUw6nKXSGHjL0HiLATRfCBnB_c&q=' + item.city + item.country + item.address} id="map" />
                    </section>
                </div>

            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
ReactDOM.render(<WWW.SellContent  />, dom); 