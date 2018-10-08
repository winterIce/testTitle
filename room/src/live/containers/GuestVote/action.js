import {
  SHOW_VOTE_BOX,
  UPDATA_GIFT_DATA,
  SEND_GIFT_SUC,
  SEND_GIFT_ERR,
  CHANGE_DIY_STATE
} from './constants';

/**
 * 更改组件位置
 * @param {object} data 嘉宾id以及位置信息
 */
export const showVoteBox = data => dispatch => dispatch({
  type: SHOW_VOTE_BOX,
  data
});

/**
 * 更新礼物信息
 * @param {object} giftData 礼物信息
 */
export const updataGiftData = giftData => dispatch => dispatch({
  type: UPDATA_GIFT_DATA,
  data: {
    giftData
  }
});

/**
 * 送礼接口请求成功
 * @param {object} res 接口返回数据
 */
export const sendGiftSuc = res => dispatch => dispatch({
  type: SEND_GIFT_SUC,
  data: res
});

/**
 * 送礼接口请求失败
 */
export const sendGiftErr = () => dispatch => dispatch({
  type: SEND_GIFT_ERR
});

/**
 * 改变自定义送礼按钮可点击状态
 * @param {Boolean} diySendAble 自定义送礼按钮是否可点击
 */
export const changeDiyState = diySendAble => dispatch => dispatch({
  type: CHANGE_DIY_STATE,
  diySendAble
});
