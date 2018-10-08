import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchGuestList,
  fetchFollowList,
  followGuest,
  clearMsgById,
  updateGuestList,
  updateVoteGuest,
  showFollowed
} from './action';
import { showVoteBox } from '../GuestVote/action';
import Guest from '../../components/Guest';
import {
  liveInitData,
  getLoginStatusSafe,
  socketSubscribe,
  SOCKET_CMD,
  showLogin,
  Lazyload,
  $
} from '../../../utils/pipeline';
import './index.less';


/**
 * 星光票值容错
 * @param {Number} coin
 */
const getCoinVal = coin => {
  if (coin > 0) {
    return coin;
  }
  return 0;
};

/**
 * 获取嘉宾提示信息
 * @param {Object} msg 信息列表
 * @param {Number} kugouId
 */
const getItemMsg = (msg, kugouId) => {
  if (msg[kugouId]) {
    return msg[kugouId];
  }
  return '';
};

/**
 * 判断嘉宾是否已关注
 * @param {Array} fList 关注列表
 * @param {Number} kugouId
 */
const getFollowed = (fList, kugouId) => fList.indexOf(kugouId) > -1;

/**
 * 判断是否是正在投票的嘉宾
 * @param {Number} voteKugouId
 * @param {Number} kugouId
 */
const getVoted = (voteKugouId, kugouId) => voteKugouId == kugouId;

/**
 * 获取星光柱高度
 * @param {Number} maxCoin
 * @param {Number} minCoin
 * @param {Number} coin
 */
const getGpHeight = (maxCoin, minCoin, coin) => {
  // 高度规则：
  // 1-最大值为0则都为0
  // 2-最大值不为0则高度由coin与最小值的差值和最大值与最小值的差值决定
  // 3-星光值为0则高度为0，不为0则最小高度为10
  // 4-最大值和最小值一致，即所有得票一致(且不为0)情况下，都为10
  let res = 0;
  const coinVal = getCoinVal(coin);
  const coinUnder = maxCoin - minCoin;
  const coinUp = coinVal - minCoin;
  if (maxCoin > 0 && coinVal > 0) {
    if (coinUnder === 0) {
      res = 10;
    } else {
      res = parseInt((coinUp * 100) / coinUnder, 10);
      // 最小高度为10
      res = res > 10 ? res : 10;
    }
  }
  return res;
};

// 嘉宾榜开关-1：关 0：开
const isShowGuestList = (liveInitData.kugouLive.roomSwitchs.showGuestRank == 0);

/**
 * 嘉宾榜组件
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    followList: PropTypes.array.isRequired,
    voteKugouId: PropTypes.number.isRequired,
    msg: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    // 嘉宾榜开关未开启则不发起请求
    if (!isShowGuestList) return;

    const { dispatch } = this.props;
    // 异步请求嘉宾榜数据
    dispatch(fetchGuestList(liveInitData.roomId));
    // 登录用户异步请求关注嘉宾列表
    if (getLoginStatusSafe()) {
      dispatch(fetchFollowList(liveInitData.roomId));
    }
    // 订阅socket更新嘉宾榜
    socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
      if (result.actionId === 6 && Array.isArray(content)) {
        dispatch(updateGuestList(content));
      }
    });
    // 绑定document点击事件
    $(document).on('click', this.onDocClk.bind(this));
  }

  /**
   * 点击嘉宾下方投票按钮
   * @param {number} userId
   * @param {number} kugouId
   * @param {Event} event
   */
  onVoteClick(userId, kugouId, event) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const { dispatch } = this.props;
    const $btn = $(event.target);
    const btnOffest = $btn.offset();
    dispatch(showVoteBox({
      isShow: true,
      coordinate: {
        x: btnOffest.left - 2,
        y: btnOffest.top - 272
      },
      userId,
      kugouId
    }));
    dispatch(updateVoteGuest(kugouId));
  }

  /**
   * 点击关注按钮
   * @param {number} userId
   * @param {number} kugouId
   */
  onFollowClick(userId, kugouId) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const { dispatch } = this.props;
    dispatch(followGuest(userId, kugouId));
  }

  /**
   * 点击已关注按钮
   * @param {number} userId
   * @param {number} kugouId
   */
  onFollowedClick(userId, kugouId) {
    const { dispatch } = this.props;
    dispatch(showFollowed(userId, kugouId));
    // 1500ms后消除guestList消息
    setTimeout(() => {
      dispatch(clearMsgById(kugouId));
    }, 1500);
  }

  /**
   * 点击判断是否点在了投票按钮或是投票组件内
   * @param {Event} e 点击事件对象
   */
  onDocClk(e) {
    const { dispatch, voteKugouId } = this.props;
    // 如果当前没有正在投票的嘉宾则不做处理
    if (voteKugouId == 0) {
      return;
    }
    const $ele = $(e.target);
    if ($ele.closest('#guestVoteComp, .gvbtn-vote').length == 0) {
      dispatch(updateVoteGuest(0));
      dispatch(showVoteBox({
        isShow: false,
        userId: 0,
        kugouId: 0
      }));
    }
  }


  render() {
    // 嘉宾榜开关未开启则返回一个空节点
    if (!isShowGuestList) { return (<div />); }

    const {
      status,
      data,
      followList,
      msg,
      voteKugouId
    } = this.props;

    // 是否有嘉宾数据
    const hasData = (status === 'success' || status === 'error') && data.length > 0;

    // 无数据则返回一个空节点
    if (!hasData) { return (<div />); }

    // 是否可投票（暂时写死）
    const isVotable = true;
    // 是否需要懒加载
    const needLaze = !!Lazyload;
    // 嘉宾榜title
    const rankTitle = liveInitData.kugouLive.rankTitle;
    // 最大星光票
    const maxCoin = getCoinVal(data[0].coin);
    // 最小星光票
    const minCoin = getCoinVal(data[data.length - 1].coin);

    return (
      <div className="guest-cont">
        <div className="guest-head">
          {rankTitle &&
            <div className="guest-title">{rankTitle}</div>
          }
        </div>
        <ul className="guest-ul">
          {data.map((item, index) =>
            (<li className="guest-li" key={item.userId}>
              <Guest
                item={item}
                index={index}
                isVotable={isVotable}
                isFollowed={getFollowed(followList, item.kugouId)}
                isVoteGuest={getVoted(voteKugouId, item.kugouId)}
                needLaze={needLaze}
                gpHeight={getGpHeight(maxCoin, minCoin, item.coin)}
                itemMsg={getItemMsg(msg, item.kugouId)}
                onFollowClick={this.onFollowClick.bind(this)}
                onFollowedClick={this.onFollowedClick.bind(this)}
                onVoteClick={this.onVoteClick.bind(this)}
              />
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status, data, msg, followList, voteKugouId } = state.guestList;
  return {
    status,
    data,
    msg,
    followList,
    voteKugouId
  };
};

export default connect(mapStateToProps)(App);
