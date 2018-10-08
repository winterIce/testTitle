import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  newGift,
  clearGift,
  showGift
} from './action';
import {
  liveInitData,
  socketSubscribe,
  SOCKET_CMD,
  ServiceHost
} from '../../../utils/pipeline';
import './index.less';

// 嘉宾榜开关-1：关 0：开
const isShowGuestList = (liveInitData.kugouLive.roomSwitchs.showGuestRank == 0);

// 图片域名
const IMGHOST = ServiceHost.imgHost;

/**
 * 嘉宾榜组件
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    // 嘉宾榜开关未开启则不发起请求
    if (!isShowGuestList) return;

    const { dispatch } = this.props;

    // 订阅送礼socket
    socketSubscribe(SOCKET_CMD.SENDGIFT, (content, result) => {
      const isHead = (String(content.senderkgid) === String(liveInitData.kugouId));
      dispatch(newGift(content, isHead));
    });

    // 每3s展示一条送礼信息
    setInterval(() => {
      dispatch(showGift());
    }, 3 * 1000)

    // 30s清除一次礼物信息
    setInterval(() => {
      dispatch(clearGift());
    }, 30 * 1000);
  }


  render() {
    // 嘉宾榜开关未开启则返回一个空节点
    if (!isShowGuestList) { return (<div />); }

    const { data } = this.props;

    // 是否有数据
    const hasData = data.length > 0;

    if (!hasData) { return (<div />); }

    return (
      <div className="ginfo-cont">
        <ul className="ginfo-ul">
          {data.map((item, index) =>
            <li className="ginfo-li" key={item.showTimeStp}>
              <span className="gitxt">{item.sendername}</span>&nbsp;
              <span>给&nbsp;{item.receivername}&nbsp;送了{item.num}个{item.giftname}</span>&nbsp;
              <img src={IMGHOST + item.image} />&nbsp;
              <span className="gitxt">× {item.num}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.guestGift;
  return { data };
};

export default connect(mapStateToProps)(App);
