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
        item?: server.Community
    }

    export class CommunityContent extends React.Component<any, WWWState>{

        constructor() {

            super();
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.setSearchEventValue = this.setSearchEventValue.bind(this);
            this.setSearchValue = this.setSearchValue.bind(this);

            this.state = {
                item: { imgurl_CommunityDoor: [] }
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            $.get(gb_approot + 'api/GetAction/GetMatter', { id: id })
                .done((data: IResultData<server.Community>, textStatus, jqXHRdata) => {
                    if (data.result) {
                        _this.setState({ item: data.data });
                        $("img.lazy").lazyload({ effect: "fadeIn" });


                        $(document).ready(function () {

                            $('.gallery').each(function () { // the containers for all your galleries
                                $(this).magnificPopup({
                                    delegate: 'a', // the selector for gallery item
                                    type: 'image',
                                    gallery: {
                                        enabled: true
                                    }
                                });
                            });
                            $('.pop').magnificPopup({
                                type: 'iframe'
                            });

                            var swiper = new Swiper('.bulletin', {
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                speed: 1000,
                                spaceBetween: 15
                            });

                        });

                        if (window.location.hash) {
                            $('html, body').animate({ scrollTop: 0 }, 0);
                            var hash = window.location.hash;
                            $('html, body').animate({
                                scrollTop: $(hash).offset().top - 250
                            }, 2000);
                        }


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

            outHtml = (
                <div className="wrap">
                    <div id="intro">
                        <h2 className="h2 title">{}</h2>
                        <dl className="grid-pro row m-b-3">
                            <dt className="thumb">
                                <i className="img-thumbnail">
                                    <img className="lazy" data-original={''} />
                                </i>
                                <a className="btn btn-secondary btn-sm scroll" href="#gallery">看更多實景照片</a>
                            </dt>
                            <dd className="profile">
                                <ul className="detail list-unstyled">
                                    <li><strong className="text-secondary">完工日期：</strong>{item.finish}</li>
                                    <li><strong className="text-secondary">建物地址：</strong>桃園市桃園區莊二街1393號</li>
                                    <li><strong className="text-secondary">建物型態：</strong>大樓</li>
                                    <li><strong className="text-secondary">建物樓層：</strong>地上 14 層 / 地下 2 層</li>
                                    <li><strong className="text-secondary">總戶數：</strong>107戶</li>
                                    <li><strong className="text-secondary">同層戶數：</strong>2戶</li>
                                    <li><strong className="text-secondary">管理方式：</strong>警衛</li>
                                    <li><strong className="text-secondary">建設公司：</strong>大睦長昇建設</li>
                                    <li><strong className="text-secondary">營造公司：</strong>大睦長昇建設</li>
                                </ul>
                                <ul className="more-info list-unstyled clearfix">
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href="~/Neighbor/Sell_list">本社區待售房屋</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href="~/Neighbor/Rent_list">本社區待租房屋</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" target="new" href="http://www.jojogo168.com/">好康團購</a>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <section className="grid-info" id="feature">
                        <h3 className="h3">社區特色</h3>
                        <p>當代建築的文藝復興 貴族生活的精緻展現 高級住宅的品味、Fragonard 所設計的壯麗十八世紀庭園、加上讓人目不暇給的噴泉水瀑琉璃的裝點，讓千泉宮Tivoli成為羅馬最令人緬懷的繁華盛事。[國王的城堡]融合古典與現代建築美學、重塑 Tivoli 的建築經典，創造精睿的驚世內涵、雕琢傳世不朽的絢麗外觀，歌德式的尖塔式屋頂造型，黃金比例的建築身段，宮廷式露天中庭，[國王的城堡]兼具五星級飯店的尊榮與私人城堡的隱密，打造人人稱羨的21世紀新貴族優質生活。</p>
                        <article className="article">
                            <h4 className="h4">生活機能</h4>
                            <ul className="list-unstyled">
                                <li><strong className="text-secondary">交通：</strong>近未來五楊高架交流道樞紐，緊接中正路和中正北路，5分鐘上南崁交流道，交通四通八達超便利。</li>
                                <li><strong className="text-secondary">生活：</strong>位於莊二街與中正路交叉口，尊爵大飯店旁，中正公園旁，樓下就有7-11，離桃園中正藝文特區5分鐘，生活機能性極佳，桃園房屋優質住宅區，交通便利，四面採光，優質生活圈，增值性極高</li>
                            </ul>
                        </article>
                    </section>
                    <section className="grid-info" id="gallery">
                        <h3 className="h3">社區實景．公設</h3>
                        <article className="article">
                            <h4 className="h4">迎賓大門</h4>
                            <ol className="gallery row">
                                <li><a className="img-thumbnail" href="~/Content/images/Neighbor/pro1/01.jpg"><img className="lazy" data-original={item.imgurl_CommunityList} /></a></li>
                            </ol>
                        </article>
                        <article className="article">
                            <h4 className="h4">社區公設</h4>
                            <p>本社區管理嚴謹，迎賓廳氣派大方，有美麗小中悅豪宅之稱，環保廚房免用瓦斯，桃園唯一全社區皆用環保式電熱式廚房、衛浴設備；公設有健身房, 圖書室, 視聽中心, 遊戲室, 空中花園, 撞球室</p>
                            <ol className="gallery row">
                                <li><a className="img-thumbnail" href="~/Content/images/Neighbor/pro1/12.jpg"><img className="lazy" data-original={item.imgurl_CommunityPublic} /></a></li>

                            </ol>
                        </article>
                    </section>
                    <section className="grid-info" id="diary">
                        <div className="clearfix">
                            <ul className="pull-xs-right list-inline m-b-0">
                                <li className="swiper-button-prev" />
                                <li className="swiper-button-next" />
                            </ul>
                            <h3 className="h3">社區日誌</h3>
                        </div>
                        <div className="row">
                            <div className="col-xs-5">
                                <img className="img-thumbnail w-full" data-original={item.imgurl_CommunityList} />
                            </div>
                            <div className="bulletin col-xs-7 swiper-container">
                                <div className="swiper-wrapper">
                                    <ul className="swiper-slide list-unstyled">
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>

                                    </ul>
                                    <ul className="swiper-slide list-unstyled">
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>
                                        <li>
                                            <small className="date">2016-01-01</small>
                                            <a className="pop" href="~/Neighbor/Notice">TitleTitle標題標題</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="grid-info" id="contact">
                        <h3 className="h3">聯絡方式</h3>
                        <div className="row">
                            <div className="col-xs-5">
                                <ul className="contact-list list-unstyled">
                                    <li><strong className="text-secondary">地址：</strong>新北市樹林區學成路655號9樓</li>
                                    <li><strong className="text-secondary">電話：</strong>02-3501-6715</li>
                                    <li><strong className="text-secondary">E-mail：</strong>ahagentcom @gmail.com</li>
                                    <li><strong className="text-secondary">聯絡人：</strong>X先生</li>
                                </ul>
                            </div>
                            <div className="col-xs-7">
                                <iframe frameBorder={0} allowFullScreen src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.572889805967!2d121.37944231500457!3d24.94661608401328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34681c740c32b2af%3A0x2ba1a4efce64b775!2zMjM45paw5YyX5biC5qi55p6X5Y2A5a245oiQ6LevNjU16Jmf!5e0!3m2!1szh-TW!2stw!4v1458115457215" id="map" />
                            </div>
                        </div>
                    </section>
                </div>


            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
//ReactDOM.render(<WWW.CommunityContent  />, dom); 