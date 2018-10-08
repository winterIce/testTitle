import { UPDATE_STAR_NUM_STATE, UPDATE_STAR_NUM, UPDATE_STAR_NUM_7DAY } from './constants';
import initialState from '../../../store/initial';

/**
 * Action 处理
 */
export default (state = initialState.fans, action) => {
  switch (action.type) {
    // 更新星光票数量
    case UPDATE_STAR_NUM:
      return Object.assign({}, state, action.data);
    // 更新星光票可见状态
    case UPDATE_STAR_NUM_STATE:
      return Object.assign({}, state, {
        visible: action.visible
      });

    // 更新星光票数量
    case `${UPDATE_STAR_NUM}_SUCCESS`: {
      if (action.payload && action.payload.data && typeof action.payload.data.starNum === 'number') {
        return Object.assign({}, state, {
          data: action.payload.data.starNum
        });
      }
      return state;
    }

    case `${UPDATE_STAR_NUM_7DAY}_SUCCESS`: {
      if (action.payload && action.payload.code === 0 && action.payload.data && action.payload.data.getStarNum > 0) {
        return Object.assign({}, state, {
          title: '近7天内星光票',
          data: action.payload.data.getStarNum
        });
      }
      return state;
    }

    default:
      return state;
  }
};
