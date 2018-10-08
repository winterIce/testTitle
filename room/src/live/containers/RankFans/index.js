import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from './action';
import RankFansInfo from '../../components/RankFansInfo';
import { liveInitData, socketSubscribe, SOCKET_CMD } from '../../../utils/pipeline';
import './index.less';


/**
 * 粉丝贡献榜组件
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.object
  }

  constructor(props){
    super(props);

    this.state = {
      // 鼠标是否选中
      isHover: false
    };
  }

  componentDidMount() {
    const { fetchList, updateList } = this.props.actions;
    // 异步请求粉丝贡献榜数据
    fetchList(liveInitData.roomId);

    // WebSocket 更新粉丝贡献榜
    socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
      if (result.actionId === 5 && Array.isArray(content.currentList)) {
        updateList(content.currentList);

        // 如果排行榜后7名是可见的且列表大于4条，那就更新整个列表
        if(this.state.isHover && content.currentList.length > 3) {
          fetchList(liveInitData.roomId);
        }
      }
    });
  }

  // 榜单移入处理方法
  toggleHover(isHover) {
    const { status, data } = this.props;
    const { fetchList, updateList } = this.props.actions;

    this.setState({
      isHover: isHover
    });

    // 鼠标移入时，如果不是在等待，则更新列表
    if(isHover && status !== 'prepending' && status !== 'pending'){
      fetchList(liveInitData.roomId);
    }
  }

  render() {
    const { status, data } = this.props;
    const isLimit = false;
    const isPending = (status === 'prepending' || status === 'pending') && data.length === 0; // 仅当数据为空，且状态为pendding时才会显示等待
    const isEmpty = (status === 'success' || status === 'error') && data.length === 0;
    const more = data.length > 3 ? ' more' : '';

    return (
      <div className={`panel-rank ${more}`} onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}>
        <h4 className="title">粉丝贡献榜</h4>
        {isLimit &&
          <div className="limit">本场直播暂不支持送礼</div>
        }
        {isPending &&
          <div className="cssloading" />
        }
        {isEmpty
          ? <div className="empty">还没有人送礼，快来抢占榜首吧~</div>
          : <ul className="panel-list auto">
            {data.map((item, index) => <RankFansInfo index={index} item={item} />)}
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status, data } = state.fans;
  return {
    status,
    data
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
