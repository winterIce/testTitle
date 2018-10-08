import {
  NEW_GIFT,
  CLEAR_GIFT,
  SHOW_GIFT
} from './constants';
import initialState from '../../store/initial';

/**
 * Action 处理
 */
export default (state = initialState.guestGift, action) => {
  switch (action.type) {
    case NEW_GIFT: {
      const newInfoArr = Array.from(state.sgInfoArr);
      if (action.isHead) {
        newInfoArr.unshift(action.data);
      } else {
        newInfoArr.push(action.data);
      }
      return Object.assign({}, state, { data: state.data, sgInfoArr: newInfoArr });
    }
    case CLEAR_GIFT: {
      if (state.data.length === 0) {
        return state;
      }
      const newData = [];
      const nowStp = Date.now();
      for (let item of state.data) {
        // 30 秒以内的为有效信息
        if (nowStp - item.showTimeStp < 30 * 1000) {
          newData.push(item);
        }
      }
      return Object.assign({}, state, { data: newData, sgInfoArr: state.sgInfoArr });;
    }
    case SHOW_GIFT: {
      // 如果队列里无消息则无动作
      if (state.sgInfoArr.length === 0) {
        return state;
      }
      const newInfoArr = Array.from(state.sgInfoArr);
      const newData = Array.from(state.data);
      const item = newInfoArr.shift();
      item.showTimeStp = Date.now();
      newData.push(item);
      return Object.assign({}, state, { data: newData, sgInfoArr: newInfoArr });;
    }
    default:
      return state;
  }
};
