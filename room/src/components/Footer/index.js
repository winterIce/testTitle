import React, { PureComponent } from 'react';
import './index.less';

export default class Footer extends PureComponent {
  render () {
    return (
      <div>
        <p className="footer__logo"></p>
        <p>酷狗直播 {this.props.domain}</p>
      </div>
    );
  }
}
