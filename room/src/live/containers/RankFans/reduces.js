import { API_FANS_LIST, UPDATE_FANS_LIST } from './constants';
import initialState from '../../store/initial';

/**
 * Action 处理
 */
export default (state = initialState.fans, action) => {
  switch (action.type) {
    case `${API_FANS_LIST}_PENDING`:
      return Object.assign({}, state, { status: 'pending' });
    case `${API_FANS_LIST}_SUCCESS`:
      if (!action.payload || action.payload.code !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        data: action.payload.data
      });
    case `${API_FANS_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });
    case UPDATE_FANS_LIST: {
      const newData = [].concat(state.data);

      // 有几条就更新几条
      action.payload.forEach((item, i) => {
        newData[i] = item;
      });

      return Object.assign({}, state, {
        status: 'update',
        data: newData
      });
    }
    default:
      return state;
  }
};
