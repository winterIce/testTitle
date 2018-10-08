import { UPDATE_ACTTOAST_LIST, UPDATE_ACTTOAST_SHOW_NEXT, INSERT_ACTTOAST_ITEM, HIDE_ACTTOAST } from './constants';
import jsonp from '../../../../utils/jsonp';
import { ServiceHost, vServiceUrl } from '../../../../utils/pipeline';

/**
 * 初始化报幕列表
 * @param {number} roomId 房间号
 */
export const initActToastList = roomId => dispatch => dispatch(jsonp(UPDATE_ACTTOAST_LIST, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/notice/list.jsonp`,
  data: {
    roomId
  }
}));


/**
 * 更新报幕列表
 * @param {object} item 报幕列表
 */
export const insertActToastItem = item => dispatch => dispatch({
  type: INSERT_ACTTOAST_ITEM,
  item: item
});

// 播放下一条报幕
export const showNextToast = () => dispatch => {
  return dispatch({
    type: UPDATE_ACTTOAST_SHOW_NEXT
  })
};

// 隐藏报幕
export const hideToast = () => dispatch => dispatch({
  type: HIDE_ACTTOAST
});
