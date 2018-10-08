import React, { Component } from 'react';
import { connect } from 'react-redux';
import QrCode from 'qrcode.react';

import Share from '../../components/Share';
import { UpdateSubscribeCount, UpdateSubscribeType, UpdateViewerCount, initStarInfo, subscribe, unSubscribe, initSubscribeType, initViewCount, clearSubscribeTips } from './action';

import { liveInitData, socketSubscribe, SOCKET_CMD, getLoginStatus, showLogin, RoomService } from '../../../utils/pipeline';
import './index.less';

function formatSubscribeCount(value) {
  let newValue = value;

  if (newValue >= 10000) {
    let formatedValue = (newValue / 10000).toFixed(1);

    // 当小数点为0则去掉小数点
    if ((/^\d+\.0$/).test(formatedValue)) {
      formatedValue = formatedValue.substring(0, formatedValue.indexOf('.'));
    }

    newValue = `${formatedValue}万`;
  }

  return newValue || '0';
}

/**
 * 头部组件
 *
 * @class LiveHeader
 * @extends {Component}
 */
class LiveHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareVisible: false,
      mobileViewVisible: false,
      onlineNumVisible: false //在线人数是否可见
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { starId, roomId } = liveInitData;

    // 监听socket更新订阅数量
    socketSubscribe(SOCKET_CMD.FOLLOWADDONEFLASHBOX, content => {
      const { subscribeCount } = this.props;
      const newSubscribeCount = subscribeCount + content.addnum;
      dispatch(UpdateSubscribeCount(newSubscribeCount));
    });

    // 监听socket更新在线人数
    socketSubscribe(SOCKET_CMD.AUDIENCE, content => {
      if (content.actionId === 'roomAuNumber') {
        dispatch(UpdateViewerCount(content.data.count));
      }
    });

    // 聊天区引导关注联动
    RoomService.subscribe(RoomService.eventType.FOLLOW_SUCCESS, () => {
      dispatch(UpdateSubscribeType(true));
    });

    // 开播时显示在线人数
    socketSubscribe(SOCKET_CMD.STARTLIVE, () => {
      this.setState({
        onlineNumVisible: true
      });
    });

    // 下播后隐藏在线人数
    if (liveInitData.kugouLive && liveInitData.kugouLive.streamType !== '') {
      switch (liveInitData.kugouLive.streamType) {
        
        // 伴奏推流
        case '0':
          socketSubscribe(SOCKET_CMD.STOPLIVE, () => {
            this.setState({
              onlineNumVisible: false
            });
          });
          break;

        // 第三方推流
        case '1':
          socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
            if (result.actionId === 1000) {
              this.setState({
                onlineNumVisible: false
              });
            }
          });
          break;

        default:
          break;
      }
    }

    /*
     * 开播状态显示在线在数
     * 增加事件是为了保证代码运行在流接口回来之后
     */
    RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
      if (liveInitData.liveStatus === 1) {
        this.setState({
          onlineNumVisible: true
        });
      }
    });
    

    dispatch(initStarInfo(starId));
    dispatch(initSubscribeType(starId));
    dispatch(initViewCount(roomId));
  }

  componentDidUpdate() {
    const { subscribeTips, dispatch } = this.props;

    if (subscribeTips) {
      setTimeout(() => dispatch(clearSubscribeTips()), 3000);
    }
  }

  toggleShareContainer(visible) {
    const instance = this;
    const timeKey = (visible ? 'shareShowTimer' : 'shareHideTimer');
    clearTimeout(instance.shareShowTimer);
    clearTimeout(instance.shareHideTimer);

    instance[timeKey] = setTimeout(() => {
      instance.setState({
        shareVisible: visible
      });
    }, 200);
  }

  toggleMobileViewCntainer(visible) {
    const instance = this;
    clearTimeout(instance.mobileShowTimer);

    if (visible) {
      instance.mobileShowTimer = setTimeout(() => {
        instance.setState({
          mobileViewVisible: true
        });
      }, 200);
    } else {
      instance.setState({
        mobileViewVisible: false
      });
    }
  }

  actionHandler(action, starId) {
    const { dispatch } = this.props;

    if (!getLoginStatus()) {
      showLogin();
      return;
    }

    dispatch(action(starId));
  }

  render() {
    const { kugouLive, starId } = liveInitData;
    const { subscribeCount, isSubscribe, nickName, userLogo, viewerCount, subscribeTips } = this.props;
    const mobileViewClass = (this.state.mobileViewVisible ? 'visible' : '');
    const titleList = [];

    if (typeof nickName === 'string' && nickName.length > 0) {
      titleList.push(nickName);
    }

    if (typeof kugouLive.title === 'string' && kugouLive.title.length > 0) {
      titleList.push(kugouLive.title);
    }

    return (
      <section className="liveHeader">
        <a href={`/index.php?action=user&id=${starId}`} target="_blank"><img className="headImg" src={userLogo} alt="" /></a>
        <div className="detail">
          <h1 className="title" title={titleList.join(': ')}>{titleList.join('：')}</h1>
          { this.state.onlineNumVisible ? <span className="onlineNum">在线人数：{viewerCount}人</span> : null }
        </div>
        <div className="shareCon" onMouseEnter={() => this.toggleShareContainer(true)} onMouseLeave={() => this.toggleShareContainer(false)}>
          <a href="javascript:void(0);" className="shareBtn">分享</a>
          <Share image={kugouLive.shareImg} title={kugouLive.shareTitle} content={kugouLive.shareContent} roomId={liveInitData.roomId} visible={this.state.shareVisible} />
        </div>
        <div className="subscribe">
          { isSubscribe ?
            <span type="button" className="rightBtn subscribeBtn" title="点击取消关注" onClick={() => this.actionHandler(unSubscribe, starId)}>
              <span className="btnMark">已关注</span>
              <em className="splitLine" />
              <span className="count">{formatSubscribeCount(subscribeCount)}</span>
            </span>
            :
            <span className="rightBtn subscribeBtn unSubscribe" title="点击关注" onClick={() => this.actionHandler(subscribe, starId)}>
              <span className="btnMark"><b className="plus">+</b>关注</span>
              <em className="splitLine" />
              <span className="count">{formatSubscribeCount(subscribeCount)}</span>
            </span>
          }
          {subscribeTips ? <span className="toastContainer"><span className="toast">{subscribeTips}</span></span> : ''
          }
        </div>
        <div className="mobileView" onMouseEnter={() => this.toggleMobileViewCntainer(true)} onMouseLeave={() => this.toggleMobileViewCntainer(false)}>
          <button type="button" className="rightBtn mobileViewBtn">用手机看</button>
          <div className={`QrContainer ${mobileViewClass}`}>
            <QrCode size={88} value={`http://mfanxing.kugou.com/staticPub/mobile/sharePage/normalRoom/views/index.html?roomId=${liveInitData.roomId}`} />
            <span className="markText">
              扫描二维码
              随身看视频
            </span>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { isSubscribe, subscribeCount, nickName, userLogo, viewerCount, subscribeTips } = state.liveHeader;
  return {
    isSubscribe,
    subscribeCount,
    nickName,
    userLogo,
    viewerCount,
    subscribeTips
  };
};

export default connect(mapStateToProps)(LiveHeader);
