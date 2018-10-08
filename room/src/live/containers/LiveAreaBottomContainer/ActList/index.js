import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { CSSTransitionGroup }  from 'react-transition-group';
import { liveInitData, socketSubscribe, SOCKET_CMD, getLoginStatusSafe, showLogin, RoomService } from '../../../../utils/pipeline';
import ActList from '../../../components/ActList';
import { initActList, likeSong, resetFailState, updateActList } from './action';
import './index.less';

const toggleIsOpen = (liveInitData && liveInitData.kugouLive && liveInitData.kugouLive.roomSwitchs.songSheet === 0);

class ActListController extends Component {

  constructor(props){
    super(props);
    this.state = {
      isRender: (toggleIsOpen && liveInitData.liveStatus === 1),
      actListVisible: false,
      lastUpdateTime: null
    };
  }

  componentDidMount() {

    //  歌单开关不开则不处理
    if (!toggleIsOpen){
      return;
    }

    const { dispatch } = this.props;
    const { actListVisible, isRender } = this.state;

    // 播放器加载完毕，这时候流信息也回来了，再检查一下开播状态
    RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
      this.setState({
        isRender: (toggleIsOpen && liveInitData.liveStatus === 1)
      });
    });

    //开播显示歌单
    socketSubscribe(SOCKET_CMD.STARTLIVE, () => {
      this.setState({
        isRender: true
      });
    });

    // 下播隐藏歌单
    if (liveInitData.kugouLive && liveInitData.kugouLive.streamType !== '') {

      switch (liveInitData.kugouLive.streamType) {
        
        // 伴奏推流
        case '0':
          socketSubscribe(SOCKET_CMD.STOPLIVE, () => {
            this.setState({
              isRender: false
            });
          });
          break;

        // 第三方推流
        case '1':
          socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
            if (result.actionId === 1000) {
              this.setState({
                isRender: false
              });
            }
          });
          break;

        default:
          break;
      }
    }

    // 歌单处于可见状态下，5秒内随机更新歌单列表
    socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
      if(result.actionId === 7 && isRender && actListVisible){
        setTimeout( () => {
          dispatch(initActList(content));
        }, Math.round(Math.random() * 5));
      }
    });
  }

  componentDidUpdate() {
    const { actList, dispatch } = this.props;
    const { state, list } = actList;
    const hasFail = (state === 'loaded' && list.length > 0 && list.filter( item => (item.likeStatus === 'fail')).length > 0);

    // 有失败时重置掉
    if(hasFail) {
      setTimeout( () => {
        dispatch(resetFailState());
      }, 2000);
    }
  }

  toggleActList(isVisible){
    this.setState({
      actListVisible: isVisible
    });

    // 每6秒响应一次更新点击
    if(isVisible && (this.state.lastUpdateTime === null || Date.now() - this.state.lastUpdateTime > 2000)) {
      const userKugouId = (getLoginStatusSafe() ? liveInitData.kugouId : 0);
      this.props.dispatch(initActList(liveInitData.roomId, userKugouId));
      this.state.lastUpdateTime = Date.now();
    }
  }

  handleItemClick(itemId){

    if(getLoginStatusSafe() === false) {
      showLogin();
      return;
    }

    this.props.dispatch(likeSong(liveInitData.roomId, liveInitData.kugouId, itemId));
  }
  render(){
    const { actList } = this.props;
    const { state, list } = actList;
    const { actListVisible, isRender } = this.state;
    const hasFail = (state === 'loaded' && list.length > 0 && list.filter( item => (item.likeStatus === 'fail')).length > 0);

    return (isRender ?
      <section className="actToggle">
        <div className="actToggleIconClose" onClick={this.toggleActList.bind(this, true)}>
          <span className="actToggleTitle">节目歌单</span>
        </div>
        <CSSTransitionGroup transitionName="actListContainer" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
          {actListVisible ? <ActList dataSource={actList} title="节目歌单" onCloseClick={this.toggleActList.bind(this, false)} onItemClick={this.handleItemClick.bind(this)} /> : null}
        </CSSTransitionGroup>
        <CSSTransitionGroup transitionName="actLikeToast" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
          {hasFail ? <span className="actLikeToast">点赞失败，请重试！</span> : null}
        </CSSTransitionGroup>
      </section>:
      null
    )
  }
};

const mapStateToProps = state => {
  const { actList } = state;
  return {  actList };
};

export default connect(mapStateToProps)(ActListController);
