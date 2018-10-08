
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchPkGuestList,
  fetchPkGroupList,
  fetchFollowList,
  followGuest,
  unfollowGuest,
  updateSocketData,
  updatePkGroupList,
  updateGuestMsg,
  clearMsgById
} from './action';
import { showVoteBox, updataGiftData } from '../GuestVote/action';
import PkGuest from '../../components/PkGuest';

import {
  liveInitData,
  getLoginStatusSafe,
  showLogin,
  Lazyload,
  RoomService,
  SOCKET_CMD,
  socketSubscribe,
  $
} from '../../../utils/pipeline';

import './index.less';

let timer;

const isOpen = liveInitData.kugouLive.roomSwitchs.showPkRankAndPendant == 0;

/**
 * 判断嘉宾是否已关注
 * @param {Array} fList 关注列表
 * @param {Number} kugouId
 */
const getFollowed = (fList, kugouId) => fList[kugouId] == 1;

const getItemMsg = (msg, kugouId) => {
  if (msg[kugouId]) {
    return msg[kugouId];
  }
  return '';
};

const runTimer = self => {
  const {
    dispatch,
    data
  } = self.props;
  let interval = 10 * 1000; // 默认10秒

  clearTimeout(timer);

  if (data && data.interval) {
    interval = data.interval;
  }

  timer = setTimeout(function() {
    dispatch(fetchPkGroupList());
    runTimer(self);
  }, interval);
};

const groupVotes = (self, index, item) => {
  const { socketData } = self.props;
  let votes = 0;
  if (index == 0) {
    votes = socketData.aVotes;
  } else if (index == 1) {
    votes = socketData.bVotes;
  }
  votes = votes || item.votes || 0;
  return votes;
};

/**
 * pk嘉宾榜组件
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {

  componentDidMount() {
    if (!isOpen) return;
    const { dispatch } = this.props;

    // 获取嘉宾数据
    dispatch(fetchPkGuestList());

    // 登录用户异步请求关注嘉宾列表
    if (getLoginStatusSafe()) {
      dispatch(fetchFollowList(liveInitData.roomId));
    }

    RoomService.subscribe(RoomService.eventType.KLIVE_PK_GROUP_LIST, (data) => {
      dispatch(updatePkGroupList(data));
    });

    socketSubscribe(SOCKET_CMD.ACTIVITY, (content, result) => {
      if (content && content.actionId == 'sd2017ce') {
        let arr = content.p.split(',');
        let aVotes = arr[0] || 0;
        let bVotes = arr[2] || 0;
        let aMvpKugouId = arr[1] || 0;
        let bMvpKugouId = arr[3] || 0;
        dispatch(updateSocketData({
          aVotes,
          bVotes,
          aMvpKugouId,
          bMvpKugouId
        }));
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

  sendGiftSuccess(res, kugouId, giftData) {
    const { dispatch } = this.props;
    dispatch(updateGuestMsg(kugouId, '投票成功'));
    setTimeout(() => {
      dispatch(clearMsgById(kugouId));
    }, 1500);
  }
  sendGiftError(kugouId, error) {
    if (error) {
      switch (error.errorno) {
        case 100032049: // 星币不足
        case 100035022:
          Fx.popwin('你当前星币不足。');
          return;
      }
    }
    const { dispatch } = this.props;
    dispatch(updateGuestMsg(kugouId, '投票失败'));
    setTimeout(() => {
      dispatch(clearMsgById(kugouId));
    }, 1500);
  }

  // 投票事件
  onVoteClick(isVotable, userId, kugouId, event) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const {
      dispatch,
      data
    } = this.props;
    const $btn = $(event.target);
    const btnOffest = $btn.offset();
    const gift = data.gift;

    // 不可投票状态
    if (isVotable == 0) {
      dispatch(updateGuestMsg(kugouId, '活动未开始'));
    } else if (isVotable == 2) {
      dispatch(updateGuestMsg(kugouId, '投票已截止'));
    }
    if (isVotable != 1) {
      setTimeout(() => {
        dispatch(clearMsgById(kugouId));
      }, 1500);
      return;
    }

    dispatch(updataGiftData({
      giftId: gift.id, // 礼物id
      giftImg: gift.img, // 礼物图片
      giftName: gift.name, // 礼物名称
      price: gift.price // 礼物价格
    }));
    dispatch(showVoteBox({
      isShow: true,
      isChooseGift: false, // 不触发选择礼物
      sendGiftSuccess: this.sendGiftSuccess.bind(this),
      sendGiftError: this.sendGiftError.bind(this),
      coordinate: {
        x: btnOffest.left - 4,
        y: btnOffest.top - 272
      },
      userId,
      kugouId
    }));
  }

  /**
   * 点击判断是否点在了投票按钮或是投票组件内
   * @param {Event} e 点击事件对象
   */
  onDocClk(e) {
    const { dispatch } = this.props;
    const $ele = $(e.target);
    if ($ele.closest('#guestVoteComp, .vote-btn').length == 0) {
      dispatch(showVoteBox({
        isShow: false,
        userId: 0,
        kugouId: 0
      }));
    }
  }

  renderGroup(group, i, isVotable) {
    if (group && group.stars) {
      const {
        stars,
        msg,
        followList
      } = this.props;

      // 是否需要懒加载
      const needLaze = false;

      return (
        <div>
          <div className="group-title">
            <span className="group-title-name">{ i == 0 ? '红' : '蓝' }队</span>
            <span className="group-total-tick">
              <div className={group.win == 1 ? 'win' : null}></div>
              <strong>{groupVotes(this, i, group)}</strong>票
            </span>
          </div>
          <ul className="group-ul">
            {
              group.stars.length > 0 && group.stars.map((item, index) =>
                (
                  <li>
                    <PkGuest
                      stars={stars}
                      item={item}
                      itemMsg={getItemMsg(msg, item.kugouId)}
                      index={index}
                      needLaze={needLaze}
                      totalVotes={group.votes || 0}
                      groupStyle="1"
                      groupType={ i == 0 ? 'a' : 'b'}
                      isVotable={isVotable==1}
                      isFollowed={getFollowed(followList, item.kugouId)}
                      onFollowClick={this.onFollowClick.bind(this)}
                      onFollowedClick={this.onFollowedClick.bind(this)}
                      onVoteClick={this.onVoteClick.bind(this, isVotable)}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      );
    }
  };

  render() {
    const {
      status,
      stars,
      data,
      socketData,
      serverTime
    } = this.props;

    let self = this;
    let hasData = false;
    let voteStr;
    let isVotable = 0; // 默认不能投票 0投票未开始 1投票开始 2投票结束

    if (!stars) {
      return <div/>;
    }

    if (data) {
      if (data.time && data.time.length == 2) {
        let voteEndDate = new Date(data.time[1] * 1000);
        voteStr = `${voteEndDate.getFullYear()}年${voteEndDate.getMonth() + 1}月${voteEndDate.getDate()}日${voteEndDate.getHours()}点${voteEndDate.getMinutes()}分${voteEndDate.getSeconds()}秒`;

        // 是否可投票
        if (serverTime) {
          if (serverTime < data.time[0]) {
            isVotable = 0;
          } else if (serverTime > data.time[1]) {
            isVotable = 2;
          } else {
            isVotable = 1;
          }
        }
      }
      // 是否有数据
      if (data.groups && data.groups.length > 0) {
        hasData = true;
      }
    }

    return (
      <div className="pkrank-group" onClick={this.onDocClk.bind(this)}>
        <div className="pkrank-group-text">
          <div className="pkrank-group-title"></div>
          <p>1. 年度盛典获胜主播分为红蓝两队进行PK，粉丝可通过送出指定礼物进行投票（100星币=1票）；</p>
          <p>2. 投票时间截止至{voteStr || ''}；</p>
          <p>3. 投票期间，每投出10票可获得一个幸运码，拥有参与100万现金大奖的抽奖资格；</p>
          <p>4. 累计票数最高的队伍获胜，获胜成员可获“2017盛典颁奖礼冠军成员永久勋章”；</p>
          <p>5. 获胜队伍中票数最高的主播获得MVP称号，获得500万星币奖励及“2017盛典颁奖礼MVP主播永久勋章”。</p>
        </div>
        <div className="pkrank">
          {
            hasData && data.groups.map((item, index) => (
              <div className={`group group-${index}`}>
                {self.renderGroup(item, index, isVotable)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status, stars, data, socketData, followList, serverTime, msg } = state.pkGuestRankGroup;
  return {
    status,
    stars,
    data,
    socketData,
    followList,
    serverTime,
    msg
  };
};

export default connect(mapStateToProps)(App);
