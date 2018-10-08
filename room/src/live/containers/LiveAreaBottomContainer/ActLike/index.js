import React, { Component } from 'react';
import { connect } from 'react-redux';
import { liveInitData, socketSubscribe, SOCKET_CMD, getLoginStatusSafe, showLogin, RoomService } from '../../../../utils/pipeline';
import { initLike, showLike, hideLike, setLike, destoryLike } from './action';
import ActLike from '../../../components/ActLike';
import './index.less';

class ActLikeController extends Component {

  componentDidMount(){
    const { dispatch } = this.props;

    // 如果是开播状态，查询是否需要显示点赞按钮
    RoomService.subscribe(RoomService.eventType.LIVE_VIDEO_READY, () => {
      if(liveInitData.liveStatus === 1){
        dispatch(initLike(liveInitData.roomId, liveInitData.kugouId));
      }
    });

    socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
      if (result.actionId === 2) {
        dispatch(showLike(content));
      }
    });
  }

  componentDidUpdate(){
    const { actLike, dispatch } = this.props;
    const { visible, songData } = actLike;

    // 指定的时间内隐藏组件
    if(visible && typeof songData === 'object' && songData.ttl > 0) {
      setTimeout(() => {
        dispatch(hideLike());
      }, songData.ttl * 1000);

      // 120秒后销毁数据，这里保存的数据，送礼需要用到
      setTimeout( () => {
        dispatch(destoryLike());
      }, 120 * 1000);
    }
  }

  likeClickHandler(){

    if(getLoginStatusSafe() === false) {
      showLogin();
      return ;
    }

    const { actLike, dispatch } = this.props;
    const { visible, songData } = actLike;
    dispatch(setLike(liveInitData.roomId, liveInitData.kugouId, songData.song.songId));
    dispatch(hideLike());
  }

  render() {
    const { actLike } = this.props;
    const { visible, songData } = actLike;

    return (visible ? <ActLike content="唱得这么好\n点个赞吧~" onClick={this.likeClickHandler.bind(this)} /> : null)
  }
};


const mapStateToProps = state => {
  const { actLike } = state;
  return {  actLike };
};

export default connect(mapStateToProps)(ActLikeController);
