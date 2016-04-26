           var  outHtml = (
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
                                                <strong className="text-secondary">電梯：</strong>{is_elevator}
                                            </div>
                                            <div className="grid">
                                                <strong className="text-secondary">樓層/樓高：</strong>{item.site_floor}/{item.total_floor}樓
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
                            <tbody>
                                <tr>
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
                                    <td>{item.site_floor}/{item.total_floor}樓</td>
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
                            </tbody>
                        </table>
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
                        <span dangerouslySetInnerHTML={{ __html: item.context_life }}></span>
                    </section>
                    <section className="grid-info" id="location">
                        <h3 className="h3">地圖</h3>
                        <span dangerouslySetInnerHTML={{ __html: item.map_iframe }}></span>
                    </section>
                </div>

            );