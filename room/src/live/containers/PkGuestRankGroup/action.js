
import {
  API_PK_GUEST_LIST,
  API_PK_GROUP_LIST,
  API_PK_FOLLOW_LIST,
  API_PK_FOLLOW_GUEST,
  API_PK_UNFOLLOW_GUEST,
  UPDATA_PK_SOCKET_DATA,
  UPDATE_PK_GROUP_LIST,
  UPDATE_PK_GUEST_MSG,
  CLEAR_PK_MSG_BY_ID
} from './constants';
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

/**
 * 获取pk主播列表
 *
 * @return {Function}
 */
export const fetchPkGuestList = () => dispatch => dispatch(jsonp(API_PK_GUEST_LIST, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/stars`,
  jsonp: 'jsoncallback'
}));

/**
 * 获取分组
 */
export const fetchPkGroupList = () => dispatch => dispatch(jsonp(API_PK_GROUP_LIST, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/votes`,
  jsonp: 'jsoncallback'
}));

export const fetchFollowList = roomId => dispatch => dispatch(jsonp(API_PK_FOLLOW_LIST, {
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
export const followGuest = (userId, kugouId) => dispatch => dispatch(jsonp(API_PK_FOLLOW_GUEST, {
  url: `/NServices/Follow/FollowService/follow?args=[${userId}]&ref=liveguestlist`,
  kugouId
}));

/**
 * 取消关注嘉宾请求
 * @param {Number} userId
 * @param {Number} kugouId
 */
export const unfollowGuest = (userId, kugouId) => dispatch => dispatch(jsonp(API_PK_UNFOLLOW_GUEST, {
  url: `/NServices/Follow/FollowService/unfollow?args=[${userId}]&ref=liveguestlist`,
  kugouId
}));

export const updateSocketData = (data) => dispatch => dispatch({
  type: UPDATA_PK_SOCKET_DATA,
  data
});

export const updatePkGroupList = (data) => dispatch => dispatch({
  type: UPDATE_PK_GROUP_LIST,
  data
});

export const updateGuestMsg = (kugouId, itemMsg) => dispatch => dispatch({
  type: UPDATE_PK_GUEST_MSG,
  data: {
    kugouId,
    itemMsg
  }
});

export const clearMsgById = kugouId => dispatch => dispatch({
  type: CLEAR_PK_MSG_BY_ID,
  kugouId
});
