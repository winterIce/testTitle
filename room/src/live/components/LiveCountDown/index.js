import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

// 倒计时类型
const countDownMode = {

  // 离线MV状态
  OFFLINE_LIVE: 'offlineLive',

  // 全屏非开播状态
  FULL_LIVE: 'fullLive'
};

// 倒计时内容
const tipsContent = {
  
  // 正在倒计时
  COUNTING: '关注节目开播后将提醒您观看',

  // 倒计时结束 
  COUNT_END: '节目组玩命准备中，请稍后刷新页面观看'
};

/**
 * 直播倒计时组件
 *
 * @class LiveCountDown
 * @extends {Component}
 */
class LiveCountDown extends PureComponent {
  static propTypes = {
    startTime: PropTypes.number.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      startTime: props.startTime
    };
  }

  componentDidMount(){
    const localStartTime = new Date();

    let timeId = setInterval(() => {
      let startTime = this.state.startTime;
      let currentTime = new Date();

      if(startTime > 0) {
        this.setState({
          startTime: this.props.startTime - parseInt((currentTime - localStartTime) / 1000, 10) 
        });
      }else{
        clearInterval(timeId);
      }
    }, 1000);
  }

  formatValue(value){
    let processedValue = Math.floor(value);
    return (processedValue > 9 ? processedValue : ['0', processedValue].join(''));
  }

  render() {
    const { data, mode } = this.props;
    const startTime = this.state.startTime;
    const modeClassName = (mode === countDownMode.OFFLINE_LIVE ? countDownMode.OFFLINE_LIVE: countDownMode.FULL_LIVE);

    const hour = this.formatValue(startTime / 60 / 60);
    const minute = this.formatValue(startTime / 60 % 60);
    const second = this.formatValue(startTime % 60);
    const tips = (startTime > 0 ? tipsContent.COUNTING : tipsContent.COUNT_END);

    return (
      <div className={`liveCountDown ${modeClassName}`}>
        <div className="innerCountDown">
          <span className="title">MV播放中......</span>
          <span className="desc">距离节目开始还有</span>
          <div className="times">
            <span className="timeItem timeHour">
              <strong className="timeValue">{hour}</strong>时
            </span>
            <span className="timeItem timeMinute">
              <strong className="timeValue">{minute}</strong>分
              </span>
            <span className="timeItem timeSecond">
              <strong className="timeValue">{second}</strong>秒
            </span>
          </div>
          <div className="tips">{tips}</div>
        </div>
        <div className="countDownMask"></div>
      </div>
    );
  }
}

export default LiveCountDown;
