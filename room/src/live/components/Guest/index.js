import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImgUserLogo from '../ImgUserLogo';
import './index.less';

/**
 * 星光票容错
 * @param {Number} coin
 */
const getCoinVal = coin => {
  if (coin > 0) {
    return coin;
  }
  return 0;
};

/**
 * 嘉宾榜单个嘉宾组件
 *
 * @class Guest
 * @extends {PureComponent}
 */
export default class Guest extends PureComponent {
  // 组件属性类型检测
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    isVotable: PropTypes.bool.isRequired,
    isFollowed: PropTypes.bool.isRequired,
    isVoteGuest: PropTypes.bool.isRequired,
    gpHeight: PropTypes.number.isRequired,
    needLaze: PropTypes.bool.isRequired,
    itemMsg: PropTypes.string.isRequired,
    onFollowClick: PropTypes.func.isRequired,
    onFollowedClick: PropTypes.func.isRequired,
    onVoteClick: PropTypes.func.isRequired
  }

  render() {
    // 取出 props 里的属性
    const {
      item, // 嘉宾数据
      isVotable, // 是否可投票
      isFollowed, // 是否已关注
      isVoteGuest, // 是否是正在投票的嘉宾
      needLaze, // 是否需要懒加载
      gpHeight,
      itemMsg,
      onFollowClick, // 点击关注按钮
      onFollowedClick, // 点击已关注按钮
      onVoteClick // 点击投票按钮
    } = this.props;
    // 排名
    const index = this.props.index + 1;
    // 取出 item 里面的相关属性
    const {
      userLogo,
      nickName,
      coin,
      userId,
      fans,
      kugouId
    } = item;
    // 第一名显示皇冠
    const hasCrown = (index === 1);
    // 是否有提示消息
    const hasMsg = !!itemMsg;
    const coinVal = getCoinVal(coin);

    return (
      <div className="guest-comp">
        <div className="gimgbox">
          {hasCrown &&
            <div className="gcrown" />
          }
          <div className={`gout gout${index}`}>
            <a className="glink" title={nickName} target="_blank" href={`/index.php?action=user&id=${userId}`}>
              <ImgUserLogo src={userLogo} alt={nickName} width={100} height={100} lazyload={needLaze} />
              {index >= 10
                ? <div className="gnum gnum2">{index}</div>
                : <div className="gnum">{index}</div>
              }
              <div className={`gin gin${index}`} />
            </a>
          </div>
        </div>
        <div className="gpillar">
          <div className="gpout gpout-bg">
            <div className="gpin gpin-bg" />
          </div>
          <div className="gpout gpout-val" style={{ height: `${gpHeight}px` }}>
            <div className="gpin gpin-val" />
          </div>
        </div>
        <div className="gticket">
          <span className="gtnum">{coinVal}</span>
          <span>票</span>
        </div>
        <div className="gname" title={nickName}>{nickName}</div>
        <div className="gvotebar">
          {(isVotable && !isVoteGuest)
            ? <a href="javascript:;" className="gvbtn gvbtn-vote" onClick={event => { onVoteClick(userId, kugouId, event); }}>投票</a>
            : <a href="javascript:;" className="gvbtn gvbtn-vote gvbtn-disable">投票</a>
          }
          {isFollowed
            ? <a href="javascript:;" className="gvbtn gvbtn-follow" onClick={() => { onFollowedClick(userId, kugouId); }}>已关注</a>
            : <a href="javascript:;" className="gvbtn gvbtn-follow" onClick={() => { onFollowClick(userId, kugouId); }}>关注</a>
          }
        </div>
        <ul className="gfans">
          {fans.map((fitem, findex) =>
            (<li className="gfan" key={fitem.userId}>
              <a className="gflink" title={fitem.nickName} target="_blank" href={`/index.php?action=user&id=${fitem.userId}`}>
                <ImgUserLogo src={fitem.userLogo} alt={fitem.nickName} width={45} height={45} lazyload={needLaze} />
                <span className="gfindex">{findex + 1}</span>
              </a>
            </li>)
          )}
        </ul>
        {hasMsg &&
          <div className="gmsg">{itemMsg}</div>
        }
      </div>
    );
  }
}
