import initialState from '../../../store/initial';
import { UPDATE_ACTLIST, SOCKET_UPDATE_ACTLIST, ACTLIST_LIKE, ACTLIST_LIKE_RESET_STATUS } from './constants';

/**
 * Action 处理
 */
export default (state = initialState.actList, action) => {

  switch (action.type) {
    case `${UPDATE_ACTLIST}_SUCCESS`: {
      if (action.payload && action.payload.code === 0 && Array.isArray(action.payload.data)) {
        const newState = Object.assign({}, state);

        newState.list = action.payload.data;
        newState.state = 'loaded';
        return newState;
      }
      break;
    }

    case `${ACTLIST_LIKE}_SUCCESS`: {
      if (typeof action.payload === 'object') {
        const newState = Object.assign({}, state);

        switch(action.payload.code){
          // 0代表成功
          case 0:
            newState.list.forEach((item) => {
              if (item.id === action.params.data.songId) {
                item.isLike = true;
                item.likes = (item.likes || 0) + 1;
              }
            });
            break;
          default: {
            newState.list.forEach((item) => {
              if (item.id === action.params.data.songId) {
                item.likeStatus = 'fail';
              }
            });
            break;
          }
        }

        return newState;
      }
      break;
    }

    case ACTLIST_LIKE_RESET_STATUS: {
      const newState = Object.assign({}, state);

      newState.list.forEach((item) => {
        if (item.likeStatus = 'fail') {
          delete item.likeStatus;
        }
      });

      return newState;
    }

    case SOCKET_UPDATE_ACTLIST: {
      const newState = Object.assign({}, state);
      newState.list = action.newData;
      return newState;
    }
  }


  return state;
};
