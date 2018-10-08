export default {
  isShow: false, // 组件是否显示
  coordinate: { // 组件位置
    x: -1000,
    y: -1000
  },
  giftData: { // 组件礼物信息
    albumId: '', // 礼物专辑id
    toUserId: 0, // 接收嘉宾userId
    giftId: 0, // 礼物id
    giftImg: '', // 礼物图片
    giftName: '', // 礼物名称
    giftNum: 0, // 礼物数量
    giftType: '', // 礼物类型
    price: 0, // 礼物价格
    specialType: 0, // 特殊礼物类型
    type: false, // 是否自定义
    triggerType: 0 // 是否连击
  },
  kugouId: 0, // 接收嘉宾kugouId
  userId: 0, // 接收嘉宾userId
  diySendAble: false, // 自定义送礼是否可点击
  isChooseGift: true, // 赠送默认礼物，不触发选择礼物
  sendGiftSuccess: () => {}, // 送礼成功事件
  sendGiftError: () => {} // 送礼失败事件
};
