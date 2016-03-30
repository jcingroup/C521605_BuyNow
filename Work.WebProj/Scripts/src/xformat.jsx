                var outHtml = (
                    <div>
                        <ul className="breadcrumb">
                            <li>
                                <i className="fa-list-alt"></i>{this.props.menuName}
                            </li>
                        </ul>
                        <h4 className="title"> {this.props.caption} 基本資料維護</h4>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="col-xs-10">
                                <div className="form-group">
                                    <label className="col-xs-1 control-label">物件名稱</label>
                                    <div className="col-xs-5">
                                        <input type="text" className="form-control"
                                               onChange={this.changeFDValue.bind(this, 'matter_name') }
                                               value={field.matter_name}
                                               maxLength={64}
                                               required />
                                    </div>
                                    <label className="col-xs-1 control-label">來源社區</label>
                                    <div className="col-xs-3">
                                        <select className="form-control"
                                                required
                                                value={field.community_id}
                                                onChange={this.changeFDValue.bind(this, 'community_id') }>
                                            <option value=""></option>
                                            {
                                            this.state.options_community.map(function (item, i) {
                                                return (
                                                    <option value={item.community_id} key={item.community_id}>{item.community_name}</option>);
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-xs-1 control-label">地址</label>
                                    <div className="col-xs-5">
                                        <select className="form-control"
                                                required
                                                value={field.city}
                                                onChange={this.changeFDValue.bind(this, 'city') }>
                                                <option value=""></option>
                                            {
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-action">
                                    <div className="col-xs-4 col-xs-offset-2">
                                        <button type="submit" className="btn-primary"><i className="fa-check"></i> 儲存</button>{}
                                        <button type="button" onClick={this.noneType}><i className="fa-times"></i> 回前頁</button>
                                    </div>
                                </div>
                            </div>



                        </form>
                    </div>
                );