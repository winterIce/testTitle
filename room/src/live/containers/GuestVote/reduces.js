import {
  SHOW_VOTE_BOX,
  UPDATA_GIFT_DATA,
  SEND_GIFT_SUC,
  SEND_GIFT_ERR,
  CHANGE_DIY_STATE
} from './constants';
import initialState from '../../store/initial';

/**
 * Action 处理
 */
export default (state = initialState.guestVote, action) => {
  switch (action.type) {
    // 显示投票框
    case SHOW_VOTE_BOX:
      return Object.assign({}, state, action.data);
    // 更新投票礼物信息
    case UPDATA_GIFT_DATA:
      let giftData = Object.assign({}, state.giftData, action.data.giftData);
      return Object.assign({}, state, { giftData });
    // 送礼成功及失败
    case SEND_GIFT_SUC:
    case SEND_GIFT_ERR:
      return Object.assign({}, state, {
        isShow: false
      });
    // 更新自定义按钮可点击状态
    case CHANGE_DIY_STATE:
      return Object.assign({}, state, {
        diySendAble: action.diySendAble
      });
    default:
      return state;
  }
};
