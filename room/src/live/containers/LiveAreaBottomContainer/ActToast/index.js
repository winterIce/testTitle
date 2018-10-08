import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { CSSTransitionGroup }  from 'react-transition-group';
import { liveInitData, socketSubscribe, SOCKET_CMD } from '../../../../utils/pipeline';
import { initActToastList, insertActToastItem, showNextToast, hideToast } from './action';
import ActToast from '../../../components/ActToast';
import './index.less';

class ActToastController extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initActToastList(liveInitData.roomId));

    socketSubscribe(SOCKET_CMD.KGLIVE, (content, result) => {
      if (content.actionId === 1 && content.data && typeof content.data.msg === 'string') {
        dispatch(insertActToastItem(content.data));
      }
    });
  }

  componentDidUpdate(){
    const { actToast, dispatch } = this.props;

    if(actToast.content !== null && typeof actToast.content.time === 'number'){

      clearTimeout(this.actToastTimeId);
      clearTimeout(this.actToastShowNextTimeId);

      this.actToastTimeId = setTimeout( () => {
        this.hideActToast();

        // 先隐藏，延迟2秒显示下一条
        this.actToastShowNextTimeId = setTimeout(() => {
          dispatch(showNextToast());
        }, 2000);
      }, actToast.content.time * 1000);
    }
  }

  hideActToast(){
    this.props.dispatch(hideToast());
  }

  render() {
    const { actToast } = this.props;
    const actToastClass = (actToast.content !== null ? '' : 'notPointEvents');

    return (
      <div className={['actToastWrapper', actToastClass].join(' ')} >
        <CSSTransitionGroup transitionName="actIcon" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
          {actToast.content !== null ? <span className="actIcon" /> : null}
        </CSSTransitionGroup>

        <CSSTransitionGroup transitionName="actToastContainer" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
          {actToast.content !== null ?<ActToast onCloseClick={this.hideActToast.bind(this)} content={actToast.content.msg} />: null}
        </CSSTransitionGroup>
      </div>
    )
  }
};


const mapStateToProps = state => {
  const { actToast } = state;
  return {  actToast };
};

export default connect(mapStateToProps)(ActToastController);
