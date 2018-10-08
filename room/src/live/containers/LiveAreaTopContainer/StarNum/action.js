import { UPDATE_STAR_NUM_STATE, UPDATE_STAR_NUM, UPDATE_STAR_NUM_7DAY } from './constants';
import jsonp from '../../../../utils/jsonp';
import { ServiceHost, vServiceUrl } from '../../../../utils/pipeline';

/**
 * 初始化星光票
 * @param {number} roomId 房间号
 */
export const initStarNum = roomId => dispatch => dispatch(jsonp(UPDATE_STAR_NUM, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/concert/starNum.jsonp`,
  data: {
    roomId
  }
}));

// 初始化订阅数量
export const init7DayStarNum = starId => dispatch => dispatch(jsonp(UPDATE_STAR_NUM_7DAY, {
  url: `${vServiceUrl}/RoomService.RoomService.getStarInfo/${starId}/`
}));

/**
 * 初始化星光票
 * @param {number} starNum 更新星光票
 */
export const UpdateStarNum = (starNum, title) => dispatch => dispatch({
  type: UPDATE_STAR_NUM,
  data: {
    data: starNum,
    title
  },

});

/**
 * 更新星光票可见状态
 * @param {boolean} visible 可见状态
 */
export const UpdateStarNumVisibleState = visible => dispatch => dispatch({
  type: UPDATE_STAR_NUM_STATE,
  visible
});

