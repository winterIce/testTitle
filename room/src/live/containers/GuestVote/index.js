import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updataGiftData,
  sendGiftSuc,
  sendGiftErr,
  changeDiyState
} from './action';
import {
  sendGiftGuestSuc,
  sendGiftGuestErr,
  clearMsgById
} from '../GuestList/action';
import {
  liveInitData,
  RoomService,
  sendGift
} from '../../../utils/pipeline';
import './index.less';

// 嘉宾榜开关-1：关 0：开
const isShowGuestList = (liveInitData.kugouLive.roomSwitchs.showGuestRank == 0) ||
  liveInitData.kugouLive.roomSwitchs.showPkRankAndPendant == 0;
/**
 * 嘉宾榜投票组件
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    giftData: PropTypes.object.isRequired,
    isShow: PropTypes.bool.isRequired,
    diySendAble: PropTypes.bool.isRequired,
    coordinate: PropTypes.object.isRequired,
    kugouId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    dispatch: PropTypes.func,
    sendGiftSuccess: PropTypes.func,
    sendGiftError: PropTypes.func
  }

  componentDidMount() {
    // 显示嘉宾榜开关关闭则无动作
    if (!isShowGuestList) return;

    const { dispatch } = this.props;
    const self = this;

    // 订阅选择礼物动作发布的消息
    RoomService.subscribe(RoomService.eventType.GIFT_CHOSEN, data => {

      if (data && self.props.isChooseGift !== false) {
        var defaultGift = {
          albumId: data.albumId, // 礼物专辑id
          toUserId: 0, // 礼物接收对象userId[写定]
          giftId: data.id, // 礼物id
          giftImg: data.image, // 礼物图片
          giftName: data.name, // 礼物名称
          giftNum: 0, // 礼物数量[写定]
          giftType: '', // 礼物类型[写定]
          price: data.price, // 礼物价格
          specialType: data.specialType, // 特殊礼物类型
          type: false, // 是否自定义[写定]
          triggerType: 0 // 是否连击[写定]
        };

        dispatch(updataGiftData(defaultGift));
      }
    });
  }

  /**
   * 送礼投票
   * @param {Number} num 礼物数量
   */
  onSendGift(num) {
    const { giftData, userId, kugouId, dispatch, sendGiftSuccess, sendGiftError } = this.props;
    // 更新送礼对象和礼物数量
    giftData.toUserId = userId;
    giftData.giftNum = num;

    // 送礼函数
    sendGift(giftData, o => {
      sendGiftSuccess(o, kugouId, giftData);
      // 送礼成功vote组件
      dispatch(sendGiftSuc(o));
      // 送礼成功guestList组件
      dispatch(sendGiftGuestSuc(o, kugouId, giftData));
      // 1500ms后消除guestList消息
      setTimeout(() => {
        dispatch(clearMsgById(kugouId));
      }, 1500);
    }, (o) => {
      sendGiftError(kugouId, o);
      // 送礼失败vote组件
      dispatch(sendGiftErr(o));
      // 送礼失败guestList组件
      dispatch(sendGiftGuestErr(kugouId, o));
      // 1500ms后消除guestList消息
      setTimeout(() => {
        dispatch(clearMsgById(kugouId));
      }, 1500);
    });
  }

  /**
   * 自定义礼物数量改变自定义按钮可点击状态
   */
  onGiftNumChange() {
    const { dispatch, diySendAble } = this.props;
    const inputVal = this.refs.vgnInput.value;
    const isValid = !!(inputVal.match(/^[1-9][0-9]*$/));
    if (isValid != diySendAble) {
      dispatch(changeDiyState(isValid));
    }
  }

  /**
   * 点击自定义送礼按钮
   */
  onClickDiyBtn() {
    const inputVal = parseInt(this.refs.vgnInput.value, 10);
    this.onSendGift(inputVal);
  }

  render() {
    // 开关没开则返回一个空节点
    if (!isShowGuestList) { return (<div />); }

    const {
      giftData,
      isShow,
      coordinate,
      diySendAble
    } = this.props;

    // 是否已经选择礼物
    const giftClicked = (giftData.giftId != 0);
    // style display 属性
    const showCss = isShow ? 'block' : 'none';

    return (
      <div className="vote-comp" style={{ left: `${coordinate.x}px`, top: `${coordinate.y}px`, display: showCss }}>
        <div className="varc" />
        <div className="vimgbox">
          {giftClicked &&
            <img className="vimg" src={giftData.giftImg} alt={giftData.giftName} />
          }
        </div>
        <div className="vmain">
          <div className="vinfo">
            {giftClicked
              ? <div>
                <div className="vinfol" title={giftData.giftName}>赠送 {giftData.giftName}</div>
                <div className="vinfol">价值：{giftData.price}星币/个</div>
              </div>
              : <div>
                <div className="vinfol">请于视频下方</div>
                <div className="vinfol">选择投票礼物</div>
              </div>
            }
          </div>
          <div className="vgiftul">
            <div className="vgiftli">
              <span className="vgnum">1个</span>
              {giftClicked
                ? <a href="javascript:;" className="vgbtn" onClick={() => { this.onSendGift(1); }}>投票</a>
                : <a href="javascript:;" className="vgbtn vgbtn-disable">投票</a>
              }
            </div>
            <div className="vgiftli">
              <span className="vgnum">10个</span>
              {giftClicked
                ? <a href="javascript:;" className="vgbtn" onClick={() => { this.onSendGift(10); }}>投票</a>
                : <a href="javascript:;" className="vgbtn vgbtn-disable">投票</a>
              }
            </div>
            <div className="vgiftli">
              <span className="vgnum">100个</span>
              {giftClicked
                ? <a href="javascript:;" className="vgbtn" onClick={() => { this.onSendGift(100); }}>投票</a>
                : <a href="javascript:;" className="vgbtn vgbtn-disable">投票</a>
              }
            </div>
            <div className="vgiftli vgiftli-diy">
              <div className="vgninput-box">
                <input className="vgninput" type="text" maxLength="8" autoComplete="off" ref="vgnInput" id="vgnInput" placeholder="自定义数量" onChange={this.onGiftNumChange.bind(this)} />
              </div>
              {(giftClicked && diySendAble)
                ? <a href="javascript:;" className="vgbtn" onClick={this.onClickDiyBtn.bind(this)}>投票</a>
                : <a href="javascript:;" className="vgbtn vgbtn-disable">投票</a>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { giftData, isShow, isChooseGift, coordinate, kugouId, userId, diySendAble, sendGiftSuccess, sendGiftError } = state.guestVote;
  return {
    giftData,
    isShow,
    isChooseGift,
    diySendAble,
    coordinate,
    kugouId,
    userId,
    sendGiftSuccess,
    sendGiftError
  };
};

export default connect(mapStateToProps)(App);
