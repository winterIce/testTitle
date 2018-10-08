
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchPkGuestList,
  fetchPkGroupList,
  fetchPkPendant,
  switchCompt,
  showRank,
  hideRank,
  switchFoldBtn,
  switchBloodBar,
  slideBloodBar,
  updateSocketData,
  updatePkGroupList
} from './action';
import { showVoteBox } from '../GuestVote/action';
import PkGuest from '../../components/PkGuest';

import {
  liveInitData,
  getLoginStatusSafe,
  showLogin,
  Lazyload,
  RoomService,
  SOCKET_CMD,
  socketSubscribe,
  openGiftTabByName,
  FX,
  $
} from '../../../utils/pipeline';

import './index.less';

let timer, foldTimer;

/**
 * 选择收礼者
 */
const choseReceiver = userId => {
  $(`#giftReceiverList li[_id=${userId}]`).click();
};

const runTimer = self => {
  const {
    dispatch,
    data
  } = self.props;
  let interval = 10 * 1000; // 默认1分钟

  clearTimeout(timer);

  if (data && data.interval) {
    interval = data.interval;
  }

  timer = setTimeout(function() {
    dispatch(fetchPkGroupList());
    runTimer(self);
  }, interval);
};

const stopTimer = () => {
  clearTimeout(timer);
};

const isOpen = liveInitData.kugouLive.roomSwitchs.showPkRankAndPendant == 0;

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
    dispatch(fetchPkPendant()); // 展示挂件

    socketSubscribe(SOCKET_CMD.ACTIVITY, (content, result) => {
      if (content && content.actionId == 'sd2017ce') {
        let arr = content.p.split(',');
        let aVotes = Number(arr[0]) || 0;
        let bVotes = Number(arr[2]) || 0;
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

    RoomService.subscribe(RoomService.eventType.KLIVE_PK_GROUP_LIST, (data) => {
      dispatch(updatePkGroupList(data));
    });

    let slideTimer;

    // flash初始化成功
    RoomService.subscribe(RoomService.eventType.LIVE_FLASH_READY, () => {
      // 音量条弹出收起的回调事件  action=over为鼠标移入音量条弹起 out为移出音量条收起
      Fx.live.mouseEventCallback('liveFlashBox', action => {
        switch (action) {
          case 'over':
            clearTimeout(slideTimer);
            slideTimer = setTimeout(() => {
              dispatch(slideBloodBar(true));
            }, 250);
            break;
          case 'out':
            clearTimeout(slideTimer);
            slideTimer = setTimeout(() => {
              dispatch(slideBloodBar(false));
            }, 250);
            break;
        }
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.stars ? true : false;
  }

  // 投票事件
  onVoteClick(isVotable, index, userId, kugouId, event) {
    // 未登录则显示登录框
    if (!getLoginStatusSafe()) {
      showLogin();
      return;
    }
    const { dispatch } = this.props;

    // 不可投票状态
    if (isVotable == 0) {
      FX.win.alert('活动未开始');
      return;
    } else if (isVotable == 2) {
      FX.win.alert('投票已截止');
      return;
    }

    dispatch(hideRank(index)); // 隐藏榜单
    choseReceiver(userId); // 选择收礼者
    openGiftTabByName('盛典'); // 打开礼物列表盛典tab
  }

  // 弹出榜单
  onShowRank(index, e) {
    const { dispatch } = this.props;
    dispatch(fetchPkGroupList());
    dispatch(showRank(index));
  }
  onHideRank(index, e) {
    const { dispatch } = this.props;
    dispatch(hideRank(index));
  }
  // 切换折叠按钮
  onSwitchFoldBtn(isShow, e) {
    const { dispatch } = this.props;
    clearTimeout(foldTimer);
    foldTimer = setTimeout(() => {
      dispatch(switchFoldBtn(isShow));
    }, 50);
  }
  onSwitchBloodBar(isShow, e) {
    this.props.dispatch(switchBloodBar(isShow));
  }

  renderGroup(group, i, isVotable) {
    if (group && group.stars) {
      const {
        stars
      } = this.props;

      // 是否需要懒加载
      const needLaze = false;

      return (
        <ul className="group-ul">
          {
            group.stars.length > 0 && group.stars.map((item, index) =>
              (
                <li>
                  <PkGuest
                    stars={stars}
                    item={item}
                    index={index}
                    needLaze={needLaze}
                    totalVotes={group.votes || 0}
                    groupStyle="2"
                    groupType={ i == 0 ? 'a' : 'b'}
                    isVotable={isVotable==1}
                    onVoteClick={this.onVoteClick.bind(this, isVotable, i)}
                  />
                </li>
              )
          )}
        </ul>
      );
    }
  };

  render() {
    const {
      status,
      stars,
      data,
      serverTime,
      isShow,
      pageData,
      socketData
    } = this.props;

    const {
      showLeftRank,
      showRightRank,
      showBloodBar,
      showFoldBtn,
      slideBloodBar
    } = pageData;
    const groupClass = (index) => {
      if (index == 0 && showLeftRank || index == 1 && showRightRank) {
        return 'show';
      } else {
        return '';
      }
    };
    const groupVotes = (index, item) => {
      let votes = 0;
      if (index == 0) {
        votes = socketData.aVotes;
      } else if (index == 1) {
        votes = socketData.bVotes;
      }
      votes = votes || 0;
      if (item.votes > votes) {
        votes = item.votes;
      }
      return votes;
    };

    let self = this;
    let percent = 50;
    let hasData = false;
    let foldClass = '';
    let pkbloodClass = '';
    let isVotable = 0; // 默认不能投票 0投票未开始 1投票开始 2投票结束

    if (data && data.time && data.time.length == 2) {
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

    if (data && data.groups && data.groups.length > 0) {
      hasData = true;
      let aGroupVotes = data.groups[0] && groupVotes(0, data.groups[0]);
      let bGroupVotes = data.groups[1] && groupVotes(1, data.groups[1]);
      let totalVotes = aGroupVotes + bGroupVotes;

      if (totalVotes > 0) {
        percent = aGroupVotes / totalVotes * 100;
      }
    }

    if (showFoldBtn) {
      foldClass += ' show';
    }
    if (showBloodBar) {
      foldClass += ' close';
      pkbloodClass += ' show';
    }
    if (slideBloodBar) {
      pkbloodClass += ' slideUp';
    }

    if (!hasData || !isShow) {
      return <div/>;
    }

    return (
      <div>
        <div className={`pkblood${pkbloodClass}`}>
          <div className="fold-wrapper">
            <div className="fold"
              onMouseEnter={this.onSwitchFoldBtn.bind(this, true)}
              onMouseLeave={this.onSwitchFoldBtn.bind(this, false)}>
              <a href="javascript:;"
                onClick={this.onSwitchBloodBar.bind(this, showBloodBar ? false : true)}
                className={`fold-btn${foldClass}`}>{showBloodBar ? '收起' : '展开'}</a>
            </div>
            <div className="back">
              <div className="progress">
                <div className="rate" style={{width: percent + "%"}}></div>
              </div>
            </div>
          </div>
          {
            data.groups.map((item, index) => (
              <div className={index == 0 ? 'left' : 'right'}
                  onMouseEnter={this.onShowRank.bind(this, index)}
                  onMouseLeave={this.onHideRank.bind(this, index)}>
                <div className="group-text">{index == 0 && '红队 '}<strong>{groupVotes(index, item)}</strong>票{ index != 0 && ' 蓝队'}</div>
                <div className={item.win == 1 ? 'win' : null}></div>
                <div className={`group auto ${groupClass(index)}`}>
                  {self.renderGroup(item, index, isVotable)}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status, stars, data, serverTime, isShow, pageData, socketData } = state.pkBloodBar;
  return {
    status,
    stars,
    data,
    isShow,
    serverTime,
    pageData,
    socketData
  };
};

export default connect(mapStateToProps)(App);
