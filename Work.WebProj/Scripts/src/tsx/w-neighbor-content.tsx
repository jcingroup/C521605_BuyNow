import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import CommFunc = require('comm-func');
declare var id: number;
declare var json_data: server.Community;

namespace WWW {

    interface WWWState {
        item?: server.Community
        news?: Array<server.Community_News>
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
                item: json_data,
                news: []
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;
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

                var marquee = new Swiper('#marquee', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    autoplay: 2500,
                    speed: 2000,
                    slidesPerView: 'auto',
                });

            });

            if (window.location.hash) {
                $('html, body').animate({ scrollTop: 0 }, 0);
                var hash = window.location.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 250
                }, 2000);
            }

            $.get(gb_approot + 'api/GetAction/GetNewsList', { id: id })
                .done((data: Array<server.Community_News>, textStatus, jqXHRdata) => {
                    _this.setState({ news: data });
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
                        <h2 className="h2 title">{item.community_name}</h2>
                        <dl className="grid-pro row m-b-3">
                            <dt className="thumb">
                                <i className="img-thumbnail">
                                    <img className="lazy" data-original={item.imgurl_CommunityList} />
                                </i>
                                <a className="btn btn-secondary btn-sm scroll" href="#gallery">看更多實景照片</a>
                            </dt>
                            <dd className="profile">
                                <ul className="detail list-unstyled">
                                    <li><strong className="text-secondary">完工日期：</strong>{item.finish}</li>
                                    <li><strong className="text-secondary">建物地址：</strong>{item.address}</li>
                                    <li><strong className="text-secondary">建物型態：</strong>{item.typeOfBuild}</li>
                                    <li><strong className="text-secondary">建物樓層：</strong>地上 {item.over_floor} 層 / 地下 {item.under_floor} 層</li>
                                    <li><strong className="text-secondary">總戶數：</strong>{item.holders}戶</li>
                                    <li><strong className="text-secondary">同層戶數：</strong>{item.perOfHolder}戶</li>
                                    <li><strong className="text-secondary">管理方式：</strong>{item.manage}</li>
                                    <li><strong className="text-secondary">建設公司：</strong>{item.company}</li>
                                    <li><strong className="text-secondary">營造公司：</strong>{item.build}</li>
                                </ul>
                                <ul className="more-info list-unstyled clearfix">
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href={gb_approot + 'Neighbor/Sell_list'}>本社區待售房屋</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href={gb_approot + 'Neighbor/Rent_list'}>本社區待租房屋</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" target="new" href="http://www.jojogo168.com/">好康團購</a>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <section className="grid-info">
                        <div id="marquee" className="swiper-container">
                            <ul className="swiper-wrapper list-unstyled">
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad1.jpg" />
                                        <span className="title">黑枸杞美妍奇蹟飲</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad2.jpg" />
                                        <span className="title">珪藻土超吸水肥皂盒</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad1.jpg" />
                                        <span className="title">黑枸杞美妍奇蹟飲</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad2.jpg" />
                                        <span className="title">珪藻土超吸水肥皂盒</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad1.jpg" />
                                        <span className="title">黑枸杞美妍奇蹟飲</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad2.jpg" />
                                        <span className="title">珪藻土超吸水肥皂盒</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad1.jpg" />
                                        <span className="title">黑枸杞美妍奇蹟飲</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad2.jpg" />
                                        <span className="title">珪藻土超吸水肥皂盒</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad1.jpg" />
                                        <span className="title">黑枸杞美妍奇蹟飲</span>
                                    </a>
                                </li>
                                <li className="swiper-slide">
                                    <a className="pop" href="/Neighbor/Notice">
                                        <img src="/Content/images/Neighbor/ad2.jpg" />
                                        <span className="title">珪藻土超吸水肥皂盒</span>
                                    </a>
                                </li>
                            </ul>
                            <a className="swiper-button-prev" href="#"></a>
                            <a className="swiper-button-next" href="#"></a>
                        </div>
                    </section>
                    <section className="grid-info" id="feature">
                        <h3 className="h3">社區特色</h3>
                        <p dangerouslySetInnerHTML={ { __html: item.txt_spot } }></p>
                    </section>
                    <section className="grid-info" id="gallery">
                        <h3 className="h3">社區實景．公設</h3>
                        <p dangerouslySetInnerHTML={ { __html: item.txt_public } }></p>
                        <article className="article">
                            <h4 className="h4">迎賓大門</h4>
                            <ol className="gallery row">
                                {
                                    item.imgurl_CommunityDoor.map(function (item, i) {
                                        return (<li>
                                            <a className="img-thumbnail" href={item}>
                                                <img className="lazy" data-original={item} />
                                            </a>
                                        </li>);
                                    })
                                }
                            </ol>
                        </article>
                        <article className="article">
                            <h4 className="h4">社區公設</h4>
                            <ol className="gallery row">
                                {
                                    item.imgurl_CommunityPublic.map(function (item, i) {
                                        return (
                                            <li key={i}><a href={item} className="img-thumbnail"><img data-original={item} alt="" className="lazy" /></a></li>);
                                    })
                                }
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
                                <img className="img-thumbnail w-full" src={gb_approot + 'Content/images/Neighbor/pic.jpg'} />
                            </div>
                            <div className="bulletin col-xs-7 swiper-container">
                                <div className="swiper-wrapper">
                                    <ul className="swiper-slide list-unstyled">
                                        {
                                            this.state.news.map(function (item, i) {
                                                return (
                                                    <li key={item.community_news_id}>
                                                        <small className="date">{item.start_date}</small>
                                                        <a className="pop" href={gb_approot + 'Neighbor/Notice?id=' + item.community_news_id}>{item.title}</a>
                                                    </li>);

                                            })
                                        }
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
                                    <li><strong className="text-secondary">地址：</strong>{item.address}</li>
                                    <li><strong className="text-secondary">電話：</strong>{item.tel}</li>
                                    <li><strong className="text-secondary">E-mail：</strong>{item.email}</li>
                                    <li><strong className="text-secondary">聯絡人：</strong>{item.contact}</li>
                                </ul>
                            </div>
                            <div className="col-xs-7">
                                <span dangerouslySetInnerHTML={ { __html: item.map_iframe }}></span>
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
ReactDOM.render(<WWW.CommunityContent  />, dom); 