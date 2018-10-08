
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
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

/**
 * 获取pk主播列表
 *
 * @return {Function}
 */
export const fetchPkGuestList = () => dispatch => dispatch(jsonp(API_PKBLOOD_GUEST_LIST, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/stars`,
  jsonp: 'jsoncallback'
}));

/**
 * 获取分组
 */
export const fetchPkGroupList = () => dispatch => dispatch(jsonp(API_PKBLOOD_GROUP_LIST, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/votes`,
  jsonp: 'jsoncallback'
}));

export const fetchPkPendant = () => dispatch => dispatch(jsonp(API_PKBLOOD_PENDANT, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/ceremony/pendant`,
  jsonp: 'jsoncallback'
}));

/*
 * 是否显示组件
 */
export const switchCompt = (isShow) => dispatch => dispatch({
  type: SWITCH_PKBLOOD_COMPT,
  isShow
});

/*
 * 显示榜单
 */
export const showRank = (groupType) => dispatch => dispatch({
  type: SHOW_PKBLOOD_RANK,
  groupType
});

/*
 * 隐藏榜单
 */
export const hideRank = (groupType) => dispatch => dispatch({
  type: HIDE_PKBLOOD_RANK,
  groupType
});

export const switchFoldBtn = (isShow) => dispatch => dispatch({
  type: SWITCH_FOLD_BTN,
  isShow
});

export const switchBloodBar = (isShow) => dispatch => dispatch({
  type: SWITCH_BLOOD_BAR,
  isShow
});

export const slideBloodBar = (isSlide) => dispatch => dispatch({
  type: SLIDE_BLOOD_BAR,
  isSlide
});

export const updateSocketData = (data) => dispatch => dispatch({
  type: UPDATA_BLOOD_SOCKET_DATA,
  data
});

export const updatePkGroupList = (data) => dispatch => dispatch({
  type: UPDATE_PK_GROUP_LIST,
  data
});
