
import merge from 'lodash.merge';
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
import initialState from '../../store/initial';

export default (state = initialState.pkGuestRankGroup, action) => {
  let payload = action.payload;
  let newFollowList;
  switch (action.type) {
    case `${API_PK_GUEST_LIST}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        stars: payload.data.stars,
        serverTime: payload.data.serverTime
      });
    case `${API_PK_GUEST_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case `${API_PK_GROUP_LIST}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        data: payload.data,
        serverTime: payload.data.serverTime
      });
    case `${API_PK_GROUP_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case `${API_PK_FOLLOW_LIST}_SUCCESS`:
      if (!action.payload || action.payload.code !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      let followList = {};
      if (action.payload.data && action.payload.data.length > 0) {
        action.payload.data.forEach(v => {
          followList[v] = 1; // 1为已关注
        });
      }
      return Object.assign({}, state, {
        status: 'success',
        followList: followList || state.followList
      });
    case `${API_PK_FOLLOW_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    // 关注和取消关注
    case `${API_PK_FOLLOW_GUEST}_PENDING`:
    case `${API_PK_UNFOLLOW_GUEST}_PENDING`:
      return Object.assign({}, state, { status: 'prepending' });
    case `${API_PK_FOLLOW_GUEST}_SUCCESS`:
      if (!action.payload || action.payload.status !== 1) {
        return Object.assign({}, state, { status: 'success' });
      }
      newFollowList = Object.assign({}, state.followList);
      if (action.payload.data == 1) {
        newFollowList[action.params.kugouId] = 1;
      }
      return Object.assign({}, state, {
        status: 'success',
        followList: newFollowList
      });
    case `${API_PK_UNFOLLOW_GUEST}_SUCCESS`:
      if (!action.payload || action.payload.status !== 1) {
        return Object.assign({}, state, { status: 'success' });
      }
      newFollowList = Object.assign({}, state.followList);
      if (action.payload.data == 1) {
        newFollowList[action.params.kugouId] = 0;
      }
      return Object.assign({}, state, {
        status: 'success',
        followList: newFollowList
      });
    case `${API_PK_FOLLOW_GUEST}_ERROR`:
    case `${API_PK_UNFOLLOW_GUEST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case UPDATA_PK_SOCKET_DATA:
      return Object.assign({}, state, { socketData: action.data });

    case UPDATE_PK_GROUP_LIST:
      return Object.assign({}, state, {
        status: 'success',
        data: action.data,
        serverTime: action.data.serverTime
      });

    case UPDATE_PK_GUEST_MSG:
      return Object.assign({}, state, {
        msg: {
          [action.data.kugouId]: action.data.itemMsg
        }
      });
    // 由kugouId清除嘉宾消息
    case CLEAR_PK_MSG_BY_ID:
      return merge({}, state, {
        msg: {
          [action.kugouId]: ''
        }
      });

    default:
      return state;
  }
};
