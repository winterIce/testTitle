

import {
  API_WIDGET_GUEST_LIST,
  API_WIDGET_DATA_LIST,
  API_WIDGET_FOLLOW_GUEST,
  API_WIDGET_UNFOLLOW_GUEST,
  SWITCH_AWARD_WIDGET
} from './constants';
import initialState from '../../store/initial';

export default (state = initialState.awardWidget, action) => {
  let payload = action.payload;
  let followList;

  switch (action.type) {
    case `${API_WIDGET_GUEST_LIST}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        stars: payload.data.list
      });
    case `${API_WIDGET_GUEST_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case 'API_WIDGET_DATA_LIST':
      if (state.data && state.data.id == action.data.id) {
        return state;
      }
      return Object.assign({}, state, {
        data: action.data
      });

    // 关注和取消关注
    case `${API_WIDGET_FOLLOW_GUEST}_PENDING`:
    case `${API_WIDGET_UNFOLLOW_GUEST}_PENDING`:
      return Object.assign({}, state, { status: 'prepending' });
    case `${API_WIDGET_FOLLOW_GUEST}_SUCCESS`:
      if (!action.payload || action.payload.status !== 1) {
        return Object.assign({}, state, { status: 'success' });
      }
      followList = Object.assign({}, state.followList);
      if (action.payload.data == 1) {
        followList[action.params.kugouId] = 1;
      }
      return Object.assign({}, state, {
        status: 'success',
        followList
      });
    case `${API_WIDGET_UNFOLLOW_GUEST}_SUCCESS`:
      if (!action.payload || action.payload.status !== 1) {
        return Object.assign({}, state, { status: 'success' });
      }
      followList = Object.assign({}, state.followList);
      if (action.payload.data == 1) {
        followList[action.params.kugouId] = 0;
      }
      return Object.assign({}, state, {
        status: 'success',
        followList
      });
    case `${API_WIDGET_FOLLOW_GUEST}_ERROR`:
    case `${API_WIDGET_UNFOLLOW_GUEST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case 'SWITCH_AWARD_WIDGET':
      return Object.assign({}, state, {
        display: action.display
      });
    default:
      return state;
  }
};
