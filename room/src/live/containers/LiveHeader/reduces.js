import { UPDATE_SUBSCRIBE_COUNT, UPDATE_STAR_INFO, UPDATE_SUBSCRIBE_TYPE, UPDATE_SUBSCRIBE_STATUS_SUBSCRIBE, UPDATE_SUBSCRIBE_STATUS_UNSUBSCRIBE, UPDATE_VIEWER_COUNT, CLEAR_SUBSCRIBE_TIPS } from './constants';
import initialState from '../../store/initial';
import { FX } from '../../../utils/pipeline';

/**
 * Action 处理
 */
const liveHeader = (state = initialState.liveHeader, action) => {
  switch (action.type) {
    // 更新订阅数量
    case UPDATE_SUBSCRIBE_COUNT: {
      return Object.assign({}, state, {
        subscribeCount: action.subscribeCount
      });
    }

    // 更新为已订阅状态
    case `${UPDATE_SUBSCRIBE_STATUS_SUBSCRIBE}_SUCCESS`: {
      if (action.payload && action.payload.data === 1) {
        try {
          FX.template.data.focus = 1;
        } catch (e) {
          console.log(e);
        }

        return Object.assign({}, state, {
          isSubscribe: true,
          subscribeTips: '关注成功'
        });
      }

      let errorMsg = '操作失败，请稍候再试！';

      if (action.payload && action.payload.errorcode && action.payload.errorcode !== '网络请求失败,请刷新重试。') {
        errorMsg = action.payload.errorcode;
      }

      FX.win.alert(errorMsg);
      return state;
    }

    // 更新为未订阅状态
    case `${UPDATE_SUBSCRIBE_STATUS_UNSUBSCRIBE}_SUCCESS`: {
      if (action.payload && action.payload.data === 1) {
        try {
          FX.template.data.focus = 0;
        } catch (e) {
          console.log(e);
        }

        return Object.assign({}, state, {
          isSubscribe: false,
          subscribeTips: '取消关注成功'
        });
      }

      let errorMsg = '操作失败，请稍候再试！';

      if (action.payload && action.payload.errorcode && action.payload.errorcode !== '网络请求失败,请刷新重试。') {
        errorMsg = action.payload.errorcode;
      }

      FX.win.alert(errorMsg);
      return state;
    }

    // 更新订阅状态
    case `${UPDATE_SUBSCRIBE_TYPE}_SUCCESS`: {
      const isSubscribe = (action.payload && action.payload.data &&
                           action.payload.data.isFocus === 1);
      try {
        FX.template.data.focus = (action.payload && action.payload.data &&
                           action.payload.data.isFocus) || 0;
      } catch (e) {
        console.log(e);
      }
      return Object.assign({}, state, {
        isSubscribe
      });
    }

    // 更新主播信息
    case `${UPDATE_STAR_INFO}_SUCCESS`: {
      if (action.payload && action.payload.code === 0 && action.payload.data) {
        const { fansCount, nickName = '', userLogo } = action.payload.data;
        const newState = {};

        if (fansCount > -1) {
          newState.subscribeCount = fansCount;
        }

        if (nickName !== '') {
          newState.nickName = nickName;
        }

        if (userLogo) {
          newState.userLogo = userLogo;
        }

        return Object.assign({}, state, newState);
      }
      return state;
    }

    // 更新在线人数
    case `${UPDATE_VIEWER_COUNT}_SUCCESS`: {
      if (action.payload && action.payload.code === 0 && action.payload.data) {
        return Object.assign({}, state, {
          viewerCount: action.payload.data.viewerCount
        });
      }
      return state;
    }

    // 更新在线人数
    case UPDATE_VIEWER_COUNT: {
      return Object.assign({}, state, {
        viewerCount: action.viewerCount
      });
    }

    // 清除订阅提示
    case CLEAR_SUBSCRIBE_TIPS:
      return Object.assign({}, state, {
        subscribeTips: null
      });

    default:
      return state;
  }

  return state;
};

export default liveHeader;
