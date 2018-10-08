import React, { Component } from 'react';
import { connect } from 'react-redux';
import { liveInitData, socketSubscribe, SOCKET_CMD, RoomService } from '../../../utils/pipeline';

import StarNum from '../../components/StarNum';
import LiveCountDownWrapper from './LiveCountDown';
import { initStarNum, init7DayStarNum, UpdateStarNum, UpdateStarNumVisibleState } from './StarNum/action';

/**
 * 视频区左上角组件
 *
 * @class LiveAreaTopContainer
 * @extends {Component}
 */
class LiveAreaTopContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { roomId, kugouLive, starId } = liveInitData;

    /*
     * 星光票显示状态
     * 增加事件是为了保证代码运行在流接口回来之后
     */
    RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
      if (liveInitData.liveStatus === 1) {
        dispatch(UpdateStarNumVisibleState(true));
      }
    });

    if (kugouLive.roomSwitchs) {
      switch (kugouLive.roomSwitchs.starNum) {
        // 本场星光票
        case 0:
          RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
            if (liveInitData.liveStatus === 1) {
              dispatch(initStarNum(roomId));
            }
          });
          socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
            if (result.actionId === 5) {
              dispatch(UpdateStarNum(content.starValue, '本场星光票'));
            }
          });
          break;

        // 7天内星光票
        case 1:
          RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
            if (liveInitData.liveStatus === 1) {
              dispatch(init7DayStarNum(starId));
            }
          });

          socketSubscribe(SOCKET_CMD.STARLINE, (content, result) => {
            dispatch(UpdateStarNum(content.starLine, '近7天内星光票'));
          });
          break;
        default:
          break;
      }
    }

    // 开播显示星光票
    socketSubscribe(SOCKET_CMD.STARTLIVE, () => {
      dispatch(UpdateStarNumVisibleState(true));
    });

    if (liveInitData.kugouLive && liveInitData.kugouLive.streamType !== '') {
      switch (liveInitData.kugouLive.streamType) {
        
        // 伴奏推流
        case '0':
          socketSubscribe(SOCKET_CMD.STOPLIVE, () => {
            dispatch(UpdateStarNumVisibleState(false));
          });
          break;

        // 第三方推流
        case '1':
          socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
            if (result.actionId === 1000) {
              dispatch(UpdateStarNumVisibleState(false));
            }
          });
          break;

        default:
          break;
      }
    }
  }

  render() {
    const { starNum, starNumVisible, starNumTitle } = this.props;

    return (
      <div>
        {starNumVisible &&
          <StarNum data={starNum} title={starNumTitle} />}
        <LiveCountDownWrapper />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { data, visible, title } = state.starNum;
  return {
    starNum: data,
    starNumVisible: visible,
    starNumTitle: title
  };
};

export default connect(mapStateToProps)(LiveAreaTopContainer);
