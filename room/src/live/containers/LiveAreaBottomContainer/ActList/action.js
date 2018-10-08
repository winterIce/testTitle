import { UPDATE_ACTLIST, SOCKET_UPDATE_ACTLIST, ACTLIST_LIKE, ACTLIST_LIKE_RESET_STATUS } from './constants';
import jsonp from '../../../../utils/jsonp';
import { ServiceHost, vServiceUrl } from '../../../../utils/pipeline';

/**
 * 更新歌单列表
 * @param {number} roomId 房间号
 */
export const initActList = (roomId, KugooID) => dispatch => dispatch(jsonp(UPDATE_ACTLIST, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/song/list.jsonp`,
  data: {
    roomId,
    KugooID
  }
}));

// 更新列表
export const updateActList = (newData) => dispatch => dispatch({
  type: SOCKET_UPDATE_ACTLIST,
  newData
});

/**
 * 点赞
 * @param {number} roomId 房间号
 */
export const likeSong = (roomId, KugooID, songId) => dispatch => dispatch(jsonp(ACTLIST_LIKE, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/song/like.jsonp`,
  data: {
    roomId,
    KugooID,
    songId,
    from: 0
  }
}));

// 重置失败状态
export const resetFailState = () => dispatch => dispatch({
  type: ACTLIST_LIKE_RESET_STATUS
});
