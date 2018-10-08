import { INIT_LIKE_VISIBILITY, SHOW_LIKE, HIDE_LIKE, SET_LIKE, DESTORY_LIKE } from './constants';
import jsonp from '../../../../utils/jsonp';
import { ServiceHost, vServiceUrl } from '../../../../utils/pipeline';

// 初始化组件可见状态
export const initLike = (roomId, KugooID) => dispatch => dispatch(jsonp(INIT_LIKE_VISIBILITY, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/song/like/click.jsonp`,
  data: {
    roomId,
    KugooID
  }
}));

// 显示点赞
export const showLike = songData => dispatch => dispatch({
  type: SHOW_LIKE,
  songData
});

// 隐藏点赞
export const hideLike = () => dispatch => dispatch({
  type: HIDE_LIKE
});

// 点赞
export const setLike = (roomId, KugooID, songId) => dispatch => dispatch(jsonp(SET_LIKE, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/song/like.jsonp`,
  data: {
    roomId,
    KugooID,
    songId,
    from: 1
  }
}));

// 清除点赞信息
export const destoryLike = dispatch => dispatch({
  type: DESTORY_LIKE
});
