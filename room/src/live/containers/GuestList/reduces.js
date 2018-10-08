import merge from 'lodash.merge';
import {
  API_GUEST_LIST,
  API_FOLLOW_LIST,
  API_FOLLOW_GUEST,
  UPDATE_GUEST_LIST,
  UPDATE_GUEST_MSG,
  SEND_GIFT_GUEST_SUC,
  SEND_GIFT_GUEST_ERR,
  CLEAR_ALL_GUEST_MSG,
  CLEAR_MSG_BY_ID,
  UPDATE_VOTE_GUEST,
  CLICK_FOLLOWED_BTN
} from './constants';
import initialState from '../../store/initial';

/**
 * 添加关注嘉宾 kugouId
 * @param {Array} fList 关注嘉宾kugouId列表
 * @param {number} kugouId
 */
const addFollowGuest = (fList, kugouId) => {
  if (fList.indexOf(kugouId) === -1) {
    return fList.concat(kugouId);
  }
  return fList;
};

/**
 * Action 处理
 */
export default (state = initialState.guestList, action) => {
  switch (action.type) {
    // 嘉宾列表请求成功
    case `${API_GUEST_LIST}_SUCCESS`:
      if (!action.payload || action.payload.code !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        data: action.payload.data
      });
    // 嘉宾列表请求失败
    case `${API_GUEST_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });
    // socket 更新嘉宾列表
    case UPDATE_GUEST_LIST:
      return Object.assign({}, state, {
        status: 'success',
        data: action.data
      });
    // 关注列表请求成功
    case `${API_FOLLOW_LIST}_SUCCESS`:
      if (!action.payload || action.payload.code !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        followList: action.payload.data
      });
    // 关注列表请求失败
    case `${API_FOLLOW_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });
    // 关注嘉宾接口返回成功
    case `${API_FOLLOW_GUEST}_SUCCESS`:
      if (!action.payload || action.payload.status !== 1 || action.payload.data !== 1 || state.followList.indexOf(action.params.kugouId) > -1) {
        return Object.assign({}, state, { status: 'success' });
      }
      const followList = addFollowGuest(state.followList, action.params.kugouId);
      return Object.assign({}, state, {
        status: 'success',
        followList
      });
    // 关注嘉宾接口返回失败
    case `${API_FOLLOW_GUEST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });
    // 更新嘉宾消息
    case UPDATE_GUEST_MSG:
      return Object.assign({}, state, {
        msg: {
          [action.data.kugouId]: action.data.itemMsg
        }
      });
    // 清除所有嘉宾消息
    case CLEAR_ALL_GUEST_MSG:
      return Object.assign({}, state, {
        msg: {}
      });
    // 由kugouId清除嘉宾消息
    case CLEAR_MSG_BY_ID:
      return merge({}, state, {
        msg: {
          [action.kugouId]: ''
        }
      });
    // 送礼投票接口返回成功
    case SEND_GIFT_GUEST_SUC:
      if (!action.res || action.res.status != 1 || !action.res.data) {
        return merge({}, state, {
          msg: {
            [action.kugouId]: '投票失败'
          },
          voteKugouId: 0
        });
      }
      return merge({}, state, {
        msg: {
          [action.kugouId]: '投票成功'
        },
        voteKugouId: 0
      });
    // 送礼投票接口返回失败
    case SEND_GIFT_GUEST_ERR: {
      const errorMsg = (typeof action.errorData === 'object' ? action.errorData.errorcode : '') || '投票失败';
        return merge({}, state, {
          msg: {
            [action.kugouId]: errorMsg
          },
          voteKugouId: 0
        });
      }
    // 点击已关注按钮
    case CLICK_FOLLOWED_BTN:
      return merge({}, state, {
        msg: {
          [action.kugouId]: '你已关注'
        }
      });
    // 更新投票嘉宾kugouId
    case UPDATE_VOTE_GUEST:
      return Object.assign({}, state, {
        voteKugouId: action.kugouId
      });
    default:
      return state;
  }
};
