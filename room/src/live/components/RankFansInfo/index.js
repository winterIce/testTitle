import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImgUserLogo from '../ImgUserLogo';
import './index.less';


/**
 * 粉丝贡献榜单条数据组件
 *
 * @class RankFansInfo
 * @extends {PureComponent}
 */
export default class RankFansInfo extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
  }

  render() {
    const item = this.props.item;
    const index = this.props.index + 1;
    const { userLogo, nickName, coin, userId } = item;
    return (
      <li className="rank-fans-info">
        <span className={`num no${index}`}>{index}</span>
        <a className="img" target="_blank" href={`/index.php?action=user&id=${userId}`}>
          <ImgUserLogo src={userLogo} alt={nickName} width={45} height={45} lazyload />
        </a>
        <a className={`nickname no${index}`} title={nickName} target="_blank" href={`/index.php?action=user&id=${userId}`}>
          {nickName}
        </a>
        <span className={`coin no${index}`}>{coin.toLocaleString()}星币</span>
      </li>
    );
  }
}
