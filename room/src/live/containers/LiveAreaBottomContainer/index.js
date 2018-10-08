import React, { Component } from 'react';
import ComposedActToast from './ActToast';
import ComposedActList from './ActList';
import ComposedActLike from './ActLike';


/**
 * 视频区右下角组件
 *
 * @class LiveAreaBottomContainer
 * @extends {Component}
 */
class LiveAreaBottomContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="liveAreaBottomContainer">
        <ComposedActToast />
        <ComposedActList />
        <ComposedActLike />
      </div>
    );
  }
}

export default LiveAreaBottomContainer;
