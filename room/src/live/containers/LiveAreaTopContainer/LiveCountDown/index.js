import React, { Component } from 'react';
import LiveCountDown from '../../../components/LiveCountDown';
import { liveInitData, socketSubscribe, SOCKET_CMD, RoomService } from '../../../../utils/pipeline';

class LiveCountDownWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      mode: 'fullLive',
      startTime: 0,
      serverTime: null 
    };
  }
  componentDidMount(){

    // 流接口回来时，更新服务器时间 
    RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
      const startTime = (new Date(parseInt(liveInitData.kugouLive && liveInitData.kugouLive.startTime, 10) * 1000) - liveInitData.nowTime) / 1000;
      this.setState({

        // 计算预期开播时间与服务器当前时间预期的秒数
        startTime: startTime,
        visible: (startTime > 0 && liveInitData.liveStatus !== 1)
      });
    });

    // 组件切换为离线MV风格
    RoomService.subscribe(RoomService.eventType.AFTER_MV_LIST_CHANGE, (mvData) => {
      this.setState({
        mode: 'offlineLive'
      });
    });

    // 开播隐藏组件
    socketSubscribe(SOCKET_CMD.STARTLIVE, () => {
      this.setState({
        visible: false
      });
    });
    
  }
  render(){
    return (this.state.visible ? <LiveCountDown startTime={this.state.startTime} mode={this.state.mode} /> : null)
  }
}

export default LiveCountDownWrapper;
