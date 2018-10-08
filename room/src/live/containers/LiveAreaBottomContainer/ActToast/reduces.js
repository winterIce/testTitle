import initialState from '../../../store/initial';
import { UPDATE_ACTTOAST_LIST, UPDATE_ACTTOAST_SHOW_NEXT, INSERT_ACTTOAST_ITEM, HIDE_ACTTOAST } from './constants';

/**
 * Action 处理
 */
export default (state = initialState.actToast, action) => {
  switch(action.type) {

    // 通过接口更新列表
    case `${UPDATE_ACTTOAST_LIST}_SUCCESS`: {

      if(action.payload && action.payload.code === 0 && Array.isArray(action.payload.data)){
        const newState = Object.assign({}, state, {
          list: state.list.concat(action.payload.data)
        });
        newState.content = newState.list.shift() || null;
        return newState;
      }

      break;
    }

    // 新增一条新的报幕
    case INSERT_ACTTOAST_ITEM: {
      const newState = Object.assign({}, state);

      if(newState.list.length === 0 && newState.content === null){
        newState.content = action.item;
      }else{
        newState.list.push(action.item);
      }

      return newState;
    }

    case UPDATE_ACTTOAST_SHOW_NEXT: {
      const newState = Object.assign({}, state);
      newState.content = newState.list.shift() || null;

      return newState;
    }

    case HIDE_ACTTOAST: {
      const newState = Object.assign({}, state);
      newState.content = null;
      return newState;
    }

    default:
      break;
  }

  return state;
};
