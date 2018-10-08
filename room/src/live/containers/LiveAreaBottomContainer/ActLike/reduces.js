import initialState from '../../../store/initial';
import { INIT_LIKE_VISIBILITY, SHOW_LIKE, HIDE_LIKE, SET_LIKE, DESTORY_LIKE } from './constants';

/**
 * Action 处理
 */
export default (state = initialState.actLike, action) => {

  switch (action.type) {

    // 初始化点赞按钮状态
    case `${INIT_LIKE_VISIBILITY}_SUCCESS`: {
      if (action.payload && action.payload.code === 0 && typeof action.payload.data === 'object' && action.payload.data.canLike === 1) {
        const newState = Object.assign({}, state);

        newState.songData = action.payload.data;
        newState.state = 'visible';
        return newState;
      }
      break;
    }

    // 显示点赞
    case SHOW_LIKE: {
      const newState = Object.assign({}, state);
      newState.visible = true;
      newState.songData = action.songData;
      return newState;
    }

    // 隐藏点赞
    case HIDE_LIKE: {
      const newState = Object.assign({}, state);
      newState.visible = false;
      return newState;
    }

    // 清除点赞数据
    case DESTORY_LIKE: {
      const newState = Object.assign({}, state);
      newState.songData = null;
      return newState;
    }

    // 不需要处理
    case SET_LIKE: {
      break;
    }
  }

  return state;
};
