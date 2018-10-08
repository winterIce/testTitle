
import {
  API_WIDGET_GUEST_LIST,
  API_WIDGET_DATA_LIST,
  API_WIDGET_FOLLOW_GUEST,
  API_WIDGET_UNFOLLOW_GUEST,
  SWITCH_AWARD_WIDGET
} from './constants';
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

/**
 * 获取识别挂件主播列表
 *
 * @return {Function}
 */
export const fetchWidgetGuestList = () => dispatch => dispatch(jsonp(API_WIDGET_GUEST_LIST, {
  url: `${ServiceHost.soaSecureUrl}/fxannualawards/api/vmabubble/list`,
  jsonp: 'jsoncallback'
}));

export const followGuest = (userId, kugouId) => dispatch => dispatch(jsonp(API_WIDGET_FOLLOW_GUEST, {
  url: `/NServices/Follow/FollowService/follow?args=[${userId}]&ref=liveguestlist`,
  kugouId
}));

export const unfollowGuest = (userId, kugouId) => dispatch => dispatch(jsonp(API_WIDGET_UNFOLLOW_GUEST, {
  url: `/NServices/Follow/FollowService/unfollow?args=[${userId}]&ref=liveguestlist`,
  kugouId
}));

export const switchAwardWidget = (display) => dispatch => dispatch({
  type: SWITCH_AWARD_WIDGET,
  display
});

export const updateAwardWidget = (data) => dispatch => dispatch({
  type: API_WIDGET_DATA_LIST,
  data
});
