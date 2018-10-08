import {
  API_GUEST_LIST,
  API_FOLLOW_LIST,
  API_FOLLOW_GUEST,
  UPDATE_GUEST_LIST,
  UPDATE_GUEST_MSG,
  SEND_GIFT_GUEST_SUC,
  SEND_GIFT_GUEST_ERR,
  CLEAR_ALL_GUEST_MSG,
  UPDATE_VOTE_GUEST,
  CLICK_FOLLOWED_BTN,
  CLEAR_MSG_BY_ID
} from './constants';
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

/**
 * 异步请求 Action
 * @param {Number} roomId 房间号
 */
export const fetchGuestList = roomId => dispatch => dispatch(jsonp(API_GUEST_LIST, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/rank/guest.jsonp`,
  data: {
    roomId
  }
}));

/**
 * 异步请求 Action
 * @param {Number} roomId 房间号
 */
export const fetchFollowList = roomId => dispatch => dispatch(jsonp(API_FOLLOW_LIST, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/guest/followed.jsonp`,
  data: {
    roomId
  }
}));

/**
 * 关注嘉宾请求
 * @param {Number} userId
 * @param {Number} kugouId
 */
export const followGuest = (userId, kugouId) => dispatch => dispatch(jsonp(API_FOLLOW_GUEST, {
  url: `/NServices/Follow/FollowService/follow?args=[${userId}]&ref=liveguestlist`,
  kugouId
}));

/**
 * socket 更新嘉宾列表
 * @param {Array} guestList 嘉宾列表
 */
export const updateGuestList = guestList => dispatch => dispatch({
  type: UPDATE_GUEST_LIST,
  data: guestList
});

/**
 * 更新嘉宾提示信息
 * @param {Number} kugouId
 * @param {String} itemMsg 消息内容
 */
export const updateGuestMsg = (kugouId, itemMsg) => dispatch => dispatch({
  type: UPDATE_GUEST_MSG,
  data: {
    kugouId,
    itemMsg
  }
});

/**
 * 嘉宾投票成功返回数据
 * @param {Object} res 接口返回数据
 * @param {Number} kugouId
 * @param {Object} giftData 礼物数据
 */
export const sendGiftGuestSuc = (res, kugouId, giftData) => dispatch => dispatch({
  type: SEND_GIFT_GUEST_SUC,
  res,
  kugouId,
  giftData
});

/**
 * 嘉宾投票失败返回
 * @param {Number} kugouId
 */
export const sendGiftGuestErr = (kugouId, errorData) => dispatch => dispatch({
  type: SEND_GIFT_GUEST_ERR,
  kugouId,
  errorData
});

/**
 * 清除所有嘉宾提示消息
 */
export const clearAllGuestMsg = () => dispatch => dispatch({
  type: CLEAR_ALL_GUEST_MSG
});

/**
 * 根据kugouId清除嘉宾提示消息
 * @param {Number} kugouId
 */
export const clearMsgById = kugouId => dispatch => dispatch({
  type: CLEAR_MSG_BY_ID,
  kugouId
});

/**
 * 更新投票嘉宾kugouId
 * @param {Number} kugouId
 */
export const updateVoteGuest = kugouId => dispatch => dispatch({
  type: UPDATE_VOTE_GUEST,
  kugouId
});

/**
 * 点击已关注嘉宾
 * @param {Number} userId
 * @param {Number} kugouId
 */
export const showFollowed = (userId, kugouId) => dispatch => dispatch({
  type: CLICK_FOLLOWED_BTN,
  userId,
  kugouId
});
