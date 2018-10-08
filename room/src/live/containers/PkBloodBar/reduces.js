
import merge from 'lodash.merge';
import {
  API_PKBLOOD_GUEST_LIST,
  API_PKBLOOD_GROUP_LIST,
  API_PKBLOOD_PENDANT,
  SWITCH_PKBLOOD_COMPT,
  SHOW_PKBLOOD_RANK,
  HIDE_PKBLOOD_RANK,
  SWITCH_FOLD_BTN,
  SWITCH_BLOOD_BAR,
  SLIDE_BLOOD_BAR,
  UPDATA_BLOOD_SOCKET_DATA,
  UPDATE_PK_GROUP_LIST
} from './constants';
import initialState from '../../store/initial';

export default (state = initialState.pkBloodBar, action) => {
  let payload = action.payload;
  let pageData;
  switch (action.type) {
    case `${API_PKBLOOD_GUEST_LIST}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        stars: payload.data.stars,
        serverTime: payload.data.serverTime
      });
    case `${API_PKBLOOD_GUEST_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case `${API_PKBLOOD_GROUP_LIST}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      return Object.assign({}, state, {
        status: 'success',
        data: payload.data,
        serverTime: payload.data.serverTime
      });
    case `${API_PKBLOOD_GROUP_LIST}_ERROR`:
      return Object.assign({}, state, { status: 'error' });

    case `${API_PKBLOOD_PENDANT}_SUCCESS`:
      if (!payload || payload.ret !== 0) {
        return Object.assign({}, state, { status: 'success' });
      }
      if (payload.data && payload.data.isShow == 1) { // 展示挂件
        return Object.assign({}, state, {
          status: 'success',
          isShow: payload.data.isShow
        });
      }

    case SWITCH_PKBLOOD_COMPT:
      return Object.assign({}, state, {
        isShow: !!action.isShow
      });

    case SHOW_PKBLOOD_RANK:
      pageData = Object.assign({}, state.pageData);
      if (action.groupType == 0) {
        pageData.showLeftRank = 1;
      } else {
        pageData.showRightRank = 1;
      }
      return Object.assign({}, state, {
        pageData
      });
    case HIDE_PKBLOOD_RANK:
      pageData = Object.assign({}, state.pageData);
      if (action.groupType == 0) {
        pageData.showLeftRank = 0;
      } else {
        pageData.showRightRank = 0;
      }
      return Object.assign({}, state, {
        pageData
      });

    case SWITCH_FOLD_BTN:
      pageData = Object.assign({}, state.pageData);
      pageData.showFoldBtn = action.isShow ? 1 : 0;
      return Object.assign({}, state, {
        pageData
      });

    case SWITCH_BLOOD_BAR:
      pageData = Object.assign({}, state.pageData);
      pageData.showBloodBar = action.isShow ? 1 : 0;
      return Object.assign({}, state, {
        pageData
      });

    case SLIDE_BLOOD_BAR:
      pageData = Object.assign({}, state.pageData);
      pageData.slideBloodBar = action.isSlide ? 1 : 0;
      return Object.assign({}, state, {
        pageData
      });

    case UPDATA_BLOOD_SOCKET_DATA:
      return Object.assign({}, state, { socketData: action.data });

    case UPDATE_PK_GROUP_LIST:
      return Object.assign({}, state, {
        status: 'success',
        data: action.data,
        serverTime: action.data.serverTime
      });

    default:
      return state;
  }
};
