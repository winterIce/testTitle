
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImgUserLogo from '../ImgUserLogo';
import './index.less';

/**
 * pk榜单个嘉宾组件
 */
export default class PkGuest extends PureComponent {
  static propTypes = {
    stars: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    needLaze: PropTypes.bool.isRequired,
    totalVotes: PropTypes.number.isRequired,
    groupStyle: PropTypes.string.isRequired,
    groupType: PropTypes.string.isRequired,
    isVotable: PropTypes.bool.isRequired,
    onVoteClick: PropTypes.func.isRequired
  }

  render() {
    const {
      stars,
      item,
      index,
      needLaze,
      itemMsg,
      totalVotes,
      groupStyle,
      groupType,
      isVotable,
      isFollowed,
      onFollowClick = () => {},
      onFollowedClick = () => {},
      onVoteClick // 点击投票按钮事件
    } = this.props;

    const {
      kugouId,
      votes,
      live,
      mvp
    } = item;

    const hasMsg = !!itemMsg;
    const needResize = false;

    let star = stars[kugouId] || {};
    let percent = 0;
    let placeStr = index < 3 ? `place-${index}` : '';

    if (totalVotes > 0 && votes >= 0) {
      percent = votes / totalVotes * 100;
    }

    return (
      <div className={`pkguest-item item-s${groupStyle} item-${groupType}`}>
        <div className="center">
          <div className={placeStr}>
            <div className="avatar">
              <a title={star.nickName} target="_blank" href={`/index.php?action=user&id=${star.userId}`}>
                <ImgUserLogo src={star.userLogo} alt={star.nickName} width={76} height={76} lazyload={needLaze} resize={needResize} />
              </a>
              { mvp != 1 && (<div className="rank">{index + 1}</div>) }
            </div>
            { mvp == 1 && (<div className="mvp"></div>) }
          </div>
          {
            isFollowed
              ? <a href="javascript:;" className="btn follow-btn followed" onClick={onFollowedClick.bind(null, star.userId, kugouId)}>已关注</a>
              : <a href="javascript:;" className="btn follow-btn" onClick={onFollowClick.bind(null, star.userId, kugouId)}>关注</a>
          }
          <a href="javascript:;" className="btn vote-btn" onClick={onVoteClick.bind(null, star.userId, kugouId)}>投票{hasMsg && <div className="message">{itemMsg}</div>}</a>
          <div className="pkguest-info">
            <p className="tick-num">{votes || 0}票</p>
            <p className="nickname"><a title={star.nickName} target="_blank" href="javascript:;">{star.nickName}</a></p>
            {
              groupStyle == 1 && (
                <div className="progress">
                  <div className="rate" style={{ width: percent + '%' }}></div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
