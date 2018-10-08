
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImgUserLogo from '../../components/ImgUserLogo';

import {
  fetchWidgetGuestList,
  updateAwardWidget,
  followGuest,
  unfollowGuest,
  switchAwardWidget
} from './action';

/**
 * 颁奖礼识别挂件
 */

import {
  liveInitData,
  getLoginStatusSafe,
  showLogin,
  SOCKET_CMD,
  socketSubscribe,
  Lazyload,
  openGiftTabByName,
  $,
  logClick
} from '../../../utils/pipeline';

import './index.less';

let scanningTimer, scanedTimer;
const isOpen = liveInitData.kugouLive.roomSwitchs.showPkRankAndPendant == 0;

const getFollowed = (fList, kugouId) => fList[kugouId] == 1;

const showBubble = (self, interval) => {
  clearTimeout(scanningTimer);
  clearTimeout(scanedTimer);

  const { dispatch } = self.props;
  let showFn = () => {
    dispatch(switchAwardWidget(2));
    scanedTimer = setTimeout(() => {
      dispatch(switchAwardWidget(0));
    }, interval || 5000);
  };
  // 显示5s识别中..
  dispatch(switchAwardWidget(1));
  scanningTimer = setTimeout(() => {
    showFn();
  }, 1000);
}

class App extends Component {

  componentDidMount() {
    if (!isOpen) return;
    const {
      dispatch,
      stars
    } = this.props;
    const self = this;

    // 获取嘉宾数据
    dispatch(fetchWidgetGuestList());

    socketSubscribe(SOCKET_CMD.ACTIVITY, (content, result) => {
      if (content && content.actionId == 'sd2017_guest_bubble') {
        let arr = content.p.split(',');
        let id = arr[0];
        let interval = Number(arr[1]) * 1000;
        let data = self.props.data || {};
        if (id && self.props.stars[id] && data.id != id) {
          dispatch(updateAwardWidget({
            id,
            interval
          }));
          showBubble(self, interval);
        }
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.stars ? true : false;
  }

  // 点击关注按钮
  onFollowClick(userId, kugouId) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const {
      status,
      dispatch
    } = this.props;
    if (status == 'prepending') return; // 防止多次关注请求

    logClick('9946');
    dispatch(followGuest(userId, kugouId));
  }
  // 点击已关注按钮-取消关注
  onFollowedClick(userId, kugouId) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const {
      status,
      dispatch
    } = this.props;
    if (status == 'prepending') return; // 防止多次关注请求

    dispatch(unfollowGuest(userId, kugouId));
  }

  render() {
    const {
      display,
      stars,
      data,
      followList
    } = this.props;
    // 是否需要懒加载
    const needLaze = false;
    const needResize = false;

    if (data && !stars[data.id] || !data) {
      return <div/>;
    }

    const item = stars[data.id];
    const kugouId = item.kugouId;
    const isFollowed = getFollowed(followList, kugouId);

    const {
      nickName,
      userId,
      roomId
    } = item;
    let userLogo = item.userLogo;
    let renderContent, renderFollow;

    if (roomId) {
      if (isFollowed) {
        renderFollow = <a href="javascript:;" className="follow followed" onClick={this.onFollowedClick.bind(this, userId, kugouId)}>已关注</a>;
      } else {
        renderFollow = <a href="javascript:;" className="follow" onClick={this.onFollowClick.bind(this, userId, kugouId)}>关注</a>;
      }
    }

    if (display == 0) {
      renderContent = <div/>;
    } else if (display == 1) {
      renderContent = (<div className="scanning">识别中...</div>);
      userLogo = 'https://s4fx.kgimg.com/fxusercmdavata/system.gif';
    } else if (display == 2) {
      renderContent = (
        <div className={`scaned ${ roomId ? '' : 'only'}`}>
          <p className="nickname"><a title={nickName} target="_blank" href={ roomId ? `/index.php?action=user&id=${userId}` : 'javascript:;'}>{nickName}</a></p>
          <p className="room">{roomId ? `房间号：${roomId}` : ''}</p>
          {renderFollow}
        </div>
      );
    }

    return (
      <div className={`award-widget${display ? ' show' : ''}`}>
        <div className="avatar">
          <a title={nickName} target="_blank" href={ roomId ? `/index.php?action=user&id=${userId}` : 'javascript:;'}>
            <ImgUserLogo src={userLogo} alt={nickName} width={40} height={40} lazyload={needLaze} resize={needResize} />
          </a>
        </div>
        {renderContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status, display, stars, data, followList } = state.awardWidget;
  return {
    status,
    display,
    stars,
    data,
    followList
  };
};

export default connect(mapStateToProps)(App);
