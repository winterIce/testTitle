import { API_FANS_LIST, UPDATE_FANS_LIST } from './constants';
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

/**
 * 异步请求 Action
 * @param {number} roomId 房间号
 */
export const fetchList = roomId => dispatch => dispatch(jsonp(API_FANS_LIST, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/rank/fans.jsonp`,
  data: {
    roomId
  }
}));


export const updateList = data => ({
  type: UPDATE_FANS_LIST,
  payload: data
});
