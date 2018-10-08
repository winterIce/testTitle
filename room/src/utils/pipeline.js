// React 与原生通道

// jQuery
export const $ = window.$;
// 直播间信息全局对象
export const liveInitData = window.liveInitData;
// Apollo 开关配置
export const apolloConfig = window.apolloConfig;
// 域名系统
export const ServiceHost = window.ServiceHost;

// 直播间订阅
export const RoomService = window.RoomService;

// Socket订阅方法
export const socketSubscribe = window.RoomSocket.subscribe;

// socket命令号列表
export const SOCKET_CMD = window.cmd;

export const vServiceUrl = `${ServiceHost.soaSecureUrl}/VServices`;

// 检查登录状态
export const getLoginStatus = (() => window.getLoginStatus());

// 送礼
export const sendGift = window.fxRequire('gift').sendGift;

// 根据中文名打开指定礼物tab
export const openGiftTabByName = typeName => window.openGiftTabByName(typeName);

// 检查登录状态_安全版本
export const getLoginStatusSafe = () => {
  let isLogin = false;
  if (typeof isLoginKgClient !== 'undefined' && window.isLoginKgClient === 1) {
    isLogin = true;
  } else {
    isLogin = typeof Kg !== 'undefined' && !!(window.Kg.Cookie.read('KuGoo'));
  }
  return isLogin;
};

// 弹窗组件
export const FX = window.FX;

// Lazyload
export const Lazyload = window.Lazyload;

// 登录方法
export const showLogin = (() => window.showLogin());

// 统计方法
export const logClick = window.logClick;

// Redux 数据暴露出去
export const exportStore = store => {
  window.REDUX_STORE = {
    getState(component) {
      return store.getState(component)[component];
    }
  };
};
