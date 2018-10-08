import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

/**
 * 星光票组件
 *
 * @class StarNum
 * @extends {Component}
 */
class StarNum extends PureComponent {
  static propTypes = {
    data: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { data, title } = this.props;
    return (
      <div className="starNum" title={title}>
        <span className="title">星光票</span>
        <span className="count">{data}</span>
      </div>
    );
  }
}

export default StarNum;
