import { UPDATE_SUBSCRIBE_COUNT, UPDATE_STAR_INFO, UPDATE_VIEWER_COUNT, UPDATE_SUBSCRIBE_STATUS_SUBSCRIBE, UPDATE_SUBSCRIBE_STATUS_UNSUBSCRIBE, UPDATE_SUBSCRIBE_TYPE, CLEAR_SUBSCRIBE_TIPS } from './constants';
import { vServiceUrl, ServiceHost } from '../../../utils/pipeline';
import jsonp from '../../../utils/jsonp';


// 初始化订阅数量
export const initStarInfo = starId => dispatch => dispatch(jsonp(UPDATE_STAR_INFO, {
  url: `${vServiceUrl}/RoomService.RoomService.getStarInfo/${starId}/`
}));

// 更新订阅数量
export const UpdateSubscribeCount = subscribeCount => ({
  type: UPDATE_SUBSCRIBE_COUNT,
  subscribeCount
});

// 更新在线人数
export const UpdateViewerCount = viewerCount => ({
  type: UPDATE_VIEWER_COUNT,
  viewerCount
});

// 清除订阅提示
export const clearSubscribeTips = () => ({
  type: CLEAR_SUBSCRIBE_TIPS
});

// 订阅
export const subscribe = starId => dispatch => dispatch(jsonp(UPDATE_SUBSCRIBE_STATUS_SUBSCRIBE, {
  url: `/NServices/Follow/FollowService/follow?args=[${starId}]&ref=liveheader`
}));

// 取消订阅
export const unSubscribe = starId => dispatch => dispatch(jsonp(UPDATE_SUBSCRIBE_STATUS_UNSUBSCRIBE, {
  url: `/NServices/Follow/FollowService/unfollow?args=[${starId}]`
}));

// 初始化订阅状态
export const initSubscribeType = starId => dispatch => dispatch(jsonp(UPDATE_SUBSCRIBE_TYPE, {
  url: `/UServices/RoomService/RoomService/getFocusInfos?args=[${starId}]`
}));

// 初始化在线人数
export const initViewCount = roomId => dispatch => dispatch(jsonp(UPDATE_VIEWER_COUNT, {
  url: `${ServiceHost.soaSecureUrl}/mfx-kugoulive/pc/viewer/count.jsonp?roomId=${roomId}`
}));

// 更新订阅状态
export const UpdateSubscribeType = isSubscribe => dispatch => {
  dispatch({
    type: `${UPDATE_SUBSCRIBE_TYPE}_SUCCESS`,
    payload: {
      data: {
        isFocus: (isSubscribe ? 1 : 0)
      }
    }
  });
};
